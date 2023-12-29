const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
// tổng hợp 2 middleware xác thực đăng ký và xác thực jwt
module.exports = {
    authJwt,
    verifySignUp
};