import { S23003, S23003_1, S23003_2 } from "../../../../../net/pt/pt_23";
import { STaskData } from "../../../../task/STaskData";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { SJJCData } from "../data/SJJCData";
import { MsgManager } from "../../../manager/MsgManager";

export class JJCResultPanel extends ui.main.JJCResultPanelUI {
    private CoolDownTime = 5;//剩余毫秒

    private _rewardData: any = [1, 1];
    private isSuccess: boolean = false;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            { url: "res/atlas/chapter.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        this.GetBtn.on(Laya.Event.CLICK, this, this.onClickGetBtn);
    }

    public removeEvent(): void {
        this.GetBtn.off(Laya.Event.CLICK, this, this.onClickGetBtn);
        this.timer.clear(this, this.onTime);
    }

    public initComp() {
        super.initComp();
        this.initList();
    }

    private initList(): void {
        this.rewardList.itemRender = BaseItem;
        this.rewardList.spaceX = this.rewardList.spaceY = 60;
        this.rewardList.repeatX = 4;
        this.rewardList.repeatY = 3;
        this.rewardList.vScrollBarSkin = "";
        this.rewardList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.rewardList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.rewardList.renderHandler = new Laya.Handler(this, this.onListRender)
    }



    public open(...args): void {
        super.open();

        this.CoolDownTime = 50;
        this.update();

        this.onTime();
        this.timer.loop(1000, this, this.onTime);
    }

    private requestInfo(): void {
    }

    public update(): void {
        var info: S23003 = SJJCData.instance.jjcOneInfo;
        if(!info){
            MsgManager.instance.showRollTipsMsg("服务端没有传S23003过来");
            return
        }
        this.isSuccess = info.result == 1;
        //名字
        this.ResultImage.skin = this.isSuccess ? "chapter/challenge1.png" : "chapter/challenge2.png";
        //排名相关
        if(info.state == 0){
            this.typeImg.visible = false;
            this.rankChangeLb.text = "";
            this.rankChangeLb.color = "#8a5428";
        }else if (info.state == 1){
            this.typeImg.visible = true;
            this.typeImg.skin = "comp/img_arrowup_1.png";
            this.rankChangeLb.text = info.rank_change + "";
            this.rankChangeLb.color = "#00ff00";
        }else if (info.state == 2){
            this.typeImg.visible = true;
            this.typeImg.skin = "comp/img_arrowdown_1.png";
            this.rankChangeLb.text = info.rank_change + "";
            this.rankChangeLb.color = "#ff0000";
        }
        this.rankLb.text = (info.rank != 0 ? info.rank + "" : "99999");
        this.hisRankLb.text = SJJCData.instance.jjcBaseInfo.his_max_rank + "";
        //额外奖励
        if(info.item_2 && info.item_2.length >0){
            var item:S23003_2 = info.item_2[0];
            var itemdata = new ItemData(item.GoodsNo);
            this.exRewardImg.visible = true;
            this.exRewardImg.skin = ResUtils.getItemIcon(itemdata.clientInfo.icon);
            this.exRewardNumLb.text = item.GoodsNum + "";
        }else{
            this.exRewardImg.visible = false;
            this.exRewardNumLb.text = "无";
        }

        this._rewardData = info.item_1;
        this.rewardList.array = info.item_1;
    }

    private onTime(): void {
        if (this.CoolDownTime == 0) {
            var str = `领取奖励`;
            if (!this.isSuccess) {
                str = `退出`;
            }
            this.GetBtn.label = str;
            this.onClickGetBtn();
        }
        else {
            var str = `领取奖励(${this.CoolDownTime}s)`;
            if (!this.isSuccess) {
                str = `退出(${this.CoolDownTime}s)`;
            }
            this.CoolDownTime--;
            this.GetBtn.label = str;
        }
    }

    private onClickGetBtn(): void {
        this.close()
    }

    public close(): void {
        if (!STaskData.instance.mainTaskIsComp) {
            UIManager.instance.openUI(UIID.SYS_MAIN);
            UIManager.instance.openUI(UIID.SYS_OFFLINE_ARENA);
        }
        this.timer.clear(this, this.onTime);
        super.close();
    }


    private onListRender(cell: BaseItem, index: number) {
        var data: S23003_1 = this._rewardData[index];
        if (!data) {
            return;
        }
        var item = new ItemData(data.GoodsNo);
        item.Count = data.GoodsNum || 0;
        cell.setItemStyle(80);
        cell.itemData = item;
        cell.isShowToolTip = true;
        cell.toolTipData = item;
    }

}
