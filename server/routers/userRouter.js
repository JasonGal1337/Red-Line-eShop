const router = require("express").Router();
const userController = require("../controllers/userController.js");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/verify", userController.verify);
router.post("/editInfo", userController.editInfo);
router.get("/getUserInfo", userController.getUserInfo);

module.exports = router;