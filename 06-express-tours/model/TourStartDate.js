const ModelSchemaValidator = require("./ModelSchemaValidator");
const ModelSchema = require("./ModelSchema");
const sql = require("mssql");

const TourStartDateSchema = new ModelSchema(
    {
        tourId: new ModelSchemaValidator({
            name: 'tourId',
            sqlType: sql.Int,
            require: true,
        }),
        date: new ModelSchemaValidator({
            name: 'date',
            sqlType: sql.DateTime,
            require: true,
        }),
    }, 'TourStartDate', 'tourId'
)
module.exports = TourStartDateSchema;