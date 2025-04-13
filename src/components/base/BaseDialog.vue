<script setup lang="ts">
import { ref } from "vue";

const dialog = ref<HTMLDialogElement | null>(null);

function show() {
  dialog.value.showModal();
}
function close() {
  dialog.value.close();
}

function onMouseDown($event: MouseEvent) {
  if ($event.target === dialog.value) {
    const rect = dialog.value.getBoundingClientRect();
    const scrollbarWidth = dialog.value.offsetWidth - dialog.value.clientWidth;

    if ($event.x < rect.right && $event.x > rect.right - scrollbarWidth) {
      return;
    }

    dialog.value.close();
  }
}

defineExpose({ show, close });
</script>

<template>
  <dialog
    ref="dialog"
    role="textbox"
    tabindex="0"
    @mousedown="onMouseDown"
    @keydown1="() => {}"
  >
    <slot @close="close" />
  </dialog>
</template>

<style scoped>
dialog {
  padding: 0;
  color: var(--lh-c-text-1);
  border: 3px solid var(--lh-c-border);
  background-color: var(--lh-c-surface-1);
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

  /*   Open state of the dialog  */
  &[open] {
    opacity: 1;
    transform: translate(-50%, -50%) scaleY(1);
    border-radius: var(--lh-radius-md);
  }
}

/*   Before-open state  */
/* Needs to be after the previous dialog[open] rule to take effect,
    as the specificity is the same */
@starting-style {
  dialog[open] {
    opacity: 0;
    /* transform: translate(-50%, -50%) scaleY(0.8); */
    border-radius: var(--lh-radius-md);
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
