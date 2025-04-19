# Структура стилей

Наша CSS-архитектура - это тщательно разработанная система, призванная создать поддерживаемые, масштабируемые и последовательные стили во всем приложении.

## Философия архитектуры

Наша структура стилей построена на ключевых принципах:
- Модульность и многократное использование
- Четкое разделение ответственности
- Оптимизация производительности
- Простота обслуживания
- Масштабируемость для сложных интерфейсов

## Таксономия каталогов

Наш каталог стилей следует стратегической, организованной структуре:

```
src/assets/styles/
├── tokens/           # Дизайн-примитивы
│   ├── colors.css
│   ├── spacing.css
│   ├── typography.css
│   ├── shadows.css
│   └── transitions.css
├── base/             # Глобальные базовые стили
│   ├── reset.css
│   ├── fonts.css
│   └── animations.css
├── themes/           # Вариации тем
│   ├── light.css
│   ├── dark.css
│   └── contrast.css
└── utilities/        # Вспомогательные классы
    └── index.css
```

## Категории стилей

### 1. Дизайн-токены
Фундаментальные строительные блоки визуального языка:
- Определения цветов
- Шкалы отступов
- Метрики типографики
- Свойства теней и возвышения
- Характеристики переходов

### 2. Базовые стили
Глобальные, фундаментальные принципы стилизации:
- CSS-сбросы
- Стандартная стилизация элементов
- Объявления шрифтов
- Основные анимации
- Корневые пользовательские свойства

### 3. Стили тем
Гибкое управление цветовыми схемами:
- Вариации светлого режима
- Конфигурации темного режима
- Темы высокой контрастности для доступности
- Утилиты динамического переключения тем

### 4. Служебные стили
Атомарные, однотипные вспомогательные классы:
- Утилиты макета
- Помощники отступов
- Сокращения типографики
- Классы визуальных эффектов

## CSS Architectural Guidelines

### 1. Naming Conventions
- Use semantic, descriptive class names
- Avoid overly specific selectors
- Leverage CSS custom properties
- Maintain clear, predictable naming patterns

### 2. Performance Optimization
- Minimize CSS specificity
- Use efficient selector strategies
- Avoid deep nesting
- Implement critical CSS techniques

### 3. Modularity Principles
- Create component-scoped styles
- Develop reusable style modules
- Ensure style encapsulation
- Support easy style composition

### 4. Responsive Design
- Implement mobile-first approach
- Use flexible, proportional units
- Create adaptive style strategies
- Minimize media query complexity

## Practical Implementation Examples

### Component-Scoped Styling

```css
.component {
  --component-padding: var(--alt-space-4);
  
  padding: var(--component-padding);
  background-color: var(--alt-c-surface-1);
  border-radius: var(--alt-radius-base);
  
  &__header {
    font-size: var(--alt-font-size-4);
    margin-bottom: var(--alt-space-2);
  }
}
```

### Responsive Typography

```css
:root {
  --fluid-min-width: 320;
  --fluid-max-width: 1200;
  --fluid-min-size: 16;
  --fluid-max-size: 20;
}

body {
  font-size: clamp(
    calc(var(--fluid-min-size) / 16 * 1rem),
    calc((var(--fluid-min-size) + (var(--fluid-max-size) - var(--fluid-min-size))) * 1px),
    calc(var(--fluid-max-size) / 16 * 1rem)
  );
}
```

### Theme Switching

```css
:root {
  color-scheme: light;
  --primary-color: hsl(220, 80%, 50%);
  --background-color: hsl(0, 0%, 100%);
}

:root[data-theme='dark'] {
  color-scheme: dark;
  --primary-color: hsl(220, 80%, 60%);
  --background-color: hsl(0, 0%, 10%);
}
```

## Advanced Considerations

- Use CSS nesting (with PostCSS)
- Implement logical properties
- Support internationalization
- Ensure cross-browser compatibility
- Maintain accessibility standards 