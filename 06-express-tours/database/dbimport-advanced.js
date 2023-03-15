const dotenv = require('dotenv');
const sql = require('mssql');

dotenv.config({
  path: '../config.env',
});

const dbConfig = require('./dbconfig');
const appPool = new sql.ConnectionPool(dbConfig.sqlConfig);

const fs = require('fs');
const TourImageDAO = require('./../DAO/TourImageDAO');
const TourStarDateDAO = require('./../DAO/TourStartDateDAO');
const TourDAO = require('./../DAO/TourDAO');
const UserDAO = require('./../DAO/UserDAO');
const LocationDAO = require('./../DAO/LocationDAO');
const TourLocationDAO = require('./../DAO/TourLocationDAO');
const TourGuideDAO = require('./../DAO/TourGuideDAO');
const ReviewDAO = require('./../DAO/ReviewDAO');

async function importDB() {
  const TOUR_FILE_PATH = `${__dirname}/../dev-data/data/tours-advanced.json`;
  let tours = JSON.parse(fs.readFileSync(TOUR_FILE_PATH, 'utf-8'));

  //import location
  for (let i = 0; i < tours.length; i++) {
    let tour = tours[i];
    if (tour.locations) {
      for (let j = 0; j < tour.locations.length; j++) {
        const location = tour.locations[j];
        location.lng = location.coordinates[0];
        location.lat = location.coordinates[1];
        await LocationDAO.addLocationIfNotExisted(location);
      }
    }
  }

  //import user
  const USER_FILE_PATH = `${__dirname}/../dev-data/data/users.json`;
  let users = JSON.parse(fs.readFileSync(USER_FILE_PATH, 'utf-8'));
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    // console.log(user);
    user.password = '123456';
    await UserDAO.addUserIfNotExisted(user);
  }

  //import tour
  for (let i = 0; i < tours.length; i++) {
    let tour = tours[i];
    // console.log(tour);

    await TourDAO.addTourIfNotExisted(tour);
    let tourDB = await TourDAO.getTourById(tour.id);
    // console.log(tourDB);

    if (tourDB) {
      if (tour.locations) {
        for (let j = 0; j < tour.locations.length; j++) {
          await TourLocationDAO.addTourLocationIfNotExisted({
              tourId: tour.id,
              locationId: tour.locations[j].id,
              day: tour.locations[j].day
            }
          );
        }
      }

      if (tour.guides) {
        for (let j = 0; j < tour.guides.length; j++) {
          await TourGuideDAO.addTourGuideIfNotExisted({
              tourId: tour.id,
              userId: tour.guides[j],
            }
          );
        }
      }


      if (tour.images) {
        for (let j = 0; j < tour.images.length; j++) {
          await TourImageDAO.addTourImageIfNotExisted(tour.id, tour.images[j]);
        }
      }

      if (tour.startDates) {
        for (let j = 0; j < tour.startDates.length; j++) {
          let date = new Date(tour.startDates[j]);
          await TourStarDateDAO.addTourStartDateIfNotExisted(tour.id, date.toISOString());
        }
      }
    }
  }


  //import reviews
  const REVIEW_FILE_PATH = `${__dirname}/../dev-data/data/reviews.json`;
  let reviews = JSON.parse(fs.readFileSync(REVIEW_FILE_PATH, 'utf-8'));
  for (let i = 0; i < reviews.length; i++) {
    let review = reviews[i];
    await ReviewDAO.addReviewIfNotExisted({
      id: review.id,
      tourId: review.tour,
      userId: review.user,
      rating: review.rating,
      review: review.review,
    });
  }


}

async function dbClean() {
  await TourImageDAO.clearAll();
  await TourStarDateDAO.clearAll();
  await TourLocationDAO.clearAll();
  await TourGuideDAO.clearAll();
  await ReviewDAO.clearAll();

  await TourDAO.clearAll();
  await UserDAO.clearAll();
  await LocationDAO.clearAll();

}

async function test() {
  let tourStarDates = await TourStarDateDAO.getByTourId(67);
  let tourImages = await TourImageDAO.getByTourId(68);

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
