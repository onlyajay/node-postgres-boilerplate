const connection = require('./connection');

exports.getRows = async (query, param) => {
    const { rows } = await connection.query(query, param);
    return rows;
}

exports.insertRow = async (query, params) => {
    const result = await connection.query(query, params);
    if (result && result.rowCount > 0) {
        return result.rows;
    } else {
        return [];
    }
}

exports.updateRow = async (query, valueArray) => {
    const result = await connection.query(query, valueArray);
    if (result && result.rowCount > 0) {
        return result.rows;
    } else {
        return [];
    }
}

exports.deleteRow = async (query, param) => {
    const result = await connection.query(query, param);
    return !!(result && result.rowCount > 0);
}