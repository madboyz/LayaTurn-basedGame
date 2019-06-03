import { BaseLayer } from "./BaseLayer";

export class UIeffectLayer extends BaseLayer {

    constructor() {
        super();
        this.effectArr = [];
    }

    public effectArr: Laya.Animation[];

    /**
     * 播放UI特效，如果不传X,Y，就在舞台中间播放
     * @param effName 如果名字后面加了 @@full，则直接取全路径
     */
    public playEffect(effName: string, x: number, y: number, loop: boolean, speed: number = null , callBack:Laya.Handler = null): Laya.Animation {
        var eff: Laya.Animation = Laya.Pool.getItem("UIeffect") || new Laya.Animation;
        if (loop) {
            this.effectArr.push(eff);
        }
        eff.scaleX = eff.scaleY = 1;
        eff.interval = speed || GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        eff.pivotX = 800 / 2;
        eff.pivotY = 600 / 2;
        eff.x = x;
        eff.y = y;
        this.addChild(eff);
        UIManager.instance.loadUIEffect(effName).then((effArr: Array<any>) => {
            eff.frames = effArr;
            eff.play(0, loop);
            //直播一次的情况
            if (!loop) {
                eff.once(Laya.Event.COMPLETE, this, () => {
                    eff.removeSelf();
                    eff.clear();
                    Laya.Pool.recover("UIeffect", eff);
                    if (this.effectArr) {
                        var index = this.effectArr.indexOf(eff);
                        if (index > -1) {
                            this.effectArr.splice(index, 1);
                        };
                    }
                    if(callBack)
                    callBack.runWith(callBack.args);
                });
            }
        });
        return eff;
    }

    //清楚所有现有的特效，但不对特效层进行销毁
    public clearEffect(): void {
        if (this.effectArr) {
            for (let i = 0; i < this.effectArr.length; i++) {
                var eff = this.effectArr[i];
                eff.removeSelf();
                eff.clear();
                Laya.Pool.recover("UIeffect", eff);
            }
            this.effectArr = [];
        }
    }

    public destroy(): void {
        this.clearEffect();
        this.effectArr = null;
        this.removeSelf();
        super.destroy();
    }

}