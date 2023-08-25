import paletteTemplate from "@/templates/palette.html";
import canvasTemplate from  "@/templates/canvas.html";

import "@/styles/style.css"
import {dragPalette} from "@/components/dragPalette";
import Konva from "konva";
import {mousedownHandler, mousemoveHandler, mouseupHandler} from "@/components/drawing";
import {Stage} from "konva/lib/Stage";
import {RefreshKonva} from "@/components/load_konva";
import PalleteState from "@/components/pallete_state";
import {CanvasCompilerElements} from "@/components/InitialState";

export const canvasCompilerElements = new CanvasCompilerElements(paletteTemplate);


if (canvasCompilerElements.palette) {
    const movingButton = canvasCompilerElements.palette.querySelector("#cc-palette-moving-icon") as HTMLElement;
    const paletteContainer = canvasCompilerElements.palette.querySelector(".cc-palette-container") as HTMLElement;
    dragPalette(paletteContainer, movingButton);
}

let main = document.querySelector('main') as HTMLElement;
const canvas = document.createElement('div');
canvas.innerHTML = canvasTemplate;
main.insertAdjacentElement("afterend", canvas);
// @ts-ignore
canvasCompilerElements.body.insertAdjacentElement("afterend", canvasCompilerElements.palette);


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
    width: canvasCompilerElements.width,
    height: canvasCompilerElements.height,
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
                main = document.querySelector('main') as HTMLElement;
                canvas.innerHTML = canvasTemplate;
                main.insertAdjacentElement("afterend", canvas);
                stage = new Konva.Stage({
                    container: 'canvas-compiler',
                    width: canvasCompilerElements.width,
                    height: canvasCompilerElements.height,
                });
                layer = new Konva.Layer();
                RefreshKonva();
            }, 1500);
        }
    }
);


console.log("content injected")
