import Konva from "konva";
import {CanvasElements} from "@/components/Canvas";
import {konvaSettings} from "@/scripts/content";
import chatGPT from "@/components/generate";

export default class CanvasEditorUi {
    private _shape: Konva.Rect | null = null;
    private _text: Konva.Text | null = null;
    private _image: Konva.Image | null = null;

    // editor
    public shapeEditor: HTMLDivElement | null = null;
    public stageEditor: HTMLDivElement | null = null;
    public textEditor: HTMLDivElement | null = null;
    public imageEditor: HTMLDivElement | null = null;

    // shape
    private prompt: HTMLTextAreaElement | null = null;
    private radiusTopLeft: HTMLInputElement | null = null;
    private radiusTopRight: HTMLInputElement | null = null;
    private radiusBottomLeft: HTMLInputElement | null = null;
    private radiusBottomRight: HTMLInputElement | null = null;
    private backgroundColor: HTMLInputElement | null = null;
    private stroke: HTMLInputElement | null = null;
    private strokeColor: HTMLInputElement | null = null;
    private upButton: HTMLButtonElement | null = null;
    private downButton: HTMLButtonElement | null = null;
    private effect : HTMLElement | null = null;
    private effectIntensity : HTMLElement | null = null;

    // stage
    private generateButton: HTMLButtonElement | null = null;
    private mainPrompt: HTMLTextAreaElement | null = null;
    private backgroundColorStage: HTMLInputElement | null = null;

    // text
    private textPrompt: HTMLTextAreaElement | null = null;
    private textColor: HTMLInputElement | null = null;
    private textSize: HTMLInputElement | null = null;
    private textWeight: HTMLInputElement | null = null;
    private textUp: HTMLButtonElement | null = null;
    private textDown: HTMLButtonElement | null = null;

    // image
    private imagePrompt: HTMLTextAreaElement | null = null;
    private imageUrl: HTMLInputElement | null = null;
    private imageRadiusTopLeft: HTMLInputElement | null = null;
    private imageRadiusTopRight: HTMLInputElement | null = null;
    private imageRadiusBottomRight: HTMLInputElement | null = null;
    private imageRadiusBottomLeft: HTMLInputElement | null = null;
    private imageUp: HTMLButtonElement | null = null;
    private imageDown: HTMLButtonElement | null = null;

    constructor(canvas: CanvasElements) {
        if (!canvas.canvas) return;

        // editor
        this.shapeEditor = canvas.canvas.querySelector("#cc-canvas-shape-editor");
        this.stageEditor = canvas.canvas.querySelector("#cc-canvas-stage-editor");
        this.textEditor = canvas.canvas.querySelector("#cc-canvas-text-editor");
        this.imageEditor = canvas.canvas.querySelector("#cc-canvas-image-editor");

        // shape editor ui
        this.prompt = canvas.canvas.querySelector("#canvas-compiler-prompt");
        this.radiusTopLeft = canvas.canvas.querySelector("#radius-topleft");
        this.radiusTopRight = canvas.canvas.querySelector("#radius-topright");
        this.radiusBottomRight = canvas.canvas.querySelector("#radius-bottomright");
        this.radiusBottomLeft = canvas.canvas.querySelector("#radius-bottomleft");
        this.backgroundColor = canvas.canvas.querySelector("#canvas-compiler-background-shape");
        this.stroke = canvas.canvas.querySelector("#canvas-compiler-stroke");
        this.strokeColor = canvas.canvas.querySelector("#canvas-compiler-stroke-color");
        this.effect = canvas.canvas.querySelector("#canvas-compiler-effect");
        this.effectIntensity = canvas.canvas.querySelector("#canvas-compiler-effect-intensity");
        this.upButton = canvas.canvas.querySelector("#canvas-compiler-up-button");
        this.downButton = canvas.canvas.querySelector("#canvas-compiler-down-button");

        // stage editor ui
        this.generateButton = canvas.canvas.querySelector("#canvas-compiler-generate");
        this.mainPrompt = canvas.canvas.querySelector("#cc-canvas-stage-editor");
        this.backgroundColorStage = canvas.canvas.querySelector("#canvas-compiler-background-stage");

        // text ui
        this.textPrompt = canvas.canvas.querySelector("#canvas-compiler-text-prompt");
        this.textColor = canvas.canvas.querySelector("#canvas-compiler-text-color");
        this.textSize = canvas.canvas.querySelector("#canvas-compiler-text-size");
        this.textWeight = canvas.canvas.querySelector("#canvas-compiler-text-weight");
        this.textUp = canvas.canvas.querySelector("#canvas-compiler-text-up-button");
        this.textDown = canvas.canvas.querySelector("#canvas-compiler-text-down-button");

        // image ui
        this.imagePrompt = canvas.canvas.querySelector("#canvas-compiler-image-prompt");
        this.imageUrl = canvas.canvas.querySelector("#canvas-compiler-image-url");
        this.imageRadiusTopLeft = canvas.canvas.querySelector("#radius-image-topleft");
        this.imageRadiusTopRight = canvas.canvas.querySelector("#radius-image-topright");
        this.imageRadiusBottomRight = canvas.canvas.querySelector("#radius-image-bottomright");
        this.imageRadiusBottomLeft = canvas.canvas.querySelector("#radius-image-bottomleft");
        this.imageUp = canvas.canvas.querySelector("#canvas-compiler-image-up-button");
        this.imageDown = canvas.canvas.querySelector("#canvas-compiler-image-down-button");
    }

