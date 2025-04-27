# Alt-UI

[![npm version](https://img.shields.io/npm/v/alt-ui.svg)](https://www.npmjs.com/package/alt-ui)
[![license](https://img.shields.io/npm/l/alt-ui.svg)](https://github.com/lissa-health/alt-ui/blob/main/LICENSE)

A modern, accessible, and themeable UI component library built with Vue 3 and TypeScript. Designed for building professional applications with a focus on flexibility, performance, and developer experience.

## Features

- ✨ **Modern Vue 3 Components**: Built with Vue 3 and Composition API
- 🎨 **Themeable**: Seamless light, dark, and high-contrast themes
- ♿ **Accessible**: WCAG 2.1 compliant components with proper ARIA attributes
- 🔍 **Type-Safe**: Full TypeScript support with detailed type definitions
- 🧩 **Composable**: Modular components designed for composition
- 📱 **Responsive**: Adapts to all screen sizes and device types
- 🚀 **Performance**: Optimized for minimal bundle size and runtime performance

## Installation

```bash
# npm
npm install alt-ui

# yarn
yarn add alt-ui

# pnpm
pnpm add alt-ui
```

## Quick Start

```vue
<script setup>
import { AltButton, AltInput, themeProvider } from 'alt-ui';
import 'alt-ui/styles';

// Apply a theme
themeProvider.applyTheme('light'); // 'light', 'dark', 'contrast', or 'system'
</script>

<template>
  <div>
    <AltInput label="Username" placeholder="Enter your username" />
    <AltButton variant="primary">Submit</AltButton>
  </div>
</template>
```

## Available Components

### Base Components

- `AltButton`: Versatile button component with various styles and states
- `AltCarousel`: Content carousel with customizable navigation
- `AltCollapsableHint`: Expandable hint text container
- `AltDialog`: Modal dialog with customizable content
- `AltEditableTable`: Interactive table with editable cells
- `AltEditableText`: Text field that can be toggled between view and edit modes
- `AltHoverCard`: Rich content card that appears on hover
- `AltIcon`: Flexible icon component supporting various icon libraries
- `AltMenu`: Dropdown menu with customizable items
- `AltSegmentGroup`: Segmented control for selecting from mutually exclusive options
- `AltSpinner`: Loading spinner with customizable size and color
- `AltTable`: Data table with sorting and customization options
- `AltTabs`: Tab container for organizing content
- `AltTabsTrigger`: Individual tab trigger component
- `AltToaster`: Toast notification system
- `AltToggleGroup`: Button group for toggling between options

### Form Components

- `AltCheckbox`: Checkbox input with label and indeterminate state
- `AltCombobox`: Combobox input with autocomplete support
- `AltInput`: Text input with various states and validation
- `AltRadioGroup`: Radio button group with customizable items
- `AltSelect`: Select dropdown with customizable options
- `AltSwitch`: Toggle switch with label
- `FormField`: Container for form elements with label and description

### Theme Components

- `ThemeProvider`: Theme management system
- `ThemeToggle`: UI component for switching between themes

## Theming

Alt-UI uses CSS variables for consistent styling and theming:

```ts
// Apply a theme programmatically
import { themeProvider } from 'alt-ui';
themeProvider.applyTheme('dark');

// Or use the ThemeToggle component for UI-based switching
import { ThemeToggle } from 'alt-ui';
```

## TypeScript Support

Alt-UI is built with TypeScript and provides comprehensive type definitions:

```ts
import type { ButtonProps, TableColumn } from 'alt-ui';

// Type-safe component props
const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'md',
  disabled: false,
};
```

## Documentation

For full documentation and examples, visit our documentation site:

[Alt-UI Documentation](https://lissa-health.github.io/alt-ui/)

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build the library
pnpm build

# Run documentation site locally
pnpm docs:dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
