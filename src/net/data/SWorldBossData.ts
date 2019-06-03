import { DataManager } from "../../message/manager/DataManager";
import { S57101, S57102, S57103, C57102, C57102_1, S57003_2, C57103, S57104, C57104, C57101 } from "../pt/pt_57";
import { SocketManager } from "../SocketManager";
import { FbVo } from "../../db/sheet/vo/FbVo";
import { SRoleData } from "./SRoleData";
import { SGameData, SGameEvent } from "./SGameData";
import { GameUtils } from "../../game/utils/GameUtils";
import { SCopyData } from "./SCopyData";

export class SWorldBossData extends Laya.EventDispatcher {
    private static _instance: SWorldBossData;
    private CheckFightCd = 5;
    public WorldBossInfos:Laya.Dictionary = new Laya.Dictionary();
    public NoticeShow = true;
    public static get instance(): SWorldBossData {
        return SWorldBossData._instance || (SWorldBossData._instance = new SWorldBossData());
    }

    constructor() {
        super();
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E57101, this, this.onS57101);//世界BOSS血条
        DataManager.cancel(PROTOCOL.E57102, this, this.onS57102);//世界BOSS信息
        DataManager.cancel(PROTOCOL.E57103, this, this.onS57103);//副本界面排名信息
        DataManager.cancel(PROTOCOL.E57104, this, this.onS57104);//击杀记录
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);
        this.CheckFightCd = 5;
        this.WorldBossInfos.clear();
        this.NoticeShow = true;
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E57101, this, this.onS57101);//世界BOSS血条
        DataManager.listen(PROTOCOL.E57102, this, this.onS57102);//世界BOSS信息
        DataManager.listen(PROTOCOL.E57103, this, this.onS57103);//副本界面排名信息
        DataManager.listen(PROTOCOL.E57104, this, this.onS57104);//击杀记录
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);
        //DataManager.listen(PROTOCOL.E10002, this, this.onS57101);//世界BOSS血条
    }

    public init()
    {
        this.requsetWoldBossInfos();
    }
    /**
     * 请求副本类的boss血量
     */
    public updateInDunBossHP()
    {
        var msg:C57101  = new C57101;
        SocketManager.instance.send(msg); 
    }

    public requsetWoldBossRecord(no:number)
    {
        var msg:C57104  = new C57104;
        msg.DunNo = no;
        SocketManager.instance.send(msg);
    }

    private onS57104(data:S57104) {
        this.event(SWorldBossEvent.WORLD_BOSS_KILL_RECORD , data);
    }

    private UpdateTime(){
        if( this.NoticeShow)
        {
            if(this.CheckFightCd == 0)
            {
                this.CheckFightCd = 5;
                this.CheckBossCanFight();
            }
            else
            {
                this.CheckFightCd --;
            }
        }
        
        for (let i = 0; i < this.WorldBossInfos.keys.length; i++) {
            const key = this.WorldBossInfos.keys[i];
            var info = this.WorldBossInfos.get(key);
            if(!info)
            continue;
            if(info.state == 0&&info.reborn_time  > 0&&GameUtils.TimeStamp > info.reborn_time)
            {
                info.state = 1;
                info.reborn_time == 0;
                info.join_num = 0;
                info.cur_hp = info.max_hp;
                var isOpen = UIManager.instance.hasOpenUI(UIID.SYS_COPY_BOSS);
                if(!isOpen)
                this.NoticeShow = true;
                this.event(SWorldBossEvent.WORLD_BOSS_CAN_FIGHT , info);
                this.event(SWorldBossEvent.WORLD_BOSS_INFO_UPDATE);
                break;
            }
        }
    }
    

    public requsetWoldBossRank(no:number)
    {
        var msg:C57103  = new C57103;
        msg.DunNo = no;
        SocketManager.instance.send(msg);
    }

    public requsetWoldBossInfos()
    {
        var arr:Array<FbVo> = FbVo.getListByType(CopyType.WORLD);
        var msg:C57102  = new C57102;
        msg.item_1 = new Array<C57102_1>();
        for (let i = 0; i < arr.length; i++) {
            const no = arr[i].no;
            var _data:C57102_1 = new C57102_1();
            _data.DunNo = no;
            msg.item_1.push(_data);
        }
        SocketManager.instance.send(msg);
    }

    private onS57101(data:S57101)
    {
        var cfg = FbVo.get(data.DunNo);
        if(cfg.type != CopyType.WORLD){
            return;
        }
        var info = this.WorldBossInfos.get(data.DunNo);
        if(!info)
        {
            info = {}
            this.WorldBossInfos.set(data.DunNo , info);
        }
        info.max_hp = data.maxHp;
        info.cur_hp = data.curHp;
        info.dun_no = data.DunNo;
        this.event(SWorldBossEvent.WORLD_BOSS_INFO_UPDATE);
    }

    public CheckBossCanFight():any
    {
        var currentInfo = null
        for (let i = 0; i < this.WorldBossInfos.keys.length; i++) {
            const key = this.WorldBossInfos.keys[i];
            var info = this.WorldBossInfos.get(key);
            var vo:FbVo = FbVo.get(key);
            var data:S57003_2 = SCopyData.instance.getCopyInfo(vo.no);
            var times = vo.cd[1];
            if(data)
            {
                times = data.left_times;//原来自己减，直接改成剩余次数 times - data.times;
            }
            if(info.state == 1&&vo.lv_limit <= SRoleData.instance.info.Lv&&times > 0)
            {
                currentInfo = info;
                break;
            }
            
        }
        if(currentInfo)
        {
            this.event(SWorldBossEvent.WORLD_BOSS_CAN_FIGHT , currentInfo);
        }
        
        return currentInfo;
    }

    private onS57102(data:S57102)
    {
        if(data.item_2.length > 0){
            var checkData = data.item_2[0];
            var cfg = FbVo.get(checkData.dun_no);
            if(cfg.type != CopyType.WORLD){
                return;
            }
        }

        for (let i = 0; i < data.item_2.length; i++) {
            const element = data.item_2[i];
            var info = this.WorldBossInfos.get(element.dun_no);
            if(!info)
            {
                info = {};
                this.WorldBossInfos.set(element.dun_no , info);
            }
            info.dun_no = element.dun_no;
            
            info.join_num = element.join_num;
            info.max_hp = element.max_hp;
            info.cur_hp = element.cur_hp;
            info.state = element.state;
            if(GameUtils.TimeStamp >= element.reborn_time)
            {
                info.reborn_time = 0;
            }
            else
            {
                info.reborn_time = element.reborn_time;
            }
            
        }
        this.event(SWorldBossEvent.WORLD_BOSS_INFO_UPDATE);
        this.CheckBossCanFight();
    }

    private onS57103(data:S57103)
    {
        this.event(SWorldBossEvent.WORLD_BOSS_RANK_UPDATE , data);
    }

}

export enum SWorldBossEvent {
    WORLD_BOSS_INFO_UPDATE = "world_boss_info_update",//世界bossinfos
    WORLD_BOSS_CAN_FIGHT = "world_boss_can_fight",//推送一个可以挑战的boss
    WORLD_BOSS_RANK_UPDATE = "world_boss_rank_update",//世界boss伤害排名
    WORLD_BOSS_KILL_RECORD = "world_boss_kill_record",//世界boss击杀记录
}

