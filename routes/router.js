const express = require("express");
const router = express.Router();

const ctrlPatient = require("../controllers/patients");
const ctrlDoctor = require("../controllers/doctors");
const verifyAccount = require("../controllers/verify_account");
const userLogin = require("../controllers/login");
const auth = require("../controllers/auth");

//patientes
router.post("/register-patient", ctrlPatient.register);
router.get("/patients", ctrlPatient.findAll);
router.get("/patients/:code", ctrlPatient.findOneByCode);


//doctors
router.post("/register-doctor", ctrlDoctor.register);

//others
router.post("/login", userLogin.login);
router.get("/verifyaccount/:code", verifyAccount.verify);
router.get("/auth",auth.verifyToken);


module.exports = router;
