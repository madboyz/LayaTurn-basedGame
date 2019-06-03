import { BaseItem } from "../../../compent/BaseItem";
import { S13093_1 } from "../../../../../net/pt/pt_13";
import { ItemData } from "../../../compent/data/ItemData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { AwardUtil } from "../../../../award/AwardUtil";
import { SActiveData, SActiveEvent } from "../../active/data/SActiveData";

export class LoginRewardPanel extends ui.main.LoginRewardPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isShowMask = true;
        this.isCloseByNull = false;
        this.mResouce = [
            { url: "res/atlas/loginReward.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        this.getBtn.on(Laya.Event.CLICK, this, this.getBtnClick);
    }

    public removeEvent(): void {
        this.getBtn.off(Laya.Event.CLICK, this, this.getBtnClick);
    }

    public initComp() {
        super.initComp();
        this.rewardList.itemRender = LoginRewardItem;
    }

    public open(...args): void {
        this.initWindow(true, false, "登录奖励", 486, 557, 160);
        super.open();
        this.update();
    }

    public update(): void {
        var awardId = ConstVo.get("PLYR_START_REWARD").val;
        var goodsList = AwardUtil.GetNormalGoodsList(awardId, true, true);
        goodsList = goodsList.slice(0, 6);
        this.rewardList.array = goodsList;
    }

    //点击领取
    private getBtnClick(): void {
        this.event(SActiveEvent.ACTIVE_GET_LOGINREWARD);
    }


    public close(): void {
        super.close();
    }
}


//道具的奖励ITEM
export class LoginRewardItem extends Laya.View {
    private item: BaseItem;
    constructor() {
        super();
        this.size(50, 50);
        this.item = new BaseItem();
        this.item.setItemStyle(50);
        this.item.isShowToolTip = true;
        this.addChild(this.item);
    }

    private _mdata: ItemData;
    public set dataSource(data: ItemData) {
        if (!data) {
            return;
        }
        this._mdata = data;
        this.item.itemData = this._mdata;
        this.item.toolTipData = this.item.itemData;
    }

}