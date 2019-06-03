import { TabBar } from "../../../compent/TabBar";
import { SSkillData, SSkillEvent } from "../../../../skill/SSkillData";
import { SkillItem1 } from "../item/SkillItem1";
import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { SkillProtocol } from "../../../../skill/protocol/SkillProtocol";
import { Skill } from "../../../../skill/Skill";
import { Skill_costVo } from "../../../../../db/sheet/vo/Skill_costVo";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { Delay } from "../../../../../framework/utils/Delay";
import { SkillUtil } from "../../../../skill/SkillUtil";
import { GuildSkill } from "../../../../skill/GuildSkill";
import { ItemData } from "../../../compent/data/ItemData";
import { GuildProtocol } from "../../guild/protocol/GuildProtocol";
import { RedDotType } from "../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { Alert } from "../../../compent/Alert";
import { SoaringVo } from "../../../../../db/sheet/vo/SoaringVo";
import { FeishengSkill } from "../item/FeishengSkill";
import { SBagData } from "../../../../../net/data/SBagData";
import { C15178_1 } from "../../../../../net/pt/pt_15";
import { MsgManager } from "../../../manager/MsgManager";

export class SkillPanel extends ui.main.SkillPanelUI {
    private mItems: Laya.List;
    private mTab: TabBar;
    private cache: Laya.Dictionary = null;
    private protocol: SkillProtocol;
    private guildProtocol: GuildProtocol;
    private selectSkillItem: SkillItem1 = null;
    private mSelectIds: Laya.Dictionary = new Laya.Dictionary();
    private mCurrentItem: SkillItem1;
    private _tabIndex: number;//技能的上方页签
    //飞升技能
    private feishengSkillItems: FeishengSkill[];

    constructor(tabIndex: number = 0) {
        super();
        this._tabIndex = tabIndex || 0;
        this.protocol = new SkillProtocol();
        this.guildProtocol = new GuildProtocol();
        this.initComp();
    }

    private initComp(): void {
        //HtmlUtils.setHtml(this.NameDes.style,3,22,"left","middle");
        HtmlUtils.setHtml(this.CostLabel.style, 3, 20, "left", "middle");
        HtmlUtils.setHtml(this.AttrDes.style, 3, 18, "left", "top");
        this.AttrDes.color = "#8e5213";
        //HtmlUtils.setHtml(this.NextDes.style,3,18,"left","top");
        this.initList();
        this.initEvent();
        this.showRed();
        this.updateFeisheng();
        this.initTab();
        SSkillData.instance.initSkills();//内部有做判断
    }

    private initList(): void {
        if (!this.mItems) {
            this.mItems = new Laya.List();
            this.addChild(this.mItems);
            this.mItems.itemRender = SkillItem1;
            this.mItems.size(438, 250);
            this.mItems.pos(68, 190);
            this.mItems.spaceX = 20;
            this.mItems.spaceY = 5;
            this.mItems.repeatX = 4;
            this.mItems.repeatY = 2;
            this.mItems.vScrollBarSkin = "";
            //this.mItems.hScrollBarSkin = "";
            this.mItems.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
            this.mItems.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
            this.mItems.mouseHandler = new Laya.Handler(this, this.onListMouseHandle);
            this.mItems.renderHandler = new Laya.Handler(this, this.onListRender);
        }
        if (!this.feishengSkillItems) {
            this.feishengSkillItems = [];
            for (let i = 0; i < 3; i++) {
                const element = new FeishengSkill;
                element.x = 140 + i * 75;
                element.y = 10;
                this.feishengBox.addChild(element);
                this.feishengSkillItems.push(element);
            }
        }

    }

    public updateFeisheng(): void {
        if (!this.mTab || this.mTab.select != 0) {
            return;
        }
        //飞升技能，帮派没有
        var leftPoint = SSkillData.instance.feishengLeftPoint;
        this.feishengPointLb.text = "剩余点数:" + leftPoint;
        this.feishengPointLb.color = leftPoint > 0 ? "#00b007" : "#ff0000";
        if (this.mCurrentItem && this.mCurrentItem.dataSource && (this.mCurrentItem.dataSource as Skill).skillType == 1) {
            var cfgs = SoaringVo.getListBySkillId(this.mCurrentItem.dataSource.Id);
            for (let i = 0; i < 3; i++) {
                const element = this.feishengSkillItems[i];
                element.dataSource = [this.mCurrentItem.dataSource, cfgs[i]];
            }

        }
    }

