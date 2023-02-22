const express = require('express');
const fs = require('fs');
const app = express();
const data = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf-8')
const dataArr = JSON.parse(data);

//using express.json middleware -> stand between req and response
app.use(express.json());

app.post('/createTour', (req, res) => {
    console.log(req.body);


    res
        .status(200)
        .json({
            code: 200,
            msg: 'OK'
        });
})


app.get('/deleteTour/:id', (req, res) => {
    const id = req.params.id*1;
    // let index = -1;
    // for (let i = 0; i < dataArr.length; i++){
    //     const tour = dataArr[i];
    //     if (tour.id === id){
    //         index = i;
    //         break;
    //     }
    // }
    //findIndex():  find index of an Element in Array by A Criteria
    const index = dataArr.findIndex((tour) => {return tour.id === id});
    if (index >= 0){
        //remove 1 element from Array at index
        dataArr.splice(index,1);
        const writeData = JSON.stringify(dataArr);
        fs.writeFile('./dev-data/data/tours-simple.json', writeData , (err) => {
            res
                .status(200)
                .json({
                    code: 200,
                    msg: `Delete id: ${id} successfully!`
                });
        })
    }else{
        res
            .status(404)
            .json({
                code: 404,
                msg: `Not found tour with ${id}!`
            })
    }
})


//localhost:9001/getTour/3
app.get('/getTour/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const index = dataArr.findIndex((tour) => {return tour.id === id});
    if (index >= 0){
        const tour = dataArr[index];
        let result = {
            code: 200,
            msg: 'OK',
            data: {
                tour
            }
        }

        res.status(200)
            .json(result);
    }else{
        res
            .status(404)
            .json({
                code: 404,
                msg: `Not found tour with ${id}!`
            })
    }
});

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
      res.status(200)  //HTTP Status Code 200 = OK
          .send('GET - Hello from sv!');
});

app.post('/', (req, res) => {
    const person = {
        name: 'AAAA',
        age: 10
    };
    res.status(200)  //HTTP Status Code 200 = OK
        .json(person);  //response body as JSON
});



app.listen(9001, () => {
    console.log("listening on 9001");
});