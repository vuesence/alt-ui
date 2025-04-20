---
title: Утилиты
---

# Утилиты

Alt-UI включает несколько полезных утилит для работы с CSS, иконками и уведомлениями.

## CSS утилиты

### Описание
Функции для работы с CSS переменными, упрощающие взаимодействие с темами и стилизацию компонентов.

### API

| Функция | Параметры | Возвращаемое значение | Описание |
|---------|-----------|------------------------|----------|
| getCssVar | name: string, element?: HTMLElement | string | Получает значение CSS переменной |
| setCssVar | name: string, value: string, element?: HTMLElement | void | Устанавливает значение CSS переменной |
| toNumber | value: string \| null \| undefined, fallback?: number | number | Преобразует строковое значение CSS в число |

### Пример использования

```typescript
import { getCssVar, setCssVar, toNumber } from 'alt-ui';

// Получение значения CSS переменной
const brandColor = getCssVar('--alt-c-brand-1');
console.log(`Основной цвет бренда: ${brandColor}`);

// Установка значения CSS переменной
setCssVar('--alt-c-brand-1', '#42b883');

// Преобразование строкового значения в число
const fontSize = getCssVar('--alt-font-size-1');
const fontSizeNumber = toNumber(fontSize, 16); // Если значение не может быть преобразовано, вернет 16
console.log(`Размер шрифта в пикселях: ${fontSizeNumber}`);

// Применение к конкретному элементу
const container = document.querySelector('.container');
if (container) {
  setCssVar('--alt-c-background', '#f0f0f0', container);
}
```

## Система иконок

### Описание
Утилиты для загрузки и использования SVG иконок в приложении.

### API

| Функция | Параметры | Возвращаемое значение | Описание |
|---------|-----------|------------------------|----------|
| loadIcons | options: IconsOptions | Promise\<void\> | Загружает иконки для использования в компоненте BaseIcon |

```typescript
interface IconsOptions {
  path?: string;           // Путь к директории с иконками
  names: string[];         // Имена иконок для загрузки
  prefix?: string;         // Префикс для имен иконок
  suffix?: string;         // Суффикс для файлов иконок
  transformName?: (name: string) => string; // Функция для преобразования имен иконок
}
```

### Пример использования

```typescript
// main.ts
import { loadIcons } from 'alt-ui';

loadIcons({
  path: '/icons/',
  names: ['check', 'close', 'arrow-right', 'arrow-left'],
  suffix: '.svg'
}).then(() => {
  console.log('Иконки загружены');
});

// Использование с трансформацией имен
loadIcons({
  path: '/assets/icons/',
  names: ['user', 'settings', 'logout'],
  prefix: 'icon-',
  suffix: '.svg',
  transformName: (name) => name.toLowerCase().replace(/_/g, '-')
});
```

## Toaster (Уведомления)

### Описание
Система для отображения временных уведомлений (тостов) в приложении.

### API

#### Методы объекта `toast`

| Метод | Параметры | Возвращаемое значение | Описание |
|-------|-----------|------------------------|----------|
| success | message: string, options?: ToastOptions | void | Показывает уведомление об успехе |
| error | message: string, options?: ToastOptions | void | Показывает уведомление об ошибке |
| warning | message: string, options?: ToastOptions | void | Показывает предупреждающее уведомление |
| info | message: string, options?: ToastOptions | void | Показывает информационное уведомление |
| custom | message: string, options?: ToastOptions | void | Показывает кастомное уведомление |

#### Типы

```typescript
interface ToastOptions {
  title?: string;         // Заголовок уведомления
  duration?: number;      // Длительность показа в миллисекундах
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  closable?: boolean;     // Можно ли закрыть уведомление
  icon?: string;          // Название иконки
  onClick?: () => void;   // Обработчик клика по уведомлению
}
```

#### Объект `toaster`

| Метод | Параметры | Возвращаемое значение | Описание |
|-------|-----------|------------------------|----------|
| configure | options: ToasterOptions | void | Настраивает глобальные опции для уведомлений |
| clearAll | - | void | Удаляет все активные уведомления |

```typescript
interface ToasterOptions {
  defaultDuration?: number;  // Длительность по умолчанию
  maxToasts?: number;        // Максимальное количество одновременных уведомлений
  defaultPosition?: string;  // Позиция по умолчанию
}
```

### Пример использования

```typescript
import { toast, toaster } from 'alt-ui';

// Настройка глобальных параметров
toaster.configure({
  defaultDuration: 3000,
  maxToasts: 3,
  defaultPosition: 'top-right'
});

// Показ разных типов уведомлений
function showSuccessToast() {
  toast.success('Операция выполнена успешно', {
    title: 'Успех',
    duration: 5000
  });
}

function showErrorToast() {
  toast.error('Произошла ошибка при выполнении операции', {
    title: 'Ошибка',
    closable: true
  });
}

function showInfoToast() {
  toast.info('Новое сообщение получено', {
    onClick: () => {
      // Действие при клике
      console.log('Уведомление нажато');
    }
  });
}

// Очистка всех уведомлений
function clearAllToasts() {
  toaster.clearAll();
}
```

### Использование в компонентах

```vue
<template>
  <div>
    <BaseButton @click="showSuccessToast">Показать успех</BaseButton>
    <BaseButton @click="showErrorToast">Показать ошибку</BaseButton>
    <BaseButton @click="clearAllToasts">Очистить все</BaseButton>
  </div>
</template>

<script setup>
import { BaseButton } from 'alt-ui';
import { toast, toaster } from 'alt-ui';

function showSuccessToast() {
  toast.success('Данные сохранены');
}

function showErrorToast() {
  toast.error('Не удалось загрузить данные');
}

function clearAllToasts() {
  toaster.clearAll();
}
</script>
``` 