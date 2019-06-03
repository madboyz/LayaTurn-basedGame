import { MailInfo } from "../../../compent/data/MailInfo";
import { RewardList } from "../../../compent/RewardList";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SMailEvent } from "../../../../../net/data/SMailData";

export class ReadMaildPanel extends ui.main.MailReadPanelUI {
    private info:MailInfo;
    private _rewarldList:RewardList;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    public initComp() {
        super.initComp();
        HtmlUtils.setHtml(this.txt_content.style,6,20,"left","top");
        this.initList();
        this.updateData();
    }

    private initList():void
    {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList",RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 4;
        this._rewarldList.hGap = 20;
        this._rewarldList.vGap = 15;
        this._rewarldList.itemStyle = 80;
        this._rewarldList.x = 98;
        this._rewarldList.y = 427;
        this.addChild(this._rewarldList);
    }


    public update():void
    {
        this.updateData();
    }

    public updateData():void
    {
        this._rewarldList.updateRewards(this.info.itemList);
        this.Title = this.info.title;
        this.txt_content.innerHTML = HtmlUtils.addColor(this.info.content,"#8e5213",20);
    }

    public open(...args): void {
        this.info = args[0];
        this.initWindow(true,true,this.info.title,485,640,125);
        super.open();
    }
    public initEvent():void 
    {
        this.btn_sure.on(Laya.Event.CLICK,this,this.onClick);
    }
    public removeEvent():void
    {
        this.btn_sure.off(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick():void
    {
        if(this.info.attach_flag != 0)
        {
            this.event(SMailEvent.SMAIL_REQUEST_RECEIVEREWARD,[[this.info.mailId]]);
            this.close();
        }
        else
        {
            this.event(SMailEvent.SMAIL_REQUEST_DELETE,[[this.info.mailId]]);
            this.close();
        }
    }

    


    public close(): void {
        this._rewarldList.dispose();
        super.close();
    }
}