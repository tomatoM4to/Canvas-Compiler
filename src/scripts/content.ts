// @ts-ignore
import palette from "@/templates/palette.html";
import "@/styles/style.css"
import {dragPalette} from "@/components/dragPalette";

const form = document.querySelector('body');

if (form) {
    const divElement = document.createElement('div');
    divElement.innerHTML = palette;

    const movingButton = divElement.querySelector("#cc-palette-moving-icon") as HTMLElement;
    const paletteContainer = divElement.querySelector(".cc-palette-container") as HTMLElement;
    dragPalette(paletteContainer, movingButton);

    form.insertAdjacentElement("afterend", divElement);
}

