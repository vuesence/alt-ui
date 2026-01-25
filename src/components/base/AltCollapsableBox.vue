<script setup lang="ts">
// import { ref, watch, onMounted } from 'vue';

defineProps({
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  // modelValue: {
  //   type: Boolean,
  //   default: true,
  // },
});

// const emit = defineEmits(['update:modelValue']);

const isOpen = defineModel<boolean>('modelValue');

// Watch for external changes to modelValue
// watch(() => props.modelValue, (newValue) => {
//   if (newValue !== isOpen.value) {
//     isOpen.value = newValue;
//   }
// });

// Handle toggle
// function handleToggle() {
//   isOpen.value = !isOpen.value;
//   // emit('update:modelValue', isOpen.value);
// }

// onMounted(() => {
//   isOpen.value = props.modelValue;
// });
</script>

<template>
  <div class="collapsable-box">
    <div
      @click="isOpen = !isOpen"
      class="summary-container"
      :class="{ 'is-open': isOpen }"
    >
      <div class="summary-icon" :class="{ 'is-open': isOpen }"></div>
      <slot name="title">
        <div class="summary-title">{{ title }}</div>
      </slot>
    </div>
    <div class="content-container" :class="{ 'is-open': isOpen }">
      <div class="content-inner">
        <slot>
          <div class="content" v-html="content" />
        </slot>
      </div>
    </div>
  </div>
</template>

<style>
.collapsable-box {
  h2 {
    margin-top: 0;
  }
  ul {
    margin-top: 0;
    list-style: disc;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    li {
      margin-bottom: 0.5rem;
      ul {
        list-style: circle;
      }
    }
  }
  /* strong:has(+ br) {
    margin-bottom: 10px;
  } */
}
</style>

<style scoped>
.collapsable-box {
  max-width: 40rem;
}

.wide.collapsable-box {
  max-width: unset;
}

.summary-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--alt-c-text-3);
  cursor: pointer;
  outline: 0;
  transition: color 200ms ease;
  margin-bottom: 0.5rem;

  &:hover {
    color: var(--alt-c-text-1);
  }
}

.summary-title {
  font-weight: var(--alt-font-weight-medium);
}

.summary-icon {
  position: relative;
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-style: solid;
    border-width: 0 0.16rem 0.16rem 0;
    border-color: var(--alt-c-text-3);
    transform: translateY(-50%) rotate(-45deg);
    transition: all 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
  }

  &.is-open::before {
    top: 30%;
    left: 10%;
    transform: translateY(-50%) rotate(45deg);
  }
}

.content-container {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
  overflow: hidden;
  margin-top: 1rem;

  &.is-open {
    grid-template-rows: 1fr;
    margin-bottom: 1rem;
  }
}

.content-inner {
  min-height: 0;
}

.content {
  padding: var(--alt-space-3) var(--alt-space-4) var(--alt-space-4);
  margin-left: var(--alt-space-4);
  border: 1px solid var(--alt-c-brand-1-300);
  border-radius: var(--alt-radius-md);
  background-color: var(--alt-c-brand-1-50);
  color: var(--alt-c-text-2);
}
</style>
