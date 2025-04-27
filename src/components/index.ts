// Base Components
export * from "./base";

// Form Components
export * from "./form";

// Navigation Components
// export * from "./navigation";

// Feedback Components
// export * from "./feedback";

// Onboarding Components
export * from "./Onboarding";

// Tour Components
export * from "./Tour";

export { default as AltIcon } from "./base/AltIcon.vue";
export { default as AltButton } from "./base/AltButton.vue";
export { default as AltCheckbox } from "./form/AltCheckbox.vue";
export { default as AltRadioGroup } from "./form/AltRadioGroup.vue";
export { default as AltSelect } from "./form/AltSelect.vue";
export { default as AltEditableText } from "./base/AltEditableText.vue";
export { default as AltEditableTable } from "./base/AltEditableTable.vue";
export { default as AltToaster } from "./base/AltToaster.vue";
export { default as AltCollapsableHint } from "./base/AltCollapsableHint.vue";
export { toast, toaster } from "../utils/toaster";

export { default as AltDialog } from "./base/AltDialog.vue";
// export { default as AltAlertDialog } from "./dialogs/AltAlertDialog.vue";
// export { default as AltConfirmDialog } from "./base/AltConfirmDialog.vue";
// export { default as AltPromptDialog } from "./dialogs/AltPromptDialog.vue";
export { useDialogs } from "./dialogs/useDialogs";
