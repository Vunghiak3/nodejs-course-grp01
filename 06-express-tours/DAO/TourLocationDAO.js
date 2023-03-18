const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const TourLocationSchema = require('../model/TourLocation');
const LocationSchema = require('../model/Location');

exports.getByTourId = async function(tourId) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO - 2
  `use ToursDemoGrp01
  go
  SELECT t.tourId, t.locationId, t.day, l.description, l.type, l.lat, l.lng, l.address
  from TourLocation as t 
      left join Locations as l
      on t.locationId = l.id
  where t.tourId = 1
  ORDER BY t.day`
}


exports.clearAll = async function() {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  let result = await dbConfig.db.pool.request().query(`delete ${TourLocationSchema.schemaName}`);

  // console.log(result);
  return result.recordsets;
}

exports.addTourLocationIfNotExisted = async function(tourLocation ) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  let insertData = TourLocationSchema.validateData(tourLocation);

  let query = `insert into ${TourLocationSchema.schemaName}`;

  const {request, insertFieldNamesStr,insertValuesStr} = dbUtils.getInsertQuery(TourLocationSchema.schema, dbConfig.db.pool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr){
    throw new Error('Invalid insert param');
  }

  query += ' (' + insertFieldNamesStr + ') select ' + insertValuesStr +
      ` WHERE NOT EXISTS(SELECT * FROM ${TourLocationSchema.schemaName} WHERE ${TourLocationSchema.schema.tourId.name} = @${TourLocationSchema.schema.tourId.name} AND ${TourLocationSchema.schema.locationId.name} = @${TourLocationSchema.schema.locationId.name})`;
  // console.log(query);
  //insert into TourLocation (tourId,locationId,day) select @tourId,@imgName,@day WHERE NOT EXISTS(SELECT * FROM TourLocation tourId = @tourId AND locationId = @locationId)

  let result = await request.query(query);
  // console.log(result);
  return result.recordsets;
}