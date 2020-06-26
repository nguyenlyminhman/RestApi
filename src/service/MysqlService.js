var MysqlModel = require("../model/MysqlModel");

var MySqlService = {
    testMySql: testMySql
}

function testMySql() {
    return new Promise((resolve, reject) => {
        MysqlModel.testMySql().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = MySqlService;