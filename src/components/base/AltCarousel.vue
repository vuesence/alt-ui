<script setup lang="ts">
/**
 * @component AltCarousel
 * @description Lightweight carousel with native DOM and CSS transforms.
 */
import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from "vue";

import AltIcon from "./AltIcon.vue";

interface AltCarouselProps {
  slideCount: number;
  autoplay?: boolean;
  loop?: boolean;
  slideDuration?: number;
  showControls?: boolean;
  slidesPerMove?: number;
  slidesPerPage?: number;
}

const props = withDefaults(defineProps<AltCarouselProps>(), {
  autoplay: false,
  loop: false,
  slideDuration: 3000,
  showControls: true,
  slidesPerMove: 1,
  slidesPerPage: 1,
});

const viewportRef = ref<HTMLElement | null>(null);
const currentPage = ref(0);
const viewportWidth = ref(0);

let autoplayTimer: ReturnType<typeof setInterval> | null = null;
let resizeObserver: ResizeObserver | null = null;

const normalizedSlidesPerPage = computed(() => {
  return Math.max(1, Math.floor(props.slidesPerPage));
});

const normalizedSlidesPerMove = computed(() => {
  return Math.max(1, Math.floor(props.slidesPerMove));
});

const pagePositions = computed(() => {
  const maxStart = Math.max(0, props.slideCount - normalizedSlidesPerPage.value);
  const positions: number[] = [0];
  let cursor = 0;

  while (cursor + normalizedSlidesPerMove.value <= maxStart) {
    cursor += normalizedSlidesPerMove.value;
    positions.push(cursor);
  }

  if (positions[positions.length - 1] !== maxStart) {
    positions.push(maxStart);
  }

  return positions;
});

const currentSlideIndex = computed(() => {
  return pagePositions.value[currentPage.value] ?? 0;
});

const canGoPrev = computed(() => {
  if (props.loop) {
    return pagePositions.value.length > 1;
  }

  return currentPage.value > 0;
});

const canGoNext = computed(() => {
  if (props.loop) {
    return pagePositions.value.length > 1;
  }

  return currentPage.value < pagePositions.value.length - 1;
});

const trackStyle = computed<Record<string, string>>(() => {
  const itemWidth = viewportWidth.value / normalizedSlidesPerPage.value;
  const offset = currentSlideIndex.value * itemWidth;
  return {
    transform: `translate3d(-${offset}px, 0, 0)`,
    "--alt-carousel-slides-per-page": String(normalizedSlidesPerPage.value),
  };
});

function clampPageIndex(page: number): number {
  if (pagePositions.value.length === 0) {
    return 0;
  }

  return Math.min(Math.max(page, 0), pagePositions.value.length - 1);
}

function synchronizePageBounds(): void {
  currentPage.value = clampPageIndex(currentPage.value);
}

function updateViewportWidth(): void {
  viewportWidth.value = viewportRef.value?.clientWidth ?? 0;
}

function goToPage(page: number): void {
  currentPage.value = clampPageIndex(page);
}

function goToPrevPage(): void {
  if (pagePositions.value.length <= 1) {
    return;
  }

  if (props.loop && currentPage.value <= 0) {
    currentPage.value = pagePositions.value.length - 1;
    return;
  }

  goToPage(currentPage.value - 1);
}

function goToNextPage(): void {
  if (pagePositions.value.length <= 1) {
    return;
  }

  if (props.loop && currentPage.value >= pagePositions.value.length - 1) {
    currentPage.value = 0;
    return;
  }

  goToPage(currentPage.value + 1);
}

function stopAutoplay(): void {
  if (autoplayTimer === null) {
    return;
  }

  clearInterval(autoplayTimer);
  autoplayTimer = null;
}

function autoplayTick(): void {
  goToNextPage();
}

function synchronizeAutoplay(): void {
  stopAutoplay();
  if (!props.autoplay || pagePositions.value.length <= 1 || document.hidden) {
    return;
  }

  autoplayTimer = setInterval(autoplayTick, Math.max(1000, props.slideDuration));
}

