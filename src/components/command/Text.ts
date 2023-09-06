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
        text.on("dblclick", () => this.dbClickEvent(text));
        canvasEditorUi.text = text;
    }

    private dbClickEvent(text: Konva.Text) {
        console.log(`db click`);
        text.hide();
        konvaSettings.transfomer.hide();

        let textPosition = text.absolutePosition();

        let areaPosition = {
            x: konvaSettings.stage.container().offsetLeft + textPosition.x,
            y: konvaSettings.stage.container().offsetTop + textPosition.y,
        };

        let textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = text.text();
        textarea.style.position = 'absolute';
        textarea.style.top = `${areaPosition.y}px`;
        textarea.style.left = `${areaPosition.x}px`;
        textarea.style.width = `${text.width() - text.padding() * 2}px'`;
        textarea.style.height = `${text.height() - text.padding() * 2 + 5}px`;
        textarea.style.fontSize = `${text.fontSize()}px`;
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        // @ts-ignore
        textarea.style.lineHeight = text.lineHeight();
        textarea.style.fontFamily = text.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = text.align();
        textarea.style.color = text.fill();

        let rotation = text.rotation();
        let transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }

        let px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        let isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(text.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            // @ts-ignore
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            text.show();
            konvaSettings.transfomer.show();
            konvaSettings.transfomer.forceUpdate();
        }

        function setTextareaWidth(newWidth: any) {
            if (!newWidth) {
                // @ts-ignore
                newWidth = text.placeholder.length * text.fontSize();
            }
            // some extra fixes on different browsers
            let isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            let isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }

            // @ts-ignore
            let isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
                text.text(textarea.value);
                removeTextarea();
            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
                removeTextarea();
            }
        });

        textarea.addEventListener('keydown', function (e) {
            let scale = text.getAbsoluteScale().x;
            setTextareaWidth(text.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
                textarea.scrollHeight + text.fontSize() + 'px';
        });

        function handleOutsideClick(e: any) {
            if (e.target !== textarea) {
                text.text(textarea.value);
                removeTextarea();
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    }
}
