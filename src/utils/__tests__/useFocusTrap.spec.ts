import { describe, expect, it } from "vitest";

import {
  createFocusTrap,
  getFocusableElements,
} from "../useFocusTrap";

function mountFocusFixture(): HTMLElement {
  const container = document.createElement("div");
  container.innerHTML = `
    <button type="button" id="first">First</button>
    <button type="button" id="second">Second</button>
    <button type="button" id="third">Third</button>
  `;
  document.body.appendChild(container);
  return container;
}

describe("useFocusTrap", () => {
  it("collects visible focusable elements", () => {
    const container = mountFocusFixture();

    const focusable = getFocusableElements(container);
    expect(focusable).toHaveLength(3);

    container.remove();
  });

  it("cycles focus forward on Tab from the last element", () => {
    const container = mountFocusFixture();
    const trap = createFocusTrap(container);

    trap.activate();
    trap.focusFirst();

    const third = container.querySelector("#third") as HTMLButtonElement;
    third.focus();

    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    expect(document.activeElement?.id).toBe("first");

    trap.deactivate(false);
    container.remove();
  });

  it("returns focus to the previously focused element", () => {
    const container = mountFocusFixture();
    const trigger = document.createElement("button");
    trigger.id = "trigger";
    document.body.appendChild(trigger);
    trigger.focus();

    const trap = createFocusTrap(container);
    trap.activate();
    trap.focusFirst();
    trap.deactivate(true);

    expect(document.activeElement?.id).toBe("trigger");

    container.remove();
    trigger.remove();
  });
});
