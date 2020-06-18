const adminService = require('../../services/admin');

/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let searchUser = async (req, res) => {
    try {
        const {appId,nationalId, phone, name } = req.body;

        let result = await adminService.searchUser(appId,nationalId, phone, name);
        const { rows } = result;
        console.log(result)
        if (rows.length == 0) {
            return res.status(200).json({ success: true, message: "User is not exist" });
        }
        return res.status(200).json({data: rows});
    } catch (error) {
        return res.status(500).json(error);
    }
}
module.exports = {
  searchUser: searchUser,

};