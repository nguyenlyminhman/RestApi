var PgModel = require("../model/PgModel");

var AuthService = {
    login: login
}


function login(username, password) {
    return new Promise((resolve, reject) => {
        PgModel.getUsername(username, password).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}