const http = require('http');


//request - response
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    if (pathName === '/overview'){
        res.end('THIS IS OVERVIEW PAGE');
    }else if (pathName === '/product'){
        res.end('THIS IS PRODUCT PAGE')
    }else{
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