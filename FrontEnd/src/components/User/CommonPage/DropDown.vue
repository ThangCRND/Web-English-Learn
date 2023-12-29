<template>
    <div class="flex ">
    <div class="relative">
      <div v-if="open" @click="open = false" class="fixed inset-0"></div>
      <slot :open="open" :toggleOpen="toggleOpen"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const open = ref(false);


const toggleOpen = () =>{
    open.value = !open.value
}

</script>
