import { RedDotType } from "../../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../../redDot/RedDotManager";
import { TabBar } from "../../../../compent/TabBar";
import { ChuangTiangongPanel } from "../../BossCopy/panel/ChuangTiangongPanel";
import { SanjieCopyPanel } from "../../BossCopy/panel/SanjieCopyPanel";
import { MaterialCopyPanel } from "./MaterialCopyPanel";
import { PetCopyPanel } from "./PetCopyPanel";
import { TongtiantaPanel } from "./TongtiantaPanel";

export class StuffCopyPanel extends ui.main.StuffCopyPanelUI {
    private mTab: TabBar;
    public curIndex: number = -1;
    public curretSp: Laya.View;
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [

            { url: "res/atlas/copy.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.btnList.hScrollBarSkin = "";
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2, this.btn_3, this.btn_4], [UIID.SYS_COPY_STUFF, UIID.SYS_MATERIAL_DUNGEON, UIID.SYS_TOWER]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
        this.mTab.select = this.curIndex;
        var offsetX = this.curIndex * 105 - 350;
        this.btnList.hScrollBar.value = offsetX > 0 ? offsetX : 0
    }

    public update(): void {
        this.mTab.select = this.tabIndex;
        var offsetX = this.curIndex * 105 - 350;
        this.btnList.hScrollBar.value = offsetX > 0 ? offsetX : 0
    }

    private showRed(): void {
        this.showPetRed(RedDotManager.instance.GetRD(RedDotType.RDPetCopy)._isActiveSave);//宠物秘境
        this.showMaterilRed(RedDotManager.instance.GetRD(RedDotType.RDMaterilCopy)._isActiveSave);//材料副本
        this.showTTTRed(RedDotManager.instance.GetRD(RedDotType.RDTTT)._isActiveSave);//通天塔
    }

    public showPetRed(show: boolean = false): void {
        this.btn_0.refreshRed(show);
    }
    public showMaterilRed(show: boolean = false): void {
        this.btn_1.refreshRed(show);
    }
    public showTTTRed(show: boolean = false): void {
        this.btn_2.refreshRed(show);
    }

    public updateData(): void {
        this.curretSp && this.curretSp["updateData"]();
        this.curretSp && this.showRed();
    }

    public open(...args): void {
        this.initWindow(true, true, "材料副本", 550, 750, 50);
        super.open();
        this.update()
        this.showRed();
    }
    public initEvent(): void {
        this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        RedDotManager.instance.on(RedDotType.RDPetCopy, this, this.showPetRed);
        RedDotManager.instance.on(RedDotType.RDMaterilCopy, this, this.showMaterilRed);
        RedDotManager.instance.on(RedDotType.RDTTT, this, this.showTTTRed);
    }

    public removeEvent(): void {
        RedDotManager.instance.off(RedDotType.RDPetCopy, this, this.showPetRed);
        RedDotManager.instance.off(RedDotType.RDMaterilCopy, this, this.showMaterilRed);
        RedDotManager.instance.off(RedDotType.RDTTT, this, this.showTTTRed);

        this.mTab.off(Laya.Event.CHANGE, this, this.onTabChange);
    }

    private onTabChange(index: number, btn: Laya.Button) {
        if (this.curIndex != index) {
            this.curIndex = index;
            if (this.curretSp) {
                this.curretSp.removeSelf();
                this.curretSp = null;
            }
        }
        this.curretSp = this.getPanelByIndex(this.curIndex);
    }

    private getPanelByIndex(index: number): Laya.View {
        if (this.curretSp) {
            this.curretSp.removeSelf();
            this.curretSp = null;
        }
        var title: string = "材料副本";
        if (index == 0) {
            this.curretSp = new PetCopyPanel();//宠物秘境
            title = "宠物秘境";
        }
        else if (index == 1) {
            this.curretSp = new MaterialCopyPanel();//材料副本
            title = "材料副本";
        }
        else if (index == 2) {
            this.curretSp = new TongtiantaPanel();//宠物秘境
            title = "通天塔";
        }
        else if (index == 3) {
            this.curretSp = new SanjieCopyPanel();//三界副本
            title = "三界副本";
        }
        else if (index == 4) {
            this.curretSp = new ChuangTiangongPanel();//勇闯天宫
            title = "勇闯天宫";
        }
        this.curretSp && this.addChildAt(this.curretSp, 2);
        this.curretSp && this.curretSp["initComp"]();
        this.Title && (this.Title = title);
        return this.curretSp;
    }

    public close(): void {
        this.curIndex = -1;
        this.mTab.select = this.curIndex;
        this.curretSp && this.curretSp.removeSelf();
        this.curretSp = null;
        super.close();
    }
}