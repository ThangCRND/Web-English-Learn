<script  setup>

</script>
<!-- Tạo bảng câu hỏi -->
<template>
  <div class="bg-primaryLightColor rounded-md w-full md:w-60 lg:w-80 ml-4 md:ml-6 lg:ml-10">
    <div class="p-2 md:p-3 lg:p-4">
      <p class="text-white font-bold p-2">Question 1/30</p>
      <div class="grid grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2 lg:gap-3 mt-4 p-2">

        <span v-for="number in 30" :key="number"
          class="w-8 h-8 md:w-8 md:h-8 lg:h-10 lg:w-10 rounded-full bg-primaryColor flex items-center justify-center text-white">
          {{ number }}
        </span>
      </div>
      <button class="bg-white p-2 mt-6 rounded-md w-full font-bold lg:text-lg md:text text-sm">Submit Quiz</button>
    </div>
  </div>
</template>

<style scoped>

</style>
