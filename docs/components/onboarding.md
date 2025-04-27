# Компоненты онбординга

Компоненты онбординга предоставляют гибкий способ создания интерактивных туров по пользовательскому интерфейсу вашего приложения. Эти компоненты помогают обучать пользователей возможностям и функциям в контекстной манере.

## OnboardingTooltip

Компонент `OnboardingTooltip` отображает подсказку, которая выделяет определенный элемент на странице в рамках онбординг-тура.

### Использование

```vue
<script setup>
import { ref } from 'vue';
import { OnboardingTooltip, useOnboarding, AltButton } from 'alt-ui';

const {
  displayTooltip,
  isOnboardingEnabled,
  dismissCurrentTooltip
} = useOnboarding((event) => {
  if (event === 'dismissed') {
    // Обработка закрытия
    console.log('Подсказка онбординга закрыта');
  }
});

const startTour = () => {
  displayTooltip({
    id: 'feature-introduction',
    targetElementClass: '.feature-button',
    placement: 'top',
    title: 'Новая функция',
    content: 'Нажмите здесь, чтобы попробовать нашу новую функцию!'
  });
};
</script>

<template>
  <div>
    <AltButton class="feature-button" @click="doSomething">
      Кнопка функции
    </AltButton>
    
    <AltButton @click="startTour">
      Начать тур
    </AltButton>
    
    <OnboardingTooltip @dismissed="onDismissed" />
  </div>
</template>
```

### Пропсы

Компонент OnboardingTooltip не требует никаких пропсов, так как получает все необходимые данные через композабл useOnboarding.

### События

| Событие | Описание |
|-------|-------------|
| dismissed | Вызывается при закрытии подсказки |

## Композабл useOnboarding

Композабл `useOnboarding` предоставляет функциональность для управления онбординг-туром.

### Интерфейс

```ts
function useOnboarding(emit: (event: string) => void) {
  // Возвращает
  return {
    displayTooltip,       // Функция для отображения подсказки
    dismissCurrentTooltip, // Функция для закрытия текущей подсказки
    currentTooltip,       // Текущая конфигурация подсказки
    currentTargetElement, // Текущий целевой элемент
    isOnboardingEnabled,  // Активен ли онбординг в данный момент
  };
}
```

### OnboardingTooltipConfig

```ts
interface OnboardingTooltipConfig {
  id: string;                   // Уникальный ID для подсказки
  targetElementClass: string;   // CSS селектор для целевого элемента
  placement?: TooltipPlacement; // Расположение подсказки (top, bottom, left, right)
  condition?: () => boolean;    // Опциональная функция условия
  title?: string;               // Опциональный заголовок для подсказки
  content?: string;             // Содержимое подсказки
}
```

## Создание онбординг-туров

Для создания полного онбординг-тура с несколькими шагами:

1. Определите массив конфигураций подсказок
2. Создайте механизм для перехода между подсказками
3. Используйте функцию `displayTooltip` для последовательного отображения каждой подсказки

Пример:

```ts
const tourSteps = [
  {
    id: 'step1',
    targetElementClass: '.navigation-menu',
    placement: 'bottom',
    title: 'Навигация',
    content: 'Это главное навигационное меню.'
  },
  {
    id: 'step2',
    targetElementClass: '.user-profile',
    placement: 'left',
    title: 'Профиль пользователя',
    content: 'Здесь вы можете получить доступ к настройкам профиля.'
  },
  // Дополнительные шаги...
];

// Функция для перехода к следующему шагу
const goToNextStep = (currentStepIndex) => {
  const nextIndex = currentStepIndex + 1;
  if (nextIndex < tourSteps.length) {
    displayTooltip(tourSteps[nextIndex]);
    return nextIndex;
  } else {
    // Тур завершен
    return -1;
  }
};
``` 