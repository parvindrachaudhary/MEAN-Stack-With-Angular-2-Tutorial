const express = require('express');

const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const blogs =require('./routes/blogs')(router);
const bodyParser = require('body-parser');
const cors =require('cors');

   mongoose.Promise = global.Promise;
   mongoose.connect(config.uri, (err)=>{
   	if(err){
   		console.log('could not connect database: ',err);
   	} else{


   		console.log('connect to database: ' + config.db);
   	}
   });

app.use(cors({
   origin:'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static( __dirname	+ '/client/dist/client/'));
app.use('/authentication', authentication);
app.use('/blogs',blogs);

app.get('*',(req,res) => {
	res.sendFile(path.join( __dirname + '/client/dist/client/index.html'));
});

app.listen(8080,()=>{
	console.log("server is running on port 8080");
});