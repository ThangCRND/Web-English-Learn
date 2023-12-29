<template>
  <div class="w-full h-full">
    <!-- Bar color -->
    <div
      class="bg-gradient-to-r from-purpleLinear from-10% via-blueLinear via-30% to-greenLinear to-90% flex items-center p-8 h-1/5"
    >
      <div class="p-6 absolute top-0 left-0">
        <router-link :to="{ name: 'HomePage' }">
          <button
            class="bg-greenColor hover:bg-blue-600 text-white font-medium py-2 w-26 px-4 rounded-lg"
          >
            <font-awesome-icon icon="home" class="mr-2" /> Home
          </button>
        </router-link>
      </div>
    </div>

    <!-- Content User -->
    <div
      class="h-full  px-3 sm:px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-center mt-8 "
    >
      <!-- Image  -->
      <div
        class="flex flex-row md:flex-col justify-center items-center md:justify-around p-4 rounded-xl h-full w-full sm:w-1/3 md:w-1/3 lg:w-1/5 bg-white shadow-[10px_15px_20px_-15px_rgba(0,0,0,0.8)]"
      >
        <div class="">
          <div class="flex justify-center items-center">
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="Profile Image"
              class="w-36 h-36 object-cover rounded-full shadow-[10px_15px_20px_-15px_rgba(0,0,0,0.8)]"
            />
            <img
              v-else
              src="../../assets/images/userdefault.png"
              alt="Profile Image"
              class="w-36 h-36 object-cover rounded-full shadow-[10px_15px_20px_-15px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div class="mt-2 mb-8">
            <h2 class="font-bold text-center text-black text-xl">{{ username }}</h2>
          </div>

          <div
            v-if="isActiveProfileSetting"
            class="flex justify-center items-center mt-2"
          >
           
            <input
              type="file"
              accept="image/*"
              ref="imageInput"
              style="display: none"
              @change="handleImageChange"
            />
            <button
              class="bg-purpleLinear hover:bg-blue-600 text-white font-medium py-2 w-40 px-4 rounded-lg shadow-lg"
              @click="$refs.imageInput.click()"
            >
              Change Image
            </button>
          </div>
        </div>

        <div class="flex flex-col md:items-center md:justify-center mt-0 ml-4 md:ml-0 md:mt-8">
          
          <div
            class="flex items-center justify-center rounded-full w-36 h-36 border-4 bg-greenLight border-greenDark mt-4 md:mt-0"
          >
            <span class="text-greenDark text-2xl font-bold text-center">{{
              totalTurn
            }}</span>
          </div>
          <h2 class="font-semibold text-center text-xl mt-2  md:mt-4 mb-8 md:mb-4">Completed quiz</h2>
        </div>
      </div>
      <!-- Information -->
      <div
        class="mr-16 md:mr-0 rounded-xl ml-6 h-full md:h-[90%] w-80 sm:w-full md:w-full lg:w-1/2 bg-white shadow-[10px_15px_20px_-15px_rgba(0,0,0,0.8)] mt-4 md:mt-0"
      >
        <!-- Nav bar -->
        <div class="p-4 ml-4 flex">
          <div>
            <h2
              class="text-md md:text-xl font-bold cursor-pointer"
              :class="{
                'text-black': isActiveProfile,
                'text-grayLight': !isActiveProfile,
              }"
              @click="activeProfileClick"
            >
              Profile
            </h2>
          </div>

          <div>
            <h2
              class="ml-3 md:ml-8 text-md md:text-xl font-bold cursor-pointer"
              :class="{
                'text-black': isActiveProfileSetting,
                'text-grayLight': !isActiveProfileSetting,
              }"
              @click="activateProfileSettingClick"
            >
              Profile Setting
            </h2>
          </div>

          <div>
            <h2
              class="ml-3 md:ml-8 text-md md:text-xl font-bold cursor-pointer"
              :class="{
                'text-black': isActiveHistory,
                'text-grayLight': !isActiveHistory,
              }"
              @click="activateHistoryClick"
            >
              History
            </h2>
          </div>
        </div>
        <!-- Line -->
        <div class="w-full border-t-2 bg-grayDark"></div>

        <div class="flex justify-center">
          <div v-if="!isValidPhoneNumber" class="flex justify-center mt-2 w-[90%]  bg-peachColor p-4 rounded-lg ">
            <p class="text-md font-semibold">Invalid PhoneNumber</p>
        </div>
        </div>
        
        <!-- profile content -->

        <!-- Part 1 -->
        <div
          v-if="isActiveProfile"
          class="w-full p-0 md:px-4 md:pt-4 md:pb-8  h-full"
        >
          <!-- First Name + Last Name -->
          <div
            class="flex flex-col md:flex-row justify-between items-center w-full mt-4"
          >
            <!-- FirstName -->
            <div class="w-2/3 md:w-1/2">
              <h2 class="font-semibold text-md">First Name</h2>
              <input
                type="text"
                v-model="firstName"
                disabled
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none cursor-not-allowed"
              />
            </div>
            <!-- LastName -->
            <div class="w-2/3 md:w-1/2 mt-4 md:mt-0">
              <h2 class="font-semibold text-md">Last Name</h2>
              <input
                type="text"
                v-model="lastName"
                disabled
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div
            class="flex flex-col md:flex-row justify-between items-center w-full mt-6 md:mt-12"
          >
            <!-- Phone Number -->
            <div class="w-2/3 md:w-1/2">
              <h2 class="font-semibold text-md">Phone Number</h2>
              <input
                type="text"
                v-model="phone"
                disabled
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none cursor-not-allowed"
              />
            </div>
            <!-- Email Address -->
            <div class="w-2/3 md:w-1/2 mt-4 md:mt-0">
              <h2 class="font-semibold text-md">Email Address</h2>
              <input
                type="text"
                v-model="email"
                disabled
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div
            class="flex flex-col md:flex-row justify-between items-center w-full mt-6 md:mt-12"
          >
            <!-- City -->
            <div class="w-2/3 md:w-1/2">
              <h2 class="font-semibold text-md">City</h2>
              <input
                type="text"
                v-model="city"
                disabled
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none cursor-not-allowed"
              />
            </div>
            <!-- Country -->
            <div class="w-2/3 md:w-1/2 mt-4 md:mt-0">
              <h2 class="font-semibold text-md">Country</h2>
              <input
                type="text"
                v-model="country"
                disabled
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div
            class="flex flex-col md:flex-row justify-between items-center w-full mt-6 md:mt-12"
          >
            <!-- City -->
            <div class="w-2/3 md:w-1/2">
              <h2 class="font-semibold text-md">Gender</h2>
              <input
                type="text"
                v-model="gender"
                disabled
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none cursor-not-allowed"
              />
            </div>
            <!-- Country -->
            
          </div>

          
        </div>

        <div
          v-if="isActiveProfileSetting"
          class="w-full  p-0 md:px-4 md:pt-4 md:pb-8"
        >
          <!-- First Name + Last Name -->
          <div
            class="flex flex-col md:flex-row justify-between items-center w-full mt-4"
          >
            <!-- FirstName -->
            <div class="w-2/3 md:w-1/2">
              <h2 class="font-semibold text-md">First Name</h2>
              <input
                type="text"
                v-model="firstName"
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none"
              />
            </div>
            <!-- LastName -->
            <div class="w-2/3 md:w-1/2 mt-4 md:mt-0">
              <h2 class="font-semibold text-md">Last Name</h2>
              <input
                type="text"
                v-model="lastName"
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none d"
              />
            </div>
          </div>

          <div
            class="flex flex-col md:flex-row justify-between items-center w-full mt-6 md:mt-12"
          >
            <!-- Phone Number -->
            <div class="w-2/3 md:w-1/2">
              <h2 class="font-semibold text-md">Phone Number</h2>
              <input
                type="text"
                v-model="phone"
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none"
              />
            </div>
            <!-- Email Address -->
            <div class="w-2/3 md:w-1/2 mt-4 md:mt-0">
              <h2 class="font-semibold text-md">Email Address</h2>
              <input
                type="text"
                v-model="email"
                disabled
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div
            class="flex flex-col md:flex-row justify-between items-center w-full mt-6 md:mt-12"
          >
            <!-- City -->
            <div class="w-2/3 md:w-1/2">
              <h2 class="font-semibold text-md">City</h2>
              <input
                type="text"
                v-model="city"
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none"
              />
            </div>
            <!-- Country -->
            <div class="w-2/3 md:w-1/2 mt-4 md:mt-0">
              <h2 class="font-semibold text-md">Country</h2>
              <input
                type="text"
                v-model="country"
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none"
              />
            </div>
          </div>

          <div
            class="flex flex-col md:flex-row justify-between items-center w-full mt-6 md:mt-12 mb-4 md:mb-0"
          >
            <!-- City -->
            <div class="w-2/3 md:w-1/2">
              <h2 class="font-semibold text-md">Gender</h2>
              <input
                type="text"
                v-model="gender"
                class="ml-3 mt-2 w-full md:w-[80%] text-gray bg-whiteMilk shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] p-2 rounded-md focus:shadow-outline-gray focus:outline-none"
              />
            </div>
            <!-- Country -->
            <div class="w-2/3 md:w-1/2 mt-4 md:mt-0">
              <div class="ml-2">
              <button
              class="bg-purpleLinear hover:bg-blue-600 text-white font-medium py-1 md:py-2 w-40 md:w-40 px-3 md:px-4 rounded-lg shadow-lg"
              @click="handleEditSubmit"
            >
              Edit
            </button>
            </div>
            </div>
          </div>

          
        </div>

        <!-- Part 3 -->
        <div
          v-if="isActiveHistory"
          class="w-full mt-4 md:mt-6 p-0 md:p-2  md:px-6"
        >
          <div class="flex items-center justify-center">
            <table
              class="table  md:w-full text-grayDark border-separate space-y-6 text-md"
            >
              <thead class="bg-[#3B82F6] text-white">
                <tr>
                  <th class="p-0 md:p-3"></th>
                  <th class="p-2 md:p-3 text-left">Exam</th>
                  <th class="p-2 md:p-3 text-left">Duration</th>
                  <th class="p-2 md:p-3 text-left">Score</th>

                  <th class="p-2 md:p-3 hidden md:table-cell text-left">Status</th>
                  <th class="p-2 md:p-3 text-left">History</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="exam in profileStore.exams"
                  :key="exam.turnID"
                  class="bg-blueLight lg:text-black"
                >
                  <td class="p-0 md:p-3 font-medium capitalize">
                    <div class="flex justify-center items-center">
                      <img
                        v-if="exam.examStatus === 'Reading'"
                        src="../../assets/images/TOEICReading.jpg"
                        alt=""
                        class="w-0 md:w-12 h-0 md:h-12 object-cover rounded-full shadow-[10px_15px_20px_-15px_rgba(0,0,0,0.8)]"
                      />
                      <img
                        v-else
                        src="../../assets/images/TOEICListening.jpg"
                        alt=""
                        class="w-0 md:w-12 h-0 md:h-12 object-cover rounded-full shadow-[10px_15px_20px_-15px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </td>
                  <td class="p-3">{{ exam.title }}</td>
                  <td class="p-3">{{ exam.duration/60 }} minutes</td>
                  <td class="p-3 uppercase">{{ exam.score }}</td>

                  <td class=" hidden md:table-cell p-3">
                    <span
                      class=" bg-greenColor font-semibold text-white rounded-md p-2"
                      >DONE</span
                    >
                  </td>
                  <td class="p-3">
                    <router-link
                      :to="{
                        name: 'ResultPage',
                        params: {
                          examID: exam.examID,
                          turnID: exam.turnID,
                        },
                      }"
                    >
                      <img
                        src="../../assets/images/eye.png"
                        alt=""
                        class="w-10 h-10 cursor-pointer"
                      />
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import { useRoute } from "vue-router";

