import { CustomizeTexture } from '../comp/CustomizeTexture';
import { Delay } from './../../../../framework/utils/Delay';
import { BaseLayer } from "./BaseLayer";

export class AttackSymbolLayer extends BaseLayer {
    constructor() {
        super();
        this.mouseEnabled = false;
    }
    public async showSymbol(url: string, x: number, y: number) {
        await this.loaderBattler();
        var texture: CustomizeTexture = await CustomizeTexture.asyncGetTextureByUrl(url, 0, x, y);
        if(!texture||(texture&&!texture.texture))return;
        this.graphics._saveToCmd(Laya.Render._context._drawTexture, this.getTextures(texture, x, y));
        await Delay.delay(500);
        if (!this.graphics.cmds) {
            this.graphics.clear(); return;//防止报错
        }
        if (this.graphics.cmds.length <= 1) {//防止残留清不悼
            this.graphics.clear();
        }
        else {
            var index = this.graphics.cmds.indexOf(texture.args);
            if (index != -1)
                this.graphics.cmds.splice(index, 1);
        }
    }

    private getTextures(texture: CustomizeTexture, x: number, y: number): Array<any> {
        const W: number = 98;
        const H: number = 52;
        const offsetY: number = 160;
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