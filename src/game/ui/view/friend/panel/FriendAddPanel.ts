import { TabBar } from "../../../compent/TabBar";
import { FriendApplyItem } from "../item/FriendApplyItem";
import { SFriendData, SFriendEvent } from "../../../../../net/data/SFriendData";
import { FriendInfo } from "../../../compent/data/FriendInfo";
import { MsgManager } from "../../../manager/MsgManager";

export class FriendAddPanel extends ui.main.FriendAddPanelUI{
    private mTab:TabBar;
    public curIndex:number = -1;
    constructor() {
        super();
    }

    public initComp():void
    {
        this.request();
        this.initTab();
        this.initEvent();
        this.initList();
        Laya.timer.once(500,this,this.updateData);
    }

    private request():void
    {
        SFriendData.instance.curName = "";
        this.parent.event(SFriendEvent.FRIEND_REQUEST_FIND,[[""]]);
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
        this.tujian_list.itemRender = FriendApplyItem;
        this.tujian_list.vScrollBarSkin = "";
        this.tujian_list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.tujian_list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.tujian_list.selectEnable = true;
        this.tujian_list.selectHandler = Laya.Handler.create(this,this.onListChangeHandler,null,false);
        this.tujian_list.mouseHandler = Laya.Handler.create(this,this.onClickSkill,null,false);

        this.find_list.itemRender = FriendApplyItem;
        this.find_list.vScrollBarSkin = "";
        this.find_list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.find_list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.find_list.selectEnable = true;
        this.find_list.selectHandler = Laya.Handler.create(this,this.onListChangeHandler,null,false);
        this.find_list.mouseHandler = Laya.Handler.create(this,this.onClickSkill,null,false);
    }

    private initEvent():void
    {
        this.btn_find.on(Laya.Event.CLICK,this,this.find);
        this.btn_refresh.on(Laya.Event.CLICK,this,this.fresh);
    }

    private removeEvent():void
    {
        this.btn_find.off(Laya.Event.CLICK,this,this.find);
        this.btn_refresh.off(Laya.Event.CLICK,this,this.fresh);
    }

    private updateList():void
    {
        if(this.curIndex == 0)
        {
            this.tujian_list.array = SFriendData.instance.tujianList;
            this.tujian_list.selectedIndex = -1;
        }
        else
        {
            this.find_list.array = SFriendData.instance.findList;
            this.find_list.selectedIndex = -1;
        }
    }

    private updateListData():void
    {
        if(this.curIndex == 0)
        {
            this.tujian_list.refresh();
        }
        else
        {
            this.find_list.refresh();
        }
    }

    public updateData():void
    {
        this.updateList();
        this.updateBoxVisiBle();
    }

    private updateBoxVisiBle():void
    {
        if(this.curIndex == 0)
        {
            this.b_tujian.visible = true;
            this.b_find.visible = false;
        }
        else
        {
            this.b_tujian.visible = false;
            this.b_find.visible = true;
        }
    }

    private selectInfo:FriendInfo;
    private onListChangeHandler():void
    {
        if(this.curIndex == 0)
        {
            this.selectInfo = this.tujian_list.selectedItem;
        }
        else
        {
            this.selectInfo = this.find_list.selectedItem;
        }
    }

    private onClickSkill(e:Laya.Event):void
    {
        if(e.type != Laya.Event.CLICK)
        {
            return;
        }

        if(e.target as component.ScaleButton && e.target.name == "btn_apply")
        {
            if(SFriendData.instance.getFriendInfo(this.selectInfo.PlayerId) == null)
            {
                SFriendData.instance.pushInCdList(this.selectInfo);
                this.parent.event(SFriendEvent.FRIEND_REQUEST_ADD,[[this.selectInfo.PlayerId]]);
                Laya.timer.callLater(this,this.updateListData);
            }
            else
            {
                MsgManager.instance.showRollTipsMsg("已在好友列表中！");
            }
        }
    }

    private onTabChange(index:number,btn:Laya.Button) {
        if(this.curIndex != index)
        {
            this.curIndex = index;
        }
        this.updateData();
        this.updateBoxVisiBle();
    }

    private find():void
    {
        if(this.txt_name.text)
        {
            SFriendData.instance.curName = this.txt_name.text;
            this.parent.event(SFriendEvent.FRIEND_REQUEST_FIND,[[this.txt_name.text]]);
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("请先输入需要查找的玩家姓名！");
        }
    }

    private fresh():void
    {
        this.request();
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