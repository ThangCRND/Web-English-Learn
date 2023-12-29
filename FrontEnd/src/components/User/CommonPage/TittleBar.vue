<template>
  <!-- Tiêu đề đầu trang -->
  <header class="px-4 md:px-12 bg-white sticky top-0 z-50 shadow-md">
    <div class="bg-gray-900 text-black p-2">
      <div class="flex items-center justify-between">

        <!-- Logo and Name -->
        <div class="flex items-center space-x-2">
          <div>
            <img src="../../../assets/images/logo.png" class="w-12 h-12 md:w-14 md:h-14" alt="">
          </div>
          <h1 class="text-base md:text-xl font-semibold">E-Learn</h1>
        </div>

        <!-- Menu for Mobile -->
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <!-- Items hiển thị-->
        <ul class="hidden md:flex space-x-4">
          <router-link :to="{ name: 'HomePage' }">
            <li><a href="#" class="hover:text-primaryLightColor font-medium px-4 md:px-6 text-base md:text-lg">Home</a></li>
          </router-link>
          <li><a href="#" class="hover:text-primaryLightColor font-medium px-4 md:px-6 text-base md:text-lg">Course</a></li>
          <router-link :to="{ name: 'PracticePage' }">
            <li><a href="#" class="hover:text-primaryLightColor font-medium px-4 md:px-6 text-base md:text-lg">Practice</a></li>
          </router-link>
          <li><a href="#" class="hover:text-primaryLightColor font-medium px-4 md:px-6 text-base md:text-lg">Blog</a></li>
        </ul>

        <!-- Login Button -->
        <div v-if="user" class="p-2">
          <account-drop-down></account-drop-down>
        </div>
        <div v-else class="p-2">
          <router-link :to="{ name: 'LoginPage' }">
            <button class="bg-primaryBlue hover:bg-blue-600 text-white font-medium py-2 md:py-3 w-32 md:w-40 px-4 md:px-6 rounded-lg">
              Let's start <font-awesome-icon icon="arrow-right" class="ml-2 md:ml-4" />
            </button>
          </router-link>
        </div>

      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden">
      <ul class="bg-gray-900 text-white">
        <router-link :to="{ name: 'HomePage' }">
          <li><a href="#" class="block py-2 px-4 hover:bg-gray-800 text-center text-base md:text-lg">Home</a></li>
        </router-link>
        <li><a href="#" class="block py-2 px-4 hover:bg-gray-800 text-center text-base md:text-lg">Course</a></li>
        <router-link :to="{ name: 'PracticePage' }">
          <li><a href="#" class="block py-2 px-4 hover:bg-gray-800 text-center text-base md:text-lg">Practice</a></li>
        </router-link>
        <li><a href="#" class="block py-2 px-4 hover:bg-gray-800 text-center text-base md:text-lg">Blog</a></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AccountDropDown from './AccountDropDown.vue';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../../store/auth';
import { useRouter } from 'vue-router';

const user = ref(null);
const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

onMounted(() => {
  user.value = authStore.getUserValue;
});
</script>
