import { BaseLayer } from "./BaseLayer";
import { BuffVo } from "../../../../db/sheet/vo/BuffVo";
import { Buff, BuffShowType } from "../../role/fight/Buff/FightBuff";
import { CustomizeTexture } from "../comp/CustomizeTexture";
/**
 * BUffDisplayery用于显示在玩家周边显示buff
 * buff层级分两种一种是玩家前面跟玩家后面
 * BuffShowType.Top/BuffShowType.Forward为玩家上层
 * BuffShowType.Back为玩家下层
 * 所以初始化需要根据需求addChild指定层级
 */
export class BuffDisplayer {
    public forwardLayer: BuffLayer;
    public backLayer: BuffLayer;
    private icons: Laya.Dictionary = new Laya.Dictionary();
    constructor() {
        this.forwardLayer = new BuffLayer();
        this.backLayer = new BuffLayer();
    }

    
    
    public async ShowIcon(uuid: number , x: number, y: number , path:string)
    {
        var icon: RoleIconImage = this.icons.get(uuid);
        if (icon == null) {
            var image: RoleIconImage = Laya.Pool.getItemByClass("RoleIconImage", RoleIconImage);
            image.id = uuid;
            image.x = x;
            image.y = y;
            image.graphics(this.forwardLayer.graphics , path);
            this.icons.set(uuid, image);
        }
        else
        {
            icon.update(x, y);
        }
    }

    public removeIcon(uuid: number): void {
        var icon: RoleIconImage = this.icons.get(uuid);
        if (icon == null)
            return;
            icon.dispose();
        this.icons.remove(uuid);
    }
    /**
     * 
     * @param id 这个是buff的唯一id 唯一id = boid + buffId
     * @param buff 这个是buff构建好的类型
     * @param x 
     * @param y 
     */
    public showBuff(id: number, buff: Buff, x: number, y: number) {
        switch (buff.ShowPos) {
            case BuffShowType.Top:
                {
                    this.forwardLayer.showIcon(id, buff, x, y);

                    break;
                }
            case BuffShowType.Forward:
                {
                    this.forwardLayer.showBuffAnimation(id, buff, x, y);

                    break;
                }
            case BuffShowType.Back:
                {
                    this.backLayer.showBuffAnimation(id, buff, x, y);

                    break;
                }

        }
    }
    /**
     * 删除一个buff
     * @param id 这个是buff的唯一id 唯一id = boid*1000 + buffId
     * @param buffId 这个是buff的表里的id
     */
    public removeBuff(id: number, buffId: number) {
        var ShowPos: BuffShowType = Buff.GetBuffPos(buffId);
        switch (ShowPos) {
            case BuffShowType.Top:
                {
                    this.forwardLayer.removeIcon(id);

                    break;
                }
            case BuffShowType.Forward:
                {
                    this.forwardLayer.removeAnimation(id);

                    break;
                }
            case BuffShowType.Back:
                {
                    this.backLayer.removeAnimation(id);

                    break;
                }

        }
    }

    public clear() {
        this.forwardLayer.clear();
        this.backLayer.clear();

        for (var i: number = 0; i < this.icons.values.length; i++) {
            this.icons.values[i].dispose();
        }
        this.icons.clear();
    }
}

/**
 * Buff层级
 */
export class BuffLayer extends BaseLayer {
    private readonly buffIconWidth = 40;
    private readonly maxBuffIcon = 3;
    constructor() {
        super();
        this.mouseEnabled = false;
    }
    private icons: Laya.Dictionary = new Laya.Dictionary();
    private animations: Laya.Dictionary = new Laya.Dictionary();
    private animationUrls: Laya.Dictionary = new Laya.Dictionary();
    /**
     * 显示一个iconbuff
     */
    public async showIcon(uuid: number, buff: Buff, x: number, y: number) {
        var buffIcon: RoleIconImage = this.icons.get(uuid);
        var lastX = 0;
        if (buffIcon == null) {
            
            if(this.icons.keys.length == this.maxBuffIcon)
            return;
            var image: RoleIconImage = Laya.Pool.getItemByClass("RoleIconImage", RoleIconImage);
            image.id = uuid;
            lastX = x - this.buffIconWidth/this.maxBuffIcon*(this.icons.values.length-1);//收个last索引
            this.icons.set(uuid, image);
            for (let i = 1; i < this.icons.keys.length; i++) {
                const key = this.icons.keys[i];
                if(key == uuid)
                {
                    lastX += this.buffIconWidth/(this.maxBuffIcon/2);
                    break;
                }
            }
            image.x = lastX;
            image.y = y;
            var res_path = ResUtils.getBuffIcon(buff.Res);
            image.graphics(this.graphics , res_path);
        }
        else {
            for (let i = 0; i < this.icons.values.length; i++) {
                const _Icon: RoleIconImage = this.icons.values[i];
                if(i == 0)
                {
                    lastX = x - this.buffIconWidth/this.maxBuffIcon*(this.icons.values.length-1);//收个last索引
                }
                else
                {
                    lastX += this.buffIconWidth/(this.maxBuffIcon/2);
                }
                _Icon.update(lastX, y);
            }
        }
    }

    private CheckSameBuffAni(url: string , x: number, y: number):boolean
    {
        var has = false;
        for (let i = 0; i < this.animations.values.length; i++) {
            var buffAnim: Laya.Animation = this.animations.values[i];
            var _url: string = this.animationUrls.values[i];
            if(buffAnim.x == x &&buffAnim.y == y&&_url == url)
            {
                has = true;
                break;
            }
        }
        return has;
    }

