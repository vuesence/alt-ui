<script setup lang="ts">
/**
 * @component AltDialog
 * @description Base modal dialog wrapper using native HTML <dialog> element.
 * Provides show/close via template ref. Closes on backdrop click and Escape key.
 *
 * @example
 * <AltDialog ref="dialogRef">
 *   <div>Dialog content</div>
 * </AltDialog>
 *
 * @slot default - Dialog content. Receives `close` function as slot prop.
 * @expose show - Opens the dialog as a modal
 * @expose close - Closes the dialog
 * @dependency none
 */
import { nextTick, onBeforeUnmount, ref } from "vue";
import { createFocusTrap, type FocusTrap } from "../../utils/useFocusTrap";

const props = defineProps<{
  ariaLabelledby?: string;
  ariaLabel?: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

const dialog = ref<HTMLDialogElement | null>(null);
let focusTrap: FocusTrap | null = null;

function releaseFocusTrap(returnFocus = true) {
  focusTrap?.deactivate(returnFocus);
  focusTrap = null;
}

function show() {
  if (!dialog.value) {
    return;
  }

  releaseFocusTrap(false);
  focusTrap = createFocusTrap(dialog.value);
  focusTrap.activate();
  dialog.value.showModal();

  nextTick(() => {
    focusTrap?.focusFirst();
  });
}

function close() {
  releaseFocusTrap(true);

  if (dialog.value?.open) {
    dialog.value.close();
  }
}

function onMouseDown($event: MouseEvent) {
  if ($event.target === dialog.value && dialog.value) {
    const rect = dialog.value.getBoundingClientRect();
    const scrollbarWidth = dialog.value.offsetWidth - dialog.value.clientWidth;

    if ($event.x < rect.right && $event.x > rect.right - scrollbarWidth) {
      return;
    }

    close();
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    close();
  }
}

function onClose() {
  releaseFocusTrap(true);
  emit("close");
}

onBeforeUnmount(() => {
  releaseFocusTrap(false);
});

defineExpose({ show, close });
</script>

<template>
  <dialog
    ref="dialog"
    aria-modal="true"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    tabindex="-1"
    @mousedown="onMouseDown"
    @keydown="onKeydown"
    @close="onClose"
  >
    <slot :close="close" />
  </dialog>
</template>

<style scoped>
dialog {
  padding: 0;
  color: var(--alt-c-text-1);
  border: 3px solid var(--alt-c-border);
  background-color: var(--alt-c-surface-1);
  opacity: 0;
  /* transform: scaleY(0.8); */
  transition: all 0.2s allow-discrete;

  /* Center the dialog */
  position: fixed;
  top: 50%;
  left: 50%;
  /* transform: translate(-50%, -50%) scaleY(0.8); */
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
  width: fit-content;
  height: fit-content;
  overflow: hidden; /* Prevent dialog from scrolling - content should handle its own scroll */

  /*   Open state of the dialog  */
  &[open] {
    opacity: 1;
    transform: translate(-50%, -50%) scaleY(1);
    border-radius: var(--alt-radius-md);
  }
}

/*   Before-open state  */
/* Needs to be after the previous dialog[open] rule to take effect,
    as the specificity is the same */
@starting-style {
  dialog[open] {
    opacity: 0;
    /* transform: translate(-50%, -50%) scaleY(0.8); */
    border-radius: var(--alt-radius-md);
  }
}

/* Transition the :backdrop when the dialog modal is promoted to the top layer */
dialog::backdrop {
  background-color: rgb(0 0 0 / 0%);
  transition:
    display 0.4s allow-discrete,
    overlay 0.4s allow-discrete,
    background-color 0.3s;
  /* Equivalent to
  transition: all 0.7s allow-discrete; */
}

dialog[open]::backdrop {
  background-color: rgb(0 0 0 / 25%);
}

/* This starting-style rule cannot be nested inside the above selector
because the nesting selector cannot represent pseudo-elements. */

@starting-style {
  dialog[open]::backdrop {
    background-color: rgb(0 0 0 / 0%);
  }
}
</style>
