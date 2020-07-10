const jwtHelper = require("../helpers/jwt.helper");
const bcrypt = require('bcrypt');
const PgService = require('../../service/PgService');

// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
let tokenList = {};
// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "My_Secret_Key";
// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "My_Secret_Key";
/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let login = async (req, res) => {
  try {
    // Mình sẽ comment mô tả lại một số bước khi làm thực tế cho các bạn như sau nhé:
    // - Đầu tiên Kiểm tra xem email người dùng đã tồn tại trong hệ thống hay chưa?
    // - Nếu chưa tồn tại thì reject: User not found.
    // - Nếu tồn tại user thì sẽ lấy password mà user truyền lên, băm ra và so sánh với mật khẩu của user lưu trong Database
    // - Nếu password sai thì reject: Password is incorrect.
    // - Nếu password đúng thì chúng ta bắt đầu thực hiện tạo mã JWT và gửi về cho người dùng.
    // Trong ví dụ demo này mình sẽ coi như tất cả các bước xác thực ở trên đều ok, mình chỉ xử lý phần JWT trở về sau thôi nhé:

    const { password, username } = req.body;
    // console.log(req.body.username)
    let result = await PgService.checkUsername(username, password);
    // console.log(result.rows[0]);

    if (result.rowCount == 0) {
      return res.status(404).json({ success: false, message: "Username or Password no exist system" });
    }

    let dbPassword = result.rows[0].password;
    //thực hiện compare password----------------------------
    const match = await bcrypt.compareSync(password, dbPassword); // false
    if (!match) {
      return res.status(404).json({ success: false, message: "Password is incorrect" });
    }
    // lấy thông tin người dùng
    const userInfo = {
      username: result.rows[0].accountid
    };
    // debug(`Thực hiện tạo mã Token, [thời gian sống 1 giờ.]`);
    const accessToken = await jwtHelper.generateToken(userInfo, accessTokenSecret, accessTokenLife);

    // debug(`Thực hiện tạo mã Refresh Token, [thời gian sống 10 năm] =))`);
    const refreshToken = await jwtHelper.generateToken(userInfo, refreshTokenSecret, refreshTokenLife);
    // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
    // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
    tokenList[refreshToken] = { accessToken, refreshToken };

    // debug(`Gửi Token và Refresh Token về cho client...`);

    return res.status(200).json({ success: true, accessToken, data: { ...userInfo, token: accessToken } });
  } catch (error) {
    return res.status(500).json(error);
  }
}
/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;
  // debug("tokenList: ", tokenList);

  // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta

  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
    try {
      // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
      // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
      // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
      const userFakeData = decoded.data;
      // Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.];
      const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
      // gửi token mới về cho người dùng
      return res.status(200).json({ accessToken });
    } catch (error) {
      // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
      res.status(403).json({ message: 'Invalid refresh token.' });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({ message: 'No token provided.' });
  }
};
module.exports = {
  login: login,
  refreshToken: refreshToken,
}