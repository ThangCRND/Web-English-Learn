const questionController = require('../controllers/questionController');
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post('/api/question/addQuestion/:examID',[authJwt.verifyToken, authJwt.isAdmin],questionController.createQuestion);

    app.patch('/api/question/updateQuestion/:questID',[authJwt.verifyToken, authJwt.isAdmin],questionController.updateQuestion);

    app.delete('/api/question/deleteQuestion/:questID',[authJwt.verifyToken, authJwt.isAdmin],questionController.deleteQuestion);

    app.get('/api/question/getQuestions/:examID',[authJwt.verifyToken],questionController.getQuestionsInExam);

    app.get('/api/question/checkLimitQuest/:examID',[authJwt.verifyToken],questionController.getLimitQuest);
  };

