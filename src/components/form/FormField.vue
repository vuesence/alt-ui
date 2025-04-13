<script setup lang="ts">
import { ref, type PropType } from "vue";

interface FormFieldData {
  isValid: boolean;
  error?: string;
}

interface FormFieldProps {
  /**
   * Form field data containing validation state
   */
  field?: FormFieldData;
  /**
   * Title text for the field
   */
  title?: string;
  /**
   * Whether to show validation state
   */
  validate?: boolean;
}

const props = withDefaults(defineProps<FormFieldProps>(), {
  field: undefined,
  title: "",
  validate: false,
});

const touched = ref(false);
const visited = ref(false);
</script>

<template>
  <div class="form-field">
    <div v-if="props.title" class="title">
      {{ props.title }}
    </div>
    <slot
      :touch="
        () => {
          touched = true;
        }
      "
      :blur="
        () => {
          visited = true;
        }
      "
    />
    <Transition>
      <div
        v-show="
          !props.field?.isValid && ((touched && visited) || props.validate)
        "
        class="error-msg"
      >
        {{ props.field?.error }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.form-field {
  position: relative;
}

.title {
  font-size: var(--lh-font-size-0);
  font-weight: var(--lh-font-weight-bold);
  margin-bottom: 0;
  color: var(--lh-c-text-3);
}

.error-msg {
  position: absolute;
  top: 100%;
  left: 0;
  color: var(--lh-c-danger);
  margin-top: var(--lh-space-1);
  font-size: var(--lh-font-size-0);
  line-height: var(--lh-line-height-1);
}

.v-enter-active,
.v-leave-active {
  transition: opacity var(--lh-transition-base) var(--lh-ease-out);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
