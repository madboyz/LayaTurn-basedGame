import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { WudaohuiDataProtocol } from "../protocol/WudaohuiDataProtocol";
import { DataManager } from "../../../../../message/manager/DataManager";
import { S27001, S27000, S27003 } from "../../../../../net/pt/pt_27";
import { SNewBattleData } from "../../../../../net/data/SNewBattleData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { AwardUtil } from "../../../../award/AwardUtil";
import { SCopyData } from "../../../../../net/data/SCopyData";

export class SWudaohuiData extends Laya.EventDispatcher {
    private static _instance: SWudaohuiData;
    public protocol: WudaohuiDataProtocol;

    public static get instance(): SWudaohuiData {
        return SWudaohuiData._instance || (SWudaohuiData._instance = new SWudaohuiData());
    }
    constructor() {
        super();
        this.protocol = new WudaohuiDataProtocol;
    }


    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E27000, this, this.on27000);
        DataManager.cancel(PROTOCOL.E27001, this, this.on27001);
        DataManager.cancel(PROTOCOL.E27003, this, this.on27003);
        // DataManager.cancel(PROTOCOL.E13051, this, this.on13051);

        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E27000, this, this.on27000);
        DataManager.listen(PROTOCOL.E27001, this, this.on27001);
        DataManager.listen(PROTOCOL.E27003, this, this.on27003);
        // DataManager.listen(PROTOCOL.E13051, this, this.on13051);

        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    //战斗完，弹出相关处理================================================
    private enterWudaohui: boolean = false;
    private needShowResult: boolean = false;

    private onUpdateFightState(): void {
        if (SGameData.instance.PLAYFIGHTREPORT == false && this.enterWudaohui) {
            this.enterWudaohui = false;
            if (SNewBattleData.instance.LastBattleResult == true) {
                var cfg = ConstVo.get("GAME_PK1V1_REWARD").val;
                var winTime = this.WinCount + 1;
                var showReward = false;
                for (let i = 0; i < cfg.length; i++) {
                    var item = cfg[i];
                    if (winTime == item[0]) {
                        showReward = true;
                        var itemdataList = SCopyData.instance.copyRewardList || [];
                        UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, [0/**胜利了 */, itemdataList, true, this.openSys]);
                        break;
                    }
                }
                if (!showReward) {
                    this.openSys();
                }
            } else {
                this.openSys();
            }
        } else if (SGameData.instance.PLAYFIGHTREPORT && this.enterWudaohui) {
            UIManager.instance.closeUI(UIID.SYS_MAIN);
            UIManager.instance.closeUI(UIID.SYS_ACTIVITY);
            UIManager.instance.closeUI(UIID.WUDAOHUI_PANEL);
        }
    }

    public openSys(): void {
        UIManager.instance.openUI(UIID.SYS_MAIN);
        UIManager.instance.openUI(UIID.SYS_ACTIVITY, null, 1);
        UIManager.instance.openUI(UIID.WUDAOHUI_PANEL);
    }

    //控制处理相关================================================

    private on27001(data: S27001): void {
        if (data.RetCode == 0) {
            this.event(SWudaohuiEvent.WUDAOHUI_START_MATCH);
        }
    }

    public WinCount: number = 0;
    public LoseCount:number = 0;
    private on27000(data: S27000): void {
        this.WinCount = data.WinCount;
        this.LoseCount = data.LoseCount;
        this.event(SWudaohuiEvent.WUDAPHUI_PANEL_DATA);
    }

    private on27003(data: S27003): void {
        this.enterWudaohui = true;
    }

}


export enum SWudaohuiEvent {
    WUDAPHUI_PANEL_DATA = "WUDAPHUI_PANEL_DATA",
    WUDAOHUI_START_MATCH = "WUDAOHUI_START_MATCH",
}