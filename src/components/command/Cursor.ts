import {Command} from "@/components/Toolbar";
import {konvaSettings} from "@/scripts/content";

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
    addEvent() {
        konvaSettings.layer.getChildren().forEach(shape => {
            shape.draggable(true);
        });
        konvaSettings.transfomer.nodes(konvaSettings.layer.getChildren().slice(1));
    }

    removeEvent() {
        konvaSettings.layer.getChildren().forEach(shape => {
            shape.draggable(false);
        });
        konvaSettings.transfomer.nodes([]);
    }
}
