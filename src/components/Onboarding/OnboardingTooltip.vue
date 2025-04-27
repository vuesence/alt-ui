<script setup lang="ts">
import { HoverCard } from "@ark-ui/vue/hover-card";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useOnboarding } from '../Onboarding/useOnboarding';
import { AltButton } from "../../components/base";

const emit = defineEmits<{
  (e: "dismissed"): void;
}>();

const {
  currentTooltip,
  currentTargetElement,
  isOnboardingEnabled,
  dismissCurrentTooltip,
} = useOnboarding(emit);

const isClosing = ref(false);

// Set closing flag, then remove tooltip with delay
const handleDismiss = () => {
  isClosing.value = true;

  setTimeout(() => {
    dismissCurrentTooltip();
    isClosing.value = false;
  }, 300);
};

// Computed styles for positioning trigger
const triggerStyles = computed(() => {
  if (!currentTargetElement.value) {
    return {};
  }

  const rect = currentTargetElement.value.getBoundingClientRect();
  return {
    position: "absolute" as const,
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  };
});

const tooltipPositioning = computed(() => ({
  placement: currentTooltip.value?.placement ?? "top",
  gutter: 10,
  strategy: "fixed" as const,
}));

// Keyboard accessibility
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isOnboardingEnabled.value) {
    handleDismiss();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    v-if="isOnboardingEnabled || isClosing"
    class="onboarding-tooltip"
    :class="{ 'is-closing': isClosing }"
  >
    <div class="onboarding-tooltip__overlay" />
    <HoverCard.Root
      :open="isOnboardingEnabled"
      :positioning="tooltipPositioning"
    >
      <HoverCard.Trigger :style="triggerStyles" />
      <Teleport to="body">
        <HoverCard.Positioner :style="{ zIndex: 'var(--alt-z-tooltip)' }">
          <HoverCard.Content class="hover-card__content">
            <HoverCard.Arrow class="arrow">
              <HoverCard.ArrowTip class="arrow-tip" />
            </HoverCard.Arrow>
            <h3>
              {{ currentTooltip?.title || 'Onboarding' }}
            </h3>
            <p class="description">
              {{ currentTooltip?.content }}
            </p>
            <div class="actions">
              <AltButton class="small primary" @click="handleDismiss">
                Close
              </AltButton>
            </div>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Teleport>
    </HoverCard.Root>
  </div>
</template>

<style scoped>
.onboarding-tooltip__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--alt-c-text-1);
  z-index: var(--alt-z-modal);
  animation: overlayFadeIn var(--alt-transition-slow) ease forwards;
  will-change: opacity;
}

.onboarding-tooltip.is-closing .onboarding-tooltip__overlay {
  animation: overlayFadeOut var(--alt-transition-fast) ease forwards;
}

.hover-card__content {
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  box-shadow: var(--alt-shadow-4);
  background: var(--alt-c-surface-1);
  border-radius: var(--alt-radius-md);
  box-shadow: var(--alt-shadow-4);
  position: relative;
  padding: var(--alt-space-3);
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-2);
  max-width: 80vw;

  &[hidden] {
    display: none;
  }

  &[data-state="open"] {
    animation: fadeIn var(--alt-transition-slow);
  }

  &[data-state="closed"] {
    animation: fadeOut var(--alt-transition-fast);
  }

  .arrow {
    --arrow-size: 0.75rem;
    --arrow-background: var(--alt-c-surface-1);

    .arrow-tip {
      border-top-width: 1px;
      border-left-width: 1px;
      border-color: var(--alt-c-border);
    }
  }

  h3 {
    font-weight: var(--alt-font-weight-bold);
    font-size: var(--alt-font-size-2);
    margin: var(--alt-space-1) 0;
  }

  .description {
    font-size: var(--alt-font-size-1);
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
}

@keyframes overlayFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.2;
  }
}

@keyframes overlayFadeOut {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(0.5rem);
  }
}
</style> 