    /**
     * 播放一个buff动画
     */
    public async showBuffAnimation(uuid: number, buff: Buff, x: number, y: number) {
        if(buff.Res == "")
        return;
        var buffAnim: Laya.Animation = this.animations.get(uuid);
        if (buffAnim == null) {
            var has = this.CheckSameBuffAni(buff.Res , x,y);
            if(has)
            return;
            buffAnim = Laya.Pool.getItemByClass("buffAnim", Laya.Animation);
            this.addChild(buffAnim);
            this.animations.set(uuid, buffAnim);
            this.animationUrls.set(uuid, buff.Res);
        }
        var url: string = ResUtils.getBuffAnimationUrl(buff.Res);
        buffAnim.pivotX = 800 / 2;
        buffAnim.pivotY = 455;
        buffAnim.x = x;
        buffAnim.y = y;
        buffAnim.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        var frames: any = this.getFrames(url);
        if (!frames) {
            frames = await this.asyncLoaderSkin(url);
            buffAnim.frames = frames;
            buffAnim.play(0, true);
        } else if (buffAnim.frames != frames) {
            buffAnim.frames = frames;
            buffAnim.play(buffAnim.index, true);
        }
    }

    protected asyncLoaderSkin(url: string) {
        var This: BuffLayer = this;
        return new Promise((resolve, reject) => {
            Laya.loader.load(url, Laya.Handler.create(this, function (): void {
                resolve(This.getFrames(url));
            }), null, Laya.Loader.ATLAS);
        });
    }

    private getFrames(url: string): Array<any> {
        var frames: Array<any> = Laya.Animation.framesMap[url];//先从缓存拿
        if (frames) return frames;
        return Laya.Animation.createFrames(url, url);//缓存拿不到，创建出来
    }

    public removeIcon(uuid: number): void {
        var buffIcon: RoleIconImage = this.icons.get(uuid);
        if (buffIcon == null)
            return;
        buffIcon.dispose();
        this.icons.remove(uuid);
    }

    public removeAnimation(uuid: number): void {
        var buffAnim: Laya.Animation = this.animations.get(uuid);
        if (buffAnim == null)
            return;
        buffAnim.removeSelf();
        buffAnim.clear();
        Laya.Pool.recover("buffAnim", buffAnim);
        this.animations.remove(uuid);
    }

    public clear(): void {
        for (var i: number = 0; i < this.icons.values.length; i++) {
            var buffIcon: RoleIconImage = this.icons.values[i];
            buffIcon.dispose();
        }


        for (var i: number = 0; i < this.animations.values.length; i++) {
            var buffAnim: Laya.Animation = this.animations.values[i];
            buffAnim.removeSelf();
            buffAnim.clear();
            Laya.Pool.recover("buffAnim", buffAnim);
        }

        this.graphics.clear();
        this.icons.clear();
        this.animations.clear();
    }
}

export class RoleIconImage {
    public id: number;
    public x: number;
    public y: number;
    private mGraphics: Laya.Graphics;
    private isCreate: boolean = false;
    private offsetY: number = 145;
    private tex: CustomizeTexture;
    //绘制
    public graphics(graphics: Laya.Graphics , res_path:string): void {
        this.mGraphics = graphics;
        !this.isCreate && this.create(res_path);//如果没有纹理的话，先创建纹理，并绘制
    }

    private async create(res_path:string) {
        this.isCreate = true;
        ///if(res_path == "")
        this.tex = await CustomizeTexture.asyncGetTextureByUrl(res_path, this.id, this.x, this.y);
        if(!this.tex||(this.tex&&!this.tex.texture))return;
        var args: Array<any> = [];
        args[0] = this.tex.texture;
        args[1] = this.x - (this.tex.texture.width / 2);
        args[2] = this.y - this.offsetY;
        args[3] = this.tex.texture.width;
        args[4] = this.tex.texture.height;
        args[5] = null;
        args[6] = 1;
        this.tex.saveArgs(args);
        this.mGraphics._saveToCmd(Laya.Render._context._drawTexture, args);
    }


    public update(x: number, y: number): void {
        try {//加try是因为，args可能还没有，懒得写判断
            this.x = x;
            this.y = y;
            this.tex.args[1] = x - (this.tex.texture.width / 2);
            this.tex.args[2] = y - this.offsetY;
        } catch (e) { }
    }

    public dispose(): void {
        // if (this.mGraphics && this.mGraphics.cmds) {
        //     var index: number = -1;
        //     this.buff && (index = this.mGraphics.cmds.indexOf(this.buff.args));
        //     index != -1 && this.mGraphics.cmds.splice(index, 1);
        //     index = -1;

        // }
        if (this.mGraphics) {
            if (!this.mGraphics.cmds) {
                this.mGraphics.clear(); return;//防止报错
            }
            if (this.mGraphics.cmds.length <= 1) {//防止残留清不悼
                this.mGraphics.clear();
            }
            else {
                if(this.tex)
                {
                    var index = this.mGraphics.cmds.indexOf(this.tex.args);
                    if (index != -1)
                        this.mGraphics.cmds.splice(index, 1);
                }
            }
        }
        this.id = 0;
        this.x = 0;
        this.y = 0;
        this.isCreate = false;
        this.tex && this.tex.dispose();
        this.mGraphics = null;
        this.tex = null;
        Laya.Pool.recover("RoleIconImage", this);
    }
}