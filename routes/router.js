const express = require("express");
const router = express.Router();

const ctrlPatient = require("../controllers/patients");
const ctrlDoctor = require("../controllers/doctors");
const ctrlAdmin = require("../controllers/admin");
const ctrlAddress = require("../controllers/address");
const verifyAccount = require("../controllers/verify_account");
const userLogin = require("../controllers/login");

const auth = require("../controllers/auth");
const contactUs = require("../controllers/miscellaneous");

//patients
router.post("/register-patient", ctrlPatient.register);
router.get("/patients", ctrlPatient.findAll);
router.get("/patients/token", ctrlPatient.findOneByCode);
router.get("/patients/data/get", auth.verifyToken, ctrlPatient.getData);
router.put("/patients/data/update", auth.verifyToken, ctrlPatient.updateData);
router.put("/patients/:token", ctrlPatient.update);

//doctors
router.get("/doctors", ctrlDoctor.findAll);
router.post("/register-doctor", ctrlDoctor.register);
router.get("/doctors/token", ctrlDoctor.findOneByCode);
router.get("/doctor/token", ctrlDoctor.findOne);
router.get("/doctors/data/get", auth.verifyToken, ctrlDoctor.getData);
router.put("/doctors/data/update", auth.verifyToken, ctrlDoctor.updateData);
router.post("/doctors/direction", ctrlAddress.register);
router.put("/doctors/:token", ctrlDoctor.update);
router.put("/doctors/:email/email", ctrlDoctor.updateByEmail);
router.put("/doctors/img/:token", ctrlDoctor.updateImg);
router.get("/doctors/accepted", ctrlDoctor.findAllActive);

//admin
router.post("/register-admin", ctrlAdmin.register);
router.get("/admin/token", ctrlAdmin.findOneByCode);

//adrress
//others
router.post("/login", userLogin.login);
router.all("/reset/password/:code", userLogin.resetPassword);
router.post("/reset/password", userLogin.resetPassword);
router.get("/verifyaccount/:code", verifyAccount.verify);
router.get("/auth", auth.verifyToken);
router.post("/contactus", contactUs.contactUsMail);

module.exports = router;
