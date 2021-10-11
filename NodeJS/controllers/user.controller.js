
const mongoose = require('mongoose')
const Users = mongoose.model('Users');
module.exports.register = (req,res) =>{
    console.log(req.body);
   var user = new Users();
    user.firstName=req.body.firstName;
    user.secondName=req.body.secondName;
    user.firstLastName=req.body.firstLastName;
    user.secondLastName=req.body.secondLastName;
    user.hn_id=req.body.hn_id;
    user.department=req.body.department;
    user.email=req.body.email;
    user.password=req.body.password;
  
    user.save((err,doc)=>{
        if(!err) res.send(doc);
    });
}
