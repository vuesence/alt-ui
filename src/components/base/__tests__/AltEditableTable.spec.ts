import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { reactive } from "vue";

import AltEditableTable from "../AltEditableTable.vue";

function dispatchPaste(el: HTMLElement, text: string) {
  // jsdom has no ClipboardEvent, so build a plain Event and attach clipboardData.
  const event = new Event("paste", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "clipboardData", {
    value: { getData: (type: string) => (type === "text/plain" ? text : "") },
  });
  el.dispatchEvent(event);
}

function placeCaretAtEnd(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const selection = window.getSelection()!;
  selection.removeAllRanges();
  selection.addRange(range);
}

describe("AltEditableTable", () => {
  it("commits pasted text into the model without extra typing", () => {
    const rows = reactive([{ id: "row-1", name: "", value: "" }]);

    const wrapper = mount(AltEditableTable, {
      props: {
        modelValue: rows,
        headers: [
          { key: "name", text: "Name", editable: true },
          { key: "value", text: "Value", editable: true },
        ],
        editable: true,
      },
      // Selection only works for elements attached to the document.
      attachTo: document.body,
    });

    const cell = wrapper.findAll(".editable-cell")[0].element as HTMLElement;
    placeCaretAtEnd(cell);

    dispatchPaste(cell, "Ferritin");

    expect(cell.textContent).toBe("Ferritin");
    expect(rows[0].name).toBe("Ferritin");

    wrapper.unmount();
  });
});
