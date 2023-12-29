<template>
  <Teleport to="body">
    <!-- Dịch chuyển component ngang cấp với body -->
    <Transition name="modal-outer">
      <div
        v-show="timeupModalActive"
        class="fixed inset-1 flex items-center justify-center bg-black bg-opacity-30"
      >
        <div
          v-if="timeupModalActive"
          class="p-4 bg-white self-start w-2/3 md:w-1/3 rounded-xl mt-12"
        >
          <slot></slot>
          
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  timeupModalActive: {
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
