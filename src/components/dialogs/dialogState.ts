import { reactive } from "vue";

export interface AlertDialogState {
  message: string;
  isHtml: boolean;
  isOpen: boolean;
  resolve: ((value: void) => void) | null;
}

export interface ConfirmDialogState {
  message: string;
  isOpen: boolean;
  resolve: ((value: boolean) => void) | null;
}

export interface PromptDialogState {
  message: string;
  defaultValue: string;
  isOpen: boolean;
  resolve: ((value: string | null) => void) | null;
}

export interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea";
  value: string;
  placeholder?: string;
}

export interface FormDialogState {
  title: string;
  fields: FormField[];
  isOpen: boolean;
  resolve: ((value: Record<string, string> | null) => void) | null;
}

export interface SidePanelOptions {
  width?: string;
  position?: "left" | "right";
  closeOnOverlay?: boolean;
}

export interface SidePanelDialogState {
  title: string;
  content: any;
  contentProps: Record<string, unknown>;
  options: SidePanelOptions;
  isOpen: boolean;
  resolve: ((value: void) => void) | null;
}

export interface DialogsState {
  alert: AlertDialogState;
  confirm: ConfirmDialogState;
  prompt: PromptDialogState;
  form: FormDialogState;
  sidePanel: SidePanelDialogState;
}

// Создаем единое реактивное состояние для всех диалогов
export const dialogsState = reactive<DialogsState>({
  alert: {
    message: "",
    isHtml: false,
    isOpen: false,
    resolve: null,
  },
  confirm: {
    message: "",
    isOpen: false,
    resolve: null,
  },
  prompt: {
    message: "",
    defaultValue: "",
    isOpen: false,
    resolve: null,
  },
  form: {
    title: "",
    fields: [],
    isOpen: false,
    resolve: null,
  },
  sidePanel: {
    title: "",
    content: null,
    contentProps: {},
    options: {
      width: "560px",
      position: "right",
      closeOnOverlay: true,
    },
    isOpen: false,
    resolve: null,
  },
});
