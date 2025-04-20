# Onboarding Components

The Onboarding components provide a flexible way to create guided tours through your application's UI. These components help educate users about features and functionality in a contextual manner.

## OnboardingTooltip

The `OnboardingTooltip` component displays a tooltip that highlights a specific element on the page as part of an onboarding tour.

### Usage

```vue
<script setup>
import { ref } from 'vue';
import { OnboardingTooltip, useOnboarding, BaseButton } from 'alt-ui';

const {
  displayTooltip,
  isOnboardingEnabled,
  dismissCurrentTooltip
} = useOnboarding((event) => {
  if (event === 'dismissed') {
    // Handle dismissal
    console.log('Onboarding tooltip dismissed');
  }
});

const startTour = () => {
  displayTooltip({
    id: 'feature-introduction',
    targetElementClass: '.feature-button',
    placement: 'top',
    title: 'New Feature',
    content: 'Click here to try our new feature!'
  });
};
</script>

<template>
  <div>
    <BaseButton class="feature-button" @click="doSomething">
      Feature Button
    </BaseButton>
    
    <BaseButton @click="startTour">
      Start Tour
    </BaseButton>
    
    <OnboardingTooltip @dismissed="onDismissed" />
  </div>
</template>
```

### Props

The OnboardingTooltip component doesn't require any props as it receives all necessary data through the useOnboarding composable.

### Events

| Event | Description |
|-------|-------------|
| dismissed | Emitted when the tooltip is dismissed |

## useOnboarding Composable

The `useOnboarding` composable provides the functionality to control the onboarding tour.

### Interface

```ts
function useOnboarding(emit: (event: string) => void) {
  // Returns
  return {
    displayTooltip,       // Function to display a tooltip
    dismissCurrentTooltip, // Function to dismiss the current tooltip
    currentTooltip,       // Current tooltip configuration
    currentTargetElement, // Current target element
    isOnboardingEnabled,  // Whether onboarding is currently active
  };
}
```

### OnboardingTooltipConfig

```ts
interface OnboardingTooltipConfig {
  id: string;                   // Unique ID for the tooltip
  targetElementClass: string;   // CSS selector for the target element
  placement?: TooltipPlacement; // Placement of the tooltip (top, bottom, left, right)
  condition?: () => boolean;    // Optional condition function
  title?: string;               // Optional title for the tooltip
  content?: string;             // Content of the tooltip
}
```

## Creating Onboarding Tours

To create a complete onboarding tour with multiple steps:

1. Define an array of tooltip configurations
2. Create a mechanism to progress through the tooltips
3. Use the `displayTooltip` function to show each tooltip in sequence

Example:

```ts
const tourSteps = [
  {
    id: 'step1',
    targetElementClass: '.navigation-menu',
    placement: 'bottom',
    title: 'Navigation',
    content: 'This is the main navigation menu.'
  },
  {
    id: 'step2',
    targetElementClass: '.user-profile',
    placement: 'left',
    title: 'User Profile',
    content: 'Access your profile settings here.'
  },
  // More steps...
];

// Function to advance to the next step
const goToNextStep = (currentStepIndex) => {
  const nextIndex = currentStepIndex + 1;
  if (nextIndex < tourSteps.length) {
    displayTooltip(tourSteps[nextIndex]);
    return nextIndex;
  } else {
    // Tour complete
    return -1;
  }
};
``` 