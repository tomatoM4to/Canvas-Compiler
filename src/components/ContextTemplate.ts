import {konvaState} from "@/app/content";

export default class ContextTemplate {
    private static instance: ContextTemplate;

    private context: HTMLElement | null;
    private main: HTMLElement | null;
    constructor() {
        this.context = document.createElement('div');
        this.main = document.querySelector('main');
    }

    resetContextTemplate(template: string) {
        if (!this.context) return;
        this.context.innerHTML = template;
        let deleteButton: HTMLButtonElement | null = this.context?.querySelector("#canvas-compiler-delete-button");
        if (!deleteButton) return;

        deleteButton.addEventListener("click", () => {
            if (konvaState.transfomer.nodes().length === 0) return;
            konvaState.transfomer.nodes().forEach((node) => {
                node.destroy();
            })
            konvaState.transfomer.nodes([]);
        })
    }

    injectContent() {
        if (this.main && this.context)
            this.main.insertAdjacentElement("afterend", this.context);
    }

    updatePos() {
        if (!this.context) return;

        let menu: HTMLDivElement | null = this.context?.querySelector("#canvas-compiler-menu");
        let pointerPosition = konvaState.stage.getPointerPosition();
        if (!menu || !pointerPosition) return;

        menu.style.display = 'initial';
        let containerRect = konvaState.stage.container().getBoundingClientRect();
        menu.style.top = containerRect.top + pointerPosition.y + 4 + 'px';
        menu.style.left = pointerPosition.x + 4 + 'px';
    }

    displayNone() {
        if (!this.context) return;
        let menu: HTMLDivElement | null = this.context?.querySelector("#canvas-compiler-menu");
        if (!menu) return;
        menu.style.display = 'none';
    }
}
