<script setup lang="ts">
/**
 * @fileoverview Компонент информационного тултипа с иконкой
 * @component AltInfoTooltip
 * @example
 * <AltInfoTooltip
 *   text="Подсказка для пользователя"
 *   :positioning="{ placement: 'top' }"
 * />
 */

import { Tooltip } from "@ark-ui/vue/tooltip";
import { ref, onMounted, onUnmounted } from "vue";
import AltIcon from "./AltIcon.vue";

/**
 * Props для компонента AltInfoTooltip
 */
export interface AltInfoTooltipProps {
  /**
   * Текст тултипа для отображения
   * @default undefined
   */
  text?: string;

  /**
   * Настройки позиционирования тултипа
   * @default undefined
   */
  positioning?: {
    /** Позиция тултипа относительно триггера */
    placement?: "top" | "bottom" | "left" | "right";
    /** Отступ от триггера в пикселях */
    gutter?: number;
    /** Стратегия позиционирования */
    strategy?: "absolute" | "fixed";
    /** Дополнительные отступы */
    offset?: { mainAxis?: number; crossAxis?: number };
  };

  /**
   * Задержка перед показом тултипа (мс)
   * @default 100
   */
  openDelay?: number;

  /**
   * Задержка перед скрытием тултипа (мс)
   * @default 300
   */
  closeDelay?: number;

  /**
   * Показывать ли стрелку тултипа
   * @default false
   */
  showArrow?: boolean;

  /**
   * Размер иконки в пикселях
   * @default 16
   */
  size?: number;

  /**
   * Цвет иконки (CSS переменная или hex)
   * @default 'var(--alt-c-text-3)'
   */
  iconColor?: string;
}

defineProps<AltInfoTooltipProps>();

// Состояние для мобильных устройств
const isTooltipOpen = ref(false);
const isTouchDevice = ref(false);
const triggerRef = ref<HTMLElement | null>(null);

// Определение тач-устройства
onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
});

// Обработчики для мобильных устройств
const handleTouchStart = (event: TouchEvent) => {
  if (isTouchDevice.value) {
    event.preventDefault();
    isTooltipOpen.value = !isTooltipOpen.value;
  }
};

const handleClickOutside = (event: Event) => {
  if (isTooltipOpen.value && triggerRef.value) {
    const target = event.target as Node;
    const triggerElement = (triggerRef.value as any)?.$el || triggerRef.value;

    if (triggerElement && typeof triggerElement.contains === 'function' && !triggerElement.contains(target)) {
      isTooltipOpen.value = false;
    }
  }
};

// Добавляем обработчики только для тач-устройств
onMounted(() => {
  if (isTouchDevice.value) {
    // Используем setTimeout чтобы избежать немедленного закрытия
    setTimeout(() => {
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
      document.addEventListener('click', handleClickOutside);
    }, 100);
  }
});

onUnmounted(() => {
  if (isTouchDevice.value) {
    document.removeEventListener('touchstart', handleClickOutside);
    document.removeEventListener('click', handleClickOutside);
  }
});
</script>

<template>
  <Tooltip.Root
    :positioning="positioning"
    :open-delay="openDelay || 100"
    :close-delay="closeDelay || 300"
    :open="isTouchDevice ? isTooltipOpen : undefined"
  >
    <Tooltip.Trigger
      ref="triggerRef"
      class="info-tooltip-trigger"
      @touchstart="handleTouchStart"
      @click="isTouchDevice ? (event: Event) => event.preventDefault() : undefined"
    >
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
  /* Улучшенная поддержка тач-устройств */
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:hover .info-icon {
    color: var(--alt-c-text-2);
  }

  /* Поддержка тач-устройств */
  &:active .info-icon {
    color: var(--alt-c-text-2);
  }

  &:focus-visible {
    outline: 2px solid var(--alt-c-border);
    outline-offset: 2px;
    border-radius: var(--alt-radius-sm);
  }

  /* Увеличенная область касания для мобильных */
  @media (pointer: coarse) {
    min-width: 44px;
    min-height: 44px;
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
  overflow-wrap: break-word;
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
