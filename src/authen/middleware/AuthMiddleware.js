const jwtHelper = require("../helpers/jwt.helper");
const PgService = require('../../service/PgService');

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "My_Secret_Key";
/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let isAuth = async (req, res, next) => {

  // if (req.url == "/adm/login") {
  //   next();
  //   return;
  // }

  // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
  const tokenFromClient = req.body.token || req.query.token || req.headers["authorization"];
  if (tokenFromClient) {
    // Nếu tồn tại token
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không?      
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      req.jwtDecoded = decoded;
      let username = decoded.data.username;
      let result = await PgService.checkUsername(username, null);
      // Cho phép req đi tiếp sang controller.
      if (result.rowCount > 0)
        next();
      else
        return res.status(403).send({ message: 'Invalid token provided.' });
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      return res.status(403).json({ message: 'Invalid token provided.' });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({ message: 'No token provided.' });
  }
}
module.exports = {
  isAuth: isAuth,
};