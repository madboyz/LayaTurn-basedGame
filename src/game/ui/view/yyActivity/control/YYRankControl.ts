import { YYRankPanel } from "../panel/YYRankPanel";
import { DataManager } from "../../../../../message/manager/DataManager";
import { S22001, S22002 } from "../../../../../net/pt/pt_22";

export class YYRankControl extends BaseControl {
    constructor() {
        super();
        this.panel = new YYRankPanel();
    }

    public set panel(value: YYRankPanel) {
        this.mPanel = value;
    }

    public get panel(): YYRankPanel {
        return this.mPanel as YYRankPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        DataManager.listen(PROTOCOL.E22001, this, this.onS22001);//个人排行榜
        DataManager.listen(PROTOCOL.E22002, this, this.onS22002);//非角色排行榜
    }

    private removeEvent() {
        DataManager.cancel(PROTOCOL.E22001, this, this.onS22001);//个人排行榜
        DataManager.cancel(PROTOCOL.E22002, this, this.onS22002);//非角色排行榜
    }

    private onS22001(data: S22001) {
        this.panel.rankDataBack(data);
    }

    private onS22002(data: S22002) {
        this.panel.rankDataBack(data);
    }

    //处理面板状态相关==========================================
    //更新
    private updateData(): void {
        this.panel.updateData()
    }


}