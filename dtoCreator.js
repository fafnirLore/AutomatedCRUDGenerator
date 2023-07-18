
const entityReader = require('./entityReader')
const fs = require('fs');
const path = require('path');

//create 5 default dtos for every entity
function dtoCreator(src, des, entityClass, entityFilename, pathToEntity) {
    let files = fs.readdirSync(src);

    files.forEach((file) => {
        let content = (fs.readFileSync(path.join(src, file))).toString();
        content = content.replace(/status/g, entityClass[0].toLowerCase() + entityClass.substring(1));
        content = content.replace(/Status/g, entityClass);

        let firstClass = content.indexOf('export class');
        let class1 = content.indexOf('{', firstClass);
        let class2 = content.indexOf('}', firstClass);
        let tableContent = content.substring(class1 + 1, class2);
        let entityObj = entityReader(path.join(pathToEntity, `${entityFilename}.entity.ts`));
        let entityObjStr = ``;
        let primaryObj = entityObj[0];
        let primaryObjStr = `\n\t@IsNotEmpty()\n\t@Is${primaryObj.type[0].toUpperCase() + primaryObj.type.substring(1)}()`
        primaryObjStr += `\n\t${primaryObj.attr}: ${primaryObj.type}\n`

        entityObj.splice(0, 1);
        for (item of entityObj) {
            if (!item.attr.match(/dml/)) {
                let dtoDecorator = `@IsOptional()\n\t@Is${item.type[0].toUpperCase() + item.type.substring(1)}()`;
                entityObjStr += `\n\t${dtoDecorator}\n\t${item.attr}?: ${item.type}\n`;
            }
        }
        // console.log(file)
        switch (true) {
            case /create/g.test(file):
                content = content.replace(tableContent, entityObjStr);
                break;

            case /history/g.test(file) || /findOne/g.test(file):
                content = content.replace(tableContent, primaryObjStr);
                break;

            case /find/g.test(file):
                entityObjStr = entityObjStr.replace('@', '@IsOptional()\n\t@');
                content = content.replace(tableContent, entityObjStr);
                break;

            case /update/g.test(file):
                content = content.replace(tableContent, primaryObjStr + entityObjStr);
                break;
        }

        file = file.replace(/status/g, entityFilename);
        fs.writeFileSync(path.join(des, file), content);

    })
}


module.exports = dtoCreator;