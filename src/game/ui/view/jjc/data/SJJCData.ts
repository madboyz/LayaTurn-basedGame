import { DataManager } from "../../../../../message/manager/DataManager";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { S23001, S23002, S23003, S23005, S23010 } from "../../../../../net/pt/pt_23";
import { MsgManager } from "../../../manager/MsgManager";
import { JJCProtocol } from "../protocol/JJCProtocol";

export class SJJCData extends Laya.EventDispatcher {
    private static _instance: SJJCData;
    public protocol: JJCProtocol;

    public static get instance(): SJJCData {
        return SJJCData._instance || (SJJCData._instance = new SJJCData());
    }
    constructor() {
        super();
        this.protocol = new JJCProtocol;
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E23001, this, this.on23001);
        DataManager.cancel(PROTOCOL.E23005, this, this.on23005);
        DataManager.cancel(PROTOCOL.E23010, this, this.on23010);
        DataManager.cancel(PROTOCOL.E23003, this, this.on23003);

        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
        this.jjcBaseInfo = null;
        this.jjcEnemyInfo = null;
        this.enterJJC = false;
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E23001, this, this.on23001);
        DataManager.listen(PROTOCOL.E23005, this, this.on23005);
        DataManager.listen(PROTOCOL.E23010, this, this.on23010);
        DataManager.listen(PROTOCOL.E23002, this, this.on23002);
        DataManager.listen(PROTOCOL.E23003, this, this.on23003);

        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    public jjcBaseInfo: S23001;//竞技场的基本信息
    public on23001(data: S23001) {
        this.jjcBaseInfo = data;
        this.event(SJJCEvent.JJC_ANS_INFO);
    }

    public jjcEnemyInfo: S23005;//竞技场的基本信息
    public on23005(data: S23005) {
        this.jjcEnemyInfo = data;
        this.event(SJJCEvent.JJC_ANS_ENEMY_INFO);
    }

    private enterJJC: boolean = false;
    public on23010(data: S23010) {
        if(data.Flag == 1){
            this.enterJJC = true;
            this.event(SJJCEvent.JJC_ENTER_FIGHT);
            this.jjcOneInfo = null
        }else if (data.Flag == 5){//秒杀
            // this.enterJJC = true;
            this.jjcOneInfo = null
            SJJCData.instance.protocol.send23001();
            SJJCData.instance.protocol.send23005();
        }else if (data.Flag == 3){
            MsgManager.instance.showRollTipsMsg("挑战次数不足");
        }else{
            MsgManager.instance.showRollTipsMsg("无法进行挑战");
        }
    }

    public jjcRecordInfo: S23002;//竞技场记录的面板信息
    public on23002(data: S23002) {
        this.jjcRecordInfo = data;
        this.event(SJJCEvent.JJC_ANS_RECORD);
    }

    public onUpdateFightState(): void {
        if (SGameData.instance.PLAYFIGHTREPORT == false && this.enterJJC && this.jjcOneInfo) {
            this.enterJJC = false;
            UIManager.instance.openUI(UIID.SYS_JJC_RESULT);
        }
    }

    public jjcOneInfo:S23003;
    //战斗结束单条推送
    public on23003(data:S23003): void {
        this.jjcOneInfo = data;
        this.onUpdateFightState();
    }

}


export enum SJJCEvent {
    JJC_ASK_INFO = "jjc_ask_info",//竞技场请求基本信息
    JJC_ANS_INFO = "jjc_ans_info",//竞技场返回基本信息
    JJC_ASK_BUYTIME = "jjc_ask_buytime",//竞技场请求购买挑战次数
    JJC_ASK_ENEMY_INFO = "jjc_ask_enemy_info",//竞技场请求对手基本信息
    JJC_ANS_ENEMY_INFO = "jjc_ans_enemy_info",//竞技场返回对手基本信息
    JJC_ASK_FIGHT = "jjc_ask_fight",//竞技场请求对战
    JJC_ENTER_FIGHT = "jjc_enter_fight",//竞技场进入战斗
    JJC_OUT_FIGHT = "jjc_out_fight",//竞技场退出战斗
    JJC_ASK_GETREWARD = "jjc_ask_reward",//竞技场请求领取奖励
    JJC_ANS_RECORD = "jjc_ask_record",//竞技场返回记录数据
}