const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const StaticData = require('../utils/StaticData')

const sql = require('mssql');
const TourImageDAO = require('./TourImageDAO');
const TourStartDateDAO = require('./TourStartDateDAO');
const TourSchema = require('../model/Tour');

async function setTourInfo(tour){
    const images = await TourImageDAO.getByTourId(tour.id);
    const startDates = await TourStartDateDAO.getByTourId(tour.id);
    tour.images = images.map(i => i.imgName);
    tour.startDates = startDates.map(d => d.date);
    return tour
}


exports.getAllTours = async (filter) => {
    if (!dbConfig.db.pool){
        throw new Error('Not connected to db');
    }
    let query = `SELECT * from ${TourSchema.schemaName}`
    let countQuery = `SELECT COUNT(DISTINCT id) as totalItem from ${TourSchema.schemaName}`

    const page = filter.page * 1 || 1;
    let pageSize = filter.pageSize * 1 || StaticData.config.MAX_PAGE_SIZE;
    if (pageSize > StaticData.config.MAX_PAGE_SIZE) {
        pageSize = StaticData.config.MAX_PAGE_SIZE;
    }
    const {filterStr, paginationStr} = dbUtils.getFilterQuery(TourSchema.schema, filter, page, pageSize, TourSchema.defaultSort);

    if (filterStr){
        query += ' ' + filterStr;
        countQuery += ' ' + filterStr;
    }

    if (paginationStr){
        query += ' ' + paginationStr;
    }
    console.log(query);
    const result = await dbConfig.db.pool.request().query(query);
    let countResult = await dbConfig.db.pool.request().query(countQuery);

    let totalItem = 0;
    if (countResult.recordsets[0].length > 0) {
        totalItem = countResult.recordsets[0][0].totalItem;
    }
    let totalPage = Math.ceil(totalItem/pageSize); //round up

    const tours = result.recordsets[0];
    for (let i = 0 ; i < tours.length; i++){
        const tour = tours[i];
        await setTourInfo(tour);
    }

    // console.log(result);
    return {
        page,
        pageSize,
        totalPage,
        totalItem,
        tours: tours
    };
}


// exports.getAllTours = async (filter) => {
//     if (!dbConfig.db.pool) {
//         throw new Error('Not connected to db');
//     }
//
//     let query = `SELECT * from ${TourSchema.schemaName}`
//     let countQuery = `SELECT COUNT(DISTINCT id) as totalItem from ${TourSchema.schemaName}`
//
//     const page = filter.page * 1 || 1;
//     let pageSize = filter.pageSize * 1 || StaticData.config.MAX_PAGE_SIZE;
//     if (pageSize > StaticData.config.MAX_PAGE_SIZE) {
//         pageSize = StaticData.config.MAX_PAGE_SIZE;
//     }
//
//     const {filterStr,paginationStr} = dbUtils.getFilterQuery(TourSchema.schema, filter,page ,pageSize, TourSchema.defaultSort);
//
//     console.log(filterStr);
//     console.log(paginationStr);
//
//     if (filterStr){
//         query += ' ' + filterStr;
//         countQuery += ' ' + filterStr;
//     }
//
//     if (paginationStr){
//         query += ' ' + paginationStr;
//     }
//
//     console.log(query);
//     // console.log(countQuery);
//
//     let result = await dbConfig.db.pool.request().query(query);
//
//     let countResult = await dbConfig.db.pool.request().query(countQuery);
//
//     // console.log(result);
//     // console.log(countResult);
//
//     let totalItem = 0;
//     if (countResult.recordsets[0].length > 0) {
//         totalItem = countResult.recordsets[0][0].totalItem;
//     }
//     let totalPage = Math.ceil(totalItem/pageSize); //round up
//     // console.log(totalItem);
//     // console.log(totalPage);
//
//     const tours = result.recordsets[0];
//     for (let i = 0 ; i < tours.length; i++){
//         const tour = tours[i];
//         await setTourInfo(tour);
//     }
//
//     return {
//         page,
//         pageSize,
//         totalPage,
//         totalItem,
//         tours
//     };
// }


exports.getTourById = async (id) => {
    if (!dbConfig.db.pool){
        throw new Error('Not connected to db');
    }
    let request = dbConfig.db.pool.request();
    let result = await request
        .input(TourSchema.schema.id.name, TourSchema.schema.id.sqlType, id)
        .query(`select * from ${TourSchema.schemaName} where ${TourSchema.schema.id.name} = @${TourSchema.schema.id.name}`);
    let tour = result.recordsets[0][0];
    if(tour){
        tour = setTourInfo(tour);
    }
    // console.log(result);
    return tour;
}

