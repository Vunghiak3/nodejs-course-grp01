const fs = require('fs');


const text = fs.readFileSync("./txt/input.txt","utf-8");
console.log(text);
fs.readFile("./txt/input.txt","utf-8", (err, data) => {
    console.log(data);
});


const textOut = `hello world\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt",textOut);
fs.writeFile("./txt/output.txt",textOut, (err) => {
    console.log("write file done");
});
