const ModelSchemaValidator = require("./ModelSchemaValidator");
const ModelSchema = require("./ModelSchema");
const sql = require("mssql");

const ReviewSchema = new ModelSchema(
    {
        id: new ModelSchemaValidator({
            name: 'id',
            sqlType: sql.Int,
        }),
        tourId: new ModelSchemaValidator({
          name: 'tourId',
          sqlType: sql.Int,
          require: true,
        }),
        userId: new ModelSchemaValidator({
          name: 'userId',
          sqlType: sql.Int,
          require: true,
        }),
        rating: new ModelSchemaValidator({
          name: 'rating',
          sqlType: sql.Int,
          validator:  function (val) {
            return val >= 0 && val <= 5;
          },
        }),
        review: new ModelSchemaValidator({
          name: 'review',
          sqlType: sql.VarChar,
          require: true,
          validator:  function (val) {
            return val.length > 0;
          },
        }),
        createdAt: new ModelSchemaValidator({
          name: 'createdAt',
          sqlType: sql.DateTime,
          require: true,
        }),
    }, 'Reviews', 'createdAt'
)
module.exports = ReviewSchema;