import { SignVo } from "../../../../../db/sheet/vo/SignVo";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { GameUtils } from "../../../../utils/GameUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { SSignInData } from "../data/SSignInData";

export class MonthSignInPanel extends ui.main.MonthSignInPanelUI {
    constructor() {
        super();
        this.initEvent();
        this.initComp();
        this.updateData(true);
    }

    public initEvent(): void {
    }

    public removeEvent(): void {
    }

    public initComp() {
        this.signInList.itemRender = MonthSignInItem;
        this.signInList.vScrollBarSkin = "";
    }

    public updateData(onOpen:boolean = false): void {
        this.signInList.array = SSignInData.instance.monthSignInList;
        if(onOpen){
            var thisDay = (new Date(GameUtils.TimeStamp * 1000).getDate());
            this.signInList.scrollTo(thisDay - 1);
        }
    }

    public destroy(): void {
        this.signInList.array = [];
        super.destroy();
    }
}


//道具的奖励ITEM
export class MonthSignInItem extends ui.main.MonthSignInItemUI {
    private item: BaseItem;
    constructor() {
        super();
        this.item = new BaseItem();
        this.item._forceShowEff = -1;
        this.item.setItemStyle(80);
        this.item.isShowToolTip = true;
        this.itemBox.addChild(this.item);
        this.on(Laya.Event.CLICK, this, this.thisClick);
    }

    private _mdata: any;
    public set dataSource(data: any) {
        if (!data) {
            return;
        }
        this._mdata = data;
        var indexDay = SSignInData.instance.monthSignInList.indexOf(this._mdata) + 1;
        var thisDay = (new Date(GameUtils.TimeStamp * 1000).getDate());
        var signed = data.sign;
        var cfg = SignVo.get(indexDay);
        var rewardId = cfg.goods_no > 0 ? cfg.goods_no : MoneyType.BIND_YUANBAO;
        var reward = new ItemData(rewardId);
        reward.Count = cfg.goods_no > 0 ? cfg.goods_count : cfg.bind_gold;
        //数据
        this.dayNoLb.text = indexDay + "号";


        this._signEff && this._signEff.clearEffect();
        if (indexDay < thisDay) {
            this.alpha = 0.5;
            this.signImg.visible = true;
            this.signImg.skin = signed ? "signIn/img_sign.png" : "signIn/img_unsign.png";
        } else if (indexDay > thisDay) {
            this.alpha = 1;
            this.signImg.visible = false;
        } else {
            this.alpha = 1;
            this.signImg.visible = signed;
            this.signImg.skin = "signIn/img_sign.png";
            !signed && this.showSignEff();
        }
        this.item.itemData = reward;
        this.item.toolTipData = (indexDay == thisDay && !signed) ? null : reward;
    }

    private thisClick(): void {
        var indexDay = SSignInData.instance.monthSignInList.indexOf(this._mdata) + 1;
        var thisDay = (new Date(GameUtils.TimeStamp * 1000)).getDate();
        if (indexDay != thisDay || this._mdata.sign) {
            return;
        }
        SSignInData.instance.protocol.send13050();
    }


    //任务完成的特效
    private _signEff: UIeffectLayer;
    //任务过程，播放特效 , type,1为完成,2为进行中
    public showSignEff(): void {
        if (!this._signEff) {
            this._signEff = new UIeffectLayer;
            this.addChild(this._signEff);
        }
        this._signEff.playEffect("ui_effect_2", 45, 48, true, 130);
    }

    public destroy(): void {
        if (this._signEff) {
            this._signEff.destroy();
            this._signEff = null;
        }
        this.on(Laya.Event.CLICK, this, this.thisClick);
        super.destroy()
    }

}