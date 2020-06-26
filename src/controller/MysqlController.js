/**
 * This controller used for Mysql
 */
const MySqlService = require('../service/MySqlService');

let getTestMysql = async (req, res) => {
    try {
        let rows = await MySqlService.testMySql();
        if (rows.length == 0) {
            return res.status(200).json({ success: false, message: "Data not exist" });
        }
        return res.status(200).json({ data: rows, success: true, message: "Test success" });
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getTestMysql: getTestMysql
};