// File dedicado a codigo que no tiene un fin especifico sin embargo brinda utilidad

var mailer = require("../config/mailer");

module.exports.contactUsMail = function (req, res) {
    r = { status: "OK" };
    console.log(req.body.message);
    mailer
        .sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: "ZonaMedica - Contact Us",
            html: `
            <div>
            <h1>Contactanos</h1>
            <h2>Nuevo mensaje de parte de ${req.body.name}, email: ${req.body.email}</h2>
            <p>Mensaje: <br> ${req.body.message}</p>
            </div>`,
        })
        .catch((err) => {
            r.status = "Failed";
            res.send(r);
        });
    res.status(200).send(r);
};
