import { defineConfig } from "vitepress";
import { configureDiagramsPlugin } from "vitepress-plugin-diagrams";

export default defineConfig({
  title: "Alt-UI",
  description: "Vue 3 UI Kit компонентная библиотека",
  lang: "ru-RU",
  lastUpdated: true,
  markdown: {
    config: (md) => {
      configureDiagramsPlugin(md, {
        diagramsDir: "docs/public/diagrams",
        publicPath: "/diagrams",
      });
    },
  },
  head: [
    [
      "script",
      { id: "theme-script" },
      `
      // Инициализация темы перед гидратацией Vue
      ;(() => {
        const saved = localStorage.getItem('vitepress-theme-appearance')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        
        // Явно устанавливаем 'dark' или 'light', приоритизируя сохраненные предпочтения
        const theme = saved === 'dark' ? 'dark' : 
                      saved === 'light' ? 'light' : 
                      prefersDark ? 'dark' : 'light'
        
        document.documentElement.setAttribute('data-theme', theme)
      })()
    `,
    ],
  ],

  themeConfig: {
    nav: [
      { text: "Начало работы", link: "/introduction" },
      { text: "Компоненты", link: "/components/overview" },
      { text: "Дизайн-система", link: "/overview" },
      {
        text: "Другие ресурсы",
        items: [
          { text: "GitHub", link: "https://github.com/lissa-health/alt-ui" },
          { text: "Lissa Health", link: "https://lissa-health.com" },
        ],
      },
    ],

    sidebar: [
      {
        text: "Введение",
        items: [
          { text: "О библиотеке", link: "/introduction" },
          { text: "Начало работы", link: "/getting-started" },
          { text: "Обзор", link: "/overview" },
        ],
      },
      {
        text: "Компоненты",
        items: [
          { text: "Обзор", link: "/components/overview" },
          { text: "Базовые компоненты", link: "/components/base-components" },
          { text: "Компоненты форм", link: "/components/form-components" },
          { text: "Паттерны использования", link: "/components/patterns" },
        ],
      },
      {
        text: "Основы",
        items: [
          { text: "Цвета", link: "/foundation/colors" },
          { text: "Типографика", link: "/foundation/typography" },
          { text: "Отступы и макет", link: "/foundation/spacing-layout" },
          { text: "Иконки", link: "/foundation/icons" },
        ],
      },
      {
        text: "Токены",
        items: [
          { text: "Дизайн-токены", link: "/tokens/design-tokens" },
          { text: "Токены компонентов", link: "/tokens/component-tokens" },
        ],
      },
      {
        text: "Техническая часть",
        items: [
          { text: "Структура стилей", link: "/technical/style-structure" },
          { text: "Темы", link: "/technical/themes" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/lissa-health/alt-ui" },
    ],

    footer: {
      message: "Документация по Alt-UI",
      copyright: "© 2024 Lissa Health",
    },
  },
}); 