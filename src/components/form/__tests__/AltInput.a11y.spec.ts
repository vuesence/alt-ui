import { createApp, h } from "vue";
import { describe, expect, it } from "vitest";

import AltInput from "../AltInput.vue";

function mountAltInput(props: Record<string, unknown>) {
  const root = document.createElement("div");
  document.body.appendChild(root);

  const app = createApp({
    render: () =>
      h(AltInput, {
        label: "Email",
        modelValue: "",
        "onUpdate:modelValue": () => {},
        ...props,
      }),
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

describe("AltInput a11y", () => {
  it("associates label for/id with the input", () => {
    const { root, unmount } = mountAltInput({ label: "Email" });
    const input = root.querySelector("input") as HTMLInputElement;
    const label = root.querySelector("label");

    expect(input.id).toBeTruthy();
    expect(label?.htmlFor).toBe(input.id);
    expect(input.labels?.length).toBeGreaterThan(0);

    unmount();
  });

  it("exposes error state to assistive technologies", () => {
    const { root, unmount } = mountAltInput({
      label: "Name",
      state: "error",
      errorMessage: "Required field",
    });
    const input = root.querySelector("input") as HTMLInputElement;
    const error = root.querySelector(".input-error");

    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toContain("-error");
    expect(error?.getAttribute("role")).toBe("alert");
    expect(error?.textContent).toBe("Required field");

    unmount();
  });

  it("respects an explicit id prop", () => {
    const { root, unmount } = mountAltInput({
      id: "custom-email-input",
      label: "Email",
    });
    const input = root.querySelector("input") as HTMLInputElement;
    const label = root.querySelector("label");

    expect(input.id).toBe("custom-email-input");
    expect(label?.htmlFor).toBe("custom-email-input");

    unmount();
  });
});
