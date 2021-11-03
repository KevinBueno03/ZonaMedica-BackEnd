const jwt = require("jsonwebtoken");

const config = process.env;

module.exports.verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.SECRET);
        req.user = decoded;
        //res.send({ token: token });
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};
