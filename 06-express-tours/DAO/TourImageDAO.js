const dbConfig = require('./../database/dbconfig');
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
    let result = await dbConfig.db.pool
        .request()
        .input(TourImageSchema.schema.tourId.name, TourImageSchema.schema.tourId.sqlType, tourId)
        .input(TourImageSchema.schema.imgName.name, TourImageSchema.schema.imgName.sqlType, imgName)
        .query(
            `insert into ${TourImageSchema.schemaName} (${TourImageSchema.schema.tourId.name}, ${TourImageSchema.schema.imgName.name})` +
            ` select @${TourImageSchema.schema.tourId.name}, @${TourImageSchema.schema.imgName.name}` +
            ` WHERE NOT EXISTS(SELECT * FROM ${TourImageSchema.schemaName} WHERE ${TourImageSchema.schema.tourId.name} = @${TourImageSchema.schema.tourId.name} AND ${TourImageSchema.schema.imgName.name} = @${TourImageSchema.schema.imgName.name})`
        );
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