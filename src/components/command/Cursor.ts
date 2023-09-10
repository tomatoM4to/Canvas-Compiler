import {Command} from "@/global/Toolbar";
import {canvasEditorUi, konvaState} from "@/app/content";
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
        konvaState.layer.add(this.selectionRectangle);
    }

    addEvent() {
        konvaState.layer.getChildren().forEach(shape => {
            shape.draggable(true);
        });
        // Todo If there are multiple layers, it can be modified.
        this.selectionRectangle.moveToTop();
        konvaState.stage.on('mousedown touchstart', (e) => this.mouseDown(e));
        konvaState.stage.on('mousemove touchmove', (e) => this.mouseMove(e));
        konvaState.stage.on('mouseup touchend', (e) => this.mouseUp(e));
        konvaState.stage.on('click tap', (e) => this.mouseClick(e));
    }

    removeEvent() {
        konvaState.layer.getChildren().forEach(shape => {
            shape.draggable(false);
        });
        konvaState.stage.off('mousedown touchstart');
        konvaState.stage.off('mousemove touchmove');
        konvaState.stage.off('mouseup touchend');
        konvaState.stage.off('click tap');
        konvaState.transfomer.nodes([]);
    }

    private mouseDown(e: any) {
        if (
            e.target.name().startsWith("top-left") ||
            e.target.name().startsWith("top-center") ||
            e.target.name().startsWith('top-right') ||
            e.target.name().startsWith('middle-left') ||
            e.target.name().startsWith('middle-right') ||
            e.target.name().startsWith('bottom-left') ||
            e.target.name().startsWith('bottom-center') ||
            e.target.name().startsWith('bottom-right') ||
            e.target.name().startsWith('rotater') ||
            konvaState.transfomer.nodes().length >= 2
        ) return;


        if (e.target !== konvaState.stage) {
            konvaState.transfomer.nodes([e.target]);

            canvasEditorUi.updateEditor(e.target);

            canvasEditorUi.infoSetting(e.target);
            return;
        }

        e.evt.preventDefault();
        this.x1 = konvaState.stage.getPointerPosition()?.x;
        this.y1 = konvaState.stage.getPointerPosition()?.y;
        this.x2 = konvaState.stage.getPointerPosition()?.x;
        this.y2 = konvaState.stage.getPointerPosition()?.y;

        this.selectionRectangle.visible(true);
        this.selectionRectangle.width(0);
        this.selectionRectangle.height(0);
    }

    private mouseMove(e: any) {
        if (!this.selectionRectangle.visible()) {
            return;
        }
        e.evt.preventDefault();
        this.x2 = konvaState.stage.getPointerPosition()?.x;
        this.y2 = konvaState.stage.getPointerPosition()?.y;

        if (!this.x1 || !this.x2 || !this.y1 || !this.y2) return;

        this.selectionRectangle.setAttrs({
            x: Math.min(this.x1, this.x2),
            y: Math.min(this.y1, this.y2),
            width: Math.abs(this.x2 - this.x1),
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

        let shapes = konvaState.stage.find('.rect');
        let box = this.selectionRectangle.getClientRect();
        let selected = shapes.filter((shape: any) =>
            Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        konvaState.transfomer.nodes(selected);
        canvasEditorUi.stageEditor?.classList.remove("cc-canvas-compiler-display-none");
        canvasEditorUi.shapeEditor?.classList.add("cc-canvas-compiler-display-none");
    }

    private mouseClick(e: any) {
        // if click on empty area - remove all selections
        if (e.target === konvaState.stage) {
            konvaState.transfomer.nodes([]);
            canvasEditorUi.updateEditor(e.target);
            return;
        }

        // do nothing if clicked NOT on our rectangles
        if (!e.target.hasName('rect')) {
            return;
        }

        // do we pressed shift or ctrl?
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = konvaState.transfomer.nodes().indexOf(e.target) >= 0;

        if (!metaPressed && !isSelected) {
            // if no key pressed and the node is not selected
            // select just one
            konvaState.transfomer.nodes([e.target]);
        } else if (metaPressed && isSelected) {
            // if we pressed keys and node was selected
            // we need to remove it from selection:
            const nodes = konvaState.transfomer.nodes().slice(); // use slice to have new copy of array
            // remove node from array
            nodes.splice(nodes.indexOf(e.target), 1);
            konvaState.transfomer.nodes(nodes);
        } else if (metaPressed && !isSelected) {
            // add the node into selection
            const nodes = konvaState.transfomer.nodes().concat([e.target]);
            konvaState.transfomer.nodes(nodes);
        }
    }
}
