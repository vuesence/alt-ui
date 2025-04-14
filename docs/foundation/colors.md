# Colors

В нашей дизайн-системе цвета - это больше, чем визуальные элементы. Они передают смысл, создают иерархию и улучшают пользовательский опыт.

## Цветовая палитра Lissa Health

### Основные цвета бренда

#### Основной синий (Brand 1)
- `--lh-c-brand-1-{50-900}`: Оттенки основного синего цвета <span class="color-block" style="background-color:var(--lh-c-brand-1-500);"></span>

#### Акцентный зеленый (Brand 2)
- `--lh-c-brand-2-{50-900}`: Оттенки акцентного зеленого <span class="color-block" style="background-color:var(--lh-c-brand-2-500);"></span>

### Текстовые цвета
- `--lh-c-text-1`: Основной цвет текста <span class="color-block" style="background-color:var(--lh-c-text-1);"></span>
- `--lh-c-text-2`: Вспомогательный цвет текста <span class="color-block" style="background-color:var(--lh-c-text-2);"></span>
- `--lh-c-text-3`: Цвет текста для неактивных элементов <span class="color-block" style="background-color:var(--lh-c-text-3);"></span>

### Поверхности
- `--lh-c-surface-1`: Основной цвет поверхности (белый) <span class="color-block" style="background-color:var(--lh-c-surface-1); border:1px solid #ccc;"></span>
- `--lh-c-surface-2`: Легкий оттенок поверхности <span class="color-block" style="background-color:var(--lh-c-surface-2);"></span>
- `--lh-c-surface-3`: Средний оттенок поверхности <span class="color-block" style="background-color:var(--lh-c-surface-3);"></span>
- `--lh-c-surface-4`: Темный оттенок поверхности <span class="color-block" style="background-color:var(--lh-c-surface-4);"></span>
- `--lh-c-surface-5`: Самый темный оттенок поверхности <span class="color-block" style="background-color:var(--lh-c-surface-5);"></span>

### Семантические цвета
- `--lh-c-success`: Цвет для успешных действий <span class="color-block" style="background-color:var(--lh-c-success);"></span>
- `--lh-c-warning`: Цвет для предупреждений <span class="color-block" style="background-color:var(--lh-c-warning);"></span>
- `--lh-c-danger`: Цвет для критических и опасных действий <span class="color-block" style="background-color:var(--lh-c-danger);"></span>
- `--lh-c-info`: Цвет для информационных сообщений <span class="color-block" style="background-color:var(--lh-c-info);"></span>

## Примеры использования

### Основная кнопка
```css
.primary-button {
  background-color: var(--lh-c-brand-1-500); 
  color: var(--lh-c-text-1);
}
```

### Сообщение об успехе
```css
.success-message {
  color: var(--lh-c-success);
  background-color: var(--lh-c-surface-2);
}
```

### Иерархия текста
```css
.main-title {
  color: var(--lh-c-text-1);
  font-size: var(--lh-font-size-5);
}

.subtitle {
  color: var(--lh-c-text-2);
  font-size: var(--lh-font-size-3);
}
```

## Рекомендации по использованию

1. **Доступность**
   - Всегда проверяйте контрастность
   - Учитывайте восприятие цветов людьми с цветовой слепотой

2. **Последовательность**
   - Используйте только токены из дизайн-системы
   - Не используйте произвольные цвета

3. **Иерархия**
   - Применяйте цвета для визуального структурирования
   - Используйте яркие цвета дозированно 

<style>
.color-block {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 10px;
}
</style>
