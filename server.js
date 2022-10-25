const express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')))
app.get("/",(req, res) => {
    
})


app.get("/data",(req, res) => {
    readFile('database.json',(data) => {
        res.send(data);
    })
})
const PORT = 3000;

app.listen(PORT,(host)=>{
    console.log(`Listening on http://localhost:${PORT}`)
})


function readFile(path,func){
    fs.readFile(path, 'utf8',(err,data)=>{
        if(err) throw err;
        data = JSON.parse(data)
        func(data)
    });
}