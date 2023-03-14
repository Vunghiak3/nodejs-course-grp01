const dbConfig = require('./../database/dbconfig');
const sql = require('mssql');
const TourStartDateSchema = require('../model/TourStartDate');

exports.getByTourId = async (tourId) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool
        .request()
        .input(TourStartDateSchema.schema.tourId.name, TourStartDateSchema.schema.tourId.sqlType, tourId)
        .query(`SELECT * from ${TourStartDateSchema.schemaName} where ${TourStartDateSchema.schema.tourId.name} = @${TourStartDateSchema.schema.tourId.name}`);
    // console.log(result);
    return result.recordsets[0];
}

exports.deleteByTourId = async (tourId) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }

    let result = await dbConfig.db.pool
        .request()
        .input(TourStartDateSchema.schema.tourId.name, TourStartDateSchema.schema.tourId.sqlType, tourId)
        .query(`delete ${TourStartDateSchema.schemaName} where ${TourStartDateSchema.schema.tourId.name} = @${TourStartDateSchema.schema.tourId.name}`);

    // console.log(result);
    return result.recordsets[0];
}

exports.addTourStartDateIfNotExisted = async (tourId, date) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool
        .request()
        .input(TourStartDateSchema.schema.tourId.name, TourStartDateSchema.schema.tourId.sqlType, tourId)
        .input(TourStartDateSchema.schema.date.name, TourStartDateSchema.schema.date.sqlType, date)
        .query(
            `insert into ${TourStartDateSchema.schemaName} (${TourStartDateSchema.schema.tourId.name}, ${TourStartDateSchema.schema.date.name})` +
            ` select @${TourStartDateSchema.schema.tourId.name}, @${TourStartDateSchema.schema.date.name}` +
            ` WHERE NOT EXISTS(SELECT * FROM ${TourStartDateSchema.schemaName} WHERE ${TourStartDateSchema.schema.tourId.name} = @${TourStartDateSchema.schema.tourId.name} AND ${TourStartDateSchema.schema.date.name} = @${TourStartDateSchema.schema.date.name})`
        );
    // console.log(result);
    return result.recordsets;
}

exports.clearAll = async () => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool.request().query(`delete ${TourStartDateSchema.schemaName}`);
    // console.log(result);
    return result.recordsets;
}
