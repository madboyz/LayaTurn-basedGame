import { FightBuff } from "./Buff/FightBuff";
import { Delay } from "../../../../framework/utils/Delay";
import { PlayerView } from "../PlayerView";
export class FightView extends PlayerView {
    constructor() {
        super();
        this.mWeapon.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        this.mBody.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        this.mMount.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        this.FightBuffs = new FightBuff(this);
    }
    public FightBuffs: FightBuff;
    //原始位置，用于恢复位置用
    public OriginalX: number;
    public OriginalY: number;
    
    public defaultSkin(): void {
        if (this.resPath == "") return;
        var path: number = GMath.getPath(this.angle);
        //this.resPath = "art/hero/maction093/body";
        var url: string = ResUtils.getRoleUrl(this.resPath, this.action, path);
        this.asyncUpdateSKin(url);
    }

    /**
     * 
     * @param {number} type 1 是播放攻击动作1,2是播放攻击动作2
     * @returns 
     * 
     * @memberOf FightView
     */
    public attck(type: number) {
        return new Promise((reslove) => {
            this.mBody.index = 0;
            //this.action = Action.stand;
            this.listen(reslove);
            this.action = type == 1 ? Action.attack01 : Action.attack02;
        })
    }

    public async defence(time:number = 500) {
        this.mBody.index = 0;
        this.action = Action.defence;
        await Delay.delay(time);
        this.action = Action.stand;
    }

    public async moveDefence(dis ,time:number = 500) {
        return new Promise((resolve) => {
            this.mBody.index = 0;
            this.action = Action.defence;
            Laya.Tween.to(this, { x: this.OriginalX + dis, y:this.OriginalY + dis }, time/2, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
                //dis = Math.abs(dis);
                Laya.Tween.to(this, { x: this.OriginalX, y: this.OriginalY }, time/2, Laya.Ease.backInOut, Laya.Handler.create(this, () => {
                    this.action = Action.stand;
                    resolve(true);
                }));
            }));
        })
    }

    private listen(reslove = null): void {
        this.mBody.offAll(Laya.Event.COMPLETE)
        this.mBody.once(Laya.Event.COMPLETE, this, () => {
            if(this.action == Action.attack01 || this.action == Action.attack02)
            {
                this.action = Action.stand;
            }
            this.mBody.offAll(Laya.Event.COMPLETE);
            if (reslove) reslove(true);
        });
    }


    public async dead(time:number = 100) {
        this.mBody.index = 0;
        this.action = Action.corpse;
        await Delay.delay(time);
        //return new Promise((resolve) => {
        //    this.mBody.once(Laya.Event.COMPLETE, this, () => {
        //        this.action = Action.corpse;
        //        resolve(true);
        //    });
        //    this.mBody.index = 0;
        //    this.action = Action.dead;
        //})
    }


    public dispose() {
        if (this.FightBuffs == null)
            return;
        this.FightBuffs.Clear();
        if(this["__proto__"]["constructor"]["name"] == "FightView")
        Laya.Pool.recover("FightView", this);
        this.mBody.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        super.dispose();
    }
}