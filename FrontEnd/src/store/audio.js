import { defineStore } from "pinia";
import audioService from "../services/audioService";

export const useAudioStore = defineStore("audioStore", {
  state: () => ({
    audioURL: "",
    fileID: null,
    audio:[]
  }),
  getters: {
    getAudioValue() {
      return this.audioURL;
    },
    getFileID(){
      return this.fileID;
    },
    getDataAudio(){
      return this.audio;
    },
    getAudioName(){
      return this.audio.file.name
    }
    
  },
  actions: {
    async fetchAudio(fileID) {
      try {
        // const response = await audioService.getAudio
        const response = await fetch(
          `http://localhost:8080/api/audio/getAudio/${fileID}`
        );

        // Set the correct MIME type for the audio file
        const mimeType = "audio/mpeg";

        // Create a new Blob with the specified MIME type
        const blob = new Blob([await response.arrayBuffer()], {
          type: mimeType,
        });
        console.log("ờ kia", blob);
        this.audioURL = URL.createObjectURL(blob);
        console.log("Fetch audio successful");
      } catch (error) {
        console.log("Fetch audio failed:", error);
      }
    },
    async uploadAudioFile(file) {
      const formData = new FormData();
      formData.append("audioFile", file);
      console.log('FormData Entries:');
    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }
      try {
        const response = await audioService.uploadAudio(formData);
        const data = await response.data;
        this.fileID = data.fileId;
        console.log(`File uploaded successfully with ID: ${data.fileId}`);
      } catch (error) {
        console.error("Upload file error", error);
      }
    },
    async deleteAudioFile(fileId){
      try{
        const response =  await audioService.deleteAudio(fileId);
        console.log('Delete successful ', response.data)
      }catch(error){
        console.log("Delete Error: ",error);
      }
    },
    async getInfoAudio(fileId){
      try{
        const respone = await audioService.getInfoAudio(fileId);
        this.audio = respone.data;
        console.log('Get data successful',respone.data);
      }catch(error){
        console.log('GET data error: ',error);
      }
    },
    resetAudioStore(){
      this.audioURL = '';
      this.fileID = null;
      this.audio = [];
    }
  },
});
