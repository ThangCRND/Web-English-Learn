import resultApi from './api/apiResult'
import authHeader from './auth-header';
export default {
    
    getQuestionTracked(examID,userID,turnID){
        return resultApi().get(`getQuestResult/${userID}/${examID}/${turnID}`,{ headers: authHeader() })
    },
    getQuestionsAndCorrectQuest(examID,userID,turnID){
        return resultApi().get(`getScoreAndQuest/${userID}/${examID}/${turnID}`,{ headers: authHeader() })
    },
    getResult(turnID){
        return resultApi().get(`getResult/${turnID}`,{ headers: authHeader() });
    },
    addResult(data){
        return resultApi().post(`addResult`,data,{ headers: authHeader() });
    }
}