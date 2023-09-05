export class CanvasElements {
    private static instance: CanvasElements;

    private _width: number;
    private _height: number;
    private canvasHeight: number;

    private main: HTMLElement | null;
    private canvasContainer: HTMLElement | null;
    private canvas: HTMLElement | null;
    private resizeButton: HTMLElement | null;

    private modifyUi: HTMLElement | null;

    private constructor() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this.canvasHeight = 0;
        this.main = document.querySelector('main');
        this.canvasContainer = document.createElement('div');
        this.canvas = null;
        this.resizeButton = null;
        this.modifyUi = null;
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
            this.modifyUi = this.canvasContainer.querySelector('.cc-canvas-client-container');
        }
        if (this.canvas) {
            this.canvas.style.height = `${this.canvasHeight}px`;
            // this.modifyUi.style.height = `${this.canvasHeight}px`;
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
}
