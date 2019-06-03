import { Rank_reward_cfgVo } from "../../../../../../db/sheet/vo/Rank_reward_cfgVo";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { AwardUtil } from "../../../../../award/AwardUtil";
import { RankType } from "../../../rank/panel/RankMainPanel";
import { SRankEvent, RankMainProrocol } from "../../../rank/protocol/RankMainProrocol";
import { TongtiantaRankItem } from "../item/TongtiantaRankItem";
import { S22001_1 } from "../../../../../../net/pt/pt_22";
import { SBossData } from "../../BossCopy/data/SBossData";

export class SanjieCopyRankPanel extends ui.main.SanjieCopyRankPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

            { url: "res/atlas/copy.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.updateData();
    }

    private initList(): void {
        this.list.itemRender = SanjieCopyRankItem;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list.selectEnable = true;
        this.list.selectHandler = Laya.Handler.create(this, this.onListChangeHandler, null, false);
    }

    public update(): void {
        this.updateData();
    }

    public updateData(): void {
        var rankStr: string = "";
        var myRankStr: string = ""

        if (SCopyData.instance.sanjieCopyRankInfo) {
            if (SCopyData.instance.sanjieCopyRankInfo.MyRank <= 0) {
                rankStr = "(未上榜)";
            } else {
                rankStr = "(第" + SCopyData.instance.sanjieCopyRankInfo.MyRank + "名)";
            }
            myRankStr = (SBossData.instance.sanjieDunChapInfo.DunNo - 23001) + "层";
            this.list.array = SCopyData.instance.sanjieCopyRankInfo.item_1;
        } else {
            rankStr = "(未上榜)";
        }
        this.txt_myRank.text = "我得排名：" + myRankStr + rankStr;
    }

    public open(...args): void {
        this.initWindow(true, true, "三界副本排名", 486, 524, 165);
        (new RankMainProrocol().RequsetRank(RankType.SANJIE, 50, 1))
        super.open();
    }
    public initEvent(): void {
    }
    public removeEvent(): void {
    }

    private oldItem: any;
    private selectItem: TongtiantaRankItem;
    private onListChangeHandler(): void {
        this.selectItem = this.list.getCell(this.list.selectedIndex) as TongtiantaRankItem;
        this.oldItem = this.list.selectedItem;
        Laya.timer.callLater(this, this.changeSelect);
    }

    private changeSelect(): void {
        var i: number = 0, cells: Array<any> = this.list.cells, len: number = cells.length, cell: any;
        for (i; i < len; i++) {
            cell = cells[i];
            cell && cell.checkSelect(this.oldItem);
        }
    }

    private rewardLbClick(): void {
        var rankNo = SCopyData.instance.sanjieCopyRankInfo.MyRank;
        var cfgs = Rank_reward_cfgVo.get(RankType.TONGTIANTA).rewards
        if (rankNo == 0 || rankNo == null) {
            //没排名的取最后一个奖励
            var rewardId = cfgs[cfgs.length - 1][1];
        } else {
            for (let i = 0; i < cfgs.length; i++) {
                var cfg = cfgs[i];
                if (rankNo <= cfg[0]) {
                    var rewardId = cfg[1];
                    break;
                }
            }
        }
        var reward = AwardUtil.GetNormalGoodsList(rewardId)
        var rewardNum = reward.length;
        var xnum: number = (rewardNum - 1) % 3 + 1;
        var ynum: number = Math.ceil(rewardNum / 3);
        UIManager.instance.openUI(UIID.COM_POP_REWARD, [
            reward,//奖励
            new Laya.Point(470 - xnum * 90, 570 - ynum * 90),//坐标
        ]);
    }

    public close(): void {
        super.close();
    }
}


export class SanjieCopyRankItem extends ui.main.TongtiantaRankItemUI {
    private _isSelect: boolean = false;
    constructor() {
        super();
    }

    private mData: S22001_1;

    public set dataSource(data: S22001_1) {
        if (!data) return;
        this.mData = data;
        this.updateData();
    }

    private updateData(): void {
        if (this.mData.Rank % 2 != 0) {
            this.bg.visible = false;
        } else {
            this.bg.visible = true;
        }
        this.txt_rank.text = this.mData.Rank.toString();
        this.txt_name.text = this.mData.PlayerName;
        this.txt_num.text = this.mData.item_1[0].Value + "";
        this.txt_fight.text = this.mData.Bp + "";
        this.img_select.visible = this._isSelect;
    }

    public get dataSource(): S22001_1 {
        return this.mData;
    }

    public checkSelect(data: any): void {
        if (this.mData && data) {
            if (this.mData.PlayerId == data.PlayerId) {
                this._isSelect = true;
            } else {
                this._isSelect = false;
            }
        } else {
            this._isSelect = false;
        }
        this.isSelect = this._isSelect;
    }

    public set isSelect(value: boolean) {
        this.img_select.visible = value
    }

    public dispose(): void {

    }

    public removeSelf(): any {
        super.removeSelf();
    }
}