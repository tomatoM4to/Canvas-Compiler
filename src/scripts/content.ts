import paletteTemplate from "@/templates/palette.html";
import canvasTemplate from  "@/templates/canvas.html";
import "@/styles/style.css"
import PalleteState from "@/components/pallete_state";
import {CanvasCompilerElements} from "@/components/ResetInject";
import KonvaSettings from "@/components/KonvaSetting";

/* 초기화, 컨텐츠 주입 */
export const canvasCompiler: CanvasCompilerElements = CanvasCompilerElements.getInstance();
canvasCompiler.resetPaletteTemplate(paletteTemplate);
canvasCompiler.resetCanvasTemplate(canvasTemplate);
canvasCompiler.injectContent();


/* 도구 선택 */
export const pallete_state = new PalleteState(CanvasCompilerElements.getInstance());

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
