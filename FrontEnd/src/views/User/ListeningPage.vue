<template>
  <div class="bg-primaryColor h-full ">
    <div class="text-white flex justify-between p-6">
      <div>
        <h1 class="text-xl md:text-2xl lg:text-3xl">
          Exam: {{ examStore.exam.title }}
        </h1>
        <p><span class="text-gray">Update on:</span> 12/21/2023</p>
      </div>

      <div class="flex items-center">
        <div>
          <p class="text-md mr-2">Time Remaining</p>
          <p class="text-md mr-2">{{ formattedTimeRemaining }}</p>
        </div>

        <img
          src="../../assets/images/clock.png"
          class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
        />
      </div>
    </div>
    <div class="p-6">
      <button
        class="bg-greenColor hover:bg-blue-600 text-white font-medium py-2 w-26 px-4 rounded-lg"
        @click="handleExit"
      >
        <font-awesome-icon icon="home" class="mr-2" /> Home
      </button>
    </div>

    <div class="flex flex-col md:flex-row justify-center mt-4 p-10">
      <div class="w-full max-w-3xl">
        <div class="bg-primaryLightColor lg:max-h-3xl mb-8 rounded-md">
          <div class="p-5">
            <h2 class="text-white font-bold mb-3">
              Question {{ currentQuestionIndex + 1 }}
            </h2>
            <p class="text-white">
              {{
                questionStore.filteredQuestion(route.params.id)[
                  currentQuestionIndex
                ].questionText
              }}
            </p>
          </div>

          <div class="bg-primaryLightColor w-full h-24 p-4 mt-4">
            <audio
              v-if="audioStore.getAudioValue"
              ref="audio"
              @timeupdate="updateTime"
              @volumechange="updateVolume"
            >
              <source :src="audioStore.getAudioValue" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div v-else>Loading...</div>
            

            <div
              class="w-full h-12 rounded-lg bg-grayLight flex items-center justify-center"
            >
              <div class="flex items-center">
                <div class="p-2" @click="skipBackward">
                  <img
                    src="../../assets/images/back.png"
                    alt=""
                    class="w-8 h-8"
                  />
                </div>

                <div class="p-1" @click="togglePlay">
                  <img
                    v-if="playing"
                    src="../../assets/images/pause.png"
                    alt=""
                    class="w-6 h-6"
                  />
                  <img
                    v-else
                    src="../../assets/images/play.png"
                    alt=""
                    class="w-5 h-5"
                  />
                </div>

                <div class="p-2" @click="skipForward">
                  <img
                    src="../../assets/images/next.png"
                    alt=""
                    class="w-8 h-8"
                  />
                </div>
              </div>
              <div class="w-full p-2 flex items-center">
                <p class="mx-1">{{ currentTimeFormatted }}</p>
                <input
                  type="range"
                  v-model="currentTime"
                  :max="duration"
                  @input="seek"
                  class="bg-primaryBlue w-full"
                />
                <p class="mx-2">{{ durationFormatted }}</p>
                <div class="p-2">
                  <img
                    src="../../assets/images/volume.png"
                    alt=""
                    class="w-7 h-7"
                  />
                </div>
                <input
                  type="range"
                  v-model="volume"
                  min="0"
                  max="1"
                  step="0.1"
                  @input="changeVolume"
                  class="bg-primaryBlue w-1/4"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-primaryLightColor h-72 w-full rounded-md">
          <div class="p-5">
            <div class="flex items-center mb-4">
              <span
                class="h-10 w-10 rounded-full bg-gray flex items-center justify-center text-white cursor-pointer"
                :class="{
                  'bg-greenColor': containAnswer === 'A',
                  'bg-[#6366F1]': containAnswer !== 'A',
                }"
                @click="
                  handleSelectAnswer(
                    'A',
                    questionStore.filteredQuestion(route.params.id)[
                      currentQuestionIndex
                    ].questionID
                  )
                "
                >A
              </span>
              <p class="text-white ml-2">
                {{
                  questionStore.filteredQuestion(route.params.id)[
                    currentQuestionIndex
                  ].option1
                }}
              </p>
            </div>
            <div class="flex items-center mb-4">
              <span
                class="h-10 w-10 rounded-full bg-gray flex items-center justify-center text-white cursor-pointer"
                :class="{
                  'bg-greenColor': containAnswer === 'B',
                  'bg-[#6366F1]': containAnswer !== 'B',
                }"
                @click="
                  handleSelectAnswer(
                    'B',
                    questionStore.filteredQuestion(route.params.id)[
                      currentQuestionIndex
                    ].questionID
                  )
                "
                >B
              </span>
              <p class="text-white ml-2">
                {{
                  questionStore.filteredQuestion(route.params.id)[
                    currentQuestionIndex
                  ].option2
                }}
              </p>
            </div>
            <!-- <div class="flex items-center mb-4">

              <span
                class="h-10 w-10 rounded-full bg-gray flex items-center justify-center text-white"
                :class="{ 'selected-answer': selectedAnswer === 'C' }"
                @click="
                  handleTrackingExam(
                    questionStore.filteredQuestion(route.params.id)[
                      currentQuestionIndex
                    ].questionID
                  )
                "
                >C</span
              >
              <p class="text-white ml-2">
                {{
                  questionStore.filteredQuestion(route.params.id)[
                    currentQuestionIndex
                  ].option3
                }}
              </p>
            </div> -->
            <div class="flex items-center mb-4">
              <span
                class="h-10 w-10 rounded-full bg-gray flex items-center justify-center text-white cursor-pointer"
                :class="{
                  'bg-greenColor': containAnswer === 'C',
                  'bg-[#6366F1]': containAnswer !== 'C',
                }"
                @click="
                  handleSelectAnswer(
                    'C',
                    questionStore.filteredQuestion(route.params.id)[
                      currentQuestionIndex
                    ].questionID
                  )
                "
                >C</span
              >
              <p class="text-white ml-2">
                {{
                  questionStore.filteredQuestion(route.params.id)[
                    currentQuestionIndex
                  ].option3
                }}
              </p>
            </div>
            <div class="flex items-center mb-4">
              <span
                class="h-10 w-10 rounded-full bg-gray flex items-center justify-center text-white cursor-pointer"
                :class="{
                  'bg-greenColor': containAnswer === 'D',
                  'bg-[#6366F1]': containAnswer !== 'D',
                }"
                @click="
                  handleSelectAnswer(
                    'D',
                    questionStore.filteredQuestion(route.params.id)[
                      currentQuestionIndex
                    ].questionID
                  )
                "
                >D</span
              >
              <p class="text-white ml-2">
                {{
                  questionStore.filteredQuestion(route.params.id)[
                    currentQuestionIndex
                  ].option4
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center mt-6">
          <button
            class="bg-gray hover:bg-blue-600 text-white font-medium py-2 w-40 px-4 rounded"
            @click="
              handlePreviousButton(
                questionStore.filteredQuestion(route.params.id)[
                  currentQuestionIndex - 1
                ].questionID,questionStore.filteredQuestion(route.params.id)[
                  currentQuestionIndex - 1
                ].attach
              )
            "
            :disabled="currentQuestionIndex === 0"
          >
            <font-awesome-icon icon="chevron-left" class="mr-4" /> Previous
          </button>
          <button
            class="ml-8 bg-blueColor hover:bg-blue-600 text-white font-medium py-2 w-40 px-4 rounded"
            v-if="
              questionStore.filteredQuestion(route.params.id).length - 2 >
              currentQuestionIndex
            "
            @click="
              handleNextButton(
                questionStore.filteredQuestion(route.params.id)[
                  currentQuestionIndex + 1
                ].questionID,questionStore.filteredQuestion(route.params.id)[
                  currentQuestionIndex + 1
                ].attach
              )
            "
            :disabled="
              currentQuestionIndex ===
              questionStore.filteredQuestion(route.params.id).length - 1
            "
          >
            Next <font-awesome-icon icon="chevron-right" class="ml-4" />
          </button>

          <button
            v-else-if="
              questionStore.filteredQuestion(route.params.id).length - 1 >
              currentQuestionIndex
            "
            class="ml-8 bg-blueColor hover:bg-blue-600 text-white font-medium py-2 w-40 px-4 rounded"
            @click="hanldeLastQuestButton"
            :disabled="
              currentQuestionIndex ===
              questionStore.filteredQuestion(route.params.id).length - 1
            "
          >
            Last
            <font-awesome-icon icon="chevron-right" class="ml-4" />
          </button>
        </div>
      </div>

      <!-- Question Table -->
      <div
        class="bg-primaryLightColor rounded-md w-50 md:w-60 lg:w-80 mt-4 md:mt-0 ml-0 md:ml-6 lg:ml-10"
      >
        <div class="p-2 md:p-3 lg:p-4 h-full flex flex-col justify-between">
          <div>
            <p class="text-white font-bold p-2">
              Question {{ trackingExamStore.getCurrentIndex }} /{{
                questionStore.validateQuestion.questInExam
              }}
            </p>
            <div
              class="grid sm:grid-cols-12 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2 lg:gap-3 mt-4 p-2"
            >
              <span
                v-for="(question, index) in questionStore.filteredQuestion(
                  route.params.id
                )"
                :key="question.questionID"
                class="w-8 h-8 md:w-8 md:h-8 lg:h-10 lg:w-10 rounded-full flex items-center justify-center text-white font-bold"
                :class="{
                  'bg-greenColor':
                    trackingExamStore.isSelected(question.questionID) !== null,
                  'bg-primaryColor':
                    trackingExamStore.isSelected(question.questionID) === null,
                  'bg-red': isCurrentQuestion(index),
                }"
              >
                {{ index + 1 }}
              </span>
            </div>
          </div>

          <div>
            <!-- <button
              class="bg-white p-2 mt-6 rounded-md w-full font-bold lg:text-lg md:text-xl text-sm"
              v-if="trackingExamStore.getValueOfSelectedQuest.length !== 0"
              @click="toggleSubmitModal"
            >
              Submit Quiz 
            </button> -->
            <button
              class="bg-white p-2 mt-6 rounded-md w-full font-bold lg:text-lg md:text-xl text-sm"
              v-if="trackingExamStore.getValueOfSelectedQuest.length !== 0"
              @click="toggleSubmitModal"
            >
              Submit Quiz
            </button>
            <button
              class="bg-white p-2 mt-6 rounded-md w-full font-bold lg:text-lg md:text-xl text-sm"
              v-else
              @click="toggleEmptyModal"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConfirmExitModal
    :exit-modal-active="isModalExitActive"
    @close-modal="toggleExitModal"
  >
    <div class="flex flex-col justify-center items-center h-full">
      <img
        src="../../assets/images/warning.png"
        class="w-20 h-20 md:w-28 md:h-28"
        alt=""
      />
      <h1 class="font-bold text-center text-md md:text-xl mt-4">
        Are you sure to exit the quiz!
      </h1>
      <div class="flex justify-center mt-4">
        <router-link :to="{ name: 'HomePage' }">
          <button
            class="text-white text-md font-bold bg-red flex justify-center py-2 px-12 rounded-lg"
          >
            Sure
          </button>
        </router-link>
      </div>
    </div>
  </ConfirmExitModal>

  <ConfirmSubmitModal
    :submit-modal-active="isModalSubmitActive"
    @close-modal="toggleSubmitModal"
  >
    <div class="flex flex-col justify-center items-center h-full">
      <img
        src="../../assets/images/submit.png"
        class="w-20 h-20 md:w-28 md:h-28"
      />
      <h1 class="font-bold text-center text-md md:text-xl mt-4">
        Are you sure to submit the quiz!
      </h1>
      <div class="flex justify-center mt-4">
        <!-- <router-link
          :to="{
            name: 'ResultPage',
            params: {
              examID: Number(route.params.id),
              turnID: trackingExamStore.getTurnID,
            },
          }"
        >
          
        </router-link> -->
        <button
          class="text-white text-md font-bold bg-greenColor flex justify-center py-2 px-12 rounded-lg"
          @click="handleSubmit"
        >
          Sure
        </button>
      </div>
    </div>
  </ConfirmSubmitModal>

  <ErrorEmptySubmit
    :empty-modal-active="isEmptyModalActive"
    @close-modal="toggleEmptyModal"
  >
    <div class="flex flex-col justify-center items-center h-full">
      <img
        src="../../assets/images/warning.png"
        class="w-20 h-20 md:w-28 md:h-28"
      />
      <h1 class="font-bold text-center text-md md:text-xl mt-4">
        You are not do anything, cannot submit!
      </h1>
    </div>
  </ErrorEmptySubmit>

  <TimeupModal
    :timeup-modal-active="isTimeUpModalActive"
    @close-modal="toggleTimeUpModal"
  >
    <div class="flex flex-col justify-center items-center h-full">
      <img
        src="../../assets/images/timeup.png"
        class="w-20 h-20 md:w-28 md:h-28"
      />
      <h1 class="font-bold text-center text-md md:text-xl mt-4">Time Up !!!</h1>

      <div class="flex justify-center mt-4">
       
        <button
          class="text-white text-md font-bold bg-greenColor flex justify-center py-2 px-12 rounded-lg"
          v-if="trackingExamStore.getValueOfSelectedQuest.length !== 0"
          @click="handleReset"
        >
          Quiz Bthg
        </button>
        <button
          class="text-white text-md font-bold bg-greenColor flex justify-center py-2 px-12 rounded-lg"
          v-else
          @click="handleReset"
        >
          QuizEmpty
        </button>
      </div>
    </div>
  </TimeupModal>
