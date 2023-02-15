const http = require('http');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8");
const itemArr = JSON.parse(data);  //convert text to Js object

const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const replaceTemplate = (template, product) => {
    //using replace by regular expression  - g means global
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    if (!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}

//request - response
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;

    if (pathName === '/overview'){
        const cardsHtml = itemArr.map(d => replaceTemplate(templateCard, d));

        // let cardsHtml = [];
        // for (let i = 0; i < itemArr.length; i++){
        //     const item = itemArr[i];
        //     cardsHtml.push(replaceTemplate(templateCard, item));
        // }

        let output = templateOverview.replace(/{%PRODUCT_CARD%/g, cardsHtml.join(''));
        res.writeHead(200,{
            'Content-type': 'text/html',
        })
        res.end(output);
    }else if (pathName === '/product'){
        res.writeHead(200,{
            'Content-type': 'text/html',
        })
        res.end(templateProduct);
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