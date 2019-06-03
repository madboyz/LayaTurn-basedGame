import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { NumStep } from "../../../compent/NumStep";
import { MsgManager } from "../../../manager/MsgManager";

export class BuyCountPanel extends ui.main.BuyCountPanelUI {
    private local: number;
    private maxNum: number;
    private maxVoNum: number;
    private numStep: NumStep;

    private costItemId: number;
    private costItemNum: number;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        this.maxVoNum = ConstVo.get("MAX_BAG_EQ_CAPACITY").val;
        this.costItemNum = ConstVo.get("EXTEND_CAPACITY_COST").val;
        this.initStep();
    }

    private initStep(): void {
        this.numStep = new NumStep();
        this.numStep.x = 82;
        this.numStep.y = 375;
        this.numStep.min = 1;
        this.numStep.max = 999;
        this.numStep.step = 1;
        this.numStep.stepAdd = 10;
        this.numStep.mode = 1;
        this.numStep.currentNum = 1;
        this.addChild(this.numStep);
    }

    public update(): void {
        // if (this.local == BagType.LOC_BAG_EQ) {
        // }
    }

    public onNumChange(): void {
        this.maxNum = this.maxVoNum - SBagData.instance.equip.capacity;

        var price: number = this.costItemNum;
        var value = price * this.numStep.currentNum;
        var num: number = SBagData.instance.prop.getItemCountByGoodsNo(this.costItemNum);
        if (num == 0) {
            var num: number = SRoleData.instance.getMoneyByType(MoneyType.YUANBAO);
        }
        var max_num = Math.floor(num / this.costItemNum);
        this.numStep.max = Math.min((max_num == 0 ? 1 : max_num), this.maxNum);
        if (num < value)
            this.txt_const.color = "#ff0000";
        else
            this.txt_const.color = "#fffc00";
        this.txt_const.text = `x${this.costItemNum * this.numStep.currentNum}`;
    }

    public open(...args): void {
        this.local = args[0]
        this.initWindow(true, true, args[1], 485, 395, 230);
        super.open();
        this.onNumChange();
        this.numStep.currentNum = Math.min(this.numStep.max, 10);
    }

    public initEvent(): void {
        this.sure.on(Laya.Event.CLICK, this, this.onSure);
        this.numStep.on(Laya.Event.CHANGE, this, this.onNumChange);
    }
    public removeEvent(): void {
        this.sure.off(Laya.Event.CLICK, this, this.onSure);
        this.numStep.off(Laya.Event.CHANGE, this, this.onNumChange);
    }

    private onSure(): void {
        var itemEnough: boolean = (SRoleData.instance.info.Yuanbao >= this.costItemNum * this.numStep.currentNum);
        if (!itemEnough) {
            MsgManager.instance.showRollTipsMsg("道具不足，无法购买");
            return;
        }
        if (this.numStep.max <= 0) {
            MsgManager.instance.showRollTipsMsg("您的背包已达到上限，无需购买");
            return;
        }
        this.event(SGoodsEvent.GOODS_REQUEST_BUYCOUNT, [[this.local, this.numStep.currentNum]]);
        this.close();
    }

    public close(): void {
        this.numStep.clear();
        super.close();
    }
}