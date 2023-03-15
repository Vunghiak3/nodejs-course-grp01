const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const TourLocationSchema = require('../model/TourLocation');
const LocationSchema = require('../model/Location');

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

exports.addTourLocationIfNotExisted = async function(tourLocation ) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}