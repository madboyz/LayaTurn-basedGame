import { SBagData } from "../../../../../net/data/SBagData";
import { SmellSelectItem } from "../item/SmellSelectItem";
import { ItemData } from "../../../compent/data/ItemData";

export class SmellSelectPanel extends ui.main.SmellSelectPanelUI {
    private mItems: Laya.List;
    private noti: Notice = new Notice();//用来通知controll的
    public panelSelectList: Array<number> = [];
    public showList: Array<ItemData> = [];

    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.update();
    }

    public update(): void {
        this.refreshShowList();
        this.mItems.array = this.showList;
    }

    public refreshShowList(): void {
        var baseList = SBagData.instance.equip.selectSmellList;
        var selectList = SBagData.instance.equip.smellList;
        this.showList = [];
        for (let i = 0; i < baseList.length; i++) {
            const element: ItemData = baseList[i];
            var goodsId = element.serverInfo.GoodsId;
            var idx: number = selectList.indexOf(goodsId);
            idx == -1 && (this.showList.push(element));
        }
    }

    public pushSmellList(id: number, select: boolean): void {
        if (select) {
            this.panelSelectList.push(id);
        } else {
            var idx: number = this.panelSelectList.indexOf(id);
            idx >= 0 && (this.panelSelectList.splice(idx, 1));
        }
    }

    public open(...args): void {
        this.initWindow(true, true, "选择分解", 486, 527, 220);
        super.open();
        this.panelSelectList = [];
    }

    public initEvent(): void {
        this.sure.on(Laya.Event.CLICK, this, this.onSmell);
        this.selectAllBtn.on(Laya.Event.CLICK, this, this.selectAll);
    }

    public removeEvent(): void {
        this.sure.off(Laya.Event.CLICK, this, this.onSmell);
        this.selectAllBtn.off(Laya.Event.CLICK, this, this.selectAll);
    }

    private initList(): void {
        if (!this.mItems) {
            this.mItems = new Laya.List();
            this.addChild(this.mItems);
            this.mItems.itemRender = SmellSelectItem;
            this.mItems.size(375, 325);
            this.mItems.pos(101, 300);
            this.mItems.spaceX = 8;
            this.mItems.spaceY = 11;
            this.mItems.repeatX = 4;
            this.mItems.repeatY = 3;
            this.mItems.vScrollBarSkin = "";
            this.mItems.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
            this.mItems.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        }
    }

    private onSmell(): void {
        for (let i = 0; i < this.panelSelectList.length; i++) {
            const element = this.panelSelectList[i];
            SBagData.instance.equip.pushSmellList(element, true);
        }
        this.showList = [];
        this.close();
    }

    public close(): void {
        this.noti.send(NotityData.create(NotityEvents.SURESELECTEQUIPSMELL));
        super.close();
    }

    public selectAll(): void {
        var selectedCount = SBagData.instance.equip.smellCount;
        for (let i = 0; i < this.showList.length; i++) {
            var count = selectedCount + this.panelSelectList.length;
            if (count >= 12) {
                break;
            }
            const element = this.showList[i];
            var idx: number = this.panelSelectList.indexOf(element.GoodsId);
            if (idx >= 0) {
                continue;
            }
            this.panelSelectList.push(element.GoodsId);
        }
        var list = this.mItems.cells;
        for (let i = 0; i < list.length; i++) {
            var ele: SmellSelectItem = list[i];
            ele.checkSelect();
        }
    }
}