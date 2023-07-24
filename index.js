/*
Starting point of project automated api generation
Author: Farquleet Farhat Gondal
Task-2
*/
const path = require('path');
const fs = require('fs')

const dtoCreator = require('./dtoCreator');
const resourceCreator = require('./resourceCreator')
const constFileCopier = require('./constFileCopier');
const entityReader = require('./entityReader');
const historyEntittyContent = require('./historyEntityContent');
const projDirCreator = require('./projDirCreator');

const pathToEntity = './entities';
const pathToNewProject = './my_pro';
const buildFolder = './my_pro/src';
const pathToBoiler = 'C:/Users/farquleet/Desktop/Current/HiveWorx/my_nest/boilerPlate';
const pathToTemplate = path.join(pathToBoiler, 'src');


//creates directories in newProject folder through the directories from biolerplate
projDirCreator(pathToBoiler, pathToNewProject);


let fd = "";
let entityFiles = fs.readdirSync(pathToEntity); //read input to get the entites 
let entityClassList = [];
let orgEntityFilename = [];


//iterate through every entity in input entities
entityFiles.forEach((file) => {
    // console.log(file);
    let content = fs.readFileSync(path.join(pathToEntity, file)).toString();
    let entity = content.match(/export class .*{/)[0].replace('export class ', '').replace('{', '').trim();
    entityClassList.push(entity);

    entityFilename = file.replace(/\..*$/, ''); //extracting the filename without ext to be used for defining paths
    orgEntityFilename.push(entityFilename);

    //create main folder in src for entity that will contain all resources for the said entity
    fd = path.join(buildFolder, entityFilename);
    if (!fs.existsSync(fd))
        fs.mkdirSync(fd);

    //create directory in main folder for dtos
    fd = path.join(buildFolder, entityFilename, 'dto');
    if (!fs.existsSync(fd))
        fs.mkdirSync(fd)

    //creation of default 5 dtos from boilerplate
    dtoCreator(path.join(pathToTemplate, 'status', 'dto'), fd, entity, entityFilename, pathToEntity);

    //create dir in main folder for entities which will contain [entity, history-entity]
    fd = path.join(buildFolder, entityFilename, 'entities')
    if (!fs.existsSync(fd))
        fs.mkdirSync(fd)

    //copying the entities content from the outside to the buildFolder
    let entityObj = entityReader(path.join(pathToEntity, `${entityFilename}.entity.ts`));
    let imports = '';
    let entityContent = fs.readFileSync(path.join(pathToEntity, `${entityFilename}.entity.ts`));
    //importing classes for entities who have relation with other entities
    for (item of entityObj) {
        if (item.detail == 'relation') {
            let entityName = item.relationshipEntity;
            let matches = entityName.match(/[A-Z]/g);
            if (entity == entityName) {
                continue;
            }
            if (matches && matches.length >= 2) {

                let folderName = entityName.replace(/([A-Z])/g, (match, p1, offset) => {
                    if (offset === 0) {
                        return match.toLowerCase();
                    } else {
                        return '-' + p1.toLowerCase();
                    }
                });
                imports += `import {${entityName}} from 'src/${folderName}/entities/${folderName}.entity'\n`
            }
            else {
                imports += `import {${entityName}} from 'src/${entityName.toLowerCase()}/entities/${entityName.toLowerCase()}.entity'\n`

            }
        }
    }
    entityContent = entityContent.toString().replace(/\/\/.*/g, '');//removing comments
    entityContent = entityContent.toString().replace(/import {.*} from [\'\"].*.entity[\'\"];?/g, ""); //removing former imports
    //append the imports to the entityContent
    entityContent = imports + entityContent;
    // entityContent = entityContent.replace(/\[\]/g, '');
    fs.writeFileSync(path.join(fd, `${entityFilename}.entity.ts`), entityContent);

    //copying content from entity for history entity
    let contentForHistory = fs.readFileSync(path.join(pathToEntity, `${entityFilename}.entity.ts`));
    contentForHistory = contentForHistory.toString().replace(/\/\/.*/g, '');
    // historyContent = historyContent.toString().replace(/status/g, entity[0].toLowerCase() + entity.substring(1));
    // historyContent = historyContent.toString().replace(/Status/g, entity);


    fs.writeFileSync(path.join(fd, `${entityFilename}-history.entity.ts`), historyEntittyContent(entityObj, contentForHistory.toString()));

    //copies the content from the boilerplate for the entity res and paste in the buildFolder.
    //resource like controller, service and module
    resourceCreator(pathToEntity, buildFolder, pathToTemplate, entity, entityFilename);
});

//copies files like util, auths which are constant
constFileCopier(pathToTemplate, buildFolder, entityClassList);

//add imports for the entities created in the app module
appModuleChanges(path.join(buildFolder, 'app.module.ts'), entityClassList, orgEntityFilename);

function appModuleChanges(pathAppModule, entityClassList, orgEntityFilename) {
    let content = fs.readFileSync(pathAppModule);
    content = content.toString();
    let importList = '';
    let imports = '';

    for (item in entityClassList) {
        importList += `\nimport { ${entityClassList[item]}Module } from './${orgEntityFilename[item]}/${orgEntityFilename[item]}.module';`

    }
    for (item of entityClassList) {
        imports += `${item}Module,`;
    }

    //changes for the import paths in the app module
    content = content.replace(`import { StatusModule } from './status/status.module';`, '');
    content = content.replace(`import { StatusTypeModule } from './status-type/status-type.module';`, importList);
    //changes for the imports in the app module
    content = content.replace(/StatusTypeModule,/g, '');
    content = content.replace(/StatusModule,/g, imports);

    fs.writeFileSync(pathAppModule, content);

}