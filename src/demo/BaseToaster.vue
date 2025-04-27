<script setup lang="ts">
import { Toast, Toaster } from "@ark-ui/vue/toast";
import { AltIcon, toaster } from "../";
</script>

<template>
  <Toaster v-slot="toast" :toaster="toaster">
    <Toast.Root
      :key="toast.id"
      class="toast"
      :type="toast.type"
      :data-testid="`${toast.type}-toast`"
    >
      <div class="content-wrapper">
        <AltIcon :name="toast.type" class="icon" size="20" />
        <div class="content">
          <Toast.Title v-if="toast.title" class="title">
            {{ toast.title }}
          </Toast.Title>
          <Toast.Description v-if="toast.description" class="description">
            {{ toast.description }}
          </Toast.Description>
        </div>
      </div>
      <Toast.ActionTrigger v-if="toast.action" class="action">
        {{ toast.action.label }}
      </Toast.ActionTrigger>
      <Toast.CloseTrigger class="close">✕</Toast.CloseTrigger>
    </Toast.Root>
  </Toaster>
</template>

<style lang="css" scoped>
.toast {
  background-color: var(--alt-c-surface-2);
  border-radius: var(--alt-radius-base);
  box-shadow: var(--alt-shadow-4);
  min-width: 16rem;
  max-width: 22rem;
  width: 22rem;
  opacity: 1;
  overflow-wrap: anywhere;
  position: relative;
  padding: var(--alt-space-4);
  z-index: var(--alt-z-toast);
  transition-property: translate, scale, opacity, height;
  transition-timing-function: var(--alt-ease-out);
  transition-duration: var(--alt-transition-base);
  height: var(--height);
  opacity: var(--opacity);
  scale: var(--scale);
  translate: var(--x) var(--y) 0;
  will-change: translate, opacity, scale;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: var(--alt-space-3);
  .mobile & {
    width: 94vw;
  }
  .content-wrapper {
    display: flex;
    align-items: center;
    gap: var(--alt-space-3);
  }

  &[data-type="info"] {
    background-color: var(--alt-c-brand-1-100);
    [data-theme="dark"] & {
      background-color: var(--alt-c-brand-1-800);
    }
    [data-theme="contrast"] & {
      background-color: var(--alt-c-brand-1-900);
      border: 1px solid var(--alt-c-brand-1-500);
    }
  }

  &[data-type="success"] {
    background-color: var(--alt-c-brand-2-100);
    [data-theme="dark"] & {
      background-color: var(--alt-c-brand-2-800);
      .description {
        color: var(--alt-c-text-2);
      }
    }
    [data-theme="contrast"] & {
      background-color: var(--alt-c-brand-2-900);
      border: 1px solid var(--alt-c-brand-2-500);
    }
  }

  &[data-type="error"] {
    background-color: var(--alt-c-brand-3-100);
    [data-theme="dark"] & {
      background-color: var(--alt-c-brand-3-800);
    }
    [data-theme="contrast"] & {
      background-color: var(--alt-c-brand-3-900);
      border: 1px solid var(--alt-c-brand-3-500);
    }
  }

  &[data-type="warning"] {
    background-color: var(--alt-c-brand-3-100);
    [data-theme="dark"] & {
      background-color: var(--alt-c-brand-3-800);
      .description {
        color: var(--alt-c-text-2);
      }
    }
    [data-theme="contrast"] & {
      background-color: var(--alt-c-brand-3-900);
      border: 1px solid var(--alt-c-brand-3-500);
    }
  }

  .title {
    color: var(--alt-c-text-1);
    font-size: var(--alt-font-size-1);
    font-weight: var(--alt-font-weight-medium);
    line-height: var(--alt-line-height-1);
    [data-theme="contrast"] & {
      color: var(--alt-c-white);
    }
  }

  .icon {
    opacity: 0.6;
    margin-left: var(--alt-space-2);
  }
  .description {
    color: var(--alt-c-text-2);
    font-size: var(--alt-font-size-0);
    line-height: var(--alt-line-height-1);
    margin-top: var(--alt-space-1);
    [data-theme="contrast"] & {
      color: var(--alt-c-white);
    }
  }

  .action {
    /* margin-top: var(--alt-space-3); */
    color: var(--alt-c-brand-1-500);
    align-self: flex-end;
    padding: var(--alt-space-2) var(--alt-space-3);
    border: 1px solid var(--alt-c-brand-1-200);
    border-radius: var(--alt-radius-base);
    margin-right: var(--alt-space-2);
    [data-theme="dark"] & {
      color: var(--alt-c-brand-1-300);
    }
    [data-theme="contrast"] & {
      color: var(--alt-c-white);
      text-decoration: underline;
    }
  }

  .close {
    position: absolute;
    top: var(--alt-space-3);
    right: var(--alt-space-3);
    color: var(--alt-c-text-3);
    transition: color var(--alt-transition-base) var(--alt-ease-out);
    border: none;
    [data-theme="contrast"] & {
      color: var(--alt-c-white);
    }
    &:hover {
      color: var(--alt-c-text-1);
      [data-theme="contrast"] & {
        color: var(--alt-c-white);
        opacity: 0.8;
      }
    }
  }

  animation: fadeIn var(--alt-transition-base) var(--alt-ease-out);
}

/* Add keyframes for fade-in effect */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
