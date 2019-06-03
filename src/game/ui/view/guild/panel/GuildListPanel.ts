import { S23005_1 } from "../../../../../net/pt/pt_23";
import { SJJCEvent } from "../../jjc/data/SJJCData";
import { SGuildData, SGuildEvent } from "../data/SGuildData";
import { S40017, S40017_1 } from "../../../../../net/pt/pt_40";
import { MsgManager } from "../../../manager/MsgManager";

export class GuildListPanel extends ui.main.GuildListPanelUI {
    private CurrentPage: number = 1;
    private TotalPage: number = 1;
    private findGuildName: string = "";
    public pageData: S40017;

    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/friend.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        this.LeftBtn.on(Laya.Event.CLICK, this, this.LeftBtnClick);
        this.RightBtn.on(Laya.Event.CLICK, this, this.RightBtnClick);
        this.creatGuildBtn.on(Laya.Event.CLICK, this, this.creatGuildBtnClick);
        this.btn_find.on(Laya.Event.CLICK, this, this.btn_findClick);
        this.applyAllBtn.on(Laya.Event.CLICK, this, this.applyAllBtnClick);
    }

    public removeEvent(): void {
        this.LeftBtn.off(Laya.Event.CLICK, this, this.LeftBtnClick);
        this.RightBtn.off(Laya.Event.CLICK, this, this.RightBtnClick);
        this.creatGuildBtn.off(Laya.Event.CLICK, this, this.creatGuildBtnClick);
        this.btn_find.off(Laya.Event.CLICK, this, this.btn_findClick);
        this.applyAllBtn.off(Laya.Event.CLICK, this, this.applyAllBtnClick);
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.Page.url = "res/atlas/number/fight.atlas";
        this.Page.scale(0.7, 0.7);
        this.Page.text = `${this.CurrentPage}-${this.TotalPage}`;
    }

    private initList(): void {
        this.guildList.itemRender = GuildListItem;
    }



    public open(...args): void {
        this.initWindow(true, true, "帮派列表", 550, 750, 50);
        super.open();
        this.txt_name.text = "";
        this.update();
    }

    private LeftBtnClick(): void {
        this.findGuildName = this.txt_name.text || "";
        SGuildData.instance.event(SGuildEvent.ASK_GUILD_LIST, [this.CurrentPage - 1, this.findGuildName]);
    }

    private RightBtnClick(): void {
        this.findGuildName = this.txt_name.text || "";
        SGuildData.instance.event(SGuildEvent.ASK_GUILD_LIST, [this.CurrentPage + 1, this.findGuildName]);
    }

    private creatGuildBtnClick(): void {
        UIManager.instance.openUI(UIID.GUILD_CREAT_PANEL);
    }

    private btn_findClick(): void {
        SGuildData.instance.event(SGuildEvent.ASK_GUILD_LIST, [1, this.txt_name.text]);
    }

    private applyAllBtnClick(): void {
        for (let i = 0; i < this.pageData.item_1.length; i++) {
            var ele = this.pageData.item_1[i];
            if (ele.CurMbCount < ele.MbCapacity && ele.HasApplied == 0) {
                SGuildData.instance.event(SGuildEvent.ASK_JOIN_GUILD, ele);
                ele.HasApplied = 1;
            }
        }
        if (this.pageData.item_1.length <= 0) {
            SGuildData.instance.protocol.send40003(0);//没有帮派发0过去；
        }

        this.guildList.refresh();
    }

    public update(): void {
        this.pageData = SGuildData.instance.guildList;
        if (!this.pageData || this.pageData.RetCode != 0) {
            this.noDataBox.visible = false;
            this.guildList.array = [];
            return;
        }
        this.CurrentPage = this.pageData.PageNum;
        this.TotalPage = this.pageData.TotalPage;
        if (this.findGuildName == "" && this.pageData.item_1.length == 0) {
            this.baseBox.visible = false;
            this.noDataBox.visible = true;
        } else {
            this.baseBox.visible = true;
            this.noDataBox.visible = false;
        }
        //处理按钮相关
        this.LeftBtn.gray = this.CurrentPage <= 1;
        this.RightBtn.gray = this.CurrentPage >= this.TotalPage;
        this.Page.text = `${this.CurrentPage}-${this.TotalPage}`;
        //列表数据
        this.guildList.array = this.pageData.item_1;
    }

    public close(): void {
        super.close();
    }
}


export class GuildListItem extends ui.main.GuildListItemUI {
    constructor() {
        super();
        this.applyBtn.on(Laya.Event.CLICK, this, this.applyBtnClick);
    }

    private _mdata: S40017_1;
    public set dataSource(data: S40017_1) {
        if (!data) {
            return;
        }
        this._mdata = data;
        //显示
        var index = (this.parent.parent.parent.parent as GuildListPanel).pageData.item_1.indexOf(data);
        this.bgImg.visible = index % 2 == 0;
        this.rankLb.text = data.Rank + "";
        this.guildLvLb.text = data.Lv + "";
        this.guildNameLb.text = data.GuildName;
        this.guildLeaderLb.text = data.ChiefName;
        this.powerLb.text = GMath.GetChineseNumber(data.GuildBP);
        this.personLb.text = data.CurMbCount + "/" + data.MbCapacity;
        if (data.CurMbCount >= data.MbCapacity) {
            this.applyBtn.gray = true;
            this.applyBtn.label = "已满";
        } else if (data.HasApplied == 1) {
            this.applyBtn.gray = true;
            this.applyBtn.label = "已申请";
        } else {
            this.applyBtn.gray = false;
            this.applyBtn.label = "申请";
        }
    }

    public applyBtnClick(): void {
        SGuildData.instance.event(SGuildEvent.ASK_JOIN_GUILD, this._mdata);
        this._mdata.HasApplied = 1;
        this.dataSource = this._mdata;
    }

    public destroy(): void {
        super.destroy();
    }

}