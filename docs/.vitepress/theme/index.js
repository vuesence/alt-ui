// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp() {
    // Клиентский скрипт
    if (typeof window !== "undefined") {
      // Функция для обновления атрибута
      const updateThemeAttribute = () => {
        const html = document.documentElement;
        const theme = html.classList.contains("dark") ? "dark" : "light";
        html.dataset.theme = theme;
      };

      // Инициализация при загрузке
      window.addEventListener("DOMContentLoaded", () => {
        updateThemeAttribute();

        // Наблюдатель за изменениями класса
        const observer = new MutationObserver(updateThemeAttribute);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
      });

      // Синхронизация с системными настройками
      const handleSystemThemeChange = () => {
        if (!localStorage.getItem("vitepress-theme-appearance")) {
          updateThemeAttribute();
        }
      };

      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", handleSystemThemeChange);
    }
  },
}; 