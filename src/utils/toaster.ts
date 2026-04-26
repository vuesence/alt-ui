import { createToaster } from "@ark-ui/vue/toast";

type ToastType = "info" | "success" | "error" | "warning" | "loading";

interface ToastOptions {
  title: string;
  description: string;
  type: ToastType;
  id?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
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

// Track active toasts by content hash to prevent duplicates
const activeToasts = new Map<string, { id: string; timestamp: number }>();
const DEDUP_WINDOW_MS = 3000; // Don't show same toast within 3 seconds

function getToastKey(type: ToastType, description: string): string {
  return `${type}:${description}`;
}

function cleanupExpiredToasts(): void {
  const now = Date.now();
  for (const [key, value] of activeToasts) {
    if (now - value.timestamp > DEDUP_WINDOW_MS) {
      activeToasts.delete(key);
    }
  }
}

const createToast = (type: ToastType, title: string, description: string) => {
  cleanupExpiredToasts();

  const key = getToastKey(type, description);
  const existing = activeToasts.get(key);

  if (existing && Date.now() - existing.timestamp < DEDUP_WINDOW_MS) {
    return existing.id;
  }

  const id = toaster.create({
    title,
    description,
    type,
  });

  activeToasts.set(key, { id, timestamp: Date.now() });
  return id;
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
