import { createToaster } from "@ark-ui/vue/toast";

type ToastType = "info" | "success" | "error" | "warning" | "loading";

interface ToastOptions {
  title: string;
  description: string;
  type: ToastType;
  id?: string;
  duration?: number;
}

// Дефолтные заголовки для типов уведомлений
let defaultTitles: Record<ToastType, string> = {
  info: "Information",
  success: "Success",
  error: "Error",
  warning: "Warning",
  loading: "Loading",
};

export const toaster = createToaster({
  placement: "bottom",
  gap: 12,
  // duration: 300000,
});

const createToast = (type: ToastType, title: string, description: string) => {
  return toaster.create({
    title,
    description,
    type,
  });
};

// Функция для установки кастомных дефолтных заголовков
export const setDefaultTitles = (
  titles: Partial<Record<ToastType, string>>
) => {
  defaultTitles = { ...defaultTitles, ...titles };
};

export const toast = {
  create: (options: ToastOptions) => toaster.create(options),
  info: (description: string, title?: string) => {
    return createToast("info", title ?? defaultTitles.info, description);
  },
  success: (description: string, title?: string) =>
    createToast("success", title ?? defaultTitles.success, description),
  error: (description: string, title?: string) =>
    createToast("error", title ?? defaultTitles.error, description),
  warning: (description: string, title?: string) =>
    createToast("warning", title ?? defaultTitles.warning, description),
  loading: (description: string, title?: string) =>
    createToast("loading", title ?? defaultTitles.loading, description),
  dismiss: (id: string) => toaster.dismiss(id),
};
