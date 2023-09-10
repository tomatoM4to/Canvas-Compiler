import paletteTemplate from "@/templates/palette.html";
import canvasTemplate from  "@/templates/canvas.html";
import ContextTemplateHTML from "@/templates/context.html";
import "@/styles/style.css"
import {Toolbar} from "@/global/Toolbar";
import {CanvasElements} from "@/components/Canvas";
import {PaletteElements} from "@/components/Pallete";
import {Component, ComponentCommand} from "@/components/command/Component";
import {CursorCommand, Cursor} from "@/components/command/Cursor";
import {SnapCommand, Snap} from "@/components/command/Snap";
import CanvasEditorUi from "@/components/CanvasEditorUi";
import {TextCommand, Text} from "@/components/command/Text";
import {ImageCommand, Image} from "@/components/command/Image";
import ContextTemplate from "@/components/ContextTemplate";
import {ContextCommand, Context} from "@/components/command/Context";
import KonvaState from "@/global/KonvaState";

/* Reset & inject content */
export const canvas: CanvasElements = CanvasElements.getInstance();
export const palette: PaletteElements = PaletteElements.getInstance();
export const context: ContextTemplate = new ContextTemplate();
context.resetContextTemplate(ContextTemplateHTML);
context.injectContent();

canvas.resetCanvasTemplate(canvasTemplate);
canvas.injectContent();

export const canvasEditorUi = new CanvasEditorUi(canvas);
canvasEditorUi.addEventListener();

palette.resetPaletteTemplate(paletteTemplate);
palette.injectContent();


/* Konva setting */
export const konvaState: KonvaState = new KonvaState();


/* toolbar */
export const toolbar = new Toolbar(new SnapCommand(new Snap()));
toolbar.addEvent();

const contextCommand = new ContextCommand(new Context());

export const componentCommand = new ComponentCommand(new Component());
export const cusorCommand = new CursorCommand(new Cursor());
export const textCommand = new TextCommand(new Text());
export const imageCommand = new ImageCommand(new Image());

toolbar.setCommand(contextCommand);
toolbar.addEvent();
toolbar.setCommand(cusorCommand);
toolbar.addEvent();


/* chrome api */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "hello") {
            sendResponse({farewell: "goodbye"});
        }
    }
);


console.log("content injected")
