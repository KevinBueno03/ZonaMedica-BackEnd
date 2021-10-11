const express = require('express');
const cors = require('cors');
const {mongoose} = require('./models/db');
//const bodyParser = require('body-parser');





//routes
const rtsIndex =require('./routes/index.router');

//middleware
var app = express();
app.use(cors());
app.use(express.urlencoded());

app.use(express.json());
//app.use(bodyParser.json());

//app.use(express.json());
app.use('/api',rtsIndex);
//api/register para registrar
//server
app.listen(4300, function () {
    console.log('Servidor Levantato')
  })
  