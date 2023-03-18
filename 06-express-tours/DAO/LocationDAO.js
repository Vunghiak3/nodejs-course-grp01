const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const LocationSchema = require('../model/Location');


exports.clearAll = async function() {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  let result = await dbConfig.db.pool.request().query(`delete ${LocationSchema.schemaName}`);
  return result.recordsets;
}



exports.addLocationIfNotExisted = async function(location) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  location.createdAt = (new Date()).toISOString();


  let insertData = LocationSchema.validateData(location);

  let query = `SET IDENTITY_INSERT ${LocationSchema.schemaName} ON insert into ${LocationSchema.schemaName}`;

  const {request, insertFieldNamesStr,insertValuesStr} = dbUtils.getInsertQuery(LocationSchema.schema, dbConfig.db.pool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr){
    throw new Error('Invalid insert param');
  }

  query += ' (' + insertFieldNamesStr + ') select ' + insertValuesStr +
      ` WHERE NOT EXISTS(SELECT * FROM ${LocationSchema.schemaName} WHERE ${LocationSchema.schema.id.name} = @${LocationSchema.schema.id.name})` +
      ` SET IDENTITY_INSERT ${LocationSchema.schemaName} OFF`;

  let result = await request.query(query);
  return result.recordsets;
}