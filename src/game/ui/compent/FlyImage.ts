export class FlyImage extends Laya.Image {
    private mStart: Laya.Point
    public set start(value: Laya.Point) {
        this.mStart = value;
    }

    private mEnd: Laya.Point;
    public set end(value: Laya.Point) {
        this.mEnd = value;
    }

    private mWH: Laya.Point;
    private set wh(value: Laya.Point) {
        this.mWH = value;
    }

    private mValue: number = 0;
    public get value(): number {
        return this.mValue;
    }

    public set value(v: number) {
        this.mValue = v;
        this.x = (1 - v) * (1 - v) * this.mStart.x + (1 - v) * this.mWH.x + (v + 1) * v * this.mEnd.x;
        this.y = (1 - v) * (1 - v) * this.mStart.y + (1 - v) * this.mWH.y + (v + 1) * v * this.mEnd.y;
    }

    public tween(start: Laya.Point, wh: Laya.Point, end: Laya.Point, time: number): void {
        this.start = start;
        this.wh = wh;
        this.end = end;
        Laya.Tween.to(this, { value: 0.55 }, time, null, Laya.Handler.create(this, () => {
            this.recover();
        }));
    }

    public static createFly(): FlyImage {
        return Laya.Pool.getItemByClass("FlyImage", FlyImage);
    }

    public recover(): void {
        this.mStart = null;
        this.mEnd = null;
        this.mWH = null;
        this.mValue = 0;
        if (!this.parent) {
            return
        }
        this.removeSelf();
        // Laya.loader.cacheRes(this.skin,true);这个干吗的？把true放进缓存？
        Laya.Pool.recover("FlyImage", this);
    }
}