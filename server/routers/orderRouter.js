const router = require("express").Router();
const orderController = require("../controllers/orderController.js");

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOneOrder);
router.post("/", orderController.postOneOrder);
router.delete("/:id", orderController.deleteOrder);
router.put("/:id", orderController.updateOrder);
router.get("/:userId", orderController.getAllUserOrders);

module.exports = router; 