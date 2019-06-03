import { MailItem } from "../item/MailItem";
import { SMailData, SMailEvent } from "../../../../../net/data/SMailData";
import { MsgManager } from "../../../manager/MsgManager";

export class MailPanel extends ui.main.MailPanelUI {
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.updateData();
    }

    private initList():void
    {
        this.list.itemRender = MailItem;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list.selectEnable = true;
        this.list.selectHandler = Laya.Handler.create(this,this.onListChangeHandler,null,false);
        this.list.mouseHandler = Laya.Handler.create(this,this.onClickSkill,null,false);
        this.list.selectedIndex = -1;
    }

    public update():void
    {
        this.list.array = SMailData.instance.mailList;
        this.list.selectedIndex = -1;
        this.noDataBox.visible = SMailData.instance.mailList.length <= 0;
    }

    public updateData():void
    {
        this.list.array = SMailData.instance.mailList;
        this.list.selectedIndex = -1;
        this.noDataBox.visible = SMailData.instance.mailList.length <= 0; 
    }

    public open(...args): void {
        this.initWindow(true,true,"邮件",485,686,35);
        super.open();
    }
    public initEvent():void 
    {
        this.btn_reAll.on(Laya.Event.CLICK,this,this.all);
    }
    public removeEvent():void
    {
        this.btn_reAll.off(Laya.Event.CLICK,this,this.all);
    }

    private oldItem:any;
    private selectInfo:MailItem;
    private onListChangeHandler():void
    {
        this.oldItem = this.list.selectedItem;
        this.selectInfo = this.list.getCell(this.list.selectedIndex) as MailItem;
        Laya.timer.callLater(this,this.changeSelect);
    }

    private changeSelect():void
    {
        var i:number = 0,cells:Array<any> = this.list.cells,len:number = cells.length,cell:any;
        for (i ; i < len ; i ++){
            cell = cells[i];
            cell && cell.checkSelect(this.oldItem);
        }
    }

    private onClickSkill(e:Laya.Event):void
    {
        if(e.type != Laya.Event.CLICK)
        {
            return;
        }

        // if(this.selectInfo.isRead)
        // {
        //     UIManager.instance.openUI(UIID.SYS_READMAIL,UILEVEL.POP_3,this.selectInfo.dataSource);
        // }
        // else
        // {
            this.event(SMailEvent.SMAIL_REQUEST_READ,[[this.selectInfo.dataSource.mailId]]);
        // }
    }

    private all():void
    {
        if(SMailData.instance.wardList.length > 0)
        {
            this.event(SMailEvent.SMAIL_REQUEST_REVEIVEALLREWARD);
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("暂无附件可以领取！");
        }
    }

    public close(): void {
        super.close();
    }
}