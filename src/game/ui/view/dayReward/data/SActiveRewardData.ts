import { DataManager } from "../../../../../message/manager/DataManager";
import { S13055, S13056, S13058, S13057, S13057_1, S13053, S13054 } from "../../../../../net/pt/pt_13";
import { ActiveRewardProtocol } from "../protocol/ActiveRewardProtocol";
import { Upgrade_awardVo } from "../../../../../db/sheet/vo/Upgrade_awardVo";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { BehaviorVo } from "../../../../../db/sheet/vo/BehaviorVo";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { GameUtils } from "../../../../utils/GameUtils";
import { Debug } from "../../../../../debug/Debug";

export class SActiveRewardData extends Laya.EventDispatcher {
    constructor() {
        super();
    }
    private static _instance: SActiveRewardData;
    public protocal: ActiveRewardProtocol = new ActiveRewardProtocol();
    public CurrentDayRewardInfo = { day: 0, state: 0 };
    public LevelRewardList = new Laya.Dictionary();
    public CurrentOnlineReward = {No:0 , lastTime:0 , sheet:null};
    private LastHours = 0;
    public static get instance(): SActiveRewardData {
        return SActiveRewardData._instance || (SActiveRewardData._instance = new SActiveRewardData());
    }

    public unRegisterEvent(): void {
        DataManager.cancel(PROTOCOL.E13053, this, this.onS13053);
        DataManager.cancel(PROTOCOL.E13054, this, this.onS13054);
        DataManager.cancel(PROTOCOL.E13055, this, this.onS13055);
        DataManager.cancel(PROTOCOL.E13056, this, this.onS13056);
        DataManager.cancel(PROTOCOL.E13057, this, this.onS13057);
        DataManager.cancel(PROTOCOL.E13058, this, this.onS13058);
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);
        this.CurrentDayRewardInfo = { day: 0, state: 0 };
        this.CurrentOnlineReward = {No:0 , lastTime:0 , sheet:null};
        this.LevelRewardList.clear();
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E13053, this, this.onS13053);
        DataManager.listen(PROTOCOL.E13054, this, this.onS13054);
        DataManager.listen(PROTOCOL.E13055, this, this.onS13055);
        DataManager.listen(PROTOCOL.E13056, this, this.onS13056);
        DataManager.listen(PROTOCOL.E13057, this, this.onS13057);
        DataManager.listen(PROTOCOL.E13058, this, this.onS13058);
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);
    }

    private UpdateTime()
    {
        this.event(SActiveRewardEvent.ONLINE_REWARD_UPDATE);
    }

    private onS13053(data: S13053): void {
        this.CurrentOnlineReward.No = data.CurNo;
        this.CurrentOnlineReward.lastTime = data.LastGetTime;
        if(this.CurrentOnlineReward.No > 0)
        this.CurrentOnlineReward.sheet = BehaviorVo.get(data.CurNo);
        this.event(SActiveRewardEvent.ONLINE_REWARD_UPDATE);
    }

    private onS13054(data: S13054): void {
        this.CurrentOnlineReward.No = data.NextNo;
        this.CurrentOnlineReward.lastTime = data.LastGetTime;
        if(this.CurrentOnlineReward.No > 0)
        this.CurrentOnlineReward.sheet = BehaviorVo.get(data.NextNo);
        this.event(SActiveRewardEvent.ONLINE_REWARD_UPDATE);
    }


    private onS13058(data: S13058): void {
        var item: S13057_1 = this.LevelRewardList.get(data.No);
        if (item)
        item.IsReward = 1;
        this.event(SActiveRewardEvent.LEVEL_REWARD_UPDATE);
    }

    private onS13057(data: S13057): void {
        this.LevelRewardList.clear();
        data.item_1.sort(
            (a, b): number => {
                if (a.No > b.No)
                    return 1;
                else
                    return -1;
            }
        );
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            this.LevelRewardList.set(element.No, element);
        }
    }

    private onS13056(data: S13056): void {
        if (data.RetCode == 0) {
            this.CurrentDayRewardInfo.state = data.SevenDayReward;
            this.event(SActiveRewardEvent.DAY_REWARD_UPDATE);
        }
    }

    private onS13055(data: S13055): void {
        this.CurrentDayRewardInfo.day = data.AccLoginDay;
        this.CurrentDayRewardInfo.state = data.SevenDayReward;
        this.event(SActiveRewardEvent.DAY_REWARD_UPDATE);
    }

    public get sevenDayRewardRed(): boolean {
        var state = SActiveRewardData.instance.CurrentDayRewardInfo.state;
        for (let i = 0; i < this.CurrentDayRewardInfo.day; i++) {
            if (state % 2 != 1) {
                return true;
            }
            state = Math.floor(state / 2);
        }
        return false;
    }

    public get lvRewardRed():boolean{
        var list = this.LevelRewardList.values;
        for (let i = 0; i < list.length; i++) {
            var ele = list[i] as S13057_1;
            var vo = Upgrade_awardVo.get(ele.No);
            if(SRoleData.instance.info.Lv >= vo.lv && ele.IsReward != 1) {
                return true;
            }
        }
        return false
    }
}

export enum SActiveRewardEvent {
    DAY_REWARD_UPDATE = "day_reward_update",//累计更新
    LEVEL_REWARD_UPDATE = "level_reward_update",//等级奖励更新
    ONLINE_REWARD_UPDATE = "online_reward_update",//在线奖励更新
} 