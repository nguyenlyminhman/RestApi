/**
 * This controller used for PostgresQL
 */
const PgService = require('../service/PgService');
const PgModel = require('../model/PgModel');
const Response = require('../../common/response/ResponseTemplate');
const logger = require('../../common/logger/logger');

let getTestPg = async (req, res) => {
    try {
        let {rows} = await PgService.getTestPg()        
        // let rows = await PgModel.getTestPg() 
        logger.info('this is log infor ')
        if (rows.length == 0) {
            return Response.OK(res, rows);
        }
        return Response.OK(res, rows);
    } catch (error) {
        logger.error('getTestPg: ' + error.message)
        return Response.ERROR(res, []);
    }
}

module.exports = {
    getTestPg: getTestPg
};