</template>

<script setup>
import { useExamStore } from "../../store/exam";
import { useQuestionStore } from "../../store/question";
import { useTrackingExamStore } from "../../store/trackingExam";
import { useResultStore } from "../../store/result";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { onMounted, ref, computed,watch } from "vue";
import ConfirmExitModal from "../../components/User/QuizPage/ConfirmExitModal.vue";
import ConfirmSubmitModal from "../../components/User/QuizPage/ConfirmSubmitModal.vue";
import ErrorEmptySubmit from "../../components/ErrorHandle/ErrorEmptySubmit.vue";
import TimeupModal from "../../components/User/QuizPage/TimeupModal.vue";

import { useAudioStore } from "../../store/audio";


const audioStore = useAudioStore();

const examStore = useExamStore();
const questionStore = useQuestionStore();
const trackingExamStore = useTrackingExamStore();
const resultStore = useResultStore();
const route = useRoute();



const questionInExam = ref(null);
var currentQuestionIndex = ref(0);
const timeRemaining = ref(0);
const containAnswer = ref(null);
const questionID = ref(null);
const selectedAnswer = ref(null);
const isSelected = ref(false);


const router = useRouter();

const user = JSON.parse(localStorage.getItem('user'));
const userID = user.id;
const role = user.roles[0];
console.log(role)

