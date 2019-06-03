
import { RoleView } from './../../role/RoleView';
import { GameLayer } from '../../../../GameLayer';
export class RoleTouch {
    private static touchList: Laya.Dictionary = new Laya.Dictionary();

    /**
     * 
     * 
     * @static
     * @param {RoleView} role 角色
     * @param {number} boid 角色id
     * @param {Function} callBack 点击后的回调
     * @param {any[]} args 回调要返回的参数
     * @memberOf RoleTouch
     */
    public static createTouch(role: RoleView, boid: number, callBack: Function, args: any[] = null): void {
        var touch: RoleTouch = Laya.Pool.getItemByClass("RoleTouch", RoleTouch);
        touch.role = role;
        touch.callBack = callBack;
        touch.args = args;
        touch.boid = boid;
        RoleTouch.initEvent();
        this.touchList.set(boid, touch);
    }

    public static removeTouchByBoid(boid:number)
    {
        var touch: RoleTouch = this.touchList.get(boid);
        if(touch)
        {
            touch.dispose();
            this.touchList.remove(boid);
        }
    }

    public static removeTouch(): void {
        for (var i: number = 0; i < this.touchList.keys.length; i++) {
            var touch: RoleTouch = this.touchList.get(this.touchList.keys[i]);
            touch.dispose();
        }
        this.touchList.clear();
    }

    private callBack: Function;
    private args: any[];
    private role: RoleView;
    private boid: number = -1;

    private static initEvent(): void {
        if(GameLayer.instacne.fightLayer.visible)
        { 
            GameLayer.instacne.fightLayer.off(Laya.Event.CLICK, this, this.onClick);
            GameLayer.instacne.fightLayer.on(Laya.Event.CLICK, this, this.onClick);
        }
        else
        {
            GameLayer.instacne.sceneLayer.off(Laya.Event.CLICK, this, this.onClick);
            GameLayer.instacne.sceneLayer.on(Laya.Event.CLICK, this, this.onClick);
        }
    }

    private static onClick(): void {
        for (var i: number = 0; i < this.touchList.keys.length; i++) {
            var touch: RoleTouch = this.touchList.get(this.touchList.keys[i]);
            touch.onClick();
        }
    }

    private static removeEvent(): void {
        if(GameLayer.instacne.fightLayer.visible)
        GameLayer.instacne.fightLayer.off(Laya.Event.CLICK, this, this.onClick);
        else
        GameLayer.instacne.sceneLayer.off(Laya.Event.CLICK, this, this.onClick);
    }

    private onClick(): void {
        var mousePos: Laya.Point = this.role.getMousePoint();
        var size: Laya.Point = this.role.getBodyRealSize();
        var rect: Laya.Rectangle = new Laya.Rectangle(-size.x / 2, -size.y, size.x, size.y);
        if (!rect.contains(mousePos.x, mousePos.y)) {//没被击中了
            return;
        }
        this.callBack(this.boid, this.args , this.role.px , this.role.py);
    }

    private removeEvent(): void {
        RoleTouch.removeEvent();
    }

    public dispose(): void {
        this.callBack = null;
        this.args = null;
        this.boid = -1;
        //this.removeEvent();
        this.role = null;
        //Laya.Pool.recover("RoleTouch", this);
    }
}