const express = require("express");
const router = express.Router();
const checkUserAuth = require("../middleware/auth");
const FrontController = require("../controllers/FrontController");

router.get("/", FrontController.login);
router.get("/register", FrontController.register);
router.get("/dashboard", checkUserAuth, FrontController.dashboard);

router.post("/userinsert", FrontController.userinsert);
router.post("/verifyLogin", FrontController.verifyLogin);
router.get("/logOut", FrontController.logOut);

module.exports = router;
