import { SRoleData } from "../../../../../net/data/SRoleData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { RoleEquipPart } from "./RoleEquipPart";
import { SBagData } from "../../../../../net/data/SBagData";
import { ItemData } from "../../../compent/data/ItemData";
import { MsgManager } from "../../../manager/MsgManager";
import { CommonControl } from "../../../../common/control/CommonControl";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { AoiInfo } from "../../../../aoi/AoiInfo";
import { S12002_1 } from "../../../../../net/pt/pt_12";
import { RoleFactory } from "../../../../battle/role/RoleFactory";
import { Soaring_configVo } from "../../../../../db/sheet/vo/Soaring_configVo";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";
import { PlayerView } from "../../../../battle/role/PlayerView";
import { SChapterData } from "../../../../chapter/SChapterData";

export class RoleInfoPanel extends ui.main.RoleInfoPanelUI {
    private role:PlayerView;
    private expBar:ProgressBar;
    private soarBar:ProgressBar;
    private equipPart:RoleEquipPart;
    private soarVo:Soaring_configVo;
    constructor() {
        super();
        this.initComp();
    }

    private initComp():void
    {
        this.combat.url = "res/atlas/number/fight.atlas";
        this.initPart();
        this.initBar();
        this.initEvent();
        this.updateData();
    }

    private initBar():void
    {
        this.expBar = new ProgressBar();
        this.expBar.setBg(ResUtils.getCompUIUrl("progressBg"),ResUtils.getCompUIUrl("img_greenBar_1"),250,24);
        this.expBar.setLabel(1,20,"#ffffff");
        this.expBar.x = 152;
        this.expBar.y = 617;
        this.addChild(this.expBar);

        this.soarBar = new ProgressBar();
        this.soarBar.setBg(ResUtils.getCompUIUrl("progressBg"),ResUtils.getCompUIUrl("img_blue"),250,24);
        this.soarBar.setLabel(1,20,"#ffffff");
        this.soarBar.x = 152;
        this.soarBar.y = 678;
        this.addChild(this.soarBar);
    }

    private initPart():void
    {
        this.equipPart = new RoleEquipPart();
        this.addChild(this.equipPart);
        this.equipPart.x = 72;
        this.equipPart.y = 235;
    }

    private initEvent():void
    {
        RedDotManager.instance.on(RedDotType.RDRoleEquip, this, this.updateData);
        RedDotManager.instance.on(RedDotType.RDRoleAddpoint, this, this.updateData);
        RedDotManager.instance.on(RedDotType.RDAchievements, this, this.updateData);
        RedDotManager.instance.on(RedDotType.RDFabao, this, this.updateData);
        this.btn_changeEquip.on(Laya.Event.CLICK,this,this.onChangeEquip);
        this.btn_addPoint.on(Laya.Event.CLICK,this,this.onClickAddPoint);
        this.btn_look.on(Laya.Event.CLICK,this,this.onLookProp);
        this.soarBtn.on(Laya.Event.CLICK,this,this.onClickSoarBtn);

        this.chengjiuBtn.on(Laya.Event.CLICK,this,this.onClickAchievenment);
        this.chenghaoBtn.on(Laya.Event.CLICK,this,this.onClickTitle);
        this.fabaoBtn.on(Laya.Event.CLICK,this,this.fabaoBtnClick);
        this.shizhuangBtn.on(Laya.Event.CLICK,this,this.onClickFashion);
    }

    private removeEvent():void
    {
        RedDotManager.instance.off(RedDotType.RDRoleEquip, this, this.updateData);
        RedDotManager.instance.off(RedDotType.RDRoleAddpoint, this, this.updateData);
        RedDotManager.instance.off(RedDotType.RDAchievements, this, this.updateData);
        RedDotManager.instance.off(RedDotType.RDFabao, this, this.updateData);
        this.btn_changeEquip.off(Laya.Event.CLICK,this,this.onChangeEquip);
        this.btn_addPoint.off(Laya.Event.CLICK,this,this.onClickAddPoint);
        this.btn_look.off(Laya.Event.CLICK,this,this.onLookProp);
        this.soarBtn.off(Laya.Event.CLICK,this,this.onClickSoarBtn);

        this.chengjiuBtn.off(Laya.Event.CLICK,this,this.onClickAchievenment);
        this.chenghaoBtn.off(Laya.Event.CLICK,this,this.onClickTitle);
        this.fabaoBtn.off(Laya.Event.CLICK,this,this.fabaoBtnClick);
        this.shizhuangBtn.off(Laya.Event.CLICK,this,this.onClickFashion);
    }



    public updateData():void
    {
        this.initRole();
        this.updateCombat();
        this.updateName();
        // this.updateGuildName();
        // this.updateTitleName();
        this.updadeLevel();
        this.updateExp();
        this.updateSoar();
        this.equipPart.updateAllEquip();
        this.updateRed();
        this.updateAddPoint();
    }

