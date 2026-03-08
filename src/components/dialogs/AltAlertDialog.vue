<script setup lang="ts">
import { nextTick, ref } from "vue";
import AltDialog from "../base/AltDialog.vue";

defineProps({
  okText: {
    type: String,
    default: "OK",
  },
  isHtml: {
    type: Boolean,
    default: false,
  },
});

const dialog = ref<InstanceType<typeof AltDialog> | null>(null);
const message = ref("");
const resolvePromise = ref<(() => void) | null>(null);
const okButtonRef = ref<HTMLButtonElement | null>(null);

function show(text: string): Promise<void> {
  message.value = text;
  dialog.value?.show();
  nextTick(() => okButtonRef.value?.focus());

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
}

function onClose() {
  resolvePromise.value?.();
  dialog.value?.close();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault();
    onClose();
  }
}

defineExpose({ show });
</script>

<template>
  <AltDialog ref="dialog">
    <div class="alert-dialog" data-testid="alert-dialog" @keydown="onKeydown">
      <div class="alert-content">
        <p v-if="!isHtml">{{ message }}</p>
        <p v-else v-html="message"></p>
        <div class="alert-actions">
          <button
            ref="okButtonRef"
            class="btn btn-primary"
            data-testid="alert-dialog-ok"
            @click="onClose"
          >
            {{ okText }}
          </button>
        </div>
      </div>
    </div>
  </AltDialog>
</template>

<style scoped>
.alert-dialog {
  padding: var(--alt-space-4);
  min-width: 300px;
}

.alert-content {
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-4);
  text-align: center;
}

.alert-actions {
  display: flex;
  justify-content: center;
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
</style>
