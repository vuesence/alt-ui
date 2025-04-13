import { dialogsState } from "./dialogState";

/**
 * Показывает диалог с сообщением и кнопкой "OK"
 * @param message Текст сообщения
 * @returns Promise, который резолвится после закрытия диалога
 */
function alert(message: string): Promise<void> {
  return new Promise<void>((resolve) => {
    dialogsState.alert.message = message;
    dialogsState.alert.resolve = resolve;
    dialogsState.alert.isOpen = true;
  });
}

/**
 * Показывает диалог с сообщением и кнопками "Да" и "Нет"
 * @param message Текст сообщения
 * @returns Promise, который резолвится с boolean значением (true - "Да", false - "Нет")
 */
function confirm(message: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    dialogsState.confirm.message = message;
    dialogsState.confirm.resolve = resolve;
    dialogsState.confirm.isOpen = true;
  });
}

/**
 * Показывает диалог с сообщением, полем ввода и кнопками "OK" и "Отмена"
 * @param message Текст сообщения
 * @param defaultValue Значение по умолчанию для поля ввода
 * @returns Promise, который резолвится со строкой или null (если нажата "Отмена")
 */
function prompt(message: string, defaultValue = ""): Promise<string | null> {
  return new Promise<string | null>((resolve) => {
    dialogsState.prompt.message = message;
    dialogsState.prompt.defaultValue = defaultValue;
    dialogsState.prompt.resolve = resolve;
    dialogsState.prompt.isOpen = true;
  });
}

/**
 * Хук для работы с диалогами
 * Возвращает методы для показа различных типов диалогов
 */
export function useDialogs() {
  return {
    alert,
    confirm,
    prompt,
  };
}

// Экспортируем единый экземпляр сервиса для использования во всем приложении
export const dialogsService = useDialogs();
