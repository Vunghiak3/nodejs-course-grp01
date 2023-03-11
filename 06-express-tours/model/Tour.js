const ModelSchemaValidator = require("./ModelSchemaValidator");
const ModelSchema = require("./ModelSchema");
const sql = require("mssql");

const TourSchema = new ModelSchema(
    {
        id: new ModelSchemaValidator({
            name: 'id',
            sqlType: sql.Int,
            require: true,
        }),
        name: new ModelSchemaValidator({
            name: 'name',
            sqlType: sql.VarChar,
            require: true,
        }),
        duration: new ModelSchemaValidator({
            name: 'duration',
            sqlType: sql.Int,
            require: true,
            validator:  function (val) {
                return val > 0;
            },
        }),
        maxGroupSize: new ModelSchemaValidator({
            name: 'maxGroupSize',
            sqlType: sql.Int,
            require: true,
            validator:  function (val) {
                return val > 0;
            },
        }),
        difficulty: new ModelSchemaValidator({
            name: 'difficulty',
            sqlType: sql.VarChar,
            require: true,
            validator:  function (val) {
                const diffArr = ["easy", "medium", "difficult"];
                return (diffArr.indexOf(val) > -1);
            },
        }),
        ratingsAverage: new ModelSchemaValidator({
            name: 'ratingsAverage',
            sqlType: sql.Float,
            default: 4.5,
            validator:  function (val) {
                return val >= 0 && val <= 5;
            },
        }),
        ratingsQuantity: new ModelSchemaValidator({
            name: 'ratingsQuantity',
            sqlType: sql.Int,
            default: 0,
            validator:  function (val) {
                return val >= 0;
            },
        }),
        price: new ModelSchemaValidator({
            name: 'price',
            sqlType: sql.Int,
            require: true,
            validator:  function (val) {
                return val >= 0;
            },
        }),
        summary: new ModelSchemaValidator({
            name: 'summary',
            sqlType: sql.VarChar,
            require: true,
        }),
        description: new ModelSchemaValidator({
            name: 'description',
            sqlType: sql.VarChar,
            require: true,
            validator:  function (val) {
                return val.length > 0;
            },
        }),
        imageCover: new ModelSchemaValidator({
            name: 'imageCover',
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
    }, 'Tour', 'createdAt'
)
module.exports = TourSchema;