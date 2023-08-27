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
