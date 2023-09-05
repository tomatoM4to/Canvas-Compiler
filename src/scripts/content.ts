import paletteTemplate from "@/templates/palette.html";
import canvasTemplate from  "@/templates/canvas.html";
import "@/styles/style.css"
import {Toolbar} from "@/components/Toolbar";
import {CanvasElements} from "@/components/Canvas";
import {PaletteElements} from "@/components/Pallete";
import KonvaSettings from "@/components/KonvaSetting";
import {Component, ComponentCommand} from "@/components/command/Component";
import ActivatedState from "@/components/ActivatedState";
import {CursorCommand, Cursor} from "@/components/command/Cursor";
import {SnapCommand, Snap} from "@/components/command/Snap";
import CanvasEditorUi from "@/components/CanvasEditorUi";

/* Reset & inject content */
export const canvas: CanvasElements = CanvasElements.getInstance();
export const palette: PaletteElements = PaletteElements.getInstance();

canvas.resetCanvasTemplate(canvasTemplate);
canvas.injectContent();

export const canvasEditorUi = new CanvasEditorUi(canvas);
canvasEditorUi.addEventListener();

palette.resetPaletteTemplate(paletteTemplate);
palette.injectContent();


/* Konva setting */
export const konvaSettings: KonvaSettings = KonvaSettings.getInstance();
konvaSettings.reset();

export const activatedState: ActivatedState = ActivatedState.getInstance();


/* toolbar */
export const componentCommand = new ComponentCommand(new Component());
export const cusorCommand = new CursorCommand(new Cursor());
export const snapCommand = new SnapCommand(new Snap());


export const toolbar = new Toolbar(cusorCommand);


/* chrome api */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "hello") {
            sendResponse({farewell: "goodbye"});
        }
    }
);


console.log("content injected")
