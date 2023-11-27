const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const authenticate = require("../middlewares/authenticate");

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

router.get("/verify/:verificationToken", usersController.verifyUser);

router.use(authenticate);

router.get("/logout", usersController.logout);

router.get("/current", usersController.current);

router.post("/verify", usersController.resendVerificationEmail);

module.exports = router;
