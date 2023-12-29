<!-- Giao diện chính CMS tạo câu hỏi của Admin -->
<template>
    <div
      id="listExam"
      class="bg-gradient-to-r from-purpleLinear from-10% via-blueLinear via-30% to-greenLinear to-90% flex items-center p-8 min-h-screen relative"
    >
      <div
        class="p-12 w-full rounded-2xl shadow-lg bg-white grid grid-rows-[0.4fr, 1fr, 1fr, 1fr] gap-4 min-h-screen "
      >
    <!-- Trả về giao diện chính khi click button HomePage -->
      <router-link :to="{ name: 'HomePage' }">
        <div class="p-12 absolute top-0 left-0">
          <button
            class="bg-greenColor hover:bg-blue-600 text-white font-medium py-2 w-26 px-4 rounded-lg"
            @click="toggleConfirmModal"
          >
            <font-awesome-icon icon="arrow-left" class="mr-2" /> Back
          </button>
        </div>
      </router-link>
        <!-- General Item -->
        <div>
          <div
            class="p-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 h-[80%] gap-4"
          >
            <div class="rounded-2xl shadow-xl">
              <div
                class="cursor-pointer bg-grayDark w-full h-full flex justify-center items-center rounded-xl p-12"
                @click="toggleModal"
              >
                <span
                  class="rounded-full bg-white w-24 h-24 shadow-xl flex justify-center items-center"
                  ><img src="../../assets/images/plus.png" alt="" class="w-16 h-16"
                /></span>
              </div>
            </div>
          </div>
        </div>
  
        <!--Giao diện phần Reading -->
        <div class="mt-12 h-full">
          <h1 class="font-bold text-3xl mb-4">Reading</h1>
          <div
            class="grid grid-cols-2 h-[85%] lg:grid-cols-3 xl:grid-cols-4 gap-4 min-w-1/2 lg:min-w-1/3 xl:min-w-1/4"
          >
            <div
              class="rounded-2xl shadow-xl text-lg"
              v-for="exam in examStore.filteredExam('Reading')"
              :key="exam.examID"
            >
            <router-link :to="{name: 'QuestionPage',params: {id: exam.examID }}">
              <div
                class="bg-grayDark w-full rounded-tl-xl rounded-tr-xl flex justify-center items-center"
              >
              
                <img src="../../assets/images/reading.svg" alt="" class="w-[50%] h-[50%]" />
              </div>   
            </router-link>       
              <div class="p-3 lg:p-4 xl:p-5">
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <img src="../../assets/images/file.png" alt="" class="w-6 h-6 mr-2" />
                    <router-link :to="{name: 'QuestionPage',params: {id: exam.examID }}">
                      <h2 class="font-bold text-lg md:text-xl text-center">
                      {{ exam.title }}
                    </h2></router-link>
                    
                  </div>
                  <div
                    class="flex flex-col xl:flex-row items-center bg-grayLight rounded-lg shadow-lg p-1 md:p-2 cursor-pointer"
                    @click="openExamSettings(exam.examID)"
                  >
                    <img
                      src="../../assets/images/settings.png"
                      alt=""
                      class="w-3 h-3 md:w-5 md:h-5 mr-1"
                    />
                    <p class="font-semibold text-sm md:text-md">Setting</p>
                  </div>
                </div>
                <!-- Info -->
                <div class="flex flex-col xl:flex-row justify-between mt-6">
                  <div class="flex mt-2">
                    <img
                      src="../../assets/images/stopwatch.png"
                      alt=""
                      class="w-6 h-6 mr-2"
                    />
                    <h2>{{ exam.duration/60 }} minutes</h2>
                  </div>
                  <div class="flex mt-2">
                    <img
                      src="../../assets/images/question.png"
                      alt=""
                      class="w-6 h-6 mr-2"
                    />
                    <h2>{{ exam.numberQuestion }} questions</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!--Giao diện phần Listening -->
        <div class="mt-12 h-full">
          <h1 class="font-bold text-3xl mb-4">Listening</h1>
          <div
            class="grid grid-cols-2 h-[85%] lg:grid-cols-3 xl:grid-cols-4 gap-4 min-w-1/2 lg:min-w-1/3 xl:min-w-1/4"
          >
            <div
              class="rounded-2xl shadow-xl text-lg"
              v-for="exam in examStore.filteredExam('Listening')"
              :key="exam.examID"
            >
              <div
                class="bg-grayDark w-full rounded-tl-xl rounded-tr-xl flex justify-center items-center"
              >
                <img src="../../assets/images/listening.svg" alt="" class="w-[50%] h-[50%]" />
              </div>
              <div class="p-3 lg:p-4 xl:p-5">
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <img src="../../assets/images/file.png" alt="" class="w-6 h-6 mr-2" />
                    <router-link :to="{name: 'QuestionPage',params: {id: exam.examID }}">
                      <h2 class="font-bold text-lg md:text-xl text-center">
                      {{ exam.title }}
                    </h2>
                    </router-link>
                    
                  </div>
                  <div
                    class="flex flex-col xl:flex-row items-center bg-grayLight rounded-lg shadow-lg p-2 cursor-pointer"
                    @click="openExamSettings(exam.examID)"
                  >
                    <img
                      src="../../assets/images/settings.png"
                      alt=""
                      class="w-3 h-3 md:w-5 md:h-5 mr-1"
                    />
                    <p class="font-semibold text-sm md:text-md">Setting</p>
                  </div>
                </div>
                <!--Giao diện phần thông tin làm bài Listening-->
                <div class="flex flex-col xl:flex-row justify-between mt-6">
                  <div class="flex mt-2">
                    <img
                      src="../../assets/images/stopwatch.png"
                      alt=""
                      class="w-6 h-6 mr-2"
                    />
                    <h2>{{ exam.duration/60 }} minutes</h2>
                  </div>
                  <div class="flex mt-2">
                    <img
                      src="../../assets/images/question.png"
                      alt=""
                      class="w-6 h-6 mr-2"
                    />
                    <h2>{{ exam.numberQuestion }} questions</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!--Giao diện phần Writing -->
        <div class="mt-12 h-full">
          <h1 class="font-bold text-3xl mb-4">Writing</h1>
          <div
            class="grid grid-cols-2 h-[85%] lg:grid-cols-3 xl:grid-cols-4 gap-4 min-w-1/2 lg:min-w-1/3 xl:min-w-1/4"
          >
            <div
              class="rounded-2xl shadow-xl text-lg"
              v-for="exam in examStore.filteredExam('Writing')"
              :key="exam.examID"
            >
              <div
                class="bg-grayDark w-full rounded-tl-xl rounded-tr-xl flex justify-center items-center"
              >
                <img src="../../assets/images/writing.svg" alt="" class="w-[50%] h-[50%]" />
              </div>
              <div class="p-3 lg:p-4 xl:p-5">
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <img src="../../assets/images/file.png" alt="" class="w-6 h-6 mr-2" />
                    <h2 class="font-bold text-lg md:text-xl text-center">
                      {{ exam.title }}
                    </h2>
                  </div>
                  <div
                    class="flex flex-col xl:flex-row items-center bg-grayLight rounded-lg shadow-lg p-2 cursor-pointer"
                    @click="openExamSettings(exam.examID)"
                  >
                    <img
                      src="../../assets/images/settings.png"
                      alt=""
                      class="w-3 h-3 md:w-5 md:h-5 mr-1"
                    />
                    <p class="font-semibold text-sm md:text-md">Setting</p>
                  </div>
                </div>
                <!-- Info -->
                <div class="flex flex-col xl:flex-row justify-between mt-6">
                  <div class="flex mt-2">
                    <img
                      src="../../assets/images/stopwatch.png"
                      alt=""
                      class="w-6 h-6 mr-2"
                    />
                    <h2>{{ exam.duration }} minutes</h2>
                  </div>
                  <div class="flex mt-2">
                    <img
                      src="../../assets/images/question.png"
                      alt=""
                      class="w-6 h-6 mr-2"
                    />
                    <h2>{{ exam.numberQuestion }} questions</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Giao diện khi tạo một bài thi mới -->
  
        <GenerateExamModal :modal-active="modalActive" @close-modal="toggleModal">
          <div class="container mx-auto">
            <div class="max-w-xl p-5 mx-auto my-10 bg-white rounded-md shadow-sm">
              <div class="text-center">
                <h1 class="my-3 text-3xl font-semibold text-gray-700">
                  Generate Exam
                </h1>
                <p class="text-gray-400">Fill up the form below.</p>
              </div>
              <div>
                <form v-on:submit.prevent="handleSubmitAdd">
                  <div class="mt-6 mb-6">
                    <div>
                      <div>
                        <div class="flex items-center mb-3 last:mb-0">
                          <label class="inline-block mb-4 text-sm text-gray-600"
                            >Type of Exam</label
                          >
  
                          <select
                            class="ml-2 block w-[200px] py-3 pl-4 pr-8 bg-white border border-gray-300 rounded-sm appearance-none cursor-pointer focus:outline-none hover:border-gray-400"
                            v-model="selectedExam"
                          >
                            <option disabled value="">Please type of Exam</option>
                            <option>Reading</option>
                            <option>Listening</option>
                            <option>Writing</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-6">
                    <label class="block mb-2 text-sm text-gray-600"
                      >Title of Exam</label
                    >
                    <input
                      type="text"
                      required
                      v-model="titleExam"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </div>
                  <div class="mb-6 w-full">
                    <label class="inline-block text-sm text-gray-600" for="color"
                      >Select duration</label
                    >
                    <div
                      class="relative justify-between text-lg mt-4 flex w-full"
                    >
                      <div>
                        <input
                          type="radio"
                          id="1200"
                          value="1200"
                          v-model="duration"
                        />
                        <label for="1200" class="ml-2">20 Minutes</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="1800"
                          value="1800"
                          v-model="duration"
                        />
                        <label for="1800" class="ml-2">30 Minutes</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="3600"
                          value="3600"
                          v-model="duration"
                          class="ml-2"
                        />
                        <label for="3600" class="ml-2">60 Minutes</label>
                      </div>
                    </div>
                  </div>
  
                  <div class="mb-6">
                    <label class="block mb-2 text-sm text-gray-600"
                      >Number of Questions</label
                    >
                    <input
                      type="number"
                      v-model="numberQuestion"
                      default="0"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </div>
  
                  <div class="mb-6">
                    <button
                      type="submit"
                      class="w-full px-2 py-4 text-white bg-purpleLinear rounded-md focus:bg-indigo-600 focus:outline-none"
                    >
                      Add Exam
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </GenerateExamModal>
  
        <!-- Update Modal -->
        <UpdateExamModal
          :update-modal-active="updateModalActive"
          @close-update-modal="toggleUpdateModal"
        >
          <div class="container mx-auto">
            <div class="max-w-xl p-5 mx-auto my-10 bg-white rounded-md shadow-sm">
              <div class="text-center">
                <h1 class="my-3 text-3xl font-semibold text-gray-700">
                  Update Exam
                </h1>
              </div>
              <div>
                <form v-on:submit.prevent="handleSubmitUpdate(examid)">
                  <div class="mt-6 mb-6">
                    <div>
                      <div>
                        <div class="flex items-center mb-3 last:mb-0">
                          <label class="inline-block mb-4 text-sm text-gray-600"
                            >Type of exam</label
                          >
  
                          <select
                            class="ml-2 block w-[200px] py-3 pl-4 pr-8 bg-white border border-gray-300 rounded-sm appearance-none cursor-pointer focus:outline-none hover:border-gray-400" v-model="selectedExam"
                          >
                            <option  disabled value="">{{ selectedExam }}</option>
                            <option >Reading</option>
                            <option >Listening</option>
                            <option >Writing</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-6">
                    <label class="block mb-2 text-sm text-gray-600"
                      >Title of Exam</label
                    >
                    <input
                      type="text"
                      required
                      v-model="titleExam"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </div>
                  <div class="mb-6 w-full">
                    <label class="inline-block text-sm text-gray-600" for="color"
                      >Select duration</label
                    >
                    <div
                      class="relative justify-between text-lg mt-4 flex w-full"
                    >
                      <div>
                        <input
                          type="radio"
                          id="1200"
                          value="1200"
                          v-model="duration"
                        />
                        <label for="1200" class="ml-2">20 Minutes</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="1800"
                          value="1800"
                          v-model="duration"
                        />
                        <label for="1800" class="ml-2">30 Minutes</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="3600"
                          value="3600"
                          v-model="duration"
                          class="ml-2"
                        />
                        <label for="3600" class="ml-2">60 Minutes</label>
                      </div>
                    </div>
                  </div>
  
                  <div class="mb-6">
                    <label class="block mb-2 text-sm text-gray-600"
                      >Number of Questions</label
                    >
                    <input
                      type="number"
                      v-model="numberQuestion"
                      default="0"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </div>
  
                  <div class="mb-6">
                    <button
                      type="submit"
                      class="w-full px-2 py-4 text-white bg-purpleLinear rounded-md focus:bg-indigo-600 focus:outline-none"
                    >
                      Update Exam
                    </button>
                    <button
                      type="submit"
                      class="w-full px-2 py-4 text-white bg-red rounded-md focus:bg-grayDark-400 focus:outline-none mt-4"
                      @click.prevent="handleSubmitDelete(examid)"
                    >
                      Delete Exam
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </UpdateExamModal>

        <ErrorLimitQuestion :error-modal-active="isModalErrorActive"
        @close-modal="toggleErrorModal">
        <div class="flex  flex-col justify-center items-center h-full">
          <img
            src="../../assets/images/warning.png"
            class="w-20 h-20 md:w-28 md:h-28"
            alt=""
          />
          <h1 class="font-bold text-center text-md md:text-xl mt-4">
            Can not Edit numberQuestion less than number question has been in Exam
          </h1>
        </div>
      </ErrorLimitQuestion>

      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import GenerateExamModal from "../../components/Admin/ExamPage/GenerateExamModal.vue";
  import UpdateExamModal from "../../components/Admin/ExamPage/UpdateExamModal.vue";
  import ErrorLimitQuestion from "../../components/ErrorHandle/ErrorLimitQuest.vue";
  import { useExamStore } from "../../store/exam";
  
  
  const modalActive = ref(false);
  
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
    resetForm();
  };
  
  const updateModalActive = ref(false);
  const toggleUpdateModal = () => {
    updateModalActive.value = !updateModalActive.value;
  };
  
  const titleExam = ref(null);
  const numberQuestion = ref(null);
  const duration = ref(null);
  const selectedExam = ref(null);
  const examid = ref(null);
  
  const examStore = useExamStore();
  
  const isModalErrorActive = ref(null);

