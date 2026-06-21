<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import AltButton from "../base/AltButton.vue";
import { useOnboarding } from "../Onboarding/useOnboarding";

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
const DEFAULT_OFFSET_PX = 14;

function handleDismiss(): void {
  isClosing.value = true;
  window.setTimeout(() => {
    dismissCurrentTooltip();
    isClosing.value = false;
  }, 300);
}

const triggerStyles = computed(() => {
  if (!currentTargetElement.value) {
    return {};
  }

  const rect = currentTargetElement.value.getBoundingClientRect();
  return {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  };
});

const placement = computed(() => currentTooltip.value?.placement ?? "top");

const tooltipStyles = computed(() => {
  const target = currentTargetElement.value;
  if (!target) {
    return {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  }

  const rect = target.getBoundingClientRect();
  if (placement.value === "bottom") {
    return {
      top: `${rect.bottom + DEFAULT_OFFSET_PX}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: "translateX(-50%)",
    };
  }
  if (placement.value === "left") {
    return {
      top: `${rect.top + rect.height / 2}px`,
      left: `${Math.max(12, rect.left - DEFAULT_OFFSET_PX)}px`,
      transform: "translate(-100%, -50%)",
    };
  }
  if (placement.value === "right") {
    return {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.right + DEFAULT_OFFSET_PX}px`,
      transform: "translateY(-50%)",
    };
  }

  return {
    top: `${Math.max(12, rect.top - DEFAULT_OFFSET_PX)}px`,
    left: `${rect.left + rect.width / 2}px`,
    transform: "translate(-50%, -100%)",
  };
});

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape" && isOnboardingEnabled.value) {
    handleDismiss();
  }
}

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
    <div class="onboarding-tooltip__target" :style="triggerStyles" />
    <Teleport to="body">
      <div class="onboarding-tooltip__content" :style="tooltipStyles">
        <h3>{{ currentTooltip?.title || "Onboarding" }}</h3>
        <p class="description">{{ currentTooltip?.content }}</p>
        <div class="actions">
          <AltButton class="small primary" @click="handleDismiss">
            Close
          </AltButton>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.onboarding-tooltip__overlay {
  position: fixed;
  inset: 0;
  background-color: var(--alt-c-text-1);
  z-index: var(--alt-z-modal);
  opacity: 0.2;
  animation: overlayFadeIn var(--alt-transition-slow) ease forwards;
}

.onboarding-tooltip.is-closing .onboarding-tooltip__overlay {
  animation: overlayFadeOut var(--alt-transition-fast) ease forwards;
}

.onboarding-tooltip__target {
  position: fixed;
  z-index: calc(var(--alt-z-tooltip) - 1);
  pointer-events: none;
  box-shadow: rgba(0, 0, 0, 0.45) 0 0 0 9999px;
  border-radius: var(--alt-radius-sm);
}

.onboarding-tooltip__content {
  position: fixed;
  z-index: var(--alt-z-tooltip);
  max-width: min(28rem, 90vw);
  padding: var(--alt-space-3);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-md);
  background: var(--alt-c-surface-1);
  box-shadow: var(--alt-shadow-4);
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-2);
  animation: fadeIn var(--alt-transition-slow);
}

.onboarding-tooltip__content h3 {
  margin: 0;
  font-weight: var(--alt-font-weight-bold);
  font-size: var(--alt-font-size-2);
}

.description {
  margin: 0;
  font-size: var(--alt-font-size-1);
}

.actions {
  display: flex;
  justify-content: flex-end;
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
</style>
