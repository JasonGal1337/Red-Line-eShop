const router = require("express").Router();
const adminController = require("../controllers/adminController.js");

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);
router.post("/verify", adminController.verify);

module.exports = router;