const startTime = ref(null);

const playing = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const currentTimeFormatted = ref("0:00");
const durationFormatted = ref("0:00");
const volume = ref(1); // Initial volume set to 1 (max volume)
const currentAudio = ref({
  audio: "",
});

const audioRef = ref(null);

const togglePlay = () => {
  playing.value = !playing.value;

  if (playing.value) {
    audioRef.value.play();
  } else {
    audioRef.value.pause();
  }
};

const updateTime = () => {
  currentTime.value = audioRef.value.currentTime;

  if (!isNaN(audioRef.value.duration) && isFinite(audioRef.value.duration)) {
    duration.value = audioRef.value.duration;

    const currentMinutes = Math.floor(audioRef.value.currentTime / 60);
    const currentSeconds = Math.floor(audioRef.value.currentTime % 60);

    const durationMinutes = Math.floor(audioRef.value.duration / 60);
    const durationSeconds = Math.floor(audioRef.value.duration % 60);

    currentTimeFormatted.value = `${currentMinutes}:${
      currentSeconds < 10 ? "0" : ""
    }${currentSeconds}`;
    durationFormatted.value = `${durationMinutes}:${
      durationSeconds < 10 ? "0" : ""
    }${durationSeconds}`;
  } else {
    durationFormatted.value = "Loading...";
  }
};

