import Konva from "konva";
import {konvaSettings} from "@/scripts/content";

// @ts-ignore
let rect = null;
let isDrawing = false;

export function mousedownHandler() {
    isDrawing = true;
    rect = new Konva.Rect({
        // @ts-ignore
        x: konvaSettings.stage.getPointerPosition().x,
        // @ts-ignore
        y: konvaSettings.stage.getPointerPosition().y,
        width: 0,
        height: 0,
        fill: '#fffff',
        stroke: "blue",
        draggable: false,
    })
    konvaSettings.layer.add(rect).batchDraw();
}

export function mouseupHandler() {
    isDrawing = false;

}

export function mousemoveHandler() {
    if (!isDrawing) return false;
    // @ts-ignore
    const newWidth = konvaSettings.stage.getPointerPosition().x - rect.x();
    // @ts-ignore
    const newHeight = konvaSettings.stage.getPointerPosition().y - rect.y();
    // @ts-ignore
    rect.width(newWidth).height(newHeight);
    konvaSettings.layer.batchDraw();
}
