import { ComateInfo } from "../data/ComateInfo";
import { FightComateView } from "../../../../battle/role/fight/FightComateView";
import { SComateData, SComateEvent } from "../data/SComateData";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { Skill } from "../../../../skill/Skill";
import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";
import { CustomizeTexture } from "../../../../battle/scene/comp/CustomizeTexture";
import { MsgManager } from "../../../manager/MsgManager";
import { PetSkillItem } from "../../pet/item/PetSkillItem";
import { BaseItem } from "../../../compent/BaseItem";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { From_sourceVo } from "../../../../../db/sheet/vo/From_sourceVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { GoodsVo } from "../../../../../db/sheet/vo/GoodsVo";
import { CommonControl } from "../../../../common/control/CommonControl";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { FucManager } from "../../../manager/FucManager";
import { ComateSkillItem } from "./ComateSkillItem";
import { RedDotType } from "../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { ComateEquipPart } from "./ComateEquipPart";
import { RDComateYuanshen, RDComateMingge } from "../../../../redDot/RDList/RDComate";
import { SChatData } from "../../../../../net/data/SChatData";

export class ComateInfoPanel extends ui.main.ComateInfoPanelUI {
    constructor() {
        super();
        this.sameLevelEliminate = false;
        this.isShowEffect = false;
        this.mResouce = [

            { url: "res/atlas/pet.atlas", type: Laya.Loader.ATLAS },
        ];
    }
    private FightComateObj: FightComateView;
    private equipPart: ComateEquipPart;//宠物装备
    private starSImage = [];
    private skillSprites = [];
    private Item: BaseItem;
    private readonly MaxLineRoleCount = 3;

    public initComp() {
        super.initComp();
        this.BattleText.url = "res/atlas/number/fight.atlas";
        for (let i = 0; i < this.Stars._childs.length; i++) {
            const element = this.Stars.getChildByName(`star${i}`);
            this.starSImage.push(element);
        }
        if (!this.Item) {
            this.Item = new BaseItem();
            this.Item.setItemStyle(80);
            this.ActiveBox.addChild(this.Item);
            this.Item.x = 372;
            this.Item.y = 40;
        }
        HtmlUtils.setHtml(this.CountText.style, 6, 20, "center", "middle");
        // this.GetText.underline = true;
        for (let i = 0; i < 3; i++) {
            var item: ComateSkillItem = new ComateSkillItem();
            item.setItemStyle(80);
            this.SkillsBox.addChild(item);
            var x = i * 116 + 1;
            var y = 1;
            item.x = x;
            item.y = y;
            this.skillSprites.push(item);
        }
    }

    private initPart(): void {
        if (!this.equipPart) {
            this.equipPart = new ComateEquipPart();
            this.hadActiveBox.addChild(this.equipPart);
            this.equipPart.x = -130;
            this.equipPart.y = -215;
        }
    }


    public open(...args): void {
        super.open();
        this.initPart();
        this.CreateComateView();
        this.SelectUpdate();
    }

    private CreateComateView() {
        this.FightComateObj = Laya.Pool.getItemByClass("FightComateView", FightComateView);
        this.FightComateObj.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.FightComateObj.x = 287;
        this.FightComateObj.y = 435;
        this.addChild(this.FightComateObj);
    }

    public SelectUpdate() {
        this.updateBattle();
        this.updateStar();
        this.updateFightComate();
        this.updateSetState();
        this.updateName();
        this.updateSkill();
        this.updateRed();
        this.updateEquip();
    }

    public updateEquip(): void {
        this.equipPart.updateAllEquip(SComateData.instance.CurrentComate);
    }

