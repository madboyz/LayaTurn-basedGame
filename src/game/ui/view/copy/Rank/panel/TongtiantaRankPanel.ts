import { Rank_reward_cfgVo } from "../../../../../../db/sheet/vo/Rank_reward_cfgVo";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { AwardUtil } from "../../../../../award/AwardUtil";
import { RankType } from "../../../rank/panel/RankMainPanel";
import { SRankEvent } from "../../../rank/protocol/RankMainProrocol";
import { TongtiantaRankItem } from "../item/TongtiantaRankItem";

export class TongtiantaRankPanel extends ui.main.TongtiantaRankPanelUI {
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
        this.rewardLb.underline = true;
    }

    private initList(): void {
        this.list.itemRender = TongtiantaRankItem;
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

        if (SCopyData.instance.tttRankInfo) {
            if (SCopyData.instance.tttRankInfo.MyRank <= 0) {
                rankStr = "(未上榜)";
            } else {
                rankStr = "(第" + SCopyData.instance.tttRankInfo.MyRank + "名)";
            }
            myRankStr = SCopyData.instance.tttInfo.cur_floor + "层";
            this.list.array = SCopyData.instance.tttRankInfo.item_1;
        } else {
            rankStr = "(未上榜)";
        }
        this.txt_myRank.text = "我得排名：" + myRankStr + rankStr;
    }

    public open(...args): void {
        this.initWindow(true, true, "通天塔排名", 486, 524, 165);
        this.event(SRankEvent.RANK_TTT);
        super.open();
    }
    public initEvent(): void {
        this.rewardLb.on(Laya.Event.CLICK, this, this.rewardLbClick);
    }
    public removeEvent(): void {
        this.rewardLb.off(Laya.Event.CLICK, this, this.rewardLbClick);
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

    private rewardLbClick():void{
        var rankNo = SCopyData.instance.tttRankInfo.MyRank;
        var cfgs = Rank_reward_cfgVo.get(RankType.TONGTIANTA).rewards
        if(rankNo == 0 || rankNo == null){
            //没排名的取最后一个奖励
            var rewardId = cfgs[cfgs.length - 1][1];
        }else{
            for (let i = 0; i < cfgs.length; i++) {
                var cfg = cfgs[i];
                if(rankNo <= cfg[0]){
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
            new Laya.Point(470 - xnum * 90,570 - ynum * 90),//坐标
        ]);
    }

    public close(): void {
        super.close();
    }
}