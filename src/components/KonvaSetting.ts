import {Stage} from "konva/lib/Stage";
import {Layer} from "konva/lib/Layer";
import Konva from "konva";
import {CanvasElements} from "@/components/Canvas";


export default class KonvaSettings {
    private static instance: KonvaSettings;

    private _stage: Konva.Stage;
    private _layer: Konva.Layer;
    private _transfomer: Konva.Transformer;

    private constructor() {
        this._stage = new Konva.Stage({
            container: 'canvas-compiler',
            width: CanvasElements.getInstance().width,
            height: CanvasElements.getInstance().height,
        });
        this._layer = new Konva.Layer();
        this._transfomer = new Konva.Transformer({
            rotationSnaps: [0, 90, 180, 270],
        });
    }

    reset() {
        this.stage.add(this.layer);
        this.layer.add(this.transfomer);
    }

    get layer(): Layer {
        return this._layer;
    }
    get stage(): Stage {
        return this._stage;
    }
    get transfomer(): Konva.Transformer {
        return this._transfomer;
    }

    public static getInstance() {
        if (!KonvaSettings.instance) {
            KonvaSettings.instance = new KonvaSettings();
        }
        return KonvaSettings.instance
    }
}
