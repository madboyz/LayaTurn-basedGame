import { BaseLayer } from "./BaseLayer";
import { CustomizeTexture } from './../comp/CustomizeTexture';
import { Delay } from './../../../../framework/utils/Delay';

export class SkillNameLayer extends BaseLayer {
    constructor() {
        super();
        this.mouseEnabled = false;
    }

    public async showName(name: string, x: number, y: number) {
        await this.loaderBattler();
        var bg: CustomizeTexture = await CustomizeTexture.asyncGetTextureByUrl("battle/battle_skill_bg_0.png", 0, 0, 0);
        
        var defaultFont: string = "18px 黑体";
        const offsetY: number = 105;
        var nameArgs: any = [
            name,
            x,
            y - offsetY,
            defaultFont,
            "#ffffff",
            "#8e5213",//描边颜色
            2,   //描边像素
            "center"
        ];
        var args: Array<any> = this.getTextures(bg, x, y);
        this.graphics._saveToCmd(Laya.Render._context._drawTexture, args);
        this.graphics._saveToCmd(Laya.Render._context._fillBorderText,nameArgs);
        var time: number = 300;
        var ry: number = (GMath.random(40, 60));
        bg.tweenTo(args, { 2: args[2] - ry }, time , Laya.Ease.strongOut);
        bg.tweenTo(nameArgs, { 2: nameArgs[2] - ry }, time , Laya.Ease.strongOut);
        await Delay.delay(time+600);
        this.graphics.clear();
    }

    private getTextures(texture: CustomizeTexture, x: number, y: number): Array<any> {
        const W: number = 186;
        const H: number = 74;
        const offsetY: number = 140;
        var args: Array<any> = [];
        args[0] = texture.texture;
        args[1] = x - W / 2;
        args[2] = y - offsetY;
        args[3] = W;
        args[4] = H;
        args[5] = null;
        args[6] = 1;
        texture.saveArgs(args);
        return args;
    }

    private loaderBattler() {
        return new Promise((resolve) => {
            Laya.loader.load("res/atlas/battle.atlas", Laya.Handler.create(this, () => {
                resolve();
            }), null, Laya.Loader.ATLAS);
        });

    }
}