function handleVisibilityChange(): void {
  synchronizeAutoplay();
}

onMounted(() => {
  updateViewportWidth();
  synchronizePageBounds();
  synchronizeAutoplay();
  document.addEventListener("visibilitychange", handleVisibilityChange);

  if (viewportRef.value) {
    resizeObserver = new ResizeObserver(updateViewportWidth);
    resizeObserver.observe(viewportRef.value);
  }
});

onUpdated(() => {
  updateViewportWidth();
  synchronizePageBounds();
  synchronizeAutoplay();
});

onBeforeUnmount(() => {
  stopAutoplay();
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  resizeObserver?.disconnect();
});
</script>

<template>
  <div class="alt-carousel">
    <div ref="viewportRef" class="alt-carousel__viewport">
      <div class="alt-carousel__track" :style="trackStyle">
        <slot
          name="items"
          :current-page="currentPage"
          :current-index="currentSlideIndex"
          :slides-per-page="normalizedSlidesPerPage"
        />
      </div>
    </div>

    <div v-if="props.showControls" class="alt-carousel__controls">
      <button
        type="button"
        class="alt-carousel__nav-button alt-carousel__nav-button--prev"
        :disabled="!canGoPrev"
        aria-label="Previous slide"
        @click="goToPrevPage"
      >
        <slot name="prev-trigger">
          <AltIcon name="chevron-left" size="24" />
        </slot>
      </button>
      <button
        type="button"
        class="alt-carousel__nav-button alt-carousel__nav-button--next"
        :disabled="!canGoNext"
        aria-label="Next slide"
        @click="goToNextPage"
      >
        <slot name="next-trigger">
          <AltIcon name="chevron-right" size="24" />
        </slot>
      </button>
    </div>

    <div class="alt-carousel__indicators">
      <button
        v-for="(_, pageIndex) in pagePositions"
        :key="pageIndex"
        type="button"
        class="alt-carousel__indicator"
        :class="{ 'is-current': pageIndex === currentPage }"
        :aria-label="`Go to slide ${pageIndex + 1}`"
        @click="goToPage(pageIndex)"
      />
    </div>
  </div>
</template>

<style scoped>
.alt-carousel {
  width: 100%;
  position: relative;
  border-radius: var(--alt-radius-md);
}

.alt-carousel__viewport {
  width: 100%;
  overflow: hidden;
}

.alt-carousel__track {
  display: flex;
  transition: transform var(--alt-duration-fast) var(--alt-ease-in-out);
  will-change: transform;
}

:deep(.alt-carousel__track > *) {
  flex: 0 0 calc(100% / var(--alt-carousel-slides-per-page, 1));
  min-width: 0;
}

.alt-carousel__controls {
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

.alt-carousel__nav-button {
  background-color: var(--alt-c-surface-3);
  color: var(--alt-c-text-1);
  border-radius: var(--alt-radius-full);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.7;
  border: 1px solid var(--alt-c-text-3);
  transition: var(--alt-transition-all);
  pointer-events: auto;
}

.alt-carousel__nav-button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

.alt-carousel__nav-button:hover:not(:disabled) {
  opacity: 0.95;
  background-color: var(--alt-c-surface-2);
}

.alt-carousel__indicators {
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

.alt-carousel__indicator {
  height: 4px;
  flex: 1;
  border: none;
  background-color: var(--alt-c-surface-3);
  opacity: 0.5;
  cursor: pointer;
  transition: var(--alt-transition-all);
}

.alt-carousel__indicator.is-current {
  background-color: var(--alt-c-brand-1-500);
  opacity: 1;
}

.tablet,
.desktop,
.desktop-large {
  .alt-carousel__indicators {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 60%;
    max-width: 400px;
  }

  .alt-carousel__indicator {
    width: 36px;
    flex: 0 1 auto;
  }
}
</style>
