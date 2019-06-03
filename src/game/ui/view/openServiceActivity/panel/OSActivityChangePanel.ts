import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { Npc_goods_exchangeVo } from "../../../../../db/sheet/vo/Npc_goods_exchangeVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { SOpenServiceActivityData, SOpenServiceActivityEvent } from "../data/SOpenServiceActivityData";
import { TimerUtil } from "../../../../utils/TimerUtil";

//开服兑换活动
export class OSActivityChangePanel extends ui.main.OSActivityChangePanelUI {
    public cfgs: Array<number>;

    constructor() {
        super();
        this.initEvent();
        this.initComp();
        this.requestInfo();
    }

    private requestInfo(): void {
    }

    private initEvent(): void {
        SOpenServiceActivityData.instance.on(SOpenServiceActivityEvent.ALL_CHANGE_TIME_REFRESH, this, this.updateData);
    }

    private removeEvent(): void {
        SOpenServiceActivityData.instance.off(SOpenServiceActivityEvent.ALL_CHANGE_TIME_REFRESH, this, this.updateData);
    }

    public initComp() {
        this.initList();
        //list列表
        this.cfgs = ConstVo.get("DUIHUANID").val;
        var data = SOpenServiceActivityData.instance.getActiveData(2);
        var start_time = new Date(data.start_time*1000); 
        var end_time = new Date(data.end_time*1000); 
        this.timeLb.text = "活动时间：" + TimerUtil.getStrDate2(start_time)  + "-" + TimerUtil.getStrDate2(end_time);
    }


    private initList(): void {
        this.itemList.itemRender = OSActivityChangeItem;
        this.itemList.vScrollBarSkin = "";
    }

    public updateData(): void {
        this.itemList.array = this.cfgs;
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }
}


//道具的奖励ITEM
export class OSActivityChangeItem extends ui.main.OSActivityChangeItemUI {
    private _mData: number;
    private _index: number;
    private _item1: BaseItem;
    private _item2: BaseItem;
    private _item3: BaseItem;
    private _item4: BaseItem;
    private _itemGet: BaseItem;

    constructor() {
        super();
        this.changeBtn.on(Laya.Event.CLICK, this, this.changeBtnClick);
        for (let i = 1; i <= 4; i++) {
            var item = this["_item" + i] = new BaseItem;
            (this["item" + i] as Laya.Box).addChild(item);
            item.setItemStyle(60);
            item.x = i == 1 ? 0 : 30;
            var lb = this["numLb" + i] as Laya.HTMLDivElement;
            HtmlUtils.setHtml(lb.style, 6, 20, "center", "middle");
        }
        this._itemGet = new BaseItem;
        this._itemGet.setItemStyle(60);
        this._itemGet.x = 30;
        this.itemGet.addChild(this._itemGet);
    }

    public set dataSource(data: number) {
        if (!data) return;
        this._mData = data;
        var timeData = SOpenServiceActivityData.instance.getOSChangeData(this._mData);
        var cfg = Npc_goods_exchangeVo.get(this._mData);
        var maxTime = cfg.limit_time;
        var needGood = cfg.need_goods_list;
        var changeGood = cfg.goods_no;
        var canChange = true;

        var count: number = 0;
        for (let i = 1; i <= 4; i++) {
            var itemCellCfg = needGood[i - 1];
            if (itemCellCfg) {
                var itemCell = this["_item" + i] as BaseItem;
                var itemData = new ItemData(itemCellCfg[0]);
                itemCell.itemData = itemData;
                itemCell.toolTipData = itemData;
                var num = SBagData.instance.prop.getItemCountByGoodsNo(itemCellCfg[0]);

                var lb = this["numLb" + i] as Laya.HTMLDivElement;
                lb.innerHTML = HtmlUtils.addColor(num + "/" + itemCellCfg[1],num >= itemCellCfg[1] ? "#00b007" : "#ff0000",18)
                // itemCell.setAmountLabel("x" + itemCellCfg[1], num > itemCellCfg[1] ? "#4e17cd" : "#ff0000");
                canChange = canChange && num >= itemCellCfg[1];

                this["item" + i].visible = true;
                (i > 1) && (this["item" + i].x = -25 + count * 95);
                count++;
            } else {
                this["item" + i].visible = false;
            }
        }
        var itemData = new ItemData(changeGood[0][0]);
        this._itemGet.itemData = itemData;
        this._itemGet.toolTipData = itemData;
        this._itemGet.setAmountLabel("" + changeGood[0][1], "#4e17cd");
        this.itemGet.x = -25 + count * 95;
        //次数限制相关
        this.NameText.text = maxTime == 0 ? "不限次数" : "剩余次数:";
        var leftTime = maxTime - (timeData ? timeData.Num : 0);
        this.NumText.text = maxTime == 0 ? "" : (leftTime + "次");
        this.NumText.color = leftTime <= 0 ? "#ff0000" : "#00b007";
        this.changeBtn.gray = leftTime <= 0;
        canChange = canChange && (maxTime == 0 || leftTime > 0);
        this.changeBtn.refreshRed(canChange);
    }

    private changeBtnClick(): void {
        SOpenServiceActivityData.instance.protocol.send32010(this._mData);
    }

    public destroy(): void {
        super.destroy()
    }

}