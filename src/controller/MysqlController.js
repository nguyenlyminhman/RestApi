/**
 * This controller used for Mysql
 */
const MySqlService = require('../service/MySqlService');
// const MysqlModel = require('../model/MysqlModel');
const Response = require('../../common/response/ResponseTemplate');

let getTestMysql = async (req, res) => {
    try {
        let rows = await MySqlService.testMySql();
        // let rows = await MysqlModel.testMySql();
        return Response.OK(res,rows);
    } catch (error) {
        return Response.ERROR(res, []);
    }
}

module.exports = {
    getTestMysql: getTestMysql
};