<script setup lang="ts">
import { Tooltip } from "@ark-ui/vue/tooltip";
import AltIcon from "./AltIcon.vue";

defineProps<{
  text?: string;
  positioning?: {
    placement?: "top" | "bottom" | "left" | "right";
    gutter?: number;
    strategy?: "absolute" | "fixed";
    offset?: { mainAxis?: number; crossAxis?: number };
  };
  openDelay?: number;
  closeDelay?: number;
  showArrow?: boolean;
  size?: number;
  iconColor?: string;
}>();
</script>

<template>
  <Tooltip.Root
    :positioning="positioning"
    :open-delay="openDelay || 100"
    :close-delay="closeDelay || 300"
  >
    <Tooltip.Trigger class="info-tooltip-trigger">
      <AltIcon
        name="info"
        :size="size || 16"
        :color1="iconColor || 'var(--alt-c-text-3)'"
        class="info-icon"
      />
    </Tooltip.Trigger>
      <Tooltip.Positioner class="info-tooltip">
        <Tooltip.Content class="content-wrapper">
          <template v-if="showArrow">
            <Tooltip.Arrow class="arrow">
              <Tooltip.ArrowTip class="arrow-tip" />
            </Tooltip.Arrow>
          </template>
          <div class="tooltip-content">
            <slot>{{ text }}</slot>
          </div>
        </Tooltip.Content>
      </Tooltip.Positioner>
  </Tooltip.Root>
</template>

<style scoped>
.info-tooltip-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  transition: color var(--alt-transition-colors);
  
  &:hover .info-icon {
    color: var(--alt-c-text-2);
  }
  
  &:focus-visible {
    outline: 2px solid var(--alt-c-border);
    outline-offset: 2px;
    border-radius: var(--alt-radius-sm);
  }
}

.content-wrapper {
  background: var(--alt-c-surface-1);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-md);
  box-shadow: var(--alt-shadow-4);
  position: relative;
  z-index: var(--alt-z-dropdown);
  max-width: 300px;
  
  &:is([open], [data-open], [data-state="open"]) {
    animation: fadeIn var(--alt-transition-base) ease-out;
  }

  &:is([closed], [data-closed], [data-state="closed"]) {
    animation: fadeOut var(--alt-transition-fast) ease-out;
  }
}

.tooltip-content {
  padding: var(--alt-space-3);
  font-size: var(--alt-font-size-0);
  color: var(--alt-c-text-2);
  line-height: var(--alt-line-height-2);
}

.arrow {
  --arrow-size: 0.75rem;
  --arrow-background: var(--alt-c-surface-1);
}

.arrow-tip {
  border-top-width: 1px;
  border-left-width: 1px;
  border-color: var(--alt-c-border);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
</style> 