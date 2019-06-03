import { CustomizeTexture } from './../comp/CustomizeTexture';
import { BaseLayer } from "./BaseLayer";

//血条
export class BloodLayer extends BaseLayer {
    constructor() {
        super();
        this.mouseEnabled = false;
    }
    private ids: number[] = [];
    private images: BloodImage[] = [];
    //更新位置
    public updateBlood(id: number, x: number, y: number): void {
        if (this.ids.indexOf(id) == -1) return;
        var image: BloodImage = this.getImage(id);
        image && image.update(x, y);
    }

    private getImage(id: number): BloodImage {
        for (var i: number = 0; i < this.images.length; i++) {
            if (this.images[i].id == id) {
                return this.images[i];
            }
        }
        return null;
    }

    public tweenBlood(id: number, progress: number, totalProgerss: number, isHp: boolean = true): void {
        if (this.ids.indexOf(id) == -1) return;
        var image: BloodImage = this.getImage(id);
        image && image.tweenBlood(progress, totalProgerss, isHp);

    }

    public clear(): void {
        for (var i: number = 0; i < this.images.length; i++) {
            this.images[i].dispose();
        }
        this.images.length = 0;
        this.ids.length = 0;
        this.graphics.clear();
    }

    public removeBlood(id: number): void {
        var index: number = this.ids.indexOf(id);
        index != -1 && (this.ids.splice(index, 1));
        var image: BloodImage = this.getImage(id);
        image && image.dispose();
        index = this.images.indexOf(image);
        index != -1 && this.images.splice(index, 1);
    }

    /**
     * 添加一个血条
     * 
     * @param {number} id ID跟角色的ID对应
     * @param {number} x 血条位置
     * @param {number} y 血条位置
     * @param {number} type 血条类型 ,怪物红色 ,1 是角色，2是怪物
     * @param {number} progress 当前HP
     * @param {number} totalProgress 总HP
     * @memberof BloodLayer
     */
    public addBlood(id: number, x: number, y: number, type: number) {
        if (this.ids.indexOf(id) != -1) {
            this.updateBlood(id, x, y);
            return;//已经有了
        }
        this.ids.push(id);
        var image: BloodImage = Laya.Pool.getItemByClass("BloodImage", BloodImage);
        this.images.push(image);
        image.id = id;
        image.x = x;
        image.y = y;
        image.type = type;
        image.graphics(this.graphics);
    }
}
export class BloodImage {


    public id: number;
    public x: number;
    public y: number;
    public progress: number;
    public totalProgress: number;
    public type: number;
    private mGraphics: Laya.Graphics;
    private isCreate: boolean = false;

    private MAX_W: number = 54;
    private offsetY: number = 95;



    //绘制
    private async create() {
        this.isCreate = true;
        await this.loaderBattler();
        if (this.type == 1) {
            this.createHeroBlood();
        } else {
            this.createMonsterBlood();
        }
    }

    //绘制
    public graphics(graphics: Laya.Graphics): void {
        this.mGraphics = graphics;
        !this.isCreate && this.create();//如果没有纹理的话，先创建纹理，并绘制
    }

    private loaderBattler() {
        return new Promise((resolve) => {
            Laya.loader.load("res/atlas/battle.atlas", Laya.Handler.create(this, () => {
                resolve();
            }), null, Laya.Loader.ATLAS);
        });

    }

    private black_hp: CustomizeTexture;
    private red_hp: CustomizeTexture;
    private async createMonsterBlood() {
        var texture: CustomizeTexture = await CustomizeTexture.asyncGetTextureByUrl("battle/battle_bar_bg.png", this.id, this.x, this.y);
        if(!texture||(texture&&!texture.texture))return;
        this.black_hp = texture;
        texture = await CustomizeTexture.asyncGetTextureByUrl("battle/battle_red_bar.png", this.id, this.x, this.y);
        this.red_hp = texture;
        this.drawMonsterHp();
    }


