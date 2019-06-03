import { MailInfo } from "../../../compent/data/MailInfo";
import { TimerUtil } from "../../../../utils/TimerUtil";

export class MailItem extends ui.main.MaildItemUI {
    private _isSelect:boolean = false;
    constructor() {
        super();
    }

    private mData:MailInfo;

    public set dataSource(data:MailInfo)
    {
        if(!data) return;
        this.mData = data;
        this.updateData();
    }

    private async updateData()
    {
        this.txt_title.text = this.mData.title;
        this.txt_time.text = TimerUtil.getStrTimeByDate(new Date(this.mData.startStamp*1000));
        this.img_select.visible = this._isSelect;
        this.updateNew();
    }

    private updateNew():void
    {
        if(this.mData.state == 0)
        {
            this.img_new.visible = true;
            this.img_icon.skin = "comp/img_mail_new.png";
        }
        else
        {
            this.img_new.visible = false;
            this.img_icon.skin = "comp/img_mail_old.png";
        }

        if(this.mData.attach_flag != 0)
        {
            this.img_gift.visible = true;
        }
        else
        {
            this.img_gift.visible = false;
        }
    }

    public get dataSource():MailInfo
    {
        return this.mData;
    }

    public checkSelect(data:any):void
    {
        if(this.mData && data)
        {
            if(this.mData.mailId == data.mailId)
            {
                this._isSelect = true;
            }
            else
            {
                this._isSelect = false;
            }
        }
        else
        {
            this._isSelect = false;
        }
        this.isSelect = this._isSelect;
    }

    public set isSelect(value:boolean)
    {
        this.img_select.visible = value
    }

    public get isRead():boolean
    {
        return this.mData.state == 0?false:true;
    }

    public dispose():void
    {
        
    }

    public removeSelf():any
    {
        super.removeSelf();
    }
}