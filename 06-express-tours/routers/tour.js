//Routing method 2: combine same routes but different handlers
const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tour');

//middleware handles any Url
// started with /api/v1/tours
// and included parameter 'id'
// inside
router.param('id',
    tourController.checkTourById);

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