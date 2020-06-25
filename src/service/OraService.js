var OraModel = require("../model/OraModel");

var OraService = {
    test: test
}

function test() {
    return new Promise((resolve, reject) => {
        OraModel.getTest().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = OraService;