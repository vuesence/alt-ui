/**
 * Keyboard event helpers for interactive components.
 *
 * @example
 * import { onEnter, onEscape, onArrowKeys } from "alt-ui";
 * <div @keydown="onEnter(handleSelect)" />
 */

type KeyHandler = (event: KeyboardEvent) => void;

export function onEnter(handler: KeyHandler): KeyHandler {
  return (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handler(event);
    }
  };
}

export function onEscape(handler: KeyHandler): KeyHandler {
  return (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      handler(event);
    }
  };
}

export function onSpace(handler: KeyHandler): KeyHandler {
  return (event: KeyboardEvent) => {
    if (event.key === " ") {
      event.preventDefault();
      handler(event);
    }
  };
}

export function onEnterOrSpace(handler: KeyHandler): KeyHandler {
  return (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handler(event);
    }
  };
}

export function onDelete(handler: KeyHandler): KeyHandler {
  return (event: KeyboardEvent) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      handler(event);
    }
  };
}

export function onArrowKeys(handlers: {
  up?: KeyHandler;
  down?: KeyHandler;
  left?: KeyHandler;
  right?: KeyHandler;
}): KeyHandler {
  return (event: KeyboardEvent) => {
    const handler = {
      ArrowUp: handlers.up,
      ArrowDown: handlers.down,
      ArrowLeft: handlers.left,
      ArrowRight: handlers.right,
    }[event.key];

    if (handler) {
      event.preventDefault();
      handler(event);
    }
  };
}
