export class CanvasCompilerElements {
    private static instance: CanvasCompilerElements;

    private _width: number;
    private _height: number;
    private _body: HTMLElement | null;
    private _main: HTMLElement | null;
    private _palette: HTMLElement | null;
    private _canvas: HTMLElement | null;

    private constructor() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._body = document.querySelector('body');
        this._main = document.querySelector('main');
        this._palette = document.createElement('div');
        this._canvas = document.createElement('div');
    }

    public static getInstance() {
        if (!CanvasCompilerElements.instance) {
            CanvasCompilerElements.instance = new CanvasCompilerElements();
        }
        return CanvasCompilerElements.instance
    }

    resetPaletteTemplate(a: string) {
        if (this._palette) this._palette.innerHTML = a;
    }

    resetCanvasTemplate(a: string) {
        if (this._canvas) {
            this._canvas.innerHTML = a;
        }
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
