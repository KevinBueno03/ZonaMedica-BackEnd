const express = require("express");
const router = express.Router();

const ctrlPatient = require("../controllers/patients");
const ctrlDoctor = require("../controllers/doctors");
const verifyAccount = require("../controllers/verify_account");
const userLogin = require("../controllers/login");

router.post("/register-patient", ctrlPatient.register);
router.post("/register-doctor", ctrlDoctor.register);
router.post("/login", userLogin.login);
router.get("/verifyaccount/:code", verifyAccount.verify);
module.exports = router;
