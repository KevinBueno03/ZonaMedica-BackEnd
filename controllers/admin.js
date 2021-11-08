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

