import {Command} from "@/global/Toolbar";
import {context, konvaState} from "@/app/content";

export class ContextCommand implements Command {
    private context: Context;

    constructor(context: Context) {
        this.context = context;
    }
    addEvent() {
        this.context.addEvent();
    }
    removeEvent() {
        this.context.removeEvent();
    }
}

export class Context {
    addEvent() {
        konvaState.stage.on("contextmenu", (e) => {
            e.evt.preventDefault();
            if (e.target === konvaState.stage) return;

            context.updatePos();
        })
        window.addEventListener('click', () => {
            context.displayNone();
        });
    }
    removeEvent() {

    }
}
