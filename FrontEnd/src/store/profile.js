import { defineStore, acceptHMRUpdate } from "pinia";
import profileService from "../services/profileService";

export const useProfileStore = defineStore("profileStore", {
  state: () => ({
    profile: [],
    image: null,
    imageURL: "",
    fileID: null,
    exams: [],
    totalTurns: null
  }),
  getters: {
    getEmailValue(){
        return this.profile.email;
    },
    getUsernameValue(){
        return this.profile.username;
    },
    getFileIdValue(){
        return this.fileID;
    },
    getImageUrlValue(){
        return this.imageURL;
    },
    getFirstNameValue(){
        return this.profile.firstName
    },
    getLastNameValue(){
        return this.profile.lastName
    },
    getGenderValue(){
        return this.profile.gender
    },
    getPhoneValue(){
        return this.profile.phone
    },
    getCountryValue(){
        return this.profile.country
    },
    getCityValue(){
        return this.profile.city
    },
    getTotalTurnsValue(){
        return this.totalTurns
    }

  },
  actions: {
    async fetchImage(fileID) {
      try {
        //Xử lý bất đồng bộ gọi API sử dụng async, await 
        const response = await fetch(
          `http://localhost:8080/api/profile/getImage/${fileID}`
        );

        // Đặt mineType chính xác cho các file image
        const mimeType = "image/*"; 
        //Chuyển đổi phản hồi thành một đối tượng Blob
        const blob = new Blob([await response.arrayBuffer()], {
          type: mimeType,
        });

        // tạo một URL đối tượng từ Blob
        this.imageURL = URL.createObjectURL(blob);
        console.log(this.imageURL);
        console.log("Fetch image successful");
      } catch (error) {
        console.log("Fetch image failed:", error);
      }
    },
    async uploadImageFile(file) {
        const formData = new FormData();
        formData.append("imageFile", file);
        for (const entry of formData.entries()) {
            console.log(entry[0], entry[1]);
        }
      try {
        
        console.log("Hello")
        const response = await profileService.uploadImage(formData);
        const data = await response.data;
        console.log("Hello: ",data);
        this.fileID = data.fileId;
        console.log(`Image uploaded successfully with ID: ${data.fileId}`);
      } catch (error) {
        console.log("Upload image error", error);
      }
    },
    async saveImage(userID,fileID){
        try{
            const response = await profileService.saveImage(userID,fileID);
            const data = await response.data;
            console.log(`Save Image successful: `,data);
        }catch(error){
            console.log("Save Image error: ",error);
        }
    },
    async deleteImage(fileID){
        try{
            const response = await profileService.deleteImage(fileID);
            const data = await response.data;
            console.log("Delete successful: ",data)
        }catch(error){
            console.log("Delete Image error: ",error);
        }
    },
    async getFileId(userID){
        try{
            const respone = await profileService.getFileID(userID);
            const data = await respone.data[0].image;
            this.fileID = data;
            console.log("GET fileID successful: ",data);
        }catch(error){
            console.log("GET data error: ",error);
        }
    },
    async getProfileUser(userID){
        try{
            const response = await profileService.getProfileUser(userID);
            const data = await response.data;
            this.profile = data;
            console.log("GET profile successful: ",data);
        }catch(error){
            console.log("GET data error: ",error);
        }
    },
    async editProfileUser(userID,data){
        try{
            const response = await profileService.editProfileUser(userID,data);
            this.profile =response.data;
            console.log("Edit profile successful: ",response.data);
            
        }catch(error){
            console.log("Edit profile failed: ",error);
        }
    },
    async getHistoryProfile(userID){
        try{    
            const response = await profileService.getHistoryProfile(userID);
            const data = await response.data;
            this.exams = data;
            console.log("GET data successful:" ,data);
        }catch(error){
            console.log("GET data error: ",error);
        }
    },
    async getTotalTurns(userID){
        try{
            const response = await profileService.getTotalTurns(userID);
            const data = await response.data;
            this.totalTurns = data;
            console.log("Hello: ",this.totalTurns)
            console.log("GET data successful:" ,data);
        }catch(error){
            console.log("GET data error: ",error);
        }
    },
    async createProfileUser(userID){
        try{
            const response = await profileService.createProfileUser(userID);
            const data = await response.data;
            console.log("Create profile successful: ",data);
        }catch(error){
            console.log("Create profile failed: ",error);
        }
    }
  },
});