const seek = () => {
  audioRef.value.currentTime = currentTime.value;
};

const skipBackward = () => {
  audioRef.value.currentTime -= 15;
};

const skipForward = () => {
  audioRef.value.currentTime += 15;
};

const changeVolume = () => {
  audioRef.value.volume = volume.value;
};

const updateVolume = () => {
  volume.value = audioRef.value.volume;
};



const startExam = () => {
  startTime.value = new Date();
};

const calculateTimeSpent = () => {
  if (startTime.value) {
    const endTime = new Date();
    const timeDifferenceInSeconds = Math.floor(
      (endTime - startTime.value) / 1000
    ); // in seconds
    if (timeDifferenceInSeconds >= examStore.exam.duration) {
      return examStore.exam.duration;
    }
    return timeDifferenceInSeconds;
  } else {
    return 0;
  }
};

const handleTrackingExam = (questionID) => {
  console.log(selectedAnswer.value);
  const data = {
    examID: Number(route.params.id),
    userID: userID,
    questionID: questionID,
    selectedAnswer: selectedAnswer.value,
    turnID: trackingExamStore.getTurnID,
  };
  trackingExamStore.selectedQuestion(data);

  selectedAnswer.value = "";
};
//:class="{ 'bg-greenColor': trackingExamStore.selectedQuest[index].selectedAnswer !== null, 'bg-[#6366F1]': trackingExamStore.selectedQuest[index].selectedAnswer === null }"

