# Темы

Наша система тем предоставляет гибкий подход к управлению цветовыми схемами и визуальными вариациями по всему приложению. Она построена на основе компонента ThemeProvider из библиотеки Alt-UI.

## Система тем

### Структура

Система тем в Alt-UI использует двухуровневую архитектуру CSS-переменных:

1. **Базовые дизайн-токены** (`--alt-*`): Низкоуровневые значения дизайна, определенные в библиотеке Alt-UI
2. **Переменные темы** (`--theme-*`): Высокоуровневые семантические переменные, которые ссылаются на дизайн-токены

```css
/* Пример определения темы */
:root[data-theme="light"] {
  /* Цвета поверхности */
  --theme-surface-1: var(--alt-c-white);
  --theme-surface-2: var(--alt-c-gray-50);
  --theme-surface-3: var(--alt-c-gray-100);
  
  /* Цвета текста */
  --theme-text-1: var(--alt-c-gray-900);
  --theme-text-2: var(--alt-c-gray-500);
  --theme-text-3: var(--alt-c-gray-400);
}
```

### Рекомендации по использованию

При стилизации компонентов всегда используйте переменные `--theme-*` вместо базовых дизайн-токенов:

```css
/* Рекомендуется */
.my-component {
  color: var(--theme-text-1);
  background-color: var(--theme-surface-1);
  border: 1px solid var(--theme-border);
}

/* Не рекомендуется */
.my-component {
  color: var(--alt-c-text-1);
  background-color: var(--alt-c-surface-1);
  border: 1px solid var(--alt-c-border);
}
```

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

### 4. Системная тема
Автоматически выбирает светлую или темную тему в зависимости от системных настроек пользователя:
- Учитывает предпочтения пользователя
- Интегрируется с ОС
- Обеспечивает согласованность с системными предпочтениями

## Реализация тем

### Файлы тем

Темы определены в CSS-файлах в каталоге `src/assets/styles/themes/`:

- `lissa-theme-light.css`: Светлая тема
- `lissa-theme-dark.css`: Темная тема
- `lissa-theme-contrast.css`: Тема высокой контрастности
- `lissa-theme-system.css`: Системная тема

### ThemeProvider

Alt-UI использует `themeProvider` для управления темами:

```ts
import { themeProvider } from "alt-ui";

// Применение темы
themeProvider.applyTheme('light');

// Получение текущей темы
const currentTheme = themeProvider.getTheme();

// Получение разрешенной темы (преобразует 'system' в 'light' или 'dark')
const resolvedTheme = themeProvider.getResolvedTheme();
```

### Композабл useTheme

Для упрощения работы с темами в компонентах используется композабл `useTheme`:

```ts
import { useTheme } from "@/app/composables/useTheme";

const { currentTheme, setTheme } = useTheme();

// Изменение темы
function switchToDarkMode() {
  setTheme('dark');
}

// Реактивный доступ к текущей теме
console.log(currentTheme.value); // 'light', 'dark', 'contrast' или 'system'
```

## Переключение тем в интерфейсе

Переключение тем доступно через компонент `AccountButton`, который предоставляет выпадающее меню для выбора темы:

```vue
<script setup>
import { useTheme } from "@/app/composables/useTheme";

const { currentTheme, setTheme } = useTheme();
</script>

<template>
  <div class="theme-selector">
    <button @click="setTheme('light')">Светлая</button>
    <button @click="setTheme('dark')">Темная</button>
    <button @click="setTheme('contrast')">Контрастная</button>
    <button @click="setTheme('system')">Системная</button>
  </div>
</template>
```

## Миграция с alt-ui переменных на theme переменные

Для миграции с прямого использования переменных alt-ui на переменные theme мы используем скрипт `replace-css-vars.js`, который заменяет все ссылки на alt-ui переменные на соответствующие theme переменные:

```js
// Пример запуска скрипта
node src/scripts/replace-css-vars.js
```

Скрипт содержит набор регулярных выражений для замены alt-ui переменных:

```js
const replacements = [
  // Пример замен
  { from: /--alt-c-brand-1-500/g, to: "--theme-primary-500" },
  { from: /--alt-c-text-1/g, to: "--theme-text-1" },
  { from: /--alt-c-surface-1/g, to: "--theme-surface-1" },
];
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
- Используйте только переменные `--theme-*` в компонентах
- Поддерживайте визуальную иерархию
- Сохраняйте поведение компонентов

## Доступные переменные темы

Система тем предоставляет комплексный набор переменных:

- **Цвета**
  - Primary: `--theme-primary-{50-900}`
  - Secondary: `--theme-secondary-{50-900}`
  - Accent: `--theme-accent-{50-900}`
  - Neutral: `--theme-neutral-{50-900}`
  - Functional: `--theme-success`, `--theme-warning`, `--theme-danger`, `--theme-info`

- **Поверхности**: `--theme-surface-{1-5}`
- **Текст**: `--theme-text-{1-3}`
- **Фон**: `--theme-bg`, `--theme-bg-alt`, `--theme-bg-soft`
- **Границы**: `--theme-border`, `--theme-divider`
- **Типографика**: `--theme-font-family-{base|heading|mono}`
- **Тени**: `--theme-shadow-{1-5}`
- **Скругления**: `--theme-radius-{sm|base|md|lg|xl|full}`

## Хранение и персистентность

Предпочтение темы автоматически сохраняется в localStorage, обеспечивая согласованный пользовательский опыт между сессиями. 