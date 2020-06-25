var connection = require('../../config/database');
var mysql = require("mysql");

var tableName = 'TestTable';

var MysqlModel = {
    test: test,
}

function test() {
    return new Promise((resolve, reject) => {
        let db = mysql.createConnection(connection.mysql);
        db.connect();
        db.query(`SELECT * FROM  ${tableName} LIMIT 10`, (error, rows, fields) => {
            if (!!error) reject(error);
            resolve(rows);
        });
        db.end();
    });
}

module.exports = MysqlModel;
