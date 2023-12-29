import { defineStore, acceptHMRUpdate } from 'pinia'
import resultService from '../services/resultService';
import examService from '../services/examService';


export const useResultStore = defineStore('resultStore', {
  state: () => ({
    result: [],
    trackedQuest: [],
    correctQuest: [],
    score: 0,
    duration: 0
  }),
  getters: {
    getCorrectQuest(){
        return this.correctQuest.correctQuestion;
    },
    getTotalQuestion(){
      return this.correctQuest.numberQuestionInExam;
    },
    getScoreValue(){
      const correctAns = this.correctQuest.correctQuestion;
      const TotalQuest = this.correctQuest.numberQuestionInExam;
      this.score =  Math.floor((correctAns/TotalQuest)*10)
      return this.score; 
    },
    getResultValue(){
      return this.result;
    },
    getTrackedQuestValue(){
      return this.trackedQuest;
    },
    getDurationValue(){
      return this.duration[0].duration;
    },
    getTimeValue(){
      return this.result[0].time;
    },
    getScoreResultValue(){
      return this.result[0].score;
    }
  },
  actions: {
    async getCorrectQuestion(examID,userID,turnID){
        try{
          const response =await resultService.getQuestionsAndCorrectQuest(examID, userID,turnID);
          this.correctQuest = response.data
          console.log("GET data successful: ", response.data);
        }catch(error){
          console.log("GET data failed: ", error);
        }
    },
    async getQuestionTracked(examID,userID,turnID){
      try{
        const response =await resultService.getQuestionTracked(examID,userID,turnID)
          this.trackedQuest = response.data
          console.log("GET data successful: ", response.data);
      }catch(error){
        console.log("GET data failed: ", error);
      }
    },
    async getResult(turnID){
      try{  
        const response = await resultService.getResult(turnID)
        this.result = response.data;
        console.log("GET result successful: ", response.data);
      }catch(error){
        console.log("GET data failed: ",error);
      }
    },
    async createResult(data){
      try{
        const response = await resultService.addResult(data);
        console.log("Result created: ", response.data);
      }catch(error){
        console.log("POST data failed:  ", error);
      }
    },
    async getDuration(examID){
      try{
        const response = await examService.getDuration(examID);
        this.duration = response.data;
        console.log("GET duration successful: ",response.data);
      }catch(error){
        console.log("GET duration failed: ",error);
      }
    },
    resetResultStore(){
      this.result = [];
      this.trackedQuest = [];
      this.duration =0;
      this.score =0;
      this.correctQuest=[];
    }
  }
})


