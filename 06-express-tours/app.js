const express = require('express');

const app = express();

const tourControler = require('./controllers/tour');

//using express.json middleware -> stand between req and response
app.use(express.json());

//Routing method 2: combine same routes but different handlers
app
    .route('/api/v1/tours')
    .get(tourControler.getAllTourHandler)
    .post(tourControler.createTourHandler);
app
    .route('/api/v1/tours/:id')
    .get(tourControler.getTourHandler)
    .patch(tourControler.updateTourHandler)
    .delete(tourControler.deleteTourHandler);


//Routing method 1: seperate urls

// app.post('/tours', createTourHandler);
// app.get('/tours', getAllTourHandler);
// app.patch('/tours/:id', updateTourHandler);
// app.delete('/tours/:id', deleteTourHandler)
// app.get('/tours/:id', getTourHandler);

app.listen(9001, () => {
    console.log("listening on 9001");
});