<script setup lang="ts">
import { ToggleGroup } from "@ark-ui/vue/toggle-group";
import { nextTick, ref, type PropType } from "vue";

defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  radioGroupMode: {
    type: Boolean,
    default: true,
  },
});

const modelValue = defineModel<string>();

let lastValue = "";

const valueChange = (details: ToggleGroup.ValueChangeDetails) => {
  if (details.value.length === 0) {
    // Keep current value when attempting to deselect all
    nextTick(() => {
      state.value = [lastValue];
    });
    return;
  }
  modelValue.value = details.value[0];
  lastValue = details.value[0];
};

const state = ref<string[]>([modelValue.value || ""]);
</script>

<template>
  <ToggleGroup.Root
    v-model="state"
    class="toggle-group-root"
    @value-change="valueChange"
  >
    <ToggleGroup.Item
      v-for="(item, index) in items"
      :key="index"
      :value="item"
      class="toggle-group-item"
    >
      <slot name="item" :item="item">
        {{ item }}
      </slot>
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</template>

<style scoped>
.toggle-group-root {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--lh-space-4);
}
</style>
