let mongoose = require("mongoose");
let validator = require("validator");
let timestampPlugin = require("./plugins/timestamp");
let verificationToken = require("./plugins/verification");
let passwordHash = require("./plugins/password");

const adminSchema = new mongoose.Schema({

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


adminSchema.plugin(timestampPlugin);
adminSchema.plugin(passwordHash);
adminSchema.plugin(verificationToken);

module.exports = mongoose.model("Admin", adminSchema);
