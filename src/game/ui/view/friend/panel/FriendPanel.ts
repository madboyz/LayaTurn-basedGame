import { TabBar } from "../../../compent/TabBar";
import { FriendListPanel } from "./FriendListPanel";
import { FriendAddPanel } from "./FriendAddPanel";
import { FriendManagerPanel } from "./FriendManagerPanel";
import { MsgManager } from "../../../manager/MsgManager";
import { SFriendData } from "../../../../../net/data/SFriendData";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";

export class FriendPanel extends ui.main.FriendPanelUI {
    private mTab: TabBar;
    public curIndex: number = -1;
    public curretSp: Laya.View;
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [

            { url: "res/atlas/friend.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2, this.btn_3]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
        this.mTab.select = this.curIndex;
        this.updateRed();
    }

    private updateRed(): void {
        this.btn_0.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDFriendLove)._isActiveSave);
        this.btn_2.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDFriendApply)._isActiveSave);
    }

    public update(): void {
        this.mTab.select = this.tabIndex;
    }

    public updateData(): void {
        this.curretSp && this.curretSp["updateData"]();
        this.updateRed();
    }

    public open(...args): void {
        this.initWindow(true, true, "好友", 550, 750, 50);
        super.open();
        //没有传页签，且没有好友的时候，调到添加好友
        if (SFriendData.instance.friendList.length <= 0) {
            this.tabIndex = 1;
        } 
        this.update();
        this.updateRed();
    }
    public initEvent(): void {
        this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        RedDotManager.instance.on(RedDotType.RDFriendApply, this, this.updateRed);
        RedDotManager.instance.on(RedDotType.RDFriendLove, this, this.updateRed);
    }
    public removeEvent(): void {
        this.mTab.off(Laya.Event.CHANGE, this, this.onTabChange);
        RedDotManager.instance.off(RedDotType.RDFriendApply, this, this.updateRed);
        RedDotManager.instance.off(RedDotType.RDFriendLove, this, this.updateRed);
    }

    private onTabChange(index: number, btn: Laya.Button) {
        if (this.curIndex != index) {
            if (index == 3) {
                // if (this.curretSp) {
                //     this.curretSp.removeSelf();
                //     this.curretSp = null;
                // }
                // MsgManager.instance.showRollTipsMsg("敬请期待");
                // this.mTab.select = this.curIndex;
                this.close();
                UIManager.instance.openUI(UIID.SYS_SHOP,null,6);
                return;
            }
            this.curIndex = index;
            if (this.curretSp) {
                this.curretSp.removeSelf();
                this.curretSp = null;
            }
        }
        this.curretSp = this.getPanelByIndex(this.curIndex);
    }

    private getPanelByIndex(index: number): Laya.View {
        var title: string = "好友";
        if (index == 0) {
            this.curretSp = new FriendListPanel();//人物信息
            title = "好友列表";
        }
        else if (index == 1) {
            this.curretSp = new FriendAddPanel();//升级
            title = "添加好友";
        }
        else if (index == 2) {
            title = "好友管理";
            this.curretSp = new FriendManagerPanel();//修炼
        }
        else if (index == 3) {
            title = "好友商店";
        }
        this.curretSp && this.addChildAt(this.curretSp, 2);
        this.curretSp && this.curretSp["initComp"]();
        this.Title = title;
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