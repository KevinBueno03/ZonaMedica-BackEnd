let mongoose = require("mongoose");
let validator = require("validator");
let bcrypt = require("bcryptjs");
let timestampPlugin = require("./plugins/timestamp");

var userSchema = new mongoose.Schema({
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
        required: false,
    },

    hn_id: {
        type: String,
        required: true,
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
            message: "El email se encuentra en uso",
        },
    },
    password: {
        type: String,
        required: true,
    },
    active: { type: Boolean, default: false },
});

userSchema.virtual("fullName").get(function () {
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

userSchema.plugin(timestampPlugin);

userSchema.pre("save", function (next) {
    const user = this;

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError);
                    }

                    user.password = hash;
                    next();
                });
            }
        });
    } else {
        return next();
    }
});

module.exports = mongoose.model("Users", userSchema);
