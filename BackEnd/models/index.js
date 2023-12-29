const dbConfig = require('../config/dbConfig.js');

const {Sequelize,DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host:dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle:dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('connected..')
})
.catch(error=>{

    console.log('Error: ' + error);

})

//Khai báo model
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
//model nào muốn sử dụng database khai báo ở đây
db.exams = require('./examModel.js')(sequelize,DataTypes)
db.questions = require('./questionModel.js')(sequelize,DataTypes)
db.answers = require('./answerModel.js')(sequelize,DataTypes)
db.results = require('./resultModel.js')(sequelize,DataTypes)
db.trackingExam = require('./trackingExamModel.js')(sequelize,DataTypes)
db.user = require("../models/userModel.js")(sequelize,DataTypes);
db.role = require("../models/roleModel.js")(sequelize,DataTypes);
db.profile = require("../models/profileModel.js")(sequelize,DataTypes)



db.role.belongsToMany(db.user, {
    through: "user_roles"
});
db.user.belongsToMany(db.role, {
    through: "user_roles"
});


db.ROLES = ["user","admin"]


module.exports = db