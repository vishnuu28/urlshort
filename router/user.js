const express = require("express");
const { handeluserSingup, handeluserlogin } = require("../controller/user");

const route = express.Router();

route.post("/", handeluserSingup);
route.post("/login", handeluserlogin);

module.exports = route;
