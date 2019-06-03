import { DataManager } from "../../message/manager/DataManager";
import { S52002, S52002_1, S52001 } from "../pt/pt_52";
import { MallVo } from "../../db/sheet/vo/MallVo";
import { SRoleData } from "./SRoleData";
import { ItemData } from "../../game/ui/compent/data/ItemData";

export class SShopData extends  Laya.EventDispatcher{
    private static _instance: SShopData;
    public ShopData:Array<S52002_1>;
    public ShopList:Laya.Dictionary = new Laya.Dictionary();
    public static get instance(): SShopData {
        return SShopData._instance || (SShopData._instance = new SShopData());
    }
    constructor() {
        super();
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E52002, this, this.onS52002);//获得限购物品信息
        DataManager.cancel(PROTOCOL.E52001, this, this.onS52001);//获得限购物品信息
    }

    public registerEvent() {
        this.ShopList.clear();
        DataManager.listen(PROTOCOL.E52002, this, this.onS52002);//获得限购物品信息
        DataManager.listen(PROTOCOL.E52001, this, this.onS52001);//获得限购物品信息
        var typeList = MallVo.shopList;
        for (let i = 0; i < typeList.length; i++) {
            const shopType = typeList[i];
            var ItemList:Laya.Dictionary = new Laya.Dictionary();
            var shopItemList = MallVo.getTypeList(shopType)
            for (let j = 0; j < shopItemList.length; j++) {
                const element = shopItemList[j];
                var shopItem = ItemList.get(element.no);
                if(!shopItem)
                {
                    ItemList.set(element.no , element);
                }
            }
            if(ItemList.keys.length > 0)
            this.ShopList.set(shopType,ItemList);
        }
    }

    public getShopList(shopType:number , subType:number):any
    {
        var list = [];
        var typeList = this.ShopList.get(shopType).values;
        for (let i = 0; i < typeList.length; i++) {
            const element:MallVo = typeList[i];
            if(element.tppe_1 == subType)
            {
                var data = new ItemData(element.goods_no);
                data.isJobEquip && (list.push(element));
            }
        }
        return list;
    }

    public getShopAllSubType(shopType:number ):Array<any>
    {
        var subTypesList = [];
        var finalList = null;
        var typeList = this.ShopList.get(shopType).values;
        for (let i = 0; i < typeList.length; i++) {
            const element:MallVo = typeList[i];
            if(element.tppe_1&&subTypesList.indexOf(element.tppe_1) == -1)
            {
                if(!finalList)
                finalList = [];
                finalList.push({tppe_limt:element.tppe_limit , tppe_1:element.tppe_1 , tppe_dec:element.tppe_dec});
                subTypesList.push(element.tppe_1);
            }
        }
        return finalList;
    }
    

    private onS52002(data:S52002):void
    {
        this.ShopData = data.item_1;
        this.event(ShopEvent.SHOP_DATA_BACK);
    }

    private onS52001(data:S52001):void
    {
        if(data.RetCode == 0 && this.getGoodData(data.No))
        {
            this.getGoodData(data.No).LeftCount -= data.Count;
            this.event(ShopEvent.SHOP_DATA_BACK);
        }
    }

    public getShopItemByGoodsNo(goodsNo:number , ):MallVo
    {
        var vo:MallVo = null;
        for (let i = 0; i < this.ShopList.values.length; i++) {
            const shopList:Laya.Dictionary = this.ShopList.values[i];
            for (let j = 0; j < shopList.values.length; j++) {
                const shopItem = shopList.values[j];
                if(shopItem.goods_no == goodsNo)
                {
                    if(shopItem.price_type == MoneyType.BIND_YUANBAO)
                    {
                        if(SRoleData.instance.info.BindYuanbao == 0) 
                        {
                            continue;
                        }
                    }
                    vo = shopItem;
                    break;
                }
                
                
            }
            if(vo)
            break;
        }
        return vo;
    }

    public getGoodData(no:number):S52002_1
    {
        if(this.ShopData)
        {
            for (let index = 0; index < this.ShopData.length; index++) {
                var element = this.ShopData[index];
                if(element.No == no)
                {
                    return element;
                }
            }
        }
        return null;
    }
}

export enum ShopEvent {
    SHOP_REQUEST_DATA = "shop_request_data",
    SHOP_DATA_BACK = "shop_data_back",
}