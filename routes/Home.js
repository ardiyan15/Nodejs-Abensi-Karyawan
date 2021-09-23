const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const homeController = require("../controllers/homeController");

router.get("/", isAuth, homeController.index);

module.exports = router;
