import { FriendInfo } from "../../../compent/data/FriendInfo";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";

export class FriendDeleteItem extends ui.main.FriendDeleteItemUI {
    constructor() {
        super();
    }

    private mData:FriendInfo;

    public set dataSource(data:FriendInfo)
    {
        if(!data) return;
        this.mData = data;
        this.updateData();
    }

    private updateData():void
    {
        this.txt_name.text = this.mData.Name;
        this.txt_lv.text = "Lv."+ this.mData.Lv;
        this.txt_combat.text = "战力：" + this.mData.BattlePower.toString();
        this.headImg.skin = FactionVo.get(this.mData.Faction).head_icon[this.mData.Sex-1];
        this.onLine();
    }

    private onLine():void
    {
        if(this.mData.Online == 0)
        {
            this.txt_state.color = "#00b007";
            this.txt_state.text = "在线";
        }
        else
        {
            this.txt_state.color = "#4e524f";
            this.txt_state.text = this.mData.offLineStr;
        }
    }

    public get dataSource():FriendInfo
    {
        return this.mData;
    }
}