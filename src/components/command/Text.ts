import {Command} from "@/components/Toolbar";
import {canvasEditorUi, konvaSettings} from "@/scripts/content";
import Konva from "konva";
import {PaletteElements} from "@/components/Pallete";

export class TextCommand implements Command {
    private text: Text;

    constructor(text: Text) {
        this.text = text;
    }

    addEvent() {
        this.text.addEvent();
    }

    removeEvent() {
        this.text.removeEvent();
    }
}

export class Text {
    addEvent() {
        konvaSettings.stage.on("click", () => {
            let pos = konvaSettings.stage.getPointerPosition();
            this.createText(pos)
        });
    }
    removeEvent() {
        konvaSettings.stage.off("click");
    }

    createText(pos: any) {
        let text: Konva.Text = new Konva.Text({
            x: pos.x,
            y: pos.y,
            text: "sample text",
            fontSize: 30,
            fill: PaletteElements.getInstance().color,
            name: 'rect',
            fontStyle: 'normal',
        });
        text.on('transform', () => {
            text.setAttrs({
                width: Math.max(text.width() * text.scaleX(), 20),
                scaleX: 1,
                scaleY: 1,
            });
        });
        konvaSettings.layer.add(text);
        canvasEditorUi.updateEditor(text);
        konvaSettings.transfomer.nodes([text]);
        canvasEditorUi.text = text;
    }
}
