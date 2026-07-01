<script setup lang="ts">
import { Toaster } from "vue-sonner";

import AltIcon from "./AltIcon.vue";
import "vue-sonner/style.css";

const TOAST_GAP = 16;
const VISIBLE_TOASTS = 4;
</script>

<template>
  <Toaster
    position="bottom-center"
    close-button
    close-button-position="top-right"
    expand
    :gap="TOAST_GAP"
    :visible-toasts="VISIBLE_TOASTS"
  >
    <template #success-icon>
      <AltIcon name="success" size="22" class="toast-type-icon" />
    </template>
    <template #error-icon>
      <AltIcon name="error" size="22" class="toast-type-icon" />
    </template>
    <template #warning-icon>
      <AltIcon name="warning" size="22" class="toast-type-icon" />
    </template>
    <template #info-icon>
      <AltIcon name="info" size="22" class="toast-type-icon" />
    </template>
  </Toaster>
</template>

<style lang="css" scoped>
:global([data-sonner-toaster]) {
  --toast-width: 24rem;
  --normal-bg: var(--alt-c-surface-2);
  --normal-border: var(--alt-c-border);
  --normal-text: var(--alt-c-text-1);
  --success-bg: var(--alt-c-brand-2-100);
  --success-border: var(--alt-c-brand-2-200);
  --success-text: var(--alt-c-text-1);
  --error-bg: var(--alt-c-brand-3-100);
  --error-border: var(--alt-c-brand-3-200);
  --error-text: var(--alt-c-text-1);
  --warning-bg: var(--alt-c-brand-3-100);
  --warning-border: var(--alt-c-brand-3-200);
  --warning-text: var(--alt-c-text-1);
  --info-bg: var(--alt-c-brand-1-100);
  --info-border: var(--alt-c-brand-1-200);
  --info-text: var(--alt-c-text-1);
  z-index: var(--alt-z-toast);
  pointer-events: none;
}

:global([data-sonner-toaster] [data-sonner-toast]) {
  pointer-events: auto;
}

:global(body:has(.bottom-nav) [data-sonner-toaster][data-y-position='bottom']) {
  bottom: calc(var(--offset-bottom, 24px) + var(--app-bottom-nav-total-height, 0px)) !important;
}

:global(body.mobile:has(.bottom-nav) [data-sonner-toaster][data-y-position='bottom']),
:global(body.tablet:has(.bottom-nav) [data-sonner-toaster][data-y-position='bottom']) {
  bottom: calc(
    var(--mobile-offset-bottom, 16px) + max(env(safe-area-inset-bottom), 0px) +
      var(--app-bottom-nav-total-height, 0px)
  ) !important;
}

:global([data-sonner-toast]) {
  background: var(--alt-c-surface-2);
  border: 1px solid transparent;
  font-family: var(--alt-font-family-base);
  border-radius: var(--alt-radius-base);
  box-shadow: var(--alt-shadow-4);
  min-width: 18rem;
  max-width: 24rem;
  width: var(--width, 24rem);
  overflow-wrap: anywhere;
  padding: var(--alt-space-4) var(--alt-space-5);
  transition:
    transform var(--alt-transition-base) var(--alt-ease-out),
    opacity var(--alt-transition-base) var(--alt-ease-out),
    height var(--alt-transition-base) var(--alt-ease-out);
  will-change: transform, opacity, height;
  display: grid !important;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  align-items: start;
  column-gap: var(--alt-space-3);
  row-gap: var(--alt-space-2);
}

:global([data-sonner-toast][data-styled='true']) {
  column-gap: var(--alt-space-3);

}
:global(.mobile [data-sonner-toast]),
:global(.tablet [data-sonner-toast]) {
  width: min(calc(100vw - var(--alt-space-8)), 24rem);
  max-width: min(calc(100vw - var(--alt-space-8)), 24rem);
}

:global([data-sonner-toast] [data-icon]) {
  grid-column: 1;
  grid-row: 1 / span 2;
  margin-left: var(--alt-space-2);
  margin-right: var(--alt-space-2);
  margin-top: 2px;
  flex-shrink: 0;
}

