import { StrengthEquipPart } from "./StrengthEquipPart";
import { HtmlUtils } from "../../../../../../utils/HtmlUtils";
import { MsgManager } from "../../../../../manager/MsgManager";
import { SForgingData, SForgingEvent } from "../../../../../../../net/data/SForgingData";
import { SRoleData } from "../../../../../../../net/data/SRoleData";
import { BaseItem } from "../../../../../compent/BaseItem";
import { ItemData } from "../../../../../compent/data/ItemData";
import { SBagData } from "../../../../../../../net/data/SBagData";
import { Attribute } from "../../../../../../property/RoleProperty";
import { DataManager } from "../../../../../../../message/manager/DataManager";
import { CommonControl } from "../../../../../../common/control/CommonControl";
import { DisplayUtils } from "../../../../../../utils/DisplayUtils";
import { StrengthInfo } from "../../../../../compent/data/StrengthInfo";
import { GoodsUtils } from "../../../../../../utils/GoodsUtils";
import { Debug } from "../../../../../../../debug/Debug";
import { ConstVo } from "../../../../../../../db/sheet/vo/ConstVo";

export class StrengthPanel extends ui.main.StrengthPanelUI {
    public _isAuto:boolean;
    public equipPart:StrengthEquipPart;
    public propItem:BaseItem;
    public moneyItem:BaseItem;
    public curInfo:any;
    public _txtList:Array<Laya.Text> = [];
    constructor() {
        super();
    }

    public initComp():void
    {
        HtmlUtils.setHtml(this.txt_m0.style,6,20,"left","middle");
        HtmlUtils.setHtml(this.txt_m1.style,6,20,"left","middle");
        
        this.updateBtnLable();
        this.updateGemIcons();
        this.initPart();
        this.initItems();
        this.initEvent();
        this.updateData();
    }

    public updateBtnLable():void
    {
        this.btn_str.label = "一键强化";
    }

    public updateGemIcons():void
    {
        this.gemIcons.visible = false;
    }

    public initPart():void
    {
        this.equipPart = new StrengthEquipPart();
        this.addChild(this.equipPart);
        this.equipPart.x = 60;
        this.equipPart.y = 143;
    }
    
    public initItems():void
    {
        this.propItem = new BaseItem();
        this.propItem._hideBg = true;
        this.propItem.setItemStyle(40);
        this.cost.addChild(this.propItem);
        this.propItem.x = 45;
        this.propItem.y = 80;
        
        this.moneyItem = new BaseItem();
        this.moneyItem._hideBg = true;
        this.moneyItem.setItemStyle(40);
        this.cost.addChild(this.moneyItem);
        this.moneyItem.x = 45;
        this.moneyItem.y = 105;
    }

    public createTxt(x:number, y:number, w:number, h:number, size:number, align:string = "left", valign:string = "middle", color:string = "#ffffff"):Laya.Text
    {
        var txt:Laya.Text = new Laya.Text();
        txt.width = w;
        txt.height = h;
        txt.x = x;
        txt.y = y;
        txt.valign = valign;
        txt.align = align;
        txt.color = color;
        txt.fontSize = size;
        txt.wordWrap = false;
        this.addChild(txt);
        return txt;
    }

    public initEvent():void
    {
        DataManager.listen(PROTOCOL.E15001, this, this.updateBaseProp);
        this.btn_str.on(Laya.Event.CLICK,this,this.onStrength);
    }

    public removeEvent():void
    {
        DataManager.cancel(PROTOCOL.E15001, this, this.updateBaseProp);
        this.btn_str.off(Laya.Event.CLICK,this,this.onStrength);
    }

