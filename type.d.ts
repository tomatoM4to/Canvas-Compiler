declare module "*.html" {
    const content: string;
    export default content;
}

type GuideStops = {
    vertical: number[];
    horizontal: number[];
}

type ObjectSnappingEdge = {
    vertical: OffSet[];
    horizontal: OffSet[];
}

type OffSet = {
    guide: number;
    offset: number;
    snap: 'start' | 'center' | 'end';
}

type LineGuide = {
    lineGuide: number;
    offset: number;
    orientation: 'V' | 'H';
    snap: 'start' | 'center' | 'end';
}
