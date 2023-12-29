import { defineStore, acceptHMRUpdate } from 'pinia'
import questionService from '../services/questionService';



export const useQuestionStore = defineStore('questionStore', {
  state: () => ({
    questions: [],
    choosedQuestion:[],
    validateQuestion:[],
  }),
  getters: {
    totalQuestions() {
      return this.questions.length;
    },
    lastIndex(){
      return this.questions.length-1;
    }

  },
  actions: {
    async addQuestion(examID,question){
      this.questions.push(question)
      try {
        
        const response = await questionService.creatQuestion(examID,question);
        console.log(question)
        console.log("Question created: ", response.data);
      } catch (err) {
        console.log("Error to create: ", err);
      }
    },
    async updateQuestion(questionID, questDataUpdate) {
      try {
        // Send a request to the API to update the exam
        const response = await questionService.updateQuestion(questionID,questDataUpdate);

        if (response.status === 200) {
          // Find the index of the exam to update in the local exams array
          const questionIndex = this.questions.findIndex((question) => question.questionID === questionID);

          if (questionIndex !== -1) {
            // Update the local exam with the new data
            this.questions[questionIndex] = response.data;
          } else {
            console.error('Question not found in the local store.');
          }
        } else {
          console.error('Update quest request failed.');
        }
      } catch (error) {
        console.error('Error updating the quest:', error);
      }
    },
    async getQuestionInExam(examID){
      try{
        const response =await questionService.getQuestionInExam(examID);
        this.questions = response.data;
        console.log("Hello haslili",this.questions)
        console.log("GET data successful: ", response.data);
      }catch(error){
        console.log("GET data failed: ", error);
      }
    },
    async getLimitQuest(examID){
      try{
        const response = await questionService.getLimitQuest(examID);
        this.validateQuestion = response.data;
        console.log("GET data successful: ", response.data);
      }catch(error){
        console.log("GET data failed: ", error);
      }
    },
    async deleteQuestion(questionID){
      try{
        const response = await questionService.deleteQuestion(questionID);
        console.log("Delete question successful: ",response.data);
      }catch(error){
        console.log("Delete question failed: ",error);
      }
    },
    filteredQuestion(examID) {
      const numExamID = Number(examID)
      return this.questions.filter(question => question.examID === numExamID);
    },
    randomQuestionID() {
      const now = new Date();
      const seconds = now.getSeconds();
      const miliseconds = now.getMilliseconds();
      const formattedTime = `${String(seconds).padStart(2, "0")}${String(
        miliseconds
      ).padStart(4, "0")}`;
      const randomID = Number(formattedTime);
      return randomID;
    },
    randomAnswerID() {
      const now = new Date();
      const seconds = now.getSeconds();
      const miliseconds = now.getMilliseconds();
      const formattedTime = `${String(seconds).padStart(2, "0")}${String(
        miliseconds
      ).padStart(4, "0")}`;
      const randomID = Number(formattedTime) - Math.floor(Math.random() * (1773));
      return randomID;
    },
    selectQuestionToUpdate(questionID){
      console.log(questionID);
      console.log(this.questions)
      const selectedQuestion = this.questions.find((question) => question.questionID === questionID);
      this.choosedQuestion.push(selectedQuestion)
      console.log(this.choosedQuestion)
      
    },
    getLastQuestion(){
      try {
        
        const lastQuestion = this.questions[this.questions.length -1];
        const lastQuestionID = lastQuestion ? lastQuestion.questionID : null;
        console.log('Last Question ID:', lastQuestionID);
        return lastQuestionID;
      } catch (error) {
        console.log('Error:', error);
        return null;
      }
    },
    resetQuestionStore(){
      this.questions = [];
      this.choosedQuestion = [];
      this.validateQuestion = [];
    }
  }
})


