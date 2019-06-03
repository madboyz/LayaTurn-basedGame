import { TabBar } from "../../../compent/TabBar";
import { SFriendData, SFriendEvent } from "../../../../../net/data/SFriendData";
import { FriendReceivedItemts } from "../item/FriendReceivedItemts";
import { FriendDeleteItem } from "../item/FriendDeleteItem";
import { FriendInfo } from "../../../compent/data/FriendInfo";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";

export class FriendManagerPanel extends ui.main.FriendManagerPanelUI{
    private mTab:TabBar;
    public curIndex:number = -1;
    constructor() {
        super();
    }

    public initComp():void
    {
        this.initTab();
        this.initEvent();
        this.initList();
        this.updateData();
    }

    private initTab():void
    {
        if(!this.mTab)
        {
            this.mTab = new TabBar([this.btn_0,this.btn_1]);
            this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
        }
        this.mTab.select = 0;
    }

    private initList():void
    {
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list.selectEnable = true;
        this.list.selectHandler = Laya.Handler.create(this,this.onListChangeHandler,null,false);
        this.list.mouseHandler = Laya.Handler.create(this,this.onClickSkill,null,false);
    }

    private initEvent():void
    {
        RedDotManager.instance.on(RedDotType.RDFriend,this,this.updateRed);
    }

    private removeEvent():void
    {
        RedDotManager.instance.off(RedDotType.RDFriend,this,this.updateRed);
    }

    public updateData():void
    {
        this.updateList();
        this.updateRed();
    }

    private updateRed():void
    {
        this.btn_0.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDFriend)._isActiveSave);
    }

    private updateList():void
    {
        if(this.curIndex == 0)
        {
            this.selectInfo = null;
            this.list.itemRender = FriendReceivedItemts;
            this.list.array = SFriendData.instance.applyFriendList;
            this.noDataBox.visible = SFriendData.instance.applyFriendList.length <= 0;
            this.tipsWordLb.text = "暂时没有好友申请哦，你也可以主动去结交一些朋友！";
            this.list.selectedIndex = -1;
        }
        else
        {
            this.selectInfo = null;
            this.list.itemRender = FriendDeleteItem
            this.list.array = SFriendData.instance.friendList;
            this.noDataBox.visible = SFriendData.instance.friendList.length <= 0;
            this.tipsWordLb.text = "您也太高冷了吧，快去结交一些朋友吧！";
            this.list.selectedIndex = -1;
        }
    }

    private onTabChange(index:number,btn:Laya.Button) {
        if(this.curIndex != index)
        {
            this.curIndex = index;
        }
        this.updateData();
    }

    private selectInfo:FriendInfo;
    private onListChangeHandler():void
    {
        this.selectInfo = this.list.selectedItem;
    }

    private onClickSkill(e:Laya.Event):void
    {
        if(e.type != Laya.Event.CLICK)
        {
            return;
        }

        if(e.target as component.ScaleButton)
        {
            if(e.target.name == "btn_refuse")
            {
                this.parent.event(SFriendEvent.FRIEND_REQUEST_BACKADD,[[this.selectInfo.PlayerId,0]]);
                SFriendData.instance.deleteApplyFriend(this.selectInfo.PlayerId);
                this.list.array = SFriendData.instance.applyFriendList;
            }
            else if(e.target.name == "btn_agreen")
            {
                this.parent.event(SFriendEvent.FRIEND_REQUEST_BACKADD,[[this.selectInfo.PlayerId,1]]);
            }
            else if(e.target.name == "btn_delete")
            {
                this.parent.event(SFriendEvent.FRIEND_REQUEST_DELETE,[[this.selectInfo.Id]]);
            }
        }
    }

    public removeSelf():any
    {
        this.mTab && this.mTab.dispose();
        this.mTab = null;
        this.curIndex = -1;
        this.removeEvent();
        super.removeSelf();
    }
}