var mongoose = require("mongoose");
var Patients = mongoose.model("Patients");

module.exports.register = (req, res) => {
    let user = new Patients();
    user.firstName = req.body.firstName;
    user.secondName = req.body.secondName;
    user.firstLastName = req.body.firstLastName;
    user.secondLastName = req.body.secondLastName;
    user.hn_id = req.body.hn_id;
    user.department = req.body.department;
    user.email = req.body.email;
    user.password = req.body.password;

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
                console.log(err);
                r._err = true;
                r.message = "Elementos duplicados";
                r.items = err.keyValue;
                res.send(r);
            }
        }
    });
};

module.exports.findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};

    Patients.find(condition)
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

module.exports.findOneByCode = async (req, res) => {
    //const code = req.params.code;
    const code = req.headers["x-access-token"];

    Patients.findOne({ code: code })
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found Patient with code " + code,
                });
            else res.send([data]);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Patient with code=" + code,
            });
        });
};

const list = [
    "firstName",
    "secondName",
    "firstLastName",
    "secondLastName",
    "hn_id",
    "department",
];

module.exports.getData = async function (req, res) {
    user = Patients.findOne({ email: req.user.email  }, function (err, data) {
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

module.exports.updateData = async function (req, res) {
    user = Patients.findOne({ email: req.user.email }, function (err, data) {
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

module.exports.update = async (req, res) => {

    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    Patients.findOneAndUpdate({code:req.params.token},
        {$set:
            {
            files:req.body.files,
            img:req.body.img,
            firstName : req.body.firstName,
        	secondName : req.body.secondName,
        	firstLastName : req.body.firstLastName,
        	secondLastName : req.body.secondLastName,
        	hn_id : req.body.hn_id,
        	department : req.body.department,
        	email : req.body.email,
        	password : req.body.password,
        	active: req.body.active
            }
        },
        
        { returnOriginal: false })
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Patient with token=${req.params.token}. Maybe Patient was not found!`
          });
        } else res.send({ message: "Dato actualizado exitosamente"});
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Patient with token=" + req.params.token
        });
      });

  };

module.exports.updateByEmail = async (req, res) => {

    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    Patients.findOneAndUpdate({email:req.params.email},
        {$set:
            {
            files:req.body.files,
            img:req.body.img,
            firstName : req.body.firstName,
        	secondName : req.body.secondName,
        	firstLastName : req.body.firstLastName,
        	secondLastName : req.body.secondLastName,
        	hn_id : req.body.hn_id,
        	department : req.body.department,
        	active: req.body.active
            }
        },
        
        { returnOriginal: false })
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Patient with email=${req.params.email}. Maybe Patient was not found!`
          });
        } else res.send({ message: "Dato actualizado exitosamente"});
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Patient with email=" + req.params.email
        });
      });

  };