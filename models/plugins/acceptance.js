var mailer = require("./../../config/mailer");

function sendEmail(name, email, txt) {
    mailer.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "ZonaMedica - Cambios de Cuenta",
        html: `<h1>Cambios a tu cuenta</h1>
        <h2>Hola ${name}</h2>
        <p>${txt}</p>`,
    });
}

module.exports = function accepted(schema) {
    schema.pre("save", function (next) {
        let doc = this;
        if (doc.isModified("accepted")) {
            if (doc.accepted == true)
                sendEmail(doc.firstName, doc.email, "Has sido aceptado.");
            if (doc.accepted == false)
                sendEmail(doc.firstName, doc.email, "Has sido removido.");
        }
        next();
    });
};
