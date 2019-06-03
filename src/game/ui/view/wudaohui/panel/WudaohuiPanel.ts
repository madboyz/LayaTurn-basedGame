import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { AwardUtil } from "../../../../award/AwardUtil";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { SWudaohuiData } from "../data/SWudaohuiData";

export class WudaohuiPanel extends ui.main.WudaohuiPanelUI {
    private _item1: BaseItem;
    private _item2: BaseItem;
    private _item3: BaseItem;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isCloseByNull = false;
        this.mResouce = [
        ];
    }

    public initEvent(): void {
        this.startMatchBtn.on(Laya.Event.CLICK, this, this.startMatchBtnClick);
    }

    public removeEvent(): void {
    }

    public initComp() {
        super.initComp();
        this._item1 = new BaseItem;
        this.itemBox.addChild(this._item1);
        this._item1.setItemStyle(80);
        this._item1.x = 7;

        this._item2 = new BaseItem;
        this.itemBox.addChild(this._item2);
        this._item2.setItemStyle(80);
        this._item2.x = 149;

        this._item3 = new BaseItem;
        this.itemBox.addChild(this._item3);
        this._item3.setItemStyle(80);
        this._item3.x = 291;

        HtmlUtils.setHtml(this.matchingLb.style, 6, 20, "center", "middle");
    }

    private _isMatching: boolean = false;
    private _matchTime: number = 0;

    public open(...args): void {
        this.initWindow(true, true, "武道会", 488, 350, 290);
        super.open();
        this.onOpen();
        this._isMatching = false;
        this._matchTime = 0;
        this.update();
    }

    private onOpen(): void {
        var rewardcfgs = ConstVo.get("GAME_PK1V1_REWARD").val;
        for (let i = 0; i < 3; i++) {
            var cfg = rewardcfgs[i];
            var rewardDatas = AwardUtil.GetNormalGoodsList(cfg[1]);
            var rewardData = rewardDatas[0];
            var item = this["_item" + (i + 1)] as BaseItem;
            item.itemData = rewardData;
            item.toolTipData = rewardData;
        }
        this.getImg1.visible = this.getImg2.visible = this.getImg3.visible = false;
    }

    public update(): void {
        this.updateTxt();
        var WinCount = SWudaohuiData.instance.WinCount || 0;
        var LoseCount = SWudaohuiData.instance.LoseCount || 0;
        var cfgs = ConstVo.get("GAME_PK1V1_REWARD").val;
        for (let i = 1; i <= 3; i++) {
            var cfg = cfgs[i - 1];
            var img = this["getImg" + i] as Laya.Image;
            img.visible = WinCount >= cfg[0];
            var lb = this["winTitleLb" + i] as Laya.Text;
            lb.text = cfg[0] == 1 ? "首胜奖励" : cfg[0] + "胜奖励";
        }
        this.winTimeLb.text = WinCount + "";
        this.loseTimeLb.text = LoseCount + "";
    }

    private startMatchBtnClick(): void {
        if (this._isMatching) {
            return;
        }
        SWudaohuiData.instance.protocol.send27001();
    }

    public startMatch(): void {
        this._isMatching = true;
        this.updateTxt();
        this.timer.loop(1000, this, this.textLoop);
    }

    private textLoop(): void {
        this._matchTime++;
        this.updateTxt();
    }

    public updateTxt(): void {
        if (this._isMatching) {
            this.startMatchBtn.label = "";
            this.matchingLb.innerHTML = HtmlUtils.addColor("正在匹配&nbsp;", "#8a5428", 22) + HtmlUtils.addColor(this._matchTime + "s", "#ff0000", 22);
        } else {
            this.startMatchBtn.label = "开始匹配";
            this.matchingLb.innerHTML = "";
        }
    }

    public close(): void {
        if (this._isMatching) {
            SWudaohuiData.instance.protocol.send27002();
        }
        this._isMatching = false;
        this.timer.clear(this, this.textLoop);
        super.close();
    }
}
