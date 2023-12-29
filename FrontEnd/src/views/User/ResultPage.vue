<template>
  <div
    class="bg-gradient-to-r from-purpleLinear from-10% via-blueLinear via-30% to-greenLinear to-90% flex items-center p-8 min-h-screen"
  >
    <div class="p-6 w-full h-auto rounded-2xl shadow-lg min-h-screen bg-white">
      <!-- Phần tạo câu hỏi -->
      <router-link :to="{ name: 'PracticePage' }">
        <div class="p-12 absolute top-0 left-0">
          <button
            class="bg-greenColor hover:bg-blue-600 text-white font-medium py-2 w-26 px-4 rounded-lg"
            @click="toggleConfirmModal"
          >
            <font-awesome-icon icon="arrow-left" class="mr-2" /> Back
          </button>
        </div>
      </router-link>

      <div
        class="w-2/3 lg:w-1/2 flex flex-col justify-center items-center mx-auto"
      >
        <div class="flex flex-col md:flex-row justify-center min-w-2xl px-24">
          <div>
            <img v-if="examStore.exam.examStatus === 'Reading'"
              src="../../assets/images/TOEICReading.jpg"
              alt=""
              class="w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44"
            />
            <img v-else-if="examStore.exam.examStatus === 'Listening'"
              src="../../assets/images/TOEICListening.jpg"
              alt=""
              class="w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44"
            />
            <img v-else
              src="../../assets/images/TOEICWriting.jpg"
              alt=""
              class="w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44"
            />
          </div>
          <div class="ml-2 lg:ml-12">
            <h1 class="text-2xl md:text-3xl lg:text-5xl font-bold">
              {{ examStore.exam.title }}
            </h1>
            <div class="flex mt-4">
              <img
                src="../../assets/images/calendar.png"
                alt=""
                class="w-5 h-5"
              />
              <p class="ml-2">
                Publish On: <span class="font-bold">21 Feb 2023</span>
              </p>
            </div>
            <div class="flex mt-4">
              <img src="../../assets/images/flash.png" alt="" class="w-5 h-5" />
              <p class="ml-2">
                Test Taken: <span class="font-bold">572,24</span>
              </p>
            </div>
          </div>
        </div>

        <h2 class="ml-8 font-bold text-center text-3xl mt-6">Your Score is</h2>

        <div
          class="w-full flex flex-col md:flex-row mt-6 items-center justify-around"
        >
          <div class="flex flex-col items-center md:ml-6 mt-4 md:mt-0">
            <p class="text-gray font-semibold">Correct Answers</p>
            <span class="text-greenDark font-semibold">{{ correctQuestion }}/{{ totalQuest }}</span>
          </div>
          <div
            class="flex items-center justify-center rounded-full w-32 h-32 border-4 bg-greenLight border-greenDark mt-4 md:mt-0"
          >
            <span class="text-greenDark text-2xl font-bold text-center">{{ score }}</span>
          </div>
          <div
            class="flex flex-col justify-center items-center md:mr-6 mt-4 md:mt-0"
          >
            <img src="../../assets/images/watch.png" alt="" class="w-5 h-5" />
            <p class="text-gray font-semibold">Time spent</p>
            <span class="text-greenDark font-semibold">{{ timeTakeQuiz}}</span>
            <p class="text-gray font-medium">{{ duration }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-4"></div>

      <div class="flex flex-col justify-center items-center mt-6">
        <div
          v-for="(question, index) in resultStore.trackedQuest"
          :key="question.questionID"
          class="w-1/2 bg-[#e9e8e8] rounded-xl p-8 mt-6 shadow-xl"
          :class="{
            'bg-greenBlur': question.selectedAnswer === question.correctAnswer,
            'bg-peachColor': question.selectedAnswer !== question.correctAnswer,
          }"
        >
          <div class="flex justify-between items-center">
            <h1 class="font-bold text-3xl">Question {{ index + 1 }}</h1>
          </div>
          <h2 class="mt-4 text-xl font-medium">
            {{ question.questionText }}
          </h2>
          <div class="flex items-center mt-4 w-full justify-between">
            <div class="flex items-center">
              <span
                class="w-10 h-10 text-white font-semibold rounded-full bg-[#6366F1] flex items-center justify-center"
                :class="{
                  'bg-greenColor':
                    question.selectedAnswer === question.correctAnswer,
                  'bg-greenColor': question.correctAnswer === 'A',
                  'bg-gray': question.selectedAnswer === 'A',
                }"
              >
                A
              </span>
              <p class="ml-4 text-xl">{{ question.option1 }}</p>
            </div>

            <div class="flex items-center">
              <img
                v-if="
                  question.selectedAnswer === question.correctAnswer &&
                  question.selectedAnswer === 'A'
                "
                src="../../assets/images/true.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else-if="question.correctAnswer === 'A'"
                src="../../assets/images/true.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else-if="question.selectedAnswer !== 'A'"
                src="../../assets/images/false.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else
                src="../../assets/images/false.png"
                alt=""
                class="h-8 w-8"
              />
            </div>
          </div>
          <div class="flex items-center mt-4 w-full justify-between">
            <div class="flex items-center">
              <span
                class="w-10 h-10 text-white font-semibold rounded-full bg-[#6366F1] flex items-center justify-center"
                :class="{
                  'bg-greenColor':
                    question.selectedAnswer === question.correctAnswer,
                  'bg-greenColor': question.correctAnswer === 'B',
                  'bg-gray': question.selectedAnswer === 'B',
                }"
              >
                B
              </span>
              <p class="ml-4 text-xl">{{ question.option2 }}</p>
            </div>

            <div class="flex items-center">
              <img
                v-if="
                  question.selectedAnswer === question.correctAnswer &&
                  question.selectedAnswer === 'B'
                "
                src="../../assets/images/true.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else-if="question.correctAnswer === 'B'"
                src="../../assets/images/true.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else-if="question.selectedAnswer !== 'B'"
                src="../../assets/images/false.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else
                src="../../assets/images/false.png"
                alt=""
                class="h-8 w-8"
              />
            </div>
          </div>
          <div class="flex items-center mt-4 w-full justify-between">
            <div class="flex items-center">
              <span
                class="w-10 h-10 text-white font-semibold rounded-full bg-[#6366F1] flex items-center justify-center"
                :class="{
                  'bg-greenColor':
                    question.selectedAnswer === question.correctAnswer,
                  'bg-greenColor': question.correctAnswer === 'C',
                  'bg-gray': question.selectedAnswer === 'C',
                }"
              >
                C
              </span>
              <p class="ml-4 text-xl">{{ question.option3 }}</p>
            </div>
            <div class="flex items-center">
              <img
                v-if="
                  question.selectedAnswer === question.correctAnswer &&
                  question.selectedAnswer === 'C'
                "
                src="../../assets/images/true.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else-if="question.correctAnswer === 'C'"
                src="../../assets/images/true.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else-if="question.selectedAnswer !== 'C'"
                src="../../assets/images/false.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else
                src="../../assets/images/false.png"
                alt=""
                class="h-8 w-8"
              />
            </div>
          </div>
          <div class="flex items-center mt-4 w-full justify-between">
            <div class="flex items-center">
              <span
                class="w-10 h-10 text-white font-semibold rounded-full bg-[#6366F1] flex items-center justify-center"
                :class="{
                  'bg-greenColor':
                    question.selectedAnswer === question.correctAnswer,
                  'bg-greenColor': question.correctAnswer === 'D',
                  'bg-gray': question.selectedAnswer === 'D',
                }"
              >
                D
              </span>
              <p class="ml-4 text-xl">{{ question.option4 }}</p>
            </div>
            <div class="flex items-center">
              <img
                v-if="
                  question.selectedAnswer === question.correctAnswer &&
                  question.selectedAnswer === 'D'
                "
                src="../../assets/images/true.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else-if="question.correctAnswer === 'D'"
                src="../../assets/images/true.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else-if="question.selectedAnswer !== 'D'"
                src="../../assets/images/false.png"
                alt=""
                class="h-8 w-8"
              />
              <img
                v-else
                src="../../assets/images/false.png"
                alt=""
                class="h-8 w-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTrackingExamStore } from "../../store/trackingExam";
