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
  --alt-c-bg: var(--alt-c-white);
  --alt-c-bg-alt: var(--alt-c-gray-50);
  
  /* Текст */
  --alt-c-text-1: var(--alt-c-gray-600);
  --alt-c-text-2: var(--alt-c-gray-500);
  
  /* Поверхность */
  --alt-c-surface-1: var(--alt-c-white);
  --alt-c-surface-2: var(--alt-c-gray-50);
}

[data-theme="dark"] {
  /* Фон */
  --alt-c-bg: var(--alt-c-gray-900);
  --alt-c-bg-alt: var(--alt-c-gray-800);
  
  /* Текст */
  --alt-c-text-1: var(--alt-c-gray-100);
  --alt-c-text-2: var(--alt-c-gray-200);
  
  /* Поверхность */
  --alt-c-surface-1: var(--alt-c-gray-900);
  --alt-c-surface-2: var(--alt-c-gray-800);
}

[data-theme="contrast"] {
  /* Фон */
  --alt-c-bg: var(--alt-c-black);
  
  /* Текст */
  --alt-c-text-1: var(--alt-c-white);
  --alt-c-text-2: var(--alt-c-white);
  
  /* Поверхность */
  --alt-c-surface-1: var(--alt-c-black);
  --alt-c-surface-2: #121212;
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