import { FriendPanel } from "../panel/FriendPanel";
import { FriendProtocol } from "../protocol/FriendProtocol";
import { SFriendEvent, SFriendData } from "../../../../../net/data/SFriendData";

export class FriendControl extends BaseControl {
    private protocol:FriendProtocol;
    constructor() {
        super();
        this.panel = new FriendPanel();
        this.protocol = new FriendProtocol();
        this.initEvent();
    }

    public set panel(value: FriendPanel) {
        this.mPanel = value;
    }

    public get panel(): FriendPanel {
        return this.mPanel as FriendPanel;
    }

    openView(...args) {
        if(UIManager.instance.hasOpenUI(UIID.SYS_MAIN) == false)
        {
            UIManager.instance.openUI(UIID.SYS_MAIN);
        }
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SFriendData.instance.on(SFriendEvent.FRIEND_RECEIVED_FIND,this,this.updateData);
        SFriendData.instance.on(SFriendEvent.FRIEND_RECEIVED_FRESH,this,this.updateData);
        SFriendData.instance.on(SFriendEvent.FRIEND_ADD_BACK,this,this.updateData);
        SFriendData.instance.on(SFriendEvent.FRIEND_DELETE_BACK,this,this.updateData);

        this.panel.on(SFriendEvent.FRIEND_REQUEST_ADD,this,this.send14001);
        this.panel.on(SFriendEvent.FRIEND_REQUEST_BACKADD,this,this.send14002);
        this.panel.on(SFriendEvent.FRIEND_REQUEST_DELETE,this,this.send14003);
        this.panel.on(SFriendEvent.FRIEND_REQUEST_FIND,this,this.send14010);
        this.panel.on(SFriendEvent.FRIEND_REQUEST_RECEIVEDHEART,this,this.send14014);
        this.panel.on(SFriendEvent.FRIEND_REQUEST_SENDHEART,this,this.send14015);
    }
    private removeEvent() {
        SFriendData.instance.off(SFriendEvent.FRIEND_RECEIVED_FIND,this,this.updateData);
        SFriendData.instance.off(SFriendEvent.FRIEND_RECEIVED_FRESH,this,this.updateData);
        SFriendData.instance.off(SFriendEvent.FRIEND_ADD_BACK,this,this.updateData);
        SFriendData.instance.off(SFriendEvent.FRIEND_DELETE_BACK,this,this.updateData);

        this.panel.off(SFriendEvent.FRIEND_REQUEST_ADD,this,this.send14001);
        this.panel.off(SFriendEvent.FRIEND_REQUEST_BACKADD,this,this.send14002);
        this.panel.on(SFriendEvent.FRIEND_REQUEST_DELETE,this,this.send14003);
        this.panel.off(SFriendEvent.FRIEND_REQUEST_FIND,this,this.send14010);
        this.panel.off(SFriendEvent.FRIEND_REQUEST_RECEIVEDHEART,this,this.send14014);
        this.panel.off(SFriendEvent.FRIEND_REQUEST_SENDHEART,this,this.send14015);
    }

    private updateData():void
    {
        this.panel.updateData();
    }

    private send14001(obj:any):void
    {
        this.protocol.send14001.apply(this.protocol,obj);
    }

    private send14002(obj:any):void
    {
        this.protocol.send14002.apply(this.protocol,obj);
    }

    private send14003(obj:any):void
    {
        this.protocol.send14003.apply(this.protocol,obj);
    }

    private send14010(obj:any):void
    {
        this.protocol.send14010.apply(this.protocol,obj);
    }

    private send14014(obj:any):void
    {
        this.protocol.send14014.apply(this.protocol,obj);
    }

    private send14015(obj:any):void
    {
        this.protocol.send14015.apply(this.protocol,obj);
    }
}