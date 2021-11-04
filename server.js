var express = require("express");
var app = express();

var hostname = "localhost";
var port = 8002;

app.get("/hello",(req,res)=>{
    res.send("<h1>hello</h1>")
});

app.listen(port,hostname,()=>{
    console.log(`running at ${hostname}:${port}`);
});
