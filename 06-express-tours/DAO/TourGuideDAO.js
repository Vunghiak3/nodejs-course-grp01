const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const TourGuideSchema = require('../model/TourGuide');
const UserSchema = require('../model/User');

exports.getByTourId = async function(tourId) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }
  let query = `SELECT t.${TourGuideSchema.schema.tourId.name}, t.${TourGuideSchema.schema.userId.name}, u.${UserSchema.schema.userName.name}, u.${UserSchema.schema.email.name}, u.${UserSchema.schema.name.name}, u.${UserSchema.schema.photo.name}, u.${UserSchema.schema.role.name}` +
      ` from ${TourGuideSchema.schemaName} as t`+
      ` left join ${UserSchema.schemaName} as u`+
      ` on t.${TourGuideSchema.schema.userId.name} = u.${UserSchema.schema.id.name}` +
      ` where t.${TourGuideSchema.schema.tourId.name} = @${TourGuideSchema.schema.tourId.name}`;
  // console.log(query);
  let result = await dbConfig.db.pool
      .request()
      .input(TourGuideSchema.schema.tourId.name, TourGuideSchema.schema.tourId.sqlType, tourId)
      .query(query);
  // console.log(result);
  return result.recordsets[0].map(x => {
    return {
      userId: x.userId,
      userName: x.userName,
      email: x.email,
      name: x.name,
      photo: x.photo,
      role: x.role
    }
  });
  // `use ToursDemoGrp01
  // go
  // SELECT t.tourId, t.userId, u.userName, u.email, u.name, u.photo, u.role
  // from TourGuide as t
  //     left join Users as u
  //     on t.userId = u.id
  // where t.tourId = 1`
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