const express = require("express");
const router = express.Router();
let Auth = require('../src/authen/middleware/AuthMiddleware');
const cors = require('cors')
const OraController = require("../src/controller/OraController");
const AuthController = require("../src/authen/controllers/AuthController")

/**
 * Init all the protect APIs on your application
 * @param {*} app from express
 */
let protectAPIs = (app) => {
  router.post("/demo/login", )
  router.use(cors({
    origin: '*',
    methods: "GET, POST, PUT, DELETE",
    optionsSuccessStatus: 200
  }));

  router.use(Auth.isAuth)
  router.get("/demo/get-protect", OraController.getTestOracle)
  return app.use("/", router);
}
module.exports.init = protectAPIs;