const resultController = require('../controllers/resultController');
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

    app.get('/api/result/getQuestResult/:userID/:examID/:turnID',[authJwt.verifyToken],resultController.getTrackingQuestInExam);

    app.get('/api/result/getScoreAndQuest/:userID/:examID/:turnID',[authJwt.verifyToken],resultController.getQuestionsAndCorrectQuest);

    app.get('/api/result/getResult/:turnID',[authJwt.verifyToken],resultController.getResult);

    app.post('/api/result/addResult',[authJwt.verifyToken],resultController.addResult);
};