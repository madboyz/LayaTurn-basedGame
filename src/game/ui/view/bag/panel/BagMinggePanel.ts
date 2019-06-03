import { MinggeInfo } from "../../comate/data/MinggeInfo";
import { MinggeItem } from "../../comate/data/MinggeItem";
import { SComateData } from "../../comate/data/SComateData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class BagMinggePanel extends ui.main.BagMinggePanelUI {
    constructor() {
        super();
        this.initComp();
    }

    public initComp() {
        this.initEvent();
        this.initList();
        this.open();
    }

    private initList(): void {
        this.itemList.itemRender = BagMinggePackItem;
        this.itemList.vScrollBarSkin = "";
        this.itemList.size(465, 590);
        this.itemList.pos(61, 118);
        this.itemList.spaceX = 5;
        this.itemList.spaceY = 18;
        this.itemList.repeatX = 1;
        this.itemList.repeatY = 5;
        this.itemList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.itemList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
    }

    public open(): void {
        this.updateData();
    }

    public initEvent(): void {
    }
    public removeEvent(): void {
    }

    public updateData(): void {
        //整理可以装备的数据
        var minggeBagList = SComateData.instance.minggeBagList.concat();
        minggeBagList.sort((a: MinggeInfo, b: MinggeInfo): any => {
            if (a.cfg.qualiy != b.cfg.qualiy) {
                return b.cfg.qualiy - a.cfg.qualiy;
            }
            return a.cfg.no - b.cfg.no;
        });
        var maxLength = ConstVo.get("GAME_YAODAN_BAG_SLOT").val;
        minggeBagList.length = maxLength;
        var showdataList = [];
        var showdata: Array<MinggeInfo> = [];
        for (let i = 0; i < minggeBagList.length; i++) {
            const element = minggeBagList[i];
            showdata.push(element);
            if (showdata.length >= 5) {
                showdataList.push(showdata.concat());
                showdata = [];
            }
        }
        this.itemList.array = showdataList;
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }
}


export class BagMinggePackItem extends Laya.View {

    private items: Array<BagMinggeItem> = [];
    private line: Laya.Image;

    constructor() {
        super();
        this.init();
    }

    init(): void {
        var item: BagMinggeItem;
        for (let index = 0; index < 5; index++) {
            item = new BagMinggeItem();
            this.addChild(item);
            item.x = index * (95);
            this.items.push(item);
        }
        this.line = new Laya.Image();
        this.addChild(this.line);
        this.line.skin = ResUtils.getCompUIUrl("img_di1");
        this.line.sizeGrid = "3,56,3,52";
        this.line.alpha = 0.3;
        this.line.width = 475;
        this.line.height = 7;
        this.line.y = 105;
        this.size(465, 105);
    }

    private mData: Array<MinggeInfo>

    public set dataSource(data: Array<MinggeInfo>) {
        if (!data) return;
        this.mData = data;
        this.setList(this.mData);
    }

    private setList(arr: Array<MinggeInfo>): void {
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            this.items[index].dataSource = element;
        }
    }

}

export class BagMinggeItem extends MinggeItem {
    public showBg = true;

    constructor() {
        super();
        this.isShowToolTip = true;
        // this.on(Laya.Event.CLICK, this, this.thisClick);

    }

    public thisClick(): void {
        // var panel: MinggeEatPanel = (this.parent.parent.parent as MinggeEatPanel);
        // panel.clicktItem(this.mData);
    }

}