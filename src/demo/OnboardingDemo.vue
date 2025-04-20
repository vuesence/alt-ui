<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { OnboardingTooltip, useOnboarding, BaseButton } from '../components';

const tooltipRef = ref();
const demoComplete = ref(false);

const {
  displayTooltip,
  isOnboardingEnabled
} = useOnboarding((e) => {
  if (e === 'dismissed') {
    demoComplete.value = true;
  }
});

const startDemo = () => {
  displayTooltip({
    id: 'demo-tooltip',
    targetElementClass: '.target-element',
    placement: 'top',
    title: 'Onboarding Demo',
    content: 'This is an example of how to use the OnboardingTooltip component for user onboarding tours.'
  });
};
</script>

<template>
  <div class="onboarding-demo">
    <h2>Onboarding Demo</h2>
    
    <div class="demo-container">
      <BaseButton 
        v-if="!isOnboardingEnabled && !demoComplete" 
        class="primary target-element"
        @click="startDemo"
      >
        Start Onboarding Tour
      </BaseButton>

      <div v-else-if="demoComplete" class="demo-completed">
        <p>Onboarding completed!</p>
        <BaseButton class="primary" @click="demoComplete = false">
          Reset Demo
        </BaseButton>
      </div>
    </div>

    <OnboardingTooltip ref="tooltipRef" @dismissed="demoComplete = true" />
  </div>
</template>

<style scoped>
.onboarding-demo {
  padding: var(--alt-space-6);
  background-color: var(--alt-c-surface-1);
  border-radius: var(--alt-radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-4);
}

h2 {
  font-size: var(--alt-font-size-3);
  font-weight: var(--alt-font-weight-bold);
  margin: 0;
}

.demo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
  border: 1px dashed var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  padding: var(--alt-space-4);
}

.demo-completed {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--alt-space-3);
}
</style> 