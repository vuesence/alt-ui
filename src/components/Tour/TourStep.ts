import type { TourStepAction, TourStepData } from "./types";
import type { RouteLocationRaw } from "vue-router";

/**
 * Class representing a tour step
 */
export class TourStep {
  id: string;
  targetSelector: string;
  placement?: "top" | "bottom" | "left" | "right";
  title?: string;
  content: string[];
  beforeAction?: TourStepAction;
  afterAction?: TourStepAction;
  scrollToElement?: boolean;
  nextStep?: string | { id: string; condition: string };
  prevStep?: string;
  progress?: number;

  /**
   * Creates a tour step instance
   * @param step Step data
   * @param translate Function to translate strings
   */
  constructor(step: any, translate: (key: string) => string) {
    this.id = step.id;
    this.targetSelector = step.targetSelector;
    this.placement = step.placement;
    this.title = step.title ? translate(step.title) : "";

    const translatedContent = translate(step.content);
    this.content = Array.isArray(translatedContent)
      ? translatedContent
      : [translatedContent];

    this.scrollToElement = step.scrollToElement;

    // Convert actions to our implementation type
    if (step.beforeAction) {
      this.beforeAction = {
        type: step.beforeAction.type,
        ...(step.beforeAction.route && {
          route: step.beforeAction.route as any,
        }),
        ...(step.beforeAction.sidebar && {
          sidebar: step.beforeAction.sidebar,
        }),
        ...(step.beforeAction.customAction && {
          customAction: step.beforeAction.customAction,
        }),
      } as TourStepAction;
    }

    if (step.afterAction) {
      this.afterAction = {
        type: step.afterAction.type,
        ...(step.afterAction.route && { route: step.afterAction.route as any }),
        ...(step.afterAction.sidebar && { sidebar: step.afterAction.sidebar }),
        ...(step.afterAction.customAction && {
          customAction: step.afterAction.customAction,
        }),
      } as TourStepAction;
    }

    this.nextStep = step.nextStep;
    this.prevStep = step.prevStep;
    this.progress = step.progress;
  }
}
