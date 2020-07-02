/**
 * This controller used for Mysql
 */
const MySqlService = require('../service/MySqlService');
// const MysqlModel = require('../model/MysqlModel');
const StatusCode = require('../../common/ResponseStatusCode');
const ResponseObject = require('../../common/ResponseObject');
const RESP_MSG = require('../../common/ResponseMessage')

let getTestMysql = async (req, res) => {
    try {
        let rows = await MySqlService.testMySql();
        // let rows = await MysqlModel.testMySql();
        if (rows.length == 0) {
            return res.status(StatusCode.OK).json(new ResponseObject(true, RESP_MSG.SUCCESS, rows));
        }
        return res.status(StatusCode.OK).json(new ResponseObject(true, RESP_MSG.SUCCESS, rows));
    } catch (error) {
        return res.status(StatusCode.InternalServerError).json(new ResponseObject(false, RESP_MSG.SERVER_ERROR , []));
    }
}

module.exports = {
    getTestMysql: getTestMysql
};