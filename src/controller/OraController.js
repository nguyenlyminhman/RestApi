const OraService = require('../service/OraService');

let getTest = async (req, res) => {
    try {
        let { rows } = await OraService.test();
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
    getTest: getTest
};