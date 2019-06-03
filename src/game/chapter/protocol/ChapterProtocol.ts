import { BaseProtocol } from "../../../net/protocol/BaseProtocol";
import { C59002, C59003, C59001, C59201, C59202 } from "../../../net/pt/pt_59";

export class ChapterProtocol extends BaseProtocol{
    public send59002()
    {
        var msg:C59002 = new C59002();
        this.send(msg);
    }

    public send59003(chapterId:number , levelId: number)
    {
        var msg:C59003 = new C59003();
        msg.Id = chapterId;
        msg.PassId = levelId;
        this.send(msg)
    }

    public send59001()
    {
        var msg:C59001 = new C59001();
        this.send(msg);
    }

    public send59201()
    {
        var msg:C59201 = new C59201();
        this.send(msg);
    }

    public send59202(no:number)
    {
        var msg:C59202 = new C59202();
        msg.no = no;
        this.send(msg);
    }
}