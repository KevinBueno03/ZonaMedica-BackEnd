let mongoose = require("mongoose");
let validator = require("validator");

const addressSchema = new mongoose.Schema({

    token: {
        type: String,
        required: true,
      
    },
    lng: {
        type: String,
        required: true,
    },
    lat: { 
        type: String, 
        required: true 
    }


});

module.exports = mongoose.model("Address", addressSchema);
