const router = require("express").Router();
const categoryController = require("../controllers/categoryController.js");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getOneCategory);
router.post("/", categoryController.postOneCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id", categoryController.updateCategory);

module.exports = router; 