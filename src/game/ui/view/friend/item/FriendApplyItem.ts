import { FriendInfo } from "../../../compent/data/FriendInfo";
import { SFriendData } from "../../../../../net/data/SFriendData";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";

export class FriendApplyItem extends ui.main.FriendApplyItemUI {
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
        this.txt_heart.text = "亲密度:" + this.mData.Intimacy;
        this.txt_lv.text = "Lv."+ this.mData.Lv;
        this.txt_combat.text = "战力：" + this.mData.BattlePower.toString();
        this.headImg.skin = FactionVo.get(this.mData.Faction).head_icon[this.mData.Sex-1];
        if(SFriendData.instance.getFriendInfo(this.mData.PlayerId))
        {
            this.btn_apply.gray = true;
        }
        else
        {
            this.btn_apply.gray = false;
        }
        this.updateTime();
    }

    public updateTime():void
    {
        var ob:any = SFriendData.instance.getCDtime(this.mData);
        if(ob)
        {
            var time:number = Date.now()/1000 - ob.time;
            var leftTime:number = Math.ceil(60 - time);
            if(leftTime > 0 && leftTime <= 60)
            {
                this.btn_apply.initCD(leftTime*1000,"申请");
                this.btn_apply.startCoolDown();
            }
        }
    }

    public get dataSource():FriendInfo
    {
        return this.mData;
    }
}