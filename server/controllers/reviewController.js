const Review = require('../modules/review.js');

const getAllReviews = async (req,res) => {
    const reviews = await Review.find();
    res.send(reviews);
};

const getOneReview = async (req,res) => {
    const review = await Review.findOne({ _id: req.params.id });
    res.send(review);
};

const postOneReview = async (req,res) => {
    const newReview = await Review.create(req.body);
    res.send({ msg: "review logged successfully" });
};

const deleteReview = async (req,res) => {
    const deletedReview = await Review.deleteOne({ _id: req.params.id });
    res.send({ msg: "review deleted" });
};

const updateReview = async (req,res) => {
    const updatedReview = await Review.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ msg: "review updated "});
};

const getAllUserReviews = async (req,res) => {
    const userReviews = await Review.find({ userId: req.params.userId });
    res.send(userReviews);
};

module.exports = {
    getAllReviews,
    getOneReview,
    postOneReview,
    deleteReview,
    updateReview,
    getAllUserReviews
}