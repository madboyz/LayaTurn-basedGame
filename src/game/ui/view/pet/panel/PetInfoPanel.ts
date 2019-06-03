import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { SPetData, SPetEvent } from "../../../../../net/data/SPetData";
import { RoleView } from "../../../../battle/role/RoleView";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { PetInfo } from "../../../compent/data/PetInfo";
import { MsgManager } from "../../../manager/MsgManager";
import { PetSkillIcon } from "../item/PetSkillIcon";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";
import { PetEquipPart } from "./PetEquipPart";
import { Debug } from "../../../../../debug/Debug";
import { RDPetDianhua } from "../../../../redDot/RDList/RDPet";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { SChatData } from "../../../../../net/data/SChatData";

export class PetInfoPanel extends ui.main.PetInfoPanelUI {
    private role: RoleView;
    private equipPart: PetEquipPart;//宠物装备
    private selectVo: PetInfo;
    private item: BaseItem;
    private curNum: number;
    private needNum: number;
    private _curIndex: number = 0;
    private _changePet: boolean = false;
    constructor() {
        super();
    }

    public initComp(): void {
        HtmlUtils.setHtml(this.txt_cost.style, 6, 20, "center", "middle");
        this.mouseThrough = true;
        this.initPart();
        this.initRole();
        this.initList();
        this.initEvent();
    }

    private initPart(): void {
        this.equipPart = new PetEquipPart();
        this.box_hasActive.addChild(this.equipPart);
        this.equipPart.y = 55;
    }

    private initList(): void {
        this.skillList.itemRender = PetSkillIcon;
        this.skillList.array = null;
        this.skillList.selectEnable = true;
        this.skillList.hScrollBarSkin = "";
        this.skillList.selectHandler = Laya.Handler.create(this, this.onSlotChange, null, false);
        this.skillList.mouseHandler = Laya.Handler.create(this, this.onClickSkill, null, false);
    }

    private initRole(): void {
        this.role = new RoleView();
        this.role.info = "";
        this.role.angle = 0;
        this.addChild(this.role);
        this.role.x = 285;
        this.role.y = 420;
    }

    private initEvent(): void {
        RedDotManager.instance.on(RedDotType.RDPetTujian, this, this.updateRed);
        // RedDotManager.instance.on(RedDotType.RDPetDianhua, this, this.updateRed);
        RedDotManager.instance.on(RedDotType.RDPetShouling, this, this.updateRed);

        this.active.on(Laya.Event.CLICK, this, this.onActiveHandler);
        this.fight.on(Laya.Event.CLICK, this, this.onFight);
        this.relive.on(Laya.Event.CLICK, this, this.onRelive);
        this.addPoint.on(Laya.Event.CLICK, this, this.onPoint);
        this.tujianBtn.on(Laya.Event.CLICK, this, this.tujianBtnClick);
        this.dianhuaBtn.on(Laya.Event.CLICK, this, this.dianhuaBtnClick);
        this.shoulingBtn.on(Laya.Event.CLICK, this, this.shoulingBtnClick);
        this.showBtn.on(Laya.Event.CLICK, this, this.showBtnClick);

        SPetData.instance.on(SPetEvent.PET_DIANHUA_SKILL_UP, this, this.updateRed);
    }

    private removeEvent(): void {
        RedDotManager.instance.off(RedDotType.RDPetTujian, this, this.updateRed);
        // RedDotManager.instance.off(RedDotType.RDPetDianhua, this, this.updateRed);
        RedDotManager.instance.off(RedDotType.RDPetShouling, this, this.updateRed);

        this.active.off(Laya.Event.CLICK, this, this.onActiveHandler);
        this.fight.off(Laya.Event.CLICK, this, this.onFight);
        this.addPoint.off(Laya.Event.CLICK, this, this.onPoint);
        this.relive.off(Laya.Event.CLICK, this, this.onRelive);
        this.tujianBtn.off(Laya.Event.CLICK, this, this.tujianBtnClick);
        this.dianhuaBtn.off(Laya.Event.CLICK, this, this.dianhuaBtnClick);
        this.showBtn.off(Laya.Event.CLICK, this, this.showBtnClick);

        SPetData.instance.off(SPetEvent.PET_DIANHUA_SKILL_UP, this, this.updateRed);
    }

