<!-- Giao diện chính của website -->
<template>
    <div class="bg-white">
      <!-- Introduction -->
      <div class="flex flex-col md:flex-row">
  
        <div class="bg-primaryLightBlue flex justify-center items-center flex-1 text-center p-4 md:p-8">
          <div>
            <h1 class="text-black text-3xl md:text-4xl lg:text-5xl font-bold">Platform</h1>
            <h1 class="text-primaryBlue text-3xl md:text-4xl lg:text-5xl font-bold">Learn English Online</h1>
            <h1 class="text-black text-3xl md:text-4xl lg:text-5xl font-bold">Easy and Useful</h1>
          </div>
        </div>
  
        <div class="bg-primaryLightBlue flex-1 text-center py-6 md:py-12">
          <div>
            <img src="../../../assets/images/introstudy.svg" alt="" class="mx-auto">
          </div>
        </div>
  
      </div>
  
      <!--Backgound: Why we should use E-Learning -->
      <div class="p-6 md:p-12">
        <h2 class="font-bold text-2xl md:text-3xl lg:text-4xl text-black text-center bg-white p-6 md:p-12">
          Why we should use <span class="text-primaryBlue">E-Learning</span>?
        </h2>
        <div class="text-sm md:text-md lg:text-md flex flex-col md:flex-row lg:flex-row justify-between">
          <div class="p-4 rounded-xl shadow-2xl bg-white flex-1 mb-8 md:mb-0 lg:mb-0">
            <img src="../../../assets/images/video.svg" alt="" class="w-12 h-12 mx-auto">
            <p class="font-bold mt-6">High-quality video lectures</p>
            <p class="text-gray my-6">By a team of excellent and dedicated teachers IELTS 8.0 - 8.5, former
              international students, graduated from prestigious universities</p>
          </div>
  
          <div class="p-4 rounded-xl shadow-2xl bg-white flex-1 mb-8 md:mb-0 mx-0 md:mx-8 lg:mx-8">
            <img src="../../../assets/images/document2.svg" alt="" class="w-12 h-12 mx-auto">
            <p class="font-bold mt-6">Full of sample papers, exercises, mini tests, progress tests like real exams</p>
            <p class="text-gray my-6">The document set has helped 600 students achieve IELTS 7.0-8.5 as of May 2021</p>
          </div>
  
          <div class="p-4 rounded-xl shadow-2xl bg-white flex-1 mb-8 md:mb-0">
            <img src="../../../assets/images/document.svg" alt="" class="w-12 h-12 mx-auto">
            <p class="font-bold mt-6">Online Exam System</p>
            <p class="text-gray my-6">Helps us practice English easier with Reading and Listening skills</p>
          </div>
        </div>
      </div>
  
      <!-- Background Start to Practice -->
      <div class="bg-primaryLightBlue flex flex-col md:flex-row items-center justify-center">
        <div class="flex-1 flex justify-center items-center">
          <img src="../../../assets/images/exam.svg" alt="" class="py-16">
        </div>
        <div class="flex-1 text-center py-6 md:py-12">
          <h2 class="font-bold text-2xl md:text-3xl lg:text-4xl text-black">
            Let's start <span class="text-primaryBlue">practice English</span> now!
          </h2>
          <p class="font-semibold my-3">Hope you enjoy this app!</p>
          <button class="bg-primaryBlue hover:bg-blue-600 text-white font-medium py-2 md:py-3 lg:py-4 w-32 md:w-40 lg:w-48 px-4 md:px-6 lg:px-8 rounded-lg">
            Let's start
          </button>
        </div>
      </div>
  
      <!-- Backgound Tips and Trick -->
      <div class="p-6 md:p-12">
        <h2 class="font-bold text-2xl md:text-3xl lg:text-4xl text-black text-center bg-white p-6 md:p-12">
          Tips And Tricks!
        </h2>
        <div class="text-sm md:text-md lg:text-md flex flex-col md:flex-row lg:flex-row justify-between">
          <div class="p-6 rounded-xl shadow-2xl bg-white flex-1 mb-8 md:mb-0 lg:mb-0">
            <a href="https://www.indeed.com/career-advice/career-development/how-to-improve-reading-skills">
              <img src="../../../assets/images/englishTip1.svg" alt="" class="w-full h-1/2 rounded-md mb-4 mx-auto">
            </a>
            <a class="font-bold"
              href="https://www.indeed.com/career-advice/career-development/how-to-improve-reading-skills">How to
              learn Reading skill</a>
            <p class="text-gray mt-4 mb-4">Improve reading skill with 7 steps to help practice
              Reading exams</p>
          </div>
  
          <div class="p-6 rounded-xl shadow-2xl bg-white flex-1 mb-8 md:mb-0 mx-0 md:mx-8 lg:mx-8">
            <a href="https://www.cambridgeenglish.org/learning-english/free-resources/write-and-improve/">
              <img src="../../../assets/images/englishTip2.svg" alt="" class="w-full h-1/2 rounded-md mb-4 mx-auto">
            </a>
            <a class="font-bold"
              href="https://www.cambridgeenglish.org/learning-english/free-resources/write-and-improve/">The
              Ultimate Writing Skills Guide</a>
            <p class="text-gray mt-4 mb-4">A place to practice writing English.</p>
          </div>
  
          <div class="p-6 rounded-xl shadow-2xl bg-white flex-1 mb-8 md:mb-0">
            <a href="https://exam-practice.com/important-things-about-ielts-speaking/">
              <img src="../../../assets/images/englishTip3.svg" href="" alt="" class="w-full h-1/2 rounded-md mb-4 mx-auto ">
            </a>
            <a class="font-bold"
              href="https://exam-practice.com/important-things-about-ielts-speaking/">Demystifying the IELTS
              Speaking</a>
            <p class="text-gray mt-4 mb-4">10 Important things about IELTS Speaking </p>
          </div>
        </div>
      </div>
  
      <!-- Background Strategic Partnership -->
      <div class="p-6 md:p-12 lg:p-20 bg-primaryLightBlue">
        <h2 class="font-bold text-2xl md:text-3xl lg:text-4xl text-black text-center bg-primaryLightBlue p-6 md:p-12 lg:p-20">
          Strategic Partnership
        </h2>
        <div class="flex flex-col md:flex-row lg:flex-row justify-center">
          <div class="p-2 rounded-xl shadow-2xl bg-white flex-1 mb-8 md:mb-0 lg:mb-0 flex items-center justify-center">
            <img src="../../../assets/images/BritishCouncil.png" alt="" class="w-full rounded-md ">
          </div>
  
          <div class="p-2 rounded-xl shadow-2xl bg-white flex-1 mx-0 md:mx-8 lg:mx-8 flex items-center justify-center">
            <img src="../../../assets/images/toeic.png" alt="" class="w-full rounded-md h-1/2">
          </div>
  
          <div class="mt-8 p-2 rounded-xl shadow-2xl bg-white flex-1 flex items-center justify-center">
            <img src="../../../assets/images/idp.png" alt="" class="w-full rounded-md ">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from '../../../store/auth';
  import { useRouter } from 'vue-router';
  
  const user = ref(null);
  const authStore = useAuthStore();
  
  onMounted(() => {
    user.value = authStore.getUserValue;
  });
  </script>
  