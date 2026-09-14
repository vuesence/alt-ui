import { createApp, h, nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import AltDropdownMenu, {
  type AltDropdownMenuItem,
} from "../AltDropdownMenu.vue";

const baseItems: AltDropdownMenuItem[] = [
  { value: "edit", label: "Edit" },
  {
    value: "share",
    label: "Share",
    items: [
      { value: "email", label: "Email" },
      { value: "link", label: "Link" },
    ],
  },
  { type: "separator", value: "sep" },
  { value: "delete", label: "Delete", danger: true },
];

function mountMenu(
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {},
) {
  const root = document.createElement("div");
  document.body.appendChild(root);

  const app = createApp({
    render: () => h(AltDropdownMenu, { items: baseItems, ...props }, slots),
  });

  app.mount(root);

  return {
    root,
    unmount() {
      app.unmount();
      root.remove();
    },
  };
}

function getTrigger(root: HTMLElement): HTMLButtonElement {
  const trigger = root.querySelector<HTMLButtonElement>(
    '[data-dropdown-trigger="true"]',
  );
  if (!trigger) {
    throw new Error("dropdown trigger not found");
  }
  return trigger;
}

async function openMenu(root: HTMLElement): Promise<void> {
  getTrigger(root).click();
  await nextTick();
  await nextTick();
}

async function flushAnimationFrame(): Promise<void> {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
  await nextTick();
  await nextTick();
}

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("AltDropdownMenu", () => {
  it("emits openChange(true) and renders items when the trigger is clicked", async () => {
    const onOpenChange = vi.fn();
    const { root, unmount } = mountMenu({ onOpenChange });

    expect(root.querySelectorAll('[data-menu-item="true"]')).toHaveLength(0);

    await openMenu(root);

    expect(onOpenChange).toHaveBeenCalledWith(true);
    const labels = Array.from(
      root.querySelectorAll('[data-menu-item="true"] .label'),
    ).map((node) => node.textContent?.trim());
    expect(labels).toEqual(["Edit", "Share", "Delete"]);
    expect(root.querySelectorAll('[role="separator"]')).toHaveLength(1);

    unmount();
  });

  it("forwards item slot props to consumers", async () => {
    const { root, unmount } = mountMenu(
      {},
      {
        item: ({ item, level, path }: { item: AltDropdownMenuItem; level: number; path: string[] }) =>
          h("span", { class: "probe" }, `${item.value}:${level}:${path.length}`),
      },
    );

    await openMenu(root);

    const probes = Array.from(root.querySelectorAll(".probe")).map(
      (node) => node.textContent,
    );
    expect(probes).toContain("edit:0:1");
    expect(probes).toContain("share:0:1");

    unmount();
  });

  it("emits select and closes the menu when an item is clicked", async () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    const { root, unmount } = mountMenu({ onSelect, onOpenChange });

    await openMenu(root);

    const editButton = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-menu-item="true"]'),
    ).find((button) => button.dataset.pathKey === "edit");
    expect(editButton).toBeTruthy();

    editButton?.click();
    await nextTick();
    await nextTick();

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0]?.[0]).toMatchObject({ value: "edit" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(getTrigger(root).getAttribute("aria-expanded")).toBe("false");

    unmount();
  });

  it("keeps the menu open when the selected item opts out of closing", async () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    const items: AltDropdownMenuItem[] = [
      { value: "toggle", label: "Toggle", keepOpenOnSelect: true },
    ];
    const { root, unmount } = mountMenu({ items, onSelect, onOpenChange });

    await openMenu(root);

    const toggle = root.querySelector<HTMLButtonElement>(
      '[data-path-key="toggle"]',
    );
    toggle?.click();
    await nextTick();

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onOpenChange).not.toHaveBeenCalledWith(false);
    expect(root.querySelector('[data-path-key="toggle"]')).toBeTruthy();

    unmount();
  });

  it("navigates items with ArrowDown/ArrowUp and closes on Escape", async () => {
    const onOpenChange = vi.fn();
    const { root, unmount } = mountMenu({ onOpenChange });

    await openMenu(root);

    const menuSurface = root.querySelector<HTMLElement>(".menu-surface");
    expect(menuSurface).toBeTruthy();
    expect(document.activeElement?.getAttribute("data-path-key")).toBe("edit");

    menuSurface?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowDown",
        bubbles: true,
        cancelable: true,
      }),
    );
    await nextTick();
    expect(document.activeElement?.getAttribute("data-path-key")).toBe("share");

    menuSurface?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowUp",
        bubbles: true,
        cancelable: true,
      }),
    );
    await nextTick();
    expect(document.activeElement?.getAttribute("data-path-key")).toBe("edit");

    menuSurface?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      }),
    );
    await nextTick();
    await nextTick();

    expect(onOpenChange).toHaveBeenCalledWith(false);

    unmount();
  });

  it("opens a submenu on ArrowRight and focuses its first item", async () => {
    const { root, unmount } = mountMenu();

    await openMenu(root);

    const share = root.querySelector<HTMLButtonElement>(
      '[data-path-key="share"]',
    );
    expect(share).toBeTruthy();
    share?.focus();

    const menuSurface = root.querySelector<HTMLElement>(".menu-surface");
    menuSurface?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true,
        cancelable: true,
      }),
    );
    await nextTick();
    await nextTick();

    const submenu = root.querySelector<HTMLElement>(".submenu-panel");
    expect(submenu).toBeTruthy();
    const labels = Array.from(submenu?.querySelectorAll(".label") ?? []).map(
      (node) => node.textContent?.trim(),
    );
    expect(labels).toEqual(["Email", "Link"]);
    expect(document.activeElement?.getAttribute("data-path-key")).toBe(
      "share::email",
    );

    unmount();
  });

  it("positions submenu panels inside the viewport", async () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function (this: Element): DOMRect {
        const make = (
          left: number,
          top: number,
          width: number,
          height: number,
        ) =>
          ({
            x: left,
            y: top,
            left,
            top,
            right: left + width,
            bottom: top + height,
            width,
            height,
            toJSON: () => ({}),
          }) as DOMRect;

        if (this.classList.contains("submenu-panel")) {
          return make(0, 0, 100, 200);
        }

        if (this.matches('button[data-menu-item="true"]')) {
          return make(60, 50, 40, 20);
        }

        return make(0, 0, 0, 0);
      },
    );

    const { root, unmount } = mountMenu();
    await openMenu(root);

    const share = root.querySelector<HTMLButtonElement>(
      '[data-path-key="share"]',
    );
    share?.focus();
    root.querySelector<HTMLElement>(".menu-surface")?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true,
        cancelable: true,
      }),
    );
    await nextTick();
    await nextTick();
    await flushAnimationFrame();

    const submenu = root.querySelector<HTMLElement>(".submenu-panel");
    expect(submenu).toBeTruthy();
    // trigger.right (100) + submenuOffset (6) => 106; trigger.top => 50
    expect(submenu?.style.left).toBe("106px");
    expect(submenu?.style.top).toBe("50px");

    unmount();
  });
});
