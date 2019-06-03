import { FriendInfo } from "../../../compent/data/FriendInfo";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";

export class FriendItem extends ui.main.FriendItemUI {
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
        this.txt_heart.text = "亲密度:" + this.mData.Intimacy;
        this.txt_combat.text = "战力：" + this.mData.BattlePower.toString();
        this.headImg.skin = FactionVo.get(this.mData.Faction).head_icon[this.mData.Sex-1];
        this.btnState();
        this.onLine();
    }

    private btnState():void
    {
        if(this.mData.GiveState == 1)
        {
            this.b_send.visible = false;
            this.btn_send.label = "已赠送";
            this.btn_send.gray = true;
        }
        else
        {
            this.b_send.visible = true;
            this.btn_send.label = "";
            this.btn_send.gray = false;
        }

        if(this.mData.LoveState == 0)
        {
            this.img_state.visible = false;
            this.selectImg.visible = false;
        }
        else
        {
            this.img_state.visible = true;
            if(this.mData.LoveState == 1)
            {
                // this.img_state.skin = "friend/img_heart.png";
                this.selectImg.visible = false;
            }
            else
            {
                // this.img_state.skin = "friend/img_sendheart.png";
                this.selectImg.visible = true;
            }
        }
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