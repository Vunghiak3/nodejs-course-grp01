const dbconfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const TourLocationSchema = require('../model/TourLocation');
const LocationSchema = require('../model/Location');

exports.getByTourId = async function(tourId) {
  if (!dbconfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO - 2
}


exports.clearAll = async function() {
  if (!dbconfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}

exports.addTourLocationIfNotExisted = async function(tourLocation ) {
  if (!dbconfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}