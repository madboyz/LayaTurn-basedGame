import { TabBar } from "../../../../compent/TabBar";
import { MsgManager } from "../../../../manager/MsgManager";
import { PersonBossPanel } from "./PersonBossPanel";
import { WorldBossPanel } from "./WorldBossPanel";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { SWorldBossData } from "../../../../../../net/data/SWorldBossData";
import { RedDotManager } from "../../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../../redDot/RedDotList";
import { SuperBossPanel } from "./SuperBossPanel";

export class BossCopyPanel extends ui.main.BossCopyPanelUI {
    private mTab:TabBar;
    public curIndex:number = -1;
    public curretSp:Laya.View;
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            
            { url: "res/atlas/copy.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        if(!this.mTab)
        {
            this.mTab = new TabBar([this.btn_0,this.btn_1,this.btn_2,this.btn_3] , [UIID.SYS_COPY_BOSS , UIID.SYS_WORLD_BOSS]);
            this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        }
        this.mTab.select = this.curIndex;
    }

    public update():void
    {
        this.mTab.select = this.tabIndex;
    }

    private showRed():void {
        this.showPersonBossRed(RedDotManager.instance.GetRD(RedDotType.RDPersonBoss)._isActiveSave);
        this.showWorldBossRed(RedDotManager.instance.GetRD(RedDotType.RDWorldBoss)._isActiveSave);
    }
    
    private showPersonBossRed(show:boolean = false):void{
        this.btn_0.refreshRed(show);
    }
    
    private showWorldBossRed(show:boolean = false):void{
        this.btn_1.refreshRed(show);
    }
    
    private showSuperBossRed(show:boolean = false):void{
        this.btn_2.refreshRed(show);
    }

    public updateWordData():void
    {
        if(this.curretSp&&this.curretSp instanceof WorldBossPanel)
        {
            this.curretSp["updateData"]();
        }
    }

    public updateData():void
    {
        this.curretSp && this.curretSp["updateData"]();
        this.curretSp && this.showRed();
    }

    public open(...args): void {
        this.initWindow(true,true,"BOSS",550,750,50);
        super.open();
        this.update()
        this.showRed();
    }
    
    public initEvent():void 
    {
        this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        RedDotManager.instance.on(RedDotType.RDPersonBoss,this,this.showPersonBossRed);
        RedDotManager.instance.on(RedDotType.RDWorldBoss,this,this.showWorldBossRed);
    }
    public removeEvent():void
    {
        RedDotManager.instance.off(RedDotType.RDPersonBoss,this,this.showPersonBossRed);
        RedDotManager.instance.off(RedDotType.RDWorldBoss,this,this.showWorldBossRed);

        this.mTab.off(Laya.Event.CHANGE,this,this.onTabChange);
    }

    private onTabChange(index:number,btn:Laya.Button) {
        if(this.curIndex != index)
        {
            if(index == 3)
            {
                if (this.curretSp) {
                    this.curretSp.removeSelf();
                    this.curretSp = null;
                }
                MsgManager.instance.showRollTipsMsg("敬请期待");
                this.mTab.select = this.curIndex;
                return;
            }
            this.curIndex = index;
            if (this.curretSp) {
                this.curretSp.removeSelf();
                this.curretSp = null;
            }
        }
        this.curretSp = this.getPanelByIndex(this.curIndex);
    }

    private getPanelByIndex(index:number):Laya.View
    {
        if (this.curretSp) {
            this.curretSp.removeSelf();
            this.curretSp = null;
        }
        var title:string = "BOSS";
        if(index == 0)
        {
            this.curretSp = new PersonBossPanel();//个人boss
            title = "个人BOSS";
        }
        else if(index == 1)
        {
            this.curretSp = new WorldBossPanel();//世界BOSS
            title = "世界BOSS";
        }
        else if(index == 2)
        {
            title = "至尊BOSS";
            this.curretSp = new SuperBossPanel();//至尊BOSS
        }
        else if(index == 3)
        {
            title = "敬请期待";
        }
        this.curretSp && this.addChildAt(this.curretSp,2);
        this.curretSp && this.curretSp["initComp"]();
        this.Title = title;
        return this.curretSp;
    }

    public close(): void {
        this.curIndex = -1;
        this.mTab.select = this.curIndex;
        this.curretSp && this.curretSp.removeSelf();
        this.curretSp = null;
        super.close();
    }
}