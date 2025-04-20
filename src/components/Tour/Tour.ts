import { reactive, ref } from "vue";
import { evaluateCondition, scrollToElement } from "./tour-utils";
import { TourStep } from "./TourStep";
import type { TourData, TourStepAction } from "./types";

/**
 * Class managing tour functionality
 */
export class Tour {
  // Reactive state
  private activeTour = ref<TourData | null>(null);
  private currentStep = ref<TourStep | null>(null);
  private currentStepIndex = ref<number>(-1);
  private tourState = reactive<Record<string, any>>({});
  private isActive = ref(false);
  private router: any;
  private translate: (key: string) => string;

  /**
   * Creates a tour instance
   * @param tourCollection Collection of available tours
   * @param router Vue Router instance for navigation
   * @param translate Function to translate strings
   */
  constructor(
    private tourCollection: Record<string, TourData> = {},
    router?: any,
    translate?: (key: string) => string
  ) {
    this.router = router;
    this.translate = translate || ((key) => key);
  }

  /**
   * Starts a tour by ID
   * @param tourId Tour ID
   * @returns true if tour started successfully, false otherwise
   */
  startTour(tourId: string): boolean {
    const tour = this.tourCollection[tourId];
    if (!tour || tour.steps.length === 0) {
      return false;
    }

    this.activeTour.value = tour;
    this.tourState = { ...(tour.state || {}) };
    this.isActive.value = true;

    // Start at the first step
    this.goToStep(0);
    return true;
  }

  /**
   * Stops the current tour
   */
  stopTour(): void {
    this.activeTour.value = null;
    this.currentStep.value = null;
    this.currentStepIndex.value = -1;
    this.isActive.value = false;
  }

  /**
   * Goes to a specific step by index
   * @param index Step index
   */
  goToStep(index: number): void {
    if (
      !this.activeTour.value ||
      index < 0 ||
      index >= this.activeTour.value.steps.length
    ) {
      return;
    }

    const stepData = this.activeTour.value.steps[index];
    const step = new TourStep(stepData, this.translate);

    // Execute before action if present
    if (step.beforeAction) {
      this.executeAction(step.beforeAction);
    }

    // Adjust timing for route changes
    if (step.beforeAction && step.beforeAction.type === "route") {
      // Give more time for route to complete before showing the tour step
      setTimeout(async () => {
        if (step.scrollToElement) {
          await scrollToElement(step.targetSelector);
        }
        this.currentStep.value = step;
        this.currentStepIndex.value = index;
      }, 1000);
    } else if (step.scrollToElement) {
      scrollToElement(step.targetSelector).then(() => {
        this.currentStep.value = step;
        this.currentStepIndex.value = index;
      });
    } else {
      this.currentStep.value = step;
      this.currentStepIndex.value = index;
    }
  }

  /**
   * Goes to the next step
   */
  nextStep(): void {
    if (!this.currentStep.value || !this.activeTour.value) {
      return;
    }

    // Execute after action if present
    if (this.currentStep.value.afterAction) {
      this.executeAction(this.currentStep.value.afterAction);
    }

    // Handle dynamic next step
    const nextStep = this.currentStep.value.nextStep;
    if (!nextStep) {
      this.stopTour();
      return;
    }

    if (typeof nextStep === "string") {
      // Simple next step by ID
      const nextIndex = this.activeTour.value.steps.findIndex(
        (step: any) => step.id === nextStep,
      );
      if (nextIndex !== -1) {
        this.goToStep(nextIndex);
      } else {
        this.stopTour();
      }
    } else {
      // Conditional next step
      const condition = nextStep.condition;

      // Evaluate condition using our utility function
      const result = evaluateCondition(condition, this.tourState);
      const targetId = result ? nextStep.id : "default"; // Fallback to default

      const nextIndex = this.activeTour.value.steps.findIndex(
        (step: any) => step.id === targetId,
      );
      if (nextIndex !== -1) {
        this.goToStep(nextIndex);
      } else {
        this.stopTour();
      }
    }
  }

  /**
   * Goes to the previous step
   */
  prevStep(): void {
    if (!this.currentStep.value || !this.activeTour.value) {
      return;
    }

    const prevStepId = this.currentStep.value.prevStep;
    if (!prevStepId) {
      // If no explicit previous step, go to the previous index
      if (this.currentStepIndex.value > 0) {
        this.goToStep(this.currentStepIndex.value - 1);
      }
      return;
    }

    const prevIndex = this.activeTour.value.steps.findIndex(
      (step: any) => step.id === prevStepId,
    );
    if (prevIndex !== -1) {
      this.goToStep(prevIndex);
    }
  }

  /**
   * Executes a step action
   * @param action Action to execute
   */
  executeAction(action: TourStepAction): void {
    switch (action.type) {
      case "route":
        if (action.route && this.router) {
          this.router.push(action.route);
        }
        break;

      case "sidebar":
        if (action.sidebar) {
          // Trigger a custom event for sidebar actions
          const event = new CustomEvent("toggle-sidebar", {
            detail: action.sidebar,
          });
          window.dispatchEvent(event);
        }
        break;
        
      case "scroll":
        if (this.currentStep.value) {
          scrollToElement(this.currentStep.value.targetSelector);
        }
        break;

      case "custom":
        if (
          action.customAction === "scrollToElement" &&
          this.currentStep.value
        ) {
          scrollToElement(this.currentStep.value.targetSelector);
        }
        break;
    }
  }

  /**
   * Returns information about the current tour state
   */
  getTourInfo() {
    return {
      activeTour: this.activeTour,
      currentStep: this.currentStep,
      currentStepIndex: this.currentStepIndex,
      isActive: this.isActive,
      totalSteps: this.activeTour.value?.steps.length || 0,
    };
  }

  /**
   * Updates tour state
   * @param key State key
   * @param value State value
   */
  updateState(key: string, value: any): void {
    this.tourState[key] = value;
  }

  /**
   * Finds a step by ID
   * @param stepId Step ID
   * @returns Step instance or null if not found
   */
  getStepById(stepId: string): TourStep | null {
    if (!this.activeTour.value) {
      return null;
    }

    const step = this.activeTour.value.steps.find((s: any) => s.id === stepId);
    return step ? new TourStep(step, this.translate) : null;
  }
} 