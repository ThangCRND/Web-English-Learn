const audioControler = require('../controllers/audioController');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

    app.get('/api/audio/getAudio/:fileID', audioControler.getAudio);
    app.get('/api/audio/getDriveData/:fileId', audioControler.getDriveData);
    app.post('/api/audio/uploadAudio',audioControler.uploadAudio);
    app.post('/api/audio/deleteAudio/:fileId',audioControler.deleteAudio);
};