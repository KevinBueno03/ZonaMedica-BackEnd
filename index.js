require("dotenv").config();
require("./config/config.js");
const express = require("express");
const cors = require("cors");
const { mongoose } = require("./models/db");

//routes
const rtsIndex = require("./routes/router");

//middleware
var app = express();

app.use(
    cors({
        origin: [`http://${process.env.IPANGULAR}:${process.env.PORTANGULAR}`],
        credentials: true,
    })
);
app.use(express.urlencoded());
app.use(express.json());

//routers
app.use("/api", rtsIndex); // api endpoint

//server
app.listen(process.env.PORT, function () {
    console.log("Servidor Levantado");
});