    public updatePetInfo(vo: PetInfo): void {
        if (this.selectVo && this.selectVo.vo.no != vo.vo.no) {
            this._changePet = true;
        }
        else {
            this._changePet = false;
        }
        this.selectVo = vo;
        this.updateData();
        this._changePet && this.skillList.tweenTo(0);
    }

    private updateActiveState(): void {
        this.box_hasActive.visible = this.selectVo.active;
        this.box_noActive.visible = !this.selectVo.active;
        if (this.selectVo.active) {
            this.clearActiveItem();
            if (this.selectVo.FeerPoint > 0) {
                this.addPoint.label = `加点(${this.selectVo.FeerPoint})`;
                this.addPoint.filters = [];
                this.addPoint.refreshRed(true);
            }
            else {
                this.addPoint.label = "加点";
                this.addPoint.filters = [new Laya.ColorFilter(ResUtils.colorMatrix)];
                this.addPoint.refreshRed(false);
            }

        }
        else {
            this.showActiveItem();
        }
    }

    public updateInfo(): void {
        if (this.role) {
            this.role.resPath = this.selectVo.vo.body;
            this.role.updateSkin();
            this.role.scaleX = this.role.scaleY = this.selectVo.vo.res_scale_ui;
        }
        if (this.selectVo.active) {
            this.parent && this.parent["updateCombat"](this.selectVo.BattlePower);
            this.txt_level.text = "Lv." + this.selectVo.Lv + " " + this.selectVo.stateName;
        }
        else {
            this.parent && this.parent["updateCombat"](this.selectVo.vo.battle);
            this.txt_level.text = "Lv." + this.selectVo.Lv;
        }
        this.addChild(this.pingfenLb);
        this.pingfenLb.text = "评分:" + this.selectVo.vo.battle;//评分
        this.parent && this.parent["updateCombatPos"](124, this.selectVo.active);
        this.txt_name.text = this.selectVo.vo.name;
    }

    private updateState(): void {
        if (this.selectVo.Position == 1) {
            this.hasFight.visible = true;
        }
        else {
            this.hasFight.visible = false;
        }
        if (this.selectVo.vo.grade == PetGradeType.TYPE_4) {
            this.god.visible = true;
        }
        else {
            this.god.visible = false;
        }

        if (this.selectVo.Order != 0 || this.selectVo.Position == 1) {
            this.fight.label = "休息";
        }
        else {
            this.fight.label = "出战";
        }
    }

    public updateCost(): void {
        if (this.item) {
            this.curNum = SBagData.instance.prop.getItemCountByGoodsNo(this.item.itemData.GoodsNo);
            if (this.curNum >= this.needNum) {
                this.txt_cost.innerHTML = HtmlUtils.addColor(this.curNum + "/" + this.needNum, "#04a30a", 20);
            }
            else {
                this.txt_cost.innerHTML = HtmlUtils.addColor(this.curNum + "/" + this.needNum, "#ff0000", 20);
            }
        }
    }

    private showActiveItem(): void {
        var arr: Array<any> = this.selectVo.activeItems;
        if (arr) {
            if (!this.item) {
                this.item = new BaseItem();
                this.item.setItemStyle(80);
                this.noCast.addChild(this.item);
                this.item.x = 10;
                this.item.y = 0;
            }
            this.item.itemCode = arr[0][0];
            // this.item.showName(this.item.itemData.clientInfo.name,24,"#8e5213");
            this.item.toolTipData = this.item.itemData;
            this.needNum = arr[0][1];
            this.updateCost();
            this.noCast.visible = true;
        }
        else {
            this.clearActiveItem();
            this.noCast.visible = false;
        }
    }

    private clearActiveItem(): void {
        if (this.item) {
            this.item.dispose();
            this.item.removeSelf();
            this.item = null;
        }
    }

    public updateData(): void {
        this.updateInfo();
        this.updateActiveState();
        this.updateState();
        this.updateListData();
        this.updateEquip();
        this.updateRed();
    }

