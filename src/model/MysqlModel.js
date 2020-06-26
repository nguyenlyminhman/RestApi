var connection = require('../../config/database');
var mysql = require("mysql");

var MysqlModel = {
    testMySql: testMySql,
}

function testMySql() {
    return new Promise((resolve, reject) => {
        let db = mysql.createConnection(connection.mysql);
        db.connect();
        db.query(`SELECT * FROM  test_table`, (error, rows) => {
            if (!!error) reject(error);
            resolve(rows);
        });
        db.end();
    });
}

module.exports = MysqlModel;
