// General Config object
var config = {
    dev: {
        url: {
            verify_email: `http://${process.env.IP}:${process.env.PORT}/api/verifyaccount/`,
            reset_password: `http://${process.env.IP}:${process.env.PORT}/api/reset/password/`,
        },
    },
    prod: {
        url: {
            verify_email: `https://e151-181-115-59-83.ngrok.io/api/verifyaccount/`,
            reset_password: "",
        },
    },
};

module.exports = config;
