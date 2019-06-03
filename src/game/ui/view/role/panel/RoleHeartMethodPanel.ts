import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { From_sourceVo } from "../../../../../db/sheet/vo/From_sourceVo";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SBagData } from "../../../../../net/data/SBagData";
import { BaseItem } from "../../../compent/BaseItem";
import { S13048 } from "../../../../../net/pt/pt_13";
import { GoodsVo } from "../../../../../db/sheet/vo/GoodsVo";
import { Heart_cfgVo } from "../../../../../db/sheet/vo/Heart_cfgVo";
import { ProgressBar } from "../../../compent/ProgressBar";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { MsgManager } from "../../../manager/MsgManager";
import { Delay } from "../../../../../framework/utils/Delay";
import { PropertyUtil } from "../../../../property/PropertyUtil";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";

export class AttrItemText extends Laya.Text {
    constructor() {
        super();
        this.width = 190;
        this.height = 23;
        this.align = "left";
        this.valign = "middle";
        this.fontSize = 18;
        this.color = "#bf5005";
        this.overflow = Laya.Text.HIDDEN;
    }
}

export class RoleHeartMethodPanel extends ui.main.RoleHeartMethodPanelUI {
    private heartBtns = [];
    private heartLockBtns = [];
    private attrDataList = [];
    private costInfo:any = {};
    private AutoState = false;
    private Item:BaseItem;
    private bar:ProgressBar;
    private CurrrentClass = 1;
    private MaxLv = 10;
    private HeartName = ["固若金汤","厚积薄发","先天真元","离经易道"
,"太清凝神","天罗诡道","傲血战意","无极神罡"];
    constructor() {
        super();
        this.initComp();
        this.initEvent();
        var currentNo = SRoleData.instance.info.HeartNo;
        var currentExp = SRoleData.instance.info.HeartExp;
        var ismax = Heart_cfgVo.getIsMax(currentNo);
        var next:Heart_cfgVo= Heart_cfgVo.get(currentNo+1);
        if(ismax)
        {
            if(next != null&&next.class != null)
            {
                currentNo = currentNo+1;
            }
        }
        this.CurrrentClass = Heart_cfgVo.getClassByNo(currentNo);
        this.Refresh(currentNo,currentExp);
        this.updateLock(currentNo);
        this.updateBattlePower();
    }

    private initComp():void
    {
        HtmlUtils.setHtml(this.GoodsTxt.style,6,18,"center","middle");
        this.BattleValue.url = "res/atlas/number/fight.atlas";
        for (let i = 0; i < 8; i++) {
            const heartBtn:component.ScaleButton = this.UnlockBox.getChildByName(`UnlockBtn${i}`)as component.ScaleButton;
            const heartLockBtn = this.LockBox.getChildByName(`LockBtn${i}`) ;
            heartBtn.label = this.HeartName[i];
            this.heartBtns.push(heartBtn);
            this.heartLockBtns.push(heartLockBtn);
        }

        if(!this.Item)
        {
            this.Item = new BaseItem();
            this.Item.setItemStyle(60);
            this.upgardeBox.addChild(this.Item);
            this.Item.x = 90;
            this.Item.y = 15;
        }

        var vos:Array<any> = ConstVo.get("GAME_XINFA_GOODS_TO_EXP").val
        if(vos)
        {
            this.costInfo = {goodsId:vos[0] , exp:vos[1]};
            this.Item.itemCode = this.costInfo.goodsId;
            this.Item.toolTipData = this.Item.itemData;
            // this.GoodsTxt.innerHTML = HtmlUtils.addColor(this.Item.itemData.clientInfo.name.toString(),"#8e5213",18);
            this.updateDisplayCost();
        }  
        this.bar = new ProgressBar();
        this.bar.x = 209;
        this.bar.y = 698;
        this.bar.setLabel(1,20,"#ffffff");
        this.bar.setBg(ResUtils.getCompUIUrl("progressBg"),ResUtils.getCompUIUrl("img_greenBar"),320,23);
        this.addChild(this.bar);
        this.bar.setValue(0,10);
        this.attrList.itemRender = AttrItemText;
        this.attrList.vScrollBarSkin ="";
        this.attrList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.attrList.scrollBar.elasticDistance = 20;
    }

    private updateDisplayCost()
    {
        var num = SBagData.instance.prop.getItemCountByGoodsNo(this.costInfo.goodsId);
        if(num > 0)
        {
            this.Item.setAmountLabel("" + num.toString(),"#4e17cd");
        }
        else
        {
            this.Item.setAmountLabel("0","#ff0000");
        }
    }

    public updateBattlePower()
    {
        this.BattleValue.text = `l${SRoleData.instance.info.BattlePower.toString()}`;
    }

