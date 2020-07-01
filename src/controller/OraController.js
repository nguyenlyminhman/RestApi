const OraService = require('../service/OraService');
// const OraModel = require('../model/OraModel');

let getTestOracle = async (req, res) => {
    try {
        let { rows } = await OraService.getTestOracle();
        // let { rows } = await OraModel.getTestOracle();
        if (rows.length == 0) {
            return res.status(200).json({ success: false, message: "Data not exist" });
        }
        let listDataDetail = [];
        rows.forEach(element => {
            let body = {
                data: element[0],
            }
            listDataDetail.push(body);
        });
        return res.status(200).json({ data: listDataDetail, success: true, message: "Test success" });
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getTestOracle: getTestOracle
};