---
title: Компоненты тем
---

# Компоненты тем

Alt-UI включает компоненты и утилиты для управления темами приложения, обеспечивая поддержку светлой, темной и системной тем.

## ThemeProvider

### Описание
Сервис для инициализации и управления темами в приложении. Позволяет устанавливать текущую тему, сохранять выбор пользователя и реагировать на системные настройки.

### API

#### Типы

```typescript
type ThemeName = 'light' | 'dark' | 'system';

interface ThemeProviderOptions {
  defaultTheme?: ThemeName;
  storageKey?: string;
  storageProvider?: Storage;
}
```

#### Методы

| Метод | Параметры | Возвращаемое значение | Описание |
|-------|-----------|------------------------|----------|
| initialize | options: ThemeProviderOptions | void | Инициализирует провайдер тем с указанными настройками |
| applyTheme | theme: ThemeName | void | Применяет указанную тему |
| getCurrentTheme | - | ThemeName | Возвращает имя текущей темы |
| getEffectiveTheme | - | 'light' \| 'dark' | Возвращает фактически примененную тему (после обработки системной темы) |
| toggleTheme | - | void | Переключает между светлой и темной темами |

### Пример использования

```typescript
// main.ts
import { themeProvider } from 'alt-ui';

// Инициализация с настройками
themeProvider.initialize({
  defaultTheme: 'system',
  storageKey: 'app-theme'
});

// В компоненте
function changeTheme(theme: 'light' | 'dark' | 'system') {
  themeProvider.applyTheme(theme);
}

// Получение текущей темы
const currentTheme = themeProvider.getCurrentTheme();
console.log(`Текущая тема: ${currentTheme}`);

// Переключение темы
function toggleAppTheme() {
  themeProvider.toggleTheme();
}
```

## ThemeToggle

### Описание
Компонент переключателя тем с возможностью выбора между светлой, темной и системной темами.

### Компоненты

#### ThemeToggleVue

Готовый компонент для переключения тем с предустановленным дизайном.

##### Props

| Название | Тип | По умолчанию | Обязательный | Описание |
|----------|-----|--------------|--------------|----------|
| size | 'sm' \| 'md' \| 'lg' | 'md' | Нет | Размер переключателя |

##### Пример использования

```vue
<template>
  <ThemeToggleVue size="md" />
</template>

<script setup>
import { ThemeToggleVue } from 'alt-ui';
</script>
```

#### ThemeToggle (Функциональный компонент)

Настраиваемый компонент для интеграции с пользовательским интерфейсом.

##### Типы

```typescript
interface ThemeToggleOptions {
  onChange?: (theme: ThemeName) => void;
}
```

##### Методы

| Метод | Параметры | Возвращаемое значение | Описание |
|-------|-----------|------------------------|----------|
| setup | options?: ThemeToggleOptions | { theme: Ref\<ThemeName\>, setTheme: Function, toggleTheme: Function } | Инициализирует хук для использования в компонентах |

##### Пример использования

```vue
<template>
  <div class="theme-toggle">
    <button @click="() => setTheme('light')" :class="{ active: theme === 'light' }">
      Светлая
    </button>
    <button @click="() => setTheme('dark')" :class="{ active: theme === 'dark' }">
      Темная
    </button>
    <button @click="() => setTheme('system')" :class="{ active: theme === 'system' }">
      Системная
    </button>
  </div>
</template>

<script setup>
import { ThemeToggle } from 'alt-ui';

const { theme, setTheme } = ThemeToggle.setup({
  onChange: (newTheme) => {
    console.log(`Тема изменена на: ${newTheme}`);
  }
});
</script>
```

## Стилизация тем

Alt-UI использует CSS переменные для определения цветов, размеров и других свойств темы. Вы можете переопределить переменные для кастомизации тем.

### Основные переменные тем

```css
:root {
  /* Светлая тема (по умолчанию) */
  --alt-c-background: #ffffff;
  --alt-c-surface-1: #f9fafb;
  --alt-c-surface-2: #f3f4f6;
  --alt-c-surface-3: #e5e7eb;
  
  --alt-c-text-1: #111827;
  --alt-c-text-2: #374151;
  --alt-c-text-3: #6b7280;
  
  --alt-c-brand-1: #2563eb;
  --alt-c-brand-1-600: #1d4ed8;
  --alt-c-brand-1-400: #3b82f6;
  --alt-c-brand-1-200: #93c5fd;
  
  --alt-c-border: #e5e7eb;
}

.dark-theme {
  /* Темная тема */
  --alt-c-background: #0f172a;
  --alt-c-surface-1: #1e293b;
  --alt-c-surface-2: #334155;
  --alt-c-surface-3: #475569;
  
  --alt-c-text-1: #f9fafb;
  --alt-c-text-2: #e5e7eb;
  --alt-c-text-3: #9ca3af;
  
  --alt-c-brand-1: #3b82f6;
  --alt-c-brand-1-600: #2563eb;
  --alt-c-brand-1-400: #60a5fa;
  --alt-c-brand-1-200: #93c5fd;
  
  --alt-c-border: #334155;
}
```

### Пример кастомизации темы

```css
/* custom-theme.css */
:root {
  --alt-c-brand-1: #10b981; /* Смена основного цвета на зеленый */
  --alt-c-brand-1-600: #059669;
  --alt-c-brand-1-400: #34d399;
  --alt-c-brand-1-200: #a7f3d0;
}

.dark-theme {
  --alt-c-brand-1: #10b981;
  --alt-c-brand-1-600: #059669;
  --alt-c-brand-1-400: #34d399;
  --alt-c-brand-1-200: #a7f3d0;
}
``` 