    public updateData():void
    {
        this.curInfo = SForgingData.instance.curStrengthInfo;
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

    public updateAllEquip():void
    {
        this.equipPart.updateAllEquip();
    }

    public updateCombat():void
    {
        if(this.curEquipItem)
        {
            this.parent["updateCombat"](SRoleData.instance.info.BattlePower);
        }
    }

    public updateBaseProp():void
    {
        this.updateProp();
        this.updateCombat();
    }

    public needPropNum:number;
    public curPropNum:number;
    public curMoney:number;
    public needMoney:number;
    public updateCost():void
    {
        this.curInfo = SForgingData.instance.curStrengthInfo;
        if(!this.curInfo.max)
        {
            this.cost.visible = true;
            this.needPropNum = this.curInfo.needPropNum;
            this.curPropNum = this.curInfo.propNum;
            this.curMoney = this.curInfo.moneyNum;
            this.propItem.itemCode = this.curInfo.needProp;
            this.needMoney = this.curInfo.needMoney;
            this.propItem.toolTipData = this.propItem.itemData;
            this.moneyItem.itemCode = 2;
            if(this.curPropNum >= this.needPropNum)
            {
                this.txt_m0.innerHTML = HtmlUtils.addColor(this.curPropNum.toString() + "/" + this.needPropNum,"#04a30a",18);
            }
            else
            {
                this.txt_m0.innerHTML = HtmlUtils.addColor(this.curPropNum.toString() + "/" + this.needPropNum,"#ff0000",18);
            }
            if(this.curInfo.materials.length > 2)
            {
                this.moneyItem.toolTipData = this.moneyItem.itemData;
                this.moneyItem.visible = this.propItem.visible = this.txt_m0.visible = this.txt_m1.visible= true;
                if(this.curMoney >= this.needMoney)
                {
                    
                    this.txt_m1.innerHTML = HtmlUtils.addColor(GMath.GetChineseNumber(this.curMoney) + "/" + this.needMoney,"#04a30a",18);
                }
                else
                {
                    this.txt_m1.innerHTML = HtmlUtils.addColor(this.curMoney.toString() + "/" + this.needMoney,"#ff0000",18);
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

    public curEquipItem:ItemData;
    public updateProp():void
    {
        //基础属性
        if(this.curEquipItem && this.curInfo)
        {
            var baseArr:Array<Attribute> = this.curEquipItem.getTypeAtrrList(GoodsAttrType.BASIC);
            if(baseArr)
            {
                this.hideTxt();
                for (let index = 0; index < baseArr.length; index++) {
                    var base:Attribute = baseArr[index];
                    var baseNum:number = parseInt(base.FormatValue);
                    var curNum = (this.curInfo as StrengthInfo).addAttrNum(base.atrrName,baseNum);
                    var nextNum = (this.curInfo as StrengthInfo).addAttrNum(base.atrrName,baseNum,true);
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
            this.hideTxt();
        }
    }

    private hideTxt():void
    {
        for (const key in this._txtList) {
            if (this._txtList.hasOwnProperty(key)) {
                var element = this._txtList[key];
                element.visible = false;
            }
        }
    }
    

    protected sendTime:number = 0;//记录强化的时候的
    public onUpdateStrength(pos:number,nextPos:number):void
    {
        // if(bl)
        // {
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
                    Laya.timer.once(actionTime,this,this.onSendRequestLevel);
                }
            }
        // }
        // else
        // {
        //     this.isStarAuto = false;
        // }
        this.equipPart.showUIEffect(pos);
    }

    public onStrength():void
    {
        if(!this.isStarAuto)
        {
            this.isStarAuto = true;
        }
    }
    public stopAuto():void {
        // this.btn_str.label = "一键强化";
        Laya.timer.clear(this ,this.onSendRequestLevel);
    }

    public set isStarAuto(value:boolean)
    {
        if(value)
        {
            if(this._isAuto)
            {
                this._isAuto = false;
                this.stopAuto();
            }
            else
            {
                this._isAuto = true;
                this.startAuto();
            }
        }
        else
        {
            this._isAuto = false;
            this.stopAuto();
        }
    }

    public get isStarAuto():boolean
    {
        return this._isAuto;
    }

    public startAuto():void {
        this.curInfo = SForgingData.instance.curStrengthInfo;
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
                    this.isStarAuto = false;
                    if(this.curPropNum < this.needPropNum)
                    {
                        var needNum =  this.needPropNum - this.curPropNum;
                        GoodsUtils.CheckGotoShopByGoodsNo(this.propItem.itemData.GoodsNo,needNum);
                    }
                    MsgManager.instance.showRollTipsMsg("您的材料不足！");
                    if(SBagData.instance.equip.haveSmellEquip){
                        UIManager.instance.openUI(UIID.SMELL);
                    }
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
        this.curInfo = SForgingData.instance.curStrengthInfo;
        if(!this.curInfo.max)
        {
            if(this.curInfo.needEquipLv <= SRoleData.instance.info.Lv)
            {
                if(this.curInfo.canStrength)
                {
                    Debug.serverLog("当前选择的部位是:+++++++++++++++++++++++++++" + this.curInfo.Slot);
                    this.parent.event(SForgingEvent.FORGING_REQUEST_STRENGTH,[[StrengthType.STRENGTH,this.curInfo.Slot,1,0]]);
                }
                else
                {
                    this.isStarAuto = false;
                    if(this.curPropNum < this.needPropNum)
                    {
                        var needNum =  this.needPropNum - this.curPropNum;
                        GoodsUtils.CheckGotoShopByGoodsNo(this.propItem.itemData.GoodsNo,needNum);
                    }
                    MsgManager.instance.showRollTipsMsg("您的材料不足！");
                    if(SBagData.instance.equip.haveSmellEquip){
                        UIManager.instance.openUI(UIID.SMELL);
                    }
                }
            }
            else
            {
                this.isStarAuto = false;
                if(this.curPropNum < this.needPropNum)
                {
                    var needNum =  this.needPropNum - this.curPropNum;
                    GoodsUtils.CheckGotoShopByGoodsNo(this.curInfo.needs[0].code,needNum);
                }
                MsgManager.instance.showRollTipsMsg("材料不足");
            }
        }
        else
        {
            this.isStarAuto = false;
            MsgManager.instance.showRollTipsMsg("该部位已达到最高等级");
        }
    }

    public removeSelf():any
    {
        this.curInfo = null;
        this._isAuto = false;
        this.equipPart.dispose();
        this.equipPart = null;
        // DisplayUtils.clearArrayItems(this._txtList);
        // this._txtList = [];
        Laya.timer.clear(this ,this.onSendRequestLevel);
        this.removeEvent();
        super.removeSelf();
    }
}