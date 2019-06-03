import { BaseLayer } from "./BaseLayer";
import { CustomizeTexture } from "../comp/CustomizeTexture";
import { RoleIconImage } from "./BuffLayer";
import { Debug } from "../../../../debug/Debug";
/**
 * 用于显示玩家其他层级显示比玩家层级要低一级
 */
export class RoleOtherLayer extends BaseLayer {
    private aniOffsetY: number = -20;
    public Shadows: Laya.Dictionary = new Laya.Dictionary();
    public Icons: Laya.Dictionary = new Laya.Dictionary();
    public Animations:Laya.Dictionary = new Laya.Dictionary();
    public clear(): void {
        for (var i: number = 0; i < this.Shadows.values.length; i++) {
            this.Shadows.values[i].dispose();
        }
        for (var i: number = 0; i < this.Animations.values.length; i++) {
            var Anim: Laya.Animation = this.Animations.values[i];
            Anim.removeSelf();
            Anim.clear();
            Laya.Pool.recover("otherRoleAni", Anim);
        }
        this.Shadows.clear();
        this.Animations.clear();
        this.Icons.clear();
        this.graphics.clear();
        super.clear();
    }

    public async ShowIcon(uuid: number , x: number, y: number , path:string)
    {
        if(uuid == 0) return;
        var Icon: RoleIconImage = this.Icons.get(uuid);
        if (Icon == null) {
            var image: RoleIconImage = Laya.Pool.getItemByClass("RoleIconImage", RoleIconImage);
            image.id = uuid;
            image.x = x;
            image.y = y;
            image.graphics(this.graphics,path);
            this.Icons.set(uuid, image);
        }
        else
        {
            Icon.update(x, y);
        }
    }

    public removeIcon(uuid: number): void {
        var Icon: RoleIconImage = this.Icons.get(uuid);
        if (Icon == null)
            return;
            Icon.dispose();
        this.Icons.remove(uuid);
    }


    public ShowShadow(uuid: number , x: number, y: number)
    {
        if(uuid == 0) return;
        var shadow: ShadowImage = this.Shadows.get(uuid);
        if (shadow == null) {
            var image: ShadowImage = Laya.Pool.getItemByClass("ShadowImage", ShadowImage);
            image.id = uuid;
            image.x = x;
            image.y = y;
            image.graphics(this.graphics);
            this.Shadows.set(uuid, image);
        }
        else
        {
            shadow.update(x, y);
        }
    }

    public removeShadow(uuid: number): void {
        var shadow: ShadowImage = this.Shadows.get(uuid);
        if (shadow == null)
            return;
        shadow.dispose();
        this.Shadows.remove(uuid);
    }

    public ShowAnimation(uuid: number , x: number, y: number , url:string , isClear: boolean = true , setPivot: boolean = true , pivotX = 0 ,pivotY = 0)
    {
        if(uuid == 0) return;
        var THIS = this;
        var animation: Laya.Animation = this.Animations.get(uuid);
        if (animation == null) {
            var animation: Laya.Animation = Laya.Pool.getItemByClass("otherRoleAni", Laya.Animation);
            animation.pivotX = setPivot ? 400 : pivotX;
            animation.pivotY = setPivot ? 455 : pivotY; 
            animation.x = x;
            animation.y = y;
            animation.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
            animation.loop = !isClear;
            this.addChild(animation);
            this.Animations.set(uuid, animation);
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
            animation.y = y-this.aniOffsetY;
        }

    }

    public removeAnimation(uuid: number): void {
        var animation: Laya.Animation = this.Animations.get(uuid);
        if (animation == null)
            return;
        animation.scaleX = Math.abs(animation.scaleX)
        Laya.Pool.recover("otherRoleAni", animation);
        this.removeChild(animation);
        this.Animations.remove(uuid);
        animation.clear();;
    } 
}

export class ShadowImage {
    public id:number;
    public x: number;
    public y: number;
    private mGraphics: Laya.Graphics;
    private isCreate: boolean = false;
    private offsetY: number = 30;
    private texture: CustomizeTexture;
    //绘制
    public graphics(graphics: Laya.Graphics): void {
        this.mGraphics = graphics;
        !this.isCreate && this.create();//如果没有纹理的话，先创建纹理，并绘制
    }
    private async create() {
        this.isCreate = true;
        var url: string = "art/anim/shadow.png";
        this.texture = await CustomizeTexture.asyncGetTextureByUrl(url, this.id, this.x, this.y);
        if(! this.texture||( this.texture&&! this.texture.texture))return;
        var args: Array<any> = [];
        args[0] = this.texture.texture;
        args[1] = this.x - (this.texture.texture.width / 2);
        args[2] = this.y - this.offsetY;
        args[3] = this.texture.texture.width;
        args[4] = this.texture.texture.height;
        args[5] = null;
        args[6] = 1;
        this.texture.saveArgs(args);
        this.mGraphics._saveToCmd(Laya.Render._context._drawTexture, args);
    }

    public update(x: number, y: number): void {
        try {//加try是因为，args可能还没有，懒得写判断
            this.x = x;
            this.y = y;
            this.texture.args[1] = x - (this.texture.texture.width / 2);
            this.texture.args[2] = y - this.offsetY;
        } catch (e) { }
    }
    

    public dispose(): void {
        if (this.mGraphics) {
            if (!this.mGraphics.cmds) {
                this.mGraphics.clear(); return;//防止报错
            }
            if (this.mGraphics.cmds.length <= 1) {//防止残留清不悼
                this.mGraphics.clear();
            }
            else {
                if(this.texture&&this.texture.args)
                {
                    var index = this.mGraphics.cmds.indexOf(this.texture.args);
                    if (index != -1)
                    this.mGraphics.cmds.splice(index, 1);
                }
                
            }
        }
        this.id = 0;
        this.x = 0;
        this.y = 0;
        this.isCreate = false;
        this.texture && this.texture.dispose();
        this.mGraphics = null;
        this.texture = null;
        Laya.Pool.recover("ShadowImage", this);
    }
}