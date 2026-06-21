<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { Router } from "vue-router";
import AltButton from "../base/AltButton.vue";
import TourStepContent from "./TourStepContent.vue";
import type { TourData } from "./types";
import { useTourKeyboardEvents } from "./useTourKeyboardEvents";
import { useTourManager } from "./useTourManager";

interface TourProps {
  tours?: Record<string, TourData>;
  initialTourId?: string;
  translate?: (key: string) => string;
  texts?: {
    next?: string;
    prev?: string;
    close?: string;
    endTour?: string;
  };
  router?: Router;
}

const props = withDefaults(defineProps<TourProps>(), {
  tours: () => ({}),
  initialTourId: "",
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const options = {
  storageKeyPrefix: "tour",
  translate: props.translate || ((key) => key),
  router: props.router,
};

const {
  targetElement,
  isTooltipVisible,
  currentTourStep,
  hasNextStep,
  hasPrevStep,
  stopTour,
  nextStep,
  prevStep,
  startTour,
} = useTourManager(props.tours, options);

watch(isTooltipVisible, (newValue) => {
  if (!newValue) {
    emit("close");
  }
});

const isChangingStep = ref(false);
const targetPosition = ref<DOMRect | null>(null);
const DEFAULT_OFFSET_PX = 18;

function updatePosition(): void {
  if (!targetElement.value) {
    targetPosition.value = null;
    return;
  }
  targetPosition.value = targetElement.value.getBoundingClientRect();
}

onMounted(() => {
  if (props.initialTourId) {
    startTour(props.initialTourId);
  }
  window.addEventListener("scroll", updatePosition, { passive: true });
  window.addEventListener("resize", updatePosition, { passive: true });
  updatePosition();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updatePosition);
  window.removeEventListener("resize", updatePosition);
});

watch(
  targetElement,
  () => {
    updatePosition();
  },
  { immediate: true },
);

function handleDismiss(): void {
  stopTour();
}

function handleNextStep(): void {
  isChangingStep.value = true;
  nextStep();
  window.setTimeout(() => {
    isChangingStep.value = false;
  }, 300);
}

function handlePrevStep(): void {
  isChangingStep.value = true;
  prevStep();
  window.setTimeout(() => {
    isChangingStep.value = false;
  }, 300);
}

const hasNoTargetElement = computed(() => {
  return (
    !targetElement.value ||
    !currentTourStep.value?.targetSelector ||
    currentTourStep.value.targetSelector === ""
  );
});

const effectivePlacement = computed(() => {
  return hasNoTargetElement.value
    ? "bottom"
    : currentTourStep.value?.placement || "bottom";
});

const triggerStyles = computed(() => {
  if (hasNoTargetElement.value) {
    return {
      top: "35%",
      left: "50%",
      width: "0px",
      height: "0px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
    };
  }

  if (!targetElement.value) {
    return {};
  }

  const rect = targetPosition.value || targetElement.value.getBoundingClientRect();
  return {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    backgroundColor: "transparent",
  };
});

const tooltipWrapperStyles = computed(() => {
  if (hasNoTargetElement.value) {
    return {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  }

  if (!targetElement.value) {
    return {};
  }

  const rect = targetPosition.value || targetElement.value.getBoundingClientRect();
  if (effectivePlacement.value === "top") {
    return {
      top: `${Math.max(12, rect.top - DEFAULT_OFFSET_PX)}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: "translate(-50%, -100%)",
    };
  }
  if (effectivePlacement.value === "left") {
    return {
      top: `${rect.top + rect.height / 2}px`,
      left: `${Math.max(12, rect.left - DEFAULT_OFFSET_PX)}px`,
      transform: "translate(-100%, -50%)",
    };
  }
  if (effectivePlacement.value === "right") {
    return {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.right + DEFAULT_OFFSET_PX}px`,
      transform: "translateY(-50%)",
    };
  }

  return {
    top: `${rect.bottom + DEFAULT_OFFSET_PX}px`,
    left: `${rect.left + rect.width / 2}px`,
    transform: "translateX(-50%)",
  };
});

useTourKeyboardEvents({
  isTooltipVisible,
  hasNextStep,
  hasPrevStep,
  onDismiss: handleDismiss,
  onNextStep: handleNextStep,
  onPrevStep: handlePrevStep,
});
</script>

<template>
  <div v-if="isTooltipVisible" class="tour-component">
    <div class="tour-end-button">
      <AltButton class="small secondary" @click="handleDismiss">
        {{ texts?.endTour || "End Tour" }}
      </AltButton>
    </div>

    <div class="tour-trigger" :style="triggerStyles" />

    <Teleport to="body">
      <div class="tour-tooltip-wrapper" :style="tooltipWrapperStyles">
        <div
          v-if="!hasNoTargetElement"
          class="arrow"
          :class="[`arrow-${effectivePlacement}`, { 'is-changing-step': isChangingStep }]"
        />

        <div class="tour-tooltip">
          <TourStepContent
            v-if="currentTourStep"
            :title="currentTourStep.title"
            :content="currentTourStep.content"
            :progress="currentTourStep.progress"
            :is-changing-step="isChangingStep"
            :has-prev-step="hasPrevStep"
            :has-next-step="hasNextStep"
            :next-text="texts?.next"
            :prev-text="texts?.prev"
            :close-text="texts?.close"
            @prev="handlePrevStep"
            @next="handleNextStep"
            @dismiss="handleDismiss"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.tour-component {
  position: fixed;
  inset: 0;
  z-index: var(--alt-z-tooltip);
  pointer-events: none;
}

.tour-end-button {
  position: fixed;
  top: var(--alt-space-4);
  left: 50%;
  transform: translateX(-50%);
  z-index: calc(var(--alt-z-tooltip) + 2);
  pointer-events: auto;
}

.tour-trigger {
  pointer-events: auto;
  position: fixed;
  border-radius: unset;
  border: none;
  z-index: calc(var(--alt-z-tooltip) + 1);
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 9999px;
  transition: all 0.3s ease-in-out;
}

.tour-tooltip-wrapper {
  position: fixed;
  z-index: calc(var(--alt-z-tooltip) + 2);
  pointer-events: auto;
}

.tour-tooltip {
  animation: fade-in 0.3s ease-in-out;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.arrow {
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  border-left: 1px solid var(--alt-c-border);
  border-top: 1px solid var(--alt-c-border);
  background: var(--alt-c-surface-1);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.arrow.is-changing-step {
  opacity: 0.5;
}

.arrow-bottom {
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.arrow-top {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%) rotate(225deg);
}

.arrow-left {
  right: 0;
  top: 50%;
  transform: translate(50%, -50%) rotate(135deg);
}

.arrow-right {
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
