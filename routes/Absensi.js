const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const absensiController = require("../controllers/absensiController");

router.get("/absensi", isAuth, absensiController.index);

module.exports = router;
