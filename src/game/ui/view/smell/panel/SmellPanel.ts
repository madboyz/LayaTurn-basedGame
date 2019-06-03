import { SmellItem } from "../item/SmellItem";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";

export class SmellPanel extends ui.main.SmellPanelUI {
    private mItems:Laya.List;
    private smellList:Array<number>;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.update();
    }

    public update():void
    {
        this.updateSmellList();
    }

    public open(...args): void {
        this.initWindow(true,true,"装备分解",486,557,180);
        super.open();
    }

    public initEvent():void 
    {
        this.btn_smell.on(Laya.Event.CLICK,this,this.onSmell);
    }

    public removeEvent():void
    {
        this.btn_smell.off(Laya.Event.CLICK,this,this.onSmell);
    }

    private initList():void
    {
        if (!this.mItems) {
            this.mItems = new Laya.List();
            this.addChild(this.mItems);
            this.mItems.itemRender = SmellItem;
            this.mItems.size(375, 325);
            this.mItems.pos(101, 300);
            this.mItems.spaceX = 8;
            this.mItems.spaceY = 11;
            this.mItems.repeatX = 4;
            this.mItems.repeatY = 3;
        }
    }

    private onSmell():void
    {
        this.event(SGoodsEvent.G00D_SMELL);
    }

    private updateSmellList():void
    {
        SBagData.instance.equip.clearSmellList();
        this.smellList = SBagData.instance.equip.smellList;
        this.mItems.array = this.smellList;
    }

    public close(): void {
        SBagData.instance.equip.clearSmellList();
        super.close();
    }

}