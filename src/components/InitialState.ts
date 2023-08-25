export class CanvasCompilerElements {
    private _width: number;
    private _height: number;
    private _body: HTMLElement | null;
    private _main: HTMLElement | null;
    private _palette: HTMLElement | null;

    constructor(paletteTemplate: string) {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._body = document.querySelector('body');
        this._main = document.querySelector('main');
        this._palette = document.createElement('div');
        this._palette.innerHTML = paletteTemplate;
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
}
