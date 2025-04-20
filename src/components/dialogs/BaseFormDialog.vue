<script setup lang="ts">
import { ref } from "vue";
import BaseDialog from "../base/BaseDialog.vue";

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea';
  value: string;
  placeholder?: string;
}

interface FormDialogProps {
  cancelText?: string;
  okText?: string;
}

const props = defineProps<FormDialogProps>();

const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);
const title = ref("");
const fields = ref<FormField[]>([]);
const resolvePromise = ref<((result: Record<string, string> | null) => void) | null>(null);

function show(dialogTitle: string, formFields: FormField[]): Promise<Record<string, string> | null> {
  title.value = dialogTitle;
  fields.value = formFields;
  dialog.value?.show();

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
}

function onConfirm() {
  const formData: Record<string, string> = {};
  fields.value.forEach(field => {
    formData[field.id] = field.value;
  });
  
  resolvePromise.value?.(formData);
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
    <div class="form-dialog" data-testid="form-dialog">
      <div class="form-content">
        <h3 class="form-title">{{ title }}</h3>
        
        <div class="form-fields">
          <div v-for="field in fields" :key="field.id" class="form-field">
            <label :for="field.id">{{ field.label }}</label>
            <textarea 
              v-if="field.type === 'textarea'"
              :id="field.id"
              v-model="field.value"
              :placeholder="field.placeholder || ''"
              class="form-textarea"
            ></textarea>
            <input
              v-else
              :id="field.id"
              v-model="field.value"
              type="text"
              class="form-input"
              :placeholder="field.placeholder || ''"
            />
          </div>
        </div>
        
        <div class="form-actions">
          <button
            class="btn btn-secondary"
            data-testid="form-dialog-cancel"
            @click="onCancel"
          >
            {{ cancelText || 'Cancel' }}
          </button>
          <button
            class="btn btn-primary"
            data-testid="form-dialog-confirm"
            @click="onConfirm"
          >
            {{ okText || 'OK' }}
          </button>
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<style scoped>
.form-dialog {
  padding: var(--alt-space-4);
  min-width: 400px;
  max-width: 90vw;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-4);
}

.form-title {
  text-align: center;
  margin: 0;
  color: var(--alt-c-text-1);
  font-size: var(--alt-font-size-3);
  font-weight: var(--alt-font-weight-medium);
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-3);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-2);
}

.form-field label {
  font-size: var(--alt-font-size-1);
  color: var(--alt-c-text-2);
}

.form-input,
.form-textarea {
  padding: var(--alt-space-2);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  font-size: var(--alt-font-size-1);
  background-color: var(--alt-c-surface-2);
  color: var(--alt-c-text-1);
  width: 100%;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
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
  font-size: var(--alt-font-size-1);
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