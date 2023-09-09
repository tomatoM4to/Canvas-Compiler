import {Command} from "@/components/Toolbar";
import {konvaSettings} from "@/app/content";
import Konva from "konva";

export class SnapCommand implements Command {
    private snap: Snap;

    constructor(snap: Snap) {
        this.snap = snap;
    }

    addEvent() {
        this.snap.addEvent();
    }
    removeEvent() {
        this.snap.removeEvent();
    }
}

export class Snap {
    private GUIDELINE_OFFSET: number = 5;

    addEvent() {
        konvaSettings.layer.on('dragmove', (e: any) => {
            // clear all previous lines on the screen
            konvaSettings.layer.find('.guid-line').forEach((l) => l.destroy());

            if (konvaSettings.transfomer.nodes().length > 1) return;

            let lineGuideStops = this.getLineGuideStops(konvaSettings.transfomer.nodes()[0]);

            let itemBounds = this.getObjectSnappingEdges(konvaSettings.transfomer.nodes()[0]);

            let guides = this.getGuides(lineGuideStops, itemBounds);

            // do nothing of no snapping
            if (!guides.length) {
                return;
            }

            this.drawGuides(guides);

            let absPos = e.target.absolutePosition();

            guides.forEach((lg: any) => {
                switch (lg.snap) {
                    case 'start': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                    case 'center': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                    case 'end': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                }
            });
            e.target.absolutePosition(absPos);
        });
        konvaSettings.layer.on('dragend', function (e) {
            konvaSettings.layer.find('.guid-line').forEach((l) => l.destroy());
        });
    }
    removeEvent() {

    }
    private getLineGuideStops(skipShape: Konva.Node) {
        let vertical: number[] = [0, konvaSettings.stage.width() / 2, konvaSettings.stage.width()];
        let horizontal: number[] = [0, konvaSettings.stage.height() / 2, konvaSettings.stage.height()];

        konvaSettings.stage.find('.rect').forEach((guideItem) => {
            if (guideItem === skipShape) {
                return;
            }

            let box = guideItem.getClientRect();

            vertical.push(...[box.x, box.x + box.width, box.x + box.width / 2]);
            horizontal.push(...[box.y, box.y + box.height, box.y + box.height / 2]);
        });
        return {
            vertical: vertical.flat(),
            horizontal: horizontal.flat(),
        };
    }

    private getObjectSnappingEdges(node: Konva.Node) {
        let box = node.getClientRect();
        let absPos = node.absolutePosition();

        return {
            vertical: [
                {
                    guide: Math.round(box.x),
                    offset: Math.round(absPos.x - box.x),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.x + box.width / 2),
                    offset: Math.round(absPos.x - box.x - box.width / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.x + box.width),
                    offset: Math.round(absPos.x - box.x - box.width),
                    snap: 'end',
                },
            ],
            horizontal: [
                {
                    guide: Math.round(box.y),
                    offset: Math.round(absPos.y - box.y),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.y + box.height / 2),
                    offset: Math.round(absPos.y - box.y - box.height / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.y + box.height),
                    offset: Math.round(absPos.y - box.y - box.height),
                    snap: 'end',
                },
            ],
        };
    }

    private getGuides(lineGuideStops: any, itemBounds: any) {
        let resultV: any[] = [];
        let resultH: any[] = [];

        lineGuideStops.vertical.forEach((lineGuide: any) => {
            itemBounds.vertical.forEach((itemBound: any) => {
                let diff = Math.abs(lineGuide - itemBound.guide);
                // if the distance between guild line and object snap point is close we can consider this for snapping
                if (diff < this.GUIDELINE_OFFSET) {
                    resultV.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        lineGuideStops.horizontal.forEach((lineGuide: any) => {
            itemBounds.horizontal.forEach((itemBound: any) => {
                let diff = Math.abs(lineGuide - itemBound.guide);
                if (diff < this.GUIDELINE_OFFSET) {
                    resultH.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        var guides = [];

        // find closest snap
        let minV = resultV.sort((a, b) => a.diff - b.diff)[0];
        let minH = resultH.sort((a, b) => a.diff - b.diff)[0];
        if (minV) {
            guides.push({
                lineGuide: minV.lineGuide,
                offset: minV.offset,
                orientation: 'V',
                snap: minV.snap,
            });
        }
        if (minH) {
            guides.push({
                lineGuide: minH.lineGuide,
                offset: minH.offset,
                orientation: 'H',
                snap: minH.snap,
            });
        }
        return guides;
    }

    private drawGuides(guides: any) {
        guides.forEach((lg: any) => {
            if (lg.orientation === 'H') {
                let line = new Konva.Line({
                    points: [-6000, 0, 6000, 0],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                konvaSettings.layer.add(line);
                line.absolutePosition({
                    x: 0,
                    y: lg.lineGuide,
                });
            } else if (lg.orientation === 'V') {
                let line = new Konva.Line({
                    points: [0, -6000, 0, 6000],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                konvaSettings.layer.add(line);
                line.absolutePosition({
                    x: lg.lineGuide,
                    y: 0,
                });
            }
        });
    }
}
