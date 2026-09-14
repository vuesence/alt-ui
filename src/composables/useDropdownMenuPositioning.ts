import {
  nextTick,
  onBeforeUnmount,
  ref,
  watch,
  type ComputedRef,
  type Ref,
} from "vue";

import type { useDropdownMenuElements } from "./useDropdownMenuElements";
import type { SubmenuPanelDescriptor } from "./useDropdownMenuState";

interface SubmenuPanelPosition {
  top: number;
  left: number;
  transformOrigin: string;
}

export interface DropdownMenuPositioningDeps {
  isOpen: Ref<boolean>;
  openPanelDescriptors: ComputedRef<SubmenuPanelDescriptor[]>;
  elements: ReturnType<typeof useDropdownMenuElements>;
  viewportPadding: () => number;
  submenuOffset: () => number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Fixed-position tracking for recursive submenu panels. Keeps every open
 * panel edge-safe with flip/clamp logic and repositions on viewport changes.
 */
export function useDropdownMenuPositioning(deps: DropdownMenuPositioningDeps) {
  const panelPositions = ref<Record<string, SubmenuPanelPosition>>({});
  const panelAnimationFrame = ref<number | null>(null);

  function cancelPanelPositionFrame(): void {
    if (panelAnimationFrame.value === null) {
      return;
    }

    cancelAnimationFrame(panelAnimationFrame.value);
    panelAnimationFrame.value = null;
  }

  function updatePanelPosition(panelKey: string): void {
    const trigger = deps.elements.triggerRefs.get(panelKey);
    const panel = deps.elements.panelRefs.get(panelKey);
    if (!trigger || !panel) {
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = Math.max(0, deps.viewportPadding());
    const offset = Math.max(4, deps.submenuOffset());
    const triggerRect = trigger.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();

    let left = triggerRect.right + offset;
    let top = triggerRect.top;
    let horizontalOrigin = "left";

    // Prefer opening submenu to the right, but flip to the left if it would
    // overflow viewport. Then clamp both axes for edge-safe positioning.
    if (left + panelRect.width > viewportWidth - padding) {
      left = triggerRect.left - panelRect.width - offset;
      horizontalOrigin = "right";
    }

    left = clamp(
      left,
      padding,
      Math.max(padding, viewportWidth - panelRect.width - padding),
    );

    if (top + panelRect.height > viewportHeight - padding) {
      top = triggerRect.bottom - panelRect.height;
    }

    top = clamp(
      top,
      padding,
      Math.max(padding, viewportHeight - panelRect.height - padding),
    );

    panelPositions.value = {
      ...panelPositions.value,
      [panelKey]: {
        top: Math.round(top),
        left: Math.round(left),
        transformOrigin: `top ${horizontalOrigin}`,
      },
    };
  }

  function schedulePanelPositionUpdate(): void {
    cancelPanelPositionFrame();
    panelAnimationFrame.value = requestAnimationFrame(() => {
      panelAnimationFrame.value = null;
      deps.openPanelDescriptors.value.forEach((descriptor) => {
        updatePanelPosition(descriptor.key);
      });
    });
  }

  function getPanelStyle(panelKey: string): Record<string, string> {
    const position = panelPositions.value[panelKey];
    if (!position) {
      return {};
    }

    return {
      top: `${position.top}px`,
      left: `${position.left}px`,
      transformOrigin: position.transformOrigin,
    };
  }

  function handleSubmenuViewportChange(): void {
    if (!deps.isOpen.value || deps.openPanelDescriptors.value.length === 0) {
      return;
    }

    schedulePanelPositionUpdate();
  }

  function resetPanelPositions(): void {
    panelPositions.value = {};
  }

  function bindSubmenuListeners(): void {
    window.addEventListener("resize", handleSubmenuViewportChange);
    window.addEventListener("scroll", handleSubmenuViewportChange, true);
  }

  function unbindSubmenuListeners(): void {
    window.removeEventListener("resize", handleSubmenuViewportChange);
    window.removeEventListener("scroll", handleSubmenuViewportChange, true);
  }

  watch(
    deps.openPanelDescriptors,
    () => {
      if (!deps.isOpen.value || deps.openPanelDescriptors.value.length === 0) {
        panelPositions.value = {};
        return;
      }

      nextTick(() => {
        schedulePanelPositionUpdate();
      });
    },
    { deep: true },
  );

  watch(
    () => [deps.isOpen.value, deps.openPanelDescriptors.value.length] as const,
    ([open, panelCount]) => {
      if (open && panelCount > 0) {
        bindSubmenuListeners();
        return;
      }

      unbindSubmenuListeners();
      cancelPanelPositionFrame();
    },
  );

  onBeforeUnmount(() => {
    unbindSubmenuListeners();
    cancelPanelPositionFrame();
  });

  return {
    panelPositions,
    getPanelStyle,
    schedulePanelPositionUpdate,
    resetPanelPositions,
  };
}
