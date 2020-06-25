const express = require("express");
const router = express.Router();

const OraController = require("../src/controller/OraController");

/**
 * Init all the un-protect APIs on your application
 * @param {*} app from express
 */
let initUnauthenAPIs = (app) => {

  router.get("/demo/get-test", OraController.getTest);

  return app.use("/", router);
}
module.exports.init = initUnauthenAPIs;