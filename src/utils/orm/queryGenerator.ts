
function queryGenerator() {
    return false;
}

function insert(tableName: string, data: any) {
    const column = [];
    const value = [];
    for (const key in data) {
        column.push(key),
            value.push(data[key]);
    }
    const query = 'INSERT INTO ' + tableName + '(' + column.join(',') + ')' + ' VALUES (' + value.join(',') + ');';

    return query;
}

export default queryGenerator;