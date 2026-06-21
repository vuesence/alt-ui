/**
 * Tour interfaces
 */

import type { RouteLocationRaw } from "vue-router";

/**
 * Action performed on a tour step
 */
export interface TourStepAction {
  type: "route" | "sidebar" | "scroll" | "custom";
  route?: RouteLocationRaw;
  sidebar?: {
    open?: boolean;
    id?: string;
  };
  customAction?: string;
}

/**
 * Tour step data
 */
export interface TourStepData {
  id: string;
  targetSelector: string;
  placement?: "top" | "bottom" | "left" | "right";
  title?: string;
  content: string | string[];
  beforeAction?: TourStepAction;
  afterAction?: TourStepAction;
  scrollToElement?: boolean;
  nextStep?: string | { id: string; condition: string };
  prevStep?: string;
  progress?: number;
}

/**
 * Tour data
 */
export interface TourData {
  id: string;
  name: string;
  description?: string;
  steps: TourStepData[];
  state?: Record<string, any>;
}

/**
 * Information about current tour state
 */
export interface TourInfo {
  activeTour: any;
  currentStep: any;
  currentStepIndex: any;
  isActive: any;
  totalSteps: number;
} 