const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter{
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on("newSale", (val) => {
    console.log("on newSale 1", val);
})

myEmitter.on("newSale", (val) => {
    console.log("on newSale 2", val);
})
myEmitter.on("newSale", (val) => {
    console.log("on newSale 3", val);
})

myEmitter.emit("newSale", 100);

//////////////////////////////////////////////////////////////////////////////

const server = http.createServer();
server.on("request", (req, res) => {
    console.log("Request received");
    console.log(req.url);
    res.end("Request received");
});

server.on("request", (req, res) => {
    console.log("Request received 2222");
});

server.listen(8080, () => {
    console.log("server listen at 8080");
});



