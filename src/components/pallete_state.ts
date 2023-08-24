export default class PalleteState{
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
