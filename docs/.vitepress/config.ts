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
      { text: "Дизайн-система", link: "/foundation/overview" },
      { text: "Техническая документация", link: "/technical/overview" },
      {
        text: "Ресурсы",
        items: [
          { text: "GitHub", link: "https://github.com/vuesence/alt-ui" },
        ],
      },
    ],

    sidebar: [
      {
        text: "Введение",
        items: [
          { text: "О библиотеке", link: "/introduction" },
          { text: "Установка и настройка", link: "/getting-started" },
        ],
      },
      {
        text: "Компоненты",
        collapsed: false,
        items: [
          { text: "Обзор компонентов", link: "/components/overview" },
          { text: "Базовые компоненты", link: "/components/base-components" },
          { text: "Компоненты форм", link: "/components/form-components" },
          { text: "Компоненты диалогов", link: "/components/dialog-components" },
          { text: "Компоненты тем", link: "/components/theme-components" },
          { 
            text: "Интерактивные компоненты", 
            collapsed: false,
            items: [
              { text: "Туры", link: "/components/tour" },
              { text: "Онбординг", link: "/components/onboarding" },
            ]
          },
          { text: "Утилиты", link: "/components/utilities" },
        ],
      },
      {
        text: "Дизайн-система",
        collapsed: false,
        items: [
          { text: "Обзор", link: "/foundation/overview" },
          { 
            text: "Основы", 
            collapsed: false,
            items: [
              { text: "Цвета", link: "/foundation/colors" },
              { text: "Типографика", link: "/foundation/typography" },
              { text: "Отступы и макет", link: "/foundation/spacing-layout" },
              { text: "Иконки", link: "/foundation/icons" },
            ]
          },
          { 
            text: "Токены", 
            collapsed: false,
            items: [
              { text: "Дизайн-токены", link: "/tokens/design-tokens" },
              { text: "Токены компонентов", link: "/tokens/component-tokens" },
            ]
          },
        ],
      },
      {
        text: "Техническая документация",
        collapsed: false,
        items: [
          { text: "Обзор", link: "/technical/overview" },
          { text: "Структура стилей", link: "/technical/style-structure" },
          { text: "Темы", link: "/technical/themes" },
          { text: "API", link: "/technical/api" },
        ],
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/lissa-health/alt-ui" },
    ],

    footer: {
      message: "Документация по Alt-UI",
      copyright: "© 2024 Startup Tools",
    },
  },
}); 