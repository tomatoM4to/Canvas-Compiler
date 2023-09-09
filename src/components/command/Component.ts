import Konva from "konva";
import {canvasEditorUi, konvaSettings} from "@/scripts/content";
import {PaletteElements} from "@/components/Pallete";
import {Command} from "@/components/Toolbar";


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
        konvaSettings.stage.on("mousedown", this.mousedownHandler);
        konvaSettings.stage.on("mousemove", this.mousemoveHandler)
        konvaSettings.stage.on("mouseup", this.mouseupHandler)
    }
    removeEvent() {
        konvaSettings.stage.off("mousedown");
        konvaSettings.stage.off("mousemove");
        konvaSettings.stage.off("mouseup");
    }

    private mousedownHandler() {
        let pointerPosition = konvaSettings.stage.getPointerPosition();
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
            cornerRadius: [0, 10, 30, 90],
            stroke: 'black',
            strokeWidth: 4,
            id: "primpt",
        })
        konvaSettings.layer.add(this.rect).batchDraw();
    }

    private mouseupHandler() {
        if (!this.isDrawing || !this.rect) return;

        konvaSettings.transfomer.nodes([this.rect]);
        canvasEditorUi.updateEditor(this.rect);
        canvasEditorUi.infoSetting(this.rect);
        this.isDrawing = false;
    }

    private mousemoveHandler() {
        let pointerPosition = konvaSettings.stage.getPointerPosition();
        if (!this.isDrawing || !pointerPosition || !this.rect) return false;
        let newWidth = pointerPosition.x - this.rect.x();
        let newHeight = pointerPosition.y - this.rect.y();
        this.rect.width(newWidth).height(newHeight);
        konvaSettings.layer.batchDraw();
    }
}