import { useProfileStore } from "../../store/profile";

const profileStore = useProfileStore();
const route = useRoute();

const isActiveProfile = ref(true);
const isActiveProfileSetting = ref(false);
const isActiveHistory = ref(false);

const userID = Number(route.params.userID);
const imageUrl = ref(null);
const fileID = ref(null);
const firstName = ref(null);
const lastName = ref(null);
const gender = ref(null);
const phone = ref(null);
const country = ref(null);
const city = ref(null);
const email = ref(null);
const username = ref(null);
const totalTurn = ref(null);
const isValidPhoneNumber = ref(true);


const selectedFile = ref(null);

const handleImageChange = async (event) => {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    selectedFile.value = fileInput.files[0];
    console.log(selectedFile.value);
    // Trường hợp đã có image muốn thay đổi
    if (fileID.value) {
      console.log(1);
      await profileStore.deleteImage(fileID.value);
      await profileStore.uploadImageFile(selectedFile.value);
      fileID.value = profileStore.getFileIdValue;
      await profileStore.saveImage(userID, fileID.value);
      await profileStore.fetchImage(fileID.value);
      imageUrl.value = profileStore.getImageUrlValue;
    } else {
      console.log(2);
      await profileStore.uploadImageFile(selectedFile.value);
      fileID.value = profileStore.getFileIdValue;
      await profileStore.saveImage(userID, fileID.value);
      await profileStore.fetchImage(fileID.value);
      imageUrl.value = profileStore.getImageUrlValue;
    }
    console.log("Xong");
  }
};

