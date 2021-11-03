var mongoose = require("mongoose");
var Patients = mongoose.model("Patients");
var Doctors = mongoose.model("Doctors");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var config = require("../config/config");

var map = {
    doctors: Doctors,
    patients: Patients,
};

function getUser(model, e) {
    return model.findOne({ email: e }).cursor();
}

module.exports.login = (req, res) => {
    let e = req.body.email,
        p = req.body.password;
    if (e && p) {
        if (req.query.type == "doctors" || req.query.type == "patients") {
            var item = getUser(map[req.query.type], e);
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
            res.status(400).send("Invalid parameters");
        }
    } else {
        res.status(400).send("Se necesita un email y password");
    }
};

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

function sendResetPasswordEmail(name, email, confirmationCode, model) {
    url = config[process.env.ENV].url.reset_password;
    code = `${url + confirmationCode}?type=${model}`;
    transport
        .sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "ZonaMedica - Reset Password",
            html: `<h1>Reset password email</h1>
          <h2>Hola ${name}</h2>
          <p>Sigue el siguiente enlace para hacer reset de tu password:</p>
          <a href="${code}">Click aqui</a>
          </div>`,
        })
        .catch((err) => console.log(err));
}

module.exports.resetPassword = function (req, res) {
    if (req.method == "POST") {
        if (req.query.type == "doctors" || req.query.type == "patients") {
            if (req.params.code) {
                try {
                    const decoded = jwt.verify(
                        req.params.code,
                        process.env.SECRET
                    );
                    var item = getUser(map[req.query.type], decoded.email);
                    item.next((err, doc) => {
                        if (err) res.send(err);
                        if (doc) {
                            doc.password = req.body.password
                                ? req.body.password
                                : res.status(400).send("Missing parameters");
                            doc.save();
                            res.status(200).send(
                                "Password changed successfully"
                            );
                        } else {
                            res.status(400).send("User not found");
                        }
                    });
                } catch (err) {
                    return res.status(401).send("Invalid Token or Expired");
                }
            } else if (req.body.email) {
                var item = getUser(map[req.query.type], req.body.email);
                item.next((err, doc) => {
                    if (err) {
                        res.send(err);
                    }
                    if (doc) {
                        const token = jwt.sign(
                            { email: doc.email },
                            process.env.SECRET,
                            {
                                expiresIn: "2h",
                            }
                        );
                        sendResetPasswordEmail(
                            doc.firstName,
                            doc.email,
                            token,
                            req.query.type
                        );
                        res.status(200).send("Password reset email sent");
                    } else {
                        res.status(400).send("User not found");
                    }
                });
            } else {
                res.status(400).send("Invalid parameters");
            }
        } else {
            res.status(400).send("Invalid parameters");
        }
    } else if (req.method == "GET") {
        res.send("Hola");
    }
};