    public updateRed(): void {
        this.yuanfenBtn.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDComateYuanfen)._isActiveSave);
        this.tupoBtn.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDComateTupo)._isActiveSave);

        var haveYuanshen = SComateData.instance.CurrentComate && RDComateYuanshen.checkOnePetDianhua(SComateData.instance.CurrentComate);
        this.yuanshenBtn.refreshRed(haveYuanshen);
        var haveMingge = SComateData.instance.CurrentComate && RDComateMingge.checkOneMingge(SComateData.instance.CurrentComate);
        this.minggeBtn.refreshRed(haveMingge);
    }

    public updateSkill() {
        if (SComateData.instance.CurrentComate == null || this.skillSprites.length == 0)
            return;
        for (let i = 0; i < 3; i++) {
            var item: ComateSkillItem = this.skillSprites[i];
            item.curComateInfo = SComateData.instance.CurrentComate;
            item.skillIndex = i;
        }
    }

    public updateName() {
        if (SComateData.instance.CurrentComate == null || this.NameText == null)
            return;
        var nowLv = SComateData.instance.CurrentComate.getBaseAttributeValue(PropertyEnumCode.OI_CODE_lv) || 0;
        this.NameText.text = SComateData.instance.CurrentComate.Sheet.name + (nowLv > 0 ? (" Lv." + nowLv) : "");
    }

    private updateActiveCost() {
        if (!this.ActiveBox.visible) return;
        var costData = SComateData.instance.CurrentComate.Sheet.unlock_condition[0];
        if (costData[1] == null) return;
        var goodsId = costData[0];
        var goodsNum = costData[1];
        this.Item.itemCode = goodsId;
        this.Item.toolTipData = this.Item.itemData;
        // this.GoodsNameText.text = this.Item.itemData.clientInfo.name.toString();
        var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
        var color = "#ff0000";
        if (num >= goodsNum)
            color = "#04a30a";
        this.CountText.innerHTML = HtmlUtils.addColor(num.toString() + `/${goodsNum}`, color, 20);
        this.GetBtn.refreshRed(num >= goodsNum);
    }

    public updateSetState() {
        if (SComateData.instance.CurrentComate == null)
            return;
        this.ActiveBox.visible = !SComateData.instance.CurrentComate.IsHave;
        this.hadActiveBox.visible = SComateData.instance.CurrentComate.IsHave;
        this.updateActiveCost();
    }

    public updateFightComate() {
        if (SComateData.instance.CurrentComate == null || this.FightComateObj == null)
            return;
        if (this.FightComateObj.info == null) {
            this.FightComateObj.info = {};
        }
        this.FightComateObj.info.ParentPartnerNo = SComateData.instance.CurrentComate.No;
        this.FightComateObj.updateSkin();
        this.FightComateObj.scaleX = this.FightComateObj.scaleY = 1;
    }

    public updateStar() {
        if (SComateData.instance.CurrentComate == null || this.starSImage.length == 0)
            return;
        this.Stars.width = SComateData.instance.CurrentComate.StarLv * 21;
        for (let i = 0; i < this.starSImage.length; i++) {
            const star = this.starSImage[i];
            if (SComateData.instance.CurrentComate == null) {
                star.visible = false;
            }
            else {
                if (SComateData.instance.CurrentComate.StarLv > i)
                    star.visible = true;
                else
                    star.visible = false;
            }
        }
        this.Stars.refresh();
    }

    public updateBattle() {
        if (SComateData.instance.CurrentComate == null || this.BattleText == null)
            return;

        this.sp_combat.visible = SComateData.instance.CurrentComate.IsHave;
        this.addChild(this.pingfenLb);
        this.pingfenLb.text = "评分:" + SComateData.instance.CurrentComate.Sheet.battle.toString();
        var bat = SComateData.instance.CurrentComate.BaseAttribute.get(PropertyEnumCode.OI_CODE_BATTLE_POWER);
        if (bat != null && bat != 0)
            this.BattleText.text = bat.toString();
        else
            this.BattleText.text = SComateData.instance.CurrentComate.Sheet.battle.toString();
    }

    public update(): void {

    }

    public initEvent(): void {
        this.SetPosBtn.on(Laya.Event.CLICK, this, this.onSetPosBtnClick);
        this.GetBtn.on(Laya.Event.CLICK, this, this.onClickActiveBtn);
        this.AttrBtn.on(Laya.Event.CLICK, this, this.OpenComateAttr);
        this.yuanfenBtn.on(Laya.Event.CLICK, this, this.yuanfenBtnClick);
        this.tupoBtn.on(Laya.Event.CLICK, this, this.tupoBtnClick);
        this.yuanshenBtn.on(Laya.Event.CLICK, this, this.yuanshenBtnClick);
        this.relive.on(Laya.Event.CLICK, this, this.reliveClick);
        this.minggeBtn.on(Laya.Event.CLICK, this, this.minggeBtnClick);
        this.showBtn.on(Laya.Event.CLICK, this, this.showBtnClick);
        // this.GetText.on(Laya.Event.CLICK , this , this.onGetText);

        SComateData.instance.on(SComateEvent.COMATE_ATTR_UPDATE, this, this.SelectUpdate);
        SComateData.instance.on(SComateEvent.COMATE_EQUIP_REFRESH, this, this.SelectUpdate);
        RedDotManager.instance.on(RedDotType.RDComateYuanfen, this, this.updateRed);
        RedDotManager.instance.on(RedDotType.RDComateTupo, this, this.updateRed);
        RedDotManager.instance.on(RedDotType.RDComateYuanshen, this, this.updateRed);
        RedDotManager.instance.on(RedDotType.RDComateMingge, this, this.updateRed);
    }

    public removeEvent(): void {
        this.SetPosBtn.off(Laya.Event.CLICK, this, this.onSetPosBtnClick);
        this.GetBtn.off(Laya.Event.CLICK, this, this.onClickActiveBtn);
        this.AttrBtn.off(Laya.Event.CLICK, this, this.OpenComateAttr);
        this.yuanfenBtn.off(Laya.Event.CLICK, this, this.yuanfenBtnClick);
        this.tupoBtn.off(Laya.Event.CLICK, this, this.tupoBtnClick);
        this.yuanshenBtn.off(Laya.Event.CLICK, this, this.yuanshenBtnClick);
        this.relive.off(Laya.Event.CLICK, this, this.reliveClick);
        this.minggeBtn.off(Laya.Event.CLICK, this, this.minggeBtnClick);
        this.showBtn.off(Laya.Event.CLICK, this, this.showBtnClick);
        // this.GetText.off(Laya.Event.CLICK , this , this.onGetText);

        SComateData.instance.off(SComateEvent.COMATE_ATTR_UPDATE, this, this.SelectUpdate);
        SComateData.instance.off(SComateEvent.COMATE_EQUIP_REFRESH, this, this.SelectUpdate);
        RedDotManager.instance.off(RedDotType.RDComateYuanfen, this, this.updateRed);
        RedDotManager.instance.off(RedDotType.RDComateTupo, this, this.updateRed);
        RedDotManager.instance.off(RedDotType.RDComateYuanshen, this, this.updateRed);
        RedDotManager.instance.off(RedDotType.RDComateMingge, this, this.updateRed);
    }

    private onGetText(): void {
        if (this.Item.itemData == null)
            return;
        var goodsVo = GoodsVo.get(this.Item.itemData.GoodsNo);
        if (!goodsVo)
            return;
        var vo = From_sourceVo.get(goodsVo.from_source);
        if (vo && vo.actionType == 2) {
            UIManager.instance.closeUI(UIID.SYS_COMATE);
            UIManager.instance.closeUI(UIID.SYS_COMATE_INFO);
            FucManager.doCfgAction(vo.action);
        }
    }

    private onClickActiveBtn(): void {
        if (SComateData.instance.CurrentComate == null)
            return;
        var costData = SComateData.instance.CurrentComate.Sheet.unlock_condition[0];
        if (costData[1] == null) return;
        var goodsId = costData[0];
        var goodsNum = costData[1];
        this.Item.itemCode = goodsId;
        this.Item.toolTipData = this.Item.itemData;
        // this.GoodsNameText.text = this.Item.itemData.clientInfo.name.toString();
        var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
        if (num < goodsNum) {
            MsgManager.instance.showRollTipsMsg("物品不足！");
            return;
        }
        SComateData.instance.protocol.send37001(SComateData.instance.CurrentComate.No);
        //CommonControl.instance.send32010(goodsId);
    }

    private OpenComateAttr(): void {
        if (SComateData.instance.CurrentComate == null)
            return;
        if (!SComateData.instance.CurrentComate.IsHave) {
            MsgManager.instance.showRollTipsMsg("未激活！");
            return;
        }
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [SComateData.instance.CurrentComate]);
    }

    private onSetPosBtnClick(): void {
        if (SComateData.instance.CurrentComate == null)
            return;
        if (SComateData.instance.CurrentComate.IsSet) {
            SComateData.instance.CurrentLine.remove(SComateData.instance.CurrentComate.Pos);
            this.event(SComateEvent.COMATE_REQUEST_LINE);
        }
        else {
            if (SComateData.instance.CurrentLine.values.length == this.MaxLineRoleCount) {
                MsgManager.instance.showRollTipsMsg("上阵伙伴已达上限！");
                return;
            }
            var pos = SComateData.instance.getCanSetPos();
            if (pos == 0)
                return;
            var needLv = 1;
            var vos: Array<any> = ConstVo.get("GAME_COMRADE_POS_OPEN_BY_LV").val
            for (let i = 0; i < vos.length; i++) {
                const element = vos[i];
                if (element[0] == pos) {
                    needLv = element[1];
                    break;
                }
            }
            if (needLv > SRoleData.instance.info.Lv) {
                MsgManager.instance.showRollTipsMsg(`需要${needLv}才能上阵！`);
                return;
            }
            this.event(SComateEvent.COMATE_REQUEST_LINE, [SComateData.instance.CurrentComate.No, pos]);
        }
    }

    private yuanfenBtnClick(): void {
        UIManager.instance.openUI(UIID.COMATE_YUANFEN_PANEL, [SComateData.instance.CurrentComate]);
    }

    private tupoBtnClick(): void {
        UIManager.instance.openUI(UIID.COMATE_TUPO_PANEL, [SComateData.instance.CurrentComate]);
    }

    private yuanshenBtnClick(): void {
        UIManager.instance.openUI(UIID.COMATE_YUANSHEN_PANEL, [SComateData.instance.CurrentComate]);
    }

    public reliveClick(): void {
        UIManager.instance.openUI(UIID.COMATE_RELIVE, [SComateData.instance.CurrentComate]);
    }

    public minggeBtnClick(): void {
        UIManager.instance.openUI(UIID.COMATE_MINGGE_PANEL, [SComateData.instance.CurrentComate]);
    }

    private noti: Notice = new Notice();
    private showBtnClick() {
        if (!SChatData.instance.canChat) {
            MsgManager.instance.showRollTipsMsg("世界发言CD中，请稍后再进行该操作");
            return;
        }
        MsgManager.instance.showRollTipsMsg("发送成功");
        var msg: string = "#00fff0" + SRoleData.instance.roleInfo.Name + "#ffffff展示了伙伴"
            + "<MsgObj>event," + "showcomate:" + SComateData.instance.CurrentComate.Id + "," + SComateData.instance.CurrentComate.Sheet.name + ","
            + HtmlUtils.getColor(SComateData.instance.CurrentComate.Sheet.quality) + "</MsgObj>";
        var type: number = ChatChannel.WORLD;
        this.noti.send(NotityData.create(NotityEvents.CHAT_SENDMSG, [msg, type]));
    }

    public close(): void {
        if (this.FightComateObj) {
            this.FightComateObj.dispose();
            this.FightComateObj = null;
        }
        this.equipPart && this.equipPart.dispose();
        this.equipPart = null;
        super.close();
    }

}