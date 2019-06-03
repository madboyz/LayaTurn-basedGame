import { BaseLayer } from "./BaseLayer";

export class EffectLayer extends BaseLayer {
    constructor() {
        super();
        this.mouseEnabled = false;
    }
    private effectDic:Laya.Dictionary = new Laya.Dictionary();
    public addEffect(uuid:number ,x: number, y: number, url: string, isMain: boolean = false, isClear: boolean = true, setPivot: boolean = true , callBack = null): void {
        var ani: Laya.Animation = Laya.Pool.getItemByClass("EffectAni", Laya.Animation);
        !isClear && !this.effectDic.get(url) && (this.effectDic.set(url , new Laya.Dictionary()));
        !isClear && (this.effectDic.get(url).set(uuid,ani));
        ani.loadAtlas(url, Laya.Handler.create(this, () => {
            ani.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
            ani.loop = !isClear;
            ani.x = x;
            ani.y = y;
            ani.pivotX = setPivot ? 400 : 0;
            ani.pivotY = setPivot ? 455 : 0;
            ani.scaleX = isMain ? -ani.scaleX : ani.scaleX;
            ani.play();
            this.addChild(ani);
            isClear && ani.once(Laya.Event.COMPLETE, this, () => {
                this.remove(ani);
                if(callBack)
                {
                    callBack();
                }
            });
        }), null);
    }

    // private effectIds: Laya.Dictionary = new Laya.Dictionary();
    // public addEffectToId(id: number, x: number, y: number, url: string, isMain: boolean, isClear: boolean = true, setPovot: boolean = true): void {

    // }
    /**
     * 如果uuid是0就代表url整个移除
     * @param url 
     * @param uuid 
     */
    public removeAnimation(url: string ,uuid:number = 0): void {
        var anis:Laya.Dictionary = this.effectDic.get(url);
        if(!anis)
        return;
        if(uuid == 0)
        {   
            for (let i = 0; i < anis.keys.length; i++) {
                const key = anis.keys[i];
                var ani:Laya.Animation = anis.get(key);
                this.remove(ani);
            }
            anis.clear();
        }
        else
        {
            var ani:Laya.Animation = anis.get(uuid);
            this.remove(ani);
            anis.remove(uuid);
        }
    }

    private remove(ani: Laya.Animation): void {
        if(!ani)
        return;
        ani.offAll(Laya.Event.COMPLETE);
        this.removeChild(ani);
        ani.clear();
        ani.scaleX = Math.abs(ani.scaleX);
        Laya.Pool.recover('EffectAni', ani);
    }
}