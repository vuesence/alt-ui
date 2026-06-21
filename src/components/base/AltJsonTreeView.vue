<script setup lang="ts">
/**
 * @component AltJsonTreeView
 * @description JSON tree viewer using big-json-viewer for displaying JSON data
 * in a collapsible tree format. Designed for admin interfaces.
 *
 * CSS Classes (apply on component root):
 * - `compact` — reduced padding and font size
 * - `bordered` — visible border around the tree
 * - `monospace` — force monochrome monospace style
 *
 * @example
 * <AltJsonTreeView :data="healthRecord" />
 *
 * @example
 * <AltJsonTreeView
 *   :data="apiResponse"
 *   :default-expanded-depth="2"
 *   class="compact bordered"
 * />
 *
 * @dependency big-json-viewer (lazy-loaded)
 */
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from "vue";

export interface AltJsonTreeViewProps {
  data: object;
  defaultExpandedDepth?: number;
}

const props = withDefaults(defineProps<AltJsonTreeViewProps>(), {
  defaultExpandedDepth: 1,
});

const containerRef = useTemplateRef<HTMLDivElement>("container");
let viewer: {
  destroy: () => void;
  getRootElement: () => Element & { openAll: (depth: number) => void };
} | null = null;
let viewerModulePromise: Promise<typeof import("big-json-viewer")> | null = null;
let viewerCssLoaded = false;

function loadViewerModule() {
  if (!viewerModulePromise) {
    viewerModulePromise = import("big-json-viewer");
  }

  return viewerModulePromise;
}

async function ensureViewerStyles() {
  if (viewerCssLoaded) {
    return;
  }

  await import("big-json-viewer/styles/default.css");
  viewerCssLoaded = true;
}

async function renderTree() {
  if (!containerRef.value) {
    return;
  }
  destroy();
  containerRef.value.innerHTML = "";

  await ensureViewerStyles();
  const { BigJsonViewerDom } = await loadViewerModule();

  const jsonString = JSON.stringify(props.data);
  const buf = new ArrayBuffer(jsonString.length * 2);
  const u16 = new Uint16Array(buf);
  for (let i = 0; i < jsonString.length; i++) {
    u16[i] = jsonString.charCodeAt(i);
  }
  viewer = await BigJsonViewerDom.fromData(buf, {
    objectNodesLimit: 50,
    arrayNodesLimit: 50,
  });

  const root = viewer.getRootElement();
  containerRef.value.appendChild(root);
  root.openAll(props.defaultExpandedDepth);
}

function destroy() {
  if (viewer) {
    viewer.destroy();
    viewer = null;
  }
}

onMounted(() => {
  renderTree();
});

watch(() => props.data, () => {
  renderTree();
});

watch(() => props.defaultExpandedDepth, () => {
  renderTree();
});

onBeforeUnmount(() => {
  destroy();
});
</script>

<template>
  <div class="alt-json-tree-view">
    <div ref="container" class="tree-container" />
  </div>
</template>

<style scoped>
.alt-json-tree-view {
  --tree-font-size: var(--alt-font-size-0);
  --tree-line-height: var(--alt-line-height-2);
  --tree-padding: var(--alt-space-4);

  font-family: var(--alt-font-family-mono);
  font-size: var(--tree-font-size);
  line-height: var(--tree-line-height);
  color: var(--alt-c-text-1);
  padding: var(--tree-padding);
  background: var(--alt-c-surface-1);
  border-radius: var(--alt-radius-md);
  overflow: auto;
}

.alt-json-tree-view.compact {
  --tree-font-size: var(--alt-font-size-000);
  --tree-padding: var(--alt-space-2);
}

.alt-json-tree-view.bordered {
  border: 1px solid var(--alt-c-border);
}

.alt-json-tree-view :deep(.json-node) {
  padding-left: var(--alt-space-4);
}

.alt-json-tree-view :deep(.json-node-label) {
  cursor: pointer;
  user-select: none;
}

.alt-json-tree-view :deep(.json-node-key) {
  color: var(--alt-c-text-1);
  font-weight: var(--alt-font-weight-medium);
}

.alt-json-tree-view :deep(.json-node-value-string) {
  color: var(--alt-c-success);
}

.alt-json-tree-view :deep(.json-node-value-number) {
  color: var(--alt-c-brand-1-500);
}

.alt-json-tree-view :deep(.json-node-value-boolean) {
  color: var(--alt-c-brand-3-500);
}

.alt-json-tree-view :deep(.json-node-value-null) {
  color: var(--alt-c-text-3);
  font-style: italic;
}

.alt-json-tree-view :deep(.json-node-open-link),
.alt-json-tree-view :deep(.json-node-close-link) {
  color: var(--alt-c-text-3);
  cursor: pointer;

  &:hover {
    color: var(--alt-c-brand-1);
  }
}

.alt-json-tree-view :deep(.json-node-actions a) {
  color: var(--alt-c-text-3);
  font-size: var(--alt-font-size-000);
  text-decoration: none;

  &:hover {
    color: var(--alt-c-brand-1);
  }
}
</style>
