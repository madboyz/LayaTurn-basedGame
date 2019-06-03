import { FightMainPanel } from "../panel/FightMainPanel";
import { DataManager } from './../../../../../message/manager/DataManager';
import { FightInfo } from "../../../../battle/model/FightInfo";
import { NewBattleProtocol } from "../../../../battle/protocol/NewBattleProtocol";
import { SNewBattleData, SNewBattleEvent, BattleState } from "../../../../../net/data/SNewBattleData";

export class FightMainControl extends BaseControl {
    private protocol: NewBattleProtocol = new NewBattleProtocol();
    
    private CoolDownTime = 0; 
    constructor() {
        super();
        this.panel = new FightMainPanel();
    }

    public get getEvent(): Array<any> {
        return [];
    }

    public set panel(value: FightMainPanel) {
        this.mPanel = value;
    }



    public get panel(): FightMainPanel {
        return this.mPanel as FightMainPanel;
    }

    openView(...args) {
        this.initEvent();
        this.onRoundStart();
        //this.panel.checkAutoFight();
    }

    closeView() {
        super.closeView();
        this.removeEvent();
    }

    private initEvent() {
        SNewBattleData.instance.on(SNewBattleEvent.NEW_ROUND_START , this , this.onRoundStart);
        DataManager.listen(PROTOCOL.E20009, this, this.onHide);//战报准备中,隐藏操作面板
        SNewBattleData.instance.on(SNewBattleEvent.ROUND_TIME_START , this , this.ShowTime);
        SNewBattleData.instance.on(SNewBattleEvent.ONE_BO_ACTED , this , this.BoActedUpdate);
        SNewBattleData.instance.on(SNewBattleEvent.ROUND_END_UPDATE, this, this.UpdateDisplayHud);
        SNewBattleData.instance.on(SNewBattleEvent.ROUND_NEW_WAVE, this, this.NewWaveUpdate);
    }
    private removeEvent() {
        DataManager.cancel(PROTOCOL.E20009, this, this.onHide);//战报准备中
        SNewBattleData.instance.off(SNewBattleEvent.NEW_ROUND_START , this , this.onRoundStart);
        SNewBattleData.instance.off(SNewBattleEvent.ROUND_TIME_START , this , this.ShowTime);
        SNewBattleData.instance.off(SNewBattleEvent.ONE_BO_ACTED , this , this.BoActedUpdate);
        SNewBattleData.instance.off(SNewBattleEvent.ROUND_END_UPDATE, this, this.UpdateDisplayHud);
        SNewBattleData.instance.off(SNewBattleEvent.ROUND_NEW_WAVE, this, this.NewWaveUpdate);
    }

    
    //开启显示时间
    private ShowTime(time = 20)
    {
        Laya.timer.clear(this ,this.CoolDown);
        if(time == 0)
        {
            
            this.panel.UpdateTime(time);   
            return;
        }
        this.CoolDownTime = time;
        Laya.timer.loop(1000 , this , this.CoolDown);
    }

    

    private CoolDown()
    {
        if(SNewBattleData.instance.ForceStop)
        {
            Laya.timer.clear(this ,this.CoolDown);
            SNewBattleData.instance.ForceStop = false;
            return;
        }
        this.panel.UpdateTime(this.CoolDownTime);
        if (this.CoolDownTime == 0) {
            Laya.timer.clear(this ,this.CoolDown);
            SNewBattleData.instance.autoBo();
            return; 
        }
        this.CoolDownTime--;
    }
    /**
     * 某个bo下达了指令
     * @param boId 
     */
    private BoActedUpdate(boId:number)
    {
        var mainInfo:FightInfo[] = SNewBattleData.instance.getFightSelfBosInfo();
        var count = 0;
        for (let i = 0; i < mainInfo.length; i++) {
            const info = mainInfo[i];
            if(info.dead != DEAD_TYPE.DISAPPEAR)
            {
                if (info.isFlg)
                {
                    count ++;
                }
            }
            else
            count ++;
        }
        if(count == mainInfo.length)
        {
            
            this.panel.showOperate(false);
            this.ShowTime(0);
        }
        else
        {
            this.panel.showJiaobiao();
        }
    }

    public excuting(data: NotityData): void {
        //if (data.event == NotityEvents.FLG_COMPLETE) {
        //    this.panel.showJiaobiao();
        //} 
        // else if (data.event == Laya.Event.END) {
        //     Laya.LocalStorage.setItem("autoFight", "true");
        //     this.panel.checkAutoFight();
        //     Laya.LocalStorage.setItem("autoFight", "false");
        //     this.panel.checkAutoFight();
        // }
    }

    private onHide(): void {
        this.panel.hide(false);
    }

    private NewWaveUpdate()
    {
        this.panel.ShowBossDiplayer(true);
    }

    private UpdateDisplayHud()
    {
        this.panel.DisplayerText(SNewBattleData.instance.CurrentBattleType , SNewBattleData.instance.CurrentBattleSubType);
    }

    private onRoundStart(data:any = null): void {
        var selected = Laya.LocalStorage.getItem("autoFight") == "true" ? true : false;
        this.panel.showOperate(!selected);
        this.panel.showJiaobiao();
        this.UpdateDisplayHud();
        if(SNewBattleData.instance.battleState == BattleState.COMMAND)
        {
            if(!selected)
            {
                this.ShowTime();
            }
        }
        
    }

}