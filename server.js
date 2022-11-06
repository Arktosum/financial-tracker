const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const server = express();
const PORT = 3000;

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.json())
server.use(cors())


const DBPath = 'database.json'
server.post('/data',(req,res)=>{
    let data = req.body
    readFile(DBPath,(err,DATA)=>{
        let prev_data = DATA
        if(isEmptyObj(prev_data)){
            if(!('uid' in prev_data)){
                prev_data['uid'] = 0
            }
        }
        prev_data['uid']++
        if(!('data' in prev_data)){
            prev_data['data'] = {}
        }
        prev_data['data'][prev_data['uid']] = data
        console.log(prev_data)
        writeFile(DBPath,prev_data)
    })
})
server.get('/data',(req, res) =>{
    readFile(DBPath,(err, data) =>{
        res.send(data)
    })
})

server.listen(PORT,()=>{
    console.log(`Listening on port: http://localhost:${PORT}`)
})


function readFile(path,func){
    fs.readFile(path,(err,data)=>{
        func(err,JSON.parse(data))
    })
}
function writeFile(path,data){
    fs.writeFile(path,JSON.stringify(data,undefined,4),(err)=>{
        if(err){throw err;}
    })
}

function isEmptyObj(obj){
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
}