import {konvaSettings} from "@/app/content";

export interface Command {
    addEvent(): void;
    removeEvent(): void;
}

export class Toolbar {
    private command: Command;

    constructor(command: Command) {
        this.command = command;
    }

    setCommand(command: Command) {
        this.command = command;
    }

    addEvent() {
        konvaSettings.transfomer.moveToTop();
        this.command.addEvent();
    }

    removeEvent() {
        this.command.removeEvent();
    }
}

