<script setup lang="ts">
import { ref, watch } from "vue";
import AltAlertDialog from "./AltAlertDialog.vue";
import AltConfirmDialog from "./AltConfirmDialog.vue";
import AltPromptDialog from "./AltPromptDialog.vue";
import AltFormDialog from "./AltFormDialog.vue";
import { dialogsState } from "./dialogState";

// Пропсы для текстов кнопок
defineProps({
  // Тексты для кнопок в диалогах
  okText: {
    type: String,
    default: "OK",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  confirmText: {
    type: String,
    default: "Confirm",
  },
});

// Ссылки на компоненты диалогов
const alertDialog = ref<InstanceType<typeof AltAlertDialog> | null>(null);
const confirmDialog = ref<InstanceType<typeof AltConfirmDialog> | null>(null);
const promptDialog = ref<InstanceType<typeof AltPromptDialog> | null>(null);
const formDialog = ref<InstanceType<typeof AltFormDialog> | null>(null);

// Отслеживаем изменения состояния для alert диалога
watch(
  () => dialogsState.alert.isOpen,
  async (isOpen) => {
    if (isOpen && alertDialog.value) {
      try {
        await alertDialog.value.show(dialogsState.alert.message);
        // Вызываем резолв промиса после закрытия диалога
        if (dialogsState.alert.resolve) {
          dialogsState.alert.resolve();
          dialogsState.alert.resolve = null;
        }
      } finally {
        dialogsState.alert.isOpen = false;
      }
    }
  },
);

// Отслеживаем изменения состояния для confirm диалога
watch(
  () => dialogsState.confirm.isOpen,
  async (isOpen) => {
    if (isOpen && confirmDialog.value) {
      try {
        const result = await confirmDialog.value.show(
          dialogsState.confirm.message,
        );
        // Вызываем резолв промиса с результатом
        if (dialogsState.confirm.resolve) {
          dialogsState.confirm.resolve(result);
          dialogsState.confirm.resolve = null;
        }
      } finally {
        dialogsState.confirm.isOpen = false;
      }
    }
  },
);

// Отслеживаем изменения состояния для prompt диалога
watch(
  () => dialogsState.prompt.isOpen,
  async (isOpen) => {
    if (isOpen && promptDialog.value) {
      try {
        const result = await promptDialog.value.show(
          dialogsState.prompt.message,
          dialogsState.prompt.defaultValue,
        );
        // Вызываем резолв промиса с результатом
        if (dialogsState.prompt.resolve) {
          dialogsState.prompt.resolve(result);
          dialogsState.prompt.resolve = null;
        }
      } finally {
        dialogsState.prompt.isOpen = false;
      }
    }
  },
);

// Отслеживаем изменения состояния для form диалога
watch(
  () => dialogsState.form.isOpen,
  async (isOpen) => {
    if (isOpen && formDialog.value) {
      try {
        const result = await formDialog.value.show(
          dialogsState.form.title,
          dialogsState.form.fields,
        );
        // Вызываем резолв промиса с результатом
        if (dialogsState.form.resolve) {
          dialogsState.form.resolve(result);
          dialogsState.form.resolve = null;
        }
      } finally {
        dialogsState.form.isOpen = false;
      }
    }
  },
);
</script>

<template>
  <AltAlertDialog ref="alertDialog" :ok-text="okText" />
  <AltConfirmDialog
    ref="confirmDialog"
    :cancel-text="cancelText"
    :confirm-text="confirmText"
  />
  <AltPromptDialog
    ref="promptDialog"
    :ok-text="okText"
    :cancel-text="cancelText"
  />
  <AltFormDialog
    ref="formDialog"
    :ok-text="okText"
    :cancel-text="cancelText"
  />
</template>

<style scoped>
.dialog-content {
  padding: var(--alt-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-4);
  min-width: 20rem;
}

.dialog-message {
  margin: 0;
  color: var(--alt-c-text-1);
}

.dialog-input {
  padding: var(--alt-space-2);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  font-size: var(--alt-font-size-1);
  width: 100%;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--alt-space-2);
  margin-top: var(--alt-space-2);
}

.dialog-button {
  padding: var(--alt-space-2) var(--alt-space-4);
  background-color: var(--alt-c-surface-2);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  cursor: pointer;
  font-weight: var(--alt-font-weight-medium);
  transition: var(--alt-transition-colors);
}

.dialog-button:hover {
  background-color: var(--alt-c-surface-3);
}

.dialog-button.primary {
  background-color: var(--alt-c-brand-1-500);
  color: var(--alt-c-white);
  border: none;
}

.dialog-button.primary:hover {
  background-color: var(--alt-c-brand-1-600);
}
</style>
