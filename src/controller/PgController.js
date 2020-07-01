/**
 * This controller used for PostgresQL
 */
const PgService = require('../service/PgService');
// const PgModel = require('../model/PgModel');

let getTestPg = async (req, res) => {
    try {        
        let {rows} = await PgService.getTestPg() 
        // let {rows} = await PgModel.getTestPg() 
        if (rows.length == 0) {
            return res.status(200).json({ success: false, message: "Data not exist" });
        }
        return res.status(200).json({ data: rows, success: true, message: "Test success" });
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getTestPg: getTestPg
};