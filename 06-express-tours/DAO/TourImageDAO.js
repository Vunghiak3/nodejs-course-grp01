const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const sql = require('mssql');
const TourImageSchema = require('../model/TourImage');

exports.getByTourId = async (tourId) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool
        .request()
        .input(TourImageSchema.schema.tourId.name, TourImageSchema.schema.tourId.sqlType, tourId)
        .query(`SELECT * from ${TourImageSchema.schemaName} where ${TourImageSchema.schema.tourId.name} = @${TourImageSchema.schema.tourId.name}`);
    // console.log(result);
    return result.recordsets[0];
}

exports.deleteByTourId = async (tourId) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }

    let result = await dbConfig.db.pool
        .request()
        .input(TourImageSchema.schema.tourId.name, TourImageSchema.schema.tourId.sqlType, tourId)
        .query(`delete ${TourImageSchema.schemaName} where ${TourImageSchema.schema.tourId.name} = @${TourImageSchema.schema.tourId.name}`);

    // console.log(result);
    return result.recordsets[0];
}

exports.addTourImageIfNotExisted = async (tourId, imgName) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let insertData = TourImageSchema.validateData({
        tourId: tourId,
        imgName: imgName
    });
    let query = `insert into ${TourImageSchema.schemaName}`;
    const {request, insertFieldNamesStr,insertValuesStr} = dbUtils.getInsertQuery(TourImageSchema.schema, dbConfig.db.pool.request(), insertData);
    if (!insertFieldNamesStr || !insertValuesStr){
        throw new Error('Invalid insert param');
    }
    query += ' (' + insertFieldNamesStr + ') select ' + insertValuesStr +
        ` WHERE NOT EXISTS(SELECT * FROM ${TourImageSchema.schemaName} WHERE ${TourImageSchema.schema.tourId.name} = @${TourImageSchema.schema.tourId.name} AND ${TourImageSchema.schema.imgName.name} = @${TourImageSchema.schema.imgName.name})`;
    // console.log(query);
    //insert into TourImage (tourId,imgName) select @tourId,@imgName WHERE NOT EXISTS(SELECT * FROM TourImage tourId = @tourId AND imgName = @imgName)
    let result = await request.query(query);
    // console.log(result);
    return result.recordsets;
}

exports.clearAll = async () => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool.request().query(`delete ${TourImageSchema.schemaName}`);
    // console.log(result);
    return result.recordsets;
}