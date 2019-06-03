import { MountProtocol } from "../protocol/MountProtocol";
import { MountPanel } from "../panel/MountPanel";
import { SMountEvent, SMountData } from "../../../../../net/data/SmountData";
import { UnLockMountView } from "../panel/UnLockMountView";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";

export class MountControl extends BaseControl {
    private protocol:MountProtocol;
    constructor() {
        super();
        this.panel = new MountPanel();
        this.protocol = new MountProtocol();
    }

    public set panel(value: MountPanel) {
        this.mPanel = value;
    }

    public get panel(): MountPanel {
        return this.mPanel as MountPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SMountEvent.MOUNT_REQUEST_ADVANCE,this,this.onSend60002);
        this.panel.on(SMountEvent.MOUNT_REQUEST_SOARING,this,this.onSend60003);
        this.panel.on(SMountEvent.MOUNT_REQUEST_FEED,this,this.onSend60004);
        this.panel.on(SMountEvent.MOUNT_REQUEST_TRANSMOGRIFICATION,this,this.onSend60005);

        SMountData.instance.on(SMountEvent.MOUNT_UPDATE_INFO,this,this.onUpdate);
        SMountData.instance.on(SMountEvent.MOUNT_STAR_LEVEL,this,this.onUnlockMount);

        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.onUpdate);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.onUpdate);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.onUpdate);
    }
    private removeEvent() {
        this.panel.off(SMountEvent.MOUNT_REQUEST_ADVANCE,this,this.onSend60002);
        this.panel.off(SMountEvent.MOUNT_REQUEST_FEED,this,this.onSend60004);
        this.panel.off(SMountEvent.MOUNT_REQUEST_SOARING,this,this.onSend60003);
        this.panel.off(SMountEvent.MOUNT_REQUEST_TRANSMOGRIFICATION,this,this.onSend60005);

        SMountData.instance.off(SMountEvent.MOUNT_UPDATE_INFO,this,this.onUpdate);
        SMountData.instance.off(SMountEvent.MOUNT_STAR_LEVEL,this,this.onUnlockMount);
        
        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE, this, this.onUpdate);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE, this, this.onUpdate);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD, this, this.onUpdate);
    }

    public get getEvent(): Array<any> {
        return [NotityEvents.MOUNT_TRANS];
    }
    public excuting(notity: NotityData): void {
        var event: any = notity.event;
        var data: any = notity.data;
        var funList: Function[] = [];

        funList[NotityEvents.MOUNT_TRANS] = this.onSend60005;
        var fun: Function = funList[event];
        fun.call(this, [notity.data]);
    }

    private onUpdate():void
    {
        this.panel.updateData();
    }

    private onUnlockMount():void
    {
        if(SMountData.instance.curInfo.curStarInfo.body_anim)
        {
            UnLockMountView.show();
        }
    }

    private onSend60002():void
    {
        this.protocol.send60002();
    }

    private onSend60003():void
    {
        this.protocol.send60003();
    }

    private onSend60004(obj:any):void
    {
        this.protocol.send60004.apply(this.protocol,obj);
    }

    private onSend60005(obj:any):void
    {
        this.protocol.send60005.apply(this.protocol,obj);
    }
}