import { createToaster } from "@ark-ui/vue/toast";

// Дефолтные заголовки для типов уведомлений
const defaultTitles = {
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

const createToast = (type: string, title: string, description: string) => {
  return toaster.create({
    title,
    description,
    type,
  });
};

export const toast = {
  create: (options) => toaster.create(options),
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
