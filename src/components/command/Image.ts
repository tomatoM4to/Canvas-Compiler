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
    addEvent() {
        konvaSettings.stage.on("click", () => {
            let pos = konvaSettings.stage.getPointerPosition();
            console.log(`image 전`)
            this.createImage(pos);
            console.log(`image 완료`)
        })

    }
    removeEvent() {
        konvaSettings.stage.off("click");
    }

    private createImage(pos: any) {
        Konva.Image.fromURL('https://images.unsplash.com/photo-1693825252036-76714587d220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2248&q=80', function (darthNode) {
            darthNode.setAttrs({
                x: pos.x,
                y: pos.y,
                scaleX: 0.5,
                scaleY: 0.5,
                width: 200,
                height: 200,
                name: 'rect',
            });
            konvaSettings.layer.add(darthNode);
            konvaSettings.transfomer.nodes([darthNode]);
            canvasEditorUi.updateEditor(darthNode);
            canvasEditorUi.infoSetting(darthNode);
        });

    }
}
