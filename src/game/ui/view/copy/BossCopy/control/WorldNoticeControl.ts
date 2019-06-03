import { WorldNoticePanel } from "../panel/WorldNoticePanel";
import { SWorldBossData } from "../../../../../../net/data/SWorldBossData";

export class WorldNoticeControl extends BaseControl {
    private CoolDownTime = 5;//剩余毫秒
    constructor() {
        super();
        this.panel = new WorldNoticePanel();
    }

    public set panel(value: WorldNoticePanel) {
        this.mPanel = value;
    }



    public get panel(): WorldNoticePanel {
        return this.mPanel as WorldNoticePanel;
    }

    openView(...args) {
        this.initEvent();
        SWorldBossData.instance.NoticeShow = false;
        Laya.timer.loop(1000 , this , this.onTime);
    }

    private onTime():void {
        if(this.CoolDownTime == 0)
        {
            this.panel.close();
            this.CoolDownTime = 6;
        }
        else
        {
            this.CoolDownTime--;
        }
    }

    private initEvent() {
    }

    private removeEvent() {
    }

    closeView() {
        this.removeEvent();
        Laya.timer.clear(this ,this.onTime);
        super.closeView();
    }

}