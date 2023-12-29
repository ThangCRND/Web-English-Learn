import { defineStore, acceptHMRUpdate } from 'pinia'
import trackingExamService from '../services/trackingExamService';
import questionService from '../services/questionService';


export const useTrackingExamStore = defineStore('trackingExamStore', {
  state: () => ({
    questions: [],
    selectedQuest: [],
    isDone: false,
    currentQuestionIndex: 0,
    turnID: 0,
    timeExam: 0
  }),
  getters: {
    getCurrentIndex(){
      return this.currentQuestionIndex + 1;
    },
    getValueOfSelectedQuest(){
      return this.selectedQuest;
    },
    getTurnID(){
      return this.turnID;
    },
    getTimeExam(){
      return this.timeExam;
    },
    getIsDone(){
      return this.isDone;
    }

  },
  actions: {
     isSelected (questionID) {
      try {
        const selectedQuestion = this.selectedQuest.find((item) => item.questionID === questionID);

        if (selectedQuestion) {
          const selectedAnswer = selectedQuestion.selectedAnswer;
          
          return selectedAnswer;
        } else {
          
          return null;
        }
      } catch (error) {
        console.log('Error:', error);
        return null;
      }
    },
    isCurrentQuestion(index) {
      return this.currentQuestionIndex === index;
    },
     
    getSelectedAnswer(questionID){
      try {
        const selectedQuestion = this.selectedQuest.find((item) => item.questionID === questionID);

        if (selectedQuestion) {
          const selectedAnswer = selectedQuestion.selectedAnswer;
          
          return selectedAnswer;
        } else {
          
          return null;
        }
      } catch (error) {
        console.log('Error:', error);
        return null;
      }
    },
    async getQuestionInExam(examID){
      try{
        const response =await questionService.getQuestionInExam(examID);
        this.questions = response.data;
        
        console.log("GET data successful: ", response.data);
      }catch(error){
        console.log("GET data failed: ", error);
      }
    },
    async selectedQuestion(data){
      try{
      console.log(data);
        
        // Find the index of the object with the same questionID
        const index = this.selectedQuest.findIndex((item) => item.questionID === data.questionID);

        // If an object with the same questionID is found, remove it
        if (index !== -1) {
          this.selectedQuest.splice(index, 1);
        }

        // Push the new object into the array
        this.selectedQuest.splice(index, 0, data);

        console.log("Push data successful", this.selectedQuest);
      } catch (error) {
        console.log("Push data failed: ", error);
      }
    },
    async addTrackingExam(){
      try{
        const data = this.selectedQuest;
        const response = await trackingExamService.AddTrackingExam(data);
        console.log(data)
        console.log("Question created: ", response.data);
      }catch(error){
        console.log("Error: ", error);
      }
    },
    markUnansweredQuestions(userID) {
      // Get the question IDs of the questions already answered
      const answeredQuestionIDs = this.selectedQuest.map(item => item.questionID);
      console.log(answeredQuestionIDs);

      // Filter the questions array to get the unanswered questions
      const unansweredQuestions = this.questions.filter(
        question => !answeredQuestionIDs.includes(question.questionID)
      );

      console.log('Unanswered Questions:', unansweredQuestions);

      // Debugging logs
      console.log('Length of selectedQuest:', this.selectedQuest.length);
      console.log('Length of questions:', this.questions.length);
      // For each unanswered question, add it to selectedQuest with selectedAnswer set to null
      unansweredQuestions.forEach(question => {
        const existingIndex = this.selectedQuest.findIndex(
          item => item.questionID === question.questionID
        );

        // If the question is not already in selectedQuest, add it
        if (existingIndex === -1) {
          this.selectedQuest.push({
            examID: question.examID,
            userID: userID,
            questionID: question.questionID,
            selectedAnswer: null,
            turnID: this.getTurnID
          });
        }
      });
    },
    getRandomTurnID() {
      const now = new Date();
      const seconds = now.getSeconds();
      const miliseconds = now.getMilliseconds();
      const formattedTime = `${String(seconds).padStart(2, "0")}${String(
        miliseconds
      ).padStart(4, "0")}`;
      const turnID =  Number(formattedTime) - Math.floor(Math.random() * (1801));
      return turnID;
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
    resetState() {
      this.questions = [];
      this.selectedQuest = [];
      this.currentQuestionIndex = 0;
      this.turnID = 0;
      this.isDone = false;
    },
    computedIsDone(){
      this.isDone = true;
    }
    
  }
})


