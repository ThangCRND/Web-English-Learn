<!-- Giao diện Listening -->
<template>
    <Teleport to="body">
      <!-- Dịch chuyển component ngang cấp với body -->
      <Transition name="modal-outer">
        <div
          v-show="modalListenActive"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
        >
          <Transition name="modal-inner">
            <div
              v-if="modalListenActive"
              class="p-4 bg-white self-start w-1/2 rounded-xl mt-2"
            >
            <div class="flex flex-row-reverse">
                <button
                class="text-white bg-grayDark py-2 px-6 rounded-lg"
                @click="$emit('close-modal')"
              >
                Close
              </button>
            </div>
              <slot></slot>
  
              
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup>
  defineEmits(["close-modal"]); //Từ component con gửi tín hiệu đến component cha
  defineProps({
    modalListenActive: {
      type: Boolean,
      default: false,
    },
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
  