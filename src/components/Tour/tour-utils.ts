import { nextTick, type Ref } from "vue";
import type { TourStep } from "./TourStep";

/**
 * Scroll to the target element if it's not fully visible in the viewport
 */
export async function scrollToElement(selector: string): Promise<boolean> {
  // Wait for the DOM to update
  await nextTick();

  const element = findElement(selector);
  if (!element) {
    return false;
  }

  // Check if the element is fully visible in the viewport
  const rect = element.getBoundingClientRect();
  const isFullyVisible =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth;

  // If not fully visible, scroll to it
  if (!isFullyVisible) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return true;
}

/**
 * Find an element by its selector or data-tour attribute
 */
export function findElement(selector: string): HTMLElement | null {
  let element = null;
  if (selector.startsWith("#") || selector.startsWith(".")) {
    element = document.querySelector(selector) as HTMLElement;
  } else {
    element = document.querySelector(
      `[data-tour="${selector}"]`,
    ) as HTMLElement;
  }
  return element;
}

/**
 * Update the position of an element reference based on its selector
 */
export function updateElementRef(
  selector: string,
  elementRef: Ref<HTMLElement | null>,
): boolean {
  const element = findElement(selector);
  if (element) {
    elementRef.value = element;
    return true;
  }
  return false;
}

/**
 * Evaluate a condition based on tour state
 */
export function evaluateCondition(
  condition: string,
  state: Record<string, any>,
): boolean {
  try {
    // Create a safe evaluation context with only the state object
    // This is safer than using eval directly on the condition
    const func = new Function("state", `return ${condition}`);
    return func(state);
  } catch {
    return false;
  }
}

/**
 * Calculate element position for highlighting
 */
export function calculateElementPosition(element: HTMLElement): {
  top: number;
  left: number;
  width: number;
  height: number;
} {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Add a highlight effect to a target element
 */
export function highlightElement(
  element: HTMLElement,
  zIndex: number = 1000
): void {
  if (!element) return;

  // Add a highlight class or style
  element.style.position = 'relative';
  element.style.zIndex = zIndex.toString();
  element.classList.add('tour-highlight');
}

/**
 * Remove a highlight effect from a target element
 */
export function removeHighlight(element: HTMLElement): void {
  if (!element) return;

  // Remove the highlight class or style
  element.style.zIndex = '';
  element.classList.remove('tour-highlight');
} 