let mongoose = require("mongoose");
let validator = require("validator");

const addressSchema = new mongoose.Schema({

    token: {
        type: String,
        required: true,
      
    },
    latitud: {
        type: String,
        required: true,
    },
    longitud: { 
        type: String, 
        required: true 
    }


});

module.exports = mongoose.model("Address", addressSchema);
