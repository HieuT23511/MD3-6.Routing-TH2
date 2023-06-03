const http = require ("http");
const fs = require('fs');
const url = require("url");


const port = 8080;
let handlers = {};
const server = http.createServer((req, res)=>{
    let parseURL = url.parse(req.url,true);
    let path = parseURL.pathname;
    // console.log(path)
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    // console.log(trimPath)
    let chosenHandler = (typeof (router[trimPath])!== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req,res);
})
server.listen(port,"localhost",()=>{
    console.log(`Server is running at http://localhost:${port}`)
})


handlers.users = (req,res)=>{
    fs.readFile('./views/users.html',"utf-8",(err, dataHTML)=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(dataHTML);
        return res.end();
    })
}
handlers.products = (req,res)=>{
    fs.readFile('./views/products.html',"utf-8",(err, dataHTML)=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(dataHTML);
        return res.end();
    })
}
handlers.notFound = (req,res)=>{
    fs.readFile('./views/notFound.html',"utf-8",(err, dataHTML)=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(dataHTML);
        return res.end();
    })
}

let router = {
    'users': handlers.users,
    'products': handlers.products
}

