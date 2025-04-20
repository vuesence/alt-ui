import { onMounted, onUnmounted, type ComputedRef, type Ref } from "vue";

/**
 * Options for tour keyboard event handling
 */
interface TourKeyboardEventOptions {
  /** Whether the tour tooltip is visible */
  isTooltipVisible: Ref<boolean> | ComputedRef<boolean>;
  /** Whether there is a next step available */
  hasNextStep: Ref<boolean> | ComputedRef<boolean>;
  /** Whether there is a previous step available */
  hasPrevStep: Ref<boolean> | ComputedRef<boolean>;
  /** Handler for dismissing the tour */
  onDismiss: () => void;
  /** Handler for moving to the next step */
  onNextStep: () => void;
  /** Handler for moving to the previous step */
  onPrevStep: () => void;
}

/**
 * Composable for handling keyboard events during the tour
 */
export function useTourKeyboardEvents({
  isTooltipVisible,
  hasNextStep,
  hasPrevStep,
  onDismiss,
  onNextStep,
  onPrevStep,
}: TourKeyboardEventOptions) {
  const handleKeydown = (event: KeyboardEvent) => {
    if (!isTooltipVisible.value) {
      return;
    }

    switch (event.key) {
      case "Escape":
        onDismiss();
        break;
      case "ArrowRight":
      case "Enter":
      case " ":
        if (hasNextStep.value) {
          onNextStep();
        }
        break;
      case "ArrowLeft":
        if (hasPrevStep.value) {
          onPrevStep();
        }
        break;
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
} 