/**
 * This controller used for PostgresQL
 */
const PgService = require('../service/PgService');
const StatusCode = require('../../common/ResponseStatusCode');
const ResponseObject = require('../../common/ResponseObject');
const RESP_MSG = require('../../common/ResponseMessage')
const PgModel = require('../model/PgModel');

let getTestPg = async (req, res) => {
    try {
        let {rows} = await PgService.getTestPg()        
        // let rows = await PgModel.getTestPg() 

        if (rows.length == 0) {
            return res.status(StatusCode.OK).json(new ResponseObject(true, RESP_MSG.SUCCESS, rows));
        }

        return res.status(StatusCode.OK).json(new ResponseObject(true, RESP_MSG.SUCCESS, rows));
    } catch (error) {
        return res.status(StatusCode.InternalServerError).json(new ResponseObject(false, RESP_MSG.SERVER_ERROR ,error.message));
    }
}

module.exports = {
    getTestPg: getTestPg
};