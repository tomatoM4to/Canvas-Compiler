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
    }
}

export class Component {
    addEvent() {
        const pallete_state = new PalleteState();

        const cursorIcon: HTMLElement | null = document.querySelector("#cursor");
        cursorIcon?.addEventListener("click", () => {
            pallete_state.changeFeature("cursor");
            console.log(pallete_state);
        })


        const layoutIcon: HTMLElement | null = document.querySelector("#layout");
        layoutIcon?.addEventListener("click", () => {
            pallete_state.changeFeature("layout");
            console.log(pallete_state);
        })


        const colorPicker: HTMLElement | null = document?.querySelector("#cc-color-picker");
        colorPicker?.addEventListener('input', (e) => {
            // @ts-ignore
            pallete_state.changeColor(e.target.value);
            console.log(pallete_state);
        })
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
