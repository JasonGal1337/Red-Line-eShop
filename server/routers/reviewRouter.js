const router = require("express").Router();
const reviewController = require("../controllers/reviewController.js");

router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getAllReviews);
router.post("/", reviewController.postOneReview);
router.delete("/:id", reviewController.deleteReview);
router.put("/:id", reviewController.updateReview);
router.get("/:userId", reviewController.getAllUserReviews);

module.exports = router; 