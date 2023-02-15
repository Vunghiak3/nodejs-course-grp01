const http = require('http');
const fs = require('fs');

const data = fs.readFileSync("./dev-data/data.json","utf-8");
const jsonData = JSON.parse(data);  //convert text to Js object

//request - response
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    if (pathName === '/overview'){
        res.end('THIS IS OVERVIEW PAGE');
    }else if (pathName === '/product'){
        res.end('THIS IS PRODUCT PAGE')
    }else if (pathName === '/api'){
        //Method 1: read the data every time request come in
        // fs.readFile("./dev-data/data.json","utf-8", (err, data) => {
        //     const jsonData = JSON.parse(data);  //convert text to Js object
        //     console.log(jsonData)
        //
        //     res.writeHead(200,{
        //         'Content-type': 'application/json',
        //     })
        //     res.end(data);
        // });

        res.writeHead(200,{
            'Content-type': 'application/json',
        })
        res.end(data);

    } else{
        res.writeHead(404,{
            'Content-type': 'text/html',
            'my-header': 'abc'
        })
        res.end('<h1>PAGE NOT FOUND</h1>');
    }


});


//starting up the server, wait for the requests to serve
server.listen(8080, () => {
    //callback function which will be called when server actually starts listening
    console.log('Listening on 8080....')
});