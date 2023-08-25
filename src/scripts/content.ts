import paletteTemplate from "@/templates/palette.html";
import canvasTemplate from  "@/templates/canvas.html";
import "@/styles/style.css"
import Konva from "konva";
import {mousedownHandler, mousemoveHandler, mouseupHandler} from "@/components/drawing";
import {Stage} from "konva/lib/Stage";
import {RefreshKonva} from "@/components/load_konva";
import PalleteState from "@/components/pallete_state";
import {CanvasCompilerElements} from "@/components/InitialState";


export const canvasCompiler: CanvasCompilerElements = CanvasCompilerElements.getInstance();
canvasCompiler.resetPaletteTemplate(paletteTemplate);
canvasCompiler.resetCanvasTemplate(canvasTemplate);


if (canvasCompiler.main && canvasCompiler.canvas)
    canvasCompiler.main.insertAdjacentElement("afterend", canvasCompiler.canvas);

if (canvasCompiler.body && canvasCompiler.palette)
    canvasCompiler.body.insertAdjacentElement("afterend", canvasCompiler.palette);

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

export const pallete_state = new PalleteState();

const cursorIcon: HTMLElement | null = document.querySelector("#cursor");
cursorIcon?.addEventListener("click", () => {
    pallete_state.changeFeature("cursor");
    console.log(pallete_state);
})


const layoutIcon: HTMLElement | null = document.querySelector("#layout");
layoutIcon?.addEventListener("click", () => {
    pallete_state.changeFeature("layout");
    console.log(pallete_state);
})


const colorPicker: HTMLElement | null = document?.querySelector("#cc-color-picker");
colorPicker?.addEventListener('input', (e) => {
    // @ts-ignore
    pallete_state.changeColor(e.target.value);
    console.log(pallete_state);
})


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


export let stage: Stage = new Konva.Stage({
    container: 'canvas-compiler',
    width: canvasCompiler.width,
    height: canvasCompiler.height,
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
            canvasCompiler.main = document.querySelector('main') as HTMLElement;
            if (canvasCompiler.main && canvasCompiler.canvas)
                canvasCompiler.main.insertAdjacentElement("afterend", canvasCompiler.canvas);
            stage = new Konva.Stage({
                container: 'canvas-compiler',
                width: canvasCompiler.width,
                height: canvasCompiler.height,
            });
            layer = new Konva.Layer();
            RefreshKonva();
        }
    }
);


console.log("content injected")
