/**
 * 状态机
 */
export enum PlayFsmState {
    PreInite = 0,
    Init,//初始
    Ready,//准备包含，随机抽卡准备摆放作战单位跟搭配技能卡
    RoundStart,//回合开始
    RandAttack,//开始播放随机作战
    RoundEnd,//回合结束
    End,//整场战斗结束
}

export enum RoleFsmState {
    Idle = 0,
}

export class BaseFsmMachine extends Laya.EventDispatcher {
    protected _state:number = 0;
    public get State():number//当前状态
    {
        return this._state;
    }
    constructor()
    {
        super();
    }

    public createFsm()
    {
        
    }

    public enterFsm()
    {
    }

    public exitFsm()
    {
        
    }

}


export class RoleFsmMachine extends BaseFsmMachine {

    constructor()
    {
        super();
    }

    public createFsm()
    {
        super.createFsm();
    }

    public enterFsm()
    {
        super.enterFsm();
    }
}