const isQuestionAnswered = (questionID) => {
  isSelected.value = trackingExamStore.getSelectedAnswer(questionID);
  console.log(isSelected.value);
};

const isCurrentQuestion = (index) => {
  return trackingExamStore.isCurrentQuestion(index);
};

const setSelectedAnswer = (answer) => {
  selectedAnswer.value = answer;
};

const handleSelectAnswer = (answer, questionID) => {
  setSelectedAnswer(answer);
  handleTrackingExam(questionID);

  containAnswer.value = trackingExamStore.getSelectedAnswer(questionID);
  console.log(containAnswer.value);
};

const handleNextButton =async(questionID,fileId) => {
  console.log(fileId);
  
  await audioStore.fetchAudio(fileId)
  refreshAudioElement()
  calculateTimeSpent();
  containAnswer.value = null;
  currentQuestionIndex.value += 1;
  trackingExamStore.currentQuestionIndex += 1;
  questionID = Number(questionID);
  containAnswer.value = trackingExamStore.getSelectedAnswer(questionID);
  isQuestionAnswered(questionID);
  playing.value = false;
  
};

const refreshAudioElement = () => {
  // Use a unique key to force re-rendering of the audio element
  audioRef.value.load();
};




const handlePreviousButton = async(questionID,fileId) => {
  
  await audioStore.fetchAudio(fileId)
  refreshAudioElement()
  containAnswer.value = null;
  currentQuestionIndex.value -= 1;
  trackingExamStore.currentQuestionIndex -= 1;
  questionID = Number(questionID);
  containAnswer.value = trackingExamStore.getSelectedAnswer(questionID);
  playing.value = false;
};

const hanldeLastQuestButton = async() => {
  containAnswer.value = null;
  trackingExamStore.currentQuestionIndex += 1;
  currentQuestionIndex.value = questionStore.lastIndex;
  const fileID = questionStore.filteredQuestion(route.params.id)[currentQuestionIndex.value].attach
  await audioStore.fetchAudio(fileID);
  refreshAudioElement()
  const questionID = questionStore.getLastQuestion();
  
  containAnswer.value = trackingExamStore.getSelectedAnswer(questionID);
  playing.value = false;
};

const handleSubmit = async () => {
  try {
    trackingExamStore.markUnansweredQuestions(userID);

    await trackingExamStore.addTrackingExam();
    await resultStore.getCorrectQuestion(
      Number(route.params.id),
      userID,
      trackingExamStore.getTurnID
    );

    await handleAddResult();

    router.push({
      name: "ResultPage",
      params: {
        examID: Number(route.params.id),
        turnID: trackingExamStore.getTurnID,
      },
    });
    trackingExamStore.computedIsDone();
  } catch (error) {
    console.log("Error Adding: ", error);
  }
};

const handleExit = () => {
  try {
    toggleExitModal();
    trackingExamStore.resetState();
  } catch (error) {
    console.log("Error Exit ", error);
  }
};

