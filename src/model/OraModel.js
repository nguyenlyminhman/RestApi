var connection = require('../../config/database');
var oracledb = require('oracledb');
//set auto commit for insert or update
oracledb.autoCommit = true;

var OraModel = {
    getTest: getTest
}

let getTest = async () => {
    let conn
    try {
        let sql = `Select 'abc' from dual`
        conn = await oracledb.getConnection(connection.oracle)
        return await conn.execute(sql);
    } catch (err) {
        console.log('getTest! ', err)
    } finally {
        if (conn) { // conn assignment worked, need to close
            await conn.close()
        }
    }
}

module.exports = OraModel;