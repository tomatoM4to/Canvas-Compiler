import Konva from "konva";
import {layer, stage} from "@/scripts/content";

// @ts-ignore
let rect = null;
let isDrawing = false;

export function mousedownHandler() {
    isDrawing = true;
    rect = new Konva.Rect({
        // @ts-ignore
        x: stage.getPointerPosition().x,
        // @ts-ignore
        y: stage.getPointerPosition().y,
        width: 0,
        height: 0,
        fill: "lightblue",
        stroke: "blue"
    })
    layer.add(rect).batchDraw();
}

export function mouseupHandler() {
    isDrawing = false;

}

export function mousemoveHandler() {
    if (!isDrawing) return false;
    // @ts-ignore
    const newWidth = stage.getPointerPosition().x - rect.x();
    // @ts-ignore
    const newHeight = stage.getPointerPosition().y - rect.y();
    // @ts-ignore
    rect.width(newWidth).height(newHeight);
    layer.batchDraw();
}
