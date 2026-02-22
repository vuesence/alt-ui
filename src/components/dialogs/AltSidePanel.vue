<script setup lang="ts">
import { computed, ref, type Component } from "vue";
import type { SidePanelOptions } from "./dialogState";

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

const panelStyle = computed(() => ({
  maxWidth: panelOptions.value.width || "560px",
}));

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
  resolvePromise.value?.();
  panelContent.value = null;
  panelProps.value = {};
}

function onOverlayClick() {
  if (panelOptions.value.closeOnOverlay) {
    close();
  }
}

defineExpose({ show, close });
</script>

<template>
  <Teleport to="body">
    <Transition name="side-panel-overlay">
      <div
        v-if="isVisible"
        class="side-panel-overlay"
        @click.self="onOverlayClick"
      >
        <Transition name="side-panel-slide">
          <aside
            v-if="isVisible"
            class="side-panel"
            :class="`position-${panelOptions.position}`"
            :style="panelStyle"
          >
            <header class="panel-header">
              <button class="back-btn" @click="close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
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
              <button class="close-btn" @click="close">
                {{ closeText }}
              </button>
            </footer>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@import "alt-ui/styles/tokens/scrollbar.css";

.side-panel-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
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
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);

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

.close-btn {
  padding: var(--alt-space-2, 8px) var(--alt-space-4, 16px);
  background: var(--alt-c-surface-2, #f0f0f0);
  border: 1px solid var(--alt-c-border, #e0e0e0);
  border-radius: var(--alt-radius-base, 6px);
  color: var(--alt-c-text-1, #333);
  font-size: var(--alt-font-size-1, 14px);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--alt-c-surface-3, #e5e5e5);
  }
}
</style>
