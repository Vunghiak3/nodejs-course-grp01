const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

//custom middleware
app.use((req, res, next) => {
    const date = new Date().toISOString();
    req.requestTime = date;
    next();
});

//using express.json middleware -> stand between req and response
app.use(express.json());

const tourRouter = require('./routers/tour');
//router is a middleware
app.use('/api/v1/tours', tourRouter);


app.listen(9001, () => {
    console.log("listening on 9001");
});