    public Refresh(currentNo:number , currentExp:number)
    {
        this.updateDisplayCost();
        var Sheet:Heart_cfgVo = Heart_cfgVo.get(currentNo);
        var nextvo = Heart_cfgVo.get(currentNo+1);
        if(Sheet == null||Sheet.lv == null)
        Sheet = Heart_cfgVo.get(1);
        var curlv:number = Sheet.lv;
        var curNo:number = Sheet.no;
        this.MaxLv = Heart_cfgVo.getClassMax(Sheet.class);
        if(Sheet&&Sheet.lv != this.MaxLv)
        {
            this.upgardeBox.visible = true;
            this.bar.setValue(currentExp , nextvo.exp);
            this.MaxTips.visible = false;
            if(!Sheet||(Sheet&&Sheet.class == undefined))
            {
                this.currentHeartText.text =  `${this.HeartName[0]}Lv.0`;
                this.bar.Text = "激活";
                this.heartBtns[0].visible = true;
                this.heartBtns[0].label = "激活";
                this.heartLockBtns[0].visible = false;
            }
            else
            {
                this.currentHeartText.text =  `${this.HeartName[Sheet.class-1]}Lv.${Sheet.lv}`;
            }
        }
        else
        {
            this.upgardeBox.visible = false;
            this.bar.setValue(1,1);
            this.bar.Text = "已满级";
            this.currentHeartText.text = `${this.HeartName[Sheet.class-1]}Lv.${Sheet.lv}`;
            this.MaxTips.visible = true;
            this.MaxTips.text = `${this.HeartName[Sheet.class-1]}已满级`;
        }
        this.SelectImg.x = this.heartBtns[Sheet.class-1].x;
        this.SelectImg.y = this.heartBtns[Sheet.class-1].y;
        this.refreshAttr(currentNo);
        if(this._lastEffLv >=0 && curlv > this._lastEffLv && curNo >= 0 && curNo == (this._lastEffNo+1)){
            this.showUIEffect();
        }
        this._lastEffLv = curlv;
        this._lastEffNo = curNo;
    }

    private updateLock(currentNo:number)
    {
        var sheet = Heart_cfgVo.get(currentNo);
        var classIndex = 1;
        if(sheet&&sheet.class != undefined)
        classIndex = sheet.class;
        /**直接判断class索引**/
        for (let i = 0; i < this.heartBtns.length; i++) {
            const heartBtn:component.ScaleButton = this.heartBtns[i];
            const heartLockBtn:component.ScaleButton = this.heartLockBtns[i];
            if(i < classIndex)
            {
                heartLockBtn.visible = false;
                heartBtn.visible = true;
                heartBtn.label = this.HeartName[i];
            }
            else
            {
                heartLockBtn.visible = true;
                heartBtn.visible = false;
            }
        }
    }

    private refreshAttr(currentNo:number)
    {

        var attrVo = Heart_cfgVo.get(currentNo);
        //把重复的key先筛选一遍
        this.attrDataList = [];
        if(attrVo&&attrVo.add_attr&&SRoleData.instance.info.HeartNo >= currentNo)
        {
            var attrs = attrVo.add_attr; 
            for (let j = 0; j < attrs.length; j++) {
                const element =  attrs[j];
                var attrKey = element[0];
                this.attrDataList.push({key:attrKey , value1:element[1] , value2:element[2]});
            }
        }
        this.attrList.array = this.attrDataList;
    }

    public async onUpgardata() {
        var currentNo = SRoleData.instance.info.HeartNo;
        var currentExp = SRoleData.instance.info.HeartExp;
        var ismax = Heart_cfgVo.getIsMax(currentNo);
        var next:Heart_cfgVo= Heart_cfgVo.get(currentNo+1);
        if(ismax)
        {
            if(next != null&&next.class != null)
            {
                currentNo = currentNo+1;
            }
        
        }
        var classNo = Heart_cfgVo.getClassByNo(currentNo);
        this.Refresh(currentNo,currentExp);
        this.updateLock(currentNo);
        var nextvo = Heart_cfgVo.get(currentNo+1);
        if(!nextvo||(nextvo&&nextvo.exp == undefined))
        {
            MsgManager.instance.showRollTipsMsg("已满级！");
            this.AutoState = false;
            this.AutoBtn.label = "自动升级";
            return;
        }
        if(nextvo.exp > 0)
        {
            var num = SBagData.instance.prop.getItemCountByGoodsNo(this.costInfo.goodsId);
            if(num == 0)
            {
                MsgManager.instance.showRollTipsMsg("物品不足！");
                this.AutoState = false;
                this.AutoBtn.label = "自动升级";
                return;
            }
        }
        if(this.AutoState)
        {
            //return new Promise((reslove) => {
                var delayTime = ConstVo.get("AUTO_STR").val[1][1];
                await Delay.delay(delayTime);
                if(this.parent)
                this.parent.event(SRoleEvent.ROLE_REQUEST_HEART_UPGRADE);
            //    reslove(true);
            //});
            
        }
    }

