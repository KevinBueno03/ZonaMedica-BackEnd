let bcrypt = require("bcryptjs");

module.exports = function hashPassword(schema) {
    schema.pre("save", function (next) {
        const user = this;

        if (this.isModified("password") || this.isNew) {
            bcrypt.genSalt(10, function (saltError, salt) {
                if (saltError) {
                    return next(saltError);
                } else {
                    bcrypt.hash(
                        user.password,
                        salt,
                        function (hashError, hash) {
                            if (hashError) {
                                return next(hashError);
                            }

                            user.password = hash;
                            next();
                        }
                    );
                }
            });
        } else {
            return next();
        }
    });
};
