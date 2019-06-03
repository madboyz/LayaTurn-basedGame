import { TabBar } from "../../../compent/TabBar";
import { MonthSignInPanel } from "./MonthSignInPanel";
import { DayMarkRewardPanel } from "../../dayReward/panel/DayMarkRewardPanel";
import { LevelRewardPanel } from "../../dayReward/panel/LevelRewardPanel";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";
import { SActiveRewardData } from "../../dayReward/data/SActiveRewardData";

export class FuliMainPanel extends ui.main.FuliMainPanelUI {
    private mTab: TabBar;
    public curIndex: number = -1;
    public curretSp: Laya.View;
    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/signIn.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        RedDotManager.instance.on(RedDotType.RDLvReward, this, this.showLvRewardRed);
        RedDotManager.instance.on(RedDotType.RDSignInReward, this, this.showSignInRewardRed);
        RedDotManager.instance.on(RedDotType.RDSevenDayReward, this, this.showSevenDayRewardRed);
    }
    
    public removeEvent(): void {
        RedDotManager.instance.off(RedDotType.RDLvReward, this, this.showLvRewardRed);
        RedDotManager.instance.off(RedDotType.RDSignInReward, this, this.showSignInRewardRed);
        RedDotManager.instance.off(RedDotType.RDSevenDayReward, this, this.showSevenDayRewardRed);
    }

    public initComp() {
        super.initComp();
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
    }

    public open(...args): void {
        this.initWindow(true, true, "福利中心", 550, 750, 50);
        super.open();
        this.mTab.select = this.tabIndex;
        this.onOpen();
        this.showRed();
    }

    private onOpen(): void {
        this.btn_2.visible = SActiveRewardData.instance.CurrentDayRewardInfo.state != 127;//SActiveRewardData.instance.CurrentDayRewardInfo.day != 7
    }

    private showRed(): void {
        this.showLvRewardRed(RedDotManager.instance.GetRD(RedDotType.RDLvReward)._isActiveSave);//等级奖励
        this.showSignInRewardRed(RedDotManager.instance.GetRD(RedDotType.RDSignInReward)._isActiveSave);//签到奖励
        this.showSevenDayRewardRed(RedDotManager.instance.GetRD(RedDotType.RDSevenDayReward)._isActiveSave);//七日登录
    }

    public showLvRewardRed(show: boolean = false): void {
        this.btn0_red.visible = show;
        this.btn_0.addChild(this.btn0_red);
    }

    public showSignInRewardRed(show: boolean = false): void {
        this.btn1_red.visible = show;
        this.btn_1.addChild(this.btn1_red);
    }

    public showSevenDayRewardRed(show: boolean = false): void {
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
        var title: string = "福利中心";
        if (index == 0) {
            this.curretSp = new LevelRewardPanel();
            title = "等级礼包";
        }
        else if (index == 1) {
            this.curretSp = new MonthSignInPanel();
            title = "每月签到";
        }
        else if (index == 2) {
            this.curretSp = new DayMarkRewardPanel();
            title = "累计登录";
        }
        this.curretSp && this.addChild(this.curretSp);
        // this.Title = title;
        return this.curretSp;
    }

    public close(): void {
        this.curretSp && this.curretSp.removeSelf();
        this.curretSp && this.curretSp.destroy();
        this.curretSp = null;
        super.close();
    }
}
