import { SGuildData, SGuildEvent } from "../data/SGuildData";
import { S40010, S40010_1 } from "../../../../../net/pt/pt_40";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { GuildHelper, GuildPositionType } from "../data/GuildHelper";
import { GameUtils } from "../../../../utils/GameUtils";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { SGameData } from "../../../../../net/data/SGameData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { Alert } from "../../../compent/Alert";
import { HtmlUtils } from "../../../../utils/HtmlUtils";

export class GuildMenberListPanel extends ui.main.GuildMenberListPanelUI {
    private CurrentPage: number = 1;
    private TotalPage: number = 1;
    public pageData: S40010;

    constructor() {
        super();
        this.initComp();
        this.requestInfo();
    }

    private initComp(): void {
        this.initEvent();
        this.menberList.vScrollBarSkin = "";
        this.menberList.itemRender = GuildMenberListItem;
        this.menberList.array = [];

        this.Page.url = "res/atlas/number/fight.atlas";
        this.Page.scale(0.7, 0.7);
        this.Page.text = `${this.CurrentPage}-${this.TotalPage}`;
        this.LeftBtn.gray = true;
        this.RightBtn.gray = true;
    }


    private LeftBtnClick(): void {
        SGuildData.instance.event(SGuildEvent.ASK_GUILD_MENBERLIST, [this.CurrentPage - 1]);
    }

    private RightBtnClick(): void {
        SGuildData.instance.event(SGuildEvent.ASK_GUILD_MENBERLIST, [this.CurrentPage + 1]);
    }

    private initEvent(): void {
        this.LeftBtn.on(Laya.Event.CLICK, this, this.LeftBtnClick);
        this.RightBtn.on(Laya.Event.CLICK, this, this.RightBtnClick);
    }

    private removeEvent(): void {
        this.LeftBtn.off(Laya.Event.CLICK, this, this.LeftBtnClick);
        this.RightBtn.off(Laya.Event.CLICK, this, this.RightBtnClick);
    }

    private requestInfo(): void {
        SGuildData.instance.event(SGuildEvent.ASK_GUILD_MENBERLIST, [this.CurrentPage]);
    }

    public updateData(): void {
        var menberList = SGuildData.instance.menberList;
        if (!menberList) {
            return;
        }
        this.CurrentPage = menberList.PageNum;
        this.TotalPage = menberList.TotalPage;
        //处理按钮相关
        this.LeftBtn.gray = this.CurrentPage <= 1;
        this.RightBtn.gray = this.CurrentPage >= this.TotalPage;
        this.Page.text = `${this.CurrentPage}-${this.TotalPage}`;
        //列表数据
        this.menberList.array = menberList.item_1;

    }

    public destroy(): any {
        this.removeEvent();
        super.destroy();
    }
}


export class GuildMenberListItem extends ui.main.GuildMenberListItemUI {
    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.thisClick);
        this.btn_exit.on(Laya.Event.CLICK, this, this.btn_exitClick);
    }

    private _mdata: S40010_1;
    public set dataSource(data: S40010_1) {
        if (!data) {
            return;
        }
        this._mdata = data;
        this.headImg.skin = FactionVo.get(this._mdata.Faction).head_icon[this._mdata.Sex - 1];
        this.txt_name.text = this._mdata.Name;
        this.txt_position.text = "帮派职位：" + GuildHelper.getPositionName(this._mdata.Position);
        this.txt_lv.text = "Lv." + this._mdata.Lv;
        this.txt_power.text = "战力：" + this._mdata.BattlePower;
        this.txt_offLine.text = this._mdata.Online == 0 ? "在线" : (TimerUtil.getOffLineTime(GameUtils.TimeStamp - this._mdata.Online));;
        this.txt_gongxian.text = "贡献：" + this._mdata.Contri;
        this.btn_exit.visible = this._mdata.PlayerId == SRoleData.instance.info.PlayerId;
    }

    private btn_exitClick(e: Laya.Event): void {
        var myGuildPosition = SGuildData.instance.myGuildPosition;
        //退出帮派
        var str: string = HtmlUtils.addColor("确定要退出帮派？", "#8a5428", 20)
            + (myGuildPosition.Position == GuildPositionType.leader ? HtmlUtils.addColor("帮主之位将会自动移交给别人", "#8a5428", 20) : "");
        Alert.show(str, this, () => {
            SGuildData.instance.event(SGuildEvent.ASK_EXIT_GUILD);
        }, null, null, null, true, "退出帮派");
        //阻止后面事件
        e.stopPropagation();
    }

    private thisClick(e:Laya.Event): void {
        var myGuildPosition = SGuildData.instance.myGuildPosition;
        var canRenmin = myGuildPosition.Position == GuildPositionType.leader && myGuildPosition.Position < this._mdata.Position;
        var canTiren = (myGuildPosition.Position == GuildPositionType.leader || myGuildPosition.Position == GuildPositionType.subLeader)
            && myGuildPosition.Position < this._mdata.Position;
        if (!canRenmin && !canTiren) {
            return;
        }
        var clickPoint = new Laya.Point(e.stageX,e.stageY);
        UIManager.instance.openUI(UIID.GUILD_MENBER_HANDLE_PANEL, [this._mdata,clickPoint]);
    }

    public destroy(): void {
        super.destroy();
    }

}