//Routing method 2: combine same routes but different handlers
const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tour');
const authController = require('./../controllers/auth');
const StaticData = require("../utils/StaticData");

//middleware handles any Url
// started with /api/v1/tours
// and included parameter 'id'
// inside
router.param('id',
    tourController.checkTourById);

router
    .route('/')
    .get(authController.protect,tourController.getAllTourHandler)
    .post(authController.protect,
        authController.restrictTo(
            StaticData.AUTH.Role.admin,
            StaticData.AUTH.Role.leadGuide
        ),
        tourController.createTourHandler);
router
    .route('/:id')
    .get(authController.protect,tourController.getTourHandler)
    .patch(
        authController.protect,
        authController.restrictTo(
            StaticData.AUTH.Role.admin,
            StaticData.AUTH.Role.leadGuide
        ),
        tourController.updateTourHandler)
    .delete(authController.protect,
        authController.restrictTo(
            StaticData.AUTH.Role.admin,
            StaticData.AUTH.Role.leadGuide
        ),
        tourController.deleteTourHandler);

module.exports = router;