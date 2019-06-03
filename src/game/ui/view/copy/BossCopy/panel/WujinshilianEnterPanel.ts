import { ConstVo } from "../../../../../../db/sheet/vo/ConstVo";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { S16009 } from "../../../../../../net/pt/pt_16";
import { CommonControl } from "../../../../../common/control/CommonControl";
import { BaseItem } from "../../../../compent/BaseItem";
import { ItemData } from "../../../../compent/data/ItemData";
import { SBossData } from "../data/SBossData";
import { MsgManager } from "../../../../manager/MsgManager";

export class WujinshilianEnterPanel extends ui.main.WujinshilianEnterPanelUI {
    private plData: S16009;
    private costItem: BaseItem;
    private costItemData: ItemData;

    constructor() {
        super();
        this.isShowMask = true;
        this.layer = UILEVEL.POP_3;
        this.mResouce = [
        ];
    }

    public initComp() {
        super.initComp();
        this.costItem = new BaseItem();
        this.costItem.setItemStyle(80);
        this.itemBox.addChild(this.costItem);
    }

    public updateData(): void {
    }

    public open(...args): void {
        this.initWindow(true, false, "无尽试炼", 550, 750, 50);
        super.open();
        this.plData = this.arg[0];
        //道具
        var mainContri = ConstVo.get("TVE_SKIP_FLOOR_COST").val;
        if (SBossData.instance.askIngWJSSId == 1) {
            var goldContri = mainContri[0][1];
        } else if (SBossData.instance.askIngWJSSId == 2) {
            var goldContri = mainContri[1][1];
        }

        for (let i = 0; i < goldContri.length; i++) {
            const element = goldContri[i];
            if (element[0] <= this.plData.SkipWave && element[1] >= this.plData.SkipWave) {
                this.costItemData = new ItemData(element[2]);
                this.costItemData.Count = element[3];
                break;
            }
        }
        this.costItem.itemData = this.costItemData;
        this.costItem.toolTipData = this.costItemData;

        this.maxStageLb.text = `历史最大层数:${this.plData.MaxWave}层`;
        this.wantStageLb.text = `跳层目标层数:${this.plData.SkipWave}层`;
    }

    public initEvent(): void {
        this.normalEnterBtn.on(Laya.Event.CLICK, this, this.normalEnterBtnClick);
        this.flyEnterBtn.on(Laya.Event.CLICK, this, this.flyEnterBtnClick);
        this.closeBtn2.on(Laya.Event.CLICK, this, this.close);
    }
    public removeEvent(): void {
        this.normalEnterBtn.off(Laya.Event.CLICK, this, this.normalEnterBtnClick);
        this.flyEnterBtn.off(Laya.Event.CLICK, this, this.flyEnterBtnClick);
        this.closeBtn2.off(Laya.Event.CLICK, this, this.close);
    }

    public normalEnterBtnClick(): void {
        CommonControl.instance.EnterThreeCopy(SBossData.instance.askIngWJSSId);
        this.close();
    }

    public flyEnterBtnClick(): void {
        //道具
        var itemNum: number = SRoleData.instance.getMoneyByType(this.costItemData.GoodsNo);
        var isEnough = (itemNum >= this.costItemData.Count);

        if (isEnough) {
            CommonControl.instance.EnterThreeCopy(SBossData.instance.askIngWJSSId, 1);
        } else {
            MsgManager.instance.showRollTipsMsg("道具不足");
        }
        this.close();
    }

    public close(): void {
        super.close();
    }
}