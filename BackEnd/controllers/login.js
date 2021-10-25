var mongoose = require("mongoose");
var Patients = mongoose.model("Patients");
var Doctors = mongoose.model("Doctors");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

function getUser(model, e) {
    return model.findOne({ email: e }).cursor();
}

module.exports.login = async (req, res) => {
    let e = req.body.email,
        p = req.body.password;
    if (e && p) {
        var item = getUser(Patients, e) || getUser(Doctors, e);
        item.next((err, doc) => {
            if (err) res.send(err);
            if (doc) {
                if (doc.active) {
                    bcrypt.compare(p, doc.password, (err, r) => {
                        if (err) res.send(err);
                        if (r) {
                            res.status(200).send(
                                JSON.stringify({ session_code: doc.code })
                            );
                        } else {
                            res.send("Wrong password");
                        }
                    });
                } else {
                    res.send("El usuario no esta activo.");
                }
            } else {
                res.send("User not found");
            }
        });
    } else {
        res.status(400).send("Se necesita un email y password");
    }
};
