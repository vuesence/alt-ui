import { computed, ref, watch, type Ref } from "vue";
import { Tour } from "./Tour";
import { findElement } from "./tour-utils";
import type { TourData } from "./types";

/**
 * Options for the tour manager
 */
interface TourManagerOptions {
  /** Optional storage key prefix to prevent collisions */
  storageKeyPrefix?: string;
  /** Callback to update user data when a tour is completed */
  onTourComplete?: (tourId: string) => void;
  /** Function to translate strings */
  translate?: (key: string) => string;
  /** Vue Router instance */
  router?: any;
  /** Reference to a boolean that controls tour visibility */
  isTourVisible?: Ref<boolean>;
}

/**
 * Composable for managing guided tours
 */
export function useTourManager(
  tours: Record<string, TourData> = {},
  options: TourManagerOptions = {}
) {
  const {
    storageKeyPrefix = 'app',
    onTourComplete,
    translate = (key) => key,
    router,
    isTourVisible = ref(false)
  } = options;

  // Ensure the router is properly passed to the Tour instance
  const tourInstance = new Tour(tours, router, translate);
  const targetElement = ref<HTMLElement | null>(null);
  const isTooltipVisible = ref(false);

  // Use localStorage to track completed tours
  const getCompletedTours = (): string[] => {
    try {
      const stored = localStorage.getItem(`${storageKeyPrefix}-completed-tours`);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading completed tours from localStorage", e);
      return [];
    }
  };

  const saveCompletedTour = (tourId: string) => {
    try {
      const completedTours = getCompletedTours();
      if (!completedTours.includes(tourId)) {
        completedTours.push(tourId);
        localStorage.setItem(
          `${storageKeyPrefix}-completed-tours`, 
          JSON.stringify(completedTours)
        );
      }
    } catch (e) {
      console.error("Error saving completed tour to localStorage", e);
    }
  };

  // Get current tour info directly
  const tourInfo = tourInstance.getTourInfo();

  // Watch for changes in the active state of the tour
  watch(
    () => tourInfo.isActive.value,
    (newValue) => {
      // When tour becomes active, make sure tooltip is visible
      if (newValue) {
        isTooltipVisible.value = true;
        // Make sure to update the target element
        setTimeout(() => {
          updateTargetElement();
        }, 50);
      } else {
        isTooltipVisible.value = false;
      }
    },
  );

  // Watch for changes in the current step
  watch(
    () => tourInfo.currentStep.value,
    (newValue) => {
      if (newValue) {
        // Update target element when step changes
        setTimeout(() => {
          updateTargetElement();
        }, 50);
      }
    },
  );

  // Computed properties for the tooltip component
  const currentTourStep = computed(() => {
    if (!tourInfo.currentStep.value) {
      return null;
    }

    // Format the step for display
    const currentStep = tourInfo.currentStep.value;
    const currentIndex = tourInfo.currentStepIndex.value;
    const totalSteps = tourInfo.totalSteps;

    return {
      id: currentStep.id,
      targetSelector: currentStep.targetSelector,
      placement: currentStep.placement || "",
      title: currentStep.title,
      content: currentStep.content,
      progress:
        currentStep.progress !== undefined
          ? currentStep.progress
          : Math.round(((currentIndex + 1) / totalSteps) * 100),
    };
  });

  // Find and set the target element
  function updateTargetElement() {
    if (!currentTourStep.value) {
      targetElement.value = null;
      return;
    }

    const selector = currentTourStep.value.targetSelector;

    // If selector is empty, we explicitly set targetElement to null
    // This will trigger the centered tooltip mode
    if (!selector || selector.trim() === "") {
      targetElement.value = null;
      return;
    }

    targetElement.value = findElement(selector);
  }

  // Start a tour with proper validation
  function startTour(tourId: string) {
    // Always allow starting the tour regardless of completion status
    const success = tourInstance.startTour(tourId);

    if (success) {
      // Explicitly setting tooltip visibility
      isTooltipVisible.value = true;
      isTourVisible.value = true;
    }
    return success;
  }

  // Stop the current tour
  function stopTour() {
    if (tourInfo.activeTour.value) {
      const tourId = tourInfo.activeTour.value.id;

      // Mark tour as completed - just for tracking
      saveCompletedTour(tourId);

      // Call onTourComplete callback if provided
      if (onTourComplete) {
        onTourComplete(tourId);
      }

      // Stop the tour
      tourInstance.stopTour();
      isTooltipVisible.value = false;
      targetElement.value = null;
    }
    // Don't set isTourVisible to false - let the parent component control it
  }

  // Navigate to next step
  function nextStep() {
    tourInstance.nextStep();
  }

  // Navigate to previous step
  function prevStep() {
    tourInstance.prevStep();
  }

  // Check if tour has a next step
  const hasNextStep = computed(() => {
    return !!tourInfo.currentStep.value?.nextStep;
  });

  // Check if tour has a previous step
  const hasPrevStep = computed(() => {
    return (
      !!tourInfo.currentStep.value?.prevStep ||
      tourInfo.currentStepIndex.value > 0
    );
  });

  return {
    // State
    targetElement,
    isTooltipVisible,
    currentTourStep,
    tourInfo,
    hasNextStep,
    hasPrevStep,

    // Actions
    startTour,
    stopTour,
    nextStep,
    prevStep,
  };
} 