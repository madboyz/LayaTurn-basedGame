import { SComateData, SComateEvent } from "../data/SComateData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { Comate_talentVo } from "../../../../../db/sheet/vo/Comate_talentVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { MsgManager } from "../../../manager/MsgManager";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
export enum ExchangeDisabledBtnState
{
    None = 0,
    NoGoods,
    IsMax,
}

export class ComateChangeTalentPanel extends ui.main.ComateChangeTalentPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.sameLevelEliminate = false;
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    private CostItem1:BaseItem;
    private CostItem2:BaseItem;
    private OneState:ExchangeDisabledBtnState = ExchangeDisabledBtnState.None;
    private TenState:ExchangeDisabledBtnState = ExchangeDisabledBtnState.None;
    private BagNum:number = 0;
    private NeedNum:number = 0;//兑换1点还需要多少物品
    
    public initComp() {
        super.initComp();
        this.CostItem1 = new BaseItem();
        this.CostItem1._hideBg = true;
        this.CostItem1.setItemStyle(45);
        this.addChild(this.CostItem1);
        this.CostItem1.x = 104;
        this.CostItem1.y = 509;
        
        this.CostItem2 = new BaseItem();
        this.CostItem2._hideBg = true;
        this.CostItem2.setItemStyle(45);
        this.addChild(this.CostItem2);
        this.CostItem2.x = 306;
        this.CostItem2.y = 509;

        HtmlUtils.setHtml(this.OneText.style,6,20,"left","middle");
        HtmlUtils.setHtml(this.TenText.style,6,20,"left","middle");
    }

    public open(...args): void {
        this.initWindow(true,true ,"兑换天赋点", 505 , 420,185);
        super.open();
        this.updateTalentPoint();
    }

    public update():void
    {
        
    }

    public initEvent():void 
    {
        this.OneBtn.on(Laya.Event.CLICK , this , this.OnClickExchangeBtn , [1]);
        this.TenBtn.on(Laya.Event.CLICK , this , this.OnClickExchangeBtn , [10]);
    }

    public removeEvent():void
    {
        this.OneBtn.off(Laya.Event.CLICK , this , this.OnClickExchangeBtn);
        this.TenBtn.off(Laya.Event.CLICK , this , this.OnClickExchangeBtn);
    }

    public updateTalentPoint()
    {
        if(SComateData.instance.CurrentComate == null||this.TalentPointText == null)
        return;
        this.TalentPointText.text =  SComateData.instance.CurrentComate.TalentPoint.toString();
       
        var goodsIDVO:Comate_talentVo = Comate_talentVo.get(1);
        if(goodsIDVO == null)
        return;
        this.CostItem1.itemCode = goodsIDVO.price_type;
        this.CostItem1.toolTipData = this.CostItem1.itemData;
        this.CostItem2.itemCode = goodsIDVO.price_type;
        this.CostItem2.toolTipData = this.CostItem2.itemData;
        this.BagNum = SBagData.instance.prop.getItemCountByGoodsNo(goodsIDVO.price_type);
        this.updateCost(1 , this.OneText);
        this.updateCost(10 , this.TenText)
    }

    public updateCost(piont = 1 , text:laya.html.dom.HTMLDivElement)
    {
        if(SComateData.instance.CurrentComate == null||this.OneText == null)
        return;
        var totalPoint = SComateData.instance.CurrentComate.UsePoint + SComateData.instance.CurrentComate.TalentPoint;
        var nextPoint = totalPoint +piont;
        var costValue:number = 0;
        var isMax = false;
        for (let i = totalPoint+1; i <= nextPoint; i++) {
            var vo:Comate_talentVo = Comate_talentVo.get(i);
            if(vo == null||(vo&&vo.price == null))
            {
                if(i == totalPoint+1)
                isMax = true;
                break;
            }
            costValue += vo.price;
        }
        if(isMax)
        {
            text.innerHTML = HtmlUtils.addColor("天赋点已满","#04a30a",20);
            if(piont == 1)
            this.OneState = ExchangeDisabledBtnState.IsMax;
            else
            this.TenState = ExchangeDisabledBtnState.IsMax;
            return;
        }
        var color = "#04a30a";
        if(costValue > this.BagNum)
        {
            color = "#ff0000";
            if(piont == 1)
            {
                this.NeedNum = costValue - this.BagNum;
                this.OneState = ExchangeDisabledBtnState.NoGoods;
            }
            else
            this.TenState = ExchangeDisabledBtnState.NoGoods;
        }
        else
        {
            
            if(piont == 1)
            this.OneState = ExchangeDisabledBtnState.None;
            else
            this.TenState = ExchangeDisabledBtnState.None;
        }
        var hasBagNum = GMath.GetChineseNumber(this.BagNum);
        text.innerHTML = HtmlUtils.addColor(`${hasBagNum}/${costValue}`,color,20);
    }

    private OnClickExchangeBtn(point:number):void
    {
        var state = -1;
        if(point == 1)
        state =  this.OneState;
        else
        state = this.TenState;
        if(state == ExchangeDisabledBtnState.NoGoods)
        {
            GoodsUtils.CheckGotoShopByGoodsNo(this.CostItem1.itemData.GoodsNo,this.NeedNum);
            MsgManager.instance.showRollTipsMsg("物品不足！");
            return;
        }
        else if(state == ExchangeDisabledBtnState.IsMax)
        {
            MsgManager.instance.showRollTipsMsg("天赋点已满！");
            return;
        }
        this.event(SComateEvent.COMATE_REQUEST_EXCHANGE , [point]);
    }

    public close(): void {
        super.close();
    }
}