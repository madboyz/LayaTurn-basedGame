import { S23002, S23005_1, S23002_1 } from "../../../../../net/pt/pt_23";
import { SJJCData, SJJCEvent } from "../data/SJJCData";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { HtmlUtils } from "../../../../utils/HtmlUtils";

export class JJCRecordPanel extends ui.main.JJCRecordPanelUI {
    public recordInfo: S23002;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
    }

    public removeEvent(): void {
    }

    public initComp() {
        super.initComp();
        this.initList();
    }

    private initList(): void {
        this.recordList.itemRender = JJCRecordItem;
    }



    public open(...args): void {
        this.initWindow(true, true, "挑战记录", 488, 530, 180);
        super.open();
        this.requestInfo();
    }

    private requestInfo(): void {
        SJJCData.instance.protocol.send23002();
    }

    public update(): void {
        this.recordInfo = SJJCData.instance.jjcRecordInfo;
        this.recordList.array = this.recordInfo.item_1;
    }

    public close(): void {
        super.close();
    }

}


//竞技场对手的item
export class JJCRecordItem extends ui.main.JJCRecoedItemUI {
    constructor() {
        super();
    }

    private _mdata: S23002_1;
    public set dataSource(data: S23002_1) {
        if (!data) {
            return;
        }
        this._mdata = data;
        //时间
        var fightTime = data.timestamp;
        this.fightTimeLb.text = TimerUtil.getStrTimeByDate2(new Date(fightTime * 1000));
        var idx = (this.parent.parent.parent as JJCRecordPanel).recordInfo.item_1.indexOf(this._mdata);
        this.bgImg.visible = idx % 2 != 0;
        //名字
        this.tyoeLb.text = this._mdata.result == 1 ? "胜利" : "失败";
        // this.typeImg.skin = this._mdata.result == 1 ? "comp/img_arrowup_1.png" : "comp/img_arrowdown_1.png";
        // this.rankLb.text = this._mdata.rank + "";
        // this.typeImg.visible = (this._mdata.state != 0);
        // this.rankLb.visible = (this._mdata.state != 0);
        // this.sameTipLb.visible = (this._mdata.state == 0);
        this.tyoeLb.color = this._mdata.result == 1 ? "#0eb416" : "#ff0000";//   /** this.rankLb.color = */ (this._mdata.result == 1 ? "#0eb416" : "#ff0000")

        var youStr = HtmlUtils.addColor("你","#0eb416",16)
        var bit = HtmlUtils.addColor("挑战了","#8a5428",16)
        var enemyStr = HtmlUtils.addColor(this._mdata.chanllanger,"#ff0000",16)

        this.introLb.innerHTML = (this._mdata.combat_type == 0 ? youStr : enemyStr ) + bit + (this._mdata.combat_type == 0 ? enemyStr : youStr );
    }


    public clear(): void {
    }

    public destroy(): void {
        this.clear();
        super.destroy();
    }

}