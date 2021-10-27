var mongoose = require("mongoose");
<<<<<<< HEAD
var Doctor = mongoose.model("Doctors");
=======
var Doctors = mongoose.model("Doctors");
>>>>>>> 74067d6141e85ec088307e5519183d6f04e79ed8

module.exports.register = (req, res) => {
    let user = new Doctors();
    user.firstName = req.body.firstName;
    user.secondName = req.body.secondName;
    user.firstLastName = req.body.firstLastName;
    user.secondLastName = req.body.secondLastName;
    user.hn_id = req.body.hn_id;
    user.department = req.body.department;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phone = req.body.phone;
<<<<<<< HEAD
=======
    user.bibliography=req.body.bibliography;
    user.medAppointment_modality=req.body.medAppointment_modality;
    user.master_degree=req.body.master_degree;

>>>>>>> 74067d6141e85ec088307e5519183d6f04e79ed8

    user.save((err, doc) => {
        let r = {
            _err: false,
            message: undefined,
            items: undefined,
        };

        if (!err) {
            console.log(doc);
            res.send(doc);
        } else {
            if (err.code == 11000) {
                r._err = true;
                r.message = "Elementos duplicados";
                r.items = err.keyValue;
                res.send(r);
            }
        }
    });
};
