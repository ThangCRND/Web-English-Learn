import profileApi from './api/apiProfile'
import authHeader from './auth-header';

export default {
    getProfileUser(userID){
        return profileApi().get(`getProfile/${userID}`,{ headers: authHeader() });
    },
    createProfileUser(userID){
        return profileApi().post(`createProfile/${userID}`);
    },
    editProfileUser(userID,data){
        return profileApi().patch(`editProfile/${userID}`,data,{ headers: authHeader()});
    },
    uploadImage(image){
        return profileApi().post(`uploadImage`,image);
    },
    saveImage(userID,fileID){
        return profileApi().post(`saveImage/${userID}/${fileID}`);
    },
    deleteImage(fileID){
        return profileApi().post(`deleteImage/${fileID}`);
    },
    getFileID(userID){
        return profileApi().get(`getFileID/${userID}`);
    },
    getHistoryProfile(userID){
        return profileApi().get(`getHistoryProfile/${userID}`,{ headers: authHeader() });
    },
    getTotalTurns(userID){
        return profileApi().get(`getTotalTurns/${userID}`,{ headers: authHeader() });
    }
}