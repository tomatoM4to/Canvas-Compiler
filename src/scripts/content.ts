// @ts-ignore
import paletteTemplate from "@/templates/palette.html";
// @ts-ignore
import canvasTemplate from  "@/templates/canvas.html";

import "@/styles/style.css"
import {dragPalette} from "@/components/dragPalette";
import Konva from "konva";
import {mousedownHandler, mousemoveHandler, mouseupHandler} from "@/components/drawing";
import {Stage} from "konva/lib/Stage";
import {RefreshKonva} from "@/components/load_konva";
import PalleteState from "@/components/pallete_state";

// dom be injected
const body = document.querySelector('body') as HTMLElement;

// palette
const palette = document.createElement('div');
palette.innerHTML = paletteTemplate;

// palette elements
const movingButton = palette.querySelector("#cc-palette-moving-icon") as HTMLElement;
const paletteContainer = palette.querySelector(".cc-palette-container") as HTMLElement;

// initial inject
const main = document.querySelector('main') as HTMLElement;
const canvas = document.createElement('div');
canvas.innerHTML = canvasTemplate;
main.insertAdjacentElement("afterend", canvas);
dragPalette(paletteContainer, movingButton);
body.insertAdjacentElement("afterend", palette);


const width = window.innerWidth;
const height = window.innerHeight;


export const pallete_state = new PalleteState();

const cursorIcon = document.querySelector("#cursor");
cursorIcon?.addEventListener("click", () => {
    pallete_state.changeFeature("cursor");
    console.log(pallete_state);
})


const layoutIcon = document.querySelector("#layout");
layoutIcon?.addEventListener("click", () => {
    pallete_state.changeFeature("layout");
    console.log(pallete_state);
})


const colorPicker = document?.querySelector("#cc-color-picker");
colorPicker?.addEventListener('input', (e) => {
    // @ts-ignore
    pallete_state.changeColor(e.target.value);
    console.log(pallete_state);
})



export let stage: Stage = new Konva.Stage({
    container: 'canvas-compiler',
    width: width,
    height: height,
});

export let layer = new Konva.Layer();

stage.on("mousedown", mousedownHandler)
stage.on("mousemove", mousemoveHandler)
stage.on("mouseup", mouseupHandler)

stage.add(layer);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "hello") {
            sendResponse({farewell: "goodbye"});
            setTimeout(() => {
                const main = document.querySelector('main') as HTMLElement;
                const canvas = document.createElement('div');
                canvas.innerHTML = canvasTemplate;
                main.insertAdjacentElement("afterend", canvas);
                stage = new Konva.Stage({
                    container: 'canvas-compiler',
                    width: width,
                    height: height,
                });
                layer = new Konva.Layer();
                RefreshKonva();
            }, 1500);
        }
    }
);


console.log("content injected")
