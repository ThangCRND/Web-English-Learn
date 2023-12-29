
<!-- Giao diện khi admin tạo các bài kiểm tra -->
<template>
  <Teleport to="body">
    <div
      v-show="modalActive"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
    >
      <div
        v-if="modalActive"
        class="p-4 bg-white self-start w-1/3 rounded-xl mt-2"
      >
        <button
          class="text-white bg-grayDark py-2 px-6 rounded-lg"
          @click="$emit('close-modal')"
        >
          Close
        </button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: true,
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
