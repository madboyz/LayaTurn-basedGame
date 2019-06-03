import { TabBar } from './../../../compent/TabBar';
import { SBagData, SGoodsEvent } from '../../../../../net/data/SBagData';
import { SRoleData, SRoleEvent } from '../../../../../net/data/SRoleData';
import { SPetData, SPetEvent } from '../../../../../net/data/SPetData';
import { FucManager } from '../../../manager/FucManager';
import { SMountData, SMountEvent } from '../../../../../net/data/SmountData';
import { SFriendData } from '../../../../../net/data/SFriendData';
import { SCopyData } from '../../../../../net/data/SCopyData';
import { SForgingData } from '../../../../../net/data/SForgingData';
import { SChaosBattleData } from '../../../../activity/data/SChaosBattleData';
import { MsgManager } from '../../../manager/MsgManager';
import { MsgRollTipsType } from '../../../compent/MsgRollTipsType';
import { SWorldBossData } from '../../../../../net/data/SWorldBossData';
import { SComateData } from '../../comate/data/SComateData';
import { SSkillEvent, SSkillData } from '../../../../skill/SSkillData';
import { RedDotManager } from '../../../../redDot/RedDotManager';
import { RedDotType } from '../../../../redDot/RedDotList';
export class MainButtom extends ui.main.MainbuttomUI {
    private fuc:FucManager;
    constructor() {
        super();
        this.initComp();
        this.initEvent();
        this.y = Laya.stage.height - this.height;
        this.width = Laya.stage.width;
    }
    private initComp():void
    {
        this.fuc = new FucManager();
        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE,this,this.updateShowRed);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD,this,this.updateShowRed);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE,this,this.updateShowRed);
        SBagData.instance.on(SRoleEvent.ROLE_CHANGE_LEVEL,this,this.updateShowRed);
        SSkillData.instance.on(SSkillEvent.SKILL_UPGRADE, this , this.updateShowRed);
        Laya.timer.once(1000,this,this.updateShowRed);

        RedDotManager.instance.on(RedDotType.RDMaincity,this,this.updateMainCityRed);
        RedDotManager.instance.on(RedDotType.RDRole,this,this.updateRoleRed);
        RedDotManager.instance.on(RedDotType.RDForging,this,this.updateForgingRed);
        RedDotManager.instance.on(RedDotType.RDPet,this,this.updatePetRed);
        RedDotManager.instance.on(RedDotType.RDMount,this,this.updateMountRed);
    }

    private initEvent():void {
        this.btn_0.on(Laya.Event.CLICK,this,this.onTabChange,[this.btn_0]);
        this.btn_1.on(Laya.Event.CLICK,this,this.onTabChange,[this.btn_1]);
        this.btn_2.on(Laya.Event.CLICK,this,this.onTabChange,[this.btn_2]);
        this.btn_3.on(Laya.Event.CLICK,this,this.onTabChange,[this.btn_3]);
        this.btn_4.on(Laya.Event.CLICK,this,this.onTabChange,[this.btn_4]);
        this.btn_5.on(Laya.Event.CLICK,this,this.onTabChange,[this.btn_5]);
    }
    private removeEvent():void
    {
        this.btn_0.off(Laya.Event.CLICK,this,this.onTabChange);
        this.btn_1.off(Laya.Event.CLICK,this,this.onTabChange);
        this.btn_2.off(Laya.Event.CLICK,this,this.onTabChange);
        this.btn_3.off(Laya.Event.CLICK,this,this.onTabChange);
        this.btn_4.off(Laya.Event.CLICK,this,this.onTabChange);
        this.btn_5.off(Laya.Event.CLICK,this,this.onTabChange);
    }

    private onTabChange(btn:component.ScaleButton) {
        switch (btn) {
            case this.btn_0:
                UIManager.instance.closeUI(UIID.SYS_MAIN);
                break;
            case this.btn_1:
                UIManager.instance.openUI(UIID.ROLE);
                break;
            case this.btn_2:
                if(UIManager.instance.hasOpenUI(UIID.SYS_MAIN) == false)
                {
                    UIManager.instance.openUI(UIID.SYS_MAIN);
                }
                break;
            case this.btn_3:
                UIManager.instance.openUI(UIID.FORGING);
                break;
            case this.btn_4:
                 UIManager.instance.openUI(UIID.PET);
                break;
            case this.btn_5:
                UIManager.instance.openUI(UIID.SYS_MOUNT);
                 break;
            default:
                break;
        }
    }

    public updateShowRed():void
    {
        this.updateRoleRed(RedDotManager.instance.GetRD(RedDotType.RDRole)._isActiveSave);
        this.updateMainCityRed(RedDotManager.instance.GetRD(RedDotType.RDMaincity)._isActiveSave);
        this.updateForgingRed(RedDotManager.instance.GetRD(RedDotType.RDForging)._isActiveSave);
        this.updatePetRed(RedDotManager.instance.GetRD(RedDotType.RDPet)._isActiveSave);
        this.updateMountRed(RedDotManager.instance.GetRD(RedDotType.RDMount)._isActiveSave);
    }

    //人物红点
    public updateRoleRed(show:boolean = false):void{
        this.btn_1.refreshRed(show);
        this.btn_1.updadeRedPos(60,0);
    }

    //主城红点
    public updateMainCityRed(show:boolean = false):void{
        this.btn_2.refreshRed(show);
        this.btn_2.updadeRedPos(60,0);
    }
    //锻造
    public updateForgingRed(show:boolean = false):void{
        this.btn_3.refreshRed(show);
        this.btn_3.updadeRedPos(60,0);
    }

    //宠物
    public updatePetRed(show:boolean = false):void{
        this.btn_4.refreshRed(show);
        this.btn_4.updadeRedPos(60,0);
    }

    //坐骑
    public updateMountRed(show:boolean = false):void{
        this.btn_5.refreshRed(show);
        this.btn_5.updadeRedPos(60,0);
    }

    public removeSelf():any
    {
        this.removeEvent();
        super.removeSelf();
    }
}