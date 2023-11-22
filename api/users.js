const express = require("express");
const router = express.Router();
const usersController = require("../../controller/users");
const authenticate = require("../../middlewares/authenticate");

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

router.use(authenticate);

router.get("/logout", usersController.logout);

router.get("/current", usersController.current);


module.exports = router;
