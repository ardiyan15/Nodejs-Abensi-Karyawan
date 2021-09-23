const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const profileController = require("../controllers/profileController");

router.get("/profile", isAuth, profileController.index);

module.exports = router;