    public updateRed(): void {
        this.tujianBtn.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDPetTujian)._isActiveSave);
        // this.dianhuaBtn.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDPetDianhua)._isActiveSave);
        this.shoulingBtn.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDPetShouling)._isActiveSave);

        var haveDianhua = this.selectVo && RDPetDianhua.checkOnePetDianhua(this.selectVo);
        this.dianhuaBtn.refreshRed(haveDianhua);
    }

    public updateEquip(): void {
        this.equipPart.updateAllEquip(this.selectVo);
    }

    private updateListData(): void {
        this.skillList.array = this.selectVo.skillSlots;
    }

    private onActiveHandler(): void {
        if (this.selectVo.activeType == 6) {
            if (this.needNum > 0) {
                if (this.curNum >= this.needNum) {
                    this.parent.event(SPetEvent.PET_REQURST_ACTIVE, [[this.selectVo.action]]);
                }
                else {
                    MsgManager.instance.showRollTipsMsg("您得材料不足！");
                }
            }
        }
        else if (this.selectVo.activeType == 3) {
            MsgManager.instance.showRollTipsMsg(this.selectVo.action);
        }
        else if (this.selectVo.activeType == 2) {
            Debug.serverLog("激活方法，打开某个界面激活，配置客户端系统id，找做对应模块的负责人~~");
        }
    }

    private onPoint(): void {
        UIManager.instance.openUI(UIID.SYS_PET_ADDPOINT, [this.selectVo]);
    }

    private onRelive(): void {
        UIManager.instance.openUI(UIID.SYS_PET_RELIVE, [this.selectVo]);
    }

    private dianhuaBtnClick(): void {
        UIManager.instance.openUI(UIID.SYS_PET_DIANHUA, [this.selectVo]);
    }

    private shoulingBtnClick(): void {
        UIManager.instance.openUI(UIID.SYS_PET_SHOULING, [this.selectVo]);
    }

    private tujianBtnClick(): void {
        UIManager.instance.openUI(UIID.SYS_PETTUJIANENTER_PANEL);
    }

    private noti: Notice = new Notice();
    private showBtnClick() {
        if (!SChatData.instance.canChat) {
            MsgManager.instance.showRollTipsMsg("世界发言CD中，请稍后再进行该操作");
            return;
        }
        MsgManager.instance.showRollTipsMsg("发送成功");
        var msg: string = "#00fff0" + SRoleData.instance.roleInfo.Name + "#ffffff展示了宠物"
            + "<MsgObj>event," + "showpet:" + this.selectVo.PartnerId + "," + this.selectVo.vo.name + ","
            + HtmlUtils.getColor(this.selectVo.vo.quality) + "</MsgObj>";
        var type: number = ChatChannel.WORLD;
        this.noti.send(NotityData.create(NotityEvents.CHAT_SENDMSG, [msg, type]));
    }

    private onFight(): void {
        if (this.selectVo.Position != 1) {
            if (this.selectVo.Order != 0) {
                this.parent.event(SPetEvent.PET_REQUEST_FIGHTSTATE, [{ id: this.selectVo.PartnerId, state: 100, index: 0 }]);
            }
            else {
                UIManager.instance.openUI(UIID.SYS_PET_FIGHTSETTING, [this.selectVo]);
            }
        }
        else {
            MsgManager.instance.showRollTipsMsg("出战宠不能设置为休息状态");
        }
    }

    private oldItem: any;
    private selectItem: PetSkillIcon;
    private onSlotChange(): void {
        this.selectItem = this.skillList.getCell(this.skillList.selectedIndex) as PetSkillIcon;
        this.oldItem = this.skillList.selectedItem;
        this._curIndex = this.skillList.selectedIndex;
    }

    private onClickSkill(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }

        if (this.selectItem) {
            if (SPetData.instance.curInfo && SPetData.instance.curInfo.active) {
                if (this.selectItem.active && this.selectItem.needLearn) {
                    UIManager.instance.openUI(UIID.SYS_PAR_CHANGE_SKILL);
                }
            }
            else {
                if (this.selectItem.active && this.selectItem.needLearn) {
                    MsgManager.instance.showRollTipsMsg("该宠物暂未激活");
                }
            }
        }
    }

    public removeSelf(): any {
        this._changePet = false;
        this._curIndex = 0;
        this.role.dispose();
        this.role = null;
        this.selectVo = null;
        this.curNum = -1;
        this.needNum = -1;
        this.clearActiveItem();
        this.equipPart && this.equipPart.dispose();
        this.equipPart = null;
        this.removeEvent();
        super.removeSelf();
    }
}