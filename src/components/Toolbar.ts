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