    //血条缓动
    public async tweenBlood(progress: number, totalProgerss: number, isHp: boolean) {
        try {
        await this.loaderBattler();
        var r: number = progress / totalProgerss;
        var curR: number = (1 - r);
        curR = isNaN(curR) ? 0 : curR;
        var w: number = this.MAX_W - this.MAX_W * curR;
        var time: number = 400 / this.MAX_W * (this.MAX_W - w);
        this.red_hp.args[3] =w == 0 ? 0.01 : w
        //this.red_hp.tweenTo(this.red_hp.args, { 3: w == 0 ? 0.01 : w}, time , Laya.Ease.elasticIn);
        }
        catch (e) { }
    }
    //绘制角色的HP
    private async createHeroBlood() {
        try {
        this.black_hp = await CustomizeTexture.asyncGetTextureByUrl("battle/battle_bar_bg.png", this.id, this.x, this.y);
        this.red_hp = await CustomizeTexture.asyncGetTextureByUrl("battle/battle_red_bar.png", this.id, this.x, this.y);
        if(!this.black_hp||(this.black_hp&&!this.black_hp.texture))return;
        if(!this.red_hp||(this.red_hp&&!this.red_hp.texture))return;
        }
        catch (e) { }
        this.drawHeroHp();
    }

    private drawMonsterHp(): void {
        try {
        this.mGraphics._saveToCmd(Laya.Render._context._drawTexture, this.getTextures(this.red_hp, this.x, this.y +1 , 6));
        this.mGraphics._saveToCmd(Laya.Render._context._drawTexture, this.getTextures(this.black_hp, this.x, this.y , 8));
        this.updateMonsterHp(this.x, this.y);
        }
        catch (e) { }
    }

    //绘制角色的HP
    private drawHeroHp(): void {
        try {
        this.mGraphics._saveToCmd(Laya.Render._context._drawTexture, this.getTextures(this.red_hp, this.x, this.y +1 ,6));
        this.mGraphics._saveToCmd(Laya.Render._context._drawTexture, this.getTextures(this.black_hp, this.x, this.y ,8));
        this.updateHeroHp(this.x, this.y);
        }
        catch (e) { }
    }


    public update(x: number, y: number): void {
        if(!this.mGraphics)
        return;
        if (this.type == 1) {
            this.updateHeroHp(x, y);
        } else {
            this.updateMonsterHp(x, y);
        }
    }

    private updateMonsterHp(x: number, y: number): void {
        try {//加try是因为，args可能还没有，懒得写判断
            this.x = x;
            this.y = y;
            this.red_hp.args[1] = this.black_hp.args[1] = x - this.MAX_W / 2;//更新位置
            this.black_hp.args[2] = y - this.offsetY;//更新位置
            this.red_hp.args[2] = this.black_hp.args[2] + 1;
        } catch (e) { }
    }

    private updateHeroHp(x: number, y: number): void {
        try {//加try是因为，args可能还没有，懒得写判断
            this.x = x;
            this.y = y;
            this.red_hp.args[1] = this.black_hp.args[1] = x - this.MAX_W / 2;//更新位置\
            this.black_hp.args[2] = y - this.offsetY;//更新位置
            this.red_hp.args[2] = this.black_hp.args[2] + 1;//更新位置
        } catch (e) { }

    }

    private getTextures(texture: CustomizeTexture, x: number, y: number , h:number): Array<any> {
        var args: Array<any> = [];
        args[0] = texture.texture;
        args[1] = x;
        args[2] = y;
        args[3] = this.MAX_W;
        args[4] = h;
        args[5] = null;
        args[6] = 1;
        texture.saveArgs(args);
        return args;
    }

    public dispose(): void {
        if (this.mGraphics && this.mGraphics.cmds) {
            var index: number = -1;
            this.black_hp && (index = this.mGraphics.cmds.indexOf(this.black_hp.args));
            index != -1 && this.mGraphics.cmds.splice(index, 1);
            index = -1;
            this.red_hp && (index = this.mGraphics.cmds.indexOf(this.red_hp.args));
            index != -1 && this.mGraphics.cmds.splice(index, 1);
            index = -1;

        }
        this.id = 0;
        this.x = 0;
        this.y = 0;
        this.progress = 0;
        this.totalProgress = 0;
        this.type = 0;
        this.isCreate = false;
        this.red_hp && this.red_hp.dispose();
        this.black_hp && this.black_hp.dispose();
        this.mGraphics = null;
        this.red_hp = null;
        this.black_hp = null;
        Laya.Pool.recover("BloodImage", this);
    }
}