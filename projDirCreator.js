const path = require('path');
const fs = require('fs')

/*
create directories present in src to des
except the directories starting with status or node_module from boilerplate
*/
function projDirCreator(src, des) {

    fs.readdirSync(src).forEach((fd) => {
        let srcPth = path.join(src, fd); 
        let desPth = path.join(des, fd);

        if (fs.statSync(srcPth).isDirectory()) {
            if (srcPth.match(/node_modules/)) {
                return;
            }
            if (srcPth.match(/status/)) { return; }

            if (!fs.existsSync(desPth))
                fs.mkdirSync(desPth);



            projDirCreator(srcPth, desPth);
        }
        else {


            fs.writeFileSync(desPth, fs.readFileSync(srcPth));
            return;
        }
        return;
    });
}


module.exports = projDirCreator;   