var PgModel = require("../model/PgModel");

var PgService = {
    getTestPg: getTestPg
}

function getTestPg() {
    return  new Promise((resolve, reject) => {  
        PgModel.getTestPg().then((data) => {            
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = PgService;