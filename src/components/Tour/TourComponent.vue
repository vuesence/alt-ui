<script setup lang="ts">
import { HoverCard } from "@ark-ui/vue/hover-card";
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type CSSProperties,
} from "vue";
import TourStepContent from "./TourStepContent.vue";
import { useTourKeyboardEvents } from "./useTourKeyboardEvents";
import { useTourManager } from "./useTourManager";
import type { TourData } from "./types";
import type { Router } from "vue-router";
import AltButton from "../base/AltButton.vue";

/**
 * Props for TourComponent
 */
interface TourProps {
  /** Tours configuration */
  tours?: Record<string, TourData>;
  /** Initial tour to start (optional) */
  initialTourId?: string;
  /** Function to translate strings */
  translate?: (key: string) => string;
  /** Button texts */
  texts?: {
    next?: string;
    prev?: string;
    close?: string;
    endTour?: string;
  };
  /** Router instance */
  router?: Router;
}

const props = withDefaults(defineProps<TourProps>(), {
  tours: () => ({}),
  initialTourId: '',
});

// Define emits
const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Tour manager options
const options = {
  storageKeyPrefix: 'tour',
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

// Emit close event when tour is closed
watch(isTooltipVisible, (newValue) => {
  if (!newValue) {
    emit('close');
  }
});

// Animation state tracking
const isChangingStep = ref(false);
// Store the target element position
const targetPosition = ref<DOMRect | null>(null);

// Update position on scroll and resize
const updatePosition = () => {
  if (targetElement.value) {
    targetPosition.value = targetElement.value.getBoundingClientRect();
  }
};

// Start initial tour if specified
onMounted(() => {
  if (props.initialTourId) {
    startTour(props.initialTourId);
  }
});

// Add and clean up scroll event listener
onMounted(() => {
  window.addEventListener("scroll", updatePosition, { passive: true });
  window.addEventListener("resize", updatePosition, { passive: true });
  // Initial position update
  updatePosition();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updatePosition);
  window.removeEventListener("resize", updatePosition);
});

// Watch for changes in targetElement and update position
watch(
  targetElement,
  () => {
    updatePosition();
  },
  { immediate: true },
);

// Handle dismissal
const handleDismiss = () => {
  stopTour();
};

// Handle step transitions
const handleNextStep = () => {
  isChangingStep.value = true;
  nextStep();
  setTimeout(() => {
    isChangingStep.value = false;
  }, 300);
};

const handlePrevStep = () => {
  isChangingStep.value = true;
  prevStep();
  setTimeout(() => {
    isChangingStep.value = false;
  }, 300);
};

// Check if the tooltip should use a virtual center point
const hasNoTargetElement = computed(() => {
  return (
    !targetElement.value ||
    !currentTourStep.value?.targetSelector ||
    currentTourStep.value.targetSelector === ""
  );
});

// Trigger style - critical for HoverCard positioning
const triggerStyles = computed<CSSProperties>(() => {
  if (hasNoTargetElement.value) {
    // For centered mode, create a trigger in the upper center of the screen
    return {
      top: "35%",
      left: "50%",
      // width: "40px",
      // height: "40px",
      width: "0px",
      height: "0px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
    };
  }

  if (!targetElement.value) {
    return {};
  }

  // Use our reactive position that updates on scroll
  const rect = targetPosition.value || targetElement.value.getBoundingClientRect();

  // For targeted elements, create a trigger that matches the element
  return {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    backgroundColor: "transparent",
  };
});

// Tooltip positioning configuration
const tooltipPositioning = computed(() => {
  return {
    placement: (hasNoTargetElement.value
      ? "bottom"
      : currentTourStep.value?.placement || "bottom") as
      | "bottom"
      | "top"
      | "left"
      | "right",
    gutter: 20,
    strategy: "fixed" as const,
    offset: hasNoTargetElement.value
      ? { mainAxis: 0, crossAxis: 0 }
      : undefined,
  };
});

// Add keyboard event handling
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
    <!-- End Tour button in top right corner -->
    <div class="tour-end-button">
      <AltButton class="small secondary" @click="handleDismiss">
        {{ texts?.endTour || 'End Tour' }}
      </AltButton>
    </div>

    <HoverCard.Root
      :open="isTooltipVisible"
      :positioning="tooltipPositioning"
      :open-delay="300"
      :close-delay="500"
    >
      <!-- The trigger is the key element for positioning -->
      <HoverCard.Trigger as="div" class="tour-trigger" :style="triggerStyles" />

      <!-- Content is teleported to body to avoid clipping issues -->
      <Teleport to="body">
        <HoverCard.Positioner style="z-index: var(--alt-z-tooltip)">
          <HoverCard.Content class="tour-tooltip">
            <!-- Only show arrow when not using the centered mode -->
            <template v-if="!hasNoTargetElement">
              <HoverCard.Arrow
                class="arrow"
                :class="{ 'is-changing-step': isChangingStep }"
              >
                <HoverCard.ArrowTip class="arrow-tip" />
              </HoverCard.Arrow>
            </template>

            <!-- The actual tour step content -->
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
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Teleport>
    </HoverCard.Root>
  </div>
</template>

<style scoped>
.tour-component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 0px 9999px;
  transition: all 0.3s ease-in-out;
}

.tour-tooltip {
  pointer-events: auto;
  animation: fade-in 0.3s ease-in-out;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.arrow {
  --arrow-size: 0.75rem;
  --arrow-background: var(--alt-c-surface-1);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.arrow.is-changing-step {
  opacity: 0.5;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.arrow-tip {
  border-top-width: 1px;
  border-left-width: 1px;
  border-color: var(--alt-c-border);
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
