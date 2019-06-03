import { BaseLayer } from "./layer/BaseLayer";

export class DebugGridLayer extends BaseLayer {

    public update(): void {
    }

    private w: number;
    private h: number;
    private data: any;
    public showGrid(w: number, h: number, data: any): void {
        // return;
        this.graphics.clear();
        this.w = w;
        this.h = h;
        this.data = data;
        var col: number = Math.ceil(w / 512) * 32;
        var row: number = Math.ceil(h / 512) * 32;
        for (var i: number = 0; i < data._nodes.length; i++) {
            for (var j: number = 0; j < data._nodes[i].length; j++) {
                var grid: number = (data._nodes[i][j]).walkable ? 1 : 0;
                if (new Laya.Rectangle(Math.abs(this.x), Math.abs(this.y), this.stage.width, this.stage.height).intersects(new Laya.Rectangle(j * 16, i * 16, 15, 15))) {
                    this.graphics.drawRect(j * 16, i * 16, 15, 15, (data._nodes[i][j]).walkable ? "#ffffff" : "#000000");
                }

            }
        }
        this.alpha = 0.5;
    }
}