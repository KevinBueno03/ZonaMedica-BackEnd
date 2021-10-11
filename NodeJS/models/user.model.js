const mongoose =require('mongoose');

var userSchema = new mongoose.Schema({
    
    firstName : {
        type: String,
        require: true
    } ,
   
    secondName : {
        type: String,
        require: true
    } ,
   
    firstLastName : {
        type: String,
        require: true
    } ,
   
    secondLastName : {
        type: String,
        require: true
    } ,

    hn_id: {
        type: String,
        require: true
    } ,

    department: {
        type: String,
        require: true
    } ,
    
    email: {
        type: String,
        require: true
    } ,
    password: {
        type: String,
        require: true
    } 

});

mongoose.model('Users',userSchema);