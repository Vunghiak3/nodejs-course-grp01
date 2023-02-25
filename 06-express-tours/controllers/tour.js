const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,'utf-8')
const dataArr = JSON.parse(data);

//CRUD OPERATIONS
exports.createTourHandler = (req, res) => {
    console.log(req.body);
    const newTour = req.body;
    dataArr.push(newTour);
    const jsonText = JSON.stringify(dataArr);
    fs.writeFile('./dev-data/data/tours-simple.json',jsonText , (err) => {
        if(!err) {
            res
                .status(201) //HTTP COde 201 = Created
                .json({
                    code: 201,
                    msg: `Add new tour successfully!`,
                    data: {
                        tour: newTour
                    }
                });
        } else {
            res
                .status(500)    //HTTP COde 500 = Internal Error
                .json({
                    code: 500,
                    msg: `Add new tour fail!`
                });
        }
    });
}
exports.updateTourHandler = (req, res) => {
    const id = req.params.id * 1;
    const index = dataArr.findIndex((tour) => {return tour.id === id});
    if (index < 0){
        return res.status(404)  //HTTP COde 404 = Not Found
            .json({
                code: 404,
                msg: `Not found tour with ${id}!`
            })
    }
    const updateInfo = req.body;
    const tourUpdate = dataArr[index];
    // console.log('Data update by Id',tourUpdate);
    // if (updateInfo.name !== null && updateInfo.name !== undefined && updateInfo.name.length>0){
    if (updateInfo.name){
        tourUpdate.name = updateInfo.name;
    }
    if (typeof updateInfo.duration === 'number' && updateInfo.duration > 0){
        tourUpdate.duration = updateInfo.duration;
    }
    if (typeof updateInfo.maxGroupSize === 'number'  && updateInfo.maxGroupSize > 0){
        tourUpdate.maxGroupSize = updateInfo.maxGroupSize;
    }
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(dataArr) , (err) => {
        res
            .status(200)
            .json({
                code: 200,
                msg: `Update id: ${id} successfully!`
            });
    })
}
exports.deleteTourHandler = (req, res) => {
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
}
exports.getTourHandler = (req, res) => {
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
}
exports.getAllTourHandler = (req, res) => {
    let result = {
        code: 200,
        msg: 'OK',
        data: {
            tours: dataArr
        }
    }

    res.status(200)
        .json(result);
}