const OraService = require('../service/OraService');
// const OraModel = require('../model/OraModel');
const StatusCode = require('../../common/response/ResponseStatusCode');
const ResponseObject = require('../../common/response/ResponseObject');
const RESP_MSG = require('../../common/response/ResponseMessage')

let getTestOracle = async (req, res) => {
    try {
        let { rows } = await OraService.getTestOracle();
        // let { rows } = await OraModel.getTestOracle();
        if (rows.length == 0) {
            return res.status(StatusCode.OK).json(new ResponseObject(true, RESP_MSG.SUCCESS, rows));
        }
        let listDataDetail = [];
        rows.forEach(element => {
            let body = {
                data: element[0],
            }
            listDataDetail.push(body);
        });
        return res.status(StatusCode.OK).json(new ResponseObject(true, RESP_MSG.SUCCESS, rows));
    } catch (error) {
        return res.status(StatusCode.InternalServerError).json(new ResponseObject(false, RESP_MSG.SERVER_ERROR , []));
    }
}

module.exports = {
    getTestOracle: getTestOracle
};