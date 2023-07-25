const fs = require('fs')

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

module.exports = appModuleChanges;