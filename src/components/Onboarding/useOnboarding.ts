import { computed, ref, watch } from "vue";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface OnboardingTooltipConfig {
  id: string;
  targetElementClass: string;
  placement?: TooltipPlacement;
  condition?: () => boolean;
  title?: string;
  content?: string;
}

type OnboardingEmit = {
  (e: 'dismissed'): void;
};

// Centralized onboarding state management
export function useOnboarding(emit: OnboardingEmit) {
  const isOnboardingEnabled = ref(false);
  const currentTargetElement = ref<HTMLElement | null>(null);
  const currentTooltip = ref<OnboardingTooltipConfig | null>(null);

  // Configurable tooltip display method
  function displayTooltip(tooltip: OnboardingTooltipConfig) {
    const targetElement = document.querySelector(
      tooltip.targetElementClass,
    ) as HTMLElement;

    if (!targetElement) {
      console.warn(`Target element not found: ${tooltip.targetElementClass}`);
      return;
    }

    currentTooltip.value = tooltip;
    currentTargetElement.value = targetElement;
    isOnboardingEnabled.value = true;
  }

  // Improved tooltip dismissal
  function dismissCurrentTooltip() {
    if (currentTooltip.value) {
      isOnboardingEnabled.value = false;
      currentTooltip.value = null;
      currentTargetElement.value = null;
      emit("dismissed");
    }
  }

  return {
    displayTooltip,
    dismissCurrentTooltip,
    currentTooltip,
    currentTargetElement,
    isOnboardingEnabled,
  };
} 