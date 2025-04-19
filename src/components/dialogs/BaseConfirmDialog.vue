<script setup lang="ts">
import { ref } from "vue";
import BaseDialog from "../base/BaseDialog.vue";

defineProps({
  cancelText: {
    type: String,
    default: "Cancel",
  },
  confirmText: {
    type: String,
    default: "Confirm",
  },
});

const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);
const message = ref("");
const resolvePromise = ref<((result: boolean) => void) | null>(null);

function show(text: string): Promise<boolean> {
  message.value = text;
  dialog.value?.show();

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
}

function onConfirm(result: boolean) {
  resolvePromise.value?.(result);
  dialog.value?.close();
}

defineExpose({ show });
</script>

<template>
  <BaseDialog ref="dialog">
    <div class="confirm-dialog" data-testid="confirm-dialog">
      <div class="confirm-content">
        <p>{{ message }}</p>
        <div class="confirm-actions">
          <button
            class="btn btn-secondary"
            data-testid="confirm-dialog-cancel"
            @click="onConfirm(false)"
          >
            {{ cancelText }}
          </button>
          <button
            class="btn btn-primary"
            data-testid="confirm-dialog-confirm"
            @click="onConfirm(true)"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<style scoped>
.confirm-dialog {
  padding: var(--alt-space-4);
  min-width: 300px;
}

.confirm-content {
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-4);
  text-align: center;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: var(--alt-space-3);
  margin-top: var(--alt-space-3);
}

.btn {
  padding: var(--alt-space-2) var(--alt-space-4);
  border-radius: var(--alt-radius-base);
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--alt-c-brand-1-500);
  color: var(--alt-c-white);
}

.btn-secondary {
  background-color: var(--alt-c-surface-3);
  color: var(--alt-c-text-1);
}
</style>
