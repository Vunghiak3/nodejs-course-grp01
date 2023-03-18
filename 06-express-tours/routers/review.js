const express = require("express");
const reviewController = require("../controllers/review");


const router = express.Router({ mergeParams: true }); //using mergeParams to get params from parent's route (tourid)

//using param middleware - param middleware is middleware that run only if certain parameters appears in req url
router.param('id', reviewController.checkID);

router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview);
router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(reviewController.updateReview)
    .delete(reviewController.deleteReview);

module.exports = router;