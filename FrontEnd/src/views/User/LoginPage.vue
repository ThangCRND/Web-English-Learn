

<template>
  <div class='flex items-center justify-center min-h-screen bg-gradient-to-r from-purpleLinear from-10% via-blueLinear via-30% to-greenLinear to-90%'>
    <div class='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-xl shadow-[10px_15px_20px_-15px_rgba(0,0,0,0.8)]'>
        <div class='max-w-md mx-auto space-y-3'>

            <div v-if="!isLoginPage" class="space-y-4 relative">
                <div class="absolute top-0 left-0 cursor-pointer" @click="isLoginPage = true"> <img src="../../assets/images/backArrow.png" alt="" class="h-8 w-8"> </div>
                <header class="mb-3 text-2xl font-bold text-center">Create your profile &#128540;</header>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray focus-within:ring-blueColor">
                    <input v-model="username" type="text" placeholder="username" class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" required/>
                </div>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray focus-within:ring-blueColor">
                    <input v-model="password" type="password" placeholder="password" class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" required/>
                </div>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray focus-within:ring-blueColor">
                    <input v-model="email" type="text" placeholder="Email" class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" required/>
                </div>
                
                <button @click.prevent="handleRegister" class="w-full rounded-2xl border-b-4 border-b-blueColor bg-primaryBlue py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">CREATE ACCOUNT</button>
            </div>

            <div v-if="isLoginPage" class="space-y-4">
              

              <div v-if="authStore.registerFail" class="bg-peachColor text-md font-semibold w-full rounded-xl p-2">
                <p>Register Failed! &#128557;</p>

              </div>
              <div v-if="authStore.registerSuccessful" class="bg-greenBlur text-md font-semibold w-full rounded-xl p-2">
                <p>Register Successful! &#128540;</p>

              </div>

              <div v-if="authStore.loginFail" class="bg-peachColor text-md font-semibold w-full rounded-xl p-2">
                <p> Username or Password wrong! &#128557;</p>

              </div>
              
              <header class="mb-3 text-3xl font-bold text-center">Log in here!</header>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray focus-within:ring-blueColor">
                    <input v-model="username" type="text" placeholder="username" class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray focus-within:ring-blueColor">
                    <input v-model="password" type="password" placeholder="Password" class="my-3 w-full border-none bg-transparent outline-none" />
                </div>
                <div class="flex gap-3 pt-3 items-center">

                <button @click.prevent="handleSignIn" class="w-1/2 rounded-2xl border-b-4 border-b-blueColor bg-primaryBlue py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">LOGIN</button>
                <button class="w-1/2 rounded-2xl border-b-4 border-b-blueColor bg-primaryBlue py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400" @click="isLoginPage = false">SIGNUP</button>
            </div>
            </div>

            
        </div>
    </div>
</div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
// import { useAuthStore } from "../../store/auth";
import { useAuthStore } from '../../store/auth';
import { useRouter } from "vue-router";
import { useProfileStore } from '../../store/profile';
const router = useRouter();
const authStore = useAuthStore();
const profileStore = useProfileStore();
const username = ref(null);
const password = ref(null);
const email = ref(null);
const isLoginPage = ref(true);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmailValid = () => {
  return emailRegex.test(email.value);
};


const handleSignIn=async()=>{
  const user = {
    username: username.value,
    password: password.value
  }
  console.log(user);
  await authStore.login(user);
  if(authStore.getLoggedInValue){
    router.push({
          name: "HomePage",
    });
  }

}


const handleRegister = async()=>{
  if (!isEmailValid()) {
    // Handle invalid email here
    console.error('Invalid email format');
    authStore.showRegisterFail();
    isLoginPage.value = true;
    return;
  }
  const randomUserID =authStore.randomUserID();
  console.log(randomUserID);
  const user = {
    userID: randomUserID,
    username: username.value,
    password: password.value,
    email: email.value
  };

  await authStore.register(user);
  resetForm();
  isLoginPage.value = true;

}

const resetForm = ()=>{
  username.value = null;
  password.value = null;
  email.value = null;
}

onMounted(() => {
  resetForm();
});


</script>