const validatePhoneNumber = ()=>{
  const phoneNumberRegex = /^[0-9]+$/;
  isValidPhoneNumber.value = phoneNumberRegex.test(phone.value);
}


const loadProfile = () => {
  if (profileStore.getFirstNameValue) {
    firstName.value = profileStore.getFirstNameValue;
  } else {
    firstName.value = "None";
  }
  if (profileStore.getLastNameValue) {
    lastName.value = profileStore.getLastNameValue;
  } else {
    lastName.value = "None";
  }
  if (profileStore.getGenderValue) {
    gender.value = profileStore.getGenderValue;
  } else {
    gender.value = "None";
  }
  if (profileStore.getCityValue) {
    city.value = profileStore.getCityValue;
  } else {
    city.value = "None";
  }
  if (profileStore.getCountryValue) {
    country.value = profileStore.getCountryValue;
  } else {
    country.value = "None";
  }
  if (profileStore.getPhoneValue) {
    phone.value = profileStore.getPhoneValue;
  } else {
    phone.value = "None";
  }
  if (profileStore.getTotalTurnsValue) {
    totalTurn.value = profileStore.getTotalTurnsValue;
  } else {
    totalTurn.value = 0;
  }
  email.value = profileStore.getEmailValue;
  username.value = profileStore.getUsernameValue;

};

