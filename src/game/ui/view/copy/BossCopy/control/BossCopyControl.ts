import { BossCopyPanel } from "../panel/BossCopyPanel";
import { SCopyData, SCopyEvent } from "../../../../../../net/data/SCopyData";
import { SWorldBossData, SWorldBossEvent } from "../../../../../../net/data/SWorldBossData";
import { CommonControl } from "../../../../../common/control/CommonControl";

export class BossCopyControl extends BaseControl {
    constructor() {
        super();
        this.panel = new BossCopyPanel();
        this.initEvent();
    }

    public set panel(value: BossCopyPanel) {
        this.mPanel = value;
    }

    public get panel(): BossCopyPanel {
        return this.mPanel as BossCopyPanel;
    }

    openView(...args) {
        if(UIManager.instance.hasOpenUI(UIID.SYS_MAIN) == false)
        {
            UIManager.instance.openUI(UIID.SYS_MAIN);
        }
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SCopyData.instance.on(SCopyEvent.COPY_ENTER_BACK,this,this.onEnterCopy);
        SCopyData.instance.on(SCopyEvent.COPY_INFO_BACK,this,this.updateData);
        SCopyData.instance.on(SCopyEvent.COPY_RESULT_BACK,this,this.updateData);
        SWorldBossData.instance.on(SWorldBossEvent.WORLD_BOSS_INFO_UPDATE , this ,this.onUpdateWorldBossInfo);

        this.panel.on(SCopyEvent.COPY_REQUEST_ENTER,this,this.onSend57001);
        this.panel.on(SCopyEvent.COPY_REQUEST_SWEEP,this,this.onSend57017);
    }
    private removeEvent() {
        SCopyData.instance.off(SCopyEvent.COPY_ENTER_BACK,this,this.onEnterCopy);
        SCopyData.instance.off(SCopyEvent.COPY_INFO_BACK,this,this.updateData);
        SCopyData.instance.off(SCopyEvent.COPY_RESULT_BACK,this,this.updateData);
        SWorldBossData.instance.off(SWorldBossEvent.WORLD_BOSS_INFO_UPDATE , this ,this.onUpdateWorldBossInfo);

        this.panel.off(SCopyEvent.COPY_REQUEST_ENTER,this,this.onSend57001);
        this.panel.off(SCopyEvent.COPY_REQUEST_SWEEP,this,this.onSend57017);
    }
    private onUpdateWorldBossInfo():void
    {
        this.panel && this.panel.updateWordData();
    }

    private updateData():void
    {
        this.panel && this.panel.updateData();
    }

    private onEnterCopy():void
    {
        UIManager.instance.closeUI(UIID.SYS_COPY_BOSS);
        UIManager.instance.closeUI(UIID.SYS_MAIN);
    }

    private onSend57001(no:number):void
    {
        CommonControl.instance.EnterCopy(no);
    }

    private onSend57017(no:number):void
    {
        CommonControl.instance.OneKeyCopy(no);
    }

}