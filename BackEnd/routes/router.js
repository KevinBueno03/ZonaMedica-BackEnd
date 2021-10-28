const express = require("express");
const router = express.Router();

const ctrlPatient = require("../controllers/patients");
const ctrlDoctor = require("../controllers/doctors");
const verifyAccount = require("../controllers/verify_account");
const userLogin = require("../controllers/login");
const auth = require("../controllers/auth");


router.post("/register-patient", ctrlPatient.register);
router.post("/patients", ctrlPatient.listALL);
router.post("/patients/:id", ctrlPatient.listOne);

router.post("/register-doctor", ctrlDoctor.register);


router.post("/login", userLogin.login);
router.get("/verifyaccount/:code", verifyAccount.verify);

router.post("/auth",auth,(req,res)=>{
    res.status(200).send("Entro al token y es valido")
})


module.exports = router;
