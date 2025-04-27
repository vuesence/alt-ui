<script setup lang="ts">
import { ref } from "vue";
import AltDialog from "../base/AltDialog.vue";

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

const dialog = ref<InstanceType<typeof AltDialog> | null>(null);
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
  <AltDialog ref="dialog">
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
  </AltDialog>
</template>

<style scoped>
.prompt-dialog {
  padding: var(--alt-space-4);
  min-width: 300px;
}

.prompt-content {
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-4);
  text-align: center;
}

.prompt-input {
  padding: var(--alt-space-2);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  font-size: var(--alt-font-size-1);
  width: 100%;
}

.prompt-actions {
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
