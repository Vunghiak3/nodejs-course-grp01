const ModelSchemaValidator = require("./ModelSchemaValidator");
const ModelSchema = require("./ModelSchema");
const sql = require("mssql");

const TourLocationSchema = new ModelSchema(
    {
        tourId: new ModelSchemaValidator({
            name: 'tourId',
            sqlType: sql.Int,
            require: true,
        }),
        locationId: new ModelSchemaValidator({
          name: 'locationId',
          sqlType: sql.Int,
          require: true,
        }),
        day: new ModelSchemaValidator({
            name: 'day',
            sqlType:  sql.Int,
            require: true,
            validator:  function (val) {
              return val >= 0;
            },
        }),
    }, 'TourLocation', 'tourId'
)
module.exports = TourLocationSchema;