---
title: Введение
---

# Введение в Alt-UI

Alt-UI — современная библиотека компонентов пользовательского интерфейса для Vue 3, предоставляющая набор готовых к использованию компонентов для создания современных веб-приложений.

## Доступные компоненты

Библиотека включает следующие компоненты:

**Базовые компоненты**:
- BaseButton
- BaseIcon
- BaseDialog
- BaseHoverCard
- BaseMenu
- BaseSpinner
- BaseTable
- BaseTabs
- BaseToggleGroup
- BaseSegmentGroup
- BaseCollapsableHint
- BaseCarousel
- BaseEditableTable
- BaseEditableText
- BaseToaster

**Компоненты форм**:
- BaseInput
- BaseCheckbox
- BaseCombobox
- BaseRadioGroup
- BaseSelect
- BaseSwitch
- FormField

**Диалоги**:
- DialogsManager
- BaseFormDialog
- BasePromptDialog

**Компоненты тем**:
- ThemeProvider
- ThemeToggle

## Основные возможности

- **Модульная архитектура**: компоненты, которые можно использовать независимо
- **Поддержка тем**: встроенная поддержка светлой и темной тем
- **Доступность**: компоненты созданы с учетом принципов доступности
- **Типизация**: полная поддержка TypeScript
- **Композиция**: возможность создавать сложные интерфейсы из простых блоков

## Ключевые возможности

- **Современный стек**: Разработано на Vue 3 с использованием Composition API и TypeScript
- **Тематизация**: Поддержка светлой, темной и высококонтрастной тем
- **Доступность**: Компоненты соответствуют стандартам WCAG 2.1
- **Типизация**: Полная поддержка TypeScript с детальными типами
- **Модульность**: Компоненты разработаны для гибкой композиции
- **Производительность**: Оптимизировано для минимального размера пакета

## Установка

```bash
# npm
npm install alt-ui

# yarn
yarn add alt-ui

# pnpm
pnpm add alt-ui
```

## Быстрый старт

Для начала работы с Alt-UI, просто импортируйте нужные компоненты и стили:

```vue
<script setup>
import { BaseButton, BaseInput, themeProvider } from 'alt-ui';
import 'alt-ui/styles';

// Применяем тему
themeProvider.applyTheme('light'); // 'light', 'dark', 'contrast', или 'system'
</script>

<template>
  <div>
    <BaseInput label="Имя пользователя" placeholder="Введите имя пользователя" />
    <BaseButton variant="primary">Отправить</BaseButton>
  </div>
</template>
```

## Философия библиотеки

Alt-UI разработана с учетом следующих принципов:

1. **Простота использования**: Интуитивно понятные API компонентов
2. **Гибкость**: Возможность настройки под различные потребности
3. **Последовательность**: Единообразное поведение и внешний вид
4. **Доступность**: Следование лучшим практикам доступности
5. **Производительность**: Оптимизация как размера библиотеки, так и времени выполнения

## Структура библиотеки

Alt-UI организована в несколько основных категорий компонентов:

- **Базовые компоненты**: Основные строительные блоки интерфейса
- **Компоненты форм**: Элементы для ввода и отправки данных
- **Компоненты тем**: Инструменты для управления темами приложения
- **Утилиты**: Вспомогательные функции для работы с CSS и DOM

## Дальнейшие шаги

- [Начало работы](/getting-started) - подробное руководство по установке и настройке
- [Обзор компонентов](/components/overview) - знакомство с доступными компонентами
- [Дизайн-система](/overview) - принципы дизайна и токены 