exports.getTourByName = async (name) => {
    if (!dbConfig.db.pool){
        throw new Error('Not connected to db');
    }
    let request = dbConfig.db.pool.request();
    let result = await request
        .input(TourSchema.schema.name.name, TourSchema.schema.name.sqlType, name)
        .query(`select * from ${TourSchema.schemaName} where ${TourSchema.schema.name.name} = @${TourSchema.schema.name.name}`);
    // console.log(result);
    return result.recordsets[0][0];
}

exports.deleteTourById = async (id) => {
    if(!dbConfig.db.pool){
        throw new Error('Not connected to db');
    }
    let request = dbConfig.db.pool.request();
    let result = await request
        .input(TourSchema.schema.id.name, TourSchema.schema.id.sqlType, id)
        .query(`delete ${TourSchema.schemaName} where ${TourSchema.schema.id.name} = @${TourSchema.schema.id.name}`);

    // console.log(result);
    return result.recordsets;
}

exports.updateTourById = async (id, updateInfo) => {
    // update Tours
    // set  name = 'Tours 3',
    //     price = 200,
    //     rating = 4.5
    // where Id = 2
    if(!dbConfig.db.pool){throw new Error('Not connected to db');}
    if (!updateInfo){throw new Error('Invalid input param');}
    let request = dbConfig.db.pool.request();
    request.input(TourSchema.schema.id.name, TourSchema.schema.id.sqlType, id);

    let query = `update ${TourSchema.schemaName} set`;
    if (updateInfo.name){
        request.input(TourSchema.schema.name.name, TourSchema.schema.name.sqlType, updateInfo.name);
        query += ` ${TourSchema.schema.name.name} = @${TourSchema.schema.name.name},`;
    }
    if (typeof updateInfo.price === 'number' && updateInfo.price >= 0){
        request.input(TourSchema.schema.price.name, TourSchema.schema.price.sqlType, updateInfo.price);
        query += ` ${TourSchema.schema.price.name} = @${TourSchema.schema.price.name},`;
    }
    query = query.slice(0, -1); //receive query without last character ','
    query += ` where ${TourSchema.schema.id.name} = @${TourSchema.schema.id.name}`
    console.log(query);
    let result = await request.query(query);
    console.log(result);
    return result.recordsets;
}

exports.createNewTour = async(tour) => {
    if(!dbConfig.db.pool){
        throw new Error('Not connected to db');
    }
    if (!tour){
        throw new Error('Invalid input param');
    }
    let now = new Date();
    tour.createdAt = now.toISOString();
    let insertData = TourSchema.validateData(tour);
    let query = `insert into ${TourSchema.schemaName}`;
    const {request, insertFieldNamesStr,insertValuesStr} = dbUtils.getInsertQuery(TourSchema.schema, dbConfig.db.pool.request(), insertData);

    query += ' (' + insertFieldNamesStr + ') values (' + insertValuesStr + ')';
    console.log(query);

    let result = await request.query(query);
    // console.log(result);
    return result.recordsets;
}

exports.addTourIfNotExisted = async (tour) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let now = new Date();
    tour.createdAt = now.toISOString();
    let insertData = TourSchema.validateData(tour);

    let query = `SET IDENTITY_INSERT ${TourSchema.schemaName} ON insert into ${TourSchema.schemaName}`;

    const {request, insertFieldNamesStr,insertValuesStr} = dbUtils.getInsertQuery(TourSchema.schema, dbConfig.db.pool.request(), insertData);
    if (!insertFieldNamesStr || !insertValuesStr){
        throw new Error('Invalid insert param');
    }

    query += ' (' + insertFieldNamesStr + ') select ' + insertValuesStr +
        ` WHERE NOT EXISTS(SELECT * FROM ${TourSchema.schemaName} WHERE name = @name)` +
        ` SET IDENTITY_INSERT ${TourSchema.schemaName} OFF`;
    // console.log(query);

    let result = await request.query(query);

    // console.log(result);
    return result.recordsets;
}


exports.clearAll = async () => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool.request().query(`delete ${TourSchema.schemaName}`);
    // console.log(result);
    return result.recordsets;
}