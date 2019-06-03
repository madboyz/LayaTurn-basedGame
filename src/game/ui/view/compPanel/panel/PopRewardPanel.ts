import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";

export class PopRewardPanel extends ui.main.PopRewardPanelUI {
    private param;//第一个参数为奖励列表，第二个为显示的坐标点,第三个为X轴数量，不传默认3个

    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
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
        this.addMaskClick();
    }
    
    private addMaskClick() {
        this.maskClick.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this.maskClick.name = "mask";
        this.maskClick.alpha = 0;
        this.maskClick.width = Laya.stage.width;
        this.maskClick.height = Laya.stage.height;
        this.maskClick.on(Laya.Event.CLICK,this,this.close);
    }

    private initList(): void {
        this.rewardList.itemRender = BaseItem;
        this.rewardList.spaceX = 50;
        this.rewardList.spaceY = 50;
        this.rewardList.repeatX = 3;
        this.rewardList.repeatY = 2;
        this.rewardList.vScrollBarSkin = "";
        this.rewardList.renderHandler = new Laya.Handler(this, this.onListRender);
    }

    public open(...args): void {
        this.param = this.arg;
        this.initWindow(false, false, "", 486, 390, 170);
        super.open();
        this.update();
    }

    public update(): void {
        
        var rewardNum = this.param[0].length;
        var xnum: number = (rewardNum - 1) % this.rewardList.repeatX + 1;
        var ynum: number = Math.ceil(rewardNum / this.rewardList.repeatX);
        this.bgImg.x = this.param[1].x;
        this.bgImg.y = this.param[1].y;
        this.bgImg.width = 20 + xnum * 90 + 10;
        this.bgImg.height = 20 + ynum * 90 + 10;
        
        this.rewardList.x = this.param[1].x + 20;
        this.rewardList.y = this.param[1].y + 20;
        this.rewardList.width = xnum * 90;
        this.rewardList.height = ynum * 90;

        this.rewardList.array = this.param[0];
    }

    private onListRender(cell: BaseItem, index: number) {
        var item: ItemData = this.param[0][index];
        if (!item)
            return;
        cell.setItemStyle(80);
        cell.itemData = item;
        cell.isShowToolTip = true;
        cell.toolTipData = item;
    }

    public close(): void {
        super.close();
    }
}