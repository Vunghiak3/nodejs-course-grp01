const dotenv = require('dotenv');
const sql = require('mssql');

dotenv.config({
  path: '../config.env',
});

const dbConfig = require('./dbconfig');
const appPool = new sql.ConnectionPool(dbConfig.sqlConfig);

const fs = require('fs');
const TourImageDAO = require('./../TourImageDAO');
const TourStartDateDAO = require('./../TourStartDateDAO');
const TourDAO = require('./../DAO/TourDAO');



async function importDB() {
  const TOUR_FILE_PATH = `${__dirname}/../dev-data/data/tours-simple.json`;
  let tours = JSON.parse(fs.readFileSync(TOUR_FILE_PATH, 'utf-8'));

  //import tour
  for (let i = 0; i < tours.length; i++) {
    let tour = tours[i];
    // console.log(tour);

    await TourDAO.addTourIfNotExisted(tour);
    let tourDB = await TourDAO.getTourById(tour.id);
    // console.log(tourDB);

    if (tourDB) {
      if (tour.images) {
        for (let j = 0; j < tour.images.length; j++) {
          await TourImageDAO.addTourImageIfNotExisted({
              tourId: tour.id,
              imgName: tour.images[j]
            });
        }
      }

      if (tour.startDates) {
        for (let j = 0; j < tour.startDates.length; j++) {
          let date = new Date(tour.startDates[j]);
          await TourStartDateDAO.addTourStartDateIfNotExisted({
                tourId: tour.id,
                date: date.toISOString()
              });
        }
      }
    }
    
    
  }


}

async function dbClean() {
  await TourImageDAO.clearAll();
  await TourStartDateDAO.clearAll();

  await TourDAO.clearAll();
}

async function test() {
  let tourStarDates = await TourStartDateDAO.getByTourId(1);
  let tourImages = await TourImageDAO.getByTourId(1);

  console.log(tourStarDates);
  console.log(tourImages);
}

appPool
  .connect()
  .then(async function (pool) {
    dbConfig.db.pool = pool;
    console.log('SQL Connected!');

    if (process.argv[2] === '--clean') {
      console.log('cleaning db ...');
      await dbClean();
    } else if (process.argv[2] === '--import') {
      console.log('should import');
      await importDB();
    } else if (process.argv[2] === '--test') {
      await test();
    }
    console.log('done!!!');
  })
  .catch(function (err) {
    console.error('Error creating db connection pool', err);
  });

// console.log(process.argv);
