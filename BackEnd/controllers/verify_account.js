var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var Patients = mongoose.model("Patients");
var Doctors = mongoose.model("Doctors");

var map = {
    doctors: Doctors,
    patients: Patients,
};

function getUser(model, e) {
    return model.findOne({ email: e }).cursor();
}

module.exports.verify = (req, res) => {
    let e = jwt.verify(req.params.code, process.env.SECRET, (err, r) => {
        if (err) {
            res.send("Invalid token");
            return "none";
        } else {
            return r.email;
        }
    });
    if (req.query.type == "doctors" || req.query.type == "patients") {
        var item = getUser(map[req.query.type], e);
        item.next((err, doc) => {
            if (err) res.send(err);
            if (doc) {
                if (!doc.active) {
                    doc.active = true;
                    doc.save().then((err) => {
                        res.send("Usuario activado. Ya puedes iniciar sesion.");
                    });
                } else {
                    res.send("Usuario ya activo");
                }
            }
        });
    } else {
        res.status(400).send("Invalid parameters");
    }
};
