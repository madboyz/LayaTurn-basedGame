import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { ToolTipsEquipment } from "../../../compent/ToolTipsEquipment";
import { SBagData } from "../../../../../net/data/SBagData";
import { ToolTipSmellEquip } from "../../../compent/ToolTipSmellEquip";
import { MsgManager } from "../../../manager/MsgManager";

export class SmellItem extends Laya.View{
    public item:BaseItem;
    private itemdata:ItemData;
    private add:component.ScaleButton;
    constructor()
    {
        super();
        this.init();
    }

    private init():void
    {
        this.item = new BaseItem();
        this.item.setItemStyle(80);
        this.addChild(this.item);
        this.size(90, 101);

        this.add = new component.ScaleButton();
        this.add.skin = ResUtils.getCompUIUrl("btn_bigAdd");
        this.add.stateNum = 1;
        this.add.label = "";
        this.add.width = this.add.height = 39;
        this.add.pivot(19.5,19.5);
        this.addChild(this.add);
        this.add.x = this.item.x + 40;
        this.add.y = this.item.y + 40;
        this.add.on(Laya.Event.CLICK,this,this.onAdd);
    }

    private onAdd():void
    {
        if(SBagData.instance.equip.selectSmellList.length <= 0 ){
            MsgManager.instance.showRollTipsMsg("没有可分解的装备");
            return;
        }
        UIManager.instance.openUI(UIID.SELECTSMELL);
    }

    private mData:number;

    public set dataSource(data:number)
    {
        if(!data) return;
        this.mData = data;
        if(this.mData > 0)
        {
            this.add.visible = false;
            this.itemdata = SBagData.instance.equip.getItemDataByGoodId(data);
            this.item.itemData = this.itemdata;
            this.item.toolTipData = this.itemdata;
            // this.item.showName(this.itemdata.clientInfo.lv + "级", 18, "#76420b");
            this.item.showName(this.itemdata.clientInfo.bag_show_lv, 18, "#76420b");
            this.item.renderClass = ToolTipSmellEquip;
        }
        else
        {
            this.add.visible = true;
            this.item.clearData();
        }
    }

    public get dataSource():number
    {
        return this.mData;
    }
}