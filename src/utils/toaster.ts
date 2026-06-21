import { toast as sonnerToast } from "vue-sonner";

type ToastType = "info" | "success" | "error" | "warning" | "loading";
type ToastId = string;

interface ToastOptions {
  title: string;
  description: string;
  type: ToastType;
  id?: ToastId;
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

// Track active toasts by content hash to prevent duplicates
const activeToasts = new Map<string, { id: ToastId; timestamp: number }>();
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

interface SonnerToastConfig {
  id?: string | number;
  duration?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function createSonnerConfig(
  description: string,
  options?: Pick<ToastOptions, "id" | "duration" | "action">,
): SonnerToastConfig {
  return {
    id: options?.id,
    duration: options?.duration,
    description,
    action: options?.action,
  };
}

function showToast(
  type: ToastType,
  title: string,
  description: string,
  options?: Pick<ToastOptions, "id" | "duration" | "action">,
): ToastId {
  const config = createSonnerConfig(description, options);
  let id: string | number;

  if (type === "success") {
    id = sonnerToast.success(title, config);
    return String(id);
  }

  if (type === "error") {
    id = sonnerToast.error(title, config);
    return String(id);
  }

  if (type === "warning") {
    id = sonnerToast.warning(title, config);
    return String(id);
  }

  if (type === "loading") {
    id = sonnerToast.loading(title, config);
    return String(id);
  }

  id = sonnerToast.info(title, config);
  return String(id);
}

const createToast = (
  type: ToastType,
  title: string,
  description: string,
  options?: Pick<ToastOptions, "id" | "duration" | "action">,
) => {
  cleanupExpiredToasts();

  const key = getToastKey(type, description);
  const existing = activeToasts.get(key);

  if (existing && Date.now() - existing.timestamp < DEDUP_WINDOW_MS) {
    return existing.id;
  }

  const id = showToast(type, title, description, options);

  activeToasts.set(key, { id, timestamp: Date.now() });
  return id;
};

export const toaster = {
  create: (options: ToastOptions): ToastId => {
    return showToast(
      options.type,
      options.title,
      options.description,
      options,
    );
  },
  dismiss: (id?: ToastId): void => {
    if (id === undefined || id === null) {
      sonnerToast.dismiss();
      activeToasts.clear();
      return;
    }

    sonnerToast.dismiss(id);
    for (const [key, value] of activeToasts) {
      if (value.id === id) {
        activeToasts.delete(key);
      }
    }
  },
};

// Функция для установки кастомных дефолтных заголовков
export const setDefaultTitles = (
  titles: Partial<Record<ToastType, string>>,
) => {
  defaultTitles = { ...defaultTitles, ...titles };
};

export const toast = {
  create: (options: ToastOptions): ToastId => toaster.create(options),
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
  dismiss: (id?: ToastId) => toaster.dismiss(id),
};
