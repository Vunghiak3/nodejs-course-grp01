const ReviewDAO = require('./../DAO/ReviewDAO')

//check ID middleware
exports.checkID = async (req, res, next, val) => {
    try{
        const id = val;
       //TODO
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
};

exports.getAllReviews = async (req, res, next) => {
    try{
        console.log(req.query);

        //TODO
        throw new Error('Not implemented');

        // res.status(200).json({
        //     //200 - OK
        //     code: 200,
        //     msg: 'OK',
        //     page,
        //     pageSize,
        //     totalPage,
        //     totalItem,
        //     data: {
        //         reviews
        //     },
        // });
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e.toString()
            });
    }
};

exports.getReview = async (req, res, next) => {
    try{
        console.log(req.params);
        const id = req.params.id * 1;
        //TODO
        throw new Error('Not implemented');


        // res.status(200)
        //     .json({
        //         code: 200,
        //         msg: 'OK',
        //         data: {review}
        //     });
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e.toString()
            });
    }
};


exports.createReview = async (req, res, next) => {
    const newTour = req.body;
    try {
        //TODO
        throw new Error('Not implemented');

        // res.status(200)
        //     .json({
        //         code: 200,
        //         msg: 'Create new review successfully!',
        //         data: {review}
        //     });
    }catch (e){
        console.log(e);
        res
            .status(500)
            .json({
                code: 500,
                msg: e.toString()
            });
    }
};

exports.updateReview = async (req, res, next) => {
    try{
        const id = req.params.id * 1;
        //TODO
        throw new Error('Not implemented');


        // res
        // .status(200)
        // .json({
        //     code: 200,
        //     msg: `Update review with id: ${id} successfully!`,
        //     data: {
        //         review
        //     }
        // })
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

exports.deleteReview = async (req, res, next) => {
    try{
        const id = req.params.id*1;
        //TODO
        throw new Error('Not implemented');

        // res
        //     .status(200)
        //     .json({
        //         code: 200,
        //         msg: `Delete review with ${id} successfully!`,
        //     })
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e.toString()
            });
    }
};