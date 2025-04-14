function getCssVar(name: string) {
  return getComputedStyle(document.documentElement, null).getPropertyValue(
    name,
  );
}

function setCssVar(name: string, value: string) {
  return document.documentElement.style.setProperty(name, value);
}

function toNumber(str: string) {
  return +str.replace("px", "");
}

export { getCssVar, setCssVar, toNumber };
