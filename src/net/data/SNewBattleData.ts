
import { S20007, S20064, S20050, S20009, S20006, S20005, S20089, S20011, S20062, S20013, S20041, S20045, S20008, S20036, S20010, S20091, S20030, S20052, S20002, S20029, S20063, S20051, S20014, S20014_1, S20014_1_1 } from "../pt/pt_20";
import { NewBattleProtocol } from "../../game/battle/protocol/NewBattleProtocol";
import { FightScene } from "../../game/battle/scene/FightScene";
import { FightInfo } from "../../game/battle/model/FightInfo";
import { NewBaseReport, ReportType } from "../../game/battle/report/NewBaseReport";
import { DataManager } from "../../message/manager/DataManager";
import { BattleUtil } from "../../game/battle/BattleUtil";
import { SGameData } from "./SGameData";
import { MsgManager } from "../../game/ui/manager/MsgManager";
import { SRoleData } from "./SRoleData";
import { Skill } from "../../game/skill/Skill";
import { TARGET_TYPE_LIMIT } from "../../db/sheet/vo/SkillVo";
import { SCopyData } from "./SCopyData";
import { GameLayer } from "../../GameLayer";
import { MsgRollTipsType } from "../../game/ui/compent/MsgRollTipsType";
import { GameUtils } from "../../game/utils/GameUtils";
import { FightView } from "../../game/battle/role/fight/FightView";
import { Buff } from "../../game/battle/role/fight/Buff/FightBuff";
import { Delay } from "../../framework/utils/Delay";
import { Debug } from "../../debug/Debug";
import { TalkaiVo } from "../../db/sheet/vo/TalkaiVo";


//战斗状态
export enum BattleState {
    INVALID = -1, //非法
    IDLE = 0,  //不在战斗中
    ENTER,  //进入战斗
    INIT,  //
    COMMAND,  //下指令中
    REPORT_RECIVE,  //接收战报中
    REPORT_PLAYING,  //播放战报中处理15~17 62等
    REPORT_WAITING,  //有可能战报还没回来我需要等待
    REPORT_ROUND_END, //处理41~44 62
    REPORT_END,  //播放战报完毕
    ROUND_START,  //回合开始
    BATTLE_END,  //战斗结束
}

export enum BubbleType {
    ROUND_START = 1,//1;回合开始
    ACTION = 2,//2;行动行为
    BE_ATTACT = 3,// 3;%被攻击
    USE_SKILL = 4,//4;使用技能
    ATTACK = 5,//5;攻击别人
    ESCAPE = 6,//6;逃跑
    USE_GOODS = 7,//7;使用物品
    BE_HEAL = 8,//8;被治疗
    SUMMON = 9,//9;召唤
}

export class SNewBattleData extends Laya.EventDispatcher {
    public protocol: NewBattleProtocol = new NewBattleProtocol();//战斗请求协议
    private static mInstance: SNewBattleData;
    public fightScene: FightScene = new FightScene();
    public allBattleBo: Laya.Dictionary = new Laya.Dictionary();//所有战斗单位
    public allBoSkill: Laya.Dictionary = new Laya.Dictionary();//所有战斗单位技能信息
    public allFightInfos: Laya.Dictionary = new Laya.Dictionary();//所有战斗单位info
    public allBubbles: Laya.Dictionary = new Laya.Dictionary();//对话
    public localFightInfo: FightInfo;
    public battleState: BattleState = BattleState.IDLE;//战斗状态
    public roundEndReport: any[] = [];//接到20089处理战报播放完毕的东西
    public reportList: NewBaseReport[] = [];
    public isInitLogin = false;//断线重连的flag
    public currentRound: number = 1;
    public currentMaxRound: number = 1;
    public CurrentBattleType = BattleMainType.PVE;
    public CurrentBattleSubType = 1;
    public LastBattleResult = true;//上一次战斗结果
    public ForceStop: boolean = false;//当前战斗还在播放战斗时如果有新的战斗过来要强制停止
    public NewRoundBoReport = new Laya.Dictionary();//因为这个战报不知道服务端什么时候推过来只能对应指定的回合刷怪
    public BoWave = 1;
    public continueFight = false;
    public static get instance(): SNewBattleData {
        return this.mInstance || (this.mInstance = new SNewBattleData);
    }
    constructor() {
        super();
    }

