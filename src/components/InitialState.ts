export class CanvasCompilerElements {
    public width: number;
    public height: number;
    public body: HTMLElement | null;
    public main: HTMLElement | null;
    public palette: HTMLElement | null;

    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.body = document.querySelector('body');
        this.main = document.querySelector('main');
        this.palette = document.createElement('div');
    }
}
