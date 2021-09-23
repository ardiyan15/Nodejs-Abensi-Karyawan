const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const userController = require("../controllers/userController");

router.get("/users", isAuth, userController.index);

router.get("/addUser", isAuth, userController.addUser);

router.get("/editUser/:id", isAuth, userController.edit);

router.post("/save", isAuth, userController.save);

router.post("/delete", isAuth, userController.delete);

router.post("/update", isAuth, userController.update);

module.exports = router;
