const OraService = require('../service/OraService');
// const OraModel = require('../model/OraModel');
const Response = require('../../common/response/ResponseTemplate');


let getTestOracle = async (req, res) => {
    try {
        let { rows } = await OraService.getTestOracle();
        // let { rows } = await OraModel.getTestOracle();
        if (rows.length == 0) {
            return Response.OK(res, rows);
        }
        let listDataDetail = [];
        rows.forEach(element => {
            let body = {
                data: element[0],
            }
            listDataDetail.push(body);
        });
        return Response.OK(res, rows);
    } catch (error) {
        return Response.ERROR(res, []);
    }
}

module.exports = {
    getTestOracle: getTestOracle
};