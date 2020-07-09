var OraModel = require("../model/OraModel");

var OraService = {
    getTestOracle: getTestOracle
}


function getTestOracle() {
    return new Promise((resolve, reject) => {
        OraModel.getTestOracle().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = OraService;