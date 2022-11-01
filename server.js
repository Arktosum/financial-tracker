const express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.get("/",(req, res) => {
    
})

app.get("/data",(req, res) => {
    readJSON('database.json',(data) => {
        res.send(data);
    })
})


function emptyObject(obj){
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
app.post("/data",(req, res) => {
    let data = req.body
    console.log(data)
    readJSON('database.json',(json) => {
        if(emptyObject(json)){
            console.log("Empty!")
            json.uid = 0
            json.data = {}
        }
        json.uid += 1
        json.data[json.uid] = {
                    'Timestamp' : data.timestamp,
                    'Mode' : data.mode,
                    'Amount' : data.amount,
                    'Remarks' : data.receiver,
                    'From' : data.from,
                    'To' : data.to
                    }
        
        writeJSON('database.json',json)
    })
})

const PORT = 3000;

app.listen(PORT,(host)=>{
    console.log(`Listening on http://localhost:${PORT}`)
})

function writeJSON(path,data,callback=()=>{}) {
    fs.writeFile(path, JSON.stringify(data,null, 2),callback)
}
function readJSON(path,callback=()=>{}){
    fs.readFile(path, 'utf8',(err,data)=>{
        if(err) throw err;
        data = JSON.parse(data)
        callback(data)
    });
}