import { BaseLayer } from "./BaseLayer";
import { CustomizeTexture } from './../comp/CustomizeTexture';

export class TextLayer extends BaseLayer {
    constructor() {
        super();
        this.mouseEnabled = false;
    }
    private textures: CustomizeTexture[] = [];
    //默认居中位置
    public async showText(str: string, prepUrl: string, url: string, offsetX: number = 0, offsetY: number = 200) {
        await this.loaderBattler(prepUrl);
        this.clear();
        var w: number = 0;
        for (var i: number = 0; i < str.length; i++) {
            var code: string = str.charAt(i);
            var texture: CustomizeTexture = await CustomizeTexture.asyncGetTextureByUrl(`${url}${code}.png`, 0, 0, 0);
            if(! texture||(texture&&! texture.texture))continue;
            this.textures.push(texture);
            var args: any[] = this.getTextures(texture, w, 0);
            w += texture.texture.sourceWidth;
            this.graphics._saveToCmd(Laya.Render._context._drawTexture, args);
        }
        this.x = offsetX + (this.stage.width - w) / 2;
        this.y = offsetY;
    }

    public clear(): void {
        this.graphics.clear();
        while (this.textures.length) {
            var texture: CustomizeTexture = this.textures.pop();
            texture.dispose();
        }
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

    private loaderBattler(url: string) {
        return new Promise((resolve) => {
            Laya.loader.load(url, Laya.Handler.create(this, () => {
                resolve();
            }), null, Laya.Loader.ATLAS);
        });
    }
}