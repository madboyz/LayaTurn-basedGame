import { TabBar } from "../../../compent/TabBar";
import { AchievementsItem } from "../item/AchievementsItem";
import { SChapterData, AchievementType } from "../../../../chapter/SChapterData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { Accomplish_levelVo } from "../../../../../db/sheet/vo/Accomplish_levelVo";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";

export class AchievementsPanel extends ui.main.AchievementsPanelUI {
    private mTab:TabBar;
    public curIndex:number = -1;
    public curType:AchievementType = AchievementType.ROLE;
    public totalProgress:ProgressBar;
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            { url: "res/atlas/chapter.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    private initList():void
    {
        this.AchList.itemRender = AchievementsItem;
        this.AchList.vScrollBarSkin = "";
        this.AchList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.AchList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.AchList.selectEnable = true;

        this.btnList.hScrollBarSkin = "";
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.totalProgress = new ProgressBar();
        this.totalProgress.setGrid("10,15,10,15","5,8,5,8");
        this.totalProgress.setBg(ResUtils.getCompUIUrl("progressBg"),ResUtils.getCompUIUrl("img_greenBar"),324,24,6,1,1,6);
        this.totalProgress.x = 215;
        this.totalProgress.y = 128;
        this.addChildAt(this.totalProgress ,2);
        this.totalProgress.setLabel(1,20,"#ffffff",0,100,0.5,"#309203");
        if(!this.mTab)
        {
            this.mTab = new TabBar([this.btn_0,this.btn_1,this.btn_2,this.btn_3,this.btn_4]);
        }
        this.mTab.select = this.curIndex;

    }

    public open(...args): void {
        this.initWindow(true,true,"成就",550,750,45);
        super.open();
        this.update();
        this.updateRed();
    }

    public initEvent():void {
        this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        RedDotManager.instance.on(RedDotType.RDRoleAchievement,this,this.roleRed);
        RedDotManager.instance.on(RedDotType.RDPetAchievement,this,this.petRed);
        RedDotManager.instance.on(RedDotType.RDRideAchievement,this,this.rideRed);
        RedDotManager.instance.on(RedDotType.RDComateAchievement,this,this.comateRed);
        RedDotManager.instance.on(RedDotType.RDOtherAchievement,this,this.otherRed);
    }

    public removeEvent():void {
        this.mTab.off(Laya.Event.CHANGE,this,this.onTabChange);
        RedDotManager.instance.off(RedDotType.RDRoleAchievement,this,this.roleRed);
        RedDotManager.instance.off(RedDotType.RDPetAchievement,this,this.petRed);
        RedDotManager.instance.off(RedDotType.RDRideAchievement,this,this.rideRed);
        RedDotManager.instance.off(RedDotType.RDComateAchievement,this,this.comateRed);
        RedDotManager.instance.off(RedDotType.RDOtherAchievement,this,this.otherRed);
    }

    public updateRed():void{
        this.roleRed(RedDotManager.instance.GetRD(RedDotType.RDRoleAchievement)._isActiveSave);
        this.petRed(RedDotManager.instance.GetRD(RedDotType.RDPetAchievement)._isActiveSave);
        this.rideRed(RedDotManager.instance.GetRD(RedDotType.RDRideAchievement)._isActiveSave);
        this.comateRed(RedDotManager.instance.GetRD(RedDotType.RDComateAchievement)._isActiveSave);
        this.otherRed(RedDotManager.instance.GetRD(RedDotType.RDOtherAchievement)._isActiveSave);
    }

    public roleRed(show:boolean):void{
        this.btn_0.refreshRed(show);
    }
    
    public petRed(show:boolean):void{
        this.btn_1.refreshRed(show);
    }
    
    public rideRed(show:boolean):void{
        this.btn_2.refreshRed(show);
    }
    
    public comateRed(show:boolean):void{
        this.btn_3.refreshRed(show);
    }
    
    public otherRed(show:boolean):void{
        this.btn_4.refreshRed(show);
    }

    public update():void
    {
        this.mTab.select = this.tabIndex;
    }

    public Refresh()
    {
        var total = SChapterData.instance.getTotalAchievePoint();
        var vo:Accomplish_levelVo = Accomplish_levelVo.getData(total);
        if(vo)
        {
            this.totalTxt.text = `成就等级Lv.${vo.no}`;
            this.totalProgress.setValue(total,vo.max); 
        }
        else
        {
            this.totalTxt.text = `成就等级Lv.1`;
            this.totalProgress.setValue(total,1000); 
        }
        var datas = SChapterData.instance.getAchievementsByType(this.curType);
        if(datas.length == 0)
        {
            this.AchList.array = null;
        }
        else
        this.AchList.array = datas;
        this.AchList.tweenTo(0,100);
    }

    private onTabChange(index:number,btn:Laya.Button) {
        if(this.curIndex != index)
        {
            this.curIndex = index;
            switch(this.curIndex)
            {
                case 0:
                {
                    this.curType = AchievementType.ROLE;
                    break;
                }
                case 1:
                {
                    this.curType = AchievementType.PET;
                    break;
                }
                case 2:
                {
                    this.curType = AchievementType.RIDE;
                    break;
                }
                case 3:
                {
                    this.curType = AchievementType.COMATE;
                    break;
                }
                case 4:
                {
                    this.curType = AchievementType.Other;
                    break;
                }
            }
            
        }
        this.Refresh();
    }

    public close(): void {
        this.curIndex = -1;
        this.mTab.select = this.curIndex;
        super.close();
    }
}