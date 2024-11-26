var mongoose = require("mongoose");
var Address = mongoose.model("Address");

module.exports.register = (req, res) => {
    let address = new Address();
    address.token = req.headers["x-access-token"];
    address.lng = req.body.lng;
    address.lat = req.body.lat;
   
    address.save((err, doc) => {
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

module.exports.findOneByCode = async (req, res) => {
    //const code = req.params.code;
    const code = req.params.token;

    Address.findOne({ token: code })
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