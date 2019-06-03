import { SBagData } from "../../../../../net/data/SBagData";
import { PackPosTypeCache } from "../cache/PackPosTypeCache";
import { BackPackItem } from "../item/BackPackItem";

export class BagWupinPanel extends ui.main.BagWupinPanelUI {
    private mItems: Laya.List;
    private cache: PackPosTypeCache;
    private type:number = 1;//1表示物品，2表示装备;
    constructor(type:number) {
        super();
        this.type = type;
        this.initComp();
    }
    
    public initComp() {
        this.initEvent();
        this.initList();
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
        this.btn_add.on(Laya.Event.CLICK, this, this.onAddBuy);
    }
    public removeEvent(): void {
        this.btn_smell.off(Laya.Event.CLICK, this, this.onSmell);
        this.btn_add.off(Laya.Event.CLICK, this, this.onAddBuy);
    }

    private onSmell(): void {
        UIManager.instance.openUI(UIID.SMELL);
    }

    private onAddBuy(): void {
        UIManager.instance.openUI(UIID.BUYCONTENT, [BagType.LOC_BAG_EQ, "背包格购买"]);
    }

    public updateData(): void {
        if (this.type == 1) {
            this.cache = SBagData.instance.prop;
        }
        else {
            this.cache = SBagData.instance.equip;
        }
        this.mItems.array = this.cache.splitItems;
        this.changeBagState();
        this.updateCount();
    }

    public updateCount(): void {
        this.txt_count.text = this.cache.itemLength + "/" + this.cache.capacity;
    }

    private changeBagState(): void {
        if (this.type == 1) {
            this.box.visible = false;
            this.mBg.height = 630;
            this.mItems.size(465, 605);
        }
        else {
            this.box.visible = true;
            this.mBg.height = 580;
            this.mItems.size(465, 555);
        }
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }
}