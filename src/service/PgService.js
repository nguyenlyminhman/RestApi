var PgModel = require("../model/PgModel");

var PgService = {
    getTestPg: getTestPg,
    checkUsername: checkUsername
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

function checkUsername(username, password){
    return  new Promise((resolve, reject) => {  
        PgModel.checkUsername(username, password).then((data) => {            
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = PgService;