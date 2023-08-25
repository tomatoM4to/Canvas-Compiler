export class CanvasCompilerElements {
    private static instance: CanvasCompilerElements;

    private _width: number;
    private _height: number;
    private _body: HTMLElement | null;
    private _main: HTMLElement | null;
    private _palette: HTMLElement | null;
    private _canvas: HTMLElement | null;

    private paletteMovingButton: HTMLElement | null;
    private paletteContainer: HTMLElement | null;

    private constructor() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._body = document.querySelector('body');
        this._main = document.querySelector('main');
        this._palette = document.createElement('div');
        this._canvas = document.createElement('div');
        this.paletteMovingButton = null;
        this.paletteContainer = null;
    }

    public static getInstance() {
        if (!CanvasCompilerElements.instance) {
            CanvasCompilerElements.instance = new CanvasCompilerElements();
        }
        return CanvasCompilerElements.instance
    }

    resetPaletteTemplate(a: string) {
        if (this._palette) {
            this._palette.innerHTML = a;
            this.paletteMovingButton = this._palette.querySelector("#cc-palette-moving-icon");
            this.paletteContainer = this._palette.querySelector(".cc-palette-container");
            if (this.paletteContainer && this.paletteMovingButton)
                this.dragEventListener(this.paletteContainer, this.paletteMovingButton);
        }
    }

    resetCanvasTemplate(a: string) {
        if (this._canvas) {
            this._canvas.innerHTML = a;
        }
    }

    private dragEventListener(element: HTMLElement, dragzone: HTMLElement) {
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


    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get body(): HTMLElement | null {
        return this._body;
    }

    get main(): HTMLElement | null {
        return this._main;
    }

    get palette(): HTMLElement | null {
        return this._palette;
    }

    get canvas(): HTMLElement | null {
        return this._canvas;
    }

    set main(value: HTMLElement | null) {
        this._main = value;
    }
}
