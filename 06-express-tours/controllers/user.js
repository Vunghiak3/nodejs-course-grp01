const UserDAO = require('./../DAO/UserDAO')

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

//2) ROUTE HANDLERS
exports.getAllUsers = (req, res) => {
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
        //         users
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

exports.getUser = (req, res) => {
    try{
        console.log(req.params);
        const id = req.params.id * 1;
        //TODO
        throw new Error('Not implemented');


        // res.status(200)
        //     .json({
        //         code: 200,
        //         msg: 'OK',
        //         data: {user}
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

exports.createUser = (req, res) => {
    const newUser = req.body;
    try {
        //TODO
        throw new Error('Not implemented');

        // res.status(200)
        //     .json({
        //         code: 200,
        //         msg: 'Create new user successfully!',
        //         data: {user}
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

exports.updateUser = (req, res) => {
    try{
        const id = req.params.id * 1;
        //TODO
        throw new Error('Not implemented');


        // res
        // .status(200)
        // .json({
        //     code: 200,
        //     msg: `Update user with id: ${id} successfully!`,
        //     data: {
        //         user
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
};

exports.deleteUser = (req, res) => {
    try{
        const id = req.params.id*1;
        //TODO
        throw new Error('Not implemented');

        // res
        //     .status(200)
        //     .json({
        //         code: 200,
        //         msg: `Delete user with ${id} successfully!`,
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
