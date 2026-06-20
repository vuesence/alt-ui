import type { InjectionKey, Ref } from "vue";

export interface AltTabsContextValue {
  activeValue: Readonly<Ref<string>>;
  selectTab: (value: string) => void;
  isSelected: (value: string) => boolean;
  registerTrigger: (value: string, element: HTMLElement) => void;
  unregisterTrigger: (value: string, element: HTMLElement) => void;
  focusSibling: (
    currentValue: string,
    direction: "next" | "previous" | "first" | "last",
  ) => void;
}

export const ALT_TABS_CONTEXT: InjectionKey<AltTabsContextValue> =
  Symbol("ALT_TABS_CONTEXT");
