var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var config = require("./../../config/config");
var mongoose = require("mongoose");

var P = mongoose.Schema({}, { strict: false });

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

function sendConfirmationEmail(name, email, confirmationCode) {
    url = config[process.env.ENV].url.verify_email;
    code = `${url + confirmationCode}`;
    transport
        .sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "ZonaMedica - Confirma tu cuenta",
            html: `<h1>Confirmacion de correo electronico</h1>
          <h2>Hola ${name}</h2>
          <p>Gracias por inscribirte. Por favor confirma tu correo electronico ingresando al siguiente enlace:</p>
          <a href="${code}">Click aqui</a>
          </div>`,
        })
        .catch((err) => console.log(err));
}

module.exports = function verificationToken(schema) {
    schema.add({
        code: {
            type: String,
            unique: true,
        },
    });

    schema.pre("save", function (next) {
        let doc = this;
        if (doc.isModified("email") || doc.isNew) {
            doc.active = false;
            doc.code = jwt.sign({ email: doc.email }, process.env.SECRET);
        }
        next();
    });

    schema.post("save", function (doc) {
        if (!doc.active)
            sendConfirmationEmail(
                doc.firstName,
                doc.email,
                doc.confirmationCode
            );
    });
};
