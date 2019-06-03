import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { SCopyData, SCopyEvent } from "../../../../../../net/data/SCopyData";
import { TongtiantaItem } from "../item/TongtiantaItem";
import { S49001 } from "../../../../../../net/pt/pt_49";
import { ConstVo } from "../../../../../../db/sheet/vo/ConstVo";
import { GameUtils } from "../../../../../utils/GameUtils";
import { TimerUtil } from "../../../../../utils/TimerUtil";
import { HtmlUtils } from "../../../../../utils/HtmlUtils";
import { Alert } from "../../../../compent/Alert";
import { ItemData } from "../../../../compent/data/ItemData";
import { FucManager } from "../../../../manager/FucManager";

export class TongtiantaPanel extends ui.main.TongtiantaPanelUI {
    private itemList: TongtiantaItem[];

    private topY: number = -77;//最上面的Y
    private itemSpaceY: number = 164;//每个Item的间隔

    private info: S49001;


    constructor() {
        super();
    }

    public initComp(): void {
        this.initList();
        this.initFirstList();
        this.initPassList();
        this.request();
        this.initEvent();
        this.updateData();
        this.txt_rank.underline = true;
        this.txt_shop.underline = true;
        this.asked = false;
    }

    private asked: boolean = false;//不知道为什么，服务端，次数总有问题，先屏蔽了重复发请求
    private request(): void {
        if (this.asked) {
            return;
        }
        this.asked = true;
        this.timer.once(10000, this, () => {
            this.asked = false;
        })
        this.parent.event(SCopyEvent.COPY_REQUEST_TTTINFO)
    }

    private initList(): void {
        if (!this.itemList) {
            this.itemList = [];
            for (let i = 0; i < 4; i++) {
                var item = new TongtiantaItem();
                item.x = 0;
                item.y = this.topY + (3 - i) * this.itemSpaceY;
                this.itemList.push(item)
                this.baseContent.addChild(item);
            }
        }
    }

    private initFirstList(): void {
    }

    private initPassList(): void {
    }

    private initEvent(): void {
        this.txt_rank.on(Laya.Event.CLICK, this, this.rankTxtClick);
        this.txt_shop.on(Laya.Event.CLICK, this, this.shopTxtClick);
        this.addTimeBtn.on(Laya.Event.CLICK, this, this.addTimeBtnClick);
    }

    private removeEvent(): void {
        this.txt_rank.off(Laya.Event.CLICK, this, this.rankTxtClick);
        this.txt_shop.off(Laya.Event.CLICK, this, this.shopTxtClick);
        this.addTimeBtn.off(Laya.Event.CLICK, this, this.addTimeBtnClick);
        this.timer.clear(this, this.textLoop);
    }

    public updateData(): void {
        this.info = SCopyData.instance.tttInfo;
        //刷新价格文本
        this.textLoop();
        this.timer.loop(1000, this, this.textLoop);

        //刷新list列表
        var arr: Array<FbVo> = FbVo.getListByType(CopyType.TOWER);
        var nowStage = this.info.cur_floor + 1;
        var showStageData = [];
        for (let i = 0; i < 4; i++) {
            var data = arr[nowStage + i - 1];
            if (data) {
                showStageData.push(data);
            }
        }
        //对list进行布局
        this.topY = showStageData.length >= 4 ? -77 : (4 - showStageData.length) * (-164);
        for (let i = 0; i < 4; i++) {
            var item = this.itemList[i];
            item.y = this.topY + (3 - i) * this.itemSpaceY;
        }
        for (let j = 3; j >= 0; j--) {
            var ele = showStageData[j];
            var item = this.itemList[j];
            if (ele) {
                item.visible = true;
                item.y = this.topY + (3 - j) * this.itemSpaceY;
                (this.itemList[j] as TongtiantaItem).dataSource = ele;
            } else {
                item.visible = false;
            }
        }
    }

    private textLoop(): void {
        var leftTime = this.info.left_times;
        var cfgInitTime = ConstVo.get("TOWER_INIT_COUNT").val;
        if (leftTime >= cfgInitTime) {
            this.leftTimeLb.text = leftTime + "次";
            this.addTimeBtn.x = 220;
        } else {
            var recoverTime = ConstVo.get("TOWER_COUNT_RECOVER_INTERVAL").val + (this.info.recover_time || GameUtils.TimeStamp);
            var rcLeftTime = recoverTime - GameUtils.TimeStamp;
            if (rcLeftTime < 0) {
                rcLeftTime = 0;
                this.request();
            }
            var mm = TimerUtil.mm(rcLeftTime);
            var ss = TimerUtil.ss(rcLeftTime);
            this.leftTimeLb.text = leftTime + "次(" + mm + ":" + ss + ")";
            this.addTimeBtn.x = 263;
        }
    }

    private updateListData(): void {
    }

    private updateItemData(no: number, vo: FbVo): void {
    }

    private rankTxtClick(): void {
        UIManager.instance.openUI(UIID.SYS_TTT_RANK);
    }

    private shopTxtClick(): void {
        UIManager.instance.openUI(UIID.SYS_SHOP, null, 4);
    }

    private addTimeBtnClick(): void {
        var cfgBuyTime = ConstVo.get("TOWER_BUY_DAY").val;
        for (let i = cfgBuyTime.length - 1; i >= 0; i--) {
            var ele = cfgBuyTime[i];
            if (ele[0] - 1 <= this.info.buy_times) {
                var showItem = ele[1][0];
                var newData: ItemData = new ItemData(showItem[0]);

                var str: string = HtmlUtils.addColor("消耗", "#8a5428", 20) +
                    HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", ""), 25, 25) +
                    HtmlUtils.addColor(showItem[1], "#3f8f4f", 20) +
                    HtmlUtils.addColor("购买一次通天塔挑战次数", "#8a5428", 20);
                break;
            }
        }
        Alert.show(str, this, () => {
            this.parent.event(SCopyEvent.COPY_TTT_BUYTIME);
        }, null, null, null, true, "购买次数");
    }

    public removeSelf(): any {
        this.removeEvent();
        super.removeSelf();
    }
}