import paletteTemplate from "@/templates/palette.html";
import canvasTemplate from  "@/templates/canvas.html";
import "@/styles/style.css"
import {Component, ComponentCommand, Toolbar} from "@/components/pallete_state";
import {CanvasElements, PaletteElements} from "@/components/ResetInject";
import KonvaSettings from "@/components/KonvaSetting";

/* 초기화, 컨텐츠 주입 */
export const canvas: CanvasElements = CanvasElements.getInstance();
export const palette: PaletteElements = PaletteElements.getInstance();

canvas.resetCanvasTemplate(canvasTemplate);
canvas.injectContent();

palette.resetPaletteTemplate(paletteTemplate);
palette.injectContent();


/* 도구 선택 */
const component = new Component();
const componentCommand = new ComponentCommand(component);


const toolbar = new Toolbar(componentCommand);
toolbar.addEvent();


/* Konva 세팅 */
export const konvaSettings: KonvaSettings = KonvaSettings.getInstance();


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "hello") {
            sendResponse({farewell: "goodbye"});
        }
    }
);


console.log("content injected")
