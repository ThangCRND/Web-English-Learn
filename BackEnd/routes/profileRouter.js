const profileController = require('../controllers/profileController');
const { authJwt } = require("../middleware");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

    app.get('/api/profile/getProfile/:userID',[authJwt.verifyToken],profileController.getProfileUser);
    app.patch('/api/profile/editProfile/:userID',[authJwt.verifyToken],profileController.editProfileUser);
    app.get('/api/profile/getFileID/:userID',profileController.getFileID);
    app.get('/api/profile/getHistoryProfile/:userID',[authJwt.verifyToken],profileController.getHistoryProfile);
    app.get('/api/profile/getTotalTurns/:userID',[authJwt.verifyToken],profileController.getTotalTimeTakeQuiz);

    app.post('/api/profile/createProfile/:userID',profileController.createProfileUser);
    app.get('/api/profile/getImage/:fileID',profileController.getImage);
    app.post('/api/profile/saveImage/:userID/:fileID',profileController.saveImage);
    app.post('/api/profile/uploadImage',profileController.uploadImage);
    app.post('/api/profile/deleteImage/:fileID',profileController.deleteImage);

};