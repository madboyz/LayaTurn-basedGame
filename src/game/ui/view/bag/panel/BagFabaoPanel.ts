import { SBagData } from "../../../../../net/data/SBagData";
import { PackPosTypeCache } from "../cache/PackPosTypeCache";
import { BackPackItem } from "../item/BackPackItem";

export class BagFabaoPanel extends ui.main.BagWupinPanelUI {
    private mItems: Laya.List;
    private cache: PackPosTypeCache;
    constructor() {
        super();
        this.initComp();
    }

    public initComp() {
        this.initEvent();
        this.initList();
        this.btn_add.visible= false;
        this.open();
    }

    private initList(): void {
        if (!this.mItems) {
            this.mItems = new Laya.List();
            this.addChild(this.mItems);
            this.mItems.itemRender = BackPackItem;
            this.mItems.size(465, 590);
            this.mItems.pos(61, 118);
            this.mItems.spaceX = 5;
            this.mItems.spaceY = 18;
            this.mItems.repeatX = 1;
            this.mItems.repeatY = 5;
            this.mItems.vScrollBarSkin = "";
            this.mItems.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
            this.mItems.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        }
    }

    public open(): void {
        this.updateData();
    }

    public initEvent(): void {
        this.btn_smell.on(Laya.Event.CLICK, this, this.onSmell);
    }
    public removeEvent(): void {
        this.btn_smell.off(Laya.Event.CLICK, this, this.onSmell);
    }

    private onSmell(): void {
        UIManager.instance.openUI(UIID.SMELL);
    }

    public updateData(): void {
        this.cache = SBagData.instance.fabao;
        this.mItems.array = this.cache.splitItems;
        this.changeBagState();
        this.updateCount();
    }

    public updateCount(): void {
        this.txt_count.text = this.cache.itemLength + "/" + this.cache.capacity;
    }

    private changeBagState(): void {
        this.box.visible = true;
        this.mBg.height = 580;
        this.mItems.size(465, 555);
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }
}