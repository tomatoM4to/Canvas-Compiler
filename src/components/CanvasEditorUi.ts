import Konva from "konva";
import {CanvasElements} from "@/components/Canvas";

export default class CanvasEditorUi {
    private _shape: Konva.Shape | null = null;

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

    constructor(canvas: CanvasElements) {
        if (!canvas.canvas) return;
        this._prompt = canvas.canvas.querySelector("#canvas-compiler-prompt");
        this._radiusTopLeft = canvas.canvas.querySelector("#radius-topleft");
        this._radiusTopRight = canvas.canvas.querySelector("#radius-topright");
        this._radiusBottomRight = canvas.canvas.querySelector("#radius-bottomright");
        this._radiusBottomLeft = canvas.canvas.querySelector("#radius-bottomleft");
        this._backgroundColor = canvas.canvas.querySelector("#canvas-compiler-background");
        this._stroke = canvas.canvas.querySelector("#canvas-compiler-stroke");
        this._strokeColor = canvas.canvas.querySelector("#canvas-compiler-stroke-color");
        this._effect = canvas.canvas.querySelector("#canvas-compiler-effect");
        this._effectIntensity = canvas.canvas.querySelector("#canvas-compiler-effect-intensity");
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
