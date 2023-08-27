import Konva from "konva";

export default class ActivatedState {
    private static instance: ActivatedState;
    private _activateState: Activate[];

    private constructor() {
        this._activateState = [];
    }

    public static getInstance(): ActivatedState {
        if (!ActivatedState.instance) {
            ActivatedState.instance = new ActivatedState();
        }
        return ActivatedState.instance;
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
