import { StrengthPanel } from "../../Strength/panel/StrengthPanel";
import { MsgManager } from "../../../../../manager/MsgManager";
import { SForgingEvent, SForgingData } from "../../../../../../../net/data/SForgingData";
import { SRoleData } from "../../../../../../../net/data/SRoleData";
import { Attribute } from "../../../../../../property/RoleProperty";
import { HtmlUtils } from "../../../../../../utils/HtmlUtils";
import { CommonControl } from "../../../../../../common/control/CommonControl";
import { SBagData } from "../../../../../../../net/data/SBagData";
import { KaiLingEquipPart } from "./KaiLingEquipPart";
import { RefinePanel } from "../../Refine/panel/RefinePanel";
import { RefineInfo } from "../../../../../compent/data/RefineInfo";
import { KaiLingInfo } from "../../../../../compent/data/KaiLingInfo";
import { GoodsUtils } from "../../../../../../utils/GoodsUtils";
import { Debug } from "../../../../../../../debug/Debug";
import { ConstVo } from "../../../../../../../db/sheet/vo/ConstVo";

export class KaiLingPanel extends StrengthPanel {
    constructor() {
        super();
    }

    public updateBtnLable():void
    {
        this.btn_str.label = "一键启灵";
    }

    public initPart():void
    {
        this.equipPart = new KaiLingEquipPart();
        this.addChild(this.equipPart);
        this.equipPart.x = 60;
        this.equipPart.y = 143;
    }

    public updateData():void
    {
        this.curInfo = SForgingData.instance.curKaiLingInfo;
        this.curEquipItem = SBagData.instance.role.getItemBySlot(this.curInfo.Slot);
        if(this.curEquipItem)
        {
            CommonControl.instance.send15001(this.curEquipItem.serverInfo.GoodsId);
        }
        else
        {
            this.updateBaseProp();
        }
        this.updateCost();
        this.equipPart.updateAllEquip();
        this.equipPart.selectItem(this.curInfo.Slot);
    }

