const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
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
    let insertData = TourStartDateSchema.validateData({
        tourId: tourId,
        date: date
    });
    let query = `insert into ${TourStartDateSchema.schemaName}`;

    const {request, insertFieldNamesStr,insertValuesStr} = dbUtils.getInsertQuery(TourStartDateSchema.schema, dbConfig.db.pool.request(), insertData);
    if (!insertFieldNamesStr || !insertValuesStr){
        throw new Error('Invalid insert param');
    }

    query += ' (' + insertFieldNamesStr + ') select ' + insertValuesStr +
        ` WHERE NOT EXISTS(SELECT * FROM ${TourStartDateSchema.schemaName} WHERE ${TourStartDateSchema.schema.tourId.name} = @${TourStartDateSchema.schema.tourId.name} AND ${TourStartDateSchema.schema.date.name} = @${TourStartDateSchema.schema.date.name})`;
    // console.log(query);
    let result = await request.query(query);
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
