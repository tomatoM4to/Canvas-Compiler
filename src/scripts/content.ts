// @ts-ignore
import paletteTemplate from "@/templates/palette.html";
// @ts-ignore
import canvasTemplate from  "@/templates/canvas.html";

import "@/styles/style.css"
import {dragPalette} from "@/components/dragPalette";

// dom be injected
const body = document.querySelector('body') as HTMLElement;

// palette
const palette = document.createElement('div');
palette.innerHTML = paletteTemplate;

// palette elements
const movingButton = palette.querySelector("#cc-palette-moving-icon") as HTMLElement;
const paletteContainer = palette.querySelector(".cc-palette-container") as HTMLElement;


const main = document.querySelector('main') as HTMLElement;
const canvas = document.createElement('div');
canvas.innerHTML = canvasTemplate;
main.insertAdjacentElement("afterend", canvas);


dragPalette(paletteContainer, movingButton);
body.insertAdjacentElement("afterend", palette);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "hello") {
            sendResponse({farewell: "goodbye"});
            setTimeout(() => {
                const main = document.querySelector('main') as HTMLElement;
                const canvas = document.createElement('div');
                canvas.innerHTML = canvasTemplate;
                main.insertAdjacentElement("afterend", canvas);
            }, 1500);
        }
    }
);


console.log("content injected")
