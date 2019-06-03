import { TabBar } from "../../../compent/TabBar";
import { GodPetComingPanel } from "./GodPetComingPanel";
import { SOpenServiceActivityData, SOpenServiceActivityEvent } from "../data/SOpenServiceActivityData";
import { OSActivityChangePanel } from "./OSActivityChangePanel";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";
import { CostGetRewardPanel } from "./CostGetRewardPanel";

export class OpenServiceActivityPanel extends ui.main.OpenServiceActivityPanelUI {
    private mTab: TabBar;
    public curIndex: number = -1;
    public curretSp: Laya.View;
    public initTab: number = -1;
    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/osActivity.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        SOpenServiceActivityData.instance.on(SOpenServiceActivityEvent.ACTIVITY_DATA_REFRESH, this, this.showRed);
        
        RedDotManager.instance.on(RedDotType.RDOSChange, this, this.showOSChangeRed);
        RedDotManager.instance.on(RedDotType.RDOSCost, this, this.showCostRed);
    }

    public removeEvent(): void {
        SOpenServiceActivityData.instance.off(SOpenServiceActivityEvent.ACTIVITY_DATA_REFRESH, this, this.showRed);
        
        RedDotManager.instance.off(RedDotType.RDOSChange, this, this.showOSChangeRed);
        RedDotManager.instance.off(RedDotType.RDOSCost, this, this.showCostRed);
    }

    public initComp() {
        super.initComp();
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
    }

    public open(...args): void {
        this.initWindow(true, true, "开服活动", 550, 750, 50);
        super.open();
        this.initTab = -1;
        this.onOpen();
        this.showRed();
        if (this.tabIndex != 0) {
            this.mTab.select = this.tabIndex;
        } else {
            this.mTab.select = this.initTab;
        }
    }

    private onOpen(): void {
        //判断上面一排活动按钮
        var count: number = 0;
        for (let i = 0; i < 3; i++) {
            const btn: component.ScaleButton = this["btn_" + i] as component.ScaleButton;
            var needShow: boolean = false;
            if (i == 0) {
                needShow = SOpenServiceActivityData.instance.godPetIsOpen();
            } else if (i == 1) {
                needShow = SOpenServiceActivityData.instance.OSChangeIsOpen();
            } else if (i == 2) {
                needShow = SOpenServiceActivityData.instance.OSCostIsOpen();
            }
            if (needShow) {
                btn.x = count * 90 + 150;
                btn.visible = true;
                count++;
                (this.initTab == -1) && (this.initTab = i);
            } else {
                btn.visible = false;
            }
        }
    }

    private showRed(): void {
        this.showOSChangeRed(RedDotManager.instance.GetRD(RedDotType.RDOSChange)._isActiveSave);//
    }

    public showOSChangeRed(show: boolean = false): void {
        this.btn1_red.visible = show;
        this.btn_1.addChild(this.btn1_red);
    }

    public showCostRed(show: boolean = false): void {
        this.btn2_red.visible = show;
        this.btn_2.addChild(this.btn2_red);
    }

    private onTabChange(index: number, btn: Laya.Button) {
        if (this.curIndex != index) {
            this.curIndex = index;
            if (this.curretSp) {
                this.curretSp.removeSelf();
                this.curretSp.destroy();
                this.curretSp = null;
            }
        }
        if (this.curretSp == null) {
            this.curretSp = this.getPanelByIndex(this.curIndex);
        }
        (this[("btn_" + index)] as component.ScaleButton).addChild(this.selectImg);
        this.showRed();//把红点移到选中框上面去
        this.updateData();
    }

    public updateData(): void {
        this.curretSp["updateData"]();
    }

    private getPanelByIndex(index: number): Laya.View {
        var title: string = "开服活动";
        if (index == 0) {
            this.curretSp = new GodPetComingPanel();
            title = "青龙降临";
        }
        else if (index == 1) {
            this.curretSp = new OSActivityChangePanel();
            title = "集字兑换";
        }
        else if (index == 2) {
            this.curretSp = new CostGetRewardPanel();
            title = "消耗有礼";
        }
        this.curretSp && this.addChild(this.curretSp);
        this.Title = title;
        return this.curretSp;
    }

    public close(): void {
        this.curretSp && this.curretSp.removeSelf();
        this.curretSp && this.curretSp.destroy();
        this.curretSp = null;
        super.close();
    }
}
