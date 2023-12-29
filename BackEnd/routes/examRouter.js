
const examController = require('../controllers/examController');
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/exam/addExam',[authJwt.verifyToken,authJwt.isAdmin] ,examController.createExam);

    app.get('/api/exam/getAllExams',examController.getAllExams);

    app.get('/api/exam/getExam/:examID',[authJwt.verifyToken] ,examController.getExam);

    app.get('/api/exam/getDuration/:examID',[authJwt.verifyToken],examController.getDuration);

    app.patch('/api/exam/updateExam/:id',[authJwt.verifyToken,authJwt.isAdmin], examController.updateExam);

    app.delete('/api/exam/deleteExam/:examID',[authJwt.verifyToken,authJwt.isAdmin], examController.deleteExam);

    
};


