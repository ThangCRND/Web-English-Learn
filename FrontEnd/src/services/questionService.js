import  questionApi  from './api/apiQuestion'
import authHeader from './auth-header';
export default {
    creatQuestion(examID,question){
        return questionApi().post(`addQuestion/${examID}`,question,{ headers: authHeader() })
    },
    getQuestionInExam(examID){
        return questionApi().get(`getQuestions/${examID}`,{ headers: authHeader() })
    },
    deleteQuestion(questionID){
        return questionApi().delete(`deleteQuestion/${questionID}`,{ headers: authHeader() })
    },
    getLimitQuest(examID){
        return questionApi().get(`checkLimitQuest/${examID}`,{ headers: authHeader() })
    },
    updateQuestion(questionID, questDataUpdate){
        return questionApi().patch(`updateQuestion/${questionID}`, questDataUpdate,{ headers: authHeader() })
    }
}