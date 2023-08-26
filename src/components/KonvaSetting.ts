import {Stage} from "konva/lib/Stage";
import {Layer} from "konva/lib/Layer";
import Konva from "konva";
import {CanvasElements} from "@/components/ResetInject";
import {mousedownHandler, mousemoveHandler, mouseupHandler} from "@/components/compontFunction";


export default class KonvaSettings {
    private static instance: KonvaSettings;

    private _stage: Stage;
    private _layer: Layer;
    private constructor() {
        this._stage = new Konva.Stage({
            container: 'canvas-compiler',
            width: CanvasElements.getInstance().width,
            height: CanvasElements.getInstance().height,
        });
        this._layer = new Konva.Layer();
        this._stage.add(this._layer);
    }

    get layer(): Layer {
        return this._layer;
    }
    get stage(): Stage {
        return this._stage;
    }


    public static getInstance() {
        if (!KonvaSettings.instance) {
            KonvaSettings.instance = new KonvaSettings();
        }
        return KonvaSettings.instance
    }
}
