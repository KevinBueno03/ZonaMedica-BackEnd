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

module.exports.listALL= async(res) => {
    const patients = await Patients.find();
    res.send(patients);
};

module.exports.listOne= async(req,res) => {
    
    try {
		
        const patients = await Patients.findOne({code:req.params.id});
		res.send(patients)
	} catch {
		res.status(404)
		res.send({ error: "patient doesn't exist!" })
	}

};


