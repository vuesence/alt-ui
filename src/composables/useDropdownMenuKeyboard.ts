import { nextTick } from "vue";

import type { AltDropdownMenuItem } from "../components/base/AltDropdownMenu.vue";
import { ROOT_PANEL_KEY, useDropdownMenuState } from "./useDropdownMenuState";
import type { useDropdownMenuElements } from "./useDropdownMenuElements";

type DropdownMenuState = ReturnType<typeof useDropdownMenuState>;
type DropdownMenuElements = ReturnType<typeof useDropdownMenuElements>;

export interface DropdownMenuKeyboardDeps {
  state: DropdownMenuState;
  elements: DropdownMenuElements;
  closeMenu: (restoreFocus?: boolean) => void;
  handleItemClick: (
    item: AltDropdownMenuItem,
    itemPath: string[],
    parentPath: string[],
  ) => void;
}

/**
 * Keyboard navigation for the root panel and recursive submenu panels.
 */
export function useDropdownMenuKeyboard(deps: DropdownMenuKeyboardDeps) {
  const { state, elements } = deps;

  function handlePanelKeydown(panelKey: string, event: KeyboardEvent): void {
    const panelButtons = elements.getPanelButtons(panelKey);
    if (panelButtons.length === 0) {
      return;
    }

    if (event.key === "Tab") {
      deps.closeMenu();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      deps.closeMenu(true);
      return;
    }

    const activeElement = document.activeElement as HTMLButtonElement | null;
    const currentIndex = activeElement ? panelButtons.indexOf(activeElement) : -1;
    const focusedPathKey = activeElement?.dataset.pathKey ?? "";
    const focusedItem = state.itemByPathKey.value.get(focusedPathKey) ?? null;
    const focusedPath = state.fromPathKey(focusedPathKey);
    const panelParentPath =
      panelKey === ROOT_PANEL_KEY ? [] : state.fromPathKey(panelKey);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex =
        currentIndex === -1 ? 0 : (currentIndex + 1) % panelButtons.length;
      elements.focusPanelButton(panelKey, nextIndex);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex =
        currentIndex === -1
          ? panelButtons.length - 1
          : (currentIndex - 1 + panelButtons.length) % panelButtons.length;
      elements.focusPanelButton(panelKey, nextIndex);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      elements.focusFirstPanelButton(panelKey);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      elements.focusLastPanelButton(panelKey);
      return;
    }

    if (event.key === "ArrowRight" && focusedItem && focusedPath.length > 0) {
      if (!state.hasNestedItems(focusedItem)) {
        return;
      }

      event.preventDefault();
      state.openSubmenuForPath(focusedPath);
      nextTick(() => {
        elements.focusFirstPanelButton(state.toPathKey(focusedPath));
      });
      return;
    }

    if (event.key === "ArrowLeft") {
      if (panelKey === ROOT_PANEL_KEY) {
        if (state.openPath.value.length === 0) {
          return;
        }

        event.preventDefault();
        state.openPath.value = state.openPath.value.slice(0, -1);
        return;
      }

      event.preventDefault();
      const parentPath = state.fromPathKey(panelKey);
      state.openPath.value = state.normalizeOpenPath(parentPath.slice(0, -1));
      nextTick(() => {
        elements.triggerRefs.get(panelKey)?.focus();
      });
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && focusedItem) {
      event.preventDefault();
      deps.handleItemClick(focusedItem, focusedPath, panelParentPath);
    }
  }

  return { handlePanelKeydown };
}
