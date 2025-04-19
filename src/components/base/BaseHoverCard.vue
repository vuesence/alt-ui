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

// I've looked at the Ark UI documentation for HoverCard, and I see why your tooltips are appearing and disappearing abruptly. There are several ways to improve the animation experience:

// ## The Issue

// The current implementation has two problems:
// 1. The HoverCard component has its own timing mechanisms that aren't being fully utilized
// 2. There's a conflict between the React-style state changes and the CSS animations

// ## Solutions

// ### 1. Use HoverCard's Built-in Timing Properties

// The HoverCard component has built-in properties to control timing:

// ```vue
// <HoverCard.Root
//   :open="isTooltipVisible"
//   :closeDelay="800"  <!-- Controls fade-out timing -->
//   :openDelay="200"   <!-- Controls fade-in timing -->
//   :positioning="tooltipPositioning"
// >
// ```

// ### 2. Use Proper CSS Transitions Instead of Animations

// Replace abrupt animations with smoother transitions:

// ```css
// .hover-card__content {
//   /* Other styles */
//   transition: opacity 0.5s ease, transform 0.5s ease;
//   opacity: 0;
//   transform: translateY(10px);
// }

// .hover-card__content[data-state="open"] {
//   opacity: 1;
//   transform: translateY(0);
// }

// .hover-card__content[data-state="closed"] {
//   opacity: 0;
//   transform: translateY(10px);
// }
// ```

// ### 3. Add Proper Animation Classes

// Add classes to handle the animation state:

// ```vue
// <HoverCard.Content
//   class="hover-card__content"
//   :class="{
//     'is-entering': isEntering,
//     'is-exiting': isExiting
//   }"
// >
// ```

// ```js
// // Track animation states
// const isEntering = ref(false);
// const isExiting = ref(false);

// watch(() => isTooltipVisible.value, (newValue) => {
//   if (newValue) {
//     isEntering.value = true;
//     setTimeout(() => { isEntering.value = false; }, 1000);
//   } else {
//     isExiting.value = true;
//     setTimeout(() => { isExiting.value = false; }, 800);
//   }
// });
// ```

// ### Complete Implementation

// Here's how I recommend updating your TourComponent.vue:

// ```vue
// <template>
//   <div v-if="isTooltipVisible || isClosing" class="tour-component">
//     <div v-if="targetElement" class="tour-highlight" :style="highlightStyles"></div>

//     <HoverCard.Root
//       :open="isTooltipVisible"
//       :closeDelay="800"
//       :openDelay="100"
//       :positioning="tooltipPositioning"
//     >
//       <HoverCard.Trigger :style="triggerStyles" />
//       <Teleport to="body">
//         <HoverCard.Positioner :style="{ zIndex: 'var(--alt-z-tooltip)' }">
//           <HoverCard.Content class="hover-card__content">
//             <!-- Content remains the same -->
//           </HoverCard.Content>
//         </HoverCard.Positioner>
//       </Teleport>
//     </HoverCard.Root>
//   </div>
// </template>

// <style scoped>
// .hover-card__content {
//   /* Other styles remain the same */
//   transition: opacity 1s ease, transform 1s ease;

//   &[data-state="open"] {
//     opacity: 1;
//     transform: translateY(0);
//   }

//   &[data-state="closed"] {
//     opacity: 0;
//     transform: translateY(10px);
//   }
// }
// </style>
// ```

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
