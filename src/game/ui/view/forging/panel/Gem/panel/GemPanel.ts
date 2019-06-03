import { StrengthPanel } from "../../Strength/panel/StrengthPanel";
import { MsgManager } from "../../../../../manager/MsgManager";
import { SForgingEvent, SForgingData } from "../../../../../../../net/data/SForgingData";
import { SRoleData } from "../../../../../../../net/data/SRoleData";
import { Attribute } from "../../../../../../property/RoleProperty";
import { HtmlUtils } from "../../../../../../utils/HtmlUtils";
import { CommonControl } from "../../../../../../common/control/CommonControl";
import { SBagData } from "../../../../../../../net/data/SBagData";
import { GemEquipPart } from "./GemEquipPart";
import { GoodsUtils } from "../../../../../../utils/GoodsUtils";
import { Debug } from "../../../../../../../debug/Debug";
import { ConstVo } from "../../../../../../../db/sheet/vo/ConstVo";

export class GemPanel extends StrengthPanel {
    constructor() {
        super();
    }

    public updateBtnLable(): void {
        this.btn_str.label = "一键镶嵌";
        this.arrow.visible = false;
        this.isStarAuto = false;
    }

    public updateGemIcons(): void {
        this.gemIcons.visible = true;
    }

    public initPart(): void {
        this.equipPart = new GemEquipPart();
        this.addChild(this.equipPart);
        this.equipPart.x = 60;
        this.equipPart.y = 143;
    }

    public updateData(): void {
        this.curInfo = SForgingData.instance.curGemInfo;
        this.curEquipItem = SBagData.instance.role.getItemBySlot(this.curInfo.Slot);
        if (this.curEquipItem) {
            CommonControl.instance.send15001(this.curEquipItem.serverInfo.GoodsId);
        }
        else {
            this.updateBaseProp();
        }
        this.updateCost();
        this.equipPart.updateAllEquip();
        this.equipPart.selectItem(this.curInfo.Slot);
    }

    public updateCost(): void {
        this.curInfo = SForgingData.instance.curGemInfo;
        if (!this.curInfo.max) {
            this.cost.visible = true;
            this.curPropNum = this.curInfo.needs[0].hasNum;
            this.needPropNum = this.curInfo.needs[0].needNum;
            this.propItem.itemCode = this.curInfo.needs[0].code;
            this.propItem.toolTipData = this.propItem.itemData;
            if (this.curPropNum >= this.needPropNum) {
                this.txt_m0.innerHTML = HtmlUtils.addColor(this.curPropNum.toString() + "/" + this.needPropNum, "#04a30a", 18);
            }
            else {
                this.txt_m0.innerHTML = HtmlUtils.addColor(this.curPropNum.toString() + "/" + this.needPropNum, "#ff0000", 18);
            }
            if (this.curInfo.needs.length > 2) {
                this.moneyItem.itemCode = this.curInfo.needs[1].code;
                this.moneyItem.toolTipData = this.moneyItem.itemData;
                this.moneyItem.visible = this.propItem.visible = this.txt_m0.visible = this.txt_m1.visible = true;
                this.curMoney = this.curInfo.needs[1].hasNum;
                this.needMoney = this.curInfo.needs[1].needNum;
                if (this.curMoney >= this.needMoney) {
                    this.txt_m1.innerHTML = HtmlUtils.addColor(GMath.GetChineseNumber(this.curMoney) + "/" + this.needMoney, "#04a30a", 18);
                }
                else {
                    this.txt_m1.innerHTML = HtmlUtils.addColor(this.curMoney.toString() + "/" + this.needMoney, "#ff0000", 18);
                }
                this.propItem.y = 80;
                this.txt_m0.y = 90;
            }
            else
            {
                this.propItem.y = 90;
                this.txt_m0.y = 100;
                this.propItem.visible = this.txt_m0.visible = true;
                this.moneyItem.visible = this.txt_m1.visible= false;
            }
        }
        else {
            this.cost.visible = false;
        }
    }

    public updateProp(): void {
        var baseArr: Array<Attribute> = this.curInfo.getTypeAtrrList();
        //基础属性
        if (baseArr) {
            for (let index = 0; index < baseArr.length; index++) {
                var base: Attribute = baseArr[index];
                (this["gem_" + index] as Laya.Image).skin = ResUtils.getGemImage(base.atrrName);
                if (!this._txtList[index]) {
                    var pre: Laya.Text = this.createTxt(190, 317 + 28 * index, 235, 25, 18, "left", "middle", "#088d3d");
                    if (base.value > 0) {
                        pre.color = "#088d3d";
                        pre.text = this.curInfo.nameList[index] + "  " + base.name + ":" + base.FormatValue;
                    }
                    else {
                        pre.color = "#727772";
                        pre.text = this.curInfo.nameList[index] + "  " + "未镶嵌";
                    }
                    this._txtList[index] = pre;
                }
                else {
                    if (base.value > 0) {
                        this._txtList[index].color = "#088d3d";
                        this._txtList[index].text = this.curInfo.nameList[index] + "  " + base.name + ":" + base.FormatValue;
                    }
                    else {
                        this._txtList[index].color = "#727772";
                        this._txtList[index].text = this.curInfo.nameList[index] + "  " + "未镶嵌";
                    }
                }
            }
        }
    }

    //自动强化的相关内容==================================
    private _autoStrength:boolean = false;
    // private _loopTime = 300

    public onUpdateStrength(pos: number, nextPos: number): void {
        this.updateData();
        this.equipPart.showUIEffect(pos);
        if(this._autoStrength){
            this._autoStrength = false;
            var delayTime = ConstVo.get("AUTO_STR").val[10][1];
            var backTime = new Date().getTime();
            var subTime = backTime - this.sendTime;
            var actionTime = (delayTime - subTime) <= 0 ? 1 : delayTime - subTime;
            this.timer.once(actionTime,this,this.onSendRequestLevel);
        }
    }

    public onStrength(): void {
        this.onSendRequestLevel();
    }

    public onSendRequestLevel(): void {
        this.sendTime = new Date().getTime();
        this.curInfo = SForgingData.instance.curGemInfo;
        if (!this.curInfo.max) {
            if (this.curInfo.needEquipLv <= SRoleData.instance.info.Lv) {
                if (this.curInfo.canInlay) {
                    Debug.serverLog("当前选择的部位是:+++++++++++++++++++++++++++" + this.curInfo.Slot);
                    if(this.curInfo.Slot != EquipSubType.EQ_POS2){
                        this._autoStrength = true;
                    }
                    this.parent.event(SForgingEvent.FORGING_REQUEST_INLAY, [[this.curInfo.Slot]]);
                }
                else {
                    if(this.curPropNum < this.needPropNum)
                    {
                        var needNum =  this.needPropNum - this.curPropNum;
                        GoodsUtils.CheckGotoShopByGoodsNo(this.curInfo.needs[0].code,needNum);
                    }
                    MsgManager.instance.showRollTipsMsg("您的材料不足！");
                }
            }
            else {
                MsgManager.instance.showRollTipsMsg("等级不足！");
            }
        }
        else {
            MsgManager.instance.showRollTipsMsg("该部位宝石已达到最高等级");
        }
    }

    public removeSelf(): any {
        super.removeSelf();
    }
}