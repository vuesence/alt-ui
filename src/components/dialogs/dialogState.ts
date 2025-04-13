import { reactive } from "vue";

export interface AlertDialogState {
  message: string;
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

export interface DialogsState {
  alert: AlertDialogState;
  confirm: ConfirmDialogState;
  prompt: PromptDialogState;
}

// Создаем единое реактивное состояние для всех диалогов
export const dialogsState = reactive<DialogsState>({
  alert: {
    message: "",
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
});
