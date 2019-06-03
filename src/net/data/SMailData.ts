import { DataManager } from "../../message/manager/DataManager";
import { S19002, S19003, S19004, S19005, S19006, S19007, S19008, C19005_1, C19005 } from "../pt/pt_19";
import { MailInfo } from "../../game/ui/compent/data/MailInfo";
import { MailControl } from "../../game/ui/view/mail/control/MailControl";
import { CommonProtocol } from "../../game/common/protocol/CommonProtocol";
import { CommonControl } from "../../game/common/control/CommonControl";

export class SMailData extends  Laya.EventDispatcher{
    private static _instance: SMailData;
    private _mailList:Array<MailInfo> = [];
    constructor() {
        super();
    }

    public static get instance(): SMailData {
        return SMailData._instance || (SMailData._instance = new SMailData());
    }

    public unRegisterEvent(): void {
        DataManager.cancel(PROTOCOL.E19002, this, this.onS19002);//获得邮件简要信息列表
        DataManager.cancel(PROTOCOL.E19003, this, this.onS19003);//查看具体邮件信息
        DataManager.cancel(PROTOCOL.E19004, this, this.onS19004);//收取邮件
        DataManager.cancel(PROTOCOL.E19005, this, this.onS19005);//一键收取邮件
        DataManager.cancel(PROTOCOL.E19006, this, this.onS19006);//删除邮件
        DataManager.cancel(PROTOCOL.E19007, this, this.onS19007);//一键删除邮件
        DataManager.cancel(PROTOCOL.E19008, this, this.onS19008);//新邮件提醒
        this._mailList = [];
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E19002, this, this.onS19002);//获得邮件简要信息列表
        DataManager.listen(PROTOCOL.E19003, this, this.onS19003);//查看具体邮件信息
        DataManager.listen(PROTOCOL.E19004, this, this.onS19004);//收取邮件
        DataManager.listen(PROTOCOL.E19005, this, this.onS19005);//一键收取邮件
        DataManager.listen(PROTOCOL.E19006, this, this.onS19006);//删除邮件
        DataManager.listen(PROTOCOL.E19007, this, this.onS19007);//一键删除邮件
        DataManager.listen(PROTOCOL.E19008, this, this.onS19008);//新邮件提醒
    }

    private onS19002(data:S19002)
    {
        var info:MailInfo;
        for (let index = 0; index < data.item_1.length; index++) {
            const element = data.item_1[index];
            if(this.getMailInfo(element.MailId) == null)
            {
                info = new MailInfo();
                info.initMaild(element,data.Type);
                this._mailList.push(info);
            }
        }
    }

    private onS19003(data:S19003)
    {
        if(this.getMailInfo(data.MailId))
        {
            this.getMailInfo(data.MailId).state = 1;
            this.getMailInfo(data.MailId).initInfo(data);
        }
        UIManager.instance.openUI(UIID.SYS_READMAIL,[this.getMailInfo(data.MailId)]);
        this.event(SMailEvent.SMAIL_UPDATE);
    }

    private onS19004(data:S19004)
    {
        if(this.getMailInfo(data.MailId))
        {
            this.getMailInfo(data.MailId).attach_flag = 0;
            this.getMailInfo(data.MailId).item_1 = [];
        }
        this.event(SMailEvent.SMAIL_UPDATE);
    }

    private onS19005(data:S19005)
    {
        for (let index = 0; index < data.item_2.length; index++) {
            const element = data.item_2[index];
            if(this.getMailInfo(element.MailId))
            {
                this.getMailInfo(element.MailId).attach_flag = 0;
                this.getMailInfo(element.MailId).item_1 = [];
            }
        }
        this.event(SMailEvent.SMAIL_UPDATE);
        //收到奖励的邮件，加上直接删除
        CommonControl.instance.send19007(data);
    }

    private onS19006(data:S19006)
    {
        this.deleteMaild(data.MailId);
        this.event(SMailEvent.SMAIL_UPDATE);
    }

    private onS19007(data:S19007)
    {
        for (let index = 0; index < data.item_2.length; index++) {
            var element = data.item_2[index];
            this.deleteMaild(element.MailId);
        }
        this.event(SMailEvent.SMAIL_UPDATE);
    }

    private onS19008(data:S19008)
    {
        var info:MailInfo;
        if(this.getMailInfo(data.MailId) == null)
        {
            info = new MailInfo();
            info.initMaild(data,data.Type);
            this._mailList.push(info);
        }
    }

    public get wardList():Array<C19005_1>
    {
        var arr:Array<C19005_1> = [];
        var info:C19005_1;
        for (let index = 0; index < this._mailList.length; index++) {
            var element = this._mailList[index];
            if(element.attach_flag != 0)
            {
                info = new C19005_1();
                info.MailId = element.mailId;
                arr.push(info);
            }
        }
        return arr;
    }

    public getMailInfo(id:number):MailInfo
    {
        for (let index = 0; index < this._mailList.length; index++) {
            var element = this._mailList[index];
            if(element.mailId == id)
            {
                return element;
            }
        }
    }

    private deleteMaild(id:number):void
    {
        for (let index = 0; index < this._mailList.length; index++) {
            var element = this._mailList[index];
            if(element.mailId == id)
            {
                this._mailList.splice(index,1);
            }
        }
    }

    public get mailList():Array<MailInfo>
    {
        this._mailList.sort(this.sortMail);
        return this._mailList;
    }

    public sortMail(a:MailInfo,b:MailInfo):number
    {
        if(a.state == 0 && b.state == 0)
        {
            if(a.mailId < b.mailId)
            {
                return -1;
            }
            else
            {
                return 1;
            }
        }
        else if(a.state == 0 && b.state != 0)
        {
            return -1;
        }
        else if(a.state != 0 && b.state == 0)
        {
            return -1;
        }
        else
        {
            if(a.mailId < b.mailId)
            {
                return -1;
            }
            else
            {
                return 1;
            }
        }
    }

    public get showRed():boolean
    {
        for (let index = 0; index < this._mailList.length; index++) {
            var element = this._mailList[index];
            if(element.state == 0)
            {
                return true;
            }   
        }
        return false;
    }
}

export enum SMailEvent{
    SMAIL_REQUEST_READ = "smail_request_read",
    SMAIL_REQUEST_DELETE = "smail_request_delete",
    SMAIL_REQUEST_RECEIVEREWARD = "smail_request_receivedReward",
    SMAIL_REQUEST_REVEIVEALLREWARD = "smail_request_receivedAllReward",
    SMAIL_REQUEST_DELETEALL  = "smail_request_deleteAll",
    SMAIL_UPDATE = "smail_update",
}