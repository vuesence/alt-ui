<script setup lang="ts">
import { Toast, Toaster } from "@ark-ui/vue/toast";
import { BaseIcon } from "@/ui";
import { toaster } from "@/ui/utils/toaster";
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
        <BaseIcon :name="toast.type" class="icon" size="20" />
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
  background-color: var(--lh-c-surface-2);
  border-radius: var(--lh-radius-base);
  box-shadow: var(--lh-shadow-4);
  min-width: 16rem;
  max-width: 22rem;
  width: 22rem;
  opacity: 1;
  overflow-wrap: anywhere;
  position: relative;
  padding: var(--lh-space-4);
  z-index: var(--lh-z-toast);
  transition-property: translate, scale, opacity, height;
  transition-timing-function: var(--lh-ease-out);
  transition-duration: var(--lh-transition-base);
  height: var(--height);
  opacity: var(--opacity);
  scale: var(--scale);
  translate: var(--x) var(--y) 0;
  will-change: translate, opacity, scale;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: var(--lh-space-3);
  .mobile & {
    width: 94vw;
  }
  .content-wrapper {
    display: flex;
    align-items: center;
    gap: var(--lh-space-3);
  }

  &[data-type="info"] {
    background-color: var(--lh-c-brand-1-100);
    [data-theme="dark"] & {
      background-color: var(--lh-c-brand-1-800);
    }
    [data-theme="contrast"] & {
      background-color: var(--lh-c-brand-1-900);
      border: 1px solid var(--lh-c-brand-1-500);
    }
  }

  &[data-type="success"] {
    background-color: var(--lh-c-brand-2-100);
    [data-theme="dark"] & {
      background-color: var(--lh-c-brand-2-800);
      .description {
        color: var(--lh-c-text-2);
      }
    }
    [data-theme="contrast"] & {
      background-color: var(--lh-c-brand-2-900);
      border: 1px solid var(--lh-c-brand-2-500);
    }
  }

  &[data-type="error"] {
    background-color: var(--lh-c-brand-3-100);
    [data-theme="dark"] & {
      background-color: var(--lh-c-brand-3-800);
    }
    [data-theme="contrast"] & {
      background-color: var(--lh-c-brand-3-900);
      border: 1px solid var(--lh-c-brand-3-500);
    }
  }

  &[data-type="warning"] {
    background-color: var(--lh-c-brand-3-100);
    [data-theme="dark"] & {
      background-color: var(--lh-c-brand-3-800);
      .description {
        color: var(--lh-c-text-2);
      }
    }
    [data-theme="contrast"] & {
      background-color: var(--lh-c-brand-3-900);
      border: 1px solid var(--lh-c-brand-3-500);
    }
  }

  .title {
    color: var(--lh-c-text-1);
    font-size: var(--lh-font-size-1);
    font-weight: var(--lh-font-weight-medium);
    line-height: var(--lh-line-height-1);
    [data-theme="contrast"] & {
      color: var(--lh-c-white);
    }
  }

  .icon {
    opacity: 0.6;
    margin-left: var(--lh-space-2);
  }
  .description {
    color: var(--lh-c-text-2);
    font-size: var(--lh-font-size-0);
    line-height: var(--lh-line-height-1);
    margin-top: var(--lh-space-1);
    [data-theme="contrast"] & {
      color: var(--lh-c-white);
    }
  }

  .action {
    /* margin-top: var(--lh-space-3); */
    color: var(--lh-c-brand-1-500);
    align-self: flex-end;
    padding: var(--lh-space-2) var(--lh-space-3);
    border: 1px solid var(--lh-c-brand-1-200);
    border-radius: var(--lh-radius-base);
    margin-right: var(--lh-space-2);
    [data-theme="dark"] & {
      color: var(--lh-c-brand-1-300);
    }
    [data-theme="contrast"] & {
      color: var(--lh-c-white);
      text-decoration: underline;
    }
  }

  .close {
    position: absolute;
    top: var(--lh-space-3);
    right: var(--lh-space-3);
    color: var(--lh-c-text-3);
    transition: color var(--lh-transition-base) var(--lh-ease-out);
    border: none;
    [data-theme="contrast"] & {
      color: var(--lh-c-white);
    }
    &:hover {
      color: var(--lh-c-text-1);
      [data-theme="contrast"] & {
        color: var(--lh-c-white);
        opacity: 0.8;
      }
    }
  }

  animation: fadeIn var(--lh-transition-base) var(--lh-ease-out);
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
