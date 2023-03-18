const ModelSchemaValidator = require("./ModelSchemaValidator");
const ModelSchema = require("./ModelSchema");
const sql = require("mssql");

const LocationSchema = new ModelSchema(
  {
    id: new ModelSchemaValidator({
      name: 'id',
      sqlType: sql.Int,
    }),
    description: new ModelSchemaValidator({
      name: 'description',
      sqlType: sql.VarChar,
      require: true,
      validator:  function (val) {
        return val.length > 0;
      },
    }),
    type: new ModelSchemaValidator({
      name: 'type',
      sqlType: sql.VarChar,
      require: true,
      validator:  function (val) {
        const typeArr = ["Point"];
        return (typeArr.indexOf(val) > -1);
      },
    }),
    lat: new ModelSchemaValidator({
      name: 'lat',
      sqlType: sql.Float,
      require: true,
    }),
    lng: new ModelSchemaValidator({
      name: 'lng',
      sqlType: sql.Float,
      require: true,
    }),
    address: new ModelSchemaValidator({
      name: 'address',
      sqlType: sql.VarChar,
    }),
    createdAt: new ModelSchemaValidator({
      name: 'createdAt',
      sqlType: sql.DateTime,
      require: true,
    }),
  }, 'Locations', 'createdAt'
)
module.exports = LocationSchema;