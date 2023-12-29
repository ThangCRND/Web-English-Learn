import Api from './api/apiExam'
import questionAPI from './api/apiQuestion'
import authHeader from './auth-header';

export default {
    getAllExams () {
      return Api().get('getAllExams')
    },
    createExam (exam) {
        return Api().post('addExam',exam,{ headers: authHeader() })
    },
    getExam(examID) {
      return Api().get(`getExam/${examID}`,{ headers: authHeader() });
    },
    deleteExam(examID){
      return Api().delete(`deleteExam/${examID}`,{ headers: authHeader() })
    },
    updateExam(examID, updatedExamData) {
      return Api().patch(`updateExam/${examID}`, updatedExamData,{ headers: authHeader() });
    },
    getNumOfQuest(examID){
      return questionAPI().get(`checkLimitQuest/${examID}`)
    },
    getExam(examID){
      return Api().get(`getExam/${examID}`,{ headers: authHeader() })
    },
    getDuration(examID){
      return Api().get(`getDuration/${examID}`,{ headers: authHeader() })
    }

}