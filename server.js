var express = require("express");
var path  =  require("path");
var bodyParser = require("body-parser");
var http = require("http");
var app = express();
var mongoose = require('mongoose');
var api  = require("./server/routes/api");


var mongoDB = 'mongodb://172.10.1.7:27017/punitk';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );

app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));


app.use('/api',api);

app.get('*',function(req,res){
   
   res.sendFile(path.join(__dirname,'dist/index.html'));
});


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" ,function(){
    
    console.log("srever is runing")
});
