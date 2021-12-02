var mongoose = require("mongoose");
var appointment = mongoose.model("medAppointment");

module.exports.register = (req, res) => {
    let item = new appointment();
    
    item.date=req.body.date;
    item.hour=req.body.hour;
    item.description=req.body.description;
    item.medAppointment_modality_inHouse=req.body.medAppointment_modality_inHouse; 
    item.medAppointment_modality_inClinic=req.body.medAppointment_modality_inClinic; 
    item.medAppointment_modality_online=req.body.medAppointment_modality_online;
    item.payment_cash=req.body.payment_cash;
    item.payment_digital=req.body.payment_digital;
    item.id_patient=req.body.id_patient;
    item.id_doctor=req.body.id_doctor;


    item.save((err, doc) => {
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


module.exports.findAllByDoctorID = async (req, res) => {
     
        appointment.find({ id_doctor: mongoose.Types.ObjectId(req.params.id_doctor) })
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

module.exports.findAllByPatienteID = async (req, res) => {
       
    
        appointment.find({ id_patient: mongoose.Types.ObjectId(req.params.id_patient) })
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


