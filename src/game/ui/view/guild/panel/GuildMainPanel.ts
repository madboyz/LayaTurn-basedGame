import { TabBar } from "../../../compent/TabBar";
import { GuildInfoPanel } from "./GuildInfoPanel";
import { GuildMenberListPanel } from "./GuildMenberListPanel";
import { GuildManagePanel } from "./GuildManagePanel";
import { SGuildData } from "../data/SGuildData";
import { GuildPositionType } from "../data/GuildHelper";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";
import { GuildContributePanel } from "./GuildContributePanel";

export class GuildMainPanel extends ui.main.GuildMainPanelUI {
    private mTab: TabBar;
    public curIndex: number = -1;
    public curretSp: Laya.View;
    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/guild.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        RedDotManager.instance.on(RedDotType.RDGuildManage, this, this.showRed);
        RedDotManager.instance.on(RedDotType.RDGuildZonglan, this, this.showRed);
        RedDotManager.instance.on(RedDotType.RDGuildContribute, this, this.showRed);
    }

    public removeEvent(): void {
        RedDotManager.instance.off(RedDotType.RDGuildManage, this, this.showRed);
        RedDotManager.instance.off(RedDotType.RDGuildZonglan, this, this.showRed);
        RedDotManager.instance.off(RedDotType.RDGuildContribute, this, this.showRed);
    }

    public initComp() {
        super.initComp();
        this.btnList.hScrollBarSkin = "";
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2, this.btn_3, this.btn_4, this.btn_5]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
    }

    public open(...args): void {
        this.initWindow(true, true, "帮派", 550, 750, 50);
        super.open();
        this.mTab.select = 0;
        this.showRed();
    }

    private showRed(): void {
        this.btn_0.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDGuildZonglan)._isActiveSave);//帮派
        this.btn_2.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDGuildContribute)._isActiveSave);//帮派
        this.btn_5.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDGuildManage)._isActiveSave);//帮派
    }

    private onTabChange(index: number, btn: Laya.Button) {
        if (index == 3) {
            //"帮派商店";
            this.close();
            UIManager.instance.openUI(UIID.SYS_SHOP,null,5);
            return;
        } else if (index == 4) {
            //"帮派技能";
            this.close();
            UIManager.instance.openUI(UIID.ROLE, [1]/**传进去打开帮派时候的二级页签*/,2);
            return;
        }

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
        //管理成员
        var myGuildData = SGuildData.instance.myGuildData;
        var myGuildPosition = SGuildData.instance.myGuildPosition;
        if (!myGuildData || !myGuildPosition) {
            return;
        }
        var canManage = (myGuildPosition.Position == GuildPositionType.leader || myGuildPosition.Position == GuildPositionType.subLeader
            || myGuildPosition.Position == GuildPositionType.elite);
        this.btn_5.gray = !canManage;
    }

    private getPanelByIndex(index: number): Laya.View {
        var title: string = "帮派";
        if (index == 0) {
            this.curretSp = new GuildInfoPanel();
            title = "帮派总览";
        }
        else if (index == 1) {
            this.curretSp = new GuildMenberListPanel();
            title = "帮派成员";
        }
        else if (index == 2) {
            this.curretSp = new GuildContributePanel();//技能
            title = "帮派捐献";
        }
        else if (index == 3) {
            // this.curretSp = new GuildInfoPanel();//心法
            // title = "帮派商店";
        }
        else if (index == 4) {
            // this.curretSp = new GuildInfoPanel();//心法
            // title = "帮派技能";
        }
        else if (index == 5) {
            this.curretSp = new GuildManagePanel();//心法
            title = "帮派管理";
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
