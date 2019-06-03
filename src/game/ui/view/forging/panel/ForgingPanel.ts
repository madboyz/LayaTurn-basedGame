import { TabBar } from "../../../compent/TabBar";
import { StrengthPanel } from "./Strength/panel/StrengthPanel";
import { RefinePanel } from "./Refine/panel/RefinePanel";
import { KaiLingPanel } from "./KaiLing/panel/KaiLingPanel";
import { GemPanel } from "./Gem/panel/GemPanel";
import { SForgingData } from "../../../../../net/data/SForgingData";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";
import { QianghuaPanel } from "./Strength/panel/QianghuaPanel";

export class ForgingPanel extends ui.main.ForgingPanelUI {
    private mTab:TabBar;
    public curIndex:number = -1;
    public curretSp:Laya.View;
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    public initComp() {
        super.initComp();

        this.combat.url = "res/atlas/number/fight.atlas";
        if(!this.mTab)
        {
            this.mTab = new TabBar([this.btn_0,this.btn_1,this.btn_2,this.btn_3], [0,0,UIID.SYS_EQ_QILING,UIID.SYS_EQ_BAOSHI] );
            this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        }
        this.mTab.select = this.curIndex;
    }

    public update():void
    {
        this.mTab.select = this.tabIndex;
    }

    public updateRed():void{
        this.showStrengRed(RedDotManager.instance.GetRD(RedDotType.RDForgingStrength)._isActiveSave);//
        this.showRefineRed(RedDotManager.instance.GetRD(RedDotType.RDForgingRefine)._isActiveSave);//
        this.showKailingRed(RedDotManager.instance.GetRD(RedDotType.RDForgingKailing)._isActiveSave);//
        this.showGemRed(RedDotManager.instance.GetRD(RedDotType.RDForgingGem)._isActiveSave);//
    }

    public showStrengRed(show:boolean = false):void{
        this.btn_0.refreshRed(show);
    }

    public showRefineRed(show:boolean = false):void{
        this.btn_1.refreshRed(show);
    }

    public showKailingRed(show:boolean = false):void{
        this.btn_2.refreshRed(show);
    }

    public showGemRed(show:boolean = false):void{
        this.btn_3.refreshRed(show);
    }

    public open(...args): void {
        this.initWindow(true,true,"锻造",550,750,35);
        super.open();
        this.update();
        this.updateRed();
    }

    public initEvent():void 
    {
        this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        this.combat.on(Laya.Event.CHANGE,this,this.updateCombatPos);
        RedDotManager.instance.on(RedDotType.RDForgingStrength, this, this.showStrengRed);
        RedDotManager.instance.on(RedDotType.RDForgingRefine, this, this.showRefineRed);
        RedDotManager.instance.on(RedDotType.RDForgingKailing, this, this.showKailingRed);
        RedDotManager.instance.on(RedDotType.RDForgingGem, this, this.showGemRed);
    }

    public removeEvent():void
    {
        this.mTab.off(Laya.Event.CHANGE,this,this.onTabChange);
        this.combat.off(Laya.Event.CHANGE,this,this.updateCombatPos);
        RedDotManager.instance.off(RedDotType.RDForgingStrength, this, this.showStrengRed);
        RedDotManager.instance.off(RedDotType.RDForgingRefine, this, this.showRefineRed);
        RedDotManager.instance.off(RedDotType.RDForgingKailing, this, this.showKailingRed);
        RedDotManager.instance.off(RedDotType.RDForgingGem, this, this.showGemRed);
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
        this.curretSp = this.getPanelByIndex(this.curIndex);
    }

    private getPanelByIndex(index:number):Laya.View
    {
        var title:string = "锻造";
        if(index == 0)
        {
            this.curretSp = new QianghuaPanel();//强化
            title = "强化";
        }
        else if(index == 1)
        {
            this.curretSp = new RefinePanel();//精炼
            title = "精炼";
        }
        else if(index == 2)
        {
            this.curretSp = new KaiLingPanel();//启灵
            title = "启灵";
        }
        else if(index == 3)
        {
            this.curretSp = new GemPanel();//宝石
            title = "宝石";
        }
        this.curretSp && this.addChildAt(this.curretSp,2);
        this.curretSp && this.curretSp["initComp"]();
        this.Title = title;
        return this.curretSp;
    }

    public onUpdateStrength(pos:number,nextPos:number)
    {
        if(this.curIndex != 3)
        {
            this.curretSp && this.curretSp["onUpdateStrength"](pos,nextPos);
        }
    }

    public onUpdateGem(pos:number,lv:number):void
    {
        if(this.curIndex == 3)
        {
            this.curretSp && this.curretSp["onUpdateStrength"](pos,lv);
        }
    }

    public updateCost():void
    {
        this.curretSp && this.curretSp["updateCost"]();
    }

    public updateCombat(value:number):void
    {
        this.combat.text = value.toString();
    }

    public updateCombatPos():void
    {
        var left:number = 189;
        var w:number = 204;
        var txtW:number = this.combat.w + this.world.width + 8;
        this.combatSp.x = (w - txtW)*0.5+left;
    }
   

    public close(): void {
        this.curIndex = -1;
        this.mTab.select = this.curIndex;
        this.curretSp && this.curretSp.removeSelf();
        this.curretSp = null;
        super.close();
    }
}