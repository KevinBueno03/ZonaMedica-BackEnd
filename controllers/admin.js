var mongoose = require("mongoose");
var Admin = mongoose.model("Admin");

module.exports.register = (req, res) => {
    let user = new Admin();
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
}

module.exports.findOneByCode = async (req, res) => {
    //const code = req.params.code;
    const code = req.headers["x-access-token"];

    Admin.findOne({ code: code })
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found Admin with code " + code,
                });
            else res.send([data]);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving admin with code=" + code,
            });
        });
};
