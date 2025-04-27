---
title: API
---

# API библиотеки

В этом разделе представлена документация программного интерфейса (API) библиотеки Alt-UI для интеграции и расширения функциональности.

## Компоненты

### Базовые компоненты

```typescript
// Импорт базовых компонентов
import { 
  AltButton,
  AltIcon,
  AltDialog,
  AltHoverCard,
  AltMenu,
  AltSpinner,
  AltTable,
  AltTabs,
  AltToggleGroup,
  AltSegmentGroup,
  AltCollapsableHint,
  AltCarousel,
  AltEditableTable,
  AltEditableText,
  AltToaster
} from 'alt-ui';
```

### Компоненты форм

```typescript
// Импорт компонентов форм
import { 
  AltInput,
  AltCheckbox,
  AltCombobox,
  AltRadioGroup,
  AltSelect,
  AltSwitch,
  FormField
} from 'alt-ui';
```

### Компоненты диалогов

```typescript
// Импорт компонентов диалогов
import {
  DialogsManager,
  useDialogs,
  dialogsService,
  AltFormDialog,
  AltPromptDialog
} from 'alt-ui';
```

### Компоненты тем

```typescript
// Импорт компонентов тем
import {
  ThemeProvider,
  themeProvider,
  ThemeToggle,
  ThemeToggleVue
} from 'alt-ui';
```

## Утилиты

### CSS утилиты

```typescript
// Импорт CSS утилит
import { getCssVar, setCssVar, toNumber } from 'alt-ui';
```

### Система иконок

```typescript
// Импорт утилит для работы с иконками
import { loadIcons } from 'alt-ui';
```

### Система уведомлений

```typescript
// Импорт утилит для уведомлений
import { toast, toaster } from 'alt-ui';
```

## Типы

### Общие типы

```typescript
// Импорт общих типов
import type { ThemeName, ThemeProviderOptions, ThemeToggleOptions } from 'alt-ui';
```

### Типы таблиц

```typescript
// Импорт типов для таблиц
import type { 
  TableColumn,
  TableRow,
  TableSortDirection,
  TableSortOptions
} from 'alt-ui';
```

## Примеры использования API

### Базовая настройка

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { themeProvider, loadIcons } from 'alt-ui';
import 'alt-ui/styles';

// Инициализация тем
themeProvider.initialize({
  defaultTheme: 'system',
  storageKey: 'app-theme'
});

// Загрузка иконок
loadIcons({
  path: '/icons/',
  names: ['check', 'close', 'arrow-right', 'arrow-left'],
  suffix: '.svg'
});

// Создание экземпляра Vue
const app = createApp(App);
app.mount('#app');
```

### Использование диалогов

```typescript
// DialogExample.vue
import { ref } from 'vue';
import { useDialogs, AltButton } from 'alt-ui';

// Настройка хука диалогов
const { alert, confirm, prompt, form } = useDialogs();

// Показ информационного диалога
function showAlert() {
  alert('Информационное сообщение').then(() => {
    console.log('Пользователь закрыл информационное окно');
  });
}

// Показ диалога подтверждения
function showConfirmation() {
  confirm('Вы уверены, что хотите продолжить?').then((confirmed) => {
    if (confirmed) {
      // Действие при подтверждении (нажато "Да")
      console.log('Действие подтверждено');
    } else {
      // Действие при отмене (нажато "Нет")
      console.log('Действие отменено');
    }
  });
}

// Показ диалога с полем ввода
function showPrompt() {
  prompt('Введите ваше имя:', 'Иван').then((name) => {
    if (name) {
      console.log(`Введенное имя: ${name}`);
    } else {
      console.log('Ввод отменен');
    }
  });
}

// Показ диалога с формой
function showForm() {
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
  
  form('Заголовок формы', fields).then((formData) => {
    if (formData) {
      console.log('Данные формы:', formData);
    } else {
      console.log('Форма отменена');
    }
  });
}
```

### Работа с темами

```typescript
// ThemeExample.vue
import { computed } from 'vue';
import { themeProvider, ThemeToggleVue } from 'alt-ui';

// Получение текущей темы
const currentTheme = computed(() => themeProvider.getCurrentTheme());

// Переключение темы
function switchToLightTheme() {
  themeProvider.applyTheme('light');
}

function switchToDarkTheme() {
  themeProvider.applyTheme('dark');
}

function toggleTheme() {
  themeProvider.toggleTheme();
}
```

## Расширение компонентов

Вы можете расширять возможности библиотеки, создавая собственные компоненты на основе Alt-UI:

```vue
<template>
  <AltDialog v-model="isOpen" title="Кастомный диалог">
    <div class="custom-content">
      <slot></slot>
    </div>
    <template #footer>
      <div class="custom-actions">
        <AltButton @click="cancel">Отмена</AltButton>
        <AltButton @click="confirm" class="primary">Подтвердить</AltButton>
      </div>
    </template>
  </AltDialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue';
import { AltDialog, AltButton } from 'alt-ui';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

function confirm() {
  emit('confirm');
  isOpen.value = false;
}

function cancel() {
  emit('cancel');
  isOpen.value = false;
}
</script>

<style scoped>
.custom-content {
  padding: var(--alt-space-4);
}

.custom-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--alt-space-3);
}
</style>
``` 