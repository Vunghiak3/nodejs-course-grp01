const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const ReviewSchema = require('../model/Review');
const StaticData = require('../utils/StaticData');


exports.getAllReviews = async function(filter) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  //TODO

  return {
    page,
    pageSize,
    pageSize,
    totalPage,
    totalItem,
    reviews: result.recordsets[0]
  };
}

exports.getReview = async function(id) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }
  // TODO
}

exports.getReviewByTourAndUser = async function(tourId, userId) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }
  // TODO
}

exports.addReview = async function(review) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  let now = new Date();
  review.createdAt = now.toISOString();

  // TODO
}

exports.updateReview = async function(id, updateReview) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  if (!updateReview){
    throw new Error('Invalid update param');
  }

  // TODO
}

exports.deleteReview = async function(id) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}

exports.clearAll = async function() {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}

exports.addReviewIfNotExisted = async function(review) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  review.createdAt = (new Date()).toISOString();

  let insertData = ReviewSchema.validateData(review);

  // console.log(insertData);

  let query = `SET IDENTITY_INSERT ${ReviewSchema.schemaName} ON insert into ${ReviewSchema.schemaName}`;

  const {request, insertFieldNamesStr,insertValuesStr} = dbUtils.getInsertQuery(ReviewSchema.schema, dbConfig.db.pool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr){
    throw new Error('Invalid insert param');
  }

  query += ' (' + insertFieldNamesStr + ') select ' + insertValuesStr +
      ` WHERE NOT EXISTS(SELECT * FROM ${ReviewSchema.schemaName} WHERE ${ReviewSchema.schema.id.name} = @${ReviewSchema.schema.id.name})`;
  // console.log(query);

  let result = await request.query(query);

  // console.log(result);
  return result.recordsets;
}