    public updateRed():void
    {
        this.btn_changeEquip.refreshRed(SBagData.instance.equip.equipList.length > 0);
        this.chengjiuBtn.refreshRed(SChapterData.instance.AchievementRed);
        this.fabaoBtn.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDFabao)._isActiveSave);
    }

    private initRole():void
    {
        if(!this.role){
            this.role = RoleFactory.CreateAOiPlayer(SRoleData.instance.info.Faction , SRoleData.instance.info.Sex);
            this.role.info = Laya.Pool.getItemByClass("AoiInfo", AoiInfo);
        }
        var data = new S12002_1();
        data.Clothes = SRoleData.instance.info.Clothes;
        data.Sex = SRoleData.instance.info.Sex;
        data.Faction = SRoleData.instance.info.Faction;
        data.Weapon = FactionVo.get(data.Faction).weapon_anim;
        this.role.info.PlayerInfo = data;
        this.role.scaleX = this.role.scaleY=1.2;
        this.role.x = 290;
        this.role.y = 465;
        this.addChild(this.role);
        this.role.updateSkin();
    }

    private onClickAddPoint()
    {
        UIManager.instance.openUI(UIID.SYS_ROLE_ADDPOINT);
    }

    public updateAllEquip():void
    {
        this.equipPart.updateAllEquip();
    }

    public updateAddPoint():void
    {
        if(SRoleData.instance.info.FreeTalentPoints > 0)
        {
            this.btn_addPoint.label = `加点(${SRoleData.instance.info.FreeTalentPoints})`;
            this.btn_addPoint.filters = [];
            this.btn_addPoint.refreshRed(true);
        }
        else
        {
            this.btn_addPoint.label = "加点";
            this.btn_addPoint.filters = [new Laya.ColorFilter(ResUtils.colorMatrix)];
            this.btn_addPoint.refreshRed(false);
        }
    }

    private onClickSoarBtn():void
    { 
        var soarLv = SRoleData.instance.info.Soaring;
        var nextVo = Soaring_configVo.get(soarLv+1);
        if(nextVo == null ||(nextVo&&nextVo.lv_limit == null) )
        {
            MsgManager.instance.showRollTipsMsg("飞升次数已满");
            return;
        }
        if(this.soarVo.need_lv > SRoleData.instance.info.Lv)
        {
            MsgManager.instance.showRollTipsMsg("未达到飞升等级");
            return;
        }
        UIManager.instance.openUI(UIID.SYS_ROLE_SOAR)
    }

    private onLookProp():void
    {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP,[SRoleData.instance.info]);
    }

    public updadeLevel():void
    {
        if(SRoleData.instance.info)
        {
            this.txt_level.text =  "Lv." + SRoleData.instance.info.Lv;
        }
    }

    public updateCombat():void
    {
        if(SRoleData.instance.info)
        {
            this.combat.text = SRoleData.instance.info.BattlePower.toString();
        }
    }

    public updateName():void
    {
        this.txt_name.text = SRoleData.instance.roleName;
    }

    public onClickAchievenment()
    {
        UIManager.instance.openUI(UIID.SYS_ACHIEVEN_PANEL);
    }

    public onClickTitle()
    {
        UIManager.instance.openUI(UIID.SYS_TITLE_PANEL);
    }

    public onClickFashion()
    {
        UIManager.instance.openUI(UIID.SYS_FAHSHION_PANEL);
    }
    
    public fabaoBtnClick():void{
        UIManager.instance.openUI(UIID.FABAO_PANEL);
    }

    // public updateGuildName():void
    // {
    //     this.txt_guild.text = SRoleData.instance.info.GuildName;
    // }

    // public updateTitleName():void
    // {
    //     this.txt_title.text = SRoleData.instance.info.TextTitle.toString();
    // }

    public updateExp():void
    {
        this.expBar.setValue(SRoleData.instance.info.Exp,SRoleData.instance.info.ExpLim);
        var curStr = GMath.GetChineseNumber(SRoleData.instance.info.Exp);
        var maxStr = GMath.GetChineseNumber(SRoleData.instance.info.ExpLim);
        this.expBar.Text = `${curStr}/${maxStr}`;
    }

    public updateSoar():void
    {
        var soarLv = SRoleData.instance.info.Soaring;
        var nextVo = Soaring_configVo.get(soarLv+1);
        this.soarVo = nextVo;
        if(this.soarVo == null||(this.soarVo&&this.soarVo.need_lv == null))
        this.soarVo = Soaring_configVo.get(soarLv);
        this.soarBar.setValue(SRoleData.instance.info.Lv,this.soarVo.need_lv);
        if(nextVo == null ||(nextVo&&nextVo.lv_limit == null) )
        {
            this.soarBar.Text = "飞升次数已满";
            this.soarBtn.filters =  [new Laya.ColorFilter(ResUtils.colorMatrix)];
        }
        else
        {
            this.soarBar.Text = `${SRoleData.instance.info.Lv}/${this.soarVo.need_lv}`;
            if(this.soarVo.need_lv > SRoleData.instance.info.Lv)
            this.soarBtn.filters =  [new Laya.ColorFilter(ResUtils.colorMatrix)];
            else
            this.soarBtn.filters = [];
        }
        
        this.txt_soar.text = `飞升${SRoleData.instance.info.Soaring}次`;
    }

    private onChangeEquip():void
    {
        var arr:Array<ItemData> = SBagData.instance.equip.equipList;
        if(arr.length > 0)
        {
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                CommonControl.instance.onEquipInstall(element.GoodsId);
            }
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("没有装备可穿戴");
        }
    }

    public removeSelf():any
    {
        this.role.dispose();
        this.role = null;
        this.expBar.removeSelf();
        this.expBar = null;
        this.soarBar.removeSelf();
        this.soarBar = null;
        this.equipPart.dispose();
        this.equipPart = null;
        this.removeEvent();
        super.removeSelf();
    }
}