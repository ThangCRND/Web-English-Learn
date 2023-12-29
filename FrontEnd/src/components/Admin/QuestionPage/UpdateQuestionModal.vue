<template>
    <Teleport to="body">
      <div
        v-show="updateModalActive"
        class="fixed inset-1 flex items-center justify-center bg-black bg-opacity-30"
      >
        <div
          v-if="updateModalActive"
          class="p-4 bg-white self-start w-1/2 rounded-xl mt-2"
        >
          <button
            class="text-white bg-grayDark py-2 px-6 rounded-lg "
            @click="$emit('close-updateModal')"
          >
            Close
          </button>
          <slot></slot>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  
  defineEmits(["close-updateModal"]); 
  defineProps({
  updateModalActive: {
    type: Boolean,
    default: true,
  }
  });
  
  
  
  </script>
  
  <style scoped>
  .modal-outer-enter-active,
  .modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  
  .modal-outer-enter-from,
  .modal-outer-leave-to {
  opacity: 0;
  }
  
  .modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }
  
  .modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  
  .modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
  }
  
  .modal-inner-leave-to {
  transform: scale(0.8);
  }
  </style>
  