    public update() {
    }

    private showRed(): void {
        this.SkillGroupBtn1.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDRoleBaseSkill)._isActiveSave);
        this.SkillGroupBtn3.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDRoleGuildSkill)._isActiveSave);
    }

    private initTab(): void {
        if (!this.mTab) {
            this.mTab = new TabBar([this.SkillGroupBtn1, this.SkillGroupBtn2, this.SkillGroupBtn3]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
        this.mTab.select = this._tabIndex;
    }

    private onTabChange(index: number, btn: Laya.Button) {
        this.SkillGroupBtn3.visible = SRoleData.instance.info.GuildId > 0;
        if (this.mTab.select == 1) {
            this.protocol.send15179();
        }
        this.showData();
    }

    private onListRender(cell: SkillItem1, index: number) {
        if (!cell)
            return;
        cell.NameLabel.color = "#8e5213";
        if (cell.dataSource != null) {
            cell.isWorking = this.checkEquipIsWork(cell.dataSource.Id);
            cell.updateLock(this.mTab.select != 1);
            //cell.Select.selected = cell.dataSource.CanUse;
            //cell.Btn.off(Laya.Event.CLICK , this , ()=>{this.onSelectSkill(cell);});
            //cell.Btn.on(Laya.Event.CLICK , this , ()=>{this.onSelectSkill(cell);});

        }

    }

    private onListMouseHandle(e: Event, index: number) {
        if (e.type == Laya.Event.CLICK) {
            if (this.selectSkillItem != null)
                this.selectSkillItem.IsSelect(false);
            for (let i = 0; i < this.mItems.cells.length; i++) {
                var cell = this.mItems.cells[i];
                var skill: Skill = cell.dataSource;
                if (skill != null) {
                    if (skill.Id == this.mItems.array[index].Id) {
                        this.mItems.cells[i].IsSelect(true);
                        this.selectSkillItem = this.mItems.cells[i];
                        this._lastIndex = i;
                        this.updateCurrentItem(skill);
                        this.onMoneyChage(this.selectSkillItem.dataSource.cost_type);
                        break;
                    }
                }
            }
        }
    }

    public onSelectSkill(item: SkillItem1) {
        if (item.dataSource != null) {
            if (item.dataSource.Lv <= 0)
                return;
            var skill = this.mSelectIds.get(item.dataSource.Id);
            if (skill != null) {
                this.mSelectIds.remove(item.dataSource.Id);
            }
            else if (this.mSelectIds.values.length < 4) {
                this.mSelectIds.set(item.dataSource.Id, item.dataSource);
            }
        }
    }

    public showData(): void {
        this.feishengBox.visible = this.feishengResetBtn.visible = this.CostImage.visible = this.CostLabel.visible = this.UpgradeBtn.visible
            = this.UpgradeOneKeyBtn.visible = this.equipSkillBtn.visible = false;
        this.tejiSkillTipsLb.text = "";
        if (this.mTab.select == 0) {
            this.feishengBox.visible = true;
            this.CostImage.visible = true;
            this.CostLabel.visible = true;
            this.UpgradeBtn.visible = true;
            this.UpgradeOneKeyBtn.visible = true;
            this.feishengResetBtn.visible = true;
            this.CostImage.x = 98 + 110;
            this.CostLabel.x = 145 + 110;
            this.UpgradeBtn.x = 290;
            this.UpgradeOneKeyBtn.x = 460;
        }
        else if (this.mTab.select == 1) {
            this.equipSkillBtn.visible = true;
            var limitVo = ConstVo.get("STUNT_INTENSIFY_ACTIVE_MAX_NUM").val;
            this.tejiSkillTipsLb.text = `最多可以装备${limitVo}个特技技能`;
        }
        else {
            this.CostImage.visible = true;
            this.CostLabel.visible = true;
            this.UpgradeBtn.visible = true;
            this.UpgradeOneKeyBtn.visible = true;
            this.CostImage.x = 98;
            this.CostLabel.x = 145;
            this.UpgradeBtn.x = 180;
            this.UpgradeOneKeyBtn.x = 400;
        }
        this.onSkillList();
    }
    public initEvent(): void {
        SSkillData.instance.on(SSkillEvent.FEISHENG_SKILL_CHANGE, this, this.updateFeisheng);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_LEVEL, this, this.onLocalPlayerChange);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_MONEY, this, this.onMoneyChage);
        SSkillData.instance.on(SSkillEvent.SKILL_UPGRADE, this, this.onUpgradeList);
        SSkillData.instance.on(SSkillEvent.GUILD_SKILL_UPGRADE, this, this.onUpgradeList);
        SSkillData.instance.on(SSkillEvent.EQUIP_SKILL_CHANGE, this, this.showData);
        this.UpgradeBtn.on(Laya.Event.CLICK, this, this.onUpgradeBtn);
        this.UpgradeOneKeyBtn.on(Laya.Event.CLICK, this, this.onUpgradeOnKeyBtn);
        this.feishengResetBtn.on(Laya.Event.CLICK, this, this.feishengResetBtnClick);
        this.equipSkillBtn.on(Laya.Event.CLICK, this, this.equipSkillBtnClick);

        RedDotManager.instance.on(RedDotType.RDRoleBaseSkill, this, this.showRed);
        RedDotManager.instance.on(RedDotType.RDRoleGuildSkill, this, this.showRed);
    }

    private updateCurrentItem(skill: Skill = null) {
        if (this.selectSkillItem != null) {
            if (this.mCurrentItem == null) {
                this.mCurrentItem = new SkillItem1();
                this.addChild(this.mCurrentItem);
                this.mCurrentItem.pos(56, 474);
                this.mCurrentItem.NameLabel.visible = true;
                this.mCurrentItem.NameLabel.color = "#8e5213";
            }
            this.mCurrentItem.UpGradeBox.visible = this.mTab.select != 1;
            if (skill && skill.sheetData) {
                this.mCurrentItem.dataSource = skill;
                this.equipSkillBtn.label = this.checkEquipIsWork(skill.Id) ? "停用" : "启用";
                var lastSkill: Skill = SSkillData.instance.Skills.get(skill.sheetData.pre_skill_id);
                //this.NameDes.innerHTML = HtmlUtils.addColor(`${this.mCurrentItem.dataSource.sheetData.name} `,"#fae512",20) + skill.GetNeedLastSkillHtmlDes(lastSkill);
                //var nomralDesc = SkillUtil.NomralDesc(skill.SkillCount , skill.sheetData.desc , "#fae512" , 18,"#8e5213") + "<br>" + skill.GetNeedLastSkillHtmlDes(lastSkill , 18);
                //var attrDesc = SkillUtil.SkillScale(skill , 18,"#8e5213");
                var nomralDesc = SkillUtil.NewDesc(skill, "#8e5213", 18, "Red") + /** "<br>" + */ skill.GetNeedLastSkillHtmlDes(lastSkill, 18);
                this.AttrDes.innerHTML = nomralDesc;
                //this.AttrDes.innerHTML =  nomralDesc + "<br>" + attrDesc+"<br>"+SkillUtil.extAttackDesc(skill,"#fae512" , 18,"#8e5213");
                //this.NextDes.innerHTML =  SkillUtil.extAttackDesc(skill,"#fae512" , 18,"#8e5213");
                var NoUpgarde: boolean = !SSkillData.instance.IsCanUpgarde(skill.Id);

                /**
                * 这里有个问题应该是button disabled 后需要等待一段时间在设置变灰 可能是因为鼠标还停留咋button上收到hover切换了state状态所以表现上没灰
                 */
                this.UpgradeBtn.disabled = NoUpgarde;
            } else if (skill && (skill as GuildSkill).sheetDataGS) {
                this.mCurrentItem.dataSource = skill;
                var nomralDesc = SkillUtil.GuildSkillDesc((skill as GuildSkill), "#8e5213", 18, "Red") +  /** "<br>" + */(skill as GuildSkill).GetNextSkillHtmlDes(18);
                this.AttrDes.innerHTML = nomralDesc;

                var canUpgarde: boolean = (skill as GuildSkill).canUpRed;
                this.UpgradeBtn.disabled = !canUpgarde;
            } else if (!skill) {
                this.mCurrentItem.dataSource = null;
                this.AttrDes.innerHTML = "";
                this.UpgradeBtn.disabled = true;
            }
            this.updateFeisheng();

        }
    }

    private onLocalPlayerChange() {
        for (let i = 0; i < this.mItems.cells.length; i++) {
            const cell: SkillItem1 = this.mItems.cells[i];
            if (cell.dataSource != null) {
                var str = `${cell.dataSource.Lv}/${SRoleData.instance.info.Lv * cell.dataSource.canUpgardeLvG}`;
                cell.ItemText = str;
            }
        }
    }

    private onMoneyChage(type: number, skill: Skill = null) {
        if (this.mTab.select == 1) {
            return;
        }
        var data: Skill = skill;
        if (data == null) {
            data = this.selectSkillItem.dataSource;
        }
        if (this.selectSkillItem != null && data != null) {
            if (type == data.cost_type) {
                this.CostImage.skin = ResUtils.getItemIcon(new ItemData(type).clientInfo.icon);
                var money = SRoleData.instance.getMoneyByType(type);
                if (data.isMaxLv) {
                    //this.CostLabel.innerHTML = HtmlUtils.addColor("(已满级)","#8e5213",20);
                    this.CostLabel.innerHTML = "";
                    this.CostImage.visible = false;
                }
                else {
                    var str = ``;
                    if (money < data.cost_value) {

                        str = HtmlUtils.addColor(`${money}/` + `${data.cost_value}`, "#ff0000", 20);
                    }
                    else {
                        str = HtmlUtils.addColor(`${GMath.GetChineseNumber(money)}/` + `${GMath.GetChineseNumber(data.cost_value)}`, "#04a30a", 20);
                    }
                    this.CostLabel.innerHTML = str;
                    this.CostImage.visible = true;
                }
            }
        }
    }

    private onUpgradeList(skill: Skill) {
        if (skill == null)
            return;
        for (let i = 0; i < this.mItems.cells.length; i++) {
            var cell: SkillItem1 = this.mItems.cells[i];
            if (cell.dataSource != null && cell.dataSource.Id == skill.Id) {
                cell.dataSource = skill;
                cell.updateLock(this.mTab.select != 1);
                if (cell.dataSource.Id == this.selectSkillItem.dataSource.Id) {
                    this.updateCurrentItem(skill);
                }
                cell.PlayerLvUpEffect();
                break;
            }
        }
    }

    private onUpgradeBtn() {
        if (this.selectSkillItem == null)
            return;
        if (this.selectSkillItem.dataSource == null)
            return;
        if (this.selectSkillItem.dataSource.isMaxLv)
            return;
        if (this.mTab.select == 0) {
            this.protocol.send21002(this.selectSkillItem.dataSource.Id);
        } else {
            this.guildProtocol.send40059(this.selectSkillItem.dataSource.Id);
        }
    }

    private onUpgradeOnKeyBtn() {
        if (this.mTab.select == 0) {
            this.protocol.send21003();
        } else {
            this.guildProtocol.send40061();
        }
    }

    private feishengResetBtnClick(): void {
        var cost = ConstVo.get("WASH_SOARING_POINT_COST").val;
        var itemData = new ItemData(cost[0]);
        var str: string = HtmlUtils.addColor("消耗", "#8a5428", 20) +
            HtmlUtils.addImage("art/item/" + itemData.clientInfo.icon.replace(".png", ""), 30, 30) +
            HtmlUtils.addColor(cost[1], "#3f8f4f", 20) +
            HtmlUtils.addColor("重置飞升技能消耗点数", "#8a5428", 20);
        Alert.show(str, this, () => {
            this.feishengReset();
        }, null, null, null, true);
    }

    private feishengReset(): void {
        this.protocol.send13122();
    }

    private equipSkillBtnClick(): void {
        if (this.mTab.select != 1 || this.cache.values.length == 0 || this.mCurrentItem.dataSource == null) {
            return;
        }
        var isWording = this.checkEquipIsWork(this.mCurrentItem.dataSource.Id);
        var info = SSkillData.instance.equipSkillInfo;
        var wantList: C15178_1[] = [];
        for (let i = 0; i < info.item_2.length; i++) {
            const element = info.item_2[i];
            var msgData = new C15178_1;
            msgData.SkillNo = element.SkillNo;
            wantList.push(msgData);
        }
        if (isWording) {
            for (let i = 0; i < wantList.length; i++) {
                const element = wantList[i];
                if (element.SkillNo == this.mCurrentItem.dataSource.Id) {
                    wantList.splice(i, 1);
                    break;
                }
            }
        } else {
            var addMsg = new C15178_1;
            addMsg.SkillNo = this.mCurrentItem.dataSource.Id;
            wantList.push(addMsg);
        }
        var limitVo = ConstVo.get("STUNT_INTENSIFY_ACTIVE_MAX_NUM").val;
        if (wantList.length > limitVo) {
            MsgManager.instance.showRollTipsMsg(`最多只能装备${limitVo}个特技技能`);
            return;
        }
        this.protocol.send15178(wantList);
    }

    private _lastIndex:number;
    private _lastTab:number;

    private onSkillList() {
        if (this.mTab.select == 0) {
            this.cache = SSkillData.instance.Skills;
        }
        else if (this.mTab.select == 1) {
            this.cache = this.getEquipSkill();
        }
        else {
            this.cache = SSkillData.instance.GuildSkills;
        }
        if (this.cache.values.length == 0) {
            this.upBgBox.height = 520;
            this.downBgBox.visible = false;
            this.noDataBox.visible = true;
            this.mCurrentItem && (this.mCurrentItem.visible = false);
        } else {
            this.upBgBox.height = 333;
            this.downBgBox.visible = true;
            this.noDataBox.visible = false;
            this.mCurrentItem && (this.mCurrentItem.visible = true);
        }
        if(this._lastTab != this.mTab.select){
            this._lastTab = this.mTab.select;
            this._lastIndex = 0;
        }

        this.mItems.array = this.cache.values;
        var cell = this.mItems.cells[this._lastIndex];
        if (cell) {
            if (this.selectSkillItem != null)
                this.selectSkillItem.IsSelect(false);
            cell.IsSelect(true);
            this.selectSkillItem = cell;
            this.updateCurrentItem(this.cache.values[this._lastIndex]);
            if (this.cache.values[0]) {
                var skill: Skill = this.cache.values[this._lastIndex];
                this.onMoneyChage(skill.cost_type, skill);
            }

        }
        this.updateFeisheng();
    }

    public removeEvent(): void {
        this.mTab.off(Laya.Event.CHANGE, this, this.onTabChange);
        SSkillData.instance.off(SSkillEvent.FEISHENG_SKILL_CHANGE, this, this.updateFeisheng);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_LEVEL, this, this.onLocalPlayerChange);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_MONEY, this, this.onMoneyChage);
        SSkillData.instance.off(SSkillEvent.SKILL_UPGRADE, this, this.onUpgradeList);
        SSkillData.instance.off(SSkillEvent.GUILD_SKILL_UPGRADE, this, this.onUpgradeList);
        SSkillData.instance.off(SSkillEvent.EQUIP_SKILL_CHANGE, this, this.showData);
        this.UpgradeBtn.off(Laya.Event.CLICK, this, this.onUpgradeBtn);
        this.UpgradeOneKeyBtn.off(Laya.Event.CLICK, this, this.onUpgradeOnKeyBtn);
        this.feishengResetBtn.off(Laya.Event.CLICK, this, this.feishengResetBtnClick);
        this.equipSkillBtn.off(Laya.Event.CLICK, this, this.equipSkillBtnClick);

        this.mItems.mouseHandler.clear();
        this.mItems.renderHandler.clear();
        for (let i = 0; i < this.mItems.cells.length; i++) {
            const cell: SkillItem1 = this.mItems.cells[i];
            cell.Btn.off(Laya.Event.CLICK, this, () => { this.onSelectSkill(cell); });
        }

        RedDotManager.instance.on(RedDotType.RDRoleBaseSkill, this, this.showRed);
        RedDotManager.instance.on(RedDotType.RDRoleGuildSkill, this, this.showRed);
    }

    //装备技能----------------------------
    private equipSkillDic: Laya.Dictionary = new Laya.Dictionary;

    private getEquipSkill(): Laya.Dictionary {
        this.equipSkillDic.clear();
        var info = SSkillData.instance.equipSkillInfo;
        if (info) {
            for (let i = 0; i < info.item_1.length; i++) {
                const element = info.item_1[i];
                var skillInfo = new Skill(element.StuntNo);
                this.equipSkillDic.set(element.StuntNo, skillInfo);
            }
        }
        return this.equipSkillDic;
    }

    //查看是否装备了
    private checkEquipIsWork(skillNo: number): boolean {
        if (this.mTab.select != 1) {
            return false;
        }
        var info = SSkillData.instance.equipSkillInfo;
        for (let i = 0; i < info.item_2.length; i++) {
            const element = info.item_2[i];
            if (element.SkillNo == skillNo) {
                return true;
            }
        }
        return false;
    }


    public removeSelf(): any {
        this.removeEvent();
        super.removeSelf();
        //this.removeEvent();
    }
}