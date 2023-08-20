// @ts-ignore
import paletteTemplate from "@/templates/palette.html";
import "@/styles/style.css"
import {dragPalette} from "@/components/dragPalette";

// dom be injected
const body = document.querySelector('body');

// palette
const palette = document.createElement('div');
palette.innerHTML = paletteTemplate;

// palette elements
const movingButton = palette.querySelector("#cc-palette-moving-icon") as HTMLElement;
const paletteContainer = palette.querySelector(".cc-palette-container") as HTMLElement;


if (body) {
    dragPalette(paletteContainer, movingButton);
    body.insertAdjacentElement("afterend", palette);
}

