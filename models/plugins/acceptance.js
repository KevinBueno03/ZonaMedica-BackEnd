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

module.exports = function acceptedDoctor(schema) {
    schema.pre("findOneAndUpdate", async function (next) {
        let set = this._update.$set;
        let docToUpdate = await this.model.findOne(this.getQuery());
        if (set.accepted == "true") {
            sendEmail(
                docToUpdate.firstName,
                docToUpdate.email,
                "Bienvenido al equipo de ZonaMedica! Tu solicitud ha sido aceptada. Nos complace tenerte con nosotros."
            );
        } else {
            if (set.accepted == "false") {
                sendEmail(
                    docToUpdate.firstName,
                    docToUpdate.email,
                    "Nos entristese mencionarte que tu solicitu ha sido rechazada. Por favor ponte en contacto con nosotros para mayor informacion."
                );
            }
        }
        if (set.active == "true") {
            sendEmail(
                docToUpdate.firstName,
                docToUpdate.email,
                "Tu cuenta ha sido reactivada nuevamente."
            );
        } else {
            if (set.active == "false") {
                sendEmail(
                    docToUpdate.firstName,
                    docToUpdate.email,
                    "Tu cuenta ha sido desactivada. Por favor ponte en contacto con nosotros."
                );
            }
        }
        next();
    });
};
