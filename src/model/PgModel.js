let connection = require('../../config/database');
const Logger = require('../../common/logger/logger')

let Pool = require('pg').Pool;

let pool = new Pool(connection.pg)
let getTestPg = async () => {
    let client = await pool.connect()
    // console.log(client);
    try {
        let sql = `SELECT * FROM public.account_info`
        let res = await pool.query(sql);
        await pool.end()
        return res;
    } catch (err) {
        console.log('getTestPg! ', err.message)
    } finally {
        client.release()
    }
}

let checkUsername = async (username, password) => {
    let client = await pool.connect()
    try {
        let sql = `SELECT * FROM public.account_info where accountid = $1`
        let res = await pool.query(sql, [username])
        await pool.end()
        return res;
    } catch (err) {
        console.log('getUsername! ', err.message)
    } finally {
        client.release()
    }
}

/*
* Can use this function
*/
/*
function getTestPg() {
    return new Promise((resolve, reject) => {
        let pool = new Pool(connection.pg)
        pool.query(`SELECT * FROM public.account_info`, (error, rows) => {
            if (!!error) reject(error);
            resolve(rows);
        });
        pool.end();
    });
}
*/

let PgModel = {
    getTestPg: getTestPg,
    checkUsername: checkUsername
}

module.exports = PgModel;