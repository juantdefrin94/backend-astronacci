const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/*
    CRUD Example
*/

router.post("/auth/google", userController.authUserGoogle);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/content", userController.getContent);

module.exports = router;