const handleEmptySubmitTimeup = async () => {
  //Truong hop timeup ko làm gì cả
  try {
    // const data = {
    //   examID: Number(route.params.id),
    //   userID: 2015,
    //   questionID: null,
    //   selectedAnswer: null,
    //   turnID: trackingExamStore.getTurnID,
    // };
    // trackingExamStore.selectedQuestion(data);
    trackingExamStore.markUnansweredQuestions(userID);
    await trackingExamStore.addTrackingExam();
    trackingExamStore.resetState();
    resultStore.resetResultStore();
  } catch (error) {
    console.log("Error submit: ", error);
  }
};

const handleAddResult = async () => {
  try {
    const data = {
      examID: Number(route.params.id),
      userID: userID,
      score: resultStore.getScoreValue,
      time: calculateTimeSpent(),
      turnID: trackingExamStore.turnID,
    };
    console.log(data);
    await resultStore.createResult(data);
    console.log("Successful Add Result");
  } catch (error) {
    console.log("Error Add Result: ", error);
  }
};

const handleAddEmptyResult = async () => {
  try {
    const data = {
      examID: Number(route.params.id),
      userID: userID,
      score: 0,
      time: calculateTimeSpent(),
      turnID: trackingExamStore.turnID,
    };
    console.log(data);
    await resultStore.createResult(data);
    router.push({
      name: "ResultPage",
      params: {
        examID: Number(route.params.id),
        turnID: trackingExamStore.getTurnID,
      },
    });
    trackingExamStore.computedIsDone();
    console.log("Successful Add Empty Result");
  } catch (error) {
    console.log("Error Add Empty Data: ", error);
  }
};

const handleReset = () => {
  trackingExamStore.resetState();
  resultStore.resetResultStore();
  // questionStore.resetQuestionStore();
  audioStore.resetAudioStore();
};

const formattedTimeRemaining = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60);
  const seconds = timeRemaining.value % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

onMounted(async () => {
  
  handleReset();
  await trackingExamStore.getQuestionInExam(Number(route.params.id));
  await questionStore.getLimitQuest(Number(route.params.id));
  await examStore.getExam(Number(route.params.id));
  trackingExamStore.turnID = trackingExamStore.getRandomTurnID();
  timeRemaining.value = examStore.exam.duration;
  console.log(trackingExamStore.getTurnID);
  startExam();
  // Start the countdown
  await audioStore.fetchAudio(questionStore.filteredQuestion(route.params.id)[0].attach);
  console.log(audioStore.getAudioValue);
  audioRef.value = document.querySelector("audio");
  console.log("siuuuu");
  audioRef.value.addEventListener("timeupdate", updateTime);
  audioRef.value.addEventListener("loadedmetadata", () => {
    duration.value = audioRef.value.duration;
    updateTime();
  });
  currentAudio.value = audioStore.getAudioValue;
  console.log(currentAudio.value);
  const timerInterval = setInterval(async () => {
    if (timeRemaining.value > 0) {
      timeRemaining.value -= 1;
    } else {
      if (
        trackingExamStore.selectedQuest.length != 0 &&
        trackingExamStore.getIsDone === false
      ) {
        await handleSubmit();
      } else if (
        trackingExamStore.selectedQuest.length === 0 &&
        trackingExamStore.getIsDone === false
      ) {
        await handleAddEmptyResult();
        await handleEmptySubmitTimeup();
      }
      clearInterval(timerInterval); // Stop the timer when time is up
    }
  }, 1000); // Update every second
});

const isModalExitActive = ref(null);

const toggleExitModal = () => {
  isModalExitActive.value = !isModalExitActive.value;
};

const isModalSubmitActive = ref(null);
const toggleSubmitModal = () => {
  isModalSubmitActive.value = !isModalSubmitActive.value;
};

const isEmptyModalActive = ref(null);
const toggleEmptyModal = () => {
  isEmptyModalActive.value = !isEmptyModalActive.value;
};

const isTimeUpModalActive = ref(null);
const toggleTimeUpModal = () => {
  isTimeUpModalActive.value = !isTimeUpModalActive.value;
};
</script>