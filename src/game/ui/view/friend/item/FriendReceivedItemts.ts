import { FriendInfo } from "../../../compent/data/FriendInfo";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";

export class FriendReceivedItemts extends ui.main.FriendReceivedItemtsUI {
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
    }

    public get dataSource():FriendInfo
    {
        return this.mData;
    }
}