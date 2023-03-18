const express = require('express');
const userController = require('./../controllers/user');

const router = express.Router(); //router is a middleware

//using param middleware - param middleware is middleware that run only if certain parameters appears in req url
router.param('id', userController.checkID);


router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);
module.exports = router;
