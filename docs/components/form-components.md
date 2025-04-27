---
title: Компоненты форм
---

# Компоненты форм

Компоненты форм предназначены для сбора и валидации данных от пользователей. Все компоненты поддерживают v-model и имеют консистентный API.

## AltInput

### Описание
Компонент текстового поля ввода с поддержкой различных типов и состояний.

### Props

| Название | Тип | По умолчанию | Обязательный | Описание |
|----------|-----|--------------|--------------|----------|
| modelValue | String | "" | Нет | Значение поля ввода |
| label | String | "" | Нет | Метка поля ввода |
| placeholder | String | "" | Нет | Текст-подсказка |
| type | String | "text" | Нет | Тип поля ввода (text, password, email, number, и т.д.) |
| disabled | Boolean | false | Нет | Отключает поле ввода |
| error | String | "" | Нет | Текст ошибки |
| required | Boolean | false | Нет | Указывает, что поле обязательно для заполнения |

### События

| Название | Полезная нагрузка | Описание |
|----------|-------------------|----------|
| update:modelValue | String | Срабатывает при изменении значения поля |
| focus | FocusEvent | Срабатывает при получении фокуса |
| blur | FocusEvent | Срабатывает при потере фокуса |
| input | Event | Срабатывает при вводе текста |

### Пример использования

```vue
<template>
  <AltInput
    v-model="username"
    label="Имя пользователя"
    placeholder="Введите имя пользователя"
    :error="errors.username"
    required
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import { AltInput } from "alt-ui";

const username = ref('');
const errors = ref({
  username: ''
});

function validate() {
  if (!username.value) {
    errors.value.username = 'Имя пользователя обязательно';
    return false;
  }
  errors.value.username = '';
  return true;
}
</script>
```

## AltSelect

### Описание
Компонент выпадающего списка для выбора из предопределенных опций.

### Props

| Название | Тип | По умолчанию | Обязательный | Описание |
|----------|-----|--------------|--------------|----------|
| modelValue | String, Number | undefined | Нет | Текущее выбранное значение |
| options | Array | [] | Да | Массив опций для отображения |
| label | String | "" | Нет | Метка для селекта |
| placeholder | String | "" | Нет | Текст-подсказка, когда ничего не выбрано |
| disabled | Boolean | false | Нет | Отключает селект |

### События

| Название | Полезная нагрузка | Описание |
|----------|-------------------|----------|
| update:modelValue | String, Number | Срабатывает при изменении выбранного значения |
| change | String, Number | Срабатывает при изменении выбранного значения |

### Пример использования

```vue
<template>
  <AltSelect
    v-model="selectedCountry"
    :options="countries"
    label="Страна"
    placeholder="Выберите страну"
  />
</template>

<script setup>
import { ref } from 'vue';
import { AltSelect } from "alt-ui";

const selectedCountry = ref('');
const countries = [
  { value: 'ru', label: 'Россия' },
  { value: 'us', label: 'США' },
  { value: 'de', label: 'Германия' }
];
</script>
```

## AltCheckbox

### Описание
Компонент флажка (чекбокса) для выбора опций.

### Props

| Название | Тип | По умолчанию | Обязательный | Описание |
|----------|-----|--------------|--------------|----------|
| modelValue | Boolean | false | Нет | Текущее состояние чекбокса |
| label | String | "" | Нет | Текст, связанный с чекбоксом |
| disabled | Boolean | false | Нет | Отключает чекбокс |

### События

| Название | Полезная нагрузка | Описание |
|----------|-------------------|----------|
| update:modelValue | Boolean | Срабатывает при изменении состояния |

### Пример использования

```vue
<template>
  <AltCheckbox v-model="agreeTerms" label="Я согласен с условиями использования" />
</template>

<script setup>
import { ref } from 'vue';
import { AltCheckbox } from "alt-ui";

const agreeTerms = ref(false);
</script>
```

## AltRadioGroup

### Описание
Компонент группы радио-кнопок для выбора одного варианта из нескольких.

### Props

| Название | Тип | По умолчанию | Обязательный | Описание |
|----------|-----|--------------|--------------|----------|
| modelValue | String, Number | "" | Нет | Текущее выбранное значение |
| options | Array | [] | Да | Массив опций для отображения |
| name | String | "" | Нет | Имя группы радио-кнопок |
| disabled | Boolean | false | Нет | Отключает все радио-кнопки в группе |
| label | String | "" | Нет | Метка для группы |

### События

| Название | Полезная нагрузка | Описание |
|----------|-------------------|----------|
| update:modelValue | String, Number | Срабатывает при изменении выбранного значения |

### Пример использования

```vue
<template>
  <AltRadioGroup
    v-model="selectedGender"
    :options="genderOptions"
    label="Пол"
    name="gender"
  />
</template>

<script setup>
import { ref } from 'vue';
import { AltRadioGroup } from "alt-ui";

const selectedGender = ref('');
const genderOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
  { value: 'other', label: 'Другой' }
];
</script>
```

## AltSwitch

### Описание
Компонент переключателя для включения/выключения опций.

### Props

| Название | Тип | По умолчанию | Обязательный | Описание |
|----------|-----|--------------|--------------|----------|
| modelValue | Boolean | false | Нет | Текущее состояние переключателя |
| label | String | "" | Нет | Текст, связанный с переключателем |
| disabled | Boolean | false | Нет | Отключает переключатель |

### События

