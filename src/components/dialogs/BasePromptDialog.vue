<script setup lang="ts">
import { ref } from "vue";
import BaseDialog from "../base/BaseDialog.vue";

defineProps({
  cancelText: {
    type: String,
    default: "Cancel",
  },
  okText: {
    type: String,
    default: "OK",
  },
});

const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);
const message = ref("");
const inputValue = ref("");
const defaultVal = ref("");
const resolvePromise = ref<((result: string | null) => void) | null>(null);

function show(text: string, defaultValue = ""): Promise<string | null> {
  message.value = text;
  defaultVal.value = defaultValue;
  inputValue.value = defaultValue;
  dialog.value?.show();

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
}

function onConfirm() {
  resolvePromise.value?.(inputValue.value);
  dialog.value?.close();
}

function onCancel() {
  resolvePromise.value?.(null);
  dialog.value?.close();
}

defineExpose({ show });
</script>

<template>
  <BaseDialog ref="dialog">
    <div class="prompt-dialog" data-testid="prompt-dialog">
      <div class="prompt-content">
        <p>{{ message }}</p>
        <input
          v-model="inputValue"
          type="text"
          class="prompt-input"
          :placeholder="defaultVal"
          @keyup.enter="onConfirm"
        />
        <div class="prompt-actions">
          <button
            class="btn btn-secondary"
            data-testid="prompt-dialog-cancel"
            @click="onCancel"
          >
            {{ cancelText }}
          </button>
          <button
            class="btn btn-primary"
            data-testid="prompt-dialog-confirm"
            @click="onConfirm"
          >
            {{ okText }}
          </button>
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<style scoped>
.prompt-dialog {
  padding: var(--lh-space-4);
  min-width: 300px;
}

.prompt-content {
  display: flex;
  flex-direction: column;
  gap: var(--lh-space-4);
  text-align: center;
}

.prompt-input {
  padding: var(--lh-space-2);
  border: 1px solid var(--lh-c-border);
  border-radius: var(--lh-radius-base);
  font-size: var(--lh-font-size-1);
  width: 100%;
}

.prompt-actions {
  display: flex;
  justify-content: center;
  gap: var(--lh-space-3);
  margin-top: var(--lh-space-3);
}

.btn {
  padding: var(--lh-space-2) var(--lh-space-4);
  border-radius: var(--lh-radius-base);
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--lh-c-brand-1-500);
  color: var(--lh-c-white);
}

.btn-secondary {
  background-color: var(--lh-c-surface-3);
  color: var(--lh-c-text-1);
}
</style>
