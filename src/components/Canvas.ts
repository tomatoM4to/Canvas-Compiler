export class CanvasElements {
    private static instance: CanvasElements;

    private _width: number;
    private _height: number;
    private canvasHeight: number;

    private main: HTMLElement | null;
    private canvasContainer: HTMLElement | null;
    private canvas: HTMLElement | null;
    private resizeButton: HTMLElement | null;

    private constructor() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this.canvasHeight = 0;
        this.main = document.querySelector('main');
        this.canvasContainer = document.createElement('div');
        this.canvas = null;
        this.resizeButton = null;
    }

    public static getInstance(): CanvasElements {
        if (!CanvasElements.instance) {
            CanvasElements.instance = new CanvasElements();
        }
        return CanvasElements.instance
    }

    resetCanvasTemplate(template: string) {
        if (this.canvasContainer) {
            this.canvasContainer.innerHTML = template;
        }
        if (this.canvasContainer) {
            this.canvas = this.canvasContainer.querySelector("#canvas-compiler");
            this.resizeButton = this.canvasContainer.querySelector("#cc-canvas-resizer-icon");
        }
        if (this.canvas) {
            this.canvas.style.height = `${this.canvasHeight}px`;
        }
    }


    injectContent() {
        if (this.main && this.canvasContainer)
            this.main.insertAdjacentElement("afterend", this.canvasContainer);
    }


    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}
