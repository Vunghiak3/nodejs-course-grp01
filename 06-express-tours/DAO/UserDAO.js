const dbconfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const UserSchema = require('../model/User');
const StaticData = require('../utils/StaticData');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async function(filter) {
    if (!dbconfig.db.pool) {
        throw new Error('Not connected to db');
    }

    //TODO


    // return {
    //     page,
    //     pageSize,
    //     pageSize,
    //     totalPage,
    //     totalItem,
    //     users: result.recordsets[0]
    // };
}

exports.getUser = async function(id) {
    if (!dbconfig.db.pool) {
        throw new Error('Not connected to db');
    }
    //TODO

    // return user;
}

exports.getUserByUserName = async function(userName) {
    if (!dbconfig.db.pool) {
        throw new Error('Not connected to db');
    }

    //TODO

    // return user;
}

exports.getUserByEmail = async function(email) {
    if (!dbconfig.db.pool) {
        throw new Error('Not connected to db');
    }
    //TODO

    // return user;
}

exports.addUser = async function(user) {
    if (!dbconfig.db.pool) {
        throw new Error('Not connected to db');
    }

    //TODO
}

exports.updateUser = async function(id, updateUser) {
    if (!dbconfig.db.pool) {
        throw new Error('Not connected to db');
    }

    //TODO
}

exports.deleteUser = async function(id) {
    if (!dbconfig.db.pool) {
        throw new Error('Not connected to db');
    }

    //TODO
}

exports.clearAll = async function() {
    if (!dbconfig.db.pool) {
        throw new Error('Not connected to db');
    }

    let result = await dbconfig.db.pool.request().query(`delete ${UserSchema.schemaName}`);

    // console.log(result);
    return result.recordsets;
}

exports.addUserIfNotExisted = async function(user) {
    if (!dbconfig.db.pool) {
        throw new Error('Not connected to db');
    }

    let now = (new Date()).toISOString();
    user.passwordAt = now;
    user.createdAt = now;
    user.role = StaticData.AUTH.Role[user.role];
    if (!user.role){
        console.log(user);
        throw new Error('Invalid user role');
    }

    let insertData = UserSchema.validateData(user);
    //hash the password with cost of 12
    insertData.password = await bcrypt.hash(insertData.password, 10);

    // console.log(insertData);

    let query = `SET IDENTITY_INSERT ${UserSchema.schemaName} ON insert into ${UserSchema.schemaName}`;

    const {request, insertFieldNamesStr,insertValuesStr} = dbUtils.getInsertQuery(UserSchema.schema, dbconfig.db.pool.request(), insertData);
    if (!insertFieldNamesStr || !insertValuesStr){
        throw new Error('Invalid insert param');
    }

    query += ' (' + insertFieldNamesStr + ') select ' + insertValuesStr +
        ` WHERE NOT EXISTS(SELECT * FROM ${UserSchema.schemaName} WHERE ${UserSchema.schema.id.name} = @${UserSchema.schema.id.name}) ` +
        ` SET IDENTITY_INSERT ${UserSchema.schemaName} OFF`;
    // console.log(query);

    let result = await request.query(query);

    // console.log(result);
    return result.recordsets;
}