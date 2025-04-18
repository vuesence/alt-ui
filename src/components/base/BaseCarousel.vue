<script setup lang="ts">
import { Carousel } from "@ark-ui/vue/carousel";
import { ref } from "vue";
import { BaseIcon } from "..";

const props = defineProps({
  slideCount: {
    type: Number,
    required: true,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  slideDuration: {
    type: Number,
    default: 3000,
  },
  showControls: {
    type: Boolean,
    default: true,
  },
  slidesPerMove: {
    type: Number,
    default: 1,
  },
  slidesPerPage: {
    type: Number,
    default: 1,
  },
});

const page = ref(0);
</script>

<template>
  <div class="carousel-container">
    <Carousel.Root
      v-model:page="page"
      :slide-count="props.slideCount"
      :autoplay="props.autoplay"
      :loop="props.loop"
      :slide-duration="props.slideDuration"
      :slides-per-move="props.slidesPerMove"
      :slides-per-page="props.slidesPerPage"
    >
      <Carousel.ItemGroup>
        <slot name="items"></slot>
      </Carousel.ItemGroup>

      <div v-if="props.showControls" class="carousel-controls">
        <Carousel.Control>
          <Carousel.PrevTrigger class="carousel-nav-button prev">
            <slot name="prev-trigger">
              <BaseIcon name="chevron-left" size="24" />
            </slot>
          </Carousel.PrevTrigger>
        </Carousel.Control>
        <Carousel.Control>
          <Carousel.NextTrigger class="carousel-nav-button next">
            <slot name="next-trigger">
              <BaseIcon name="chevron-right" size="24" />
            </slot>
          </Carousel.NextTrigger>
        </Carousel.Control>
      </div>

      <Carousel.IndicatorGroup class="carousel-indicators">
        <Carousel.Indicator
          v-for="idx in props.slideCount"
          :key="idx - 1"
          :index="idx - 1"
          class="carousel-indicator"
        />
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  </div>
</template>

<style scoped>
.carousel-container {
  width: 100%;
  position: relative;
  /* overflow: hidden; */
  border-radius: var(--alt-radius-md);
}

.carousel-controls {
  position: absolute;
  top: 80%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 var(--alt-space-2);
  z-index: 2;
  pointer-events: none;
}

.carousel-nav-button {
  background-color: var(--alt-c-surface-3);
  color: var(--alt-c-text-1);
  border-radius: var(--alt-radius-full);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.5;
  border: 1px solid var(--alt-c-text-3);
  transition: var(--alt-transition-all);
  pointer-events: auto;
}

.carousel-nav-button:hover {
  opacity: 0.7;
  background-color: var(--alt-c-surface-2);
}

.carousel-indicators {
  position: absolute;
  bottom: var(--alt-space-3);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: var(--alt-space-2);
  z-index: 2;
  padding: 0 var(--alt-space-4);
}

.carousel-indicator {
  height: 4px;
  background-color: var(--alt-c-surface-3);
  opacity: 0.5;
  cursor: pointer;
  transition: var(--alt-transition-all);
  flex: 1;
}

.carousel-indicator[data-current] {
  background-color: var(--alt-c-brand-1-500);
  opacity: 1;
}

/* For non-mobile screens, limit the width of indicators */
.tablet,
.desktop,
.desktop-large {
  .carousel-indicators {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 60%;
    max-width: 400px;
  }

  .carousel-indicator {
    width: 36px;
    flex: 0 1 auto;
  }
}

/* Responsive adjustments */
/* @media (min-width: 1024px) {
  .carousel-indicators {
    width: 60%;
    max-width: 600px;
  }
} */

/* .desktop {
  .carousel-indicators {
    width: 50%;
    max-width: 800px;
  }
} */
</style>
