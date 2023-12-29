const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");
const db = require("../models");
const User = db.user;


verifyToken = (req, res, next) => {
    //  Lấy từ Token từ header x-access-token
    let token = req.headers["x-access-token"];
  
    // check xem không có token thì trả về lỗi
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    // Thực hiện lấy private key để decoded token
    jwt.verify(token,
              config.secret,
              (err, decoded) => {
                 //Decode error thì trả về 401
                if (err) {
                  return res.status(401).send({
                    message: "Unauthorized!",
                  });
                }
                // trả về userID sau khi đã decode.
                req.userId = decoded.id;
                next();
              });
  };
  


//Role admin
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        // lấy role của user để kiểm tra
        for (let i = 0; i < roles.length; i++) {
            // nếu user có tồn tại và là admin thì thực hiện tiếp
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    });
};



const authJwt = {
    verifyToken,
    isAdmin
};

module.exports = authJwt;