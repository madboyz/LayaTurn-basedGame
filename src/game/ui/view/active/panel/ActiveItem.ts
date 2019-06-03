import { ActiveInfo, ActiveState, ActiveUitl } from "../data/ActiveInfo";
import { RewardList } from "../../../compent/RewardList";
import { ItemData } from "../../../compent/data/ItemData";
import { MsgManager } from "../../../manager/MsgManager";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { ToolTipsManager } from "../../../manager/ToolTipsManager";
import { CommonDesTips } from "../../../compent/CommonDesTips";
import { Debug } from "../../../../../debug/Debug";
import { FucManager } from "../../../manager/FucManager";

export class ActiveItem extends ui.main.ActiveItemUI {

    private _renderClass: any;
    private _tooltipData: any
    constructor() {
        super();
        this.OpenBtn.on(Laya.Event.CLICK, this, this.OnClickOpenBtn);
        this.GotoBtn.on(Laya.Event.CLICK, this, this.OnGotoBtn);
        this.goodsList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this.goodsList.showNameNum = false;
        this.goodsList.rowCount = 4;
        this.goodsList.maxNum = 4;
        this.goodsList.itemStyle = 60;
        this.goodsList.x = 21;
        this.goodsList.y = 84;
        this.addChild(this.goodsList);
        this.cacheAs = "bitmap";
    }


    public set renderClass(value: any) {
        this._renderClass = value;
    }
    public get renderClass(): any {
        if (this._renderClass) {
            return this._renderClass;
        }
    }

    public set toolTipData(value: any) {
        this._tooltipData = value;
    }

    public get toolTipData(): any {
        return this._tooltipData;
    }

    private goodsList: RewardList;
    private mData: ActiveInfo = null;
    public set dataSource(data: ActiveInfo) {
        if (!data) return;
        this.mData = data;
        try {
            this.bgImg.skin = this.mData.Sheet.res;
            var lvEnough: boolean = SRoleData.instance.info.Lv >= this.mData.Sheet.level;
            if (lvEnough) {
                this.tipsText.color = this.TimeText.color = "#8e5213";
                this.tipsText.text = "活动时间：";
                this.TimeText.text = this.mData.Sheet.showTime;
            } else {
                this.tipsText.color = this.TimeText.color = "#ff0000";
                this.tipsText.text = "参与等级：";
                this.TimeText.text = this.mData.Sheet.level + "级";
            }
            this.NameText.text = this.mData.Sheet.activityName;
            var count = this.mData.maxNum - this.mData.useNum;
            this.NumText.text = this.mData.maxNum == 0 ? "" : `${count}/${this.mData.maxNum}`;
            this.NumText.color = count == 0 ? "#ff0000" : "#00b007";
            this.titleTipsLb.text = this.mData.maxNum == 0 ? "不限次数" : "剩余次数:";
            var itemdataList = new Array<ItemData>();
            for (let i = 0; i < this.mData.Sheet.output.length; i++) {
                const goodsId = this.mData.Sheet.output[i];
                var item: ItemData = new ItemData(goodsId);
                if (item.clientInfo != null && item.clientInfo.no != null)
                    itemdataList.push(item);
            }
            this.goodsList.updateRewards(itemdataList);
            if (this.mData.state == ActiveState.Continue && lvEnough && count > 0) {
                this.redDot.visible = true;
            } else {
                this.redDot.visible = false;
            }
            this.toolTipData = this.mData.Sheet.dec;
            this.renderClass = CommonDesTips;
        }
        catch (e) {
            Debug.serverLog(e);
        }
    }

    public dispose(): void {
        ToolTipsManager.instance.unregister(this);
    }

    public get dataSource(): ActiveInfo {
        return this.mData;
    }

    private OnClickOpenBtn() {
        if (!this.mData)
            return;
        ToolTipsManager.instance.show(this);
    }

    private OnGotoBtn() {
        if (!this.mData)
            return;
        var lvEnough: boolean = SRoleData.instance.info.Lv >= this.mData.Sheet.level;
        if (!lvEnough) {
            MsgManager.instance.showRollTipsMsg("角色等级不足");
            return;
        }
        if (this.mData.state == ActiveState.End) {
            MsgManager.instance.showRollTipsMsg(`${this.mData.Sheet.activityName}活动未开启!`)
            return;
        }
        var actionCfg = this.mData.Sheet.action;
        var sysName: string = actionCfg[0];
        var count = this.mData.maxNum - this.mData.useNum;
        if (count <= 0 && this.mData.maxNum != 0 && UIID[sysName] != UIID.DART_PANEL) {
            MsgManager.instance.showRollTipsMsg("剩余次数不足");
            return;
        }
        if (actionCfg && actionCfg.length > 0) {
            if (UIID[sysName] != UIID.FUNC_SHOW_WORD && UIID[sysName] != UIID.FUNC_GOTO_YZMG && UIID[sysName] != UIID.WUDAOHUI_PANEL&& UIID[sysName] != UIID.DART_PANEL) {//显示提示就不关面板
                UIManager.instance.closeUI(UIID.SYS_ACTIVITY);
                UIManager.instance.closeUI(UIID.SYS_MAIN);
            }
            FucManager.doCfgAction(actionCfg);
        }
        // ActiveUitl.DoAction(this.mData.Sheet.proc_name);
    }
}