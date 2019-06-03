import { CustomizeTexture } from './../comp/CustomizeTexture';
import { BaseLayer } from "./BaseLayer";
import { ConstVo } from '../../../../db/sheet/vo/ConstVo';

/**
 * 伤害层
 */
export class DamageLayer extends BaseLayer {
    private AnimScale = 1;
    private MoveTime = 200;
    private StayTime = 500;
    constructor() {
        super();
        this.mouseEnabled = false;
        var vo = ConstVo.get("DAMAGE_DISPLAY").val;
        this.AnimScale = vo[0];
        this.MoveTime = vo[1];
        this.StayTime = vo[2];
    }
    /**
     * 显示伤害
     * @param txt  伤害类型：
     * @param num  值
     * @param x 
     * @param y 
     */
    public async showDamage(fileName: string, num: string, x, y, isCrit: boolean = false) {
        //暂时不用分帧处理,也不用做最大处理
        var url: string = `res/atlas/battle/${fileName}.atlas`;
        await this.loadBattle(isCrit);
        await this.asyncLoader(url);
        this.showNum(num + "", x, y - 60, this.graphics, fileName, isCrit);// 
    }

    private asyncLoader(url: string) {
        return new Promise((resolve) => {
            Laya.loader.load(url, Laya.Handler.create(this, () => {
                resolve();
            }), null, Laya.Loader.ATLAS);
        });
    }

    private async loadBattle(isCrit: boolean) {
        if (!isCrit) return;
        await this.asyncLoader("res/atlas/battle.atlas");
    }

    public async showNum(num: string, x: number, y: number, graphics: Laya.Graphics, fileName: string, isCrit: boolean) {
        var ry: number = (GMath.random(50, 80));
        var LastX: number = 0;
        var scale: number = 1.0;
        var critOffsetH : number = 0;
        var r: string = num.charAt(0);
        var tex: Laya.Texture = Laya.Loader.getRes(`battle/${fileName}/${r}.png`);
        var texture: CustomizeTexture;
        LastX = x  - num.length * (tex.width * scale*this.AnimScale)/2;
        if (isCrit) {
            //scale = 1.2;
            var url: string = ResUtils.getSymbolIcon(SYMBOL_TYPE.CRIT);
            texture = await CustomizeTexture.asyncGetTextureByUrl(url, 0, 0, 0);
            if(!texture||(texture&&!texture.texture))return;
            var r: string = num.charAt(0);
            critOffsetH = (texture.texture.height - tex.height) /2; 
        }
        /**
         * 这里有个坑就是如果初始alpha 是1的情况下cmdrender会一直渲染 不会更新tween中alpha的变化所以设置成了0.99
         */
        for (var i: number = 0; i < num.length; i++) {
            var r: string = num.charAt(i);
            var tex: Laya.Texture = Laya.Loader.getRes(`battle/${fileName}/${r}.png`);
            var args: Array<any> = [];
            args = graphics.drawTexture(tex , LastX , y , tex.width * scale *0.3 , tex.height * scale*0.3 , null , 0.99)
            if (isCrit &&i == 0) {
                var critArgs =  graphics.drawTexture( texture.texture , LastX - texture.texture.width*this.AnimScale , y-critOffsetH 
                    , texture.texture.width*0.3 , texture.texture.height*0.3 , null , 0.99);
                this.tweenTo(critArgs, critArgs[1], y -critOffsetH- ry,  texture.texture.width , 
                    texture.texture.height  , 0.3, graphics , false);
            }
            this.tweenTo(args, LastX, y - ry,  tex.width * scale,tex.height * scale,0.3,graphics ,i == num.length -1);
            
            LastX += tex.width*scale*this.AnimScale;
        }
    }

    private tweenTo(target: object, x: number, y: number, width , height ,alpha  ,graphics: Laya.Graphics ,islast = false, offset:number = 0): void {
        
        Laya.Tween.to(target, { 1: x, 2: y , 3:width*this.AnimScale ,4:height*this.AnimScale}, this.MoveTime, Laya.Ease.strongOut,Laya.Handler.create(this, () => {
            var _x = width*(this.AnimScale)-width + x;
            if(islast)
            {
                _x = x;
            }
            Laya.Tween.to(target, {1: _x,3:width ,4:height, 6:alpha}, this.StayTime, Laya.Ease.circIn, Laya.Handler.create(this, () => {
                if (!graphics.cmds) {
                    graphics.clear();
                    return;//防止报错Laya.Ease.circIn迅速降0 Laya.Ease.elasticIn//闪烁
                }
                if (graphics.cmds.length <= 1) {//防止残留清不悼
                    graphics.clear();
                }
                else {
                    var index = graphics.cmds.indexOf(target);
                    if (index != -1)
                        graphics.cmds.splice(index, 1);
                }
                }));
        })
        );//缓动500MS，清除800MS，就因为，让它停留一会
    }
    public clear()
    {
        super.clear();
        this.graphics.clear();
    }
}
