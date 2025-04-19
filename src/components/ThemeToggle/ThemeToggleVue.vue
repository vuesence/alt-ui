<template>
  <div class="theme-toggle-wrapper" ref="toggleContainer">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';
import { ThemeToggle } from './ThemeToggle';
import type { ThemeName } from '../ThemeProvider';

export default defineComponent({
  name: 'ThemeToggleVue',
  props: {
    themes: {
      type: Array as PropType<ThemeName[]>,
      default: () => ['light', 'dark', 'system']
    }
  },
  setup(props) {
    const toggleContainer = ref<HTMLElement | null>(null);
    let themeToggle: ThemeToggle | null = null;
    
    onMounted(() => {
      if (toggleContainer.value) {
        themeToggle = new ThemeToggle({
          element: toggleContainer.value,
          themes: props.themes
        });
      }
    });
    
    return {
      toggleContainer
    };
  }
});
</script>

<style>
.theme-toggle-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle-label {
  font-size: 0.875rem;
  color: var(--theme-text-2);
}

.theme-toggle-select {
  background-color: var(--theme-surface-2);
  border: 1px solid var(--theme-border);
  border-radius: var(--theme-radius-base);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: var(--theme-text-1);
  outline: none;
  cursor: pointer;
}

.theme-toggle-select:focus {
  border-color: var(--theme-primary-400);
  box-shadow: 0 0 0 2px var(--theme-primary-100);
}
</style> 