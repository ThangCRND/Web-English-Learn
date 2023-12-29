const db = require("../models");
const config = require("../config/authConfig");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// viết chức năng đăng ký
exports.signup = (req, res) => {
  //Lưu user vào database

  User.create({
    userID: req.body.userID,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          // set role bằng user bình thường
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      // nếu không tạo được user thì trả về code 500
      res.status(500).send({ message: err.message });
    });
};
// viết chức năng đăng nhập
exports.signin = (req, res) => {
  // tìm user bằng trường username
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
       // nếu không có user thì trả về code 404
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
       // kiểm trả password
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
         // nếu password invalid thì trả về code 401
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      // tạo token jwt để lưu dữ liệu
      const token = jwt.sign({ id: user.userID },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });
       // lưu role người dùng vào trong jwt
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.userID,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
        // trả về kết quả 500 nếu không tạo được jwt
      res.status(500).send({ message: err.message });
    });
};


