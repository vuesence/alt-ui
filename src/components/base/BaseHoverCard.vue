<script setup lang="ts">
import { HoverCard } from "@ark-ui/vue/hover-card";

defineProps<{
  modelValue?: boolean;
  positionerStyle?: Record<string, string>;
  positioning?: {
    placement?: "top" | "bottom" | "left" | "right";
    gutter?: number;
    strategy?: "absolute" | "fixed";
    offset?: { mainAxis?: number; crossAxis?: number };
  };
  openDelay?: number;
  closeDelay?: number;
  showArrow?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();


// ### Additional Notes from the Zag.js Documentation

// The Zag.js library (which powers Ark UI) mentions:

// 1. The HoverCard uses a state machine with specific timing parameters:
//    - `openDelay`: Time before opening (default: 700ms)
//    - `closeDelay`: Time before closing (default: 300ms)

// 2. Animation best practices:
//    - Use CSS transitions for smoother effects
//    - Hook animations to the `data-state` attribute
//    - Consider using a small delay before applying enter animations

// By implementing these changes, your tooltips should appear and disappear with smooth animations rather than abrupt jumps.
</script>

<template>
  <HoverCard.Root
    :open="modelValue"
    :positioning="positioning"
    :open-delay="openDelay || 100"
    :close-delay="closeDelay || 300"
    @update:open="(value) => emit('update:modelValue', value)"
  >
    <HoverCard.Trigger>
      <slot name="trigger" />
    </HoverCard.Trigger>
    <Teleport to="body">
      <HoverCard.Positioner :style="positionerStyle" class="hover-card">
        <HoverCard.Content class="content-wrapper">
          <template v-if="showArrow">
            <HoverCard.Arrow class="arrow">
              <HoverCard.ArrowTip class="arrow-tip" />
            </HoverCard.Arrow>
          </template>
          <slot name="content" />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Teleport>
  </HoverCard.Root>
</template>

<style scoped>
.content-wrapper {
  background: var(--alt-c-surface-1);
  border-radius: var(--alt-radius-md);
  box-shadow: var(--alt-shadow-4);
  position: relative;
  z-index: var(--alt-z-dropdown);
  &:is([open], [data-open], [data-state="open"]) {
    animation: fadeIn var(--alt-transition-base) ease-out;
  }

  &:is([closed], [data-closed], [data-state="closed"]) {
    animation: fadeOut var(--alt-transition-fast) ease-out;
  }
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
</style>
