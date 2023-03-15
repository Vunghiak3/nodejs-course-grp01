const dbconfig = require('./dbconfig');
const dbUtils = require('../utils/dbUtils')
const LocationSchema = require('../model/Location');


exports.clearAll = async function() {
  if (!dbconfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}



exports.addLocationIfNotExisted = async function(location) {
  if (!dbconfig.db.pool) {
    throw new Error('Not connected to db');
  }

  location.createdAt = (new Date()).toISOString();


  let insertData = LocationSchema.validateData(location);

  // console.log(insertData);

  let query = `SET IDENTITY_INSERT ${LocationSchema.schemaName} ON insert into ${LocationSchema.schemaName}`;

  const {request, insertFieldNamesStr,insertValuesStr} = dbUtils.getInsertQuery(LocationSchema.schema, dbconfig.db.pool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr){
    throw new Error('Invalid insert param');
  }

  query += ' (' + insertFieldNamesStr + ') select ' + insertValuesStr +
      ` WHERE NOT EXISTS(SELECT * FROM ${LocationSchema.schemaName} WHERE ${LocationSchema.schema.id.name} = @${LocationSchema.schema.id.name})` +
      ` SET IDENTITY_INSERT ${LocationSchema.schemaName} OFF`;
  // console.log(query);

  let result = await request.query(query);

  // console.log(result);
  return result.recordsets;
}