const handleEditSubmit = async () => {
  if (phone.value === "None") {
    phone.value = null;
  }
  validatePhoneNumber()
  if(!isValidPhoneNumber){
    return
  }
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    city: city.value,
    country: country.value,
    gender: gender.value,
  };
  await profileStore.editProfileUser(userID, data);
};

onMounted(async () => {

  console.log("Problem:",userID);
  await profileStore.getFileId(userID);
  await profileStore.getProfileUser(userID);
  await profileStore.getTotalTurns(userID);

  loadProfile();
  console.log(city.value);
  fileID.value = profileStore.getFileIdValue;
  if (profileStore.getFileIdValue) {
    await profileStore.fetchImage(profileStore.getFileIdValue);
    imageUrl.value = profileStore.getImageUrlValue;
  }
  await profileStore.getHistoryProfile(userID);
});

const activateProfileSettingClick = () => {
  isActiveProfileSetting.value = true;
  isActiveProfile.value = false;
  isActiveHistory.value = false;
};

const activeProfileClick = () => {
  isActiveProfile.value = true;
  isActiveProfileSetting.value = false;
  isActiveHistory.value = false;
};

const activateHistoryClick = () => {
  isActiveHistory.value = true;
  isActiveProfileSetting.value = false;
  isActiveProfile.value = false;
};
</script>
