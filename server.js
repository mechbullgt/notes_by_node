const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
// 4
var db = require('./config/db');

const app = express();
const port = 8000;

// 3 
app.use(bodyParser.urlencoded({
    extended:true
}));

// 5 
MongoClient.connect(db.url,(err,database)=>{
    if(err){
        console.log(err);
    } 
    db = database.db('notes_by_node');
    require('./app/routes')(app,db);
    app.listen(port,()=>{
        console.log('We are live at: '+port);
    })
});

// // 2
// require('./app/routes')(app,{});
// // 1
// app.listen(port,()=>{
//     console.log('We are live on '+port);
// });