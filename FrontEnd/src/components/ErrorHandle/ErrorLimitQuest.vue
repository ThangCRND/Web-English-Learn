<template>
  <!-- Giao diện lỗi thông báo khi tạo số lượng câu hỏi giới hạn so với thiết lập ban đầu -->
  <Teleport to="body">
    <!-- Dịch chuyển component ngang cấp với body -->
    <Transition name="modal-outer">
      <div
        v-show="errorModalActive"
        class="fixed inset-1 flex items-center justify-center bg-black bg-opacity-30"
      >
        <div
          v-if="errorModalActive"
          class="p-4 bg-white self-start w-2/3 md:w-1/3 rounded-xl mt-12"
        >
          <slot></slot>

          <div class="flex justify-center mt-4">
            <button
              class="text-white bg-grayDark flex justify-center py-2 px-6 rounded-lg"
              @click="$emit('close-modal')"
            >
              Close
            </button>
          </div>
         
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(["close-modal"]); //Từ component con gửi tín hiệu đến component cha
defineProps({
  errorModalActive: {
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
