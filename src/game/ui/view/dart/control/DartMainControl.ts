import { DartMainPanel } from "../panel/DartMainPanel";
import { SDartData, SDartEvent } from "../../../../dart/data/SDartData";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { MsgManager } from "../../../manager/MsgManager";
import { SNewBattleData } from "../../../../../net/data/SNewBattleData";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class DartMainControl extends BaseControl {
    private readonly CheckTime = 200;
    private time = 0;
    constructor()
    {
        super();
        this.panel = new DartMainPanel();
    }

    public set panel(value: DartMainPanel) {
        this.mPanel = value;
    }

    public get panel(): DartMainPanel {
        return this.mPanel as DartMainPanel;
    }

    openView(...args) {
        this.initEvent();
        this.requsetInit();
        Laya.timer.loop(1,this,this.updateRole);
        //this.panel.UpdateDarts();
    }

    closeView() {
        this.removeEvent();
        Laya.timer.clear(this,this.updateRole);
        super.closeView();
    }

    private updateRole()
    {
        this.panel.UpdateRole();
        if(this.time >= this.CheckTime)
        {
            this.time = 0;
            //var rand = GMath.randRange(0,3);
            //if(rand > 1)
            this.panel.RandRole();
        }
        else
        {
            this.time ++;
        }
    }

    private requsetInit()
    {
        SDartData.instance.protocol.send42001();
        SDartData.instance.protocol.send42005();
    }

    private initEvent() {
        SDartData.instance.on(SDartEvent.DART_UPDATE_ALL,this,this.onUpdateAllInfo);
        SDartData.instance.on(SDartEvent.DART_UPDATE_MY_INFO,this,this.onUpdateMyInfo);
        SDartData.instance.on(SDartEvent.DART_UPDATE_ONE,this,this.onUpdateCheckOne);
        SDartData.instance.on(SDartEvent.DART_ONE_LOG_UPDATE,this,this.onNewLogUpdate);
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);
    }

    private removeEvent() {
        SDartData.instance.off(SDartEvent.DART_UPDATE_ALL,this,this.onUpdateAllInfo);
        SDartData.instance.off(SDartEvent.DART_UPDATE_MY_INFO,this,this.onUpdateMyInfo);
        SDartData.instance.off(SDartEvent.DART_UPDATE_ONE,this,this.onUpdateCheckOne);
        SDartData.instance.off(SDartEvent.DART_ONE_LOG_UPDATE,this,this.onNewLogUpdate);
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);
    }

    private onNewLogUpdate()
    {
        this.panel.dartLogBtn.refreshRed(true);
    }

    private onUpdateCheckOne(roleId:number)
    {
        if(roleId == SRoleData.instance.roleId){
            MsgManager.instance.showRollTipsMsg("大侠，这是您自己的镖车！");
            return;
        }
        var info =  SDartData.instance.AllInfos.get(roleId);
        if(info)
        {
            if(info.cur_hijack >= info.max_hijack)
            {
                MsgManager.instance.showRollTipsMsg("大侠请放过他吧，都快弹尽粮绝了!");
                return;
            }
            UIManager.instance.openUI(UIID.DART_INFO_PANEl, [true,info]);
        }
        
    }

    private UpdateTime()
    {
        this.panel.DartIngTime();
    }

    private onUpdateMyInfo() {
        this.panel.UpMyDart();
        this.panel.DartIngTime();
    }

    private onUpdateAllInfo() {
        this.panel.UpdateDarts();
    }
    
}