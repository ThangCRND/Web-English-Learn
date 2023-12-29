import audioApi from './api/apiAudio'

export default {
    getAudio(fileID){
        return audioApi().get(`getAudio/${fileID}`);
    },
    getInfoAudio(fileId){
        return audioApi().get(`getDriveData/${fileId}`);
    },
    uploadAudio(audio){
        return audioApi().post(`uploadAudio`,audio);
    },
    deleteAudio(fileId){
        return audioApi().post(`deleteAudio/${fileId}`);
    }
}