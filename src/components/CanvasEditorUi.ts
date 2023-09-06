import Konva from "konva";
import {CanvasElements} from "@/components/Canvas";
import {canvasEditorUi, konvaSettings} from "@/scripts/content";

export default class CanvasEditorUi {
    get stageEditor(): HTMLElement | null {
        return this._stageEditor;
    }
    get shapeEditor(): HTMLElement | null {
        return this._shapeEditor;
    }
    private _shape: Konva.Shape | null = null;

    private _shapeEditor: HTMLElement | null = null;
    private _stageEditor: HTMLElement | null = null;

    private _prompt: HTMLElement | null = null;
    private _radiusTopLeft: HTMLElement | null = null;
    private _radiusTopRight: HTMLElement | null = null;
    private _radiusBottomLeft: HTMLElement | null = null;
    private _radiusBottomRight: HTMLElement | null = null;
    private _backgroundColor: HTMLElement | null = null;
    private _stroke: HTMLElement | null = null;
    private _strokeColor: HTMLElement | null = null;

    private _upButton: HTMLElement | null = null;
    private _downButton: HTMLElement | null = null;

    private _effect : HTMLElement | null = null;
    private _effectIntensity : HTMLElement | null = null;

    private _backgroundColorStage: HTMLElement | null = null;

    constructor(canvas: CanvasElements) {
        if (!canvas.canvas) return;

        this._shapeEditor = canvas.canvas.querySelector("#cc-canvas-shape-editor");
        this._stageEditor = canvas.canvas.querySelector("#cc-canvas-stage-editor");

        this._prompt = canvas.canvas.querySelector("#canvas-compiler-prompt");
        this._radiusTopLeft = canvas.canvas.querySelector("#radius-topleft");
        this._radiusTopRight = canvas.canvas.querySelector("#radius-topright");
        this._radiusBottomRight = canvas.canvas.querySelector("#radius-bottomright");
        this._radiusBottomLeft = canvas.canvas.querySelector("#radius-bottomleft");
        this._backgroundColor = canvas.canvas.querySelector("#canvas-compiler-background-shape");
        this._stroke = canvas.canvas.querySelector("#canvas-compiler-stroke");
        this._strokeColor = canvas.canvas.querySelector("#canvas-compiler-stroke-color");

        this._upButton = canvas.canvas.querySelector("#canvas-compiler-up-button");
        this._downButton = canvas.canvas.querySelector("#canvas-compiler-down-button");

        this._effect = canvas.canvas.querySelector("#canvas-compiler-effect");
        this._effectIntensity = canvas.canvas.querySelector("#canvas-compiler-effect-intensity");

        this._backgroundColorStage = canvas.canvas.querySelector("#canvas-compiler-background-stage");
    }

    addEventListener() {
        this.prompt?.addEventListener('input', (e: any) => {
            if (!this.shape) return;
            this.shape.id(`${e.target.value}`);
            konvaSettings.layer.draw();
        })
        this.radiusTopLeft?.addEventListener('input', (e: any) => {
            if (!this.shape) return;
            // @ts-ignore
            this.shape.cornerRadius()[0] = e.target.value;
            konvaSettings.layer.draw();
        })
        this.radiusTopRight?.addEventListener('input', (e: any) => {
            if (!this.shape) return;
            // @ts-ignore
            this.shape.cornerRadius()[1] = e.target.value;
            konvaSettings.layer.draw();
        })
        this.radiusBottomRight?.addEventListener('input', (e: any) => {
            if (!this.shape) return;
            // @ts-ignore
            this.shape.cornerRadius()[2] = e.target.value;
            konvaSettings.layer.draw();
        })
        this.radiusBottomLeft?.addEventListener('input', (e: any) => {
            if (!this.shape) return;
            // @ts-ignore
            this.shape.cornerRadius()[3] = e.target.value;
            konvaSettings.layer.draw();
        })
        this.backgroundColor?.addEventListener('input', (e: any) => {
            if (!this.shape) return;
            // @ts-ignore
            this.shape.fill(`${e.target.value}`);
            konvaSettings.layer.draw();
        })
        this.strokeColor?.addEventListener('input', (e: any) => {
            if (!this.shape) return;
            // @ts-ignore
            this.shape.stroke(`${e.target.value}`);
            konvaSettings.layer.draw();
        })
        this.stroke?.addEventListener('input', (e: any) => {
            if (!this.shape) return;
            // @ts-ignore
            this.shape.strokeWidth(Number(e.target.value));
            // konvaSettings.layer.draw();
        })
        this.upButton?.addEventListener('click', () => {
            this.shape?.moveUp();
        })
        this.downButton?.addEventListener('click', () => {
            this.shape?.moveDown();
        })
        this.backgroundColorStage?.addEventListener('input', (e: any) => {
            konvaSettings.stage.container().style.backgroundColor = e.target.value;
        })
    }

    shapeInfoSetting(target: any) {
        canvasEditorUi.shape = target;

        // @ts-ignore
        canvasEditorUi.prompt.value = target.id();
        // @ts-ignore
        canvasEditorUi.radiusTopLeft.value = target.cornerRadius()[0];
        // @ts-ignore
        canvasEditorUi.radiusTopRight.value = target.cornerRadius()[1];
        // @ts-ignore
        canvasEditorUi.radiusBottomRight.value = target.cornerRadius()[2];
        // @ts-ignore
        canvasEditorUi.radiusBottomLeft.value = target.cornerRadius()[3];
        // @ts-ignore
        canvasEditorUi.backgroundColor.value = target.fill();
        // @ts-ignore
        canvasEditorUi.strokeColor.value = target.stroke();
        // @ts-ignore
        canvasEditorUi.stroke.value = target.strokeWidth();
    }

    get shape(): Konva.Shape | null {
        return this._shape;
    }

    set shape(value: Konva.Shape | null) {
        this._shape = value;
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

    get upButton(): HTMLElement | null {
        return this._upButton;
    }

    get downButton(): HTMLElement | null {
        return this._downButton;
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

    get backgroundColorStage(): HTMLElement | null {
        return this._backgroundColorStage;
    }


}
