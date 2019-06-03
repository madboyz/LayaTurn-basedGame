import { RewardList } from "../../../../compent/RewardList";
import { FightMonsterView } from "../../../../../battle/role/fight/FightMonsterView";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { ProgressBar } from "../../../../compent/ProgressBar";
import { SWorldBossData } from "../../../../../../net/data/SWorldBossData";
import { GameUtils } from "../../../../../utils/GameUtils";
import { TimerUtil } from "../../../../../utils/TimerUtil";
import { SGameData, SGameEvent } from "../../../../../../net/data/SGameData";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { S57003_2 } from "../../../../../../net/pt/pt_57";

export class WorldBossItem extends ui.main.WorldBossItemUI {
    private _rewarldList:RewardList;
    private role:FightMonsterView;
    private bossHp:ProgressBar;
    private info:any;
    constructor() {
        super();
        this.txt_record.underline = true;
        this.initList();
        this.initRole();
        this.initProgressBar();
    }

    private mData:FbVo;

    private initProgressBar():void
    {
        this.bossHp = new ProgressBar();
        this.bossHp.setGrid("10,15,10,15","5,8,5,8");
        this.bossHp.setBg(ResUtils.getCompUIUrl("barbg"),ResUtils.getCompUIUrl("bar"),100,25 ,6 ,4 ,5 ,6);
        this.bossHp.x = 22;
        this.bossHp.y = 110;
        this.bossHp.setLabel(1,20,"#ffffff",0,100,2);
        this.bitmapBox.addChild(this.bossHp);
    }

    private initRole():void
    {
        this.role = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this.role.changeScale = 0.7;
        this.role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.role.x = this.headBg.x + this.headBg.width/2 
        this.role.y = this.headBg.y + this.headBg.height/2+50;
        this.addChild(this.role);
    }

    private initList():void
    {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList",RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 4;
        this._rewarldList.maxNum = 4;
        this._rewarldList.itemStyle = 55;
        this._rewarldList.x = 136;
        this._rewarldList.y = 73;
        this.bitmapBox.addChild(this._rewarldList);
    }
    public set dataSource(data:any)
    {
        if(!data) return;
        this.mData = data;
        this.updateData();
    }

    public get dataSource():any
    {
        return this.mData;
    }

    public get canEnter():boolean
    {
        if(this.info)
        {
            var times = this.mData.cd[1];
            var data:S57003_2 = SCopyData.instance.getCopyInfo(this.mData.no);
            if(data)
            {
                times = data.left_times;//原来自己减，直接改成剩余次数 times - data.times;
            }
            if(this.mData.lv_limit > SRoleData.instance.info.Lv ||this.info.state == 0|| times == 0)
            {
                return false;
            }
        }
        return true;
    }

    private updateData():void
    {
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE,this,this.updateTime);
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE,this,this.updateTime);
        this.info = SWorldBossData.instance.WorldBossInfos.get(this.mData.no);
        this._rewarldList.updateRewardsByNum(this.mData.final_reward);
        
        this.txt_num.off(Laya.Event.CLICK , this, this.onClickTextNum);
        this.txt_record.off(Laya.Event.CLICK , this, this.onClickTextRecord);
        this.txt_record.on(Laya.Event.CLICK , this, this.onClickTextRecord);
        if(this.role)
        {
            if(this.role.info == null)
            {
                this.role.info = {};
            }
            this.role.info.ParentObjId = this.mData.mon_show_no;
            this.role.info.LookIdx = 1;
            this.role.updateSkin();
        }
        this.txt_name.text = this.mData.name;
        if(this.info)
        {
            var deltTime = this.info.reborn_time - GameUtils.TimeStamp;
            if(this.info.state == 0 && deltTime >= 0)
            {
                this.txt_record.visible = true;
                this.txt_num.visible = false;
                this.btn.visible = false;
                this.haskill.visible = true;
            }
            else
            {
                this.txt_num.visible = true;
                this.btn.visible = true;
                this.haskill.visible = false;
                this.txt_record.visible = false;
                if(this.info.join_num > 0)
                {
                    this.txt_num.underline = true;
                    this.txt_num.on(Laya.Event.CLICK , this, this.onClickTextNum);
                }
                else
                {
                    this.txt_num.underline = false;
                }

                
                if(this.mData.lv_limit > SRoleData.instance.info.Lv)
                {
                    this.txt_tips.text = `(需要角色${this.mData.lv_limit}级)`;
                    this.btn.disabled = true;
                }
                else
                {
                    this.txt_tips.text = "";
                    if(GameUtils.TimeStamp >= this.info.reborn_time)
                    {
                        var times = this.mData.cd[1];
                        var data:S57003_2 = SCopyData.instance.getCopyInfo(this.mData.no);
                        if(data)
                        {
                            times = data.left_times;//原来自己减，直接改成剩余次数 times - data.times;
                        }
                        if(times == 0)
                        {
                            this.btn.disabled = true;
                        }
                        else
                        {
                            this.btn.disabled = false;
                        }
                    }
                    else
                    {
                        this.btn.disabled = true;
                    }
                    
                }
            }
            this.txt_num.text = `争夺:${this.info.join_num}`;
            this.bossHp.setValue(this.info.cur_hp,this.info.max_hp);
            var hpText = (this.info.cur_hp/this.info.max_hp*100).toFixed(0);
            this.bossHp.Text = `${hpText}%`;
        }
        else
        {
            this.bossHp.Text = "100%";
            this.bossHp.setValue(10,10);
            this.haskill.visible = false;
            this.btn.visible = true;
            this.txt_record.visible = false;
            this.txt_num.visible = false;
            if(this.mData.lv_limit > SRoleData.instance.info.Lv)
            {
                this.txt_tips.text = `(需要角色${this.mData.lv_limit}级)`;
                this.btn.disabled = true;
            }
            else
            {
                this.txt_tips.text = "";
                this.btn.disabled = false;
            }
        }
        
        this.btn.refreshRed(!this.btn.disabled);
    }

    public updateTime():void
    {
        if(!this.info||(this.info&&this.info.reborn_time == 0||this.info.state == 1))
        {
            return;
        }
        if(this.info.reborn_time > 0 &&GameUtils.TimeStamp > this.info.reborn_time)
        {
            this.info.reborn_time = 0;
            this.updateData();
            return;
        }
        else
        {
            var deltTime = this.info.reborn_time - GameUtils.TimeStamp;
            var mm = TimerUtil.mm(deltTime);
            var ss = TimerUtil.ss(deltTime);
            var str = `${mm}:${ss}后重生`;
            this.txt_tips.text = str;
        }
    }

    private onClickTextRecord()
    {
        UIManager.instance.openUI(UIID.SYS_WORLD_BOSS_KILL ,[this.mData.no]);
    }

    public onClickTextNum()
    {
        UIManager.instance.openUI(UIID.SYS_WORLD_BOSS_DAMAGE_RANK ,[this.mData.no]);
    }

    public dispose():void
    {
        this._rewarldList.dispose();
        this.role.dispose();
        this.role = null;
    }

    public removeSelf():any
    {
        this.txt_num.off(Laya.Event.CLICK , this, this.onClickTextNum);
        this.txt_record.off(Laya.Event.CLICK , this, this.onClickTextRecord);
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE,this,this.updateTime);
        super.removeSelf();
    }

    
}