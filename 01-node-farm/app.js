const http = require('http');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8");
const jsonData = JSON.parse(data);  //convert text to Js object

const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const productOverview = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

//request - response
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;

    if (pathName === '/overview'){
        res.writeHead(200,{
            'Content-type': 'text/html',
        })
        res.end(templateOverview);
    }else if (pathName === '/product'){
        res.writeHead(200,{
            'Content-type': 'text/html',
        })
        res.end(productOverview);
    }else if (pathName === '/api'){
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