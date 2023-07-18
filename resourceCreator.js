const path = require('path');
const fs = require('fs')
const entityReader = require('./entityReader')

//copies the content from the boilerplate for the entity resources and paste in the buildFolder.
function resourceCreator(pathToEntity, buildFolder, pathToTemplate, entityClass, orgEntityFilename) {
    fs.readdir(path.join(pathToTemplate, 'status'), (err, files) => {
        files.forEach((file) => {

            stats = fs.statSync(path.join(pathToTemplate, 'status', file));
            if (stats.isFile()) {
                let content = fs.readFileSync(path.join(pathToTemplate, 'status', file));
                content = content.toString().replace(/([-\/])status\b/g, `$1${orgEntityFilename}`);
                content = content.toString().replace(/status/g, entityClass[0].toLowerCase() + entityClass.substring(1));
                content = content.toString().replace(/Status/g, entityClass);
                content = content.toString().replace(new RegExp(`dml${entityClass}`, 'g'), 'dmlStatus');

                if (file.match(/controller/)) {
                    content = content.toString().replace(/Charges/g, entityClass);
                }

                file = file.replace(/status/g, orgEntityFilename);
                if (file.match(/service/g)) {

                    //query parameter correction
                    let functionFindAllIter = content.indexOf('async findAll(', 0);
                    let queryRemoval = '';
                    let entityObj = entityReader(path.join(pathToEntity, `${orgEntityFilename}.entity.ts`));
                    let newQurey = '';
                    let joinStatement = '';
                    let relationPresent = false;
                    let relationStatement = '';

                    for (item of entityObj) {
                        if (item.detail == 'column') {
                            switch (item.type) {
                                case 'number':
                                    newQurey += `\n\tif (Number(params?.${item.attr}) > 0) {\n`;
                                    newQurey += `sql += \`${entityClass}.${item.attr} = params?.${item.attr} AND \`;\n}`;
                                    break;

                                case 'string':
                                    newQurey += `\n\tif (!isEmpty(params?.${item.attr})) {\n`;
                                    newQurey += `sql += \`${entityClass}.${item.attr} like '%params?.${item.attr}%' AND \`;\n}`;
                                    break;

                            }
                        }
                        else if (item.detail == 'relation') {
                            relationPresent = true;
                            relationStatement += `${item.attr}: true, `

                            joinStatement += `.leftJoinAndSelect('${entityClass}.${item.attr}', '${item.attr}')\n`;
                        }
                    }
                    if (relationPresent) {

                        content = content.toString().replace(/relations:.*{.*}/g, ` relations: {${relationStatement}}`);

                        //joins correction 
                        content = content.toString().replace(/.leftJoinAndSelect(.*)/, joinStatement);

                    }
                    else {
                        content = content.toString().replace(/relations:.*{.*},/g, '');
                        content = content.toString().replace(/.leftJoinAndSelect(.*)/, '');

                    }
                    //removal of biolerplate query from findAll function 
                    for (let i = 0; i < 3; i++) {

                        let ifStart = content.indexOf('if', functionFindAllIter);
                        let condBodyStart = content.indexOf('{', ifStart);
                        let condBodyEnd = content.indexOf('}', content.indexOf(';', condBodyStart));
                        queryRemoval = content.toString().slice(ifStart, condBodyEnd + 1);
                        // console.log(`functionIterator ${functionFindAllIter}, ifStatr ${ifStart}, condBodStart ${condBodyStart}, condBodEnd ${condBodyEnd}`)

                        if (i == 2) {
                            content = content.toString().replace(queryRemoval, newQurey);
                        }
                        else {
                            content = content.toString().replace(queryRemoval, '');
                        }
                    }

                }
                fs.writeFileSync(path.join(buildFolder, orgEntityFilename, file), content)

            }
        });
    });
}


module.exports = resourceCreator;