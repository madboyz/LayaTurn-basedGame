import { BaseLayer } from "./BaseLayer";
import { RoleIconImage } from "./BuffLayer";

export class CommonLayer extends BaseLayer {
    private icons: Laya.Dictionary = new Laya.Dictionary();
    private animations: Laya.Dictionary = new Laya.Dictionary();
    public clear(): void { 
        for (var i: number = 0; i < this.icons.values.length; i++) {
            var Icon: RoleIconImage = this.icons.values[i];
            Icon.dispose();
        }

        for (var i: number = 0; i < this.animations.values.length; i++) {
            var Anim: Laya.Animation = this.animations.values[i];
            Anim.removeSelf();
            Anim.clear();
            Laya.Pool.recover("CommonAnimation", Anim);
        }

        this.animations.clear();
        this.icons.clear();
        this.graphics.clear();
        super.clear();
    }

    public ShowAnimation(uuid: number , x: number, y: number , url:string , isClear: boolean = true , pivotX = 400 ,pivotY = 455)
    {
        if(uuid == 0) return;
        var THIS = this;
        var animation: Laya.Animation = this.animations.get(uuid);
        if (animation == null) {
            var animation: Laya.Animation = Laya.Pool.getItemByClass("CommonAnimation", Laya.Animation);
            animation.pivotX = pivotX;
            animation.pivotY = pivotY;
            animation.x = x;
            animation.y = y; 
            animation.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
            animation.loop = !isClear;
            this.addChild(animation);
            this.animations.set(uuid, animation);
            animation.loadAtlas(url, Laya.Handler.create(this, () => {
                animation.play();
                isClear && animation.once(Laya.Event.COMPLETE, this, () => {
                    THIS.removeAnimation(uuid);
                });
            }), null);
        }
        else
        {
            animation.x = x;
            animation.y = y;
        }

    }

    public removeAnimation(uuid: number): void {
        var animation: Laya.Animation = this.animations.get(uuid);
        if (animation == null)
            return;
        animation.scaleX = Math.abs(animation.scaleX)
        Laya.Pool.recover("CommonAnimation", animation);
        this.removeChild(animation);
        this.animations.remove(uuid);
        animation.clear();;
    } 

    public ShowIcon(uuid: number , x: number, y: number , path:string)
    {
        if(uuid == 0) return;
        var Icon: RoleIconImage = this.icons.get(uuid);
        if (Icon == null) {
            var image: RoleIconImage = Laya.Pool.getItemByClass("RoleIconImage", RoleIconImage);
            image.id = uuid;
            image.x = x;
            image.y = y;
            image.graphics(this.graphics,path);
            this.icons.set(uuid, image);
        }
        else
        {
            Icon.update(x, y);
        }
    }

    public removeIcon(uuid: number): void {
        var Icon: RoleIconImage = this.icons.get(uuid);
        if (Icon == null)
            return;
            Icon.dispose();
        this.icons.remove(uuid);
    }

}