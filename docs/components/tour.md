# Компоненты туров

Компоненты туров предоставляют интерактивный способ проведения пользователей по вашему приложению, выделяя важные функции и возможности.

## TourComponent

Компонент `TourComponent` отображает пошаговый тур по вашему приложению, выделяя элементы и показывая инструкции.

### Использование

```vue
<script setup>
import { ref } from 'vue';
import { TourComponent } from 'alt-ui';
import { tourConfig } from './tourConfig';

const isTourVisible = ref(false);

function startTour() {
  isTourVisible.value = true;
}
</script>

<template>
  <button @click="startTour">Начать тур</button>
  
  <TourComponent 
    v-if="isTourVisible"
    :tours="tourConfig"
    initialTourId="main"
    :texts="{
      next: 'Далее',
      prev: 'Назад',
      close: 'Закрыть (Esc)'
    }"
  />
</template>
```

### Конфигурация тура

Туры определяются с помощью конфигурационного объекта со следующей структурой:

```typescript
interface TourConfig {
  id: string;
  name: string;
  description?: string;
  steps: TourStep[];
  state?: Record<string, any>;
}

interface TourStep {
  id: string;
  targetSelector: string;
  placement?: "top" | "bottom" | "left" | "right";
  title?: string;
  content: string;
  beforeAction?: TourStepAction;
  afterAction?: TourStepAction;
  scrollToElement?: boolean;
  nextStep?: string | { id: string; condition: string };
  prevStep?: string;
  progress?: number; // Процент прогресса (0-100)
}

interface TourStepAction {
  type: "route" | "sidebar" | "scroll" | "custom";
  route?: RouteLocationRaw; // Для навигации по маршруту
  sidebar?: {
    open?: boolean;
    id?: string;
  };
  customAction?: string;
}
```

### Пример конфигурации тура

```js
// tourConfig.js
export const tourConfig = {
  main: {
    id: "main",
    name: "Основной тур по приложению",
    description: "Ознакомьтесь с основными функциями нашего приложения",
    steps: [
      {
        id: "welcome",
        targetSelector: "", // Пустой селектор для центрированного тултипа
        title: "Добро пожаловать в наше приложение",
        content: "Этот тур познакомит вас с основными функциями нашего приложения.",
        nextStep: "navigation",
      },
      {
        id: "navigation",
        targetSelector: "nav-menu", // Используйте data-tour="nav-menu" на вашем элементе
        title: "Навигационное меню",
        content: "Это главное навигационное меню приложения.",
        placement: "right",
        nextStep: "dashboard",
      },
      {
        id: "dashboard",
        targetSelector: ".dashboard-card", // CSS селектор
        title: "Панель управления",
        content: "Ваша панель управления отображает всю важную информацию.",
        beforeAction: {
          type: "route",
          route: { name: "dashboard" },
        },
        nextStep: "finish",
      },
      {
        id: "finish",
        targetSelector: "",
        title: "Тур завершен",
        content: "Вы завершили тур! Теперь можете самостоятельно изучить приложение.",
      },
    ],
  }
};
```

### Пропсы

| Пропс | Тип | По умолчанию | Описание |
|------|------|---------|-------------|
| tours | `Record<string, TourData>` | `{}` | Объект, содержащий все конфигурации туров |
| initialTourId | `string` | `''` | ID тура для автоматического запуска |
| translate | `(key: string) => string` | Функция идентичности | Функция для перевода содержимого тура |
| texts | `{ next?: string; prev?: string; close?: string; }` | См. по умолчанию | Настраиваемый текст кнопок |

## useTourManager

Композабл `useTourManager` предоставляет возможность программного управления турами.

### Использование

```js
import { useTourManager } from 'alt-ui';
import { tourConfig } from './tourConfig';
import { t } from './i18n';

const {
  // Состояние
  targetElement,
  isTooltipVisible,
  currentTourStep,
  hasNextStep,
  hasPrevStep,
  
  // Действия
  startTour,
  stopTour,
  nextStep,
  prevStep,
} = useTourManager(tourConfig, {
  storageKeyPrefix: 'myapp',
  translate: t,
  onTourComplete: (tourId) => {
    console.log(`Тур ${tourId} завершен`);
  }
});

// Запуск конкретного тура
startTour('main');
```

## Выбор целевых элементов

Тултипы тура позиционируются относительно элементов на странице. Вы можете выбирать элементы, используя:

1. **CSS селекторы** (например, `.dashboard-card`, `#user-profile`)
2. **Атрибуты data-tour** (например, `<button data-tour="create-button">Создать</button>`)

Если `targetSelector` пуст, тултип будет отображаться в центре экрана.

## Навигация по туру

Туры поддерживают как линейную, так и условную навигацию:

- **Линейная**: используйте `nextStep` и `prevStep` для определения простой линейной прогрессии
- **Условная**: используйте объектную нотацию с условием для динамических путей:
  ```js
  nextStep: { 
    id: "admin-panel", 
    condition: "state.isAdmin === true" 
  }
  ```

## Действия

Туры могут вызывать действия до или после отображения шага:

- **Route**: переход к определенному маршруту
- **Sidebar**: открытие или закрытие боковой панели
- **Scroll**: прокрутка к целевому элементу
- **Custom**: вызов пользовательских действий, определенных вашим приложением 