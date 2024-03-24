import Konva from "konva";
import {canvasEditorUi, konvaState} from "@/app/content";
import {PaletteElements} from "@/components/Pallete";
import {Command} from "@/global/Toolbar";


export class ComponentCommand implements Command {
    private component: Component;
    constructor(component: Component) {
        this.component = component;
    }
    addEvent() {
        this.component.addEvent();
    }
    removeEvent() {
        this.component.removeEvent();
    }
}

export class Component {
    private rect: null | Konva.Rect = null;
    private isDrawing: boolean = false;

    addEvent() {
        konvaState.stage.on("mousedown", this.mousedownHandler);
        konvaState.stage.on("mousemove", this.mousemoveHandler)
        konvaState.stage.on("mouseup", this.mouseupHandler)
    }
    removeEvent() {
        konvaState.stage.off("mousedown");
        konvaState.stage.off("mousemove");
        konvaState.stage.off("mouseup");
    }

    private mousedownHandler() {
        let pointerPosition = konvaState.stage.getPointerPosition();
        if (!pointerPosition) return;

        this.isDrawing = true;
        this.rect = new Konva.Rect({
            x: pointerPosition.x,
            y: pointerPosition.y,
            width: 0,
            height: 0,
            fill: PaletteElements.getInstance().color,
            draggable: false,
            // Todo: modyfy name
            name: 'rect',
            cornerRadius: [0, 0, 0, 0],
            stroke: 'black',
            strokeWidth: 0,
            id: "primpt",
        })
        konvaState.layer.add(this.rect).batchDraw();
    }

    private mouseupHandler() {
        if (!this.isDrawing || !this.rect) return;

        konvaState.transfomer.nodes([this.rect]);
        canvasEditorUi.updateEditor(this.rect);
        canvasEditorUi.infoSetting(this.rect);
        this.isDrawing = false;
    }

    private mousemoveHandler() {
        let pointerPosition = konvaState.stage.getPointerPosition();
        if (!this.isDrawing || !pointerPosition || !this.rect) return false;
        let newWidth = Math.abs(pointerPosition.x - this.rect.x());
        let newHeight = Math.abs(pointerPosition.y - this.rect.y());
        this.rect.width(newWidth).height(newHeight);
        konvaState.layer.batchDraw();
    }
}

