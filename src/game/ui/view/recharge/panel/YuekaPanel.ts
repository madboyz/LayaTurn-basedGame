import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { ItemData } from "../../../compent/data/ItemData";
import { RewardList } from "../../../compent/RewardList";
import { SdkManager } from "../../../../../net/SdkManager";
import { SRechargeData, SRechargeEvent } from "../data/SRechargeData";
import { Rmb_shopVo } from "../../../../../db/sheet/vo/Rmb_shopVo";

export class YuekaPanel extends ui.main.YuekaPanelUI {
    private _rewarldList: RewardList;

    constructor() {
        super();
        this.mResouce = [
        ];
    }

    public initEvent(): void {
        this.sureBtn.on(Laya.Event.CLICK, this, this.sureBtnClick);

        SRechargeData.instance.on(SRechargeEvent.REFRESH_YUEKA_DATA, this, this.updateData);
    }

    public removeEvent(): void {
        this.sureBtn.off(Laya.Event.CLICK, this, this.sureBtnClick);

        SRechargeData.instance.off(SRechargeEvent.REFRESH_YUEKA_DATA, this, this.updateData);
    }

    public initComp() {
        super.initComp();
        HtmlUtils.setHtml(this.tipsLb1.style, 6, 20, "left", "middle");
        this.tipsLb1.color = "#8e5213";
        HtmlUtils.setHtml(this.tipsLb2.style, 6, 20, "left", "middle");
        this.tipsLb2.color = "#8e5213";
        HtmlUtils.setHtml(this.tipsLb3.style, 6, 20, "left", "middle");
        this.tipsLb3.color = "#8e5213";
        HtmlUtils.setHtml(this.tipsLb4.style, 6, 20, "left", "middle");
        this.tipsLb4.color = "#8e5213";

        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        // this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 6;
        this._rewarldList.maxNum = 6;
        this._rewarldList.hGap = 5;
        this._rewarldList.itemStyle = 75;
        this.rewardBox.addChild(this._rewarldList);
    }

    public open(...args): void {
        this.initWindow(true, true, "月 卡", 550, 750, 50);
        super.open();
        this.onOpen();
        this.updateData();
    }

    public onOpen(): void {
        var cfg = Rmb_shopVo.get(1);
        var itemListcfg = cfg.get_goods;
        var itemList = [];
        for (let i = 0; i < itemListcfg.length; i++) {
            var itemcfg = itemListcfg[i];
            var item: ItemData = new ItemData(itemcfg[0]);
            item.Count = itemcfg[1];
            itemList.push(item);
        }
        this._rewarldList.updateRewards(itemList);

        var money = cfg.feedback_goods[0][1];
        var addTime = cfg.extra[0][1];
        var changeStr = cfg.extra[1][1] * 100 + "%";

        this.tipsLb1.innerHTML = "1.每日登陆领取" + HtmlUtils.addColor(money, "#ff0000", 20) + "绑元，30天累计可得"
            + HtmlUtils.addColor(money * 30 + "", "#ff0000", 20) + "绑元。";
        this.tipsLb2.innerHTML = "2.野外挂机额外获得" + HtmlUtils.addColor(changeStr, "#ff0000", 20) + "经验加成，助力飞速升级！";
        this.tipsLb3.innerHTML = "3.开启" + HtmlUtils.addColor("一键扫荡", "#ff0000", 20) + "功能，解放双手,轻松游戏。";
        this.tipsLb4.innerHTML = "4.离线奖励上限额外增加" + HtmlUtils.addColor(addTime + "小时", "#ff0000", 20) + "收益" + HtmlUtils.addColor("翻倍", "#ff0000", 20) + "。";
    }

    public updateData(): void {
        var data = SRechargeData.instance.yuekaData;
        var hadRecharge = data.Bought == 1;
        var hadGet = data.Rewarded == 1;
        var cfg = Rmb_shopVo.get(1)
        this.sureBtn.label = hadRecharge ? (hadGet ? "今日已领取" : "领取绑元") : "购买（" + cfg.money + "元)";
        this.sureBtn.gray = hadGet;
    }

    public sureBtnClick(): void {
        var data = SRechargeData.instance.yuekaData;
        var hadRecharge = data.Bought == 1;
        var hadGet = data.Rewarded == 1;
        if (!hadRecharge) {
            var cfg = Rmb_shopVo.get(1);
            SdkManager.instance.Pay(1, cfg.money);
        } else if (!hadGet) {
            SRechargeData.instance.protocol.send13094();
        }

    }

}
