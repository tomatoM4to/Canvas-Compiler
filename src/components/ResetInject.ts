export class CanvasElements {
    private static instance: CanvasElements;

    private _width: number;
    private _height: number;
    private body: HTMLElement | null;
    private main: HTMLElement | null;
    private palette: HTMLElement | null;
    private canvas: HTMLElement | null;

    private paletteMovingButton: HTMLElement | null;
    private paletteContainer: HTMLElement | null;

    private constructor() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this.body = document.querySelector('body');
        this.main = document.querySelector('main');
        this.palette = document.createElement('div');
        this.canvas = document.createElement('div');
        this.paletteMovingButton = null;
        this.paletteContainer = null;
    }

    public static getInstance(): CanvasElements {
        if (!CanvasElements.instance) {
            CanvasElements.instance = new CanvasElements();
        }
        return CanvasElements.instance
    }

    resetCanvasTemplate(a: string) {
        if (this.canvas) {
            this.canvas.innerHTML = a;
        }
    }


    injectContent() {
        if (this.main && this.canvas)
            this.main.insertAdjacentElement("afterend", this.canvas);
    }
    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}


export class PaletteElements {
    private static instance: PaletteElements;

    private palette: HTMLElement | null;
    private body: HTMLElement | null;
    private paletteMovingButton: HTMLElement | null;
    private paletteContainer: HTMLElement | null;

    private constructor() {
        this.body = document.querySelector('body');
        this.palette = document.createElement('div');
        this.paletteMovingButton = null;
        this.paletteContainer = null;
    }

    public static getInstance(): PaletteElements {
        if (!PaletteElements.instance) {
            PaletteElements.instance = new PaletteElements();
        }
        return PaletteElements.instance
    }

    resetPaletteTemplate(a: string) {
        if (this.palette) {
            this.palette.innerHTML = a;
            this.paletteMovingButton = this.palette.querySelector("#cc-palette-moving-icon");
            this.paletteContainer = this.palette.querySelector(".cc-palette-container");
            if (this.paletteContainer && this.paletteMovingButton)
                this.dragEventListener(this.paletteContainer, this.paletteMovingButton);
        }
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

            element.classList.remove("cc-palette-container-moving")
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
        }

        dragzone.addEventListener("mousedown", dragMouseDown);
    }

    injectContent() {
        if (this.body && this.palette)
            this.body.insertAdjacentElement("afterend", this.palette);
    }
}
