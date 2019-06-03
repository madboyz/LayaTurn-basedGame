import { GameUtils } from "../../../../utils/GameUtils";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { GoodsVo } from "../../../../../db/sheet/vo/GoodsVo";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SDartData } from "../../../../dart/data/SDartData";
import { SGameData } from "../../../../../net/data/SGameData";
import { MsgManager } from "../../../manager/MsgManager";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class DartLogItem extends ui.main.DartLogItemUI {
    private mData:any;
    constructor() {
        super();
        HtmlUtils.setHtml(this.GoodsText.style,6,24,"left","middle");
        this.RevengeBtn.on(Laya.Event.CLICK,this,this.onClickRevengeBtn);
    }

    public set dataSource(data:any)
    {
        if(!data) return;
        this.mData = data;
        this.updateData();
    }

    public get dataSource():any
    {
        return this.mData;
    }

    private onClickRevengeBtn()
    {
        
        if(SGameData.instance.PLAYFIGHTREPORT)
        {
            MsgManager.instance.showRollTipsMsg("战斗中无法进行该操作!");
            return;
        }
        
        var maxHiJackCount = ConstVo.get("ESCORT_ROB_MAX").val;
        var cutCount = maxHiJackCount - SDartData.instance.MyDartInfo.cur_hijack;
        if(cutCount <= 0)
        {
            MsgManager.instance.showRollTipsMsg("当前劫镖次数不足！");
            return;
        }
        if(!this.mData)return;
        SDartData.instance.protocol.send42010(this.mData.role_id);
    }

    private updateData():void
    {
        
        if(this.mData.news_type == 1)
        {
            this.TitleText.color = this.TypeText.color = "#04a30a";
            this.TitleText.text = `你打劫了${this.mData.name}的镖车,获得大量资源`;
            this.TypeText.text = "截获资源";
            this.RevengeBtn.visible = false;
        }
        else
        {
            this.TitleText.color = this.TypeText.color = "#ff0000";
            this.TitleText.text = `${this.mData.name}打劫了你的镖车`;
            this.TypeText.text = "损失资源";
            this.RevengeBtn.visible = true;
        }
        this.updateTime();
        var str = "";
        for (let i = 0; i < 5; i++) {
            const element = this.mData.item_1[i];
            if(element)
            {
                var vo = GoodsVo.get(element.GoodsNo);
                if(vo)
                {
                    var iconStr =  HtmlUtils.addImage("art/item/" + vo.icon.replace(".png", ""));
                    var numStr = GMath.GetChineseNumber(element.GoodsNum)
                    var count = HtmlUtils.addColor(`x${numStr}`,"#8e5213", 20);
                    str += iconStr+count;
                }
            }
        }
        this.GoodsText.innerHTML = str;
    }

    public updateTime()
    {
        var time = GameUtils.TimeStamp - this.mData.timestamp;
        if(time > 0)
        {
            this.TimeText.text = TimerUtil.getOffLineTime(time);
        }
        else
        {
            this.TimeText.text = "";
        }
    }

    public showBg(show:boolean)
    {
        this.Bg.visible = show;
    }
}

export class DartLogPanel extends ui.main.DartLogPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        this.LogList.itemRender = DartLogItem;
        this.LogList.vScrollBarSkin = "";
        this.LogList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.LogList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
    }

    public open(...args): void {
        this.initWindow(true, true, "押镖记录", 490, 480, 220);
        super.open();
    }

    public update(): void {
    }

    public initEvent():void {
        this.LogList.renderHandler = new Laya.Handler(this, this.onListRender);
    }

    public removeEvent():void {
        
        this.LogList.renderHandler = null;
    }

    private onListRender(cell: DartLogItem, index: number) {
        //var log = SDartData.instance.MyLogs[index];
        var detle = index%2;
        if(detle == 0)
            cell.showBg(true);
        else
        cell.showBg(false);
        //var item: ItemData = this.goods[index];
        //if (!item) return;
        ////cell.clearData();
        //cell.setItemStyle(80);
        ////cell.showName(item.clientInfo.name ,18 ,"#8e5213");
        //cell.itemData = item;
        //cell.isShowToolTip = true;
        //cell.toolTipData = item;
    }

    public close(): void {
        super.close();
        this.LogList.array = null;
    }

}