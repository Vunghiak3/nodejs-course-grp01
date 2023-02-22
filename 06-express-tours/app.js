const express = require('express');
const fs = require('fs');
const app = express();
const data = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf-8')
const dataArr = JSON.parse(data);

app.get('/getAllTours', (req, res) => {
    let result = {
        code: 200,
        msg: 'OK',
        data: {
            tours: dataArr
        }
    }

    res.status(200)
        .json(result);
});

app.get('/', (req, res) => {
      res
          .status(200)  //HTTP Status Code 200 = OK
          .send('GET - Hello from sv!');
});

app.post('/', (req, res) => {
    const person = {
        name: 'AAAA',
        age: 10
    };
    res
        .status(200)  //HTTP Status Code 200 = OK
        .json(person);  //response body as JSON
});



app.listen(9001, () => {
    console.log("listening on 9001");
});