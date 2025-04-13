<script setup lang="ts">
import { Switch } from "@ark-ui/vue/switch";

interface BaseSwitchProps {
  /**
   * Label text for the switch
   */
  label?: string;
}

const props = withDefaults(defineProps<BaseSwitchProps>(), {
  label: "",
});

const checked = defineModel<boolean>();
</script>

<template>
  <Switch.Root v-model:checked="checked" class="switch-root">
    <Switch.Control class="control">
      <Switch.Thumb class="thumb" />
    </Switch.Control>
    <Switch.Label v-if="props.label" class="label">
      {{ props.label }}
    </Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
</template>

<style scoped>
.switch-root {
  display: flex;
  position: relative;
  align-items: center;
  gap: var(--lh-space-2);
}

.label {
  color: var(--lh-c-text-1);
  font-weight: var(--lh-font-weight-medium);
  font-size: var(--lh-font-size-2);
}

.control {
  background-color: var(--lh-c-surface-5);
  border-radius: var(--lh-radius-full);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 2.75rem;
  height: 1.5rem;
  padding: 0.125rem;
  transition: background-color var(--lh-transition-base) var(--lh-ease-in-out);
}

.control:is(
    :checked,
    [data-checked],
    [aria-checked="true"],
    [data-state="checked"]
  ) {
  background: var(--lh-c-brand-1-600);
}

.control[data-focus-visible] {
  outline: 2px solid var(--lh-c-brand-1-500);
  outline-offset: 2px;
}

.control[data-hover]:not([data-disabled]) {
  background-color: var(--lh-c-brand-1-400);
}

.thumb {
  background: var(--lh-c-white);
  border-radius: var(--lh-radius-full);
  box-shadow: var(--lh-shadow-1);
  width: 1.25rem;
  height: 1.25rem;
  transition:
    transform var(--lh-transition-base) var(--lh-ease-in-out),
    background-color var(--lh-transition-base) var(--lh-ease-in-out);
}

.thumb:is(
    :checked,
    [data-checked],
    [aria-checked="true"],
    [data-state="checked"]
  ) {
  transform: translateX(1.25rem);
}
</style>
