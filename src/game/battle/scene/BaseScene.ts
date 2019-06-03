import { MapLayer } from "./layer/MapLayer";
import { Camera } from "./Camera";

export class BaseScene extends Laya.Sprite {
    protected mapLayer: MapLayer;
    protected camera: Camera = new Camera();
    constructor() {
        super();
        //GameLayer.instacne.sceneLayer.addChild(this);
        this.initLayer();
    }

    protected initLayer(): void {
        this.mapLayer = new MapLayer();
        this.addChild(this.mapLayer);
    }

    protected mapReader() {

    }

    protected initEvent(): void {
        this.mapLayer.on(Laya.Event.CLICK, this, this.mapClick);
        Laya.timer.frameLoop(1, this, this.loop);
    }

    protected removeEvent(): void {
        this.mapLayer.off(Laya.Event.CLICK, this, this.mapClick);
        Laya.timer.clear(this, this.loop);
    }

    protected loop(): void {
    }

    public hide(visible: boolean): void {
        this.mapLayer.mouseEnabled = visible;
        visible ? this.initEvent() : this.removeEvent();
    }

    public dispose(): void {
        this.removeEvent();
        this.mapLayer.clear();
    }

    protected mapClick(e: Laya.Event): void {
    }
}