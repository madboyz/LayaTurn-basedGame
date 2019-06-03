import { GuildMainPanel } from "../panel/GuildMainPanel";
import { GuildProtocol } from "../protocol/GuildProtocol";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { SGuildData, SGuildEvent } from "../data/SGuildData";
import { GuildInfoPanel } from "../panel/GuildInfoPanel";

export class GuildMainControl extends BaseControl {
    private protocol: GuildProtocol;
    constructor() {
        super();
        this.panel = new GuildMainPanel();
        this.protocol = new GuildProtocol();
    }

    public set panel(value: GuildMainPanel) {
        this.mPanel = value;
    }

    public get panel(): GuildMainPanel {
        return this.mPanel as GuildMainPanel;
    }

    openView(...args) {
        if (UIManager.instance.hasOpenUI(UIID.SYS_MAIN) == false) {
            UIManager.instance.openUI(UIID.SYS_MAIN);
        }
        this.initEvent();
        this.send40012(SRoleData.instance.info.GuildId);//帮派相关信息
        this.send40016();//请求个人在帮派的信息
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SGuildData.instance.on(SGuildEvent.ASK_HOlE_GUILD_INFO, this, this.send40012);
        SGuildData.instance.on(SGuildEvent.ASK_GUILD_CHANGE_NOTICE, this, this.send40013);
        SGuildData.instance.on(SGuildEvent.ASK_GUILD_MANAGELIST, this, this.send40011);
        SGuildData.instance.on(SGuildEvent.ASK_GUILD_MENBERLIST, this, this.send40010);
        SGuildData.instance.on(SGuildEvent.ASK_EXIT_GUILD, this, this.send40008);

        SGuildData.instance.on(SGuildEvent.ASK_ALLOW_JOIN_GUILD, this, this.allowJoin);
        SGuildData.instance.on(SGuildEvent.ASK_REJECT_JOIN_GUILD, this, this.rejectJoin);
        SGuildData.instance.on(SGuildEvent.ASK_REJECT_ALL_JOIN_GUILD, this, this.rejectAllJoin);

        SGuildData.instance.on(SGuildEvent.ANS_GUILD_INFO, this, this.updateData);
        SGuildData.instance.on(SGuildEvent.ANS_GUILD_MANAGELIST, this, this.updateData);
        SGuildData.instance.on(SGuildEvent.ANS_JOIN_GUID, this, this.updateData);
        SGuildData.instance.on(SGuildEvent.ANS_GUILD_MENBERLIST, this, this.updateData);
        SGuildData.instance.on(SGuildEvent.ANS_OTHER_EXIT_GUILD, this, this.updateData);
        SGuildData.instance.on(SGuildEvent.ANS_GUILD_POSITION_CHANGE, this, this.updateData);
        SGuildData.instance.on(SGuildEvent.REFRESH_CONTRI_DATA, this, this.updateData);

        SGuildData.instance.on(SGuildEvent.ANS_GUILD_CHANGE_NOTICE, this, this.changeNotice);
        SGuildData.instance.on(SGuildEvent.ANS_EXIT_GUILD, this, this.exitGuild);
    }
    private removeEvent() {
        SGuildData.instance.off(SGuildEvent.ASK_HOlE_GUILD_INFO, this, this.send40012);
        SGuildData.instance.off(SGuildEvent.ASK_GUILD_CHANGE_NOTICE, this, this.send40013);
        SGuildData.instance.off(SGuildEvent.ASK_GUILD_MANAGELIST, this, this.send40011);
        SGuildData.instance.off(SGuildEvent.ASK_GUILD_MENBERLIST, this, this.send40010);
        SGuildData.instance.off(SGuildEvent.ASK_EXIT_GUILD, this, this.send40008);

        SGuildData.instance.off(SGuildEvent.ASK_ALLOW_JOIN_GUILD, this, this.allowJoin);
        SGuildData.instance.off(SGuildEvent.ASK_REJECT_JOIN_GUILD, this, this.rejectJoin);
        SGuildData.instance.off(SGuildEvent.ASK_REJECT_ALL_JOIN_GUILD, this, this.rejectAllJoin);

        SGuildData.instance.off(SGuildEvent.ANS_GUILD_INFO, this, this.updateData);
        SGuildData.instance.off(SGuildEvent.ANS_GUILD_MANAGELIST, this, this.updateData);
        SGuildData.instance.off(SGuildEvent.ANS_JOIN_GUID, this, this.updateData);
        SGuildData.instance.off(SGuildEvent.ANS_GUILD_MENBERLIST, this, this.updateData);
        SGuildData.instance.off(SGuildEvent.ANS_OTHER_EXIT_GUILD, this, this.updateData);
        SGuildData.instance.off(SGuildEvent.ANS_GUILD_POSITION_CHANGE, this, this.updateData);
        SGuildData.instance.off(SGuildEvent.REFRESH_CONTRI_DATA, this, this.updateData);

        SGuildData.instance.off(SGuildEvent.ANS_GUILD_CHANGE_NOTICE, this, this.changeNotice);
        SGuildData.instance.off(SGuildEvent.ANS_EXIT_GUILD, this, this.exitGuild);
    }

    //请求帮派的完整信息
    private send40012(GuildId: number): void {
        this.protocol.send40012(GuildId);
    }

    //修改帮派公告
    private send40013(Tenet: string): void {
        this._tempNotice = Tenet;
        this.protocol.send40013(Tenet);
    }

    //个人在帮派中的相关信息
    private send40016(): void {
        this.protocol.send40016();
    }

    //请求帮派申请列表
    private send40011(): void {
        this.protocol.send40011();
    }

    //-----------申请列表处理--------------
    //同意加入帮派
    private allowJoin(PlayerId: number): void {
        this.send40004(PlayerId, 1)
    }
    //拒绝加入帮派
    private rejectJoin(PlayerId: number): void {
        this.send40004(PlayerId, 0)
    }
    //全部拒绝加入帮派
    private rejectAllJoin(): void {
        this.send40004(0, 2)
    }
    //处理帮派加入申请
    private send40004(PlayerId: number, Choise: number): void {
        this.protocol.send40004(PlayerId, Choise);
    }
    //-------------------------------------
    //请求帮派成员列表
    private send40010(pageIdx: number): void {
        this.protocol.send40010(pageIdx);
    }

    //请求退出帮派
    private send40008(): void {
        this.protocol.send40008();
    }

    //更新
    private updateData(): void {
        this.panel.updateData()
    }

    //更新公告
    private _tempNotice: string;
    private changeNotice(): void {
        if (this.panel.curretSp instanceof GuildInfoPanel) {
            SGuildData.instance.myGuildData.Notice = this._tempNotice;
            (this.panel.curretSp as GuildInfoPanel).ischangingGonggao = false;
            this.updateData();
        }
    }

    private exitGuild(): void {
        this.panel.close();
    }

}