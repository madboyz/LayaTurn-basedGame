import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { ScrollList } from "../../../compent/ScrollList";
import { PlayerTitleItem } from "../item/PlayerTitleItem";
import { AchieveVo } from "../../../../../db/sheet/vo/AchieveVo";
import { RoleFactory } from "../../../../battle/role/RoleFactory";
import { AoiInfo } from "../../../../aoi/AoiInfo";
import { S12002_1 } from "../../../../../net/pt/pt_12";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { PropertyUtil } from "../../../../property/PropertyUtil";
import { CommonControl } from "../../../../common/control/CommonControl";
import { GameUtils } from "../../../../utils/GameUtils";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { PlayerView } from "../../../../battle/role/PlayerView";

export class AttrItemText2 extends Laya.Text {
    constructor() {
        super();
        this.width = 192;
        this.height = 23;
        this.align = "left";
        this.valign = "middle";
        this.fontSize = 18;
        this.color = "#bf5005";
        this.overflow = Laya.Text.HIDDEN;
    }
}
export class PlayerTitlePanel extends ui.main.PlayerTitlePanelUI {
    public mList: ScrollList;
    public selectTitleVo = null;
    private role: PlayerView;
    private getAttrDataList = [];
    private installAttrDataList = [];
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            { url: "res/atlas/chapter.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/startgame.atlas", type: Laya.Loader.ATLAS }
        ];
    }

    private initList(): void {
        if (this.mList == null) {
            this.mList = new ScrollList(430, 197, 64, 187, PlayerTitleItem, 1, 1, this.onChange.bind(this));
            this.mList._preBtn.on(Laya.Event.MOUSE_DOWN, this, this.onPreBtnDownHandler);
            this.mList._nextBtn.on(Laya.Event.MOUSE_DOWN, this, this.onNextBtnDownHandler);
            this.addChild(this.mList);
            this.mList.x = (this.width - this.mList.width) >> 1;
            this.mList.y = 456;
            this.mList.moveBtnY(62);
        }

        this.GetAttrlList.itemRender = AttrItemText2;
        this.GetAttrlList.vScrollBarSkin = "";
        this.GetAttrlList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.GetAttrlList.scrollBar.elasticDistance = 100;

        this.InstallAttrList.itemRender = AttrItemText2;
        this.InstallAttrList.vScrollBarSkin = "";
        this.InstallAttrList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.InstallAttrList.scrollBar.elasticDistance = 100;
    }

    private initRole(): void {
        this.role = RoleFactory.CreateAOiPlayer(SRoleData.instance.info.Faction, SRoleData.instance.info.Sex);
        this.role.info = Laya.Pool.getItemByClass("AoiInfo", AoiInfo);
        var data = new S12002_1();
        data.Sex = SRoleData.instance.info.Sex;
        data.Faction = SRoleData.instance.info.Faction;
        data.Weapon = FactionVo.get(data.Faction).weapon_anim;
        this.role.info.PlayerInfo = data;
        this.role.scaleX = this.role.scaleY = 1.2;
        this.role.x = 284;
        this.role.y = 391;
        this.addChild(this.role);
        this.role.updateSkin();
    }

    public initComp() {
        super.initComp();
        this.initRole();
        this.BattleText.url = "res/atlas/number/fight.atlas";
        this.initList();
    }

    public open(...args): void {
        this.initWindow(true, false, "称号", 550, 750, 45);
        super.open();
        this.titleLb.text = "称号";
        this.updateAlldata();
        var info = this.role.info.getInfo(RoleType.OBJ_PLAYER);
        info.Clothes = SRoleData.instance.info.Clothes;
        this.role.updateSkin();
    }

    public updateAlldata() {
        var no = SRoleData.instance.info.GraphTitle;
        var list = SRoleData.instance.Titles;
        if (no == 0) {
            this.selectTitleVo = list[0];
        }
        else
            this.selectTitleVo = SRoleData.instance.allTitle.get(no);
        this.mList.dataProvider = SRoleData.instance.Titles;
        this.mList.selectedIndex = 0;
        this.updateCombat();
    }

    public update(): void {
    }

    private onPreBtnDownHandler(e: Event = null): void {
        this.checkSelect();
    }

    private onNextBtnDownHandler(e: Event = null): void {
        this.checkSelect();
    }

    public onChange(index: number): void {
        if (index == null) {
            index = this.mList.selectedIndex;
        }
        this.selectTitleVo = this.mList.dataProvider[index];
        this.RefreshTitleAnim(this.selectTitleVo.sheet);
        this.RefreshInstallAttr(this.selectTitleVo.sheet);
        this.RefreshGetAttr(this.selectTitleVo.sheet);
        this.onUpdateTimeDisplay();
        this.desTxt.text = this.selectTitleVo.sheet.male_desc + this.selectTitleVo.sheet.male_info;
        if (SRoleData.instance.info.GraphTitle == this.selectTitleVo.sheet.no || !this.selectTitleVo.isHave)
            this.changeBtn.visible = false;
        else
            this.changeBtn.visible = true;

        //update
        this.checkSelect();

    }

    public checkSelect(): void {
        var THIS = this;
        Laya.timer.once(100, this, function (): void {
            var i: number = 0, cells: Array<any> = THIS.mList.list.cells, len: number = cells.length, cell: any;
            for (i; i < len; i++) {
                cell = cells[i];
                if (cell) {
                    cell.checkSelect(THIS.selectTitleVo);
                }

            }
        });
    }

    public updateCombat(): void {
        if (SRoleData.instance.info) {
            this.BattleText.text = SRoleData.instance.info.BattlePower.toString();
        }
    }

    public RefreshTitleAnim(titleVo: AchieveVo) {
        if (!titleVo) return;
        var type = titleVo.effect[0];
        var url: string = titleVo.effect[1];
        switch (type) {
            case 1:
                {
                    this.titleImg.visible = true;
                    this.titleImg.skin = url;
                    this.titleAni && this.titleAni.stop();
                    this.titleAni && (this.titleAni.visible = false);
                    break;
                }
            case 2:
                {
                    this.titleImg.visible = false;
                    this.titleAni.visible = true;
                    this.titleAni.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
                    this.titleAni.loop = true;
                    this.titleAni.loadAtlas(url, Laya.Handler.create(this, () => {
                        this.titleAni.play();
                    }), null);
                    break;
                }
        }



    }

    public RefreshInstallAttr(titleVo: AchieveVo) {
        this.installAttrDataList = [];
        var attrs = titleVo.add_attr;
        for (let j = 0; j < attrs.length; j++) {
            const element = attrs[j];
            var attrKey = element[0];
            this.installAttrDataList.push({ key: attrKey, value1: element[1], value2: element[2] });
        }

        this.InstallAttrList.array = this.installAttrDataList;
    }

    public RefreshGetAttr(titleVo: AchieveVo) {
        this.getAttrDataList = [];
        var attrs = titleVo.ava_attr;
        for (let j = 0; j < attrs.length; j++) {
            const element = attrs[j];
            var attrKey = element[0];
            this.getAttrDataList.push({ key: attrKey, value1: element[1], value2: element[2] });
        }

        this.GetAttrlList.array = this.getAttrDataList;
    }

    public initEvent(): void {
        this.changeBtn.on(Laya.Event.CLICK, this, this.onClickChangeBtn);
        this.AttrBtn.on(Laya.Event.CLICK, this, this.onClickAttrBtn);
        this.GetAttrlList.renderHandler = new Laya.Handler(this, this.onGetAttrListRender);
        this.InstallAttrList.renderHandler = new Laya.Handler(this, this.onInstallAttrListRender);
        
        this.close_Btn.on(Laya.Event.CLICK, this, this.close);
        this.back_Btn.on(Laya.Event.CLICK, this, this.close);
    }

    public removeEvent(): void {
        this.changeBtn.off(Laya.Event.CLICK, this, this.onClickChangeBtn);
        this.AttrBtn.off(Laya.Event.CLICK, this, this.onClickAttrBtn);
        this.GetAttrlList.renderHandler = null;
        this.InstallAttrList.renderHandler = null;
        
        this.close_Btn.off(Laya.Event.CLICK, this, this.close);
        this.back_Btn.off(Laya.Event.CLICK, this, this.close);
    }

    private onGetAttrListRender(cell: Laya.Text, index: number): void {
        var attr = this.getAttrDataList[index];
        var vo = PropertyVo.getByInfo(attr.key);
        if (vo) {
            var str1 = "";
            var str2 = "";
            if (attr.value1 > 0) {
                var descValue = PropertyUtil.GetPropertyDec(vo.no, attr.value1);
                str1 = ` + ${descValue}`;
            }
            if (attr.value2 > 0) {
                str2 = ` + ${(attr.value2 * 100).toFixed(2)}%`;
            }
            var formate = ""
            if (index != this.GetAttrlList.array.length - 1) {
                formate = "\n";
            }
            cell.text = vo.name + str1 + str2 + formate;
        }
        else {
            cell.text = "未知属性";
        }
    }

    private onInstallAttrListRender(cell: Laya.Text, index: number): void {
        var attr = this.installAttrDataList[index];
        var vo = PropertyVo.getByInfo(attr.key);
        if (vo) {
            var str1 = "";
            var str2 = "";
            if (attr.value1 > 0) {
                var descValue = PropertyUtil.GetPropertyDec(vo.no, attr.value1);
                str1 = ` + ${descValue}`;
            }
            if (attr.value2 > 0) {
                str2 = ` + ${(attr.value2 * 100).toFixed(2)}%`;
            }
            var formate = ""
            if (index != this.InstallAttrList.array.length - 1) {
                formate = "\n";
            }
            cell.text = vo.name + str1 + str2 + formate;
        }
        else {
            cell.text = "未知属性";
        }
    }

    public onUpdateTimeDisplay() {
        if (this.selectTitleVo.expireTime == 0) {
            this.timeTxt.text = "";
        }
        else {
            var deltTime = this.selectTitleVo.expireTime - GameUtils.TimeStamp;
            if (deltTime == 0) {
                this.timeTxt.text = "";
                return;
            }
            var dd = TimerUtil.dd(deltTime);
            if (dd != "00") {
                this.timeTxt.text = `${dd}天后到期`;
            }
            else {
                var hh = TimerUtil.hh(deltTime);
                var mm = TimerUtil.mm(deltTime);
                var ss = TimerUtil.ss(deltTime);
                if (hh != "00") {
                    this.timeTxt.text = `${hh}时${mm}分${ss}秒后到期`;
                }
                else {
                    this.timeTxt.text = `${mm}分${ss}秒后到期`;
                }
            }

        }

    }

    private onClickChangeBtn(): void {
        if (SRoleData.instance.info.GraphTitle == this.selectTitleVo.sheet.no) return;
        this.event(SRoleEvent.ROLE_USE_TITLE, this.selectTitleVo.sheet.no);
    }

    private onClickAttrBtn(): void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [SRoleData.instance.info]);
    }

    public close(): void {
        super.close();
    }
}