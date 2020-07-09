/**
 * This controller used for PostgresQL
 */
const PgService = require('../service/PgService');
const PgModel = require('../model/PgModel');
const StatusCode = require('../../common/response/ResponseStatusCode');
const ResponseObject = require('../../common/response/ResponseObject');
const RESP_MSG = require('../../common/response/ResponseMessage')
const logger = require('../../common/logger/logger');

let getTestPg = async (req, res) => {
    try {
        let {rows} = await PgService.getTestPg()        
        // let rows = await PgModel.getTestPg() 
        logger.info('this is log infor ')
        if (rows.length == 0) {
            return res.status(StatusCode.OK).json(new ResponseObject(true, RESP_MSG.SUCCESS, rows));
        }
        return res.status(StatusCode.OK).json(new ResponseObject(true, RESP_MSG.SUCCESS, rows));
    } catch (error) {
        logger.error('getTestPg: ' + error.message)
        return res.status(StatusCode.InternalServerError).json(new ResponseObject(false, RESP_MSG.SERVER_ERROR , []));
    }
}

module.exports = {
    getTestPg: getTestPg
};