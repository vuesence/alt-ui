# Система иконок

Alt-UI включает гибкую систему иконок с поддержкой двух режимов загрузки.

## Обзор

Система иконок поддерживает:

- **Sprite режим** - иконки из SVG спрайта (рекомендуется для продакшена)
- **Bundle режим** - иконки в JavaScript бандле (удобно для разработки)
- SVG и растровые изображения (PNG, JPG, WebP)
- Динамическое изменение размера и цвета
- TypeScript типизация

## Быстрый старт

### 1. Инициализация

```typescript
import { initIconSystem } from "alt-ui";

// Sprite режим (рекомендуется)
initIconSystem({
  mode: "sprite",
  spritePath: "/assets/images/icons-sprite.svg"
});

// Bundle режим (альтернатива)
initIconSystem({
  mode: "bundle"
});
```

### 2. Использование компонента

```vue
<template>
  <AltIcon name="settings" :size="24" />
  <AltIcon name="user" color="#ff0000" />
  <AltIcon name="logo" type="image" />
</template>

<script setup>
import { AltIcon } from "alt-ui";
</script>
```

## Режимы работы

### Sprite режим

**Рекомендуется для продакшена**

Преимущества:

- ✅ Меньший размер бандла
- ✅ Лучшее кеширование
- ✅ Одиночный HTTP запрос для всех иконок

Недостатки:

- ⚠️ Требует генерации спрайта
- ⚠️ Нужна пересборка при изменении иконок

```typescript
initIconSystem({
  mode: "sprite",
  spritePath: "/assets/images/icons-sprite.svg"
});
```

### Bundle режим

**Удобен для разработки**

Преимущества:

- ✅ Не требует генерации спрайта
- ✅ Hot reload работает сразу
- ✅ Автоматическая загрузка

Недостатки:

- ❌ Больший размер бандла
- ❌ Все иконки в JavaScript

```typescript
initIconSystem({
  mode: "bundle"
});
```

## Генерация спрайта

### Использование генератора

```javascript
import { generateIconsSprite } from "alt-ui/scripts/generate-icons-sprite.js";

generateIconsSprite({
  iconsDirectory: "./src/assets/icons",
  outputPath: "./public/icons-sprite.svg",
  iconPrefix: "icon",
  verbose: true
});
```

### В package.json

```json
{
  "scripts": {
    "generate-icons-sprite": "node scripts/generate-icons-sprite.js"
  }
}
```

## Компонент AltIcon

### Props

| Prop         | Тип                | По умолчанию | Описание                       |
| ------------ | ------------------ | ------------ | ------------------------------ |
| `name`       | `string`           | -            | Имя иконки (обязательно)       |
| `size`       | `string \| number` | `24`         | Размер иконки                  |
| `color`      | `string`           | `"default"`  | Цвет иконки                    |
| `width`      | `string \| number` | `24`         | Ширина (переопределяется size) |
| `height`     | `string \| number` | `"auto"`     | Высота (переопределяется size) |
| `fill`       | `string`           | -            | SVG fill цвет                  |
| `type`       | `"svg" \| "image"` | `"svg"`      | Тип иконки                     |
| `spritePath` | `string`           | -            | Переопределить путь к спрайту  |

### Примеры использования

#### Базовая иконка

```vue
<AltIcon name="settings" />
```

#### С размером

```vue
<AltIcon name="settings" :size="32" />
<AltIcon name="settings" width="40" height="40" />
```

#### С цветом

```vue
<AltIcon name="settings" color="#3b82f6" />
<AltIcon name="settings" color="var(--alt-c-brand-1)" />
```

#### Растровое изображение

```vue
<AltIcon name="avatar" type="image" />
```

#### В кнопке

```vue
<AltButton>
  <AltIcon name="save" :size="20" />
  Сохранить
</AltButton>
```

## API

### initIconSystem(config)

Инициализирует систему иконок.

```typescript
interface IconSystemConfig {
  mode: "sprite" | "bundle";
  spritePath?: string;
  svgIconsGlob?: string;  // deprecated
  imageGlobs?: string[];  // deprecated
}
```

### getIconMode()

Возвращает текущий режим иконок.

```typescript
const mode = getIconMode(); // "sprite" | "bundle"
```

### getSpritePath()

Возвращает путь к спрайту.

```typescript
const path = getSpritePath(); // "/assets/images/icons-sprite.svg"
```

### generateIconsSprite(config)

Генерирует SVG спрайт из директории с иконками.

```typescript
interface SpriteConfig {
  iconsDirectory: string;
  outputPath: string;
  iconPrefix?: string;
  verbose?: boolean;
}
```

## Организация иконок

### Структура директорий

```
src/assets/icons/
├── interface/
│   ├── settings.svg
│   ├── user.svg
│   └── menu.svg
├── medical/
│   ├── heart.svg
│   └── pill.svg
└── common/
    ├── check.svg
    └── close.svg
```

### Именование

- Используйте семантические имена: `settings`, `user`, `heart`
- Избегайте префиксов: `icon-`, `svg-`
- Используйте kebab-case: `user-profile`, `heart-rate`
- Группируйте по категориям в поддиректориях

## Оптимизация

### SVG файлы

1. Удалите ненужные атрибуты
2. Оптимизируйте пути
3. Используйте `currentColor` для цвета
4. Установите правильный viewBox

### Производительность

**Sprite режим:**

- Генерируйте спрайт на этапе сборки
- Кешируйте спрайт на CDN
- Используйте HTTP/2 для параллельной загрузки

**Bundle режим:**

- Используйте только для разработки
- Переключайтесь на sprite для продакшена
- Минимизируйте количество иконок

## Troubleshooting

### Иконки не отображаются (Sprite)

```bash
# Сгенерируйте спрайт
pnpm generate-icons-sprite

# Проверьте наличие файла
ls public/assets/images/icons-sprite.svg

# Проверьте путь в конфигурации
```

### Иконки не отображаются (Bundle)

```typescript
// Проверьте режим
console.log(getIconMode()); // должно быть "bundle"

// Проверьте, что иконки в правильной директории
// @/assets/icons/**/*.svg
```

### Неправильный размер

```vue
<!-- Используйте size для единого размера -->
<AltIcon name="settings" :size="24" />

<!-- Или width/height для разных размеров -->
<AltIcon name="logo" width="120" height="40" />
```

### Цвет не меняется

```vue
<!-- Убедитесь, что SVG использует currentColor -->
<AltIcon name="settings" color="#ff0000" />

<!-- Или используйте fill -->
<AltIcon name="settings" fill="#ff0000" />
```

## Лучшие практики

1. **Используйте sprite режим в продакшене**
2. **Генерируйте спрайт в CI/CD**
3. **Оптимизируйте SVG перед добавлением**
4. **Используйте семантические имена**
5. **Группируйте иконки по категориям**
6. **Документируйте кастомные иконки**
7. **Используйте size prop для единообразия**

## Дополнительно

- [Полная документация](https://github.com/your-repo/alt-ui/docs/icons-system.md)
- [Примеры использования](https://github.com/your-repo/alt-ui/examples/icons)
- [API Reference](https://github.com/your-repo/alt-ui/api/icons)
