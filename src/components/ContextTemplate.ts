import {konvaSettings} from "@/scripts/content";

export default class ContextTemplate {
    private static instance: ContextTemplate;

    private context: HTMLElement | null;
    private main: HTMLElement | null;
    constructor() {
        this.context = document.createElement('div');
        this.main = document.querySelector('main');
    }

    resetContextTemplate(template: string) {
        // @ts-ignore
        this.context?.innerHTML = template;
    }

    injectContent() {
        if (this.main && this.context)
            this.main.insertAdjacentElement("afterend", this.context);
    }

    updatePos() {
        if (!this.context) return;
        let menu = this.context.querySelector("#canvas-compiler-menu");
        // @ts-ignore
        menu.style.display = 'initial';
        let containerRect = konvaSettings.stage.container().getBoundingClientRect();
        // @ts-ignore
        menu.style.top = containerRect.top + konvaSettings.stage.getPointerPosition().y + 4 + 'px';
        // @ts-ignore
        menu.style.left = konvaSettings.stage.getPointerPosition().x + 4 + 'px';
    }

    displayNone() {
        if (!this.context) return;
        let menu = this.context.querySelector("#canvas-compiler-menu");
        // @ts-ignore
        menu.style.display = 'none';
    }
}
