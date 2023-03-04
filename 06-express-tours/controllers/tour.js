const fs = require('fs');
const TourDAO = require('./../DAO/TourDAO')

//CRUD OPERATIONS
exports.createTourHandler = async (req, res) => {
    console.log(req.body);
    const newTour = req.body;
    await TourDAO.createNewTour(newTour);
    const tour = await TourDAO.getTourByName(newTour.name);
    return res
        .status(200)
        .json({
            code: 200,
            msg: `Create new tour successfully!`,
            data: {
                tour
            }
        })
}
exports.updateTourHandler = async (req, res) => {
    const id = req.params.id * 1;
    const updateInfo = req.body;

    await TourDAO.updateTourById(id , updateInfo);
    const tour = await TourDAO.getTourById(id);
    return res
        .status(200)
        .json({
            code: 200,
            msg: `Update id: ${id} successfully!`,
            data: {
                tour
            }
        })
}
exports.deleteTourHandler = async (req, res) => {
    const id = req.params.id*1;
    await TourDAO.deleteTourById(id);
    return res
        .status(200)
        .json({
            code: 200,
            msg: `Delete tour with ${id} successfully!`,
        })
}
exports.getTourHandler = async (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
   const tour = await TourDAO.getTourById(id);
    let result = {
        code: 200,
        msg: 'OK',
        data: {tour}
    }
    res.status(200)
        .json(result);
}
exports.getAllTourHandler = async (req, res) => {
    console.log(req.requestTime);
    const tours = await TourDAO.getAllTours();
    let result = {
        code: 200,
        msg: 'OK',
        data: {
            tours
        }
    }
    res.status(200)
        .json(result);
}