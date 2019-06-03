import { S13093_1 } from "../../../../../net/pt/pt_13";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";

export class OffLIneRewardItem extends Laya.View {
    private item:BaseItem;
    constructor() {
        super();
        this.size(80,80);

        this.item = new BaseItem();
        this.item.setItemStyle(80);
        this.item.isShowToolTip = true;
        this.addChild(this.item);
    }

    private _mdata:S13093_1;
    public set dataSource(data:S13093_1)
    {
        if(!data)
        {
            return;
        }
        this._mdata = data;
        this.item.itemData = new ItemData(this._mdata);
        this.item.toolTipData = this.item.itemData;
    }

    public get dataSource():S13093_1
    {
        return this._mdata;
    }
}