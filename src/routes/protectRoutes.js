const express = require("express");
const router = express.Router();
let Auth = require('../authen/middleware/AuthMiddleware');
const cors = require('cors')
const OraController = require("../controller/OraController");
const MySqlController = require("../controller/MysqlController");
const PgController = require('../controller/PgController');
const AuthController = require("../authen/controllers/AuthController");

/**
 * Init all the protect APIs on your application
 * @param {*} app from express
 */
let protectAPIs = (app) => {
  router.use(cors({
    origin: '*',
    methods: "GET, POST, PUT, DELETE",
    optionsSuccessStatus: 200
  }));

  router.use(Auth.isAuth)
  router.get("/demo/get-protect", OraController.getTestOracle)
  // router.get("/demo/get-protect", MySqlController.getTestMysql);
  // router.get("/demo/get-protect", PgController.getTestPg)
  return app.use("/", router);
}
module.exports.init = protectAPIs;