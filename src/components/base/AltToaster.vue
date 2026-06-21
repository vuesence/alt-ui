<script setup lang="ts">
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
</script>

<template>
  <Toaster position="bottom-center" close-button expand />
</template>

<style lang="css" scoped>
:global([data-sonner-toaster]) {
  --toast-width: 22rem;
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
}

:global([data-sonner-toast]) {
  background: var(--alt-c-surface-2);
  border: 1px solid transparent;
  border-radius: var(--alt-radius-base);
  box-shadow: var(--alt-shadow-4);
  min-width: 16rem;
  max-width: 22rem;
  width: 22rem;
  overflow-wrap: anywhere;
  position: relative;
  padding: var(--alt-space-4);
  z-index: var(--alt-z-toast);
  transition:
    transform var(--alt-transition-base) var(--alt-ease-out),
    opacity var(--alt-transition-base) var(--alt-ease-out);
  will-change: translate, opacity, scale;
  display: flex;
  align-items: flex-start;
  gap: var(--alt-space-3);
}

:global(.mobile [data-sonner-toast]),
:global(.tablet [data-sonner-toast]) {
  width: min(94vw, 22rem);
}

:global([data-sonner-toast] [data-icon]) {
  margin-left: var(--alt-space-2);
  margin-right: var(--alt-space-2);
  margin-top: 2px;
  opacity: 0.65;
  color: var(--alt-c-text-2);
  flex-shrink: 0;
}

:global([data-sonner-toast] [data-content]) {
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-1);
  padding-right: var(--alt-space-6);
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
  font-size: var(--alt-font-size-1);
  font-weight: var(--alt-font-weight-medium);
  line-height: var(--alt-line-height-1);
}

:global([data-sonner-toast] [data-description]) {
  margin: 0;
  color: var(--alt-c-text-2);
  font-size: var(--alt-font-size-0);
  line-height: var(--alt-line-height-1);
}

:global([data-sonner-toast] [data-button]) {
  color: var(--alt-c-brand-1-500);
  align-self: flex-end;
  padding: var(--alt-space-2) var(--alt-space-3);
  border: 1px solid var(--alt-c-brand-1-200);
  border-radius: var(--alt-radius-base);
}

:global([data-sonner-toast] [data-close-button]) {
  position: absolute;
  top: var(--alt-space-3);
  right: var(--alt-space-3) !important;
  left: auto !important;
  transform: none !important;
  background: transparent !important;
  box-shadow: none !important;
  width: auto;
  height: auto;
  padding: 0;
  color: var(--alt-c-text-3);
  transition: color var(--alt-transition-base) var(--alt-ease-out);
  border: none;
  border-radius: 0;
}

:global([data-sonner-toast] [data-close-button] svg) {
  width: 14px;
  height: 14px;
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
