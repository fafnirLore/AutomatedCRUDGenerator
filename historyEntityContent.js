
function historyEntittyContent(entityObj, content) {

    let entityName = content.match(/@Entity\('(.*?)'\)/)[1];
    // entityName = entityName.slice(-1) === "s" ? entityName.slice(0, -1) : entityName;
    // console.log(entityName);
    content = content.replace(/@Entity(.*)/, (match, p, offset) => {
        return match.replace('\')', '_history\')');
    });
    content = content.replace(/export class .*{/, (match, p, offset) => {
        return match.replace(/\s*{/, 'History {');
    });

    let classStart = content.indexOf('{', content.indexOf('export class'));
    let classEnd = content.lastIndexOf('}');


    let entityContent = content.substring(classStart + 1, classEnd);

    let newPrimary = `\n@PrimaryGeneratedColumn({name: '${entityName}_histoy_id'})\n`;
    newPrimary += `${entityObj[0].attr.replace('Id', 'HistoryId')}?: number;\n`;

    entityContent = entityContent.replace('@PrimaryGeneratedColumn(', `${newPrimary}\n@Column(`);


    let relationDeco = entityContent.matchAll(/@.*To.*/g);
    for (let match of relationDeco) {

        let columnStart = match.index;
        let columnEnd = entityContent.indexOf(';', columnStart) + 1;
        let columnDetail = entityContent.substring((columnStart), columnEnd);

        let type = columnDetail.substring(columnDetail.lastIndexOf(':') + 2, columnDetail.indexOf(';')).trim().replace('[]', '');
        entityContent = entityContent.replace(new RegExp(`${type}`, '\g'), 'number');
        entityContent = entityContent.replace(/\[\]/g, '');


        if (columnStart == -1) { break; }
    }

    entityContent = entityContent.replace(/@.*To.*/g, '').replace(/\(.*\) => .*\n.*\n.*/g, ''); //removing the relationship decorator
    entityContent = entityContent.replace(/@(?!Column|PrimaryGeneratedColumn)(.*)/g, '').replace(/\n{2,}/g, '\n');
    // entityContent = newPrimay + entityContent;
    // let historyColumns = 'number;\n';
    // for (item of entityObj) {
    //     historyColumns += `\n\t@Column({name: '${item.attr}'})\n\t${item.attr}: ${item.type};`;
    // }

    // console.log(historyColumns);
    // entityContent = entityContent.replace(/@Column(.*)\n.*/g, ''); //remove all attr from entity other than historyId
    // entityContent = entityContent.trim();
    // entityContent = entityContent.replace(/number;/, historyColumns);
    content = content.replace(content.substring(classStart + 1, classEnd), entityContent);
    return content;
}

module.exports = historyEntittyContent;