| Название | Полезная нагрузка | Описание |
|----------|-------------------|----------|
| update:modelValue | Boolean | Срабатывает при изменении состояния |

### Пример использования

```vue
<template>
  <AltSwitch v-model="darkMode" label="Темная тема" />
</template>

<script setup>
import { ref } from 'vue';
import { AltSwitch } from "alt-ui";

const darkMode = ref(false);
</script>
```

## FormField

### Описание
Контейнер для компонентов формы, предоставляющий унифицированное отображение меток, сообщений об ошибках и подсказок.

### Props

| Название | Тип | По умолчанию | Обязательный | Описание |
|----------|-----|--------------|--------------|----------|
| label | String | "" | Нет | Метка поля |
| error | String | "" | Нет | Текст ошибки |
| hint | String | "" | Нет | Подсказка для поля |
| required | Boolean | false | Нет | Указывает, что поле обязательно для заполнения |

### Слоты

| Название | Данные скопа | Описание |
|----------|--------------|----------|
| default | - | Компонент формы |
| label | - | Кастомная метка |
| hint | - | Кастомная подсказка |
| error | - | Кастомное сообщение об ошибке |

### Пример использования

```vue
<template>
  <FormField
    label="Email"
    :error="errors.email"
    hint="Мы никогда не передадим вашу почту третьим лицам"
    required
  >
    <AltInput v-model="email" type="email" placeholder="example@example.com" />
  </FormField>
</template>

<script setup>
import { ref } from 'vue';
import { FormField, AltInput } from 'alt-ui';

const email = ref('');
const errors = ref({
  email: ''
});

function validateEmail() {
  // Логика валидации email
}
</script>
```

## Архитектура форм

```mermaid
graph TD
    A[FormField] --> B[AltInput]
    A --> C[AltSelect]
    A --> D[AltCheckbox]
    A --> E[AltRadioGroup]
    A --> F[AltSwitch]
    A --> G[AltCombobox]
    
    B --> H[Валидация]
    C --> H
    D --> H
    E --> H
    F --> H
    G --> H
```

<!-- id="form-components" caption="Архитектура форм" -->

## Компоненты

### FormField

Базовый компонент-обертка для всех элементов форм.

```vue
<FormField
  label="Имя пользователя"
  :error="errors.username"
  required
>
  <AltInput v-model="username" />
</FormField>
```

#### API

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| label | string | - | Метка поля |
| error | string | - | Текст ошибки |
| required | boolean | false | Обязательное поле |

### AltInput

Текстовое поле ввода с поддержкой различных типов.

```vue
<AltInput
  v-model="value"
  type="text"
  placeholder="Введите текст"
  :error="error"
/>
```

#### API

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| modelValue | string | '' | Значение поля |
| type | 'text' \| 'password' \| 'email' \| 'number' | 'text' | Тип поля |
| placeholder | string | - | Подсказка |
| error | string | - | Текст ошибки |

### AltSelect

Выпадающий список с поддержкой поиска.

```vue
<AltSelect
  v-model="selected"
  :options="options"
  placeholder="Выберите опцию"
/>
```

#### API

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| modelValue | any | null | Выбранное значение |
| options | Option[] | [] | Массив опций |
| searchable | boolean | false | Возможность поиска |

### AltCheckbox

Чекбокс с поддержкой промежуточного состояния.

```vue
<AltCheckbox
  v-model="checked"
  label="Согласен с условиями"
/>
```

#### API

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| modelValue | boolean | false | Состояние |
| label | string | - | Текст метки |
| indeterminate | boolean | false | Промежуточное состояние |

### AltRadioGroup

Группа радио-кнопок.

```vue
<AltRadioGroup
  v-model="selected"
  :options="options"
  orientation="horizontal"
/>
```

#### API

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| modelValue | any | null | Выбранное значение |
| options | Option[] | [] | Массив опций |
| orientation | 'horizontal' \| 'vertical' | 'vertical' | Ориентация |

### AltSwitch

Переключатель.

```vue
<AltSwitch
  v-model="enabled"
  label="Включить уведомления"
/>
```

#### API

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| modelValue | boolean | false | Состояние |
| label | string | - | Текст метки |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Размер |

### AltCombobox

Комбинированное поле ввода с выпадающим списком и поддержкой автодополнения.

```vue
<AltCombobox
  v-model="value"
  :options="options"
  :loading="isLoading"
  @search="handleSearch"
/>
```

#### API

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| modelValue | any | null | Выбранное значение |
| options | Option[] | [] | Массив опций |
| loading | boolean | false | Состояние загрузки |
| multiple | boolean | false | Множественный выбор |

## Интеграция с форм-менеджерами

### Пример с VeeValidate

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'

const { handleSubmit, errors } = useForm({
  validationSchema: {
    username: 'required|min:3',
    email: 'required|email'
  }
})
</script>

<template>
  <form @submit="handleSubmit">
    <FormField
      label="Имя пользователя"
      :error="errors.username"
      required
    >
      <AltInput
        v-model="username"
        name="username"
      />
    </FormField>
    
    <FormField
      label="Email"
      :error="errors.email"
      required
    >
      <AltInput
        v-model="email"
        type="email"
        name="email"
      />
    </FormField>
  </form>
</template>
```

## Лучшие практики

1. **Группировка полей**
   ```vue
   <div class="form-group">
     <FormField>
       <AltInput v-model="firstName" label="Имя" />
     </FormField>
     <FormField>
       <AltInput v-model="lastName" label="Фамилия" />
     </FormField>
   </div>
   ```