:global([data-sonner-toast] [data-icon] .toast-type-icon) {
  opacity: 0.65;
  color: var(--alt-c-text-2);
}

:global([data-sonner-toast] [data-content]) {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-2);
  padding-right: var(--alt-space-6);
  min-width: 0;
}

:global([data-sonner-toast][data-type="info"]) {
  background-color: var(--alt-c-brand-1-100);
  border-color: var(--alt-c-brand-1-200);
}

:global([data-sonner-toast][data-type="success"]) {
  background-color: var(--alt-c-brand-2-100);
  border-color: var(--alt-c-brand-2-200);
}

:global([data-sonner-toast][data-type="error"]),
:global([data-sonner-toast][data-type="warning"]) {
  background-color: var(--alt-c-brand-3-100);
  border-color: var(--alt-c-brand-3-200);
}

:global([data-sonner-toast] [data-title]) {
  margin: 0;
  color: var(--alt-c-text-1);
  font-family: var(--alt-font-family-heading);
  font-size: var(--alt-font-size-2);
  font-weight: var(--alt-font-weight-semibold);
  line-height: var(--alt-line-height-3);
}

:global([data-sonner-toast] [data-description]) {
  margin: 0;
  color: var(--alt-c-text-1);
  font-size: var(--alt-font-size-1);
  line-height: var(--alt-line-height-3);
}

:global([data-sonner-toast] [data-button]) {
  grid-column: 2;
  grid-row: 2;
  justify-self: end;
  color: var(--alt-c-brand-1-500);
  margin-top: var(--alt-space-1);
  padding: var(--alt-space-2) var(--alt-space-3);
  border: 1px solid var(--alt-c-brand-1-200);
  border-radius: var(--alt-radius-base);
}

:global([data-sonner-toast] [data-close-button]),
:global([data-sonner-toast][data-styled='true'] [data-close-button]) {
  position: absolute;
  top: var(--alt-space-3);
  right: var(--alt-space-3) !important;
  left: auto !important;
  transform: none !important;
  background: transparent !important;
  box-shadow: none !important;
  width: 24px;
  height: 24px;
  padding: 2px;
  line-height: 0;
  color: var(--alt-c-text-3);
  transition: color var(--alt-transition-base) var(--alt-ease-out);
  border: none;
  border-radius: 0;
}

:global([data-sonner-toast] [data-close-button] svg) {
  width: 18px;
  height: 18px;
  stroke-width: 2.25;
}

:global([data-sonner-toast] [data-close-button]:hover) {
  color: var(--alt-c-text-1);
}

:global([data-theme="dark"] [data-sonner-toast][data-type="info"]) {
  background-color: var(--alt-c-brand-1-800);
  border-color: transparent;
}

:global([data-theme="dark"] [data-sonner-toast][data-type="success"]) {
  background-color: var(--alt-c-brand-2-800);
  border-color: transparent;
}

:global([data-theme="dark"] [data-sonner-toast][data-type="error"]),
:global([data-theme="dark"] [data-sonner-toast][data-type="warning"]) {
  background-color: var(--alt-c-brand-3-800);
  border-color: transparent;
}

:global([data-theme="contrast"] [data-sonner-toast][data-type="info"]) {
  background-color: var(--alt-c-brand-1-900);
  border: 1px solid var(--alt-c-brand-1-500);
}

:global([data-theme="contrast"] [data-sonner-toast][data-type="success"]) {
  background-color: var(--alt-c-brand-2-900);
  border: 1px solid var(--alt-c-brand-2-500);
}

:global([data-theme="contrast"] [data-sonner-toast][data-type="error"]),
:global([data-theme="contrast"] [data-sonner-toast][data-type="warning"]) {
  background-color: var(--alt-c-brand-3-900);
  border: 1px solid var(--alt-c-brand-3-500);
}

:global([data-theme="contrast"] [data-sonner-toast] [data-title]),
:global([data-theme="contrast"] [data-sonner-toast] [data-description]),
:global([data-theme="contrast"] [data-sonner-toast] [data-close-button]) {
  color: var(--alt-c-white);
}
</style>
