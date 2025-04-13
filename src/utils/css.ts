function getCssVar(name) {
  return getComputedStyle(document.documentElement, null).getPropertyValue(
    name,
  );
}

function setCssVar(name, value) {
  return document.documentElement.style.setProperty(name, value);
}

function toNumber(str) {
  return +str.replace("px", "");
}

export { getCssVar, setCssVar, toNumber };