const toggleErrorModal = () => {
  isModalErrorActive.value = !isModalErrorActive.value;
};

  onMounted(async () => {
    await examStore.getAllExams();
  });
  
  
  
  const resetForm = () => {
    examid.value = 0;
    titleExam.value = "";
    numberQuestion.value = 0;
    duration.value = 0;
    selectedExam.value = "";
  };
  
  const handleSubmitAdd = async () => {
    if (titleExam.value !== "" && selectedExam.value !== "") {
      await examStore.addExam({
        examID: examStore.randomExamID(),
        title: titleExam.value,
        duration: duration.value,
        numberQuestion: numberQuestion.value,
        examStatus: selectedExam.value,
      });
      resetForm();
      toggleModal();
    }
  };
  
  const handleSubmitUpdate = async (examid) => {
    await examStore.getQuestInExam(examid);
    const questInExam = examStore.validateEdit.questInExam;
    console.log(questInExam)
    if(numberQuestion.value < questInExam){
      resetForm();
      toggleUpdateModal();
      toggleErrorModal();
    }
    else{
        if (titleExam.value !== "" && selectedExam.value !== "") {
        await examStore.updateExam(examid, {
          title: titleExam.value,
          duration: duration.value,
          numberQuestion: numberQuestion.value,
          examStatus: selectedExam.value,
        });
        resetForm();
        toggleUpdateModal();
        examStore.getAllExams();
      }
    }
    
  };
  
  const handleSubmitDelete = async(examid) => {
    await examStore.deleteExam(examid);
    // resetForm();
    examStore.getAllExams()
  }
  
  const openExamSettings = async(examID) => {
    examStore.choosedExam = [];
  
    examStore.selectExamToUpdate(examID);

    titleExam.value = examStore.choosedExam[0].title;
    selectedExam.value = examStore.choosedExam[0].examStatus;
    numberQuestion.value = examStore.choosedExam[0].numberQuestion;
    duration.value = examStore.choosedExam[0].duration;
    examid.value = examStore.choosedExam[0].examID;
  
    toggleUpdateModal();
  };
  </script>
  
  <style scoped></style>
  