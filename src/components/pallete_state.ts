import {CanvasCompilerElements} from "@/components/ResetInject";

export default class PalleteState{
    private feature: string;
    private color: string;

    constructor(canvasCompiler: CanvasCompilerElements) {
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
