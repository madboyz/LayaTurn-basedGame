import { FriendItem } from "../item/FriendItem";
import { SFriendData, SFriendEvent } from "../../../../../net/data/SFriendData";
import { FriendInfo } from "../../../compent/data/FriendInfo";
import { MsgManager } from "../../../manager/MsgManager";

export class FriendListPanel extends ui.main.FriendListPanelUI{
    constructor() {
        super();
    }

    public initComp():void
    {
        this.initEvent();
        this.initList();
        this.updateData();
    }

    private initList():void
    {
        this.list.itemRender = FriendItem;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list.selectEnable = true;
        this.list.selectHandler = Laya.Handler.create(this,this.onListChangeHandler,null,false);
        this.list.mouseHandler = Laya.Handler.create(this,this.onClickSkill,null,false);
    }

    private initEvent():void
    {
        this.btn_receivedAll.on(Laya.Event.CLICK,this,this.onReceivedAll);
        this.btn_sendAll.on(Laya.Event.CLICK,this,this.onSendAll);
    }

    private removeEvent():void
    {
        this.btn_receivedAll.off(Laya.Event.CLICK,this,this.onReceivedAll);
        this.btn_sendAll.off(Laya.Event.CLICK,this,this.onSendAll);
    }

    public updateData():void
    {
        this.updateList();
    }

    private updateList():void
    {
        this.list.array = SFriendData.instance.friendList;
        this.noDataBox.visible = SFriendData.instance.friendList.length <= 0;
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

        if(e.target instanceof component.ScaleButton && e.target.name == "btn_send")
        {
            if(this.selectInfo.GiveState != 1)
            {
                this.parent.event(SFriendEvent.FRIEND_REQUEST_SENDHEART,[[this.selectInfo.PlayerId]]);
            }
            else
            {
                MsgManager.instance.showRollTipsMsg("今日已赠送！");
            }
        }
        else if(e.target instanceof Laya.Image && e.target.name == "img_state")
        {
            if(this.selectInfo.LoveState == 1)
            {
                if(SFriendData.instance.friendInfo.LeftGetCount > 0)
                {
                    this.parent.event(SFriendEvent.FRIEND_REQUEST_RECEIVEDHEART,[[this.selectInfo.PlayerId]]);
                }
                else
                {
                    MsgManager.instance.showRollTipsMsg("今日领取爱心已达上限！");
                }
            }
            else
            {
                MsgManager.instance.showRollTipsMsg("已领取过好友得爱心！");
            }
        }
    }

    private onReceivedAll():void
    {
        this.parent.event(SFriendEvent.FRIEND_REQUEST_RECEIVEDHEART,[[0]]);
    }

    private onSendAll():void
    {
        this.parent.event(SFriendEvent.FRIEND_REQUEST_SENDHEART,[[0]]);
    }

    public removeSelf():any
    {
        this.removeEvent();
        super.removeSelf();
    }
}