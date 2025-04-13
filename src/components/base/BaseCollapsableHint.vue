<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <details class="collapsable-hint">
    <summary>{{ title }}</summary>
    <slot name="content">
      <div class="content" v-html="content" />
    </slot>
  </details>
</template>

<style>
.collapsable-hint {
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
}
</style>

<style scoped>
details {
  max-width: 40rem;
  summary {
    /* font-size: 0.9em; */
    /* padding-right: 24px; */
    color: var(--lh-c-text-3);
    /* width: 100%; */
    position: relative;
    cursor: pointer;
    /* list-style: none; */
    outline: 0;
    transition: 300ms linear;
    &:hover {
      color: var(--lh-c-text-1);
    }
    /* margin-bottom: 1em; */
    &::marker {
      color: var(--lh-c-brand-1-100);
    }
  }
  &[open] {
    summary {
      margin-bottom: 1em;
      &:after {
        transform: rotate(45deg);
        right: -2px;
        top: calc(50% + 1px);
      }
      & ~ * {
        opacity: 1;
        animation: open 0.3s ease-in-out;
      }
    }
  }
}
.content {
  padding: var(--lh-space-3) var(--lh-space-4) var(--lh-space-4);
  margin-left: var(--lh-space-4);
  border: 1px solid var(--lh-c-brand-1-300);
  border-radius: var(--lh-radius-md);
  background-color: var(--lh-c-brand-1-50);
  color: var(--lh-c-text-2);
}
@keyframes open {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
