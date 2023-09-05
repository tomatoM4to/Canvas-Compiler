export class CanvasElements {
    private static instance: CanvasElements;

    private _width: number;
    private _height: number;
    private canvasHeight: number;

    private main: HTMLElement | null;
    private canvasContainer: HTMLElement | null;
    private canvas: HTMLElement | null;
    private resizeButton: HTMLElement | null;

    private _prompt: HTMLElement | null = null;
    private _radiusTopLeft: HTMLElement | null = null;
    private _radiusTopRight: HTMLElement | null = null;
    private _radiusBottomLeft: HTMLElement | null = null;
    private _radiusBottomRight: HTMLElement | null = null;
    private _backgroundColor: HTMLElement | null = null;
    private _stroke: HTMLElement | null = null;
    private _strokeColor: HTMLElement | null = null;
    private _effect : HTMLElement | null = null;
    private _effectIntensity : HTMLElement | null = null;

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
            this.canvas = this.canvasContainer.querySelector(".cc-canvas-compiler-ui");
            this.resizeButton = this.canvasContainer.querySelector(".cc-canvas-resizer");

            this._prompt = this.canvasContainer.querySelector("#canvas-compiler-prompt");
            this._radiusTopLeft = this.canvasContainer.querySelector("#radius-topleft");
            this._radiusTopRight = this.canvasContainer.querySelector("#radius-topright");
            this._radiusBottomRight = this.canvasContainer.querySelector("#radius-bottomright");
            this._radiusBottomLeft = this.canvasContainer.querySelector("#radius-bottomleft");
            this._backgroundColor = this.canvasContainer.querySelector("#canvas-compiler-background");
            this._stroke = this.canvasContainer.querySelector("#canvas-compiler-stroke");
            this._strokeColor = this.canvasContainer.querySelector("#canvas-compiler-stroke-color");
            this._effect = this.canvasContainer.querySelector("#canvas-compiler-effect");
            this._effectIntensity = this.canvasContainer.querySelector("#canvas-compiler-effect-intensity");
        }
        if (this.canvas) {
            this.canvas.style.height = `${this.canvasHeight}px`;
        }
        if (this.canvas && this.resizeButton) {
            this.dragEventListener(this.canvas, this.resizeButton);
        }
    }


    injectContent() {
        if (this.main && this.canvasContainer)
            this.main.insertAdjacentElement("afterend", this.canvasContainer);
    }

    private dragEventListener(canvas: HTMLElement, resizerButton: HTMLElement) {
        let dy: number = 0, oldY: number = 0;

        function dragMouseUp() {
            document.removeEventListener("mouseup", dragMouseUp);
            document.removeEventListener("mousemove", dragMouseMove);
            console.log(`canvas up 이벤트`)
        }

        function dragMouseMove(event: any) {
            event.preventDefault();

            dy = oldY - event.clientY;
            oldY = event.clientY;
            canvas.style.height = `${canvas.offsetHeight + dy}px`;
            // modyfyUi.style.height = `${canvas.offsetHeight + dy}px`;
        }

        function dragMouseDown(event: any) {
            event.preventDefault();

            oldY = event.clientY;

            document.addEventListener("mouseup", dragMouseUp);
            document.addEventListener("mousemove", dragMouseMove);
            console.log(`canvas down 이벤트`)
        }

        resizerButton.addEventListener("mousedown", dragMouseDown);
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get prompt(): HTMLElement | null {
        return this._prompt;
    }

    get radiusTopLeft(): HTMLElement | null {
        return this._radiusTopLeft;
    }

    get radiusTopRight(): HTMLElement | null {
        return this._radiusTopRight;
    }

    get radiusBottomRight(): HTMLElement | null {
        return this._radiusBottomRight;
    }

    get radiusBottomLeft(): HTMLElement | null {
        return this._radiusBottomLeft;
    }

    get backgroundColor(): HTMLElement | null {
        return this._backgroundColor;
    }

    get stroke(): HTMLElement | null {
        return this._stroke;
    }

    get strokeColor(): HTMLElement | null {
        return this._strokeColor;
    }

    get effect(): HTMLElement | null {
        return this._effect;
    }

    get effectIntensity(): HTMLElement | null {
        return this._effectIntensity;
    }
}
