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
                res.send(err);
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
    const code = req.params.code;

    Patients.findOne({ code: code })
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found Patient with code " + code,
                });
            else res.send(data);
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
    user = Patients.findOne({ email: req.user.email }, function (err, data) {
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
                    user[p] = d[p];
                } else {
                    err.query.push(p);
                }
            }
            if (err.query.length > 0) {
                t.err = err;
            }
            user.save();
            res.status(200).send(t);
        } else {
            res.status(400).send("Missing parameters: data");
        }
    });
};
