import { FightComateView } from "../../../../battle/role/fight/FightComateView";
import { SComateData, SComateEvent } from "../data/SComateData";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { BaseItem } from "../../../compent/BaseItem";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { Comate_starVo } from "../../../../../db/sheet/vo/Comate_starVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { GoodsVo } from "../../../../../db/sheet/vo/GoodsVo";
import { From_sourceVo } from "../../../../../db/sheet/vo/From_sourceVo";
import { MsgManager } from "../../../manager/MsgManager";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { FucManager } from "../../../manager/FucManager";

export class ComateStarPanel extends ui.main.ComateStarPanelUI {
    constructor() {
        super();
        this.sameLevelEliminate = false;
        this.isShowEffect = false;
        this.mResouce = [
            
            { url: "res/atlas/pet.atlas", type: Laya.Loader.ATLAS },
        ];
    }
    private FightComateObj:FightComateView;
    private starSImage = []; 
    private Item:BaseItem;
    private vo:Comate_starVo

    public initComp() {
        super.initComp();
        this.BattleText.url = "res/atlas/number/fight.atlas";
        for (let i = 0; i < 5; i++) {
            const element = this.Stars.getChildByName(`star${i}`);
            this.starSImage.push(element);
        }
        this.FightComateObj = Laya.Pool.getItemByClass("FightComateView", FightComateView);
        this.FightComateObj.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.FightComateObj.x = 287;
        this.FightComateObj.y = 435;
        this.addChild(this.FightComateObj);
        if(!this.Item)
        {
            this.Item = new BaseItem();
            this.Item.setItemStyle(80);
            this.upgardeBox.addChild(this.Item);
            this.Item.x = 84;
            this.Item.y = 16;
        }
        HtmlUtils.setHtml(this.CountText.style,6,20,"center","middle");
        // this.GetText.underline = true;
    }

    public open(...args): void {
        super.open();
        this.SelectUpdate();
    }

    public initEvent():void {
        // this.GetText.on(Laya.Event.CLICK,this,this.onClickGet);
        this.StarBtn.on(Laya.Event.CLICK,this,this.onClickStarBtn);
        this.AttrBtn.on(Laya.Event.CLICK , this , this.OpenComateAttr);

        SComateData.instance.on(SComateEvent.COMATE_ATTR_UPDATE,this,this.SelectUpdate);
    }

    public removeEvent():void {
        // this.GetText.off(Laya.Event.CLICK,this,this.onClickGet);
        this.StarBtn.off(Laya.Event.CLICK,this,this.onClickStarBtn);
        this.AttrBtn.off(Laya.Event.CLICK , this , this.OpenComateAttr);
        
        SComateData.instance.off(SComateEvent.COMATE_ATTR_UPDATE,this,this.SelectUpdate);
    }

    private onClickStarBtn():void {
        if(SComateData.instance.CurrentComate.IsHave == false)
        {
            MsgManager.instance.showRollTipsMsg("未激活！");
            return;
        }
        if(!this.vo) return;
        var costTable = this.vo.costs[0];
        var goodsId = costTable[0];
        var goodsNum = costTable[1];
        var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
        if(num < goodsNum)
        {
            var needNum =  goodsNum - num;
            GoodsUtils.CheckGotoShopByGoodsNo(goodsId,needNum);
            MsgManager.instance.showRollTipsMsg("您的材料不足！");
            return;
        }
        this.event(SComateEvent.COMATE_REQUEST_STAR);
    }

    private onClickGet():void {
        if(this.Item.itemData == null)
        return;
        var goodsVo = GoodsVo.get(this.Item.itemData.GoodsNo);
        if(!goodsVo)
        return;
        var vo = From_sourceVo.get(goodsVo.from_source);
        if(vo && vo.actionType == 2)
        {
            UIManager.instance.closeUI(UIID.SYS_COMATE);
            UIManager.instance.closeUI(UIID.SYS_COMATE_STAR);
            FucManager.doCfgAction(vo.action);
        }
    }

    public SelectUpdate()
    {
        this.updateBattle();
        this.updateStar();
        this.updateName();
        this.updateFightComate();
        this.updateCost();
    }

    private OpenComateAttr():void
    {
        if(SComateData.instance.CurrentComate == null)
        return;
        if(!SComateData.instance.CurrentComate.IsHave)
        {
            MsgManager.instance.showRollTipsMsg("未激活！");
            return;
        }
        UIManager.instance.openUI(UIID.SYS_LOOKPROP,[SComateData.instance.CurrentComate]);
    }

    public updateCost()
    {
        if(SComateData.instance.CurrentComate == null||this.Item == null)
        return;
        var startNextLv = SComateData.instance.CurrentComate.StarLv + 1;
        this.vo = Comate_starVo.getComateStarCost(SComateData.instance.CurrentComate.No , startNextLv);
        if(!this.vo)
        {
            //满级
            this.MaxTips.visible = true;
            this.upgardeBox.visible = false;
            return;
        }
        this.MaxTips.visible = false;
        this.upgardeBox.visible = true;
        var costTable = this.vo.costs[0];
        var goodsId = costTable[0];
        var goodsNum = costTable[1];
        this.Item.itemCode = goodsId;
        this.Item.toolTipData = this.Item.itemData; 
        // this.GoodsNameText.text = this.Item.itemData.clientInfo.name.toString();
        var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
        var color = "#ff0000";
        if(num >= goodsNum)
        {
            color = "#04a30a";
        }
        this.CountText.innerHTML =HtmlUtils.addColor(num.toString() + `/${goodsNum}`,color,20);
        this.StarBtn.refreshRed(num >= goodsNum);
        
    }

    public updateName()
    {
        if(SComateData.instance.CurrentComate == null||this.NameText == null)
        return; 
        this.NameText.text = SComateData.instance.CurrentComate.Sheet.name;
    }

    public updateFightComate()
    {
        if(SComateData.instance.CurrentComate == null||this.FightComateObj == null)
        return;
        if(this.FightComateObj.info == null)
        {
            this.FightComateObj.info = {};
        }
        this.FightComateObj.info.ParentPartnerNo = SComateData.instance.CurrentComate.No;
        this.FightComateObj.updateSkin();
        this.FightComateObj.scaleX = this.FightComateObj.scaleY = 1;
    }

    public updateStar()
    {
        if(SComateData.instance.CurrentComate == null||this.starSImage.length == 0)
        return;
        this.Stars.width = SComateData.instance.CurrentComate.StarLv*21;
        for (let i = 0; i < this.starSImage.length; i++) {
            const star = this.starSImage[i];
            if(SComateData.instance.CurrentComate == null)
            {
                star.visible = false;
            }
            else
            {
                if(SComateData.instance.CurrentComate.StarLv > i)
                star.visible = true;
                else
                star.visible = false;
            }
        }
    }

    public updateBattle()
    {
        if(SComateData.instance.CurrentComate == null||this.BattleText == null)
        return;

        this.sp_combat.visible = SComateData.instance.CurrentComate.IsHave;
        this.addChild(this.pingfenLb);
        this.pingfenLb.text = "评分:" + SComateData.instance.CurrentComate.Sheet.battle.toString();

        var bat = SComateData.instance.CurrentComate.BaseAttribute.get(PropertyEnumCode.OI_CODE_BATTLE_POWER);
        if(bat != null&& bat != 0)
        this.BattleText.text = bat.toString();
        else
        this.BattleText.text = SComateData.instance.CurrentComate.Sheet.battle.toString();
    }

    public close(): void {
        super.close();
    }
}
