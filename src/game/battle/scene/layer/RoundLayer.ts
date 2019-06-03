import { BaseLayer } from "./BaseLayer";
import { CustomizeTexture } from './../comp/CustomizeTexture';

export class RoundLayer extends BaseLayer {
    constructor() {
        super();
        this.mouseEnabled = false;
    }

    public async showRound(curRound: number, maxRound: number) {
        await this.loaderBattler();
        this.clear();
        var str: string = curRound + "-" + maxRound;
        var w: number = 0;
        for (var i: number = 0; i < str.length; i++) {
            var code: string = str.charAt(i);
            var texture: CustomizeTexture = await CustomizeTexture.asyncGetTextureByUrl(`battle/huiheshu/${code}.png`, 0, 0, 0);
            if(! texture||(texture&&! texture.texture))continue;
            var args: any[] = this.getTextures(texture, w, 0);
            w += texture.texture.sourceWidth;
            this.graphics._saveToCmd(Laya.Render._context._drawTexture, args);
        }
        this.x = (this.stage.width - w) / 2;
        this.y = 200;
    }

    public clear(): void {
        this.graphics.clear();
    }

    private getTextures(texture: CustomizeTexture, x: number, y: number): Array<any> {
        var args: Array<any> = [];
        args[0] = texture.texture;
        args[1] = x
        args[2] = 0;
        args[3] = 0;
        args[4] = 0;
        args[5] = null;
        args[6] = 1;
        texture.saveArgs(args);
        return args;
    }

    private loaderBattler() {
        return new Promise((resolve) => {
            Laya.loader.load("res/atlas/battle/huiheshu.atlas", Laya.Handler.create(this, () => {
                resolve();
            }), null, Laya.Loader.ATLAS);
        });
    }
}