import {Command} from "@/components/Toolbar";
import Konva from "konva";
import {canvasEditorUi, konvaSettings} from "@/scripts/content";

export class ImageCommand implements Command {
    private image: Image;

    constructor(image: Image) {
        this.image = image;
    }
    addEvent() {
        this.image.addEvent();
    }
    removeEvent() {
        this.image.removeEvent();
    }
}

export class Image {
    private selectionRectangle: Konva.Rect;
    private x1: number | undefined;
    private y1: number | undefined;
    private x2: number | undefined;
    private y2: number | undefined;


    constructor() {
        this.selectionRectangle = new Konva.Rect({
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 2,
            dash: [4, 4],
            visible: false,
        });
        konvaSettings.layer.add(this.selectionRectangle);
    }

    addEvent() {
        this.selectionRectangle.moveToTop();

        konvaSettings.stage.on('mousedown touchstart', (e) => this.mouseDown(e));
        konvaSettings.stage.on('mousemove touchmove', (e) => this.mouseMove(e));
        konvaSettings.stage.on('mouseup touchend', (e) => this.mouseUp(e));

    }
    removeEvent() {
        konvaSettings.stage.off('mousedown touchstart');
        konvaSettings.stage.off('mousemove touchmove');
        konvaSettings.stage.off('mouseup touchend');
    }

    private mouseDown(e: any) {
        if (e.target !== konvaSettings.stage) return;

        e.evt.preventDefault();

        this.x1 = konvaSettings.stage.getPointerPosition()?.x;
        this.y1 = konvaSettings.stage.getPointerPosition()?.y;
        this.x2 = konvaSettings.stage.getPointerPosition()?.x;
        this.y2 = konvaSettings.stage.getPointerPosition()?.y;

        this.selectionRectangle.visible(true);
        this.selectionRectangle.width(0);
        this.selectionRectangle.height(0);
    }

    private mouseMove(e: any) {
        if (!this.selectionRectangle.visible()) {
            return;
        }
        e.evt.preventDefault();
        this.x2 = konvaSettings.stage.getPointerPosition()?.x;
        this.y2 = konvaSettings.stage.getPointerPosition()?.y;

        this.selectionRectangle.setAttrs({
            // @ts-ignore
            x: Math.min(this.x1, this.x2),
            // @ts-ignore
            y: Math.min(this.y1, this.y2),
            // @ts-ignore
            width: Math.abs(this.x2 - this.x1),
            // @ts-ignore
            height: Math.abs(this.y2 - this.y1),
        });
    }

    private mouseUp(e: any) {
        if (!this.selectionRectangle.visible()) {
            return;
        }
        e.evt.preventDefault();
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
            this.selectionRectangle.visible(false);
        });
        let pos = konvaSettings.stage.getPointerPosition();
        this.createImage(pos);
    }
    private createImage(pos: any) {
        Konva.Image.fromURL('https://images.unsplash.com/photo-1693825252036-76714587d220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2248&q=80',  (darthNode) => {
            darthNode.setAttrs({
                x: this.x1,
                y: this.y1,
                width: this.selectionRectangle.width(),
                height: this.selectionRectangle.height(),
                cornerRadius: [0, 20, 0, 20],
                name: 'rect',
            });
            konvaSettings.layer.add(darthNode);
            konvaSettings.transfomer.nodes([darthNode]);
            canvasEditorUi.updateEditor(darthNode);
            canvasEditorUi.infoSetting(darthNode);
        });

    }
}
