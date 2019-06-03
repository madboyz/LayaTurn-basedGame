import { BaseProtocol } from './../../../../../net/protocol/BaseProtocol';
import { C19003, C19005, C19005_1, C19007, C19006 } from '../../../../../net/pt/pt_19';
import { SMailData } from '../../../../../net/data/SMailData';
export class MailProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    public send19003(id: number): void {
        var msg: C19003 = new C19003();
        msg.MailId = id;
        this.send(msg);
    }

    public send19005(mailList): void {
        var msg: C19005 = new C19005();
        msg.item_1 = SMailData.instance.wardList;
        this.send(msg);
    }

    public send19007(): void {
        var msg: C19007 = new C19007();
        msg.item_1 = SMailData.instance.wardList;
        this.send(msg);
    }

    //通过ID，其实发的是19005来领取邮件
    public send19004(id: number): void {
        var arr: Array<C19005_1> = [];
        var mail: C19005_1 = new C19005_1();
        mail.MailId = id;
        arr.push(mail);
        var msg: C19005 = new C19005();
        msg.item_1 = arr;
        this.send(msg);
    }

    public send19006(id: number): void {
        var msg: C19006 = new C19006();
        msg.MailId = id;
        this.send(msg);
    }

}