import { useResultStore } from "../../store/result";
import { useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import { useQuestionStore } from "../../store/question";
import { useExamStore } from "../../store/exam";
import examService from "../../services/examService";

const route = useRoute();
const trackingExamStore = useTrackingExamStore();
const resultStore = useResultStore();
const examStore = useExamStore();

const examID = ref(null);
const turnID = ref(null);


const questionStore = useQuestionStore();
const timeTakeQuiz = ref(null);
const duration = ref(null);
const score = ref(null);
const correctQuestion = ref(null);
const totalQuest = ref(null);

examID.value = Number(route.params.examID);
turnID.value = Number(route.params.turnID);


const formatTime = (seconds)=>{
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

onMounted(async () => {
  const userID = JSON.parse(localStorage.getItem('user')).id;
  await examStore.getExam(examID.value);
  await resultStore.getCorrectQuestion(examID.value, userID, turnID.value);
  await resultStore.getQuestionTracked(examID.value, userID, turnID.value);
  await questionStore.getQuestionInExam(examID.value);
  await resultStore.getResult(turnID.value);
  await resultStore.getDuration(examID.value);
  timeTakeQuiz.value = formatTime(resultStore.getTimeValue);
  score.value = resultStore.getScoreValue;
  correctQuestion.value = resultStore.getCorrectQuest;
  totalQuest.value = resultStore.getTotalQuestion;
  duration.value = formatTime(examStore.exam.duration)
  console.log(resultStore.getResultValue);
  console.log(resultStore.getCorrectQuest);
  console.log(resultStore.getDurationValue);
  console.log(resultStore.getTotalQuestion);
  console.log(resultStore.getTrackedQuestValue);
});
</script>
