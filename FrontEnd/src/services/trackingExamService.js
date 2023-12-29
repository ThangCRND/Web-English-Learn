import trackingExamApi from './api/apiTrackingExam'
import authHeader from './auth-header';
export default {
    AddTrackingExam(questions) {
        return trackingExamApi().post('addTrackingExam',questions,{ headers: authHeader() })
    }
}