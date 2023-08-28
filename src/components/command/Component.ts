import Konva from "konva";
import {konvaSettings} from "@/scripts/content";
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
        this.isDrawing = true;
        this.rect = new Konva.Rect({
            // @ts-ignore
            x: konvaSettings.stage.getPointerPosition().x,
            // @ts-ignore
            y: konvaSettings.stage.getPointerPosition().y,
            width: 0,
            height: 0,
            fill: PaletteElements.getInstance().color,
            stroke: "blue",
            draggable: false,
            // Todo: modyfy name
            name: 'rect',
        })
        konvaSettings.layer.add(this.rect).batchDraw();
    }

    private mouseupHandler() {
        if (!this.isDrawing) return;
        this.isDrawing = false;
    }

    private mousemoveHandler() {
        if (!this.isDrawing) return false;
        // @ts-ignore
        let newWidth = konvaSettings.stage.getPointerPosition().x - this.rect.x();
        // @ts-ignore
        let newHeight = konvaSettings.stage.getPointerPosition().y - this.rect.y();
        // @ts-ignore
        this.rect.width(newWidth).height(newHeight);
        konvaSettings.layer.batchDraw();
    }
}

