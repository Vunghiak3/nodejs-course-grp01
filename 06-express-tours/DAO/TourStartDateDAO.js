const dbConfig = require('./../database/dbconfig');
const sql = require('mssql');

exports.getByTourId = async (tourId) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool
        .request()
        .input('tourId', sql.Int, tourId)
        .query('SELECT * from TourStartDate where tourId = @tourId');
    // console.log(result);
    return result.recordsets[0];
}

exports.deleteByTourId = async (tourId) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }

    let result = await dbConfig.db.pool
        .request()
        .input('tourId', sql.Int, tourId)
        .query('delete TourStartDate where tourId = @tourId');

    // console.log(result);
    return result.recordsets[0];
}

exports.addTourStartDateIfNotExisted = async (tourId, date) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool
        .request()
        .input('tourId', sql.Int, tourId)
        .input('date', sql.DateTime, date)
        .query(
            'insert into TourStartDate (tourId, date)' +
            ' select @tourId, @date' +
            ' WHERE NOT EXISTS(SELECT * FROM TourStartDate WHERE tourId = @tourId AND date = @date)'
        );
    // console.log(result);
    return result.recordsets;
}

exports.clearAll = async () => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool.request().query('delete TourStartDate');
    // console.log(result);
    return result.recordsets;
}
