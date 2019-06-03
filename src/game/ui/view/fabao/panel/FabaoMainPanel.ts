import { SBagData } from "../../../../../net/data/SBagData";
import { RedDotType } from "../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { TabBar } from "../../../compent/TabBar";
import { FabaoInfoPanel } from "./FabaoInfoPanel";
import { FabaoLvupPanel } from "./FabaoLvupPanel";
import { FabaoTanbaoPanel } from "./FabaoTanbaoPanel";

export class FabaoMainPanel extends ui.main.FabaoMainPanelUI {
    private mTab: TabBar;
    public curIndex: number = -1;
    public curretSp: Laya.View;
    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/fabao.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        RedDotManager.instance.on(RedDotType.RDFabao, this, this.showRed);
    }
    public removeEvent(): void {
        RedDotManager.instance.off(RedDotType.RDFabao, this, this.showRed);
    }

    public initComp() {
        super.initComp();
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2, this.btn_3]);
            this.btn_2.gray = true;
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
        this.btn_0.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDFabao)._isActiveSave);
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
        var title: string = "法宝";
        if (index == 0) {
            this.curretSp = new FabaoInfoPanel();
        }
        else if (index == 1) {
            this.curretSp = new FabaoLvupPanel();
        }
        // else if (index == 2) {
        //     this.curretSp = new BagMinggePanel();
        // }
        else if (index == 3) {
            this.curretSp = new FabaoTanbaoPanel;
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
