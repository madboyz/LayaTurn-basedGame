import { BaseItem } from "../../../compent/BaseItem";
import { Comate_yuanfen_cfgVo } from "../../../../../db/sheet/vo/Comate_yuanfen_cfgVo";
import { ComateItem } from "./ComateItem";
import { SComateData } from "../data/SComateData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { PropertyUtil } from "../../../../property/PropertyUtil";
import { ComateInfo } from "../data/ComateInfo";
import { MsgManager } from "../../../manager/MsgManager";

export class ComateYuanfenPanel extends ui.main.ComateYuanfenPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
    }

    public removeEvent(): void {
    }

    public initComp() {
        super.initComp();
        this.itemList.vScrollBarSkin = "";
        this.itemList.itemRender = ComateYuanfenItem;
    }

    public open(...args): void {
        this.initWindow(true, true, "伙伴缘分", 540, 690, 115);
        super.open();
        this.update();
    }

    public update(): void {
        var cfgs = Comate_yuanfen_cfgVo.getAll()
        this.itemList.array = cfgs;
    }

    public close(): void {
        super.close();
    }

}


//道具的奖励ITEM
export class ComateYuanfenItem extends ui.main.ComateYuanfenItemUI {
    private _mData: Comate_yuanfen_cfgVo;
    private _canUp: boolean = true;
    private _index: number;
    private _item1: ComateYuanfenHeadItem;
    private _item2: ComateYuanfenHeadItem;
    private _item3: ComateYuanfenHeadItem;
    private _item4: ComateYuanfenHeadItem;

    constructor() {
        super();
        this.upBtn.on(Laya.Event.CLICK, this, this.upBtnClick);
        for (let i = 1; i <= 4; i++) {
            var item = this["_item" + i] = new ComateYuanfenHeadItem;
            (this["item" + i] as Laya.Box).addChild(item);
            item.setItemStyle(80);
            item.x = i == 1 ? 0 : 30;
            var lb = this["nameLb" + i] as Laya.Text;
        }
    }

    public set dataSource(data: Comate_yuanfen_cfgVo) {
        if (!data) return;
        this._mData = data;
        this.titleLb.text = data.desc;
        var thisStar = SComateData.instance.getYuanfenStarLv(data.no);
        var isHave = true;//整体是否激活
        this._canUp = true;//可以升级
        for (let i = 1; i <= 4; i++) {
            var showId = data.unlock_condition[i - 1];
            var _item = (this["_item" + i] as ComateYuanfenHeadItem);
            var item = this["item" + i] as Laya.Box;
            if (showId > 0) {
                item.visible = true;
                var showData = SComateData.instance.getComateByNo(showId);
                var cellStar = showData.StarLv;
                // _item._bitmap.skin = ResUtils.getCommonPng(showData.Sheet.head);
                // _item.bgName = ResUtils.getItemBg(showData.Sheet.quality);
                // _item.showName(showData.Sheet.name, 18, HtmlUtils.getColor(showData.Sheet.quality));
                // _item._bitmap.gray = !showData.IsHave;
                _item.dataSource = showData;
                isHave = isHave && showData.IsHave;
                this._canUp = this._canUp && cellStar > thisStar;
            } else {
                item.visible = false;
            }
        }
        this.hadJihuoImg.visible = isHave;
        this.upBtn.refreshRed(this._canUp);
        this.upBtn.visible = isHave && thisStar < 5;
        //属性
        var attrCfg = data["attr_" + thisStar];
        for (let i = 1; i <= 4; i++) {
            var attrcfg = attrCfg[i - 1];
            var attrLb = (this["attrLb" + i] as Laya.Text);
            if (attrcfg != null) {
                attrLb.text = PropertyUtil.GetPropertyAddDec(attrcfg);
            } else {
                attrLb.text = "";
            }
        }
        //星级
        for (let i = 1; i <= 5; i++) {
            const star = this["star" + i];
            if (thisStar >= i) {
                star.visible = true;
            } else {
                star.visible = false;
            }
        }
    }

    private upBtnClick(): void {
        if (!this._canUp) {
            MsgManager.instance.showRollTipsMsg("伙伴星级不足");
            return;
        }
        SComateData.instance.protocol.send37013(this._mData.no);
    }

    public destroy(): void {
        this.upBtn.off(Laya.Event.CLICK, this, this.upBtnClick);
        super.destroy()
    }

}

export class ComateYuanfenHeadItem extends BaseItem {
    private starBox: Laya.HBox;
    private starSImage = [];

    constructor() {
        super();
        this.setItemStyle(80);
        this.starBox = new Laya.HBox;
        this.starBox.align = "middle";
        this.starBox.height = 20;
        this.starBox.width = 100;
        this.starBox.x = 30;
        this.starBox.y = 70;
        this.starBox.scaleX = this.starBox.scaleY = 0.7;
        this.starBox.anchorX = this.starBox.anchorY = 0.5;
        this._topLayer.addChild(this.starBox);
        for (let i = 1; i <= 5; i++) {
            const element = new Laya.Image;
            element.width = 21;
            element.height = 20;
            element.skin = "comp/img_lightStar.png";
            element.name = "star" + (i);
            this.starBox.addChild(element);
            this.starSImage.push(element);
        }
    }

    private mData: ComateInfo = null;

    public set dataSource(data: ComateInfo) {
        if (!data) return;
        this.mData = data;
        this._bitmap.skin = ResUtils.getCommonPng(data.Sheet.head);
        this.bgName = ResUtils.getItemBg(data.Sheet.quality);
        this.showName(data.Sheet.name, 18, HtmlUtils.getColor(data.Sheet.quality));
        this._bitmap.gray = !data.IsHave;
        this._bg.gray = !data.IsHave;
        this.UpdateStar();
    }

    public UpdateStar() {
        var starLv = 0;
        if (this.mData == null) {
            starLv = 0;
        } else {
            starLv = this.mData.StarLv;
        }
        //星级
        for (let i = 1; i <= 5; i++) {
            var star = this.starBox.getChildByName("star" + i) as Laya.Image;
            if (starLv >= i) {
                star.visible = true;
            } else {
                star.visible = false;
            }
        }
        this.starBox.width = starLv * 21 * this.starBox.scaleX;
    }

    public get dataSource(): ComateInfo {
        return this.mData;
    }

}