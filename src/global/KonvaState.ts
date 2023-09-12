import Konva from "konva";
import {CanvasElements} from "@/components/Canvas";


export default class KonvaState {
    private _stage: Konva.Stage;
    private _layer: Konva.Layer;
    private _transfomer: Konva.Transformer;

    constructor() {
        this._stage = new Konva.Stage({
            container: 'canvas-compiler',
            width: CanvasElements.getInstance().width * 0.8,
            height: CanvasElements.getInstance().height,
        });
        this._layer = new Konva.Layer();
        this._transfomer = new Konva.Transformer({
            rotationSnaps: [0, 90, 180, 270],
        });
        this.reset();
    }

    reset() {
        this.stage.add(this.layer);
        this.layer.add(this.transfomer);
    }

    get layer(): Konva.Layer {
        return this._layer;
    }
    get stage(): Konva.Stage {
        return this._stage;
    }
    get transfomer(): Konva.Transformer {
        return this._transfomer;
    }
}
