let mongoose = require("mongoose");
let validator = require("validator");


const schema = new mongoose.Schema({
    
    date:{
        type:String,
        required:true
    },
    hour:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    medAppointment_modality_inHouse: {
        default: false,
        type: Boolean,
    },
    medAppointment_modality_inClinic: {
        default: false,
        type: Boolean,
    },
    medAppointment_modality_online: {
        default: false,
        type: Boolean,
    },
    payment_cash:{
        default:false,
        type:Boolean
    },
    payment_digital:{
        default:false,
        type:Boolean
    },
    id_patient:{
        required:true,
        type:mongoose.Types.ObjectId
    },
    id_doctor:{
        required:true,
        type:mongoose.Types.ObjectId
    }
        

});

module.exports = mongoose.model("medAppointment", schema);
