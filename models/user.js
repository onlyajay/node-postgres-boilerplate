const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');

exports.find = async (offset, pageSize) => {
    const query = `SELECT * FROM USERS LIMIT $1 OFFSET $2`;
    return getRows(query, [pageSize, offset]);
}

exports.findById = async (id) => {
    const query = `SELECT * FROM USERS WHERE USER_ID = $1`;
    return getRows(query, [id]);
}

exports.insert = async (object) => {
    const insertKeys = [];
    const insertValues = [];
    const countValues = [];
    let count = 1;
    for (const key in object) {
        insertKeys.push(`${key}`);
        countValues.push(`$${count}`);
        insertValues.push(`${object[key]}`);
        count++;
    }
    let query = `INSERT INTO USERS (<columns>) VALUES (<values>) RETURNING *`;
    query = query.replace("<columns>", insertKeys.join(","));
    query = query.replace("<values>", countValues.join(","));
    return insertRow(query, insertValues);
}

exports.update = async (id, object) => {
    const updateKeys = [];
    const updateValues = [];
    let count = 1;
    for (const key in object) {
        updateKeys.push(`${key}=$${count}`);
        updateValues.push(`${object[key]}`);
        count++;
    }
    updateValues.push(id);
    let query = `UPDATE USERS SET ? WHERE USER_ID = $${count} RETURNING *`;
    query = query.replace("?", updateKeys.join(","));
    return updateRow(query, updateValues);
}

exports.remove = async (id) => {
    const query = `DELETE FROM USERS WHERE USER_ID = $1`;
    return deleteRow(query, [id]);
}

exports.count = async () => {
    const query = `SELECT count(*) AS TotalCount FROM USERS`;
    const result = await getRows(query, []);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT * FROM USERS WHERE LOWER(user_first_name) LIKE '%${key}%' OR LOWER(user_last_name) LIKE '%${key}%' LIMIT ${offset}, ${pageSize}`;
    return getRows(query);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) AS TotalCount FROM USERS WHERE LOWER(user_first_name) LIKE '%${key}%' OR LOWER(user_last_name) LIKE '%${key}%'`;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

const getWhereCondition = async (columnArray, orAnd) => {
    let whereCondition = "";
    let count = 0;
    for (const col of columnArray) {
        const columnName = col["columnName"];
        const columnLogic = col["columnLogic"];
        const columnValue = col["columnValue"];
        if(columnLogic === "LIKE"){
            whereCondition = whereCondition + ` ${count > 0 ? orAnd : ""} LOWER(${columnName}) ${columnLogic} '%${columnValue.toLowerCase()}%'`;
        }else {
            whereCondition = whereCondition + ` ${count > 0 ? orAnd : ""} LOWER(${columnName}) ${columnLogic} '${columnValue.toLowerCase()}'`;
        }
        count++;
    }
    return whereCondition;
}

exports.searchByColumn = async (offset, pageSize, columnArray, orAnd) => {
    const whereCondition = await getWhereCondition(columnArray, orAnd);
    const query = `SELECT * FROM USERS WHERE ${whereCondition} LIMIT ${offset}, ${pageSize}`;
    return getRows(query);
}

exports.searchByColumnCount = async (columnArray, orAnd) => {
    const whereCondition = await getWhereCondition(columnArray, orAnd);
    const query = `SELECT count(*) AS TotalCount FROM USERS WHERE ${whereCondition}`;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}