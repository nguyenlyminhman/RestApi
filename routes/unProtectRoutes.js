const express = require("express");
const router = express.Router();

const OraController = require("../src/controller/OraController");
const MysqlController = require("../src/controller/MysqlController");

/**
 * Init all the un-protect APIs on your application
 * @param {*} app from express
 */
let initUnauthenAPIs = (app) => {

  router.get("/demo/get-test-oracle", OraController.getTest);
  router.get("/demo/get-test-mysql", MysqlController.getTestMysql);

  return app.use("/", router);
}
module.exports.init = initUnauthenAPIs;