    public updateCost():void
    {
        this.curInfo = SForgingData.instance.curKaiLingInfo;
        if(!this.curInfo.max)
        {
            this.cost.visible = true;
            this.needPropNum = this.curInfo.needPropNum;
            this.curPropNum = this.curInfo.propNum;
            this.curMoney = this.curInfo.moneyNum;
            this.needMoney = this.curInfo.needMoney;
            this.propItem.itemCode = this.curInfo.needProp;
            this.propItem.toolTipData = this.propItem.itemData;
            this.moneyItem.itemCode = 2;
            if (this.curPropNum >= this.needPropNum) {
                this.txt_m0.innerHTML = HtmlUtils.addColor(this.curPropNum.toString() + "/" + this.needPropNum, "#04a30a", 18);
            }
            else {
                this.txt_m0.innerHTML = HtmlUtils.addColor(this.curPropNum.toString() + "/" + this.needPropNum, "#ff0000", 18);
            }
            if(this.curInfo.materials.length > 2)
            {
                this.moneyItem.toolTipData = this.moneyItem.itemData;
                this.moneyItem.visible = this.propItem.visible = this.txt_m0.visible = this.txt_m1.visible= true;
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
        else
        {
            this.cost.visible = false;
        }
    }

    public updateProp():void
    {
        //基础属性
        if(this.curEquipItem && this.curInfo)
        {
            var baseArr:Array<Attribute> = this.curEquipItem.getTypeAtrrList(GoodsAttrType.BASIC);
            if(baseArr)
            {
                for (let index = 0; index < baseArr.length; index++) {
                    var base:Attribute = baseArr[index];
                    var baseNum:number = parseInt(base.FormatValue);
                    var curNum = (this.curInfo as KaiLingInfo).addAttrNum(base.atrrName,baseNum);
                    var nextNum = (this.curInfo as KaiLingInfo).addAttrNum(base.atrrName,baseNum,true);
                    if(!this._txtList[index + "_" + "pre"])
                    {
                        var pre:Laya.Text = this.createTxt(147,339+25*index,127,25,18,"left","middle","#92592d");
                        pre.text = base.name + ":" + curNum;
                        this._txtList[index + "_" + "pre"] = pre;
                        var next:Laya.Text = this.createTxt(313,339+25*index,127,25,18,"left","middle","#de3710");
                        next.text = base.name + ":" + nextNum;
                        this._txtList[index + "_" + "next"] = next;
                    }
                    else
                    {
                        this._txtList[index + "_" + "pre"].visible = true;
                        this._txtList[index + "_" + "next"].visible = true;
                        this._txtList[index + "_" + "pre"].text = base.name + ":" + curNum;
                        this._txtList[index + "_" + "next"].text = base.name + ":" + nextNum;
                    }
                }
            }
        }
        else
        {
            this._txtList.forEach((value,index,arr)=>{
                value.visible = false;
            });
        }
    }

    public onUpdateStrength(pos:number,nextPos:number):void
    {
        this.updateData();
        if(this.isStarAuto)
        {
            if(nextPos == 3)
            {
                //第三个格子的时候，就停下来
                this.isStarAuto = false;
            }
            else
            {
                var delayTime = ConstVo.get("AUTO_STR").val[10][1];
                var backTime = new Date().getTime();
                var subTime = backTime - this.sendTime;
                var actionTime = (delayTime - subTime) <= 0 ? 1 : delayTime - subTime;
                Laya.timer.once(actionTime,this,this.onSendRequestLevel,null,true);
            }
        }
        this.equipPart.showUIEffect(pos);
    }

    public startAuto():void {
        this.curInfo = SForgingData.instance.curKaiLingInfo;
        if(!this.curInfo.max)
        {
            if(this.curInfo.needEquipLv <= SRoleData.instance.info.Lv)
            {
                if(this.curInfo.canStrength)
                {
                    // this.btn_str.label = "停止";
                    this.onSendRequestLevel();
                }
                else
                {
                    if(this.curPropNum < this.needPropNum)
                    {
                        var needNum =  this.needPropNum - this.curPropNum;
                        GoodsUtils.CheckGotoShopByGoodsNo(this.curInfo.needProp,needNum);
                    }
                    this.isStarAuto = false;
                    MsgManager.instance.showRollTipsMsg("您的材料不足！");
                }
            }
            else
            {
                this.isStarAuto = false;
                MsgManager.instance.showRollTipsMsg("您的等级不足！");
            }
        }
    }

    public onSendRequestLevel():void {
        this.sendTime = new Date().getTime();
        this.curInfo = SForgingData.instance.curKaiLingInfo;
        if(!this.curInfo.max)
        {
            if(this.curInfo.needEquipLv <= SRoleData.instance.info.Lv)
            {
                if(this.curInfo.canStrength)
                {
                    Debug.serverLog("当前选择的部位是:+++++++++++++++++++++++++++" + this.curInfo.Slot);
                    this.parent.event(SForgingEvent.FORGING_REQUEST_STRENGTH,[[StrengthType.KAILING,this.curInfo.Slot,1,0]]);
                }
                else
                {
                    if(this.curPropNum < this.needPropNum)
                    {
                        var needNum =  this.needPropNum - this.curPropNum;
                        GoodsUtils.CheckGotoShopByGoodsNo(this.curInfo.needProp,needNum);
                    }
                    this.isStarAuto = false;
                    MsgManager.instance.showRollTipsMsg("您的材料不足！");
                }
            }
            else
            {
                this.isStarAuto = false;
                MsgManager.instance.showRollTipsMsg("您得等级不足！");
            }
        }
        else
        {
            this.isStarAuto = false;
            MsgManager.instance.showRollTipsMsg("该部位已达到最高等级！");
        }
    }

    public removeSelf():any
    {
        super.removeSelf();
    }
}