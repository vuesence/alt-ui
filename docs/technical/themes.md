# Темы

Наша система тем предоставляет гибкий подход к управлению цветовыми схемами и визуальными вариациями по всему приложению.

## Типы тем

### 1. Светлая тема
По умолчанию тема с светлым фоном и темным текстом:
- Яркая, чистая эстетика
- Высокая читаемость
- Подходит для хорошо освещенных условий

### 2. Темная тема
Альтернативная тема с темным фоном и светлым текстом:
- Уменьшает нагрузку на глаза
- Снижает яркость экрана
- Идеально подходит для условий низкой освещенности

### 3. Тема высокой контрастности
Тема, ориентированная на доступность, с максимальным контрастом:
- Улучшенная читаемость
- Поддерживает пользователей с нарушениями зрения
- Обеспечивает четкое визуальное различие

## Реализация тем

### Темы на основе атрибутов

Мы используем атрибуты данных для управления вариациями тем:

```css
[data-theme="light"] {
  /* Фон */
  --lh-c-bg: var(--lh-c-white);
  --lh-c-bg-alt: var(--lh-c-gray-50);
  
  /* Текст */
  --lh-c-text-1: var(--lh-c-gray-600);
  --lh-c-text-2: var(--lh-c-gray-500);
  
  /* Поверхность */
  --lh-c-surface-1: var(--lh-c-white);
  --lh-c-surface-2: var(--lh-c-gray-50);
}

[data-theme="dark"] {
  /* Фон */
  --lh-c-bg: var(--lh-c-gray-900);
  --lh-c-bg-alt: var(--lh-c-gray-800);
  
  /* Текст */
  --lh-c-text-1: var(--lh-c-gray-100);
  --lh-c-text-2: var(--lh-c-gray-200);
  
  /* Поверхность */
  --lh-c-surface-1: var(--lh-c-gray-900);
  --lh-c-surface-2: var(--lh-c-gray-800);
}

[data-theme="contrast"] {
  /* Фон */
  --lh-c-bg: var(--lh-c-black);
  
  /* Текст */
  --lh-c-text-1: var(--lh-c-white);
  --lh-c-text-2: var(--lh-c-white);
  
  /* Поверхность */
  --lh-c-surface-1: var(--lh-c-black);
  --lh-c-surface-2: #121212;
}
```

### Механизм переключения тем

Управление темами осуществляется через реактивный композабельный объект настроек:

```typescript
function toggleTheme() {
  settings.darkMode = !settings.darkMode;
  document.documentElement.dataset.theme = 
    settings.darkMode ? 'dark' : 'light';
}

function initTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (settings.darkMode || prefersDark) {
    document.documentElement.dataset.theme = 'dark';
  }
}
```

## Рекомендации по темам

### 1. Доступность
- Поддерживайте системные предпочтения темного режима
- Обеспечьте ручной выбор темы
- Гарантируйте читаемость в разных темах

### 2. Производительность
- Минимизируйте накладные расходы при переключении тем
- Используйте эффективные обновления атрибутов данных
- Уважайте предпочтения пользователя

### 3. Согласованность
- Поддерживайте токены дизайна
- Сохраняйте визуальную иерархию
- Сохраняйте поведение компонентов

## Практический пример

### Компонент переключения темы

```vue
<script setup>
import { useAppSettings } from '@/app/composables/useAppSettings'

const { settings, toggleTheme } = useAppSettings()
</script>

<template>
  <button @click="toggleTheme">
    {{ settings.darkMode ? '☀️' : '🌙' }}
  </button>
</template>
```

## Обнаружение предпочтений системы

```typescript
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
```

## Хранение и постоянство

Предпочтение темы автоматически сохраняется с помощью композабельного объекта `useLocalStorage`, обеспечивая последовательный пользовательский опыт между сессиями. 