import { MallVo } from "../../../../../db/sheet/vo/MallVo";
import { BaseItem } from "../../../compent/BaseItem";
import { S52002_1 } from "../../../../../net/pt/pt_52";
import { SShopData } from "../../../../../net/data/SShopData";
import { ItemData } from "../../../compent/data/ItemData";
import { SBagData } from "../../../../../net/data/SBagData";
import { SChapterData } from "../../../../chapter/SChapterData";
import { Chapter_cfgVo } from "../../../../../db/sheet/vo/Chapter_cfgVo";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { FormulaVo } from "../../../../../db/sheet/vo/FormulaVo";
import { Equip_base_quality_coefVo } from "../../../../../db/sheet/vo/Equip_base_quality_coefVo";
import { Attribute } from "../../../../property/RoleProperty";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { ItemHelper } from "../../../compent/data/ItemHelper";

export class GoodsItem extends ui.main.GoodsItemUI {
    private _item: BaseItem;
    constructor() {
        super();
        if (!this._item) {
            this._item = new BaseItem();
            this._item.x = 9;
            this._item.y = 9;
            this._item.setItemStyle(80);
            this.addChildAt(this._item, 1);
        }
    }

    private mData: MallVo;
    private limitVo: S52002_1;
    private discount: number;
    private bindIcon: Laya.Image;
    public set dataSource(data: MallVo) {
        if (!data) return;
        var point;
        this.mData = data;
        this.limitVo = SShopData.instance.getGoodData(this.mData.no);
        var itemData = new ItemData(this.mData.goods_no);
        itemData.serverInfo.Quality = this.mData.quality;
        this._item.itemData = itemData;
        this.txt_name.text = itemData.clientInfo.name;
        this._item.toolTipData = this._item.itemData;
        //把有没有limitVo的合并
        var discount_price;
        var price;
        var goodsType;
        var LeftCount;
        var PriceType;
        if (this.limitVo) {
            discount_price = this.limitVo.DiscountPrice;
            price = this.limitVo.Price;
            goodsType = this.limitVo.GoodsType;
            LeftCount = this.limitVo.LeftCount;
            PriceType = this.limitVo.PriceType;
        } else {
            discount_price = this.mData.discount_price;
            price = this.mData.price;
            goodsType = this.mData.goods_type;
            LeftCount = this.mData.buy_count_limit_time;
            PriceType = this.mData.price_type;
        }

        point = (discount_price / price);
        if (point >= 1) {
            this.discount = 1;
            this.img_discout.visible = false;
        } else {
            this.discount = point * 10;
            this.img_discout.visible = true;
        }
        if (this.discount != 1) {
            this.txt_discount.text = this.discount + "折";
            this.txt_prince.text = "x" + discount_price;
        } else {
            this.txt_discount.text = "";
            this.txt_prince.text = "x" + price;
        }

        this.txt_leftNum.text = "";
        this.powerUpImg.visible = false;
        if (this.mData.buy_count_limit_time > 0) {
            this.txt_leftNum.fontSize = 18;
            this.txt_leftNum.color = "#8e5213";
            this.txt_leftNum.text = "剩余数量:" + LeftCount;
        } else if (this.mData.lv_need > 0 && SRoleData.instance.info.Lv < this.mData.lv_need) {
            this.txt_leftNum.fontSize = 16;
            this.txt_leftNum.color = "#ff0000";
            this.txt_leftNum.text = "需要角色" + this.mData.lv_need + "级";
        } else if (this.mData.tppe_limit) {
            var LimtChapterId = this.mData.tppe_limit[1];
            if (LimtChapterId > SChapterData.instance.chapter.chapterId) {
                this.txt_leftNum.fontSize = 14;
                this.txt_leftNum.color = "#ff0000";
                var vo: Chapter_cfgVo = Chapter_cfgVo.get(LimtChapterId);
                this.txt_leftNum.text = "需要解锁:" + vo.scene_name;
            }
        }
        if (itemData.IsRoleEquip && this.txt_leftNum.text == "") {
            this.txt_leftNum.fontSize = 16;
            this.txt_leftNum.color = "#00b007";
            var power = ItemHelper.getEquipPower(itemData, this.mData.quality);
            var roleEquipdata = SBagData.instance.role.getItemByCfgSubType(itemData.clientInfo.subtype);
            var mypower = roleEquipdata && roleEquipdata.serverInfo.BattlePower || 0;
            var addPower = power - mypower;
            if (addPower > 0) {
                this.txt_leftNum.text = "战力:" + addPower;
                this.powerUpImg.visible = true;
                this.powerUpImg.x = this.txt_leftNum.x + this.txt_leftNum.textWidth + 5;
            }
        }
        var itemdata: ItemData = new ItemData(PriceType);
        this.moneyIcon.skin = ResUtils.getItemIcon(itemdata.clientInfo.icon);
    }

    private getPower(item: ItemData): number {
        var vo: FormulaVo = FormulaVo.get(2);
        var ratio = Equip_base_quality_coefVo.getRatioByLvAndQuality(item.clientInfo.lv, this.mData.quality);
        var _fight: number = 0;
        for (let i = 1; i <= 3; i++) {
            var attrs = item.clientInfo["equip_add_base_attr" + i];
            for (let j = 0; j < attrs.length; j++) {
                var attr = attrs[j];
                var attributeVo = PropertyVo.getByInfo(attr[0]);
                _fight += Math.ceil((parseInt(attr[1]) * vo[attributeVo.sys_name]));
            }
        }
        return _fight * ratio;
    }

    protected updateAttrList(arr: Array<any>, atrr: Array<any>, ratio: number): void {
        var obj: Attribute;
        var vo: PropertyVo;
        for (let index = 0; index < atrr.length; index++) {
            var element = atrr[index];
            vo = PropertyVo.getByInfo(element[0]);
            obj = new Attribute(vo.no, element[1]);
            obj.value = Math.ceil(obj.value * ratio);
            this.updateAtrrListValue(arr, obj);
        }
    }


    private updateAtrrListValue(arr: Array<any>, obj: Attribute): void {
        if (arr.length <= 0) {
            arr.push(obj);
            return;
        }
        else {
            for (let index = 0; index < arr.length; index++) {
                var element = arr[index];
                if (element.name == obj.name) {
                    element.value += obj.value;
                    return;
                }
            }
        }
        arr.push(obj);
    }


    public get CanEnter(): boolean {
        if (this.mData == null) return false;
        var limtType = this.mData.tppe_limit[0];
        if (limtType == 1) {
            var LimtChapterId = this.mData.tppe_limit[1];
            return LimtChapterId <= SChapterData.instance.chapter.chapterId;
        }
    }

    public get dataSource(): MallVo {
        return this.mData;
    }
}