/// <reference types="vite/client" />

const svgResources = new Map<string, string>();
const imageResources = new Map<string, string>();
let customGetSvgIcon: ((name: string) => string | undefined) | null = null;

function loadIcons(customSvgIconGetter?: (name: string) => string | undefined) {
  if (customSvgIconGetter) {
    customGetSvgIcon = customSvgIconGetter;
  } else {
    let modules = import.meta.glob("@/assets/icons/**/*.svg", {
      query: "?raw",
      import: "default",
      eager: true,
    });
    for (const [fileName, module] of Object.entries(modules)) {
      const name = fileName.slice(fileName.lastIndexOf("/") + 1, -4);
      svgResources.set(name, module as string);
    }
  }

  let modules = import.meta.glob("@/assets/images/**/*.png", {
    query: "?url",
    import: "default",
    eager: true,
  });
  for (const [fileName, module] of Object.entries(modules)) {
    const name = fileName.slice(fileName.lastIndexOf("/") + 1, -4);
    imageResources.set(name, module as string);
  }

  modules = import.meta.glob("@/assets/images/**/*.webp", {
    query: "?url",
    import: "default",
    eager: true,
  });
  for (const [fileName, module] of Object.entries(modules)) {
    const name = fileName.slice(fileName.lastIndexOf("/") + 1, -5);
    imageResources.set(name, module as string);
  }
}

function getSvgIcon(name: string): string | undefined {
  if (customGetSvgIcon) {
    return customGetSvgIcon(name);
  }

  const iconName = name.includes("/") ? name.split("/")[1] : name;
  return svgResources.get(iconName);
}

function getImageUrl(name: string): string | undefined {
  if (name.startsWith("http")) {
    return name;
  }
  return imageResources.get(name);
}

export { getImageUrl, getSvgIcon, loadIcons, svgResources };
