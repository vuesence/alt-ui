// Base Components
export { default as AltButton } from "./components/base/AltButton.vue";
export { default as AltIcon } from "./components/base/AltIcon.vue";
export { default as AltDialog } from "./components/base/AltDialog.vue";
export { default as AltHoverCard } from "./components/base/AltHoverCard.vue";
export { default as AltMenu } from "./components/base/AltMenu.vue";
export { default as AltSpinner } from "./components/base/AltSpinner.vue";
export { default as AltTable } from "./components/base/AltTable.vue";
export { default as AltTabs } from "./components/base/AltTabs.vue";
export { default as AltToggleGroup } from "./components/base/AltToggleGroup.vue";
export { default as AltSegmentGroup } from "./components/base/AltSegmentGroup.vue";
export { default as AltCollapsableBox } from "./components/base/AltCollapsableBox.vue";
export { default as AltCarousel } from "./components/base/AltCarousel.vue";
export { default as AltEditableTable } from "./components/base/AltEditableTable.vue";
export { default as AltEditableText } from "./components/base/AltEditableText.vue";
export { default as AltToaster } from "./components/base/AltToaster.vue";

// Form Components
export { default as AltInput } from "./components/form/AltInput.vue";
export { default as AltCheckbox } from "./components/form/AltCheckbox.vue";
export { default as AltCombobox } from "./components/form/AltCombobox.vue";
export { default as AltRadioGroup } from "./components/form/AltRadioGroup.vue";
export { default as AltSelect } from "./components/form/AltSelect.vue";
export { default as AltSwitch } from "./components/form/AltSwitch.vue";
export { default as FormField } from "./components/form/FormField.vue";

// Dialogs
export { useDialogs, dialogsService } from "./components/dialogs/useDialogs";
export { default as DialogsManager } from "./components/dialogs/DialogsManager.vue";
export { default as AltFormDialog } from "./components/dialogs/AltFormDialog.vue";
export { default as AltPromptDialog } from "./components/dialogs/AltPromptDialog.vue";

// Onboarding Components
export { default as OnboardingTooltip } from "./components/Onboarding/OnboardingTooltip.vue";
export { useOnboarding } from "./components/Onboarding/useOnboarding";
export type { OnboardingTooltipConfig, TooltipPlacement } from "./components/Onboarding/useOnboarding";

// Tour Components
export { default as TourComponent } from "./components/Tour/TourComponent.vue";
export { default as TourStepContent } from "./components/Tour/TourStepContent.vue";
export { useTourManager } from "./components/Tour/useTourManager";
export { useTourKeyboardEvents } from "./components/Tour/useTourKeyboardEvents";
export { Tour } from "./components/Tour/Tour";
export type { TourData, TourStepData, TourStepAction } from "./components/Tour/types";

// Theme Components
export { ThemeProvider, themeProvider } from "./components/ThemeProvider";
export { ThemeToggle, ThemeToggleVue } from "./components/ThemeToggle";

// Utils
export { loadIcons } from "./utils/icons";
export { getCssVar, setCssVar, toNumber } from "./utils/css";
export { toast, toaster } from "./utils/toaster";

// Types - export from table
export * from "./types/table";
export type { ThemeName, ThemeProviderOptions } from "./components/ThemeProvider";
export type { ThemeToggleOptions } from "./components/ThemeToggle";
