//Routing method 2: combine same routes but different handlers
const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tour');

router
    .route('/')
    .get(tourController.getAllTourHandler)
    .post(tourController.createTourHandler);
router
    .route('/:id')
    .get(tourController.getTourHandler)
    .patch(tourController.updateTourHandler)
    .delete(tourController.deleteTourHandler);

module.exports = router;