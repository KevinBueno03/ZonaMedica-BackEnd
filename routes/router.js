const express = require("express");
const router = express.Router();

const ctrlPatient = require("../controllers/patients");
const ctrlDoctor = require("../controllers/doctors");
const verifyAccount = require("../controllers/verify_account");
const userLogin = require("../controllers/login");
const auth = require("../controllers/auth");

//patients
router.post("/register-patient", ctrlPatient.register);
router.get("/patients", ctrlPatient.findAll);
router.get("/patients/:code", ctrlPatient.findOneByCode);
router.get("/patients/data", auth.verifyToken, ctrlPatient.getData);
router.put("/patients/data/update", auth.verifyToken, ctrlPatient.updateData);

//doctors
router.post("/register-doctor", ctrlDoctor.register);
router.get("/doctors/data", auth.verifyToken, ctrlDoctor.getData);
router.put("/doctors/data/update", auth.verifyToken, ctrlDoctor.updateData);

//others
router.post("/login", userLogin.login);
router.all("/reset/password/:code", userLogin.resetPassword);
router.post("/reset/password", userLogin.resetPassword);
router.get("/verifyaccount/:code", verifyAccount.verify);
router.get("/auth", auth.verifyToken);

module.exports = router;
