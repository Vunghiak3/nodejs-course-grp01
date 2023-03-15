const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const TourGuideSchema = require('../model/TourGuide');
const UserSchema = require('../model/User');

exports.getByTourId = async function(tourId) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO - 2
}

exports.clearAll = async function() {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}

exports.addTourGuideIfNotExisted = async function(tourGuide ) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}