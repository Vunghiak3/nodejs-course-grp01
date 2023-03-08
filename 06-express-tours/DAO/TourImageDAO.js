const dbConfig = require('./../database/dbconfig');
const sql = require('mssql');

exports.getByTourId = async (tourId) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool
        .request()
        .input('tourId', sql.Int, tourId)
        .query('SELECT * from TourImage where tourId = @tourId');
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
        .query('delete TourImage where tourId = @tourId');

    // console.log(result);
    return result.recordsets[0];
}

exports.addTourImageIfNotExisted = async (tourId, imgName) => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool
        .request()
        .input('tourId', sql.Int, tourId)
        .input('imgName', sql.VarChar, imgName)
        .query(
            'insert into TourImage (tourId, imgName)' +
            ' select @tourId, @imgName' +
            ' WHERE NOT EXISTS(SELECT * FROM TourImage WHERE tourId = @tourId AND imgName = @imgName)'
        );
    // console.log(result);
    return result.recordsets;
}

exports.clearAll = async () => {
    if (!dbConfig.db.pool) {
        throw new Error('Not connected to db');
    }
    let result = await dbConfig.db.pool.request().query('delete TourImage');
    // console.log(result);
    return result.recordsets;
}