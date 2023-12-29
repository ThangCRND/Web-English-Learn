import { defineStore } from 'pinia';
import AuthService from '../services/authService';
import profileService from '../services/profileService';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    loggedIn: false,
    user: JSON.parse(localStorage.getItem('user')),
    registerFail:false,
    registerSuccessful:false,
    loginFail:false
  }),
  getters:{
    getUserValue(){
        return this.user;
    },
    getLoggedInValue(){
      return this.loggedIn;
    },
    getUserIdValue(){
      return this.user.userID;
    }
  },
  actions: {
    async login(userData) {
      try {
        const loggedInUser = await AuthService.login(userData);
        const user = JSON.parse(localStorage.getItem('user'));
        this.loginSuccess(user);
        console.log("Login successful: ",loggedInUser);
      } catch (error) {
        this.loginFailure();
        this.showLoginFail();
        console.log("Login Error: ",error);
      }
    },

    logout() {
      AuthService.logout();
      this.logoutSuccess();
      console.log("Logout successful")
    },

    async register(user) {
      try {
        const userID = user.userID;
        const responseRegister = await AuthService.register(user);
        if(responseRegister){
          const responseProfile = await profileService.createProfileUser(userID);
          console.log("Create Profile Successful: ", responseProfile)
        }
        this.registerSuccess();
        this.showRegisterSuccessful();
        console.log("Register Successful: ",responseRegister.data);
      } catch (error) {
        this.registerFailure();
        this.showRegisterFail();
        console.log("Register Failled: ",error);
      }
    },

    showRegisterFail(){
      this.registerFail = true;
      setTimeout(() => {
        this.registerFail = false;
    }, 5000);
    },
    showRegisterSuccessful(){
      this.registerSuccessful = true;
      setTimeout(() => {
        this.registerSuccessful = false;
    }, 5000);
    },
    showLoginFail(){
      this.loginFail = true;
      setTimeout(() => {
        this.loginFail = false;
    }, 5000);
    },

    

    loginSuccess(user) {
      this.loggedIn = true;
      this.user = user;
    },

    loginFailure() {
      this.loggedIn = false;
      this.user = null;
    },

    logoutSuccess() {
      this.loggedIn = false;
      this.user = null;
    },

    registerSuccess() {
      this.loggedIn = false;
    },

    registerFailure() {
      this.loggedIn = false;
    },
    randomUserID() {
      const now = new Date();
      const seconds = now.getSeconds();
      const miliseconds = now.getMilliseconds();
      const formattedTime = `${String(seconds).padStart(2, "0")}${String(
        miliseconds
      ).padStart(4, "0")}`;
      const randomID = Number(formattedTime) - Math.floor(Math.random() * (1103));
      return randomID;
    }
  },
});