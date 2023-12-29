<template>
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
        <div class="p-2 " @click="skipBackward">
          <img src="../../../assets/images/back.png" alt="" class="w-8 h-8" />
        </div>

        <div class="p-1" @click="togglePlay">
          <img
            v-if="playing"
            src="../../../assets/images/pause.png"
            alt=""
            class="w-6 h-6"
          />
          <img
            v-else
            src="../../../assets/images/play.png"
            alt=""
            class="w-5 h-5"
          />
        </div>

        <div class="p-2" @click="skipForward">
          <img src="../../../assets/images/next.png" alt="" class="w-8 h-8" />
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
          <img src="../../../assets/images/volume.png" alt="" class="w-7 h-7" />
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAudioStore } from "../../../store/audio";

const audioStore = useAudioStore();

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



onMounted(async () => {
  await audioStore.fetchAudio('1742BpoFuR4of1iki7XZvCmPiqPnWfc4b');
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
  // loadNewAudio()
});
</script>
