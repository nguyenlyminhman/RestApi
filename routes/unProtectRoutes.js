const express = require("express");
const router = express.Router();

const OraController = require("../src/controller/OraController");
const MysqlController = require("../src/controller/MysqlController");
const PgController = require("../src/controller/PgController");

/**
 * Init all the un-protect APIs on your application
 * @param {*} app from express
 */
let initUnauthenAPIs = (app) => {

  router.get("/demo/get-test-oracle", OraController.getTestOracle);
  router.get("/demo/get-test-mysql", MysqlController.getTestMysql);
  router.get("/demo/get-test-pg", PgController.getTestPg);
  return app.use("/", router);
}
module.exports.init = initUnauthenAPIs;