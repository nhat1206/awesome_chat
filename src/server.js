import express from "express";
let app = express();

let hostname = "localhost";
let port = 8002;

app.get("/hello",(req,res)=>{
    res.send("<h1>hello</h1>")
});

app.listen(port,hostname,()=>{
    console.log(`running at ${hostname}:${port}`);
});
