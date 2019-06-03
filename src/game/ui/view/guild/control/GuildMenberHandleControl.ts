import { GuildMenberHandlePanel } from "../panel/GuildMenberHandlePanel";
import { SGuildEvent, SGuildData } from "../data/SGuildData";
import { GuildProtocol } from "../protocol/GuildProtocol";

export class GuildMenberHandleControl extends BaseControl {
    private protocol: GuildProtocol;
    constructor() {
        super();
        this.panel = new GuildMenberHandlePanel();
        this.protocol = new GuildProtocol();
    }

    public set panel(value: GuildMenberHandlePanel) {
        this.mPanel = value;
    }

    public get panel(): GuildMenberHandlePanel {
        return this.mPanel as GuildMenberHandlePanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SGuildData.instance.on(SGuildEvent.ASK_OTHER_EXIT_GUILD, this, this.send40007);
        SGuildData.instance.on(SGuildEvent.ASK_GUILD_POSITION_CHANGE, this, this.send40014);
    }
    private removeEvent() {
        SGuildData.instance.off(SGuildEvent.ASK_OTHER_EXIT_GUILD, this, this.send40007);
        SGuildData.instance.off(SGuildEvent.ASK_GUILD_POSITION_CHANGE, this, this.send40014);
    }
    
    //请求剔除别人
    private send40007(PlayerId: number): void {
        this.protocol.send40007(PlayerId);
    }

    //修改职位
    private send40014(PlayerId: number, position: number): void {
        this.protocol.send40014(PlayerId,position);
    }

}
