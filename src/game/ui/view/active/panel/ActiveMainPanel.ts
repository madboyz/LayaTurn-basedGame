import { TabBar } from "../../../compent/TabBar";
import { ActiveItem } from "./ActiveItem";
import { SActiveData } from "../data/SActiveData";

export class ActiveMainPanel extends ui.main.ActiveMainPanelUI {
    private mTab: TabBar;
    public curIndex: number = -1;
    constructor() {
        super();
        //this.sameLevelEliminate = false;
        this.isShowMask = true;
        this.mResouce = [

            { url: "res/atlas/copy.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.activeList.itemRender = ActiveItem;
        this.activeList.vScrollBarSkin = "";
        this.activeList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.activeList.scrollBar.elasticDistance = 100;

        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_1, this.btn_2, this.btn_3]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
        this.mTab.select = 0;
    }

    public open(...args): void {
        this.initWindow(true, true, "活动中心", 550, 750, 45);
        super.open();
        this.RefreshList();
        this.mTab.select = this.tabIndex;
    }

    public RefreshList() {
        var dataList = SActiveData.instance.ClientActvies(this.curIndex);
        this.activeList.array = dataList;
        this.noDataBox.visible = dataList.length <= 0;
    }

    public update(): void {

    }

    public initEvent(): void {
    }

    public removeEvent(): void {

    }
    private onTabChange(index: number, btn: Laya.Button) {
        if (this.curIndex != index) {
            this.curIndex = index;
            switch (this.curIndex) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        break;
                    }
                case 2:
                    {
                        break;
                    }
            }
        }
        this.RefreshList();
    }

    public close(): void {
        this.curIndex = -1;
        this.mTab.select = this.curIndex;
        super.close();
    }
}