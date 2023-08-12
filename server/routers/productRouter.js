const router = require("express").Router();
const productController = require("../controllers/productController.js");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);
router.post("/", productController.postOneProduct);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", productController.updateProduct);
router.get("/:userId", productController.getAllUserProducts);

module.exports = router; 