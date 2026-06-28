const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "iframe",
  "object",
  "embed",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function isVisible(element: HTMLElement): boolean {
  if (element.getAttribute("aria-hidden") === "true") {
    return false;
  }

  const style = getComputedStyle(element);
  return style.visibility !== "hidden" && style.display !== "none";
}

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((element) => {
    if (element.hasAttribute("disabled") || element.tabIndex < 0) {
      return false;
    }

    return isVisible(element);
  });
}

export interface FocusTrap {
  activate(): void;
  deactivate(returnFocus?: boolean): void;
  focusFirst(): void;
}

export function createFocusTrap(container: HTMLElement): FocusTrap {
  let previouslyFocused: HTMLElement | null = null;
  let isActive = false;

  function handleKeydown(event: KeyboardEvent) {
    if (!isActive || event.key !== "Tab") {
      return;
    }

    const focusable = getFocusableElements(container);
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey) {
      if (activeElement === first || !container.contains(activeElement)) {
        event.preventDefault();
        last.focus();
      }
      return;
    }

    if (activeElement === last || !container.contains(activeElement)) {
      event.preventDefault();
      first.focus();
    }
  }

  function activate() {
    if (isActive) {
      return;
    }

    previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    isActive = true;
    document.addEventListener("keydown", handleKeydown, true);
  }

  function deactivate(returnFocus = true) {
    if (!isActive) {
      return;
    }

    isActive = false;
    document.removeEventListener("keydown", handleKeydown, true);

    if (returnFocus && previouslyFocused?.isConnected) {
      previouslyFocused.focus();
    }

    previouslyFocused = null;
  }

  function focusFirst() {
    const focusable = getFocusableElements(container);
    if (focusable.length > 0) {
      focusable[0].focus();
      return;
    }

    if (container.tabIndex < 0) {
      container.tabIndex = -1;
    }

    container.focus();
  }

  return {
    activate,
    deactivate,
    focusFirst,
  };
}
