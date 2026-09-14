import { computed, ref, watch } from "vue";

import type {
  AltDropdownMenuItem,
  AltDropdownMenuIconVariant,
} from "../components/base/AltDropdownMenu.vue";

export interface SubmenuPanelDescriptor {
  key: string;
  level: number;
  parentPath: string[];
  items: AltDropdownMenuItem[];
}

export const ROOT_PANEL_KEY = "__root__";
export const PATH_SEPARATOR = "::";

const iconVariantMap: Record<string, AltDropdownMenuIconVariant> = {
  settings: "brand",
  "account/settings": "brand",
  "account/profile": "brand",
  people: "brand",
  wallet: "success",
  "interface/bell": "warning",
  logout: "danger",
  download: "info",
  ai: "accent",
};

/**
 * Owns the normalized item tree, open-path bookkeeping and the recursive
 * submenu descriptors that the dropdown menu renders and positions.
 */
export function useDropdownMenuState(items: () => AltDropdownMenuItem[]) {
  const isOpen = ref(false);
  const openPath = ref<string[]>([]);

  const normalizedItems = computed<AltDropdownMenuItem[]>(() => {
    return items().map((item) => normalizeItem(item));
  });

  const hasActionItems = computed(() => {
    return normalizedItems.value.some((item) => item.type === "item");
  });

  const itemByPathKey = computed(() => {
    const map = new Map<string, AltDropdownMenuItem>();

    function walk(itemsToWalk: AltDropdownMenuItem[], parentPath: string[]): void {
      for (const item of itemsToWalk) {
        const itemPath = buildItemPath(parentPath, item.value);
        map.set(toPathKey(itemPath), item);
        if (Array.isArray(item.items) && item.items.length > 0) {
          walk(item.items, itemPath);
        }
      }
    }

    walk(normalizedItems.value, []);
    return map;
  });

  const openPanelDescriptors = computed<SubmenuPanelDescriptor[]>(() => {
    const descriptors: SubmenuPanelDescriptor[] = [];
    for (let depth = 0; depth < openPath.value.length; depth += 1) {
      const parentPath = openPath.value.slice(0, depth + 1);
      const parentItem = findItemByPath(parentPath);
      if (!parentItem || !hasNestedItems(parentItem)) {
        break;
      }

      descriptors.push({
        key: toPathKey(parentPath),
        level: depth + 1,
        parentPath,
        items: parentItem.items ?? [],
      });
    }

    return descriptors;
  });

  function normalizeItem(item: AltDropdownMenuItem): AltDropdownMenuItem {
    // Normalize recursive input once, so rendering and keyboard logic
    // can rely on a predictable item shape.
    return {
      type: item.type ?? "item",
      value: item.value,
      label: item.label,
      icon: item.icon,
      iconVariant: item.iconVariant,
      disabled: item.disabled === true,
      danger: item.danger === true,
      checked: item.checked === true,
      rightLabel: item.rightLabel,
      keepOpenOnSelect: item.keepOpenOnSelect === true,
      items: Array.isArray(item.items)
        ? item.items.map((nested) => normalizeItem(nested))
        : undefined,
    };
  }

  function hasNestedItems(item: AltDropdownMenuItem): boolean {
    if (item.type !== "item" || !Array.isArray(item.items)) {
      return false;
    }

    return item.items.some((nested) => nested.type === "item");
  }

  function resolveIconVariant(
    item: AltDropdownMenuItem,
  ): AltDropdownMenuIconVariant {
    if (item.iconVariant) {
      return item.iconVariant;
    }

    if (item.danger) {
      return "danger";
    }

    if (item.icon && iconVariantMap[item.icon]) {
      return iconVariantMap[item.icon];
    }

    return "brand";
  }

  function toPathKey(path: string[]): string {
    return path.join(PATH_SEPARATOR);
  }

  function fromPathKey(pathKey: string): string[] {
    if (!pathKey || pathKey === ROOT_PANEL_KEY) {
      return [];
    }

    return pathKey.split(PATH_SEPARATOR);
  }

  function buildItemPath(parentPath: string[], value: string): string[] {
    return [...parentPath, value];
  }

  function findItemByPath(path: string[]): AltDropdownMenuItem | null {
    if (path.length === 0) {
      return null;
    }

    let levelItems = normalizedItems.value;
    let current: AltDropdownMenuItem | null = null;
    for (const value of path) {
      current = levelItems.find((item) => item.value === value) ?? null;
      if (!current) {
        return null;
      }
      levelItems = Array.isArray(current.items) ? current.items : [];
    }

    return current;
  }

  function normalizeOpenPath(path: string[]): string[] {
    const normalizedPath: string[] = [];
    for (const value of path) {
      const candidatePath = [...normalizedPath, value];
      const candidateItem = findItemByPath(candidatePath);
      if (!candidateItem || !hasNestedItems(candidateItem)) {
        break;
      }
      normalizedPath.push(value);
    }

    return normalizedPath;
  }

  function isItemPathOpen(itemPath: string[]): boolean {
    return itemPath.every((value, index) => openPath.value[index] === value);
  }

  function openSubmenuForPath(itemPath: string[]): void {
    const item = findItemByPath(itemPath);
    if (!item || !hasNestedItems(item)) {
      openPath.value = normalizeOpenPath(itemPath.slice(0, -1));
      return;
    }

    openPath.value = itemPath;
  }

  function closeOpenPath(): void {
    openPath.value = [];
  }

  watch(
    normalizedItems,
    () => {
      openPath.value = normalizeOpenPath(openPath.value);
    },
    { deep: true },
  );

  return {
    ROOT_PANEL_KEY,
    isOpen,
    openPath,
    normalizedItems,
    hasActionItems,
    itemByPathKey,
    openPanelDescriptors,
    hasNestedItems,
    resolveIconVariant,
    toPathKey,
    fromPathKey,
    buildItemPath,
    findItemByPath,
    normalizeOpenPath,
    isItemPathOpen,
    openSubmenuForPath,
    closeOpenPath,
  };
}
