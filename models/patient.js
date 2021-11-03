let mongoose = require("mongoose");
let validator = require("validator");
let timestampPlugin = require("./plugins/timestamp");
let verificationToken = require("./plugins/verification");
let passwordHash = require("./plugins/password");

var patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    secondName: {
        type: String,
        required: false,
    },

    firstLastName: {
        type: String,
        required: true,
    },

    secondLastName: {
        type: String,
        required: true,
    },

    hn_id: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return value.length == 13;
            },
            message: "DNI debe ser igual a 13",
        },
    },

    department: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: "Email no valido",
        },
    },
    password: {
        type: String,
        required: true,
    },
    active: { type: Boolean, default: false },
});

patientSchema.virtual("fullName").get(function () {
    return (
        this.firstName +
        " " +
        this.secondName +
        " " +
        this.firstLastName +
        " " +
        this.secondLastName
    );
});

patientSchema.plugin(timestampPlugin);
patientSchema.plugin(passwordHash);
patientSchema.plugin(verificationToken);

module.exports = mongoose.model("Patients", patientSchema);
