import {Command} from "@/components/Toolbar";
import {konvaSettings} from "@/scripts/content";
import Konva from "konva";

export class CursorCommand implements Command {
    private cursor: Cursor;

    constructor(cursor: Cursor) {
        this.cursor = cursor;
    }
    addEvent() {
        this.cursor.addEvent();
    }
    removeEvent() {
        this.cursor.removeEvent();
    }
}


export class Cursor {
    private selectionRectangle: Konva.Rect;
    private x1: number | undefined;
    private y1: number | undefined;
    private x2: number | undefined;
    private y2: number | undefined;

    constructor() {
        this.selectionRectangle = new Konva.Rect({
            fill: 'rgba(0,0,255,0.5)',
            visible: false,
        });
        konvaSettings.layer.add(this.selectionRectangle);
    }

    addEvent() {
        konvaSettings.layer.getChildren().forEach(shape => {
            shape.draggable(true);
        });


        konvaSettings.stage.on('mousedown touchstart', (e: any) => {
            if (e.target !== konvaSettings.stage) {
                return;
            }
            e.evt.preventDefault();
            this.x1 = konvaSettings.stage.getPointerPosition()?.x;
            this.y1 = konvaSettings.stage.getPointerPosition()?.y;
            this.x2 = konvaSettings.stage.getPointerPosition()?.x;
            this.y2 = konvaSettings.stage.getPointerPosition()?.y;

            this.selectionRectangle.visible(true);
            this.selectionRectangle.width(0);
            this.selectionRectangle.height(0);
            console.log(`Cursor: mouse down event`);
        });


        konvaSettings.stage.on('mousemove touchmove', (e: any) => {
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
            console.log(`Cursor: mouse move event`);
        })

        konvaSettings.stage.on('mouseup touchend', (e: any) => {
            if (!this.selectionRectangle.visible()) {
                return;
            }
            e.evt.preventDefault();
            // update visibility in timeout, so we can check it in click event
            setTimeout(() => {
                this.selectionRectangle.visible(false);
            });

            let shapes = konvaSettings.stage.find('.rect');
            let box = this.selectionRectangle.getClientRect();
            let selected = shapes.filter((shape: any) =>
                Konva.Util.haveIntersection(box, shape.getClientRect())
            );
            konvaSettings.transfomer.nodes(selected);
            console.log(`Cursor: mouse up event`);
        });
    }

    removeEvent() {
        konvaSettings.layer.getChildren().forEach(shape => {
            shape.draggable(false);
        });
        konvaSettings.transfomer.nodes([]);
    }
}
