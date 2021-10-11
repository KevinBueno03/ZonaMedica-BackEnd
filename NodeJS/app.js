const express = require('express');
const {mongoose} = require('./models/db');





//routes
const rtsIndex =require('./routes/index.router');

//middleware
var app = express();
//app.use(express.json());
app.use('/api',rtsIndex);
//api/register para registrar
//server
app.listen(4300, function () {
    console.log('Servidor Levantato')
  })
  