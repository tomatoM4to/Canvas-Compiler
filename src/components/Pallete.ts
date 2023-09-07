import {componentCommand, cusorCommand, imageCommand, snapCommand, textCommand, toolbar} from "@/scripts/content";

export class PaletteElements {
    private static instance: PaletteElements;

    private palette: HTMLElement | null;
    private body: HTMLElement | null;
    private paletteMovingButton: HTMLElement | null;
    private paletteContainer: HTMLElement | null;
    private colorPicker: HTMLElement | null;
    private cursorButton: HTMLElement | null;
    private layoutButton: HTMLElement | null;
    private imageButton: HTMLElement | null;
    private textButton: HTMLElement | null;

    private _color: string;

    private constructor() {
        this.body = document.querySelector('body');
        this.palette = document.createElement('div');
        this.paletteMovingButton = null;
        this.paletteContainer = null;
        this.colorPicker = null;
        this._color = "#fffff";
        this.cursorButton = null;
        this.layoutButton = null;
        this.imageButton = null;
        this.textButton = null;
    }

    public static getInstance(): PaletteElements {
        if (!PaletteElements.instance) {
            PaletteElements.instance = new PaletteElements();
        }
        return PaletteElements.instance
    }

    resetPaletteTemplate(template: string) {
        if (this.palette) {
            this.palette.innerHTML = template;
            this.paletteMovingButton = this.palette.querySelector("#cc-palette-moving-icon");
            this.paletteContainer = this.palette.querySelector(".cc-palette-container");
            if (this.paletteContainer && this.paletteMovingButton)
                this.dragEventListener(this.paletteContainer, this.paletteMovingButton);

            this.colorPicker = this.palette.querySelector("#cc-color-picker");
            this.colorPicker?.addEventListener('input', (e) => {
                // @ts-ignore;
                this._color = e.target.value;
            })

            this.cursorButton = this.palette.querySelector("#cursor");
            this.cursorButton?.addEventListener("click", () => {
                toolbar.removeEvent();
                toolbar.setCommand(cusorCommand);
                toolbar.addEvent();
            })

            this.layoutButton = this.palette.querySelector("#layout");
            this.layoutButton?.addEventListener("click", () => {
                toolbar.removeEvent();
                toolbar.setCommand(componentCommand);
                toolbar.addEvent();
            })

            this.textButton = this.palette.querySelector("#text");
            this.textButton?.addEventListener("click", () => {
                toolbar.removeEvent();
                toolbar.setCommand(textCommand);
                toolbar.addEvent();
            })

            this.imageButton = this.palette.querySelector("#image");
            this.imageButton?.addEventListener("click", () => {
                toolbar.removeEvent();
                toolbar.setCommand(imageCommand);
                toolbar.addEvent();
            })
        }
    }

    get color(): string {
        return this._color;
    }


    private dragEventListener(element: HTMLElement, dragzone: HTMLElement): void {
        let beforeX = 0;
        let beforeY = 0;
        let dx = 0;
        let dy = 0;
        let ny = 0;
        let nx = 0;

        function dragMouseUp() {
            document.removeEventListener("mouseup", dragMouseUp);
            document.removeEventListener("mousemove", dragMouseMove);

            element.classList.remove("cc-palette-container-moving");
            console.log(`pallete up 이벤트`)
        }

        function dragMouseMove(event: any) {
            event.preventDefault();
            dx = beforeX - event.clientX;
            dy = beforeY - event.clientY;
            beforeX = event.clientX;
            beforeY = event.clientY;

            ny = element.offsetTop - dy < 0 ? 0 : element.offsetTop - dy;
            ny = window.innerHeight - element.offsetHeight < ny ? window.innerHeight - element.offsetHeight : ny;

            nx = window.innerWidth - (element.offsetLeft + element.offsetWidth) + dx < 0 ? 0 : window.innerWidth - (element.offsetLeft + element.offsetWidth) + dx;
            nx = element.offsetLeft < 0 ? window.innerWidth - element.offsetWidth : nx;

            element.style.top = `${ny}px`;
            element.style.right = `${nx}px`;
        }

        function dragMouseDown(event: any) {
            event.preventDefault();

            beforeX = event.clientX;
            beforeY = event.clientY;

            element.classList.add("cc-palette-container-moving")
            document.addEventListener("mouseup", dragMouseUp);
            document.addEventListener("mousemove", dragMouseMove);
            console.log(`pallete down 이벤트`)
        }

        dragzone.addEventListener("mousedown", dragMouseDown);
    }

    injectContent() {
        if (this.body && this.palette)
            this.body.insertAdjacentElement("afterend", this.palette);
    }
}
