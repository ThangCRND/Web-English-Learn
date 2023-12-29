const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

// kiểm tra username và email bị trùng 
checkDuplicateUsernameOrEmail = (req, res, next) => {
    //Check Username
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }
  
      //Check Email
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
  
        next();
      });
    });
  };
  // kiểm tra role có tồn tại
  checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
           // nếu role chưa tồn tại trong database thì trả về 400
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
  };
  // xác thực đăng ký sử dụng 2 hàm trẻn để kiểm tra
  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = verifySignUp;
  

