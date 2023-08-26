import {Stage} from "konva/lib/Stage";
import {Layer} from "konva/lib/Layer";
import Konva from "konva";
import {CanvasCompilerElements} from "@/components/ResetInject";
import {mousedownHandler, mousemoveHandler, mouseupHandler} from "@/components/drawing";


export default class KonvaSettings {
    private static instance: KonvaSettings;

    private _stage: Stage;
    private _layer: Layer;
    private constructor() {
        this._stage = new Konva.Stage({
            container: 'canvas-compiler',
            width: CanvasCompilerElements.getInstance().width,
            height: CanvasCompilerElements.getInstance().height,
        });
        this._layer = new Konva.Layer();
        this.event()
        this._stage.add(this._layer);
    }

    event() {
        this._stage.on("mousedown", mousedownHandler)
        this._stage.on("mousemove", mousemoveHandler)
        this._stage.on("mouseup", mouseupHandler)
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
