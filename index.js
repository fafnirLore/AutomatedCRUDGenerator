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
const appModuleChanges = require('./appModuleChanges');

const pathToEntity = './entities';
const pathToNewProject = './my_pro';
const buildFolder = path.join(pathToNewProject, 'src');//path to src folder for new project
const pathToBoiler = 'C:/Users/farquleet/Desktop/Current/HiveWorx/my_nest/boilerPlate';
const pathToTemplate = path.join(pathToBoiler, 'src');//path to src folder of boilerplate

//if new project folder doesnot exist than create
if (!fs.existsSync(pathToNewProject))
    fs.mkdirSync(pathToNewProject);

//creates directories in newProject folder through the directories from biolerplate
projDirCreator(pathToBoiler, pathToNewProject);


let fd = "";
let entityFiles = fs.readdirSync(pathToEntity); //read input to get the entites 
let entityClassList = [];
let orgEntityFilename = [];


//iterate through every entity in input entities
entityFiles.forEach((file) => {
    let content = fs.readFileSync(path.join(pathToEntity, file)).toString();

    //extracting entityname from entity file
    let entity = content.match(/export class.*/)[0].replace('export class ', '').replace('{', '').trim();
    entityClassList.push(entity);//list of name of entity classes

    entityFilename = file.replace(/\..*$/, ''); //extracting the filename without extension to be used for defining paths
    orgEntityFilename.push(entityFilename);//filename of entity files

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
    let entityObj = entityReader(path.join(pathToEntity, `${entityFilename}.entity.ts`)); //contains every attribute with its name, dataype, detail [column, primary, relation], relationship [none for attributes that are not relation]
    let imports = '';
    let entityContent = fs.readFileSync(path.join(pathToEntity, `${entityFilename}.entity.ts`));
    //importing classes for entities who have relation with other entities
    for (item of entityObj) {
        if (item.detail == 'relation') {
            let entityName = item.relationshipEntity;
            let matches = entityName.match(/[A-Z]/g);//looks for uppercase letters in entityname

            //no need for setting path for the relationship with the same entity as class
            if (entity == entityName) {
                entityContent = entityContent.toString().replace(new RegExp(`${item.attr}: number;`, 'g'), `${item.attr}: ${item.relationshipEntity}${item.relationType === '@OneToMany' ? '[]' : ''};`)
                continue;
            }
            //if upper case letters are  >= 2
            if (matches && matches.length >= 2) {
                //replacing upper case letter with '-' and lower case letter for path
                let folderName = entityName.replace(/([A-Z])/g, (match, p1, offset) => {
                    if (offset === 0) {
                        return match.toLowerCase();
                    } else {
                        return '-' + p1.toLowerCase();
                    }
                });
                imports += `import {${entityName}} from 'src/${folderName}/entities/${folderName}.entity';\n`
            }
            else {
                //if entityname has < 2 upper case letter then
                imports += `import {${entityName}} from 'src/${entityName.toLowerCase()}/entities/${entityName.toLowerCase()}.entity';\n`

            }
            //if relationtype is oneTomany then we need a obj array else a obj
            entityContent = entityContent.toString().replace(new RegExp(`${item.attr}: .*;`, 'g'), `${item.attr}: ${item.relationshipEntity}${item.relationType === '@OneToMany' ? '[]' : ''};`);
        }
    }
    //    entityContent = entityContent.toString().replace(/\/\/.*/g, '');//removing comments
    entityContent = entityContent.toString().replace(/import.*from.*[\'\"].*.entity[\'\"];?/g, ""); //removing former imports

    entityContent = entityContent.toString().replace('export const jsonSchemas = validationMetadatasToSchemas()', '').replace('import { validationMetadatasToSchemas } from \'class-validator-jsonschema\';', '');//removing validationSchema as it is of no use

    //incase of dml attributes are not present in entity add them 
    let dmlString = "";
    if (!entityContent.includes('dmlStatus')) {
        dmlString = `\n\t@Column( {name: 'dml_status', nullable: false })\n\t@IsOptional()\n\t@IsNumber()\n\tdmlStatus?: number;`
    }
    if (!entityContent.includes('dmlUserId')) {
        dmlString += `\n\t@Column( {name: 'dml_user_id', nullable: false })\n\t@IsOptional()\n\t@IsNumber()\n\tdmlUserId?: number;`
    }
    //append the imports to the entityContent
    entityContent = imports + entityContent.toString().slice(0, entityContent.lastIndexOf('}')) + dmlString + '\n}';

    // entityContent = entityContent.replace(/\[\]/g, '');
    //writing to the buildFolder entity 
    fs.writeFileSync(path.join(fd, `${entityFilename}.entity.ts`), entityContent);

    //copying content from entity for history entity
    let contentForHistory = fs.readFileSync(path.join(fd, `${entityFilename}.entity.ts`));
    contentForHistory = contentForHistory.toString().replace(/\/\/.*/g, '');
    contentForHistory = contentForHistory.toString().replace(/import.*from.*[\'\"].*.entity[\'\"];?/g, ""); //removing former imports
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