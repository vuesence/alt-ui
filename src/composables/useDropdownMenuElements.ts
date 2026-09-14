import { ref } from "vue";

import { ROOT_PANEL_KEY } from "./useDropdownMenuState";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Tracks the DOM registries (root surface, submenu panels and item trigger
 * buttons) and the focus helpers that operate on them.
 */
export function useDropdownMenuElements() {
  const menuSurfaceRef = ref<HTMLElement | null>(null);
  const panelRefs = new Map<string, HTMLElement>();
  const triggerRefs = new Map<string, HTMLButtonElement>();

  function setMenuSurfaceRef(element: unknown): void {
    menuSurfaceRef.value = element instanceof HTMLElement ? element : null;
  }

  function setTriggerRef(pathKey: string, element: unknown): void {
    if (!element) {
      triggerRefs.delete(pathKey);
      return;
    }

    if (element instanceof HTMLButtonElement) {
      triggerRefs.set(pathKey, element);
    }
  }

  function setPanelRef(panelKey: string, element: unknown): void {
    if (!element) {
      panelRefs.delete(panelKey);
      return;
    }

    if (element instanceof HTMLElement) {
      panelRefs.set(panelKey, element);
    }
  }

  function getPanelElement(panelKey: string): HTMLElement | null {
    if (panelKey === ROOT_PANEL_KEY) {
      return menuSurfaceRef.value;
    }

    return panelRefs.get(panelKey) ?? null;
  }

  function getPanelButtons(panelKey: string): HTMLButtonElement[] {
    const panel = getPanelElement(panelKey);
    if (!panel) {
      return [];
    }

    return Array.from(
      panel.querySelectorAll<HTMLButtonElement>(
        'button[data-menu-item="true"]:not(:disabled)',
      ),
    );
  }

  function focusPanelButton(panelKey: string, index: number): void {
    const buttons = getPanelButtons(panelKey);
    if (buttons.length === 0) {
      return;
    }

    const boundedIndex = clamp(index, 0, buttons.length - 1);
    buttons[boundedIndex]?.focus();
  }

  function focusFirstPanelButton(panelKey: string): void {
    focusPanelButton(panelKey, 0);
  }

  function focusLastPanelButton(panelKey: string): void {
    const buttons = getPanelButtons(panelKey);
    focusPanelButton(panelKey, buttons.length - 1);
  }

  return {
    menuSurfaceRef,
    panelRefs,
    triggerRefs,
    setMenuSurfaceRef,
    setTriggerRef,
    setPanelRef,
    getPanelElement,
    getPanelButtons,
    focusPanelButton,
    focusFirstPanelButton,
    focusLastPanelButton,
  };
}
