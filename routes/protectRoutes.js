const express = require("express");
const router = express.Router();

const OraController = require("../src/controller/OraController");

/**
 * Init all the protect APIs on your application
 * @param {*} app from express
 */
let protectAPIs = (app) => {
  router.get("/demo/get-protect", OraController.getTestOracle)
  
  return app.use("/", router);
}
module.exports.init = protectAPIs;