let connection = require('../../config/database');
const { cli } = require('winston/lib/winston/config');
let Pool = require('pg').Pool;

let pool = new Pool(connection.pg)
let getTestPg = async () => {
    let client = await pool.connect()
    try {
        let sql = `SELECT * FROM public.account_info`
        return await pool.query(sql)
    } catch (err) {
        console.log('getTestPg! ', err)
    } finally {
        client.release()
    }
}

/*
* Can use this functio
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
}

module.exports = PgModel;