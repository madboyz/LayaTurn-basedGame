import { SGuideData } from "../../guide/data/SGuideData";
import { SGuildEvent, SGuildData } from "../data/SGuildData";
import { GuildCreatPanel } from "../panel/GuildCreatPanel";
import { GuildProtocol } from "../protocol/GuildProtocol";

export class GuildCreatControl extends BaseControl {
    private protocol: GuildProtocol;
    constructor() {
        super();
        this.panel = new GuildCreatPanel();
        this.protocol = new GuildProtocol();
    }

    public set panel(value: GuildCreatPanel) {
        this.mPanel = value;
    }

    public get panel(): GuildCreatPanel {
        return this.mPanel as GuildCreatPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SGuildData.instance.on(SGuildEvent.ASK_CREAT_GUILD, this, this.send40001)
        // SGuideData.instance.on(SGuildEvent.ANS_CREAT_GUILD, this, this.on40001)
    }
    private removeEvent() {
        SGuildData.instance.off(SGuildEvent.ASK_CREAT_GUILD, this, this.send40001)
        // SGuideData.instance.off(SGuildEvent.ANS_CREAT_GUILD, this, this.on40001)
    }

    private send40001(GuildName: string): void {
        this.protocol.send40001(GuildName);
    }

    // private on40001():void{
    //     this.panel.update()
    // }

}