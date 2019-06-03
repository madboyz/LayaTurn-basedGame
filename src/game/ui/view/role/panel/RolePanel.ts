import { TabBar } from "../../../compent/TabBar";
import { RoleInfoPanel } from "./RoleInfoPanel";
import { SkillPanel } from "../../skill/panel/SkillPanel";
import { SSkillData } from "../../../../skill/SSkillData";
import { RoleHeartMethodPanel } from "./RoleHeartMethodPanel";
import { RoleJingMaiPanel } from "./RoleJingMaiPanel";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";

export class RolePanel extends ui.main.RolePanelUI {
    private mTab:TabBar;
    public curIndex:number = -1;
    public curretSp:Laya.View;
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/heartFuc.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        if(!this.mTab)
        {
            this.mTab = new TabBar([this.btn_0,this.btn_1,this.btn_2,this.btn_3] , [UIID.ROLE,UIID.SYS_ROLE_JINGMAI,0,UIID.SYS_ROLE_XINGFA]);
            this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        }
        this.mTab.select = this.curIndex;
    }

    public update():void
    {
        this.mTab.select = this.tabIndex;
    }

    public open(...args): void {
        this.initWindow(true,true,"人物",550,750,35);
        super.open();
        this.update();
        this.updateRed();
    }

    public initEvent():void 
    {
        this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        RedDotManager.instance.on(RedDotType.RDRoleInfo, this, this.showInfoRed);
        RedDotManager.instance.on(RedDotType.RDRoleSkill, this, this.showSkillRed);
        RedDotManager.instance.on(RedDotType.RDRoleJinMai, this, this.showJinMaiRed);
        RedDotManager.instance.on(RedDotType.RDRoleXingFa, this, this.showXingFaRed);
    }

    public removeEvent():void
    {
        RedDotManager.instance.off(RedDotType.RDRoleInfo, this, this.showInfoRed);
        RedDotManager.instance.off(RedDotType.RDRoleSkill, this, this.showSkillRed);
        RedDotManager.instance.off(RedDotType.RDRoleJinMai, this, this.showJinMaiRed);
        RedDotManager.instance.off(RedDotType.RDRoleXingFa, this, this.showXingFaRed);

        this.mTab.off(Laya.Event.CHANGE,this,this.onTabChange);
    }

    private onTabChange(index:number,btn:Laya.Button) {
        if(this.curIndex != index)
        {
            this.curIndex = index;
            if (this.curretSp) {
                this.curretSp.removeSelf();
                this.curretSp = null;
            }
        }
        if(this.curretSp == null)
        this.curretSp = this.getPanelByIndex(this.curIndex);
    }

    private getPanelByIndex(index:number):Laya.View
    {
        var title:string = "人物";
        if(index == 0)
        {
            this.curretSp = new RoleInfoPanel();//人物信息
            title = "人物总览";
        }
        else if(index == 1)
        {
            this.curretSp = new RoleJingMaiPanel();//经脉
            title = "经脉";
        }
        else if(index == 2)
        {
            var subParam = this.arg && this.arg[0];//技能面板为传进去的第二个参数表示2级页签
            this.curretSp = new SkillPanel(subParam);//技能
            title = "技能";
        }
        else if(index == 3)
        {
            this.curretSp = new RoleHeartMethodPanel();//心法
            title = "心法";
        }
        this.curretSp && this.addChildAt(this.curretSp,2);
        this.Title = title;
        return this.curretSp;
    }

    public onInfoUpdate():void
    {
        if(this.curretSp instanceof RoleInfoPanel)
        {
            var infoPanel = this.curretSp as RoleInfoPanel;
            infoPanel.updadeLevel();
            infoPanel.updateExp();
            infoPanel.updateSoar()
            infoPanel.updateAddPoint();
            infoPanel.updateCombat();
        }
    }

    public updateJingmai():void
    {
        if(this.curretSp instanceof RoleJingMaiPanel)
        {
            var heartPanel = this.curretSp as RoleJingMaiPanel;
            heartPanel.onUpgardata();
        }
    }

    public updateBattlerPower():void 
    {
        if(this.curretSp instanceof RoleJingMaiPanel)
        {
            var jingmaiPanel = this.curretSp as RoleJingMaiPanel;
            jingmaiPanel.updateBattlePower();
        }
        else if(this.curretSp instanceof RoleHeartMethodPanel)
        {
            var heartPanel = this.curretSp as RoleHeartMethodPanel;
            heartPanel.updateBattlePower();
        }
        else if(this.curretSp instanceof RoleInfoPanel)
        {
            var infoPanel = this.curretSp as RoleInfoPanel;
            infoPanel.updateCombat();
        }
        
    }

    public updateHeart():void
    {
        if(this.curretSp instanceof RoleHeartMethodPanel)
        {
            var heartPanel = this.curretSp as RoleHeartMethodPanel;
            heartPanel.onUpgardata();
        }
    }

    public updateAllEquip():void
    {
        if(this.curIndex == 0)
        {
            (this.curretSp as RoleInfoPanel).updateAllEquip();
        }
    }

    public updateRed():void{
        this.showInfoRed(RedDotManager.instance.GetRD(RedDotType.RDRoleInfo)._isActiveSave);//
        this.showSkillRed(RedDotManager.instance.GetRD(RedDotType.RDRoleSkill)._isActiveSave);//
        this.showJinMaiRed(RedDotManager.instance.GetRD(RedDotType.RDRoleJinMai)._isActiveSave);//
        this.showXingFaRed(RedDotManager.instance.GetRD(RedDotType.RDRoleXingFa)._isActiveSave);//
    }

    public showInfoRed(show:boolean = false):void{
        this.btn_0.refreshRed(show);
    }

    public showSkillRed(show:boolean = false):void{
        this.btn_2.refreshRed(show);
    }

    public showJinMaiRed(show:boolean = false):void{
        this.btn_1.refreshRed(show);
    }

    public showXingFaRed(show:boolean = false):void{
        this.btn_3.refreshRed(show);
    }

    public close(): void {
        this.curIndex = -1;
        this.mTab.select = this.curIndex;
        this.curretSp && this.curretSp.removeSelf();
        this.curretSp = null;
        super.close();
    }
}