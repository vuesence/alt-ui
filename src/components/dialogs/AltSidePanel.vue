<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  type Component,
  watch,
} from "vue";
import AltButton from "../base/AltButton.vue";
import type { SidePanelOptions } from "./dialogState";
import { createFocusTrap, type FocusTrap } from "../../utils/useFocusTrap";

const props = defineProps({
  backText: {
    type: String,
    default: "Back",
  },
  closeText: {
    type: String,
    default: "Close",
  },
});

const isVisible = ref(false);
const panelTitle = ref("");
const panelContent = ref<Component | null>(null);
const panelProps = ref<Record<string, unknown>>({});
const panelOptions = ref<SidePanelOptions>({
  width: "560px",
  position: "right",
  closeOnOverlay: true,
  hideFooter: false,
});
const resolvePromise = ref<((value: void) => void) | null>(null);
const panelRef = ref<HTMLElement | null>(null);
let focusTrap: FocusTrap | null = null;

const panelStyle = computed(() => ({
  maxWidth: panelOptions.value.width || "560px",
}));

function releaseFocusTrap(returnFocus = true) {
  focusTrap?.deactivate(returnFocus);
  focusTrap = null;
}

function show(
  title: string,
  content: Component | null,
  contentProps: Record<string, unknown> = {},
  options: SidePanelOptions = {},
): Promise<void> {
  panelTitle.value = title;
  panelContent.value = content;
  panelProps.value = contentProps;
  panelOptions.value = {
    width: options.width || "560px",
    position: options.position || "right",
    closeOnOverlay: options.closeOnOverlay !== false,
    hideFooter: options.hideFooter === true,
  };
  isVisible.value = true;

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
}

function close() {
  isVisible.value = false;
  releaseFocusTrap(true);
  resolvePromise.value?.();
  panelContent.value = null;
  panelProps.value = {};
}

function onOverlayClick() {
  if (panelOptions.value.closeOnOverlay) {
    close();
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isVisible.value) {
    e.stopPropagation();
    close();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown, true);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown, true);
  releaseFocusTrap(false);
});

watch(isVisible, (visible) => {
  if (!visible) {
    return;
  }

  nextTick(() => {
    if (!panelRef.value) {
      return;
    }

    releaseFocusTrap(false);
    focusTrap = createFocusTrap(panelRef.value);
    focusTrap.activate();
    focusTrap.focusFirst();
  });
});

defineExpose({ show, close });
</script>

<template>
  <Teleport to="body">
    <Transition name="side-panel-overlay">
      <div
        v-if="isVisible"
        class="side-panel-overlay"
        @click.self="onOverlayClick"
        @keydown.escape="close"
      >
        <Transition name="side-panel-slide">
          <aside
            v-if="isVisible"
            ref="panelRef"
            class="side-panel"
            :class="`position-${panelOptions.position}`"
            :style="panelStyle"
            role="dialog"
            aria-modal="true"
            :aria-label="panelTitle"
          >
            <header class="panel-header">
              <button
                class="back-btn"
                :aria-label="backText"
                @click="close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                {{ backText }}
              </button>
              <h2 class="panel-title">{{ panelTitle }}</h2>
              <div class="header-spacer" />
            </header>

            <div class="panel-content">
              <component
                :is="panelContent"
                v-if="panelContent"
                v-bind="panelProps"
                @close="close"
              />
              <slot v-else />
            </div>

            <footer v-if="!panelOptions.hideFooter" class="panel-footer">
              <AltButton
                class="secondary small"
                :label="closeText"
                @click="close"
              />
            </footer>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@import "../../styles/tokens/scrollbar.css";

.side-panel-overlay {
  position: fixed;
  inset: 0;
  background: var(--alt-c-overlay);
  z-index: var(--alt-z-modal, 1000);
  display: flex;
}

.side-panel-overlay-enter-active,
.side-panel-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.side-panel-overlay-enter-from,
.side-panel-overlay-leave-to {
  opacity: 0;
}

.side-panel {
  width: 100%;
  height: 100%;
  background: var(--alt-c-bg, #fff);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--alt-shadow-lg);

  &.position-right {
    margin-left: auto;
  }

  &.position-left {
    margin-right: auto;
  }

  @media (max-width: 768px) {
    max-width: 100% !important;
  }
}

.side-panel-slide-enter-active,
.side-panel-slide-leave-active {
  transition: transform 0.3s ease;
}

.position-right {
  &.side-panel-slide-enter-from,
  &.side-panel-slide-leave-to {
    transform: translateX(100%);
  }
}

.position-left {
  &.side-panel-slide-enter-from,
  &.side-panel-slide-leave-to {
    transform: translateX(-100%);
  }
}

.panel-header {
  display: flex;
  align-items: center;
  padding: var(--alt-space-4, 16px) var(--alt-space-5, 20px);
  border-bottom: 1px solid var(--alt-c-divider, #e5e5e5);
  background: var(--alt-c-surface-1, #fafafa);
  gap: var(--alt-space-3, 12px);
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: var(--alt-space-3, 12px) var(--alt-space-4, 16px);
  }
}

.back-btn {
  display: flex;
  align-items: center;
  gap: var(--alt-space-1, 4px);
  background: none;
  border: none;
  color: var(--alt-c-text-2, #666);
  font-size: var(--alt-font-size-1, 14px);
  cursor: pointer;
  padding: var(--alt-space-1, 4px) var(--alt-space-2, 8px);
  border-radius: var(--alt-radius-base, 6px);
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: var(--alt-c-text-1, #333);
    background: var(--alt-c-surface-2, #f0f0f0);
  }
}

.panel-title {
  font-size: var(--alt-font-size-3, 18px);
  font-weight: var(--alt-font-weight-bold, 600);
  color: var(--alt-c-text-1, #333);
  margin: 0;
  flex: 1;
  text-align: center;
}

.header-spacer {
  width: 80px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--alt-space-5, 20px);

  @media (max-width: 768px) {
    padding: var(--alt-space-4, 16px);
  }
}

.panel-footer {
  padding: var(--alt-space-4, 16px) var(--alt-space-5, 20px);
  border-top: 1px solid var(--alt-c-divider, #e5e5e5);
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: var(--alt-space-3, 12px) var(--alt-space-4, 16px);
  }
}

</style>
