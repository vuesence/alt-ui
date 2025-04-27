---
title: Установка и настройка
---

# Установка и настройка

## Установка пакета

Вы можете установить Alt-UI с помощью npm, yarn или pnpm:

```bash
# npm
npm install alt-ui

# yarn
yarn add alt-ui

# pnpm
pnpm add alt-ui
```

## Требования

- Vue 3.2+
- Vite или Vue CLI для сборки проекта
- TypeScript (опционально, но рекомендуется)

## Базовая настройка

### Импорт стилей

Импортируйте базовые стили библиотеки в точке входа вашего приложения:

```js
// main.js / main.ts
import { createApp } from 'vue'
import App from './App.vue'
import 'alt-ui/styles' // Импорт CSS

const app = createApp(App)
app.mount('#app')
```

### Настройка провайдера темы

Для поддержки тем, подключите `ThemeProvider`:

```js
// main.js / main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { themeProvider } from 'alt-ui'
import 'alt-ui/styles'

// Настройка темы
themeProvider.initialize({
  defaultTheme: 'light', // 'light', 'dark' или 'system'
  storageKey: 'app-theme', // ключ для localStorage
})

const app = createApp(App)
app.mount('#app')
```

## Использование компонентов

Компоненты можно импортировать напрямую из библиотеки:

```vue
<script setup>
import { AltButton, AltInput } from 'alt-ui'
</script>

<template>
  <div>
    <AltInput label="Имя пользователя" placeholder="Введите имя" />
    <AltButton>Отправить</AltButton>
  </div>
</template>
```

## Настройка диалогов

Для использования диалогов необходимо добавить компонент `DialogsManager` в корневой компонент приложения:

```vue
<script setup>
import { DialogsManager } from 'alt-ui'
</script>

<template>
  <div id="app">
    <!-- Ваше приложение -->
    <DialogsManager />
  </div>
</template>
```

После этого вы можете использовать диалоги через хук `useDialogs`:

```vue
<script setup>
import { useDialogs } from 'alt-ui'

const { alert, confirm, prompt, form } = useDialogs()

function showAlert() {
  alert('Операция выполнена успешно')
}

function confirmAction() {
  confirm('Вы действительно хотите продолжить?').then(result => {
    if (result) {
      // Пользователь нажал "Да"
      console.log('Пользователь подтвердил действие')
    }
  })
}
</script>
```

## Использование уведомлений (toasts)

Библиотека предоставляет сервис для показа уведомлений:

```vue
<script setup>
import { toast } from 'alt-ui'

function showNotification() {
  toast.success('Операция выполнена успешно')
}
</script>
```

## Настройка темы

Alt-UI поддерживает кастомизацию через CSS переменные. Вы можете переопределить дизайн-токены для адаптации под свой дизайн.

```css
:root {
  --alt-c-brand-1-500: #007bff; /* Основной цвет бренда */
  --alt-c-text-1: #2c3e50; /* Основной цвет текста */
  --alt-radius-base: 4px; /* Базовый радиус скругления */
}
```

См. раздел [Токены](/tokens/design-tokens) для полного списка переменных.

## Использование с Vite

Для оптимального использования с Vite рекомендуется настроить alias:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'alt-ui': path.resolve(__dirname, './node_modules/alt-ui'),
      // Или для использования с подмодулем:
      // 'alt-ui': path.resolve(__dirname, './submodules/alt-ui/src'),
    }
  },
  plugins: [vue()],
});
```

## Следующие шаги

- Изучите [Обзор компонентов](/components/overview) для знакомства с доступными компонентами
- Познакомьтесь с [Дизайн-системой](/overview) для понимания принципов дизайна
