import { SGuildData, SGuildEvent } from "../data/SGuildData";
import { S40011_1 } from "../../../../../net/pt/pt_40";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { GameUtils } from "../../../../utils/GameUtils";
import { GuildPositionType } from "../data/GuildHelper";

export class GuildManagePanel extends ui.main.GuildManagePanelUI {
    constructor() {
        super();
        this.initComp();
        this.requestInfo();
    }

    private initComp(): void {
        this.initEvent();
        this.manageList.vScrollBarSkin = "";
        this.manageList.itemRender = GuildManageItem;
        this.manageList.array = [];
    }

    public initEvent(): void {
        this.rejectAllBtn.on(Laya.Event.CLICK, this, this.rejectAllBtnClick);
        this.typeBox0.on(Laya.Event.CLICK, this, this.typeBox0Click);
        this.typeBox1.on(Laya.Event.CLICK, this, this.typeBox1Click);
        this.typeBox2.on(Laya.Event.CLICK, this, this.typeBox2Click);
    }

    public removeEvent(): void {
        this.rejectAllBtn.off(Laya.Event.CLICK, this, this.rejectAllBtnClick);
        this.typeBox0.off(Laya.Event.CLICK, this, this.typeBox0Click);
        this.typeBox1.off(Laya.Event.CLICK, this, this.typeBox1Click);
        this.typeBox2.off(Laya.Event.CLICK, this, this.typeBox2Click);
    }

    private requestInfo(): void {
        SGuildData.instance.event(SGuildEvent.ASK_GUILD_MANAGELIST);
    }

    private rejectAllBtnClick(): void {
        SGuildData.instance.event(SGuildEvent.ASK_REJECT_ALL_JOIN_GUILD);
    }

    public updateData(): void {
        var applyList = SGuildData.instance.applyList;
        if (!applyList) {
            return;
        }
        this.manageList.array = applyList.item_1;
        this.noApplyBox.visible = applyList.item_1.length <= 0;

        for (let i = 0; i <= 2; i++) {
            (this["typeBtn" + i] as Laya.Button).selected = SGuildData.instance.myGuildData.HandleApplyState == i;
        }
    }

    public destroy(): any {
        SGuildData.instance.haveApply = SGuildData.instance.applyList.item_1.length > 0;
        this.removeEvent();
        super.destroy();
    }

    private typeBox0Click():void{
        SGuildData.instance.protocol.send40062(0);
    }
    private typeBox1Click():void{
        SGuildData.instance.protocol.send40062(1);
    }
    private typeBox2Click():void{
        SGuildData.instance.protocol.send40062(2);
    }

}


export class GuildManageItem extends ui.main.GuildManageItemUI {
    constructor() {
        super();
        this.btn_tongyi.on(Laya.Event.CLICK, this, this.btn_tongyiClick);
        this.btn_hulue.on(Laya.Event.CLICK, this, this.btn_hulueClick);
    }

    private _mdata: S40011_1;
    public set dataSource(data: S40011_1) {
        if (!data) {
            return;
        }
        this._mdata = data;
        this.titleLb.innerHTML = HtmlUtils.addColor(this._mdata.Name, "#00b007", 20) + HtmlUtils.addColor("申请加入帮派", "#8e5213", 20);
        this.txt_power.text = "战力：" + this._mdata.BattlePower;
        this.txt_lv.text = "Lv." + this._mdata.Lv;
        this.headImg.skin = FactionVo.get(this._mdata.Faction).head_icon[this._mdata.Sex - 1];
        this.txt_offLine.text = TimerUtil.getOffLineTime(GameUtils.TimeStamp - this._mdata.Time);
        var myGuildPosition = SGuildData.instance.myGuildPosition;
        var canManage = (myGuildPosition.Position == GuildPositionType.leader || myGuildPosition.Position == GuildPositionType.subLeader
            || myGuildPosition.Position == GuildPositionType.elite);
        this.btn_tongyi.visible = this.btn_hulue.visible = canManage;

    }

    public btn_tongyiClick(): void {
        SGuildData.instance.event(SGuildEvent.ASK_ALLOW_JOIN_GUILD, this._mdata.PlayerId);
    }

    public btn_hulueClick(): void {
        SGuildData.instance.event(SGuildEvent.ASK_REJECT_JOIN_GUILD, this._mdata.PlayerId);
    }

    public destroy(): void {
        this.btn_tongyi.off(Laya.Event.CLICK, this, this.btn_tongyiClick);
        this.btn_hulue.off(Laya.Event.CLICK, this, this.btn_hulueClick);
        super.destroy();
    }

}