    public initEvent():void {
        this.AutoBtn.on(Laya.Event.CLICK,this,this.onClickAutoBtn);
        this.attrList.renderHandler = new Laya.Handler(this, this.onListRender);
        for (let i = 0; i < 8; i++) {
            const heartBtn = this.heartBtns[i];
            const heartLockBtn = this.heartLockBtns[i];
            heartBtn.on(Laya.Event.CLICK,this,this.onClickUnlockBtn,[i+1]);
            heartLockBtn.on(Laya.Event.CLICK,this,this.onClickLockBtn,[i+1]);
        }
    }

    private onListRender(cell: Laya.Text, index: number): void {
        var attr = this.attrDataList[index];
        var vo = PropertyVo.getByInfo(attr.key);
        if(vo)
        {
            var str1 = "";
            var str2 = "";
            if(attr.value1 > 0)
            {
                var descValue = PropertyUtil.GetPropertyDec(vo.no , attr.value1);
                str1 = ` + ${descValue}`;
            }
            if(attr.value2 > 0)
            {
                str2 = ` + ${(attr.value2*100).toFixed(2)}%`;
            }
            var formate = ""
            if(index != this.attrList.array.length-1)
            {
                formate = "\n";
            }
            cell.text = vo.name +str1+str2+formate;
        }
        else
        {
            cell.text = "未知属性";
        }
    }

    public removeEvent():void {
        for (let i = 0; i < 8; i++) {
            const heartBtn = this.heartBtns[i];
            const heartLockBtn = this.heartLockBtns[i];
            heartBtn.off(Laya.Event.CLICK,this,this.onClickUnlockBtn,[i]);
            heartLockBtn.off(Laya.Event.CLICK,this,this.onClickLockBtn,[i]);
        }
        this.AutoBtn.off(Laya.Event.CLICK,this,this.onClickAutoBtn);
        this.attrList.renderHandler = null;
    }

    public onClickAutoBtn()
    {
        if(!this.AutoState)
        {
            var currentNo = SRoleData.instance.info.HeartNo;
            var nextvo = Heart_cfgVo.get(currentNo+1);
            if(!nextvo||(nextvo&&nextvo.exp == undefined))
            {
                MsgManager.instance.showRollTipsMsg("已满级！");
                return;
            }
            if(nextvo.exp > 0)
            {
                var num = SBagData.instance.prop.getItemCountByGoodsNo(this.costInfo.goodsId);
                if(num == 0)
                {
                    GoodsUtils.CheckGotoShopByGoodsNo(this.costInfo.goodsId,1);
                    MsgManager.instance.showRollTipsMsg("物品不足！");
                    return;
                }
            }
            this.AutoState = true;
            this.AutoBtn.label = "停止升级";
            if(this.parent)
            this.parent.event(SRoleEvent.ROLE_REQUEST_HEART_UPGRADE);
        }
        else
        {
            this.AutoState = false;
            this.AutoBtn.label = "自动升级";
        }
        
        
    }

    public onClickLockBtn(index:number):void {
        //if(!this.Sheet)
        //return;

    }

    public  onClickUnlockBtn(index:number):void {
        this.CurrrentClass = index;
        this.MaxLv = Heart_cfgVo.getClassMax(index);
        var no = SRoleData.instance.info.HeartNo;
        var exp = SRoleData.instance.info.HeartExp;
        if(SRoleData.instance.info.HeartNo >= index*this.MaxLv)
        {
            no = index*this.MaxLv
        }
        else
        {
            if(index*this.MaxLv -SRoleData.instance.info.HeartNo == this.MaxLv)
            no += 1;
        }
        this.Refresh(no,exp);
    }

    //之前的等级
    private _lastEffLv:number = -1;
    private _lastEffNo:number = -1;
    //特效
    private _uiEffLayer: UIeffectLayer;
    //进入战斗场景的时候播特效
    public showUIEffect(): void {
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.addChild(this._uiEffLayer);
        }
        var eff = this._uiEffLayer.playEffect("ui_effect_20", 370, 710, false);
        eff.scaleX = 0.8;
    }

    public removeSelf():any
    {
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        this._lastEffLv = -1;
        this._lastEffNo = -1;
        this.AutoState = false;
        this.removeEvent();
        super.removeSelf();
    }
}