const UserDAO = require('./../DAO/UserDAO')
const StaticData = require("../utils/StaticData");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signToken = (id, username) => {
    return jwt.sign(
        {
        id: id,
        username: username
    },
        process.env.JWT_SECRET,
        { expiresIn:  process.env.JWT_EXPIRED_IN }
    );
}
exports.login = async (req, res) => {
    try{
        const form = req.body;
        //1. check if form is valid
        if (!form.password || !form.userName){
            return res.status(403)        // 403 - Forbidden
                .json({
                    code: 403,
                    msg: `Invalid params`
                });
        }
        //2. check if user existed
        const user = await UserDAO.getUserByUserName(form.userName);
        if (!user){
            return res
                .status(401)       // 401 - Unauthorized
                .json({
                    code: 401,
                    msg: `Invalid user - ${form.userName}`
                });
        }
        //3. check if password is valid
        const isValidPassword = await bcrypt.compare(form.password, user.password);
        if (!isValidPassword){
            return res
                .status(401)        // 401 - Unauthorized
                .json({
                    code: 401,
                    msg: 'Invalid authentication'
                });
        }
        //4. get JWT & response to use
        const token = signToken(user.id, user.userName);
        res.status(200).json({
            code: 200,
            msg: 'OK',
            data: {
                token,
            },
        });
    }
    catch (e) {
        console.error(e);
        res
            .status(500)        // 401 - Unauthorized
            .json({
                code: 500,
                msg: e.toString()
            });
    }
}

exports.signup = async (req, res) => {
    try{
        const form = req.body;
        if (form.password !== form.repeatPassword){
            return res.status(403).json({
                    code: 403,// 403 - Forbidden
                    msg: `Invalid password`
                });
        }
        //TODO - may be check if userName, email is existed
        await UserDAO.addUser({
            userName: form.userName,
            name: form.name,
            role: StaticData.AUTH.Role.user,
            email: form.email,
            password: form.password,
        });
        const user = await UserDAO.getUserByUserName(form.userName);
        delete user.password;
        delete user.passwordAt
        res.status(201).json({  // 201 - Created
            status: 'success',
            data: {
                user,
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