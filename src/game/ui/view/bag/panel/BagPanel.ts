import { TabBar } from "../../../compent/TabBar";
import { BagWupinPanel } from "./BagWupinPanel";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";
import { BagMinggePanel } from "./BagMinggePanel";
import { BagFabaoPanel } from "./BagFabaoPanel";

export class BagPanel extends ui.main.BagPanelUI {
    private mTab: TabBar;
    public curIndex: number = -1;
    public curretSp: Laya.View;
    constructor() {
        super();
        this.mResouce = [
        ];
    }

    public initEvent(): void {
        RedDotManager.instance.on(RedDotType.RDBag, this, this.showRed);
    }
    public removeEvent(): void {
        RedDotManager.instance.off(RedDotType.RDBag, this, this.showRed);
    }

    public initComp() {
        super.initComp();
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2, this.btn_3]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
    }

    public open(...args): void {
        this.initWindow(true, true, "背包", 550, 750, 35);
        super.open();
        this.onOpen();
        this.showRed();
        this.mTab.select = this.tabIndex;
    }

    private onOpen(): void {
    }

    private showRed(): void {
        this.showBagRed(RedDotManager.instance.GetRD(RedDotType.RDBag)._isActiveSave)
    }

    private showBagRed(show: boolean): void {
        this.btn_1.refreshRed(show);
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
        // this.showRed();//把红点移到选中框上面去
        this.updateData();
    }

    public updateData(): void {
        this.curretSp["updateData"]();
    }

    private getPanelByIndex(index: number): Laya.View {
        var title: string = "背包";
        if (index == 0) {
            this.curretSp = new BagWupinPanel(1);
        }
        else if (index == 1) {
            this.curretSp = new BagWupinPanel(2);
        }
        else if (index == 2) {
            this.curretSp = new BagMinggePanel();
        }
        else if (index == 3) {
            this.curretSp = new BagFabaoPanel;
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