    addEventListener() {
        // shape
        this.prompt?.addEventListener('input', (e: any) => {
            if (!this.shape) return;
            this.shape.id(`${e.target.value}`);
        })
        this.radiusTopLeft?.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLInputElement;
            const cornerRadiusValue = this.shape?.cornerRadius();

            if (!Array.isArray(cornerRadiusValue))
                return;

            cornerRadiusValue[0] = Number(target.value);
            konvaSettings.layer.draw();
        });
        this.radiusTopRight?.addEventListener('change', (event: Event) => {
            if (!this.shape) return;

            let target = event.target as HTMLInputElement;
            const cornerRadiusValue = this.shape?.cornerRadius();

            if (!Array.isArray(cornerRadiusValue))
                return;

            cornerRadiusValue[1] = Number(target.value);
            konvaSettings.layer.draw();
        })
        this.radiusBottomRight?.addEventListener('change', (event: any) => {
            let target = event.target as HTMLInputElement;
            const cornerRadiusValue = this.shape?.cornerRadius();

            if (!Array.isArray(cornerRadiusValue))
                return;

            cornerRadiusValue[2] = Number(target.value);
            konvaSettings.layer.draw();
        })
        this.radiusBottomLeft?.addEventListener('change', (event: any) => {
            let target = event.target as HTMLInputElement;
            const cornerRadiusValue = this.shape?.cornerRadius();

            if (!Array.isArray(cornerRadiusValue))
                return;

            cornerRadiusValue[3] = Number(target.value);
            konvaSettings.layer.draw();
        })
        this.backgroundColor?.addEventListener('change', (e: any) => {
            if (!this.shape) return;

            this.shape.fill(`${e.target.value}`);
        })
        this.strokeColor?.addEventListener('change', (e: any) => {
            if (!this.shape) return;

            this.shape.stroke(`${e.target.value}`);
        })
        this.stroke?.addEventListener('change', (e: any) => {
            if (!this.shape) return;

            this.shape.strokeWidth(Number(e.target.value));
        })
        this.upButton?.addEventListener('click', () => {
            this.shape?.moveUp();
        })
        this.downButton?.addEventListener('click', () => {
            this.shape?.moveDown();
        })

        // stage
        this.generateButton?.addEventListener("click", () => {
            chatGPT(konvaSettings.stage.toJSON());
        })
        this.mainPrompt?.addEventListener('input', (e: any) => {
            konvaSettings.stage.id(`${e.target.value}`)
        })
        this.backgroundColorStage?.addEventListener('input', (e: any) => {
            konvaSettings.stage.container().style.backgroundColor = e.target.value;
        })

        // text
        this.textPrompt?.addEventListener("input", (e: any) => {
            this.text?.id(`${e.target.value}`);
        })
        this.textColor?.addEventListener("input", (e: any) => {
            this.text?.fill(`${e.target.value}`);
        })
        this.textSize?.addEventListener("input", (e: any) => {
            this.text?.fontSize(Number(e.target.value));
        })
        this.textWeight?.addEventListener("input", (e: any) => {
            this.text?.fontStyle(`${e.target.value}`);
        })
        this.textUp?.addEventListener("click", (e: any) => {
            this.text?.moveUp();
        })
        this.textDown?.addEventListener("click", (e: any) => {
            this.text?.moveDown();
        })

        // image
        this.imagePrompt?.addEventListener("input", (e: any) => {
            this.image?.id(`${e.target.value}`);
        })
        this.imageUrl?.addEventListener("input", (e: any) => {
            if (this.image) {
                let htmlImage: HTMLImageElement = this.image.image() as HTMLImageElement;
                htmlImage.onload = () => {
                    konvaSettings.layer.draw();
                };
                htmlImage.src = e.target.value;
            }
        })
        this.imageRadiusTopLeft?.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            const cornerRadiusValue = this.image?.cornerRadius();

            if (!Array.isArray(cornerRadiusValue))
                return;

            cornerRadiusValue[0] = Number(target.value);
            konvaSettings.layer.draw();

            cornerRadiusValue[0] = Number(target.value);
            konvaSettings.layer.draw();
        })
        this.imageRadiusTopRight?.addEventListener("input", (event: any) => {
            let target = event.target as HTMLInputElement;
            const cornerRadiusValue = this.image?.cornerRadius();

            if (!Array.isArray(cornerRadiusValue))
                return;

            cornerRadiusValue[0] = Number(target.value);
            konvaSettings.layer.draw();

            cornerRadiusValue[0] = Number(target.value);
            konvaSettings.layer.draw();
        })

        this.imageRadiusBottomRight?.addEventListener("input", (event: any) => {
            let target = event.target as HTMLInputElement;
            const cornerRadiusValue = this.image?.cornerRadius();

            if (!Array.isArray(cornerRadiusValue))
                return;

            cornerRadiusValue[0] = Number(target.value);
            konvaSettings.layer.draw();

            cornerRadiusValue[0] = Number(target.value);
            konvaSettings.layer.draw();
        })

        this.imageRadiusBottomLeft?.addEventListener("input", (event: any) => {
            let target = event.target as HTMLInputElement;
            const cornerRadiusValue = this.image?.cornerRadius();

            if (!Array.isArray(cornerRadiusValue))
                return;

            cornerRadiusValue[0] = Number(target.value);
            konvaSettings.layer.draw();

            cornerRadiusValue[0] = Number(target.value);
            konvaSettings.layer.draw();
        })

        this.imageUp?.addEventListener("click", (e: any) => {
            this.image?.moveUp();
        })
        this.imageDown?.addEventListener("click", (e: any) => {
            this.image?.moveDown();
        })
    }

    infoSetting(target: Konva.Text | Konva.Rect | Konva.Image | Konva.Stage) {
        if (target instanceof Konva.Text) {
            this.text = target;
            this.image = null;
            this.shape = null;
            if (!this.textPrompt) return;
            if (!this.textColor) return;
            if (!this.textSize) return;
            if (!this.textWeight) return;
            this.textPrompt.value = target.id();
            this.textColor.value = target.fill();
            this.textSize.value = target.fontSize().toString();
            this.textWeight.value = target.fontStyle();
            return;
        }
        if (target instanceof Konva.Image) {
            this.image = target;
            this.shape = null;
            this.text = null;

            let imageElement = target.image() as HTMLImageElement;
            console.log(this.image);
            console.log(target.image());
            let cornerRadius = target.cornerRadius() as number[];
            if (!this.imagePrompt) return;
            if (!this.imageUrl) return;
            if (!this.imageRadiusTopLeft) return;
            if (!this.imageRadiusTopRight) return;
            if (!this.imageRadiusBottomRight) return;
            if (!this.imageRadiusBottomLeft) return;
            this.imagePrompt.value = target.id();
            this.imageUrl.value = imageElement.src;
            this.imageRadiusTopLeft.value = cornerRadius[0].toString();
            this.imageRadiusTopRight.value = cornerRadius[1].toString();
            this.imageRadiusBottomRight.value = cornerRadius[2].toString();
            this.imageRadiusBottomLeft.value = cornerRadius[3].toString();
            return;
        }

        if (target instanceof Konva.Rect) {
            this.shape = target;
            this.text = null;
            this.image = null;

            let cornerRadius = target.cornerRadius() as number[];
            if (!this.prompt) return;
            if (!this.radiusTopLeft) return;
            if (!this.radiusTopRight) return;
            if (!this.radiusBottomRight) return;
            if (!this.radiusBottomLeft) return;
            if (!this.radiusTopLeft) return;
            if (!this.radiusTopLeft) return;
            if (!this.radiusTopLeft) return;
            if (!this.backgroundColor) return;
            if (!this.strokeColor) return;
            if (!this.stroke) return;

            this.prompt.value = target.id();
            this.radiusTopLeft.value = cornerRadius[0].toString();
            this.radiusTopRight.value = cornerRadius[1].toString();
            this.radiusBottomRight.value = cornerRadius[2].toString();
            this.radiusBottomLeft.value = cornerRadius[3].toString();

            this.backgroundColor.value = target.fill();
            this.strokeColor.value = target.stroke();
            this.stroke.value = target.strokeWidth().toString();
            return;
        }
        if (!this.mainPrompt) return;
        this.shape = null;
        this.text = null;
        this.image = null;
        this.mainPrompt.value = konvaSettings.stage.id();
        // @ts-ignore
        this.backgroundColorStage.value = konvaSettings.stage.style.backgroundColor;
    }

    updateEditor(target: Konva.Rect | Konva.Text | Konva.Stage | Konva.Image) {
        if (target instanceof Konva.Text) {
            this.shapeEditor?.classList.add("cc-canvas-compiler-display-none");
            this.stageEditor?.classList.add("cc-canvas-compiler-display-none");
            this.textEditor?.classList.remove("cc-canvas-compiler-display-none");
            this.imageEditor?.classList.add("cc-canvas-compiler-display-none");
            return;
        }
        if (target instanceof  Konva.Image) {
            this.shapeEditor?.classList.add("cc-canvas-compiler-display-none");
            this.stageEditor?.classList.add("cc-canvas-compiler-display-none");
            this.textEditor?.classList.add("cc-canvas-compiler-display-none");
            this.imageEditor?.classList.remove("cc-canvas-compiler-display-none");
            return;
        }
        if (target instanceof Konva.Rect) {
            this.shapeEditor?.classList.remove("cc-canvas-compiler-display-none");
            this.stageEditor?.classList.add("cc-canvas-compiler-display-none");
            this.textEditor?.classList.add("cc-canvas-compiler-display-none");
            this.imageEditor?.classList.add("cc-canvas-compiler-display-none");
            return;
        }
        this.shapeEditor?.classList.add("cc-canvas-compiler-display-none");
        this.stageEditor?.classList.remove("cc-canvas-compiler-display-none");
        this.textEditor?.classList.add("cc-canvas-compiler-display-none");
        this.imageEditor?.classList.add("cc-canvas-compiler-display-none");
        return;
    }


    get shape(): Konva.Rect | null {
        return this._shape;
    }
    set shape(value: Konva.Rect | null) {
        this._shape = value;
    }
    get text(): Konva.Text | null {
        return this._text;
    }
    set text(value: Konva.Text | null) {
        this._text = value;
    }
    get image(): Konva.Image | null {
        return this._image;
    }
    set image(value: Konva.Image | null) {
        this._image = value;
    }
}
