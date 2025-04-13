<script setup lang="ts">
import { ref } from "vue";
import BaseDialog from "../base/BaseDialog.vue";

defineProps({
  okText: {
    type: String,
    default: "OK",
  },
});

const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);
const message = ref("");
const resolvePromise = ref<(() => void) | null>(null);

function show(text: string): Promise<void> {
  message.value = text;
  dialog.value?.show();

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
}

function onClose() {
  resolvePromise.value?.();
  dialog.value?.close();
}

defineExpose({ show });
</script>

<template>
  <BaseDialog ref="dialog">
    <div class="alert-dialog" data-testid="alert-dialog">
      <div class="alert-content">
        <p>{{ message }}</p>
        <div class="alert-actions">
          <button
            class="btn btn-primary"
            data-testid="alert-dialog-ok"
            @click="onClose"
          >
            {{ okText }}
          </button>
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<style scoped>
.alert-dialog {
  padding: var(--lh-space-4);
  min-width: 300px;
}

.alert-content {
  display: flex;
  flex-direction: column;
  gap: var(--lh-space-4);
  text-align: center;
}

.alert-actions {
  display: flex;
  justify-content: center;
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
</style>
