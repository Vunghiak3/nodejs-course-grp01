const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const TourGuideSchema = require('../model/TourGuide');
const UserSchema = require('../model/User');

exports.getByTourId = async function(tourId) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO - 2
  `use ToursDemoGrp02
  go
  SELECT t.tourId, t.userId, u.userName, u.email, u.name, u.photo, u.role
  from TourGuide as t
      left join Users as u
      on t.userId = u.id
  where t.tourId = 1`
}

exports.clearAll = async function() {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  let result = await dbConfig.db.pool.request().query(`delete ${TourGuideSchema.schemaName}`);
  // console.log(result);
  return result.recordsets;
}

exports.addTourGuideIfNotExisted = async function(tourGuide ) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  let insertData = TourGuideSchema.validateData(tourGuide);

  let query = `insert into ${TourGuideSchema.schemaName}`;

  const {request, insertFieldNamesStr,insertValuesStr} = dbUtils.getInsertQuery(TourGuideSchema.schema, dbConfig.db.pool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr){
    throw new Error('Invalid insert param');
  }

  query += ' (' + insertFieldNamesStr + ') select ' + insertValuesStr +
      ` WHERE NOT EXISTS(SELECT * FROM ${TourGuideSchema.schemaName} WHERE ${TourGuideSchema.schema.tourId.name} = @${TourGuideSchema.schema.tourId.name} AND ${TourGuideSchema.schema.userId.name} = @${TourGuideSchema.schema.userId.name})`;
  // console.log(query);
  //insert into TourGuide (tourId,userId) select @tourId,@userId WHERE NOT EXISTS(SELECT * FROM TourGuide tourId = @tourId AND userId = @userId)
  let result = await request.query(query);

  // console.log(result);
  return result.recordsets;
}