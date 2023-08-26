import {konvaSettings} from "@/scripts/content";
import {mousedownHandler, mouseupHandler, mousemoveHandler} from "@/components/compontFunction";

export interface Command {
    addEvent(): void;
    removeEvent(): void;
}

export class Toolbar {
    private command: Command;

    constructor(command: Command) {
        this.command = command;
    }

    addEvent() {
        this.command.addEvent();
    }

    removeEvent() {
        this.command.removeEvent();
    }
}


export class ComponentCommand implements Command {
    private component: Component;
    constructor(component: Component) {
        this.component = component;
    }
    addEvent() {
        this.component.addEvent();
    }
    removeEvent() {
        this.component.removeEvent();
    }
}

export class Component {
    addEvent() {
        konvaSettings.stage.on("mousedown", mousedownHandler);
        konvaSettings.stage.on("mousemove", mousemoveHandler)
        konvaSettings.stage.on("mouseup", mouseupHandler)
    }
    removeEvent() {
        konvaSettings.stage.off("mousedown");
        konvaSettings.stage.off("mousemove");
        konvaSettings.stage.off("mouseup");
    }
}


export class PalleteState{
    private feature: string;
    private color: string;

    constructor() {
        this.feature = 'cursor';
        this.color = '#ffff';
    }

    changeFeature(feature: string) {
        this.feature = feature;
    }

    changeColor(color: string) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }
}
