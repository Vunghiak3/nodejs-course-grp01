const fs = require('fs');
const TourDAO = require('./../DAO/TourDAO')

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
                msg: e
            });
    }
    next();
}

//CRUD OPERATIONS
exports.createTourHandler = async (req, res) => {
    try{
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
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e
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
                msg: `Update id: ${id} successfully!`,
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
                msg: e
            });
    }
}
exports.deleteTourHandler = async (req, res) => {
    try{
        const id = req.params.id*1;
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
                msg: e
            });
    }
}
exports.getTourHandler = async (req, res) => {
    try{
        console.log(req.params);
        const id = req.params.id * 1;
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
                msg: e
            });
    }

}
exports.getAllTourHandler = async (req, res) => {
    try{
        console.log(req.query);

        // console.log(req.requestTime);
        // const tours = await TourDAO.getAllTours();
        // let result = {
        //     code: 200,
        //     msg: 'OK',
        //     data: {
        //         tours
        //     }
        // }
        // res.status(200)
        //     .json(result);


        // console.log(req.query);
        const {page,pageSize,totalPage,totalItem,tours} = await TourDAO.getAllTours(req.query);
        // console.log(tours);
        res.status(200).json({
            //200 - OK
            status: 'success',
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
                msg: e
            });
    }
}