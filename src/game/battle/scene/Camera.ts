

import Rectangle = laya.maths.Rectangle;
import Timer = laya.utils.Timer;
import { Astar } from './../../../framework/utils/Astar';


export class Camera {


    private _viewport: Rectangle;
    private _worldW: number;
    private _worldH: number;

    /** 视图宽高的一半 */
    private _sw: number;
    private _sh: number;

    private _maxOrigin: Laya.Point;
    private _moveStart: Laya.Point;;
    private _moveEnd: Laya.Point;;
    private _moveAngle: number = 0;
    private _moveCallback: Function;
    private _pivotx:number = 0;
    private _pivoty:number = 0;

    /**
     * @param viewport  可视区域
     * @param view  视图区域
     */
    public constructor() {
        this._viewport = new Rectangle;
        this._maxOrigin = new Laya.Point;;
        this._worldH = 0;
        this._worldW = 0;
        this._sw = 0;
        this._sh = 0;
    }

    public Init(mapWidth , mapHeight , x , y ,origMapWidth,origMapHeight , pivotx,pivoty)
    {
        this._viewport.width = Laya.stage.width;
        this._viewport.height = Laya.stage.height;
        this._viewport.x = x;
        this._viewport.y = y;
        this._worldW = mapWidth;
        this._worldH = mapHeight;
        this._pivotx = pivotx;
        this._pivoty = pivoty;
        this._sw = Math.floor(Laya.stage.width) >> 1;
        this._sh = Math.floor(Laya.stage.height) >> 1;
        this._maxOrigin.x = origMapWidth -this._viewport.width ;
        this._maxOrigin.y = origMapHeight-pivoty+102;//犹豫屏幕竖屏下方会有102像素的hudbuttom
        //this._maxOrigin.y = Astar.instance.OrigMapHeight-this._viewport.height;
    }

    public setViewport(x, y, w, h) {

        this._viewport.x = x;
        this._viewport.y = y;
        this._viewport.width = w;
        this._viewport.height = h;
        this._sw = Math.floor(w) >> 1;
        this._sh = Math.floor(h) >> 1;
        this._maxOrigin.x = this._worldW - this._viewport.width;
        this._maxOrigin.y = this._worldH - this._viewport.height
    }


    public setWorldSize(w, h) {
        this._worldW = w;
        this._worldH = h;
        this._maxOrigin.x = w - Astar.instance.PIVOTX;
        this._maxOrigin.y = h - this._viewport.height
    }

    public get viewport(): Rectangle {
        return this._viewport;
    }

    public get originX(): number {
        return this._viewport.x;
    }
    public get originY(): number {
        return this._viewport.y;
    }


    /**
     * 设置镜头笛卡尔坐标原点相对于地图坐标
     * @param x 
     * @param y 
     */
    public setOrigin(x: number, y: number,offsetX = 0, offsetY = 0 ): void {
        if (x != this._viewport.x || y != this._viewport.y) {
            this._viewport.x = x
            this._viewport.y = y;
            this._viewport.x = this._viewport.x < 0 ? 0 : this._viewport.x;
            this._viewport.x = this._viewport.x > this._maxOrigin.x ? this._maxOrigin.x : this._viewport.x;
            this._viewport.y = this._viewport.y <= this._pivoty ? this._pivoty : this._viewport.y;
            this._viewport.y = this._viewport.y < 0 ? 0 : this._viewport.y;
            this._viewport.y = this._viewport.y > this._maxOrigin.y ? this._maxOrigin.y : this._viewport.y;
            this._viewport.y+=offsetY;
            this._viewport.x+=offsetX;
        }

    }

    /**
     * 
     * @param x  镜头中心点
     * @param y 镜头中心点
     */
    public lookAt(x: number, y: number ,offsetX = 0, offsetY = 0 ): void {
        this.setOrigin(x - this._sw, y - this._sh,offsetX,offsetY);
    }
}
