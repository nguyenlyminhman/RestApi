const OraService = require('../service/OraService');

module.exports = {
    getTest: getTest
};

let getTest = async (req, res) => {
    try {
        let { rows } = await adminService.getPreventionSumary();
        
        if (rows.length == 0) {
            return res.status(200).json({ success: false, message: "Data not exist" });
        }
        let listDataDetail = [];
        rows.forEach(element => {
            let body = {
                name: element[0],
                value: element[1],
            }
            listDataDetail.push(body);
        });
        return res.status(200).json({ data: listDataDetail, success: true, message: "Get prevention sumary success!" });
    } catch (error) {
        return res.status(500).json(error);
    }
}