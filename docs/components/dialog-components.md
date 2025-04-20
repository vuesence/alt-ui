---
title: Диалоговые компоненты
---

# Диалоговые компоненты

Библиотека Alt-UI предоставляет набор компонентов и утилит для работы с модальными диалогами. Диалоги используются для отображения важной информации, сбора данных или подтверждения действий.

## DialogsManager

### Описание
Компонент управления диалогами, который должен быть добавлен один раз в корневой компонент приложения. Отвечает за отображение и управление всеми диалогами в приложении.

### Пример использования

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <!-- Содержимое приложения -->
    <DialogsManager />
  </div>
</template>

<script setup>
import { DialogsManager } from 'alt-ui';
</script>
```

## useDialogs

### Описание
Хук для программного управления диалогами. Позволяет показывать различные типы диалогов, управлять их состоянием и реагировать на действия пользователя.

### API

#### Методы

| Метод | Параметры | Возвращаемое значение | Описание |
|-------|-----------|------------------------|----------|
| alert | message: string | Promise\<void\> | Показывает простой диалог с кнопкой "OK" |
| confirm | message: string | Promise\<boolean\> | Показывает диалог подтверждения с кнопками "Да" и "Нет" |
| prompt | message: string, defaultValue?: string | Promise\<string \| null\> | Показывает диалог с полем ввода |
| form | title: string, fields: FormField[] | Promise\<Record\<string, string\> \| null\> | Показывает диалог с формой |

#### Типы

```typescript
interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea';
  value: string;
  placeholder?: string;
}
```

### Примеры использования

#### Простой диалог подтверждения

```vue
<template>
  <BaseButton @click="confirmAction">Удалить</BaseButton>
</template>

<script setup>
import { useDialogs } from 'alt-ui';
import { BaseButton } from 'alt-ui';

const { confirm } = useDialogs();

async function confirmAction() {
  const confirmed = await confirm(
    'Вы уверены, что хотите удалить этот элемент?'
  );
  
  if (confirmed) {
    // Выполнить действие после подтверждения
    console.log('Элемент удален');
  }
}
</script>
```

#### Диалог с запросом ввода

```vue
<template>
  <BaseButton @click="renameItem">Переименовать</BaseButton>
</template>

<script setup>
import { useDialogs } from 'alt-ui';
import { BaseButton } from 'alt-ui';

const { prompt } = useDialogs();

async function renameItem() {
  const newName = await prompt(
    'Введите новое имя:',
    'Текущее имя'
  );
  
  if (newName) {
    // Использование введенного значения
    console.log(`Новое имя: ${newName}`);
  }
}
</script>
```

#### Диалог с формой

```vue
<template>
  <BaseButton @click="showUserForm">Добавить пользователя</BaseButton>
</template>

<script setup>
import { useDialogs } from 'alt-ui';
import { BaseButton } from 'alt-ui';

const { form } = useDialogs();

async function showUserForm() {
  const fields = [
    {
      id: 'name',
      label: 'Имя',
      type: 'text',
      value: '',
      placeholder: 'Введите имя'
    },
    {
      id: 'description',
      label: 'Описание',
      type: 'textarea',
      value: '',
      placeholder: 'Введите описание'
    }
  ];
  
  const formData = await form('Новый пользователь', fields);
  
  if (formData) {
    // Обработка данных формы
    console.log('Данные пользователя:', formData);
  }
}
</script>
```

## BaseDialog

### Описание
Базовый компонент диалога, который может использоваться для создания кастомных диалогов.

### Props

| Название | Тип | По умолчанию | Обязательный | Описание |
|----------|-----|--------------|--------------|----------|
| modelValue | Boolean | false | Нет | Управляет видимостью диалога |
| title | String | "" | Нет | Заголовок диалога |
| closeOnEsc | Boolean | true | Нет | Закрывать ли диалог при нажатии ESC |
| closeOnOutsideClick | Boolean | true | Нет | Закрывать ли диалог при клике вне его |
| width | String | "30rem" | Нет | Ширина диалога |
| maxWidth | String | "90vw" | Нет | Максимальная ширина диалога |

### События

| Название | Полезная нагрузка | Описание |
|----------|-------------------|----------|
| update:modelValue | Boolean | Срабатывает при изменении видимости диалога |
| close | - | Срабатывает при закрытии диалога |

### Слоты

| Название | Данные скопа | Описание |
|----------|--------------|----------|
| default | - | Основное содержимое диалога |
| title | - | Содержимое заголовка |
| footer | - | Нижняя часть диалога (кнопки действий) |

### Пример использования

```vue
<template>
  <BaseButton @click="showDialog = true">
    Показать диалог
  </BaseButton>
  
  <BaseDialog v-model="showDialog" title="Кастомный диалог">
    <p>Это пример кастомного диалога с произвольным содержимым.</p>
    
    <template #footer>
      <div class="dialog-actions">
        <BaseButton @click="showDialog = false">Закрыть</BaseButton>
        <BaseButton @click="handleAction">Действие</BaseButton>
      </div>
    </template>
  </BaseDialog>
</template>

<script setup>
import { ref } from 'vue';
import { BaseDialog, BaseButton } from 'alt-ui';

const showDialog = ref(false);

function handleAction() {
  // Логика обработки действия
  showDialog.value = false;
}
</script>

<style scoped>
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
``` 