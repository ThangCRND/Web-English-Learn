<!-- Tạo các thanh điều hướng trong phần admin/user (Navbar) -->
<template>
  <!-- Import từ 1 component mở/đóng menu -->
  <DropDown>
    <template v-slot="{ open, toggleOpen }">
      <img
        @click="toggleOpen"
        class="h-10 w-10 cursor-pointer rounded-full object-cover"
        src="../../../assets/images/profile.png"
        alt="profile image"
      />
      <!-- Tạo các hiệu ứng khi menu mở/đóng -->
      <transition
        enter-active-class="transition-all duration-100 ease-out"
        leave-active-class="transition-all duration-100 ease-in"
        enter-class="opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-75"
      >
        <div
          v-if="open"
          class="origin-top-right absolute right-0 mt-2 w-64 bg-grayDropDown overflow-hidden rounded-lg shadow-md"
        >
          <ul>
            <!-- Giao diện hiển thị với vai trò User -->
            <li>
              <router-link
                :to="{name: 'UserProfile',params: {userID: userID }}"
                class="rounded-t-lg block px-4 py-3 text-white hover:bg-[#575859]"
                
              >
                <div class="flex items-center">
                    <div class="mr-2">
                    <img
                      class="h-10 w-10 cursor-pointer rounded-full object-cover"
                      src="../../../assets/images/profile.png"
                      alt="profile image"
                    />
                  </div>
                  <div class="font-semibold">{{ username }}</div>
                  
                </div>
              </router-link>
            </li>
            <!-- Giao diện hiển thị với vai trò Admin sẽ kèm thêm 1 thanh điều hướng với role Admin -->
            <li v-if="role === 'ROLE_ADMIN'" class="text-white ">
                <router-link :to="{name: 'ExamPage'}">
                  <div class=" px-4 py-3 text-white hover:bg-redLight flex items-center cursor-pointer">
                    <div class=" flex justify-center items-center ml-1 mr-4 w-8 h-8 rounded-full bg-[#575859]">
                        
                    <img
                      class="h-4 w-4   "
                      src="../../../assets/images/admin.png"
                      alt="profile image"
                    />
                  </div>
                  <div class="font-semibold block "><p>Admin</p></div>
                  
                </div>
                </router-link>
                
             
              <!-- Thanh điều hướng Logout  -->
            </li>
            <li class="text-white ">
                
                <div class=" px-4 py-3 text-white hover:bg-redLight flex items-center cursor-pointer" @click="handleLogOut">
                    <div class=" flex justify-center items-center ml-1 mr-4 w-8 h-8 rounded-full bg-[#575859]">
                        
                    <img
                      class="h-4 w-4 ml-1  "
                      src="../../../assets/images/logout.png"
                      alt="profile image"
                    />
                  </div>
                  <div class="font-semibold block "><p>Signout</p></div>
                  
                </div>
             
              
            </li>
          </ul>
        </div>
      </transition>
    </template>
  </DropDown>
</template>

<script setup>

//Import các component từ việc phân chia nhỏ để quản lý
import { ref,onMounted } from 'vue';
import DropDown from "./DropDown.vue";
import { useAuthStore } from '../../../store/auth';
import { useRouter } from "vue-router";

const user = ref(null);
const username = ref(null);
const userID =ref(null);
const authStore = useAuthStore();
const router = useRouter();

const localStorageUser = JSON.parse(localStorage.getItem('user'));

const role = ref(null);
role.value = localStorageUser.roles[0];
console.log(role.value)

const handleLogOut = ()=>{
  authStore.logout();
  window.location.reload();
}


onMounted(() => {
    user.value = authStore.getUserValue;
    username.value = user.value.username
    userID.value = user.value.id;

    
});

// Khai báo các context
const { open, toggleOpen } = defineProps(["open", "toggleOpen"]);
</script>
