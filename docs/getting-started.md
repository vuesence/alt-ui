# Начало работы

Это руководство поможет вам начать использовать Alt-UI в вашем Vue 3 проекте.

## Установка

### Предварительные требования
- Node.js 16.x или выше
- Vue 3.0 или выше
- npm/yarn/pnpm

### Установка через npm/yarn/pnpm

```bash
# npm
npm install alt-ui

# yarn
yarn add alt-ui

# pnpm
pnpm add alt-ui
```

### Установка через Git Submodule

Вы также можете использовать Alt-UI как Git подмодуль в вашем проекте:

```bash
# Клонирование репозитория как подмодуль
git submodule add https://github.com/lissa-health/alt-ui.git submodules/alt-ui

# Инициализация и обновление подмодуля
git submodule update --init --recursive
```

Затем в package.json вашего проекта:

```json
{
  "dependencies": {
    "alt-ui": "file:submodules/alt-ui"
  }
}
```

## Интеграция в проект

### Импорт стилей

Для использования Alt-UI вам необходимо импортировать основные стили компонентов. Добавьте следующую строку в ваш основной файл (например, main.ts):

```typescript
// Импорт основных стилей
import 'alt-ui/styles';
```

### Использование компонентов

Существует несколько способов использования компонентов Alt-UI:

#### Глобальная регистрация компонентов

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import { BaseButton, BaseInput } from 'alt-ui';

const app = createApp(App);

app.component('BaseButton', BaseButton);
app.component('BaseInput', BaseInput);

app.mount('#app');
```

#### Локальный импорт в компонентах

```vue
<script setup>
import { BaseButton, BaseInput } from 'alt-ui';
</script>

<template>
  <BaseButton>Нажми меня</BaseButton>
  <BaseInput placeholder="Введите текст" />
</template>
```

## Настройка темы

Alt-UI поддерживает кастомизацию через CSS переменные. Вы можете переопределить дизайн-токены для адаптации под свой дизайн.

```css
:root {
  --lh-c-brand-1-500: #007bff; /* Основной цвет бренда */
  --lh-c-text-1: #2c3e50; /* Основной цвет текста */
  --lh-radius-base: 4px; /* Базовый радиус скругления */
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
- Посмотрите примеры [Паттернов использования](/components/patterns) для эффективной реализации интерфейсов 