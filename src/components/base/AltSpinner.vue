<script setup lang="ts">
defineProps<{
  size?: string;
}>();
</script>

<template>
  <div class="spinner" :style="{ width: size, height: size }">
    <svg viewBox="0 0 50 50">
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
  </div>
</template>

<style scoped>
.spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
}

.spinner svg {
  animation: rotate 2s linear infinite;
  width: 100%;
  height: 100%;
}

.spinner .path {
  stroke: currentColor;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
