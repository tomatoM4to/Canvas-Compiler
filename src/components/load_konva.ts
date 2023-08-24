import {mousedownHandler, mousemoveHandler, mouseupHandler} from "@/components/drawing";
import {layer, stage} from "@/scripts/content";

export function RefreshKonva() {
    stage.on("mousedown", mousedownHandler)
    stage.on("mousemove", mousemoveHandler)
    stage.on("mouseup", mouseupHandler)

    stage.add(layer);
}
