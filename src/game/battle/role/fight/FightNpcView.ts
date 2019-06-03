import { FightView } from "./FightView";

export class FightNpcView extends FightView{
    constructor(){
        super();
    }

    public dispose(): void {
        Laya.Pool.recover("FightNpcView", this);
        this.mBody.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        super.dispose();
    }
}
