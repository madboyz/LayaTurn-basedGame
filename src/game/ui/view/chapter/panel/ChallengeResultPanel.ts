import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { SChapterData } from "../../../../chapter/SChapterData";
import { Fight_lost_cfgVo } from "../../../../../db/sheet/vo/Fight_lost_cfgVo";
import { FucManager } from "../../../manager/FucManager";
import { ToolTipsManager } from "../../../manager/ToolTipsManager";
import { HtmlUtils } from "../../../../utils/HtmlUtils";

export class ChallengeResultPanel extends ui.main.ChallengeResultPanelUI {
    private showCallBack:boolean = true;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

            { url: "res/atlas/chapter.atlas", type: Laya.Loader.ATLAS },
        ];
    }
    private goods: Array<ItemData> = null;
    private ResultCode: number = 1;//0成功1失败 -1不显示
    private isBattle: boolean = false;
    private call: Function;
    private CoolDownTime = 10;//剩余毫秒
    public initComp() {
        super.initComp();
        this.initList();
        HtmlUtils.setHtml(this.DesLabel.style,6,20,"center","middle");
    }

    private initList(): void {
        this.ItemList.itemRender = BaseItem;
        this.ItemList.spaceX = this.ItemList.spaceY = 65;
        this.ItemList.repeatX = 4;
        this.ItemList.repeatY = 3;
        this.ItemList.vScrollBarSkin = "";
        this.ItemList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.ItemList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.ItemList.renderHandler = new Laya.Handler(this, this.onListRender)

        this.lostList.renderHandler = new Laya.Handler(this, this.updateLostItem)
        this.lostList.vScrollBarSkin = "";
    }

    public open(...args): void {
        this.CoolDownTime = 5;
        this.ResultCode = args[0];
        this.isBattle = args[2];
        this.call = args[3];
        this.showCallBack = true;
        super.open();
        this.goods = [];
        if (this.ResultCode == 0) {
            this.ResultImage.visible = true;
            this.goods = args[1];
            this.ResultImage.skin = "chapter/challenge1.png";
            this.ItemList.array = this.goods;
            this.lostList.array = [];
            this.ItemList.visible = true;
            this.lostList.visible = false;
        }
        else if (this.ResultCode == -1) {
            this.ResultImage.visible = false;
            this.goods = args[1];
            this.ItemList.array = [];
            this.lostList.array = [];
            this.ItemList.visible = false;
            this.lostList.visible = false;
        }
        else {
            this.ResultImage.visible = true;
            this.ResultImage.skin = "chapter/challenge2.png";
            this.ItemList.array = [];
            this.lostList.array = Fight_lost_cfgVo.getAll();
            this.ItemList.visible = false;
            this.lostList.visible = true;
        }
        if(args[4])
        {
            this.DesLabel.innerHTML = args[4]; 
        }
        else
        this.DesLabel.innerHTML = "";
        this.onTime();
        Laya.timer.loop(1000, this, this.onTime);
    }

    public initEvent(): void {
        this.GetBtn.on(Laya.Event.CLICK, this, this.onClickGetBtn);
    }

    public removeEvent(): void {
        this.GetBtn.off(Laya.Event.CLICK, this, this.onClickGetBtn);
    }

    private onClickGetBtn(): void {
        UIManager.instance.closeUI(this.index);
    }
    private onTime(): void {
        if (this.CoolDownTime == 0) {
            var str = `领取奖励`;
            if (this.ResultCode == 1) {
                str = `退出`;
            }
            this.GetBtn.label = str;
            this.onClickGetBtn();
        }
        else {
            var str = `领取奖励(${this.CoolDownTime}s)`;
            if (this.ResultCode == 1) {
                str = `退出(${this.CoolDownTime}s)`;
            }
            this.CoolDownTime--;
            this.GetBtn.label = str;
        }

    }

    public close(): void {

        if (this.call && this.showCallBack) {
            this.call.apply(this);
        }
        else {
            if (!this.isBattle)
                SChapterData.instance.RequestGetChapterAward();
        }
        this.call = null;
        this.goods = [];
        this.ItemList.array = null;
        ToolTipsManager.instance.hide();
        //this.clearListData();
        Laya.timer.clear(this, this.onTime);
        super.close();
    }

    private clearListData(): void {
        for (let index = 0; index < this.ItemList.cells.length; index++) {
            var element: BaseItem = this.ItemList.cells[index];
            element.clearData();
            element = null;
        }
    }

    private onListRender(cell: BaseItem, index: number) {
        var item: ItemData = this.goods[index];
        if (!item) return;
        cell.setItemStyle(80);
        cell.itemData = item;
        cell.isShowToolTip = true;
        cell.toolTipData = item;
        
    }

    //属性列表
    private updateLostItem(cell: Laya.View, index: number): void {
        var showImg = (cell.getChildByName("showImg") as Laya.Image);
        var showLb = (cell.getChildByName("showLb") as Laya.Text);
        var cfg = Fight_lost_cfgVo.get(index + 1);
        showImg.skin = cfg.res[1];
        showLb.text = cfg.sys_name;
        cell.on(Laya.Event.CLICK, cell, () => {
            this.showCallBack = false;
            this.close();
            FucManager.doCfgAction(cfg.action);
        })
    }

}
