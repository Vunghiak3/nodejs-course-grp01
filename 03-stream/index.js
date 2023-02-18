const fs = require("fs");
const http = require("http");
 const server =   http.createServer();

 server.on("request", (req, res) => {
     //Solution 1: read full file
     // fs.readFile("test-file.txt", (err, data) => {
    //     res.end(data);
    // });

     //Solution 2: read file as stream
    const readable = fs.createReadStream("test-file.txt");
    readable.on("data", (chunk) => {
     res.write(chunk);
    });

    readable.on("end", () => {
        res.end();
    });

    readable.on("error", (err) => {
     console.log(err);
     res.statusCode = 500;
     res.end("File not found");
    });
});

server.listen(8080, () => {
    console.log("listening on 8080");
});