    public unRegisterEvent(): void {
        DataManager.cancel(PROTOCOL.E20007, this, this.EnterBattle);//战斗初始化
        DataManager.cancel(PROTOCOL.E20009, this, this.onS20009);//行动开始
        DataManager.cancel(PROTOCOL.E20050, this, this.saveSkillInfo);//可用技能列表
        DataManager.cancel(PROTOCOL.E20011, this, this.NewRound);//新回合开始
        DataManager.cancel(PROTOCOL.E20005, this, this.BattleStart);//战斗开始
        DataManager.cancel(PROTOCOL.E20006, this, this.saveReport);//战斗结束
        DataManager.cancel(PROTOCOL.E20014, this, this.SaveBubble);//气泡
        DataManager.cancel(PROTOCOL.E20015, this, this.saveReport);//物理战报
        DataManager.cancel(PROTOCOL.E20016, this, this.saveReport);//法术战报
        DataManager.cancel(PROTOCOL.E20017, this, this.saveReport);//施法（释放或驱散buff）
        DataManager.cancel(PROTOCOL.E20018, this, this.saveReport);//老板说可能怪物会逃跑
        DataManager.cancel(PROTOCOL.E20019, this, this.saveReport);//发送战报给客户端：治疗
        DataManager.cancel(PROTOCOL.E20021, this, this.saveReport);//召唤bo
        DataManager.cancel(PROTOCOL.E20010, this, this.saveReport);//战报发送完毕
        DataManager.cancel(PROTOCOL.E20091, this, this.reportPlayEnd);//战报播放完毕
        DataManager.cancel(PROTOCOL.E20062, this, this.newBoRefresh);//新的bo刷出
        DataManager.cancel(PROTOCOL.E20041, this, this.saveRoundEnd);//通知客户端：自身的buff列表有改变（添加了某buff，或者移除了某buff，或者某buff的信息有更新）
        DataManager.cancel(PROTOCOL.E20042, this, this.saveRoundEnd);// 通知客户端：某bo的属性有改变
        DataManager.cancel(PROTOCOL.E20043, this, this.saveRoundEnd);//通知客户端：一或多个bo死亡了
        DataManager.cancel(PROTOCOL.E20044, this, this.saveRoundEnd);//通知客户端：bo复活
        DataManager.cancel(PROTOCOL.E20063, this, this.NewRoundBosAdd);//新的怪刷新
        DataManager.cancel(PROTOCOL.E20013, this, this.buffEnd);//buff推送完毕
        DataManager.cancel(PROTOCOL.E20064, this, this.onBattleTime);//查询时间
        DataManager.cancel(PROTOCOL.E20008, this, this.OneBoidIsReady);//某个单位准备完毕
        DataManager.cancel(PROTOCOL.E20089, this, this.StartRoundEndAction);//处理战报播放完毕后的清算数据20041~20044
        DataManager.cancel(PROTOCOL.E20036, this, this.AICmdEnd);//某个单位已下达指令
        DataManager.cancel(PROTOCOL.E20030, this, this.CmdEnd);//某个单位已下达指令
        DataManager.cancel(PROTOCOL.E20029, this, this.S20029);//某个单位空指令
        DataManager.cancel(PROTOCOL.E20051, this, this.onS20051);//查询战斗回归
        this.clear();
        this.battleState = BattleState.IDLE;
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E20007, this, this.EnterBattle);//战斗初始化
        DataManager.listen(PROTOCOL.E20050, this, this.saveSkillInfo);//可用技能列表
        DataManager.listen(PROTOCOL.E20011, this, this.NewRound);//新回合开始
        DataManager.listen(PROTOCOL.E20009, this, this.onS20009);//行动开始

        //战报 20009~20010中间所有战报
        DataManager.listen(PROTOCOL.E20005, this, this.BattleStart);//战斗开始
        DataManager.listen(PROTOCOL.E20006, this, this.saveReport);//战斗结束
        DataManager.listen(PROTOCOL.E20014, this, this.SaveBubble);//气泡
        DataManager.listen(PROTOCOL.E20015, this, this.saveReport);//物理战报
        DataManager.listen(PROTOCOL.E20016, this, this.saveReport);//法术战报
        DataManager.listen(PROTOCOL.E20017, this, this.saveReport);//施法（释放或驱散buff）
        DataManager.listen(PROTOCOL.E20018, this, this.saveReport);//老板说可能怪物会逃跑
        DataManager.listen(PROTOCOL.E20019, this, this.saveReport);//发送战报给客户端：治疗
        DataManager.listen(PROTOCOL.E20021, this, this.saveReport);//召唤bo
        DataManager.listen(PROTOCOL.E20010, this, this.saveReport);//战报发送完毕

        DataManager.listen(PROTOCOL.E20091, this, this.reportPlayEnd);//战报播放完毕



        //判断状态
        DataManager.listen(PROTOCOL.E20062, this, this.newBoRefresh);//新的bo刷出

        //回合结算通知20012~20013回合结算
        DataManager.listen(PROTOCOL.E20041, this, this.saveRoundEnd);//通知客户端：自身的buff列表有改变（添加了某buff，或者移除了某buff，或者某buff的信息有更新）
        DataManager.listen(PROTOCOL.E20042, this, this.saveRoundEnd);// 通知客户端：某bo的属性有改变
        DataManager.listen(PROTOCOL.E20043, this, this.saveRoundEnd);//通知客户端：一或多个bo死亡了
        DataManager.listen(PROTOCOL.E20044, this, this.saveRoundEnd);//通知客户端：bo复活
        DataManager.listen(PROTOCOL.E20063, this, this.NewRoundBosAdd);//新的怪刷新
        DataManager.listen(PROTOCOL.E20013, this, this.buffEnd);//buff推送完毕
        ///

        DataManager.listen(PROTOCOL.E20064, this, this.onBattleTime);//查询时间

        DataManager.listen(PROTOCOL.E20008, this, this.OneBoidIsReady);//某个单位准备完毕

        DataManager.listen(PROTOCOL.E20089, this, this.StartRoundEndAction);//处理战报播放完毕后的清算数据20041~20044
        DataManager.listen(PROTOCOL.E20036, this, this.AICmdEnd);//某个单位已下达指令
        DataManager.listen(PROTOCOL.E20030, this, this.CmdEnd);//某个单位已下达指令
        DataManager.listen(PROTOCOL.E20029, this, this.S20029);//某个单位空指令
        DataManager.listen(PROTOCOL.E20051, this, this.onS20051);//查询战斗回归



        //战斗回归

        DataManager.listen(PROTOCOL.E20052, this, this.BattleCallBack);//战斗回归

        DataManager.listen(PROTOCOL.E20002, this, this.onS20002);//pk反馈
    }

    private onS20051(data: S20051) {
        var fightView: FightView = this.allBattleBo.get(data.TargetBoId);
        var fightInfo: FightInfo = this.allFightInfos.get(data.TargetBoId)
        if (fightInfo && fightView) {
            if (data.DieStatus != DEAD_TYPE.NODEAD) {
                if (data.DieStatus == DEAD_TYPE.INVERTED) {
                    fightInfo.dead = DEAD_TYPE.INVERTED;
                    var time = GameConfig.GAME_BATTLE_ANIMATION_SPEED * 8;
                    fightView.dead(time);
                    this.fightScene.removeBlood(data.TargetBoId);
                }
                else if (data.DieStatus == DEAD_TYPE.GHOST) {
                    fightInfo.dead = DEAD_TYPE.GHOST;
                    fightView.alpha = 0.5;//暂时这样处理
                    this.fightScene.removeBlood(data.TargetBoId);
                }
                else if (data.DieStatus == DEAD_TYPE.DISAPPEAR) {
                    fightInfo.dead = DEAD_TYPE.DISAPPEAR;
                    fightView.action = Action.stand;
                    fightView.x = -200;
                    this.fightScene.removeBlood(data.TargetBoId);
                }

            }
        }

    }

    private onS20009(data:S20009)
    {
        
    }

    private onS20002(data: S20002) {
        this.event(SNewBattleEvent.PK_PLAYER_CALL_BACK, data);
    }

    private BattleCallBack(data: S20052) {
        if (data.RetCode == 0) {
            this.continueFight = true;
            this.protocol.send20007();
        }
        else
            this.continueFight = false;
    }
    /**
     * 某个单位空指令
     * @param data 
     */
    private S20029(data: S20029) {
        this.fightScene.removeOneBoidReady(data.ForBoId);
        this.setFlgByBoid(data.ForBoId);
        this.event(SNewBattleEvent.ONE_BO_ACTED, [data.ForBoId]);
    }

    /**
     * 使用技能
     * @param data 
     */
    private CmdEnd(data: S20030) {
        this.fightScene.removeOneBoidReady(data.ForBoId);
        this.setFlgByBoid(data.ForBoId);
        this.event(SNewBattleEvent.ONE_BO_ACTED, [data.ForBoId]);
    }

    /**
     * 某个单位已经下达了Ai指令
     * @param data 
     */
    private AICmdEnd(data: S20036) {
        this.fightScene.removeOneBoidReady(data.ForBoId);
        this.setFlgByBoid(data.ForBoId);
        this.event(SNewBattleEvent.ONE_BO_ACTED, [data.ForBoId]);
    }

    public autoBo(): void {//托管角色
        var boids: FightInfo[] = this.getFightSelfBosInfo();
        for (var i: number = 0; i < boids.length; i++) {
            if (boids[i].dead != DEAD_TYPE.DISAPPEAR && !boids[i].isFlg)
                this.protocol.send20036(boids[i].boid);
        }
    }

    private buffEnd(data: S20013) {
        //回合结束推送完毕
        Debug.serverLog("回合结束推送完毕");
    }
    /**
     * 移除消失在战斗中的单位
     * @param boid 
     */
    public removeDisappearBo(boid:number)
    {
        this.fightScene.removeRole(boid);
        this.allBattleBo.remove(boid);
        this.allFightInfos.remove(boid);
    }

    /**
     * 新回合开始跟刚进入战斗要设置没操作过的flg
     */
    public ResetFlg() {
        for (let i = 0; i < this.allFightInfos.values.length; i++) {
            const info: FightInfo = this.allFightInfos.values[i];
            info.isFlg = false;
        }
    }

    public setFlgByBoid(boid: number) {
        var info: FightInfo = this.allFightInfos.get(boid);
        if (!info)
            return;
        info.isFlg = true;
    }


    private newBoRefresh(data: S20062) {
        var newBoReport;
        newBoReport = BattleUtil.parse20062(data);
        if (this.battleState == BattleState.ROUND_START) {
            this.roundEndReport.push(newBoReport);
        }
        else {
            this.AddReport(newBoReport, ReportType.BO_NEW_ADD);
        }

    }
    /**
     * 在新回合开始时处理buff
     */
    public CheckBoBuffExpireRound(newRound: number) {
        for (let i = 0; i < this.allBattleBo.keys.length; i++) {
            const Id = this.allBattleBo.keys[i];
            var fighView: FightView = SNewBattleData.instance.allBattleBo.get(Id);

            var buffs = fighView.FightBuffs.AllBuff.values;
            var removeBuffIds = [];
            for (let i = 0; i < buffs.length; i++) {
                const buff: Buff = buffs[i];
                if (newRound == buff.ExpireRound) {
                    removeBuffIds.push(buff.Id);
                }

            }
            for (let i = 0; i < removeBuffIds.length; i++) {
                const buffid = removeBuffIds[i];
                if (SNewBattleData.instance.fightScene) {
                    fighView.FightBuffs.RemoveBuff(buffid);
                    this.fightScene.removeBuff(buffid, Id);
                }
            }
        }
    }

    private async NewRound(data: S20011) {
        /**
         * 每回合请求更新技能信息
         */
        var infos: FightInfo[] = this.getFightSelfBosInfo();
        for (var i: number = 0; i < infos.length; i++) {
            this.RequsetBoskillInfo(infos[i].boid)
        }
        //回合开始加上准备中
        this.battleState = BattleState.ROUND_START;
        this.currentRound = data.NewRoundCounter;

        /**
         * 回合开始时要等待气泡播完才行
         */

        if (SCopyData.instance.isInCopy) {
            if (SCopyData.instance.curCopyInfo.isPetCopy) {
                this.fightScene.showRound(data.NewRoundCounter, this.currentMaxRound, 20);
            }
            else {
                this.fightScene.showRound(data.NewRoundCounter, this.currentMaxRound, 20);
            }
        }
        else {
            this.fightScene.showRound(data.NewRoundCounter, this.currentMaxRound, 20);
        }
        this.ResetFlg();

        //for (let i = 0; i < this.allBattleBo.keys.length; i++) {
        //    const key = this.allBattleBo.keys[i];
        //    var bubble = this.GetBubbleByType(key,BubbleType.ROUND_START);
        //    if(bubble)
        //    {
        //        var vo = TalkaiVo.get(bubble.TalkCont);
        //        if(vo&&vo.content)
        //        {
        //            this.fightScene.showBubble(key,vo.content);
        //        }
        //    }
        //}

        //如果是处于自动战斗中就直接发20036委托ai下指令协议
        var isAuto = Laya.LocalStorage.getItem("autoFight") == "true" ? true : false;
        if (isAuto) {
            this.autoBo();
        }
        else {
            this.event(SNewBattleEvent.ROUND_TIME_START, [10]);
            this.battleState = BattleState.COMMAND;//如果不是自动战斗就这是当前战斗状态是等待下达指令
        }
        this.CheckBoBuffExpireRound(data.NewRoundCounter);
        this.event(SNewBattleEvent.NEW_ROUND_START, [this.currentRound, this.currentMaxRound]);
    }
    /**
     * 某个单位已经下指令了准备完毕
     * @param data 
     */
    private OneBoidIsReady(data: S20008) {
        this.fightScene.removeOneBoidReady(data.BoId);
    }
    /**
     * 下一波怪刷出
     * @param data 
     */
    private NewRoundBosAdd(data: S20063) {
        var _data = BattleUtil.parse20063(data);
        this.NewRoundBoReport.set(data.ForRound, _data);
    }

    /**
     * 通知客户端：新回合开始的相关工作已处理完毕
     * @param data 
     */
    private StartRoundEndAction(data: S20089) {
        //处理回合结算

        var findKey = -1;
        for (let i = 0; i < this.NewRoundBoReport.keys.length; i++) {
            const key = this.NewRoundBoReport.keys[i];
            if (key == this.currentRound) {
                findKey = key;
                break;
            }
        }
        if (findKey != -1) {
            var _data = this.NewRoundBoReport.get(findKey);
            this.roundEndReport.push(_data);
            this.NewRoundBoReport.remove(findKey);
            if (this.BoWave != _data.Data.NthWave) {
                this.BoWave = _data.Data.NthWave;
                this.event(SNewBattleEvent.ROUND_NEW_WAVE);
            }
        }

        this.event(SNewBattleEvent.ROUND_END_UPDATE);
        if (SNewBattleData.instance.roundEndReport.length > 0)
            this.event(SNewBattleEvent.ROUND_END_ACTION);
    }

    public BattleStart(data: S20005) {
        //有可能因为卡了战斗没播完就又来了一场新战斗
        if (this.battleState != BattleState.IDLE) {
            Debug.serverLog("收到20005 并且现在正在战斗中！");
            //this.event(SNewBattleEvent.CREATE_FIGHT_SCENE , true);
            //this.StopCurrentBattle();
        }
    }

    /**
     * /20041~20042一定是回合结算的时候才处理的
     * @param data 
     */
    private saveRoundEnd(data: any): void {
        var _data;
        switch (data.msgId) {
            case 20041:
                {
                    _data = BattleUtil.parse20041(data);
                    break;
                }
            case 20042:
                {
                    _data = BattleUtil.parse20042(data);
                    break;
                }
            case 20043:
                {
                    _data = BattleUtil.parse20043(data);
                    break;
                }
            case 20044:
                {
                    _data = BattleUtil.parse20044(data);
                    break;
                }
        }
        this.roundEndReport.push(_data);//存储20041~20044 20063
    }
    /**
     * 某个boid战报播完了
     * @param data 
     */
    private reportPlayEnd(data: S20091) {
        if (this.localFightInfo && data.BoId == this.localFightInfo.boid) {
            //如果是我就等待战报
            this.battleState = BattleState.REPORT_END;
        }
    }

    private SaveBubble(data:S20014)
    {
        var hasRoundStart = false;
        this.allBubbles.clear();
        for (let i = 0; i < data.item_1.length; i++) {
            const element:S20014_1 = data.item_1[i];
            var bubbleTypes = [];
            for (let j = 0; j < element.item_1.length; j++) {
                const _element:S20014_1_1 = element.item_1[j];
                if(_element.WhenToTalk == BubbleType.ROUND_START)
                {
                    hasRoundStart = true;
                }
                Debug.serverLog(`推送气泡类型${_element.WhenToTalk},内容${_element.TalkCont}`);
                bubbleTypes.push(_element);
            }
            this.allBubbles.set(element.BoId,bubbleTypes);
        }
        if(hasRoundStart)
        {
            for (let i = 0; i < this.allBattleBo.keys.length; i++) {
                const key = this.allBattleBo.keys[i];
                var bubble = this.GetBubbleByType(key,BubbleType.ROUND_START);
                if(bubble)
                {
                    var vo = TalkaiVo.get(bubble.TalkCont);
                    if(vo&&vo.content)
                    {
                        this.fightScene.showBubble(key,vo.content);
                    }
                }
            }
        }
    }

    /**
     * 2019/3/14 孝鹏说不要延迟
     * 获得某个单位对话气泡
     * @param boid 
     * @param type 
     */
    public ShowOneBubbleByType(boid:number,type:BubbleType)
    {
        var bubble = this.GetBubbleByType(boid,type);
        if(bubble)
        {
            var vo = TalkaiVo.get(bubble.TalkCont);
            if(vo&&vo.content)
            {
                this.fightScene.showBubble(boid,vo.content);
                //await Delay.delay(GameConfig.BATTLE_BUBBLE_TIME);
            }
        }
        else
        {
            Debug.serverLog(`服务端没有推送没有type为${type}的气泡！`);
        }
    }

    public GetBubbleByType(boid,type:BubbleType):S20014_1_1
    {
        var list = this.allBubbles.get(boid);
        if(!list)return null;
        var _list = [];
        for (let i = 0; i < list.length; i++) {
            const element:S20014_1_1 = list[i];
            if(element.WhenToTalk == type)
            {
                _list.push(element);
            }
        }
        var bubble = null;
        if(_list.length > 0)
        {
            var rand = GMath.randRange(0,_list.length-1);
            bubble = _list[rand];
            for (let i = 0; i < _list.length; i++) {
                const element = _list[i];
                var index = list.indexOf(element);
                if(index != -1)
                list.splice(index,1);
            }
        }
        return bubble;
    }

    private saveReport(data: any): void {
        var reportType = ReportType.INVALID;
        this.fightScene.removeReady();
        switch (data.msgId) {
            case 20015:
                {
                    reportType = ReportType.PHYSICAL_ATTACK;
                    break;
                }
            case 20016:
                {
                    reportType = ReportType.MAGIC_ATTACK;
                    break;
                }
            case 20017:
                {
                    reportType = ReportType.BUFF;
                    break;
                }
            case 20019:
                {
                    reportType = ReportType.HEAl;
                    break;
                }
            case 20021:
                {
                    reportType = ReportType.SUMMON;
                    break;
                }

            case 20006:
                {
                    reportType = ReportType.BATTLE_END;
                    break;
                }

            case 20010:
                {
                    reportType = ReportType.ROUND_END;
                    break;
                }

            case 20018:
                {
                    reportType = ReportType.RUN;
                    break;
                }
        }
        this.AddReport(data, reportType);

    }

    private AddReport(data, type: ReportType) {
        //if(type == ReportType.BATTLE_END)
        //{
        //    if(data.WinSide == 0)
        //    {
        //        this.ForceStop = true;
        //        this.BattleFinish(0,false);
        //        return;
        //    }
        //    
        //}
        var report: NewBaseReport = Laya.Pool.getItemByClass("NewBaseReport", NewBaseReport);
        report.Parse(data, type);
        this.reportList.push(report);
        this.event(SNewBattleEvent.START_PLAY_REPORT);//发送播放战报事件
    }
    /**
     * 战斗结束
     */
    public BattleFinish(result: number, showResult = true) {
        if (showResult) {
            var winResult = 0;//发1，不一定是胜利，处理下是否是胜利
            if (result != 0) {
                if (this.localFightInfo) {
                    if (this.localFightInfo.Side == result) {
                        winResult = 1;
                    }
                    else {
                        winResult = 2;
                    }
                } else {
                    winResult = result;
                }
                if (this.CurrentBattleType == BattleMainType.PVP) {
                    MsgManager.instance.showRollTipsMsg(`战斗${winResult == 1 ? "胜利" : "失败"}`, MsgRollTipsType.msgRollTips2, "#ffffff");
                } else if (this.isHangUpBattle) {
                    (winResult != 0) && MsgManager.instance.showRollTipsMsg(`战斗${winResult == 1 ? "胜利" : "失败"}`, MsgRollTipsType.msgRollTips2, "#ffffff");
                }

            }
            this.LastBattleResult = winResult == 1 ? true : false;
            this.protocol.send20090();
            this.protocol.send20060();
        }
        GameLayer.instacne.fightLayer.alpha = 1;
        Laya.Tween.clearAll(GameLayer.instacne.fightLayer);
        Laya.Tween.to(GameLayer.instacne.fightLayer,{alpha:0.1},300,Laya.Ease.strongInOut,Laya.Handler.create(this,function():void{
            GameLayer.instacne.fightLayer.visible = false;
            GameLayer.instacne.fightLayer.alpha = 1;
        }));
        this.fightScene.dispose();
        this.event(SNewBattleEvent.CREATE_FIGHT_SCENE, true);
        UIManager.instance.closeUI(UIID.FIGHT_MAIN);
        UIManager.instance.closeUI(UIID.WORLD_BOSS_HUD);
        UIManager.instance.closeUI(UIID.SKILL_PANEL);
        this.clear();
        SGameData.instance.fightEnd();
        SRoleData.instance.FoceStopMove = false;
        this.continueFight = false;
        this.battleState = BattleState.IDLE;
    }


    public clear() {
        this.fightScene.removeReady();
        this.event(SNewBattleEvent.ROUND_TIME_START, [0]);
        this.allBattleBo.clear();
        this.allFightInfos.clear();
        this.allBoSkill.clear();
        this.roundEndReport = [];
        this.reportList = [];
        this.NewRoundBoReport.clear();
        this.BoWave = 1;
        this.fightScene.dispose();
    }

    private async CheckBattleState(data: S20007) {
        var isWait = false;
        if (this.battleState != BattleState.IDLE) {
            //如果正在播放战报要先停到战报播放（停止播放需要等待因为异步await不能临时停止）
            this.ForceStop = true;
            isWait = true;
            this.NewRoundBoReport.clear();
            this.roundEndReport = [];
            this.reportList = [];
        }
        while (this.ForceStop) {
            await Delay.delay(1);
        }
        if (isWait) {
            this.clear();
            this.fightScene.dispose();
        }

        this.BoWave = data.NthWave;
        this.CurrentBattleType = data.BattleType;
        this.CurrentBattleSubType = data.BattleSubType;
        this.battleState = BattleState.ENTER;
        GameUtils.curBigState = false;
        SRoleData.instance.FoceStopMove = true;
        SGameData.instance.fightStart();
        this.event(SNewBattleEvent.CREATE_FIGHT_SCENE, false);
        
        Laya.Tween.clearAll(GameLayer.instacne.fightLayer);
        GameLayer.instacne.fightLayer.visible = true;
        if(!isWait)
        {
            GameLayer.instacne.fightLayer.alpha = 0.1;
            Laya.Tween.to(GameLayer.instacne.fightLayer,{alpha:1},500,Laya.Ease.strongInOut);
        }
        else
        GameLayer.instacne.fightLayer.alpha = 1;
        //主队客队是相对的所以两个数组要区分主队
        //主队
        var mainTeamIndex = 1;
        var iSHaveBoss = false;

        for (let i = 0; i < data.item_2.length; i++) {
            const element = data.item_2[i];
            if (element.ParentObjId == SRoleData.instance.roleId) {
                mainTeamIndex = 2;
                break;
            }
        }

        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var fight = BattleUtil.createBattleRole(element, mainTeamIndex == 1);
            var infoData = BattleUtil.getFightViewInfo(element.ParentObjId, element.Sex, element.Faction, element.Weapon, element.LookIdx, element.ParentPartnerNo, element.Name, element.Clothes);
            var fightInfo = Laya.Pool.getItemByClass("FightInfo", FightInfo) as FightInfo;
            fightInfo.objInfo = element;
            fight.info = infoData;
            fightInfo.dead = DEAD_TYPE.NODEAD;
            fightInfo.Side = 1;
            if (mainTeamIndex == 1) {
                fightInfo.isMain = true;
                if (this.continueFight)
                    this.protocol.send20051(element.BoId);
                fight.angle = -180;
            }
            else {
                fightInfo.isMain = false;
                fight.angle = 45;
            }

            if (element.BoType == BOTYPE.BOSS || element.BoType == BOTYPE.WORLD_BOSS) {
                iSHaveBoss = true;
            }

            fight.action = Action.stand;
            fight.defaultSkin();
            this.allBattleBo.set(element.BoId, fight);
            this.allFightInfos.set(element.BoId, fightInfo);
            if (element.ParentObjId == SRoleData.instance.roleId) {
                this.localFightInfo = fightInfo;
            }
        }

        //客队
        for (let i = 0; i < data.item_2.length; i++) {
            const element = data.item_2[i];
            var fight = BattleUtil.createBattleRole(element, mainTeamIndex == 2);
            var infoData = BattleUtil.getFightViewInfo(element.ParentObjId, element.Sex, element.Faction, element.Weapon, element.LookIdx, element.ParentPartnerNo, element.Name, element.Clothes);
            var fightInfo = Laya.Pool.getItemByClass("FightInfo", FightInfo) as FightInfo;
            fightInfo.objInfo = element;
            fight.info = infoData;
            fightInfo.dead = DEAD_TYPE.NODEAD;
            fightInfo.Side = 2;
            if (mainTeamIndex == 2) {
                fightInfo.isMain = true;
                if (this.continueFight)
                    this.protocol.send20051(element.BoId);
                fight.angle = -180;
            }
            else {
                fightInfo.isMain = false;
                fight.angle = 45;
            }
            if (element.BoType == BOTYPE.BOSS || element.BoType == BOTYPE.WORLD_BOSS) {
                iSHaveBoss = true;
            }
            fight.action = Action.stand;
            fight.defaultSkin();
            this.allBattleBo.set(element.BoId, fight);
            this.allFightInfos.set(element.BoId, fightInfo);

            if (element.ParentObjId == SRoleData.instance.roleId) {
                this.localFightInfo = fightInfo;
            }
        }

        this.fightScene.addRoles();
        if (SCopyData.instance.isInCopy) {
            if (SCopyData.instance.curCopyInfo) {
                var cfg = SCopyData.instance.curCopyInfo.scene_bg;
                if (SCopyData.instance.curCopyInfo.isGrid || !cfg || cfg == "") {
                    var centerPos = GameUtils.getCenterScreenPos(50, 270);
                    this.fightScene.LoadSpecial("bg/BG (2).png", centerPos.x, centerPos.y, 1, false);
                }
                else {
                    var path = ResUtils.getSceneSpecialBg(SCopyData.instance.curCopyInfo.scene_bg);
                    this.fightScene.LoadSpecial(path);
                }
            }

            this.fightScene.BgSprite.visible = true;

            if (SCopyData.instance.curCopyInfo.isPetCopy) {
                UIManager.instance.openUI(UIID.FIGHT_MAIN, [data.BattleType, data.BattleSubType, iSHaveBoss]);
                //UIManager.instance.openUI(UIID.SYS_PETCOPYFIGHT ,UILEVEL.POP_1 ,data.BattleType , data.BattleSubType , iSHaveBoss);
            }
            else if (SCopyData.instance.curCopyInfo.isWorldBoss || SCopyData.instance.curCopyInfo.isGuildBoss) {
                UIManager.instance.openUI(UIID.FIGHT_MAIN, [data.BattleType, data.BattleSubType, iSHaveBoss]);
                UIManager.instance.openUI(UIID.WORLD_BOSS_HUD);
            }
            else {
                UIManager.instance.closeUI(UIID.WORLD_BOSS_HUD);
                UIManager.instance.openUI(UIID.FIGHT_MAIN, [data.BattleType, data.BattleSubType, iSHaveBoss]);
            }
        }
        else {
            if ((data.BattleType == BattleMainType.PVP && data.BattleSubType == PvpBattleSubType.OffLineArena) ||
                (data.BattleType == BattleMainType.PVE && data.BattleSubType == PveBattleSubType.OffLineArena)) {
                var path = ResUtils.getSceneSpecialBg("map_06");
                this.fightScene.LoadSpecial(path);
            } else {
                //this.fightScene.BgSprite.visible = false;
                var centerPos = GameUtils.getCenterScreenPos(50, 270);
                this.fightScene.LoadSpecial("bg/BG (2).png", centerPos.x, centerPos.y, 1, false);
            }
            UIManager.instance.closeUI(UIID.WORLD_BOSS_HUD);
            UIManager.instance.openUI(UIID.FIGHT_MAIN, [data.BattleType, data.BattleSubType, iSHaveBoss]);
        }

        this.fightScene.initScene();
        this.RequsetAllBoSkillInfoAndTime();
        this.battleState = BattleState.INIT;//初始化完毕
        this.ResetFlg();
        this.currentRound = 1;
        this.currentMaxRound = data.MaxRound;

        ////如果是处于自动战斗中就直接发20036委托ai下指令协议
        if (!this.continueFight) {

            /**
             * 回合开始时要等待气泡播完才行
             */
            //await this.ShowBubbleByType(BubbleType.ROUND_START);
            var isAuto = Laya.LocalStorage.getItem("autoFight") == "true" ? true : false;
            if (!isAuto) {
                this.battleState = BattleState.COMMAND;//如果不是自动战斗就这是当前战斗状态是等待下达指令
            }
        }
        else {

        }

    }

    private EnterBattle(data: S20007) {
        this.CheckBattleState(data);
    }
    /**
     * 战斗时间
     */
    public startTime: number = 0;
    public onBattleTime(time: S20064): void {
        if (time.RetCode == 0) {//查询成功
            this.startTime = time.StartTime;
        } else {
            //查询失败
        }
    }

    /**
     * 某个boid可用技能列表
     * @param data 
     */
    private saveSkillInfo(data: S20050): void {

        var skills = this.allBoSkill.get(data.BoId);
        if (!skills)
            skills = new Laya.Dictionary();
        else {
            if (skills.keys.length != data.item_1.length)
                skills.clear();
        }
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var skill: Skill = skills.get(element.SkillId)
            if (!skill) {
                skill = new Skill(element.SkillId);
            }
            skill.LeftCDRounds = element.LeftCDRounds;
            skill.IsUsable = element.IsUsable;
            skill.Lv = element.LV;
            skill.Boid = data.BoId;
            skills.set(element.SkillId, skill);
        }
        this.allBoSkill.set(data.BoId, skills);
        this.event(SNewBattleEvent.FIGHT_SKILL_INFO_UPDATE);
    }

    private getFightBoids(condition: Function): number[] {
        var boids: number[] = [];
        for (let i: number = 0; i < this.allFightInfos.values.length; i++) {
            var info: FightInfo = this.allFightInfos.values[i];
            if (condition(info.boid)) {
                boids.push(info.boid);
            }
        }
        return boids;
    }

    private noSelf(attckId: number): number[] {
        var team: number[] = this.getTeam(true);
        var index: number = team.indexOf(attckId);
        team.splice(index, 1);
        return team;
    }

    public getTeam(isSelf: boolean): number[] {
        var boids: number[] = [];
        return this.getFightBoids(boid => {
            var info: FightInfo = this.allFightInfos.get(boid);
            if (!info)
                return;
            return info.isMain == isSelf;
        });
    }

    private deadBoids(isDead: boolean): number[] {
        var team: number[] = [];
        return this.getFightBoids(boid => {
            var info: FightInfo = this.allFightInfos.get(boid);
            if (!info) return;
            if (!isDead)
                return info.dead != DEAD_TYPE.DISAPPEAR;
            else
                return info.dead == DEAD_TYPE.DISAPPEAR;

        });
    }

    public getFighrBoidsCondition(targetLimit: any[], targetId: number): number[] {
        var _boids = [];
        for (let i = 0; i < targetLimit.length; i++) {
            const element = targetLimit[i];
            if (_boids.length == 0) {
                _boids = this.getFightBoidsByType(element, targetId);
            }
            else {
                var haveList = [];
                var _list = this.getFightBoidsByType(element, targetId);
                for (let j = 0; j < _list.length; j++) {
                    const _boid = _list[j];
                    var index = _boids.indexOf(_boid);
                    index != -1 && haveList.push(_boid);
                }
                if (haveList.length > 0) {
                    _boids = haveList;
                }
            }
        }
        return _boids;
    }

    public getFightBoidsByType(type: number, attckId: number): number[] {
        switch (type) {
            case TARGET_TYPE_LIMIT.ENEME://所有敌人
                return this.getTeam(false);
            case TARGET_TYPE_LIMIT.FD://自己这边的角色
                return this.getTeam(true);
            case TARGET_TYPE_LIMIT.SELF://自己
                return [attckId];
            case TARGET_TYPE_LIMIT.NO_SELF://除了自己这边的角色
                return this.noSelf(attckId);
            case TARGET_TYPE_LIMIT.DEAD://死亡的角色
                return this.deadBoids(true);
            case TARGET_TYPE_LIMIT.NO_DEAD://非死亡
                return this.deadBoids(false);
            //还有好多类型，后面加
        }
        return [];
    }
    /**
     * 某个战斗单位是否有休息的buff
     */
    public getFightBuffHasSleep(boid: number): boolean {
        var has = false;
        var attackView: FightView = this.allBattleBo.get(boid);
        if (attackView) {
            if (attackView.FightBuffs.AllBuff.values.length > 0) {
                for (let i = 0; i < attackView.FightBuffs.AllBuff.values.length; i++) {
                    const buff: Buff = attackView.FightBuffs.AllBuff.values[i];
                    if (buff.TypeName == "cd") {
                        has = true;
                        break;
                    }
                }
            }
        }
        return has;
    }

    /**
     * 是否可控制
     * @param info 
     */
    public getCanCtrl(info: FightInfo): boolean {
        if (this.localFightInfo.boid == info.boid ||
            (info.objInfo.OwnerPlayerBoId == this.localFightInfo.boid && info.objInfo.BoType == BOTYPE.PET)
            || (info.objInfo.IsPlotBo == 1 && info.objInfo.CanBeCtrled == 1)) {
            return true;
        }
        else
            return false;
    }

    /**
     * 找出本地玩家能控制的bo单位
     */
    public getFightSelfBosInfo(): FightInfo[] {
        var mainInfo: FightInfo[] = [];
        for (let i = 0; i < this.allFightInfos.values.length; i++) {
            const element = this.allFightInfos.values[i] as FightInfo;
            if (element.isMain) {
                if (this.localFightInfo) {
                    if (this.getCanCtrl(element)) {
                        mainInfo.push(element);
                    }
                }
            }
        }
        mainInfo.sort((a, b): number => {
            if (a.isPlayer)
                return -1;
            else
                return 1;
        }
        );
        return mainInfo;
    }

    public get isHangUpBattle(): boolean {
        return SGameData.instance.PLAYFIGHTREPORT && this.CurrentBattleType == BattleMainType.PVE && this.CurrentBattleSubType == PveBattleSubType.HangUp;
    }


    public RequsetBoskillInfo(boid: number) {
        this.protocol.send20050(boid);//查询技能
    }

    /**
     * 请求本地玩家可操作单位的技能跟战斗时间
     */
    public RequsetAllBoSkillInfoAndTime() {
        this.startTime = 0;
        var infos: FightInfo[] = this.getFightSelfBosInfo();
        for (var i: number = 0; i < infos.length; i++) {
            this.RequsetBoskillInfo(infos[i].boid)
        }
        this.protocol.send20064();//查询时间
    }
}



export enum SNewBattleEvent {
    CREATE_FIGHT_SCENE = "new_create_fight_scene",//创建战斗场景
    NEW_ROUND_START = "new_round_start",//新回合开始
    ROUND_END_ACTION = "round_end_action",//处理回合结算的数据也就是20041~20044或者又可能处理20062    
    START_PLAY_REPORT = "start_play_report",//播放战报
    ROUND_TIME_START = "round_time_start",//下指令倒计时
    ONE_BO_ACTED = "one_bo_acted",//某个bo下打指令；
    HIDE_GAME_SCENE = "hide_game_scene",//是否隐藏
    PK_PLAYER_CALL_BACK = "pk_player_call_back",//pk反馈
    FIGHT_SKILL_INFO_UPDATE = "fight_skill_info_update",//战斗技能信息
    ROUND_NEW_WAVE = "round_new_wave",//新一波
    ROUND_END_UPDATE = "round_end_update",//战斗结束推送
    BATTLE_DAM_EVENT = "battle_dam_evet",//
}