import Konva from "konva";

export default class ActivatedState {
    private _activateState: Activate[];

    constructor() {
        this._activateState = [];
    }
    appendActivate(activate: Activate) {
        this.activateState.push(activate);
    }
    get activateState(): Activate[] {
        return this._activateState;
    }
}

export class Activate {
    private id: string;
    private shape: Konva.Rect;
    constructor(id: string, shape: Konva.Rect) {
        this.id = id;
        this.shape = shape;
    }
}
