import { S19003_1, S19002_1, S19003, S19008 } from "../../../../net/pt/pt_19";
import { ItemData } from "./ItemData";

export class MailInfo {
    public mailId:number;//邮件ID
    public type:number;//邮件类型
    public title:string//标题
    public state:number;//0->未读，1->已读
    public startStamp:number;//开始时间戳
    public endStamp:number;//到期时间戳
    public attach_flag:number;//是否有附件（0->无1->有）
    public sendName:string//发件人姓名
    public content:string//内容
    public item_1 : S19003_1[];
    constructor() {
        
    }

    public initMaild(data:S19002_1|S19008,type:number):void
    {
        this.mailId = data.MailId;
        this.title = data.Title;
        this.type = type;
        if(data instanceof S19002_1)
        {
            this.state = data.State;
            this.startStamp = data.StartStamp;
            this.endStamp = data.SndStamp;
        }
        else
        {
            this.state = 0;
            this.startStamp = Date.now()/1000;
            this.endStamp = -1;

        }
        this.attach_flag = data.Attach_Flag;
    }

    public initInfo(data:S19003):void
    {
        this.sendName = data.SendName;
        this.content = data.Content;
        this.item_1 = data.item_1;
    }

    public get itemList():Array<ItemData>
    {
        var arr:Array<ItemData> = [];
        var data:ItemData;
        if(this.item_1 && this.item_1.length > 0)
        {
            for (let index = 0; index < this.item_1.length; index++) {
                var element = this.item_1[index];
                data = new ItemData(element);
                data.Count = element.Num;
                data.serverInfo.Quality = element.Quality;
                arr.push(data);
            }
            return arr;
        }
        return null;
    }
}