// @ts-ignore
import paletteTemplate from "@/templates/palette.html";
// @ts-ignore
import canvasTemplate from  "@/templates/canvas.html";

import "@/styles/style.css"
import {dragPalette} from "@/components/dragPalette";
import Konva from "konva";

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


let width = window.innerWidth;
let height = window.innerHeight;

let stage = new Konva.Stage({
    container: 'canvas-compiler',
    width: width,
    height: height,
});

let layer = new Konva.Layer();

let rect1 = new Konva.Rect({
    x: 20,
    y: 20,
    width: 100,
    height: 50,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
});
// add the shape to the layer
layer.add(rect1);

let rect2 = new Konva.Rect({
    x: 150,
    y: 40,
    width: 100,
    height: 50,
    fill: 'red',
    shadowBlur: 10,
    cornerRadius: 10,
});
layer.add(rect2);

let rect3 = new Konva.Rect({
    x: 50,
    y: 120,
    width: 100,
    height: 100,
    fill: 'blue',
    cornerRadius: [0, 10, 20, 30],
});
layer.add(rect3);

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
            }, 1500);
        }
    }
);


console.log("content injected")
