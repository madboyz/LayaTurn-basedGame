
import { ChaosBattleProtocol } from "../protocol/ChaosBattleProtocol";
import { DataManager } from "../../../message/manager/DataManager";
import { S28002, S28004, S28005, S28006, S28007, S28001, S28003 } from "../../../net/pt/pt_28";
import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { SRoleData } from "../../../net/data/SRoleData";
import { SAoiData, SAoiEvent } from "../../aoi/SAoiData";
import { S12011, S12002_1 } from "../../../net/pt/pt_12";
import { MsgManager } from "../../ui/manager/MsgManager";
import { SGameData, SGameEvent } from "../../../net/data/SGameData";
import { MsgRollTipsType } from "../../ui/compent/MsgRollTipsType";
import { Alert } from "../../ui/compent/Alert";
import { HtmlUtils } from "../../utils/HtmlUtils";
export class SChaosBattleData extends Laya.EventDispatcher {
    public protocol: ChaosBattleProtocol = new ChaosBattleProtocol();//战斗请求协议
    private static mInstance: SChaosBattleData;
    public AutoPKPlayer:boolean = true;
    public OpenTime:number = 0;
    public EndTime:number = 0;
    public PlayerBall:Laya.Dictionary = new Laya.Dictionary();
    public static get instance(): SChaosBattleData {
        return this.mInstance || (this.mInstance = new SChaosBattleData);
    }
    constructor() {
        super();
    }

    public unRegisterEvent(): void {
        DataManager.cancel(PROTOCOL.E28001, this, this.ReportReslut)
        DataManager.cancel(PROTOCOL.E28002, this, this.EnterScene);//进入场景
        DataManager.cancel(PROTOCOL.E28003, this, this.ExitScene);//退出场景
        DataManager.cancel(PROTOCOL.E28004, this, this.GetPlayBallNum);//获取玩家龙珠数量
        DataManager.cancel(PROTOCOL.E28005, this, this.SyncBallNum);//客户端同步增加或者扣除数量，是自己的变化则并弹提示信息“您（得到）失去x个龙珠”
        DataManager.cancel(PROTOCOL.E28006, this, this.GetPlayerInfo);//决斗前获取对方队伍信息（龙珠数量）
        DataManager.cancel(PROTOCOL.E28007, this, this.onBattlState);
        SGameData.instance.off(SGameEvent.GAME_SCENE_LOADING, this, this.onGameSceneLoading);//场景变化
        this.AutoPKPlayer = true;
        this.OpenTime = 0;
        this.EndTime = 0;
        this.PlayerBall.clear();
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E28001, this, this.ReportReslut)
        DataManager.listen(PROTOCOL.E28002, this, this.EnterScene);//进入场景
        DataManager.listen(PROTOCOL.E28003, this, this.ExitScene);//退出场景
        DataManager.listen(PROTOCOL.E28004, this, this.GetPlayBallNum);//获取玩家龙珠数量
        DataManager.listen(PROTOCOL.E28005, this, this.SyncBallNum);//客户端同步增加或者扣除数量，是自己的变化则并弹提示信息“您（得到）失去x个龙珠”
        DataManager.listen(PROTOCOL.E28006, this, this.GetPlayerInfo);//决斗前获取对方队伍信息（龙珠数量）
        DataManager.listen(PROTOCOL.E28007, this, this.onBattlState);
        SGameData.instance.on(SGameEvent.GAME_SCENE_LOADING, this, this.onGameSceneLoading);//场景变化
        
    }

    private ReportReslut(data:S28001)
    {
        if(data.code == 1)
        {
            MsgManager.instance.showRollTipsMsg("报名失败！",MsgRollTipsType.msgRollTips2);
        }
        else
        {
            this.protocol.send28002();
        }
    }

    private onBattlState(data:S28007)
    {
        this.AutoPKPlayer = data.Status == 0?false:true;
    }

    private onGameSceneLoading(SceneNo:number)
    {
        var chaos =  SChaosBattleData.instance.isChaoScene();
        if(chaos)
        UIManager.instance.openUI(UIID.CHAO_HUD);
        else
        {
            UIManager.instance.closeUI(UIID.CHAO_HUD);
        }
        
    }

    private EnterScene(data:S28002)
    {  
        this.OpenTime = data.StartTime;
        this.EndTime = data.EndTime;
        //如果返回空数组，说明成功
        this.event(SChaosBattleEvent.ENTER_CHAOS_SCENE , [data.item_1]);
    }

    private ExitScene(data:S28003)
    {  
        if(data.code == 1){
            Alert.show(HtmlUtils.addColor("全民夺宝活动已结束，活动奖励请查收邮件", "#8a5428", 20), this, () => {
            }, null, null, null, false, "提示");
        }
    }

    private GetPlayBallNum(data:S28004)
    {
        for (let i = 0; i < data.item_2.length; i++) {
            const element = data.item_2[i];
            this.PlayerBall.set(element.id , element.ball_num);
        }
        this.event(SChaosBattleEvent.CHAOS_BALL_UPDATE);
    }
    //掠夺类型（1掠夺 2被掠夺 3从怪物身上掠夺）
    private SyncBallNum(data:S28005)
    {
        var isAdd = true;
        if(data.type == 2)
        {
            isAdd = false;
        }
        var num = this.PlayerBall.get(data.id);
        //if(!num)
        //return;
    

        if(isAdd)
        {
            num += data.ball_num;
            if(data.id == SRoleData.instance.roleId)
            {
                MsgManager.instance.showRollTipsMsg(`您得到${data.ball_num}个龙珠`,MsgRollTipsType.msgRollTips2);
            }
        }
        else
        {
            num -= data.ball_num;
            if(data.id == SRoleData.instance.roleId)
            {
                MsgManager.instance.showRollTipsMsg(`您失去${data.ball_num}个龙珠`,MsgRollTipsType.msgRollTips2);
            }
        }
        this.PlayerBall.set(data.id,num);

        this.event(SChaosBattleEvent.CHAOS_BALL_UPDATE);
    }
    /**
     * 获得可以挑战的玩家
     */
    public GetCanPkPlayer():number
    {
        var playerId = 0;
        var count = 0;
        while(1)
        {
            //如果随机了10次都没有可以挑战的不管了
            if(count == 10)
            {
                break;
            }
            var length = SAoiData.instance.AoiPlayers.values.length;
            var index = GMath.randRange(0,length-1);
            var aoiData:S12002_1 = SAoiData.instance.AoiPlayers.values[index];
            if(aoiData&&aoiData.BhvState != AoiBhvCode.BHV_BATTLING)
            {
                playerId = aoiData.Id;
                break;
            }
            count ++;
        }
        return playerId;
    }

    private GetPlayerInfo(data:S28006)
    {

    }

    public isChaoScene():boolean
    {
        var Ischaos = false;
        var vos:Array<any> = ConstVo.get("GAME_MELEE_ENTER_CONFIG").val
        for (let index = 0; index < vos.length; index++) {
            var element = vos[index];
            if(SRoleData.instance.info.SceneNo == element[2])
            {
                Ischaos = true;
                break; 
            }
        }
        return Ischaos;
    }
}

export enum SChaosBattleEvent {
    ENTER_CHAOS_SCENE = "enter_chaos_scene",//进入大乱斗场景
    CHAOS_BALL_UPDATE = "chaos_ball_update",//龙珠更新

}
