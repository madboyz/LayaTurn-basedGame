import { ShopMallPanel } from "../panel/ShopMallPanel";
import { ShopMallProtocol } from "../protocol/ShopMallProtocol";
import { CommonControl } from "../../../../common/control/CommonControl";
import { SShopData, ShopEvent } from "../../../../../net/data/SShopData";
import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";

export class ShopMallControl extends BaseControl{
    private protocol:ShopMallProtocol;
    constructor() {
        super();
        this.panel = new ShopMallPanel();
        this.protocol = new ShopMallProtocol();
    }

    public set panel(value: ShopMallPanel) {
        this.mPanel = value;
    }

    public get panel(): ShopMallPanel {
        return this.mPanel as ShopMallPanel;
    }

    openView(...args) {
        this.initEvent();
        CommonControl.instance.send52002();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SShopData.instance.on(ShopEvent.SHOP_DATA_BACK,this,this.onUpdateData);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_MONEY,this,this.onUpdateMoney);
        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE,this,this.onUpdateMoney);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD,this,this.onUpdateMoney);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE,this,this.onUpdateMoney);
    }
    private removeEvent() {
        SShopData.instance.off(ShopEvent.SHOP_DATA_BACK,this,this.onUpdateData);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_MONEY,this,this.onUpdateMoney);
        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE,this,this.onUpdateMoney);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD,this,this.onUpdateMoney);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE,this,this.onUpdateMoney);
    }

    private onUpdateData():void
    {
        if(SShopData.instance.ShopData.length > 0)
        this.panel.updateList();
    }

    private onUpdateMoney(type:number):void
    {
        this.panel.updateMoney();
    }
}