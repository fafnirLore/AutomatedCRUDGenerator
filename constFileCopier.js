const path = require('path');
const fs = require('fs')

//copies the constant files from the boilerplate to buildFolder
//also creates roles for every endpoint
/*


*/
function fileCopier(pathToTemplate, buildFolder, entityClassList) {

    fs.readdir(pathToTemplate, (err, files) => {
        files.forEach((file) => {
            stats = fs.statSync(path.join(pathToTemplate, file));
            if (stats.isDirectory()) {
                if (!file.match(/status/g)) {
                    fd = path.join(buildFolder, file);
                    if (!fs.existsSync(fd))
                        fs.mkdirSync(fd);

                    let subList = fs.readdirSync(path.join(pathToTemplate, file));
                    subList.forEach((subFile) => {

                        let content = fs.readFileSync(path.join(pathToTemplate, file, subFile));
                        if (subFile.match(/role/)) {
                            let roleStart = content.indexOf('export enum Role');
                            let roleBodyStart = content.indexOf('{', roleStart) + 1;
                            let roleBodyEnd = content.indexOf('}', roleStart);
                            let newRoles = '';
                            for (entity of entityClassList) {

                                newRoles += `\nadd${entity} = 'add${entity}',
                                findAll${entity} = 'findAll${entity}',
                                findById${entity} = 'findById${entity}',
                                update${entity} = 'update${entity}',
                                delete${entity} = 'delete${entity}',`
                            }
                            // console.log(newRoles);
                            content = content.toString().replace(content.toString().substring(roleBodyStart, roleBodyEnd), newRoles);
                        }

                        fs.writeFileSync(path.join(buildFolder, file, subFile), content);

                    })

                }
            }

        });
    });
}


module.exports = fileCopier;