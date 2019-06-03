import { TabBar } from "../../../compent/TabBar";
import { PetChoujiangView } from "./PetChoujiangView";

export class PetChoujiangPanel extends ui.main.PetChoujiangPanelUI {
    private mTab: TabBar;
    public curIndex: number = -1;
    public curretSp: Laya.View;

    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
        ];
    }

    public initEvent(): void {
        this.close_Btn.on(Laya.Event.CLICK, this, this.close);
        this.back_Btn.on(Laya.Event.CLICK, this, this.close);
    }

    public removeEvent(): void {
    }

    public initComp() {
        super.initComp();
        if (!this.mTab) {
            this.mTab = new TabBar([this.tabBtn1, this.tabBtn2]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
    }

    public open(...args): void {
        this.initWindow(true, false, "抽奖", 550, 750, 35);
        super.open();
        this.mTab.select = this.tabIndex;
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
        this.updateData();
    }

    public updateData(): void {
        this.curretSp["updateData"]();
    }
    
    public startShowChoujiang(): void {
        this.curretSp["startShowChoujiang"]();
    }
    
    private getPanelByIndex(index: number): Laya.View {
        var title: string = "抽奖";
        if (index == 0) {
            this.curretSp = new PetChoujiangView(1);
            title = "宠物大转盘";
        }
        else if (index == 1) {
            this.curretSp = new PetChoujiangView(2);
            title = "伙伴大转盘";
        }
        this.curretSp && this.viewBox.addChild(this.curretSp);
        this.titleLb.text = title;
        return this.curretSp;
    }

    public update(): void {
    }


    public close(): void {
        super.close();
    }

}