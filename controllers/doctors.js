var mongoose = require("mongoose");
var Doctor = mongoose.model("Doctors");

module.exports.register = (req, res) => {
    let user = new Doctor();
    user.firstName = req.body.firstName;
    user.secondName = req.body.secondName;
    user.firstLastName = req.body.firstLastName;
    user.secondLastName = req.body.secondLastName;
    user.hn_id = req.body.hn_id;
    user.department = req.body.department;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phone = req.body.phone;
    user.bibliografy = req.body.bibliografy;
    user.master_degree = req.body.master_degree;
    user.medAppointment_modality_inHouse =
        req.body.medAppointment_modality_inHouse;
    user.medAppointment_modality_inClinic =
        req.body.medAppointment_modality_inClinic;
    user.medAppointment_modality_online =
        req.body.medAppointment_modality_online;

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

const list = [
    "firstName",
    "secondName",
    "firstLastName",
    "secondLastName",
    "hn_id",
    "department",
    "phone",
    "bibliografy",
    "master_degree",
    "accepted",
];

module.exports.findOneByCode = async (req, res) => {
    //const code = req.params.code;
    const code = req.headers["x-access-token"];

    Doctor.findOne({ code: code })
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found Doctor with code " + code,
                });
            else res.send([data]);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving docotor with code=" + code,
            });
        });
};


module.exports.getData = async function (req, res) {
    user = Doctor.findOne({ email: req.user.email }, function (err, data) {
        if (err) res.send(err);
        if (data) {
            d = req.body.data;
            if (d == "all") {
                t = {};
                for (let i = 0; i < list.length; i++) {
                    t[list[i]] = data[list[i]];
                }
                res.status(200).send(t);
            } else if (Object.prototype.toString.call(d) === "[object Array]") {
                t = {};
                err = { message: "Invalid query parameters", query: [] };
                for (let o = 0; o < d.length; o++) {
                    console.log(d[o]);
                    if (list.includes(d[o])) {
                        t[d[o]] = data[d[o]];
                    } else {
                        err.query.push(d[o]);
                    }
                }
                if (err.query.length > 0) {
                    t.err = err;
                }
                res.status(200).send(t);
            } else {
                if (list.includes(d)) {
                    t = {};
                    t[d] = data[d];
                    res.status(200).send(t);
                } else {
                    res.status(400).send("Invalid query");
                }
            }
        } else {
            res.status(400).send("Missing parameters");
        }
    });
};

module.exports.findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};

    Doctor.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving patients.",
            });
        });
};

module.exports.update = (req, res) => {

    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    Doctor.findOneAndUpdate({code:req.params.token},
        {$set:{img:req.body.img}}, { returnOriginal: false })
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Doctor with token=${req.params.token}. Maybe Docotor was not found!`
          });
        } else res.send({ message: "Dato actualizado exitosamente"});
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Doctor with id=" + req.params.token
        });
      });

  };


module.exports.updateData = async function (req, res) {
    user = Doctor.findOne({ email: req.user.email }, function (err, data) {
        if (err) res.send(err);
        if (data) {
            d = req.body.data;
            t = {};
            err = { message: "Invalid query parameters", query: [] };
            for (const p in d) {
                if (list.includes(p)) {
                    data[p] = d[p];
                } else {
                    err.query.push(p);
                }
            }
            if (err.query.length > 0) {
                t.err = err;
            }
            data.save();
            res.status(200).send(t);
        } else {
            res.status(400).send("Missing parameters: data");
        }
    });
};
