const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const employeeController = require("../controllers/employeeController");

router.get("/employee", isAuth, employeeController.index);

router.get("/addEmployee", isAuth, employeeController.add);

router.get("/editEmployee/:id", isAuth, employeeController.edit);

router.post("/saveEmployee", isAuth, employeeController.save);

router.post("/deleteEmployee", isAuth, employeeController.delete);

router.post("/updateEmployee", isAuth, employeeController.update);

module.exports = router;
