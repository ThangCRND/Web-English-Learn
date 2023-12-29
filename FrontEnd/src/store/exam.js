import { defineStore, acceptHMRUpdate } from 'pinia'
import examService from '../services/examService';


export const useExamStore = defineStore('examStore', {
  state: () => ({
    exams: [],
    choosedExam:[],
    validateEdit: [],
    exam: []
  }),
  getters: {
    totalExam() {
      return this.exams.length;
    },
    typeOfExam() {
      return this.exam.examStatus;
    }

  },
  actions: {
    async getExam(examID){
      try{
        const response = await examService.getExam(examID);
        this.exam = response.data;
        console.log("Get Data successful: ",response.data);
        
      }catch(error) { 
        console.log("Get Data exam failed: ",error);
      }
    }
    ,
    async deleteExam(examID){
      try{
        const response =await examService.deleteExam(examID);
        console.log("Exam deleted: ", response.data);
      }catch(error){
        console.log("Delete Failed: ", error);
      }
    },
    async updateExam(examID, updatedExamData) {
      try {
        // Send a request to the API to update the exam
        const response = await examService.updateExam(examID,updatedExamData);

        if (response.status === 200) {
          // Find the index of the exam to update in the local exams array
          const examIndex = this.exams.findIndex((exam) => exam.examID === examID);

          if (examIndex !== -1) {
            // Update the local exam with the new data
            this.exams[examIndex] = response.data;
          } else {
            console.error('Exam not found in the local store.');
          }
        } else {
          console.error('Update exam request failed.');
        }
      } catch (error) {
        console.error('Error updating the exam:', error);
      }
    },
    async addExam(exam){
      this.exams.push(exam)
      try {

        const response = await examService.createExam(exam);
        console.log("Exam created: ", response.data);
      } catch (err) {
        console.log("Error to create: ", err);
      }
    },
    async getAllExams() {
      try {
        const response = await examService.getAllExams();
        this.exams = response.data;
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    },
    async getQuestInExam(examID){
      try{
        const response = await examService.getNumOfQuest(examID);
        this.validateEdit = response.data
        console.log("GET data successful: ", response.data);
      }catch(error){
        console.log("GET data failed: ", error);
      }
    },
    filteredExam(status) {
      return this.exams.filter(exam => exam.examStatus === status);
    },
    randomExamID() {
      const now = new Date();
      const seconds = now.getSeconds();
      const miliseconds = now.getMilliseconds();
      const formattedTime = `${String(seconds).padStart(2, "0")}${String(
        miliseconds
      ).padStart(4, "0")}`;
      const randomID = Number(formattedTime);
      return randomID;
    },
    selectExamToUpdate(examID){
      console.log(examID);
      console.log(this.exams)
      const choosedExam = this.exams.find((exam) => exam.examID === examID);
      this.choosedExam.push(choosedExam)
      console.log(this.choosedExam)
    }

  }
})


