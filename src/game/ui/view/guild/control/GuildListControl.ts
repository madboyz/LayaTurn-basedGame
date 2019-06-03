import { GuildProtocol } from "../protocol/GuildProtocol";
import { GuildListPanel } from "../panel/GuildListPanel";
import { SGuideData, SGuideEvent } from "../../guide/data/SGuideData";
import { SGuildEvent, SGuildData } from "../data/SGuildData";
import { S40017_1 } from "../../../../../net/pt/pt_40";

export class GuildListControl extends BaseControl {
    private protocol: GuildProtocol;
    constructor() {
        super();
        this.panel = new GuildListPanel();
        this.protocol = new GuildProtocol();
    }

    public set panel(value: GuildListPanel) {
        this.mPanel = value;
    }

    public get panel(): GuildListPanel {
        return this.mPanel as GuildListPanel;
    }

    openView(...args) {
        this.initEvent();
        this.send40017(1, "");
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SGuildData.instance.on(SGuildEvent.ASK_GUILD_LIST, this, this.send40017);
        SGuildData.instance.on(SGuildEvent.ANS_GUILD_LIST, this, this.on40017);
        SGuildData.instance.on(SGuildEvent.ASK_JOIN_GUILD, this, this.send40003);
    }
    private removeEvent() {
        SGuildData.instance.off(SGuildEvent.ASK_GUILD_LIST, this, this.send40017);
        SGuildData.instance.off(SGuildEvent.ANS_GUILD_LIST, this, this.on40017);
        SGuildData.instance.off(SGuildEvent.ASK_JOIN_GUILD, this, this.send40003);
    }

    private send40017(pageIdx: number, SearchName: string): void {
        this.protocol.send40017(pageIdx, SearchName);
    }

    private on40017(): void {
        this.panel.update();
    }

    private send40003(data:S40017_1): void {
        this.protocol.send40003(data.GuildId);
    }

}