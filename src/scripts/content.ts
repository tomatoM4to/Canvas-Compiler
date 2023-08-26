import paletteTemplate from "@/templates/palette.html";
import canvasTemplate from  "@/templates/canvas.html";
import "@/styles/style.css"
import {Component, ComponentCommand, Toolbar} from "@/components/pallete_state";
import {CanvasElements, PaletteElements} from "@/components/ResetInject";
import KonvaSettings from "@/components/KonvaSetting";

/* Reset & inject content */
export const canvas: CanvasElements = CanvasElements.getInstance();
export const palette: PaletteElements = PaletteElements.getInstance();

canvas.resetCanvasTemplate(canvasTemplate);
canvas.injectContent();

palette.resetPaletteTemplate(paletteTemplate);
palette.injectContent();


/* Konva setting */
export const konvaSettings: KonvaSettings = KonvaSettings.getInstance();


/* toolbar */
const component = new Component();
const componentCommand = new ComponentCommand(component);


export const toolbar = new Toolbar(componentCommand);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "hello") {
            sendResponse({farewell: "goodbye"});
        }
    }
);


console.log("content injected")
