<script setup lang="ts">
import { BaseButton } from "../../components/base";

/**
 * Props for TourStepContent component
 */
interface TourStepContentProps {
  /** Title of the tour step */
  title?: string;
  /** Content text array for the step */
  content: string[];
  /** Progress percentage (0-100) */
  progress: number;
  /** Whether there is a previous step available */
  hasPrevStep: boolean;
  /** Whether there is a next step available */
  hasNextStep: boolean;
  /** Whether the step is currently transitioning */
  isChangingStep: boolean;
  /** Text for the next button */
  nextText?: string;
  /** Text for the previous button */
  prevText?: string;
  /** Text for the close button */
  closeText?: string;
}

const props = withDefaults(defineProps<TourStepContentProps>(), {
  nextText: 'Next',
  prevText: 'Previous',
  closeText: 'Close (Esc)'
});

// Define emitted events
const emit = defineEmits<{
  (e: 'prev'): void;
  (e: 'next'): void;
  (e: 'dismiss'): void;
}>();
</script>

<template>
  <div class="tour-step-content" :class="{ 'is-changing': isChangingStep }">
    <!-- Progress bar -->
    <div class="progress-bar">
      <div
        class="progress-bar__filled"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <!-- Title -->
    <h3 v-if="title">
      {{ title }}
    </h3>

    <!-- Content text -->
    <p v-for="(item, index) in content" :key="index" class="description">{{ item }}</p>

    <!-- Navigation buttons -->
    <div class="actions">
      <BaseButton
        v-if="hasPrevStep"
        class="small secondary"
        @click="emit('prev')"
      >
        {{ prevText }}
      </BaseButton>

      <BaseButton class="small text" @click="emit('dismiss')">
        {{ closeText }}
      </BaseButton>

      <BaseButton
        v-if="hasNextStep"
        class="small primary"
        @click="emit('next')"
      >
        {{ nextText }}
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
/* Main tooltip content styling */
.tour-step-content {
  /* Base styles */
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-md);
  box-shadow: var(--alt-shadow-4);
  background: var(--alt-c-surface-1);
  position: relative;
  padding: var(--alt-space-3) var(--alt-space-5);
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-2);
  max-width: min(460px, 90vw);
  min-width: 300px;
  pointer-events: auto;

  /* Transition properties */
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

/* Step transition handling */
.tour-step-content.is-changing {
  opacity: 0.5;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

/* Typography */
h3 {
  font-weight: var(--alt-font-weight-bold);
  font-size: var(--alt-font-size-2);
  margin: var(--alt-space-1) 0;
}

.description {
  font-size: var(--alt-font-size-1);
  line-height: var(--alt-line-height-2);
  color: var(--alt-c-text-2);
}

/* Progress indicator */
.progress-bar {
  width: 100%;
  height: 4px;
  background-color: var(--alt-c-surface-3);
  border-radius: var(--alt-radius-full);
  overflow: hidden;
  margin-bottom: var(--alt-space-3);
}

.progress-bar__filled {
  height: 100%;
  background-color: var(--alt-c-brand-1-500);
  transition: width 0.6s var(--alt-ease-in-out);
}

/* Action buttons */
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: var(--alt-space-2);
  gap: var(--alt-space-2);
}
</style> 