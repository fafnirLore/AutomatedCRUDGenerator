const fs = require('fs');
const path = require('path');

function entityReader(src) {
    let content = fs.readFileSync(src).toString();
    let start = content.indexOf('{', content.indexOf('export class'));
    let end = content.lastIndexOf('}');
    let entityObj = [];
    let detail = '';
    let entityContent = content.substring(start + 1, end);
    entityContent = entityContent.replace(/\?:/g, ':');

    for (let i = 0; ;) {
        let columnStart = 0;
        if (i == 0) {
            columnStart = entityContent.indexOf('@Primary', i);
            detail = 'primary';
        }
        else {
            columnStart = entityContent.indexOf('@Column', i);
            detail = 'column';
        }
        let columnEnd = entityContent.indexOf(';', columnStart) + 1;
        let columnDetail = entityContent.substring((columnStart), columnEnd);

        let attr = columnDetail.substring(columnDetail.lastIndexOf(')') + 1, columnDetail.lastIndexOf(':')).trim();
        let type = columnDetail.substring(columnDetail.lastIndexOf(':') + 2, columnDetail.indexOf(';')).trim();

        if (attr.match(/dml/)) {
            detail = 'dml';
        }
        i = columnEnd;

        entityObj.push({ attr: attr, type: type, detail: detail, relationshipEntity: type.replace('[]', '') });

        if (columnEnd >= entityContent.lastIndexOf('@Column(')) { break; }
    }

    let relationDeco = entityContent.matchAll(/@.*To.*/g);
    for (let match of relationDeco) {

        let columnStart = match.index;
        let columnEnd = entityContent.indexOf(';', columnStart) + 1;
        let columnDetail = entityContent.substring((columnStart), columnEnd);

        let attr = columnDetail.substring(columnDetail.lastIndexOf(')') + 1, columnDetail.lastIndexOf(':')).trim();
        let type = columnDetail.substring(columnDetail.lastIndexOf(':') + 2, columnDetail.indexOf(';')).trim();

        i = columnEnd;
        for (item of entityObj) {
            if (item.attr == attr) {
                item.type = 'number';
                item.detail = 'relation';
            }
        }

        if (columnStart == -1) { break; }
    }

    return entityObj;
}
module.exports = entityReader;