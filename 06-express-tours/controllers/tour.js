const TourDAO = require('./../DAO/TourDAO')
const TourImageDAO = require('./../DAO/TourImageDAO')
const TourStartDateDAO = require('./../DAO/TourStartDateDAO')

exports.checkTourById = async (req, res, next, val) => {
    try{
        const id = val;
        let tour = await TourDAO.getTourById(id);
        if (!tour){
            return res.status(404)     /// 404 - NOT FOUND!
                .json({
                    code: 404,
                    msg: `Not found tour with id ${id}`,
                });
        }
        req.tour = tour;
    }catch (e) {
        console.error(e);
        return res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e.toString()
            });
    }
    next();
}

//CRUD OPERATIONS
exports.createTourHandler = async (req, res) => {
    const newTour = req.body;
    try {
        await TourDAO.createNewTour(newTour);
        let tour = await TourDAO.getTourByName(newTour.name);
        if (newTour.images && newTour.images.length > 0){
            for (let j = 0; j < newTour.images.length; j++) {
                await TourImageDAO.addTourImageIfNotExisted(tour.id, newTour.images[j]);
            }
        }
        if (newTour.startDates && newTour.startDates.length > 0){
            for (let j = 0; j < newTour.startDates.length; j++) {
                let date = new Date(newTour.startDates[j]);
                await TourStartDateDAO.addTourStartDateIfNotExisted(tour.id, date.toISOString());
            }
        }
        tour = await TourDAO.getTourById(tour.id);
        return res
            .status(200)
            .json({
                code: 200,
                msg: `Create new tour successfully!`,
                data: {
                    tour
                }
            })
    }catch (e){
        console.log(e);
        res
            .status(500)
            .json({
                code: 500,
                msg: e.toString()
            });
    }

}
exports.updateTourHandler = async (req, res) => {
    try{
        const id = req.params.id * 1;
        const updateInfo = req.body;
        await TourDAO.updateTourById(id , updateInfo);
        const tour = await TourDAO.getTourById(id);
        return res
            .status(200)
            .json({
                code: 200,
                msg: `Update tour with id: ${id} successfully!`,
                data: {
                    tour
                }
            })
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e.toString()
            });
    }
}
exports.deleteTourHandler = async (req, res) => {
    try{
        const id = req.params.id*1;
        await TourImageDAO.deleteByTourId(id);
        await TourStartDateDAO.deleteByTourId(id);
        await TourDAO.deleteTourById(id);
        return res
            .status(200)
            .json({
                code: 200,
                msg: `Delete tour with ${id} successfully!`,
            })
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e.toString()
            });
    }
}
exports.getTourHandler = async (req, res) => {
    try{
        console.log(req.params);
        const tour = req.tour;

        let result = {
            code: 200,
            msg: 'OK',
            data: {tour}
        }
        res.status(200)
            .json(result);
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e.toString()
            });
    }

}
exports.getAllTourHandler = async (req, res) => {
    try{
        // console.log(req.query);
        const {page,pageSize,totalPage,totalItem,tours} = await TourDAO.getAllTours(req.query);
        res.status(200).json({
            //200 - OK
            code: 200,
            msg: 'OK',
            page,
            pageSize,
            totalPage,
            totalItem,
            data: {
                tours
            },
        });
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e.toString()
            });
    }
}