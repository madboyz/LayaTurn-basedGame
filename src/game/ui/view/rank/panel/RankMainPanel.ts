import { SRankEvent } from "../protocol/RankMainProrocol";
import { TabBar } from "../../../compent/TabBar";
import { S22001_1, S22002_1, S22001 } from "../../../../../net/pt/pt_22";
import { Pet_cultivateVo } from "../../../../../db/sheet/vo/Pet_cultivateVo";
import { Aerocraft_starVo } from "../../../../../db/sheet/vo/Aerocraft_starVo";
import { ObjView } from "../../../../battle/role/ObjView";
import { PetVo } from "../../../../../db/sheet/vo/PetVo";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { RoleView } from "../../../../battle/role/RoleView";
import { Comate_cfgVo } from "../../../../../db/sheet/vo/Comate_cfgVo";
import { Aerocraft_skinVo } from "../../../../../db/sheet/vo/Aerocraft_skinVo";
import { GameUtils } from "../../../../utils/GameUtils";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { MsgManager } from "../../../manager/MsgManager";
import { FashionHelper } from "../../fashion/control/FashionHelper";

export enum RankType {
    BATTLE_POWER = 1001,//战力
    ROLE_LEVEL = 1002,//等级
    DUNGEON_LEVEL = 22001,//秘境关卡
    MAIN_LEVEL = 22002,//主线关卡
    PET = 2001,//修炼
    RIDE = 22003,//坐骑
    TONGTIANTA = 22004,//通天塔
    JJC = 22005,//竞技场
    COMATE = 22006,//伙伴
    SANJIE = 22007,//三界副本
    CHUANGTIANGONG = 22008,//勇闯天宫
}

export class RankMainPanel extends ui.main.RankMainPanelUI {
    private mTab: TabBar;
    public CurrentPage = 1;
    private TotalPage = 1;
    private Roleview1st: ObjView;
    private mountView: RoleView;
    private CurrentRankType = RankType.BATTLE_POWER;
    private items = [];
    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/rank.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.items = [this.ranitem1, this.ranitem2, this.ranitem3, this.ranitem4];
        this.Page.url = "res/atlas/number/fight.atlas";
        this.Page.scale(0.7, 0.7);
        if (!this.mTab) {
            this.mTab = new TabBar([this.Btn_0, this.Btn_1, this.Btn_2, this.Btn_3, this.Btn_4, this.Btn_5, this.Btn_6, this.Btn_7], null,
                Laya.Handler.create(this, this.clickCheck, null, false));
        }
        this.Value1st.url = "res/atlas/number/fight.atlas";
        this.Value1st.scale(0.7, 0.7);
        this.initMountView();
        this.Roleview1st = Laya.Pool.getItemByClass("ObjView", ObjView);
        this.Roleview1st.x = 365;
        this.Roleview1st.y = 350;
        this.Roleview1st.scaleX = this.Roleview1st.scaleY = 1;
        this.addChildAt(this.Roleview1st, 9);

        this.Page.text = `${this.CurrentPage}-${this.TotalPage}`;
    }

    public initMountView(): void {
        this.mountView = new RoleView();
        this.mountView.info = "";
        this.mountView.angle = 0;
        this.mountView.scaleX = this.mountView.scaleY = 1;
        this.addChildAt(this.mountView, 8);
        this.mountView.x = 365;
        this.mountView.y = 350;
    }

    public open(...args): void {
        this.initWindow(true, true, "排行榜", 550, 750, 50);
        super.open();
        for (let index = 0; index < this.items.length; index++) {
            const item = this.items[index];
            item.visible = false;
        }
        this.Refresh1st(null);
    }

    public updateRank(args) {
        if (this.arg && this.arg[0]) {
            var tabIndex = 0;
            var checkId = Number(this.arg[0]);
            switch (checkId) {
                case RankType.BATTLE_POWER: tabIndex = 0; break;
                case RankType.ROLE_LEVEL: tabIndex = 1; break;
                case RankType.PET: tabIndex = 2; break;
                case RankType.RIDE: tabIndex = 3; break;
                case RankType.DUNGEON_LEVEL: tabIndex = 4; break;
                case RankType.MAIN_LEVEL: tabIndex = 5; break;
                case RankType.JJC: tabIndex = 6; break;
                case RankType.COMATE: tabIndex = 7; break;
            }
            this.mTab.select = tabIndex;
        } else {
            this.mTab.select = this.tabIndex;
        }
    }

    public initEvent(): void {
        this.LeftBtn.on(Laya.Event.CLICK, this, this.onClickLeftBtn);
        this.RightBtn.on(Laya.Event.CLICK, this, this.onClicRightBtn);
        this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
    }

    public removeEvent(): void {
        this.LeftBtn.off(Laya.Event.CLICK, this, this.onClickLeftBtn);
        this.RightBtn.off(Laya.Event.CLICK, this, this.onClicRightBtn);
        this.mTab.off(Laya.Event.CHANGE, this, this.onTabChange);
    }

    private clickCheck(index): boolean {
        if (index == 6) {
            var day = ConstVo.get("PVP_RANK_SHOW_LIMIT").val;
            var showJJC = (GameUtils.TimeStamp - GameUtils.openSeverTimeStamp) > day * 24 * 3600;
            if (!showJJC) {
                MsgManager.instance.showRollTipsMsg(`开服${day}天后开启`);
                return false;
            }
        }
        return true;
    }

    private onTabChange(index: number, btn: Laya.Button) {
        this.CurrentPage = 1;
        this.Roleview1st.y = 360;
        switch (index) {
            case 0:
                {
                    this.CurrentRankType = RankType.BATTLE_POWER;
                    break;
                }
            case 1:
                {
                    this.CurrentRankType = RankType.ROLE_LEVEL;
                    break;
                }
            case 2:
                {
                    this.CurrentRankType = RankType.PET;
                    break;
                }
            case 3:
                {
                    this.CurrentRankType = RankType.RIDE;

                    this.Roleview1st.y = 360 - this.Roleview1st.offsetY;
                    break;
                }
            case 4:
                {
                    this.CurrentRankType = RankType.DUNGEON_LEVEL;
                    break;
                }
            case 5:
                {
                    this.CurrentRankType = RankType.MAIN_LEVEL;
                    break;
                }
            case 6:
                {
                    this.CurrentRankType = RankType.JJC;
                    break;
                }
            case 7:
                {
                    this.CurrentRankType = RankType.COMATE;
                    break;
                }
        }
        this.event(SRankEvent.RANK_PAGE_LIST, [this.CurrentPage, this.CurrentRankType]);
    }
    public updatePage(rankType: number, data: any) {
        var total = 1;
        if (data.RankCount > 5) {
            total += Math.ceil((data.RankCount - 5) / 4);
        }
        else if (data.RankCount == 0) {
            this.Refresh1st(null);
        }

        this.TotalPage = total;
        this.Page.text = `${this.CurrentPage}-${this.TotalPage}`;
        for (let index = 0; index < this.items.length; index++) {
            const item = this.items[index];
            item.visible = false;
        }
        if (data.MyRank == 0) {
            if (data.RankCount == 0) {
                this.MyRankText.text = "";
            }
            else {
                this.MyRankText.text = "我的排名:未上榜";
            }

        }
        else {
            this.MyRankText.text = `我的排名:${data.MyRank}`;
        }
        if (rankType != this.CurrentRankType || data.PageIndex != this.CurrentPage) {
            return;
        }
        var itemIndex = 0;
        for (let index = 0; index < data.item_1.length; index++) {
            var _data = data.item_1[index];
            if (_data.Rank == 1) {
                this.Refresh1st(_data);
                itemIndex = 0;
            }
            else {
                const item = this.items[itemIndex];
                item.visible = true;
                this.RefreshOtherIndex(item, _data, _data.Rank);
                itemIndex++;
            }

        }
    }

    /**
     * 第一名
     */
    private Refresh1st(data: any) {
        if (data == null) {
            this.Box1st.visible = false;
            this.NameText1st.text = "";
            this.Roleview1st.visible = false;
            this.mountView.visible = false;
            this.Value1st.visible = false;
            return;
        }
        this.star1st.visible = false;
        this.Box1st.visible = true;
        this.mountView.visible = true;
        this.NameText1st.text = data.PlayerName;
        var value1 = data.item_1[0].Value;
        switch (this.CurrentRankType) {
            case RankType.BATTLE_POWER:
                {
                    var Playervo: FactionVo = FactionVo.get(data.Faction);
                    if (Playervo) {
                        this.Roleview1st.resPath = FashionHelper.getAnimRes(data.Faction, data.Clothes, data.Sex);//Playervo.body_anim[data.Sex == 1 ? 0 : 1];
                    }
                    if (data.AerocraftNo && data.AerocraftNo != 0) {
                        var mountRes: string = Aerocraft_skinVo.get(data.AerocraftNo).body_anim;
                    } else {
                        var mountRes: string = "";
                    }
                    this.mountView.resPath = mountRes;
                    this.Value1st.x = 13;
                    this.Value1st.text = `l${value1}`;
                    this.Roleview1st.y = 330;
                    this.mountView.y = 330;
                    break;
                }
            case RankType.ROLE_LEVEL:
                {
                    var Playervo: FactionVo = FactionVo.get(data.Faction);
                    if (Playervo) {
                        this.Roleview1st.resPath = FashionHelper.getAnimRes(data.Faction, data.Clothes, data.Sex);//Playervo.body_anim[data.Sex == 1 ? 0 : 1];
                    }
                    if (data.AerocraftNo && data.AerocraftNo != 0) {
                        var mountRes: string = Aerocraft_skinVo.get(data.AerocraftNo).body_anim;
                    } else {
                        var mountRes: string = "";
                    }
                    this.mountView.resPath = mountRes;
                    this.Roleview1st.y = 330;
                    this.mountView.y = 330;
                    this.Value1st.x = 49;
                    this.Value1st.text = `${value1}j`;
                    break;
                }
            case RankType.PET:
                {
                    var vo = PetVo.get(data.PartnerNo);
                    if (vo) {
                        this.Roleview1st.resPath = vo.body;
                    }
                    this.mountView.visible = false;
                    this.Roleview1st.y = 360;
                    this.mountView.y = 360;
                    this.Value1st.x = 13;
                    this.Value1st.text = `l${value1}`;
                    break;
                }
            case RankType.RIDE:
                {
                    // var rideStar = data.item_1[1].Value;
                    // var anim = Aerocraft_starVo.getAnim(rideStar);
                    // this.Roleview1st.resPath = anim;
                    // this.mountView.visible = false;
                    if (data.PartnerNo && data.PartnerNo != 0) {
                        var mountRes: string = Aerocraft_skinVo.get(data.PartnerNo).body_anim;
                    } else {
                        var mountRes: string = Aerocraft_skinVo.get(1).body_anim;//坐骑榜，必须显示一个，如果别人下了坐骑，那这边就使用默认的纸飞机
                    }
                    this.Roleview1st.resPath = mountRes;
                    this.mountView.visible = false;
                    this.Roleview1st.y = 330;
                    this.Value1st.x = 13;
                    this.Value1st.text = `l${value1}`;
                    break;
                }
            case RankType.DUNGEON_LEVEL:
                {
                    var Playervo: FactionVo = FactionVo.get(data.Faction);
                    if (Playervo) {
                        this.Roleview1st.resPath = FashionHelper.getAnimRes(data.Faction, data.Clothes, data.Sex);//Playervo.body_anim[data.Sex == 1 ? 0 : 1];
                    }
                    if (data.AerocraftNo && data.AerocraftNo != 0) {
                        var mountRes: string = Aerocraft_skinVo.get(data.AerocraftNo).body_anim;
                    } else {
                        var mountRes: string = "";
                    }
                    this.mountView.resPath = mountRes;
                    this.Value1st.x = 80;
                    this.Roleview1st.y = 330;
                    this.mountView.y = 330;
                    this.Value1st.text = `${value1}`;
                    this.star1st.visible = true;
                    break;
                }
            case RankType.MAIN_LEVEL:
                {
                    var Playervo: FactionVo = FactionVo.get(data.Faction);
                    if (Playervo) {
                        this.Roleview1st.resPath = FashionHelper.getAnimRes(data.Faction, data.Clothes, data.Sex);//Playervo.body_anim[data.Sex == 1 ? 0 : 1];
                    }
                    if (data.AerocraftNo && data.AerocraftNo != 0) {
                        var mountRes: string = Aerocraft_skinVo.get(data.AerocraftNo).body_anim;
                    } else {
                        var mountRes: string = "";
                    }
                    this.mountView.resPath = mountRes;
                    this.Value1st.x = 40;
                    this.Value1st.text = `d${value1}g`;
                    this.Roleview1st.y = 330;
                    this.mountView.y = 330;
                    break;
                }
            case RankType.JJC:
                {
                    var Playervo: FactionVo = FactionVo.get(data.Faction);
                    if (Playervo) {
                        this.Roleview1st.resPath = FashionHelper.getAnimRes(data.Faction, data.Clothes, data.Sex);//Playervo.body_anim[data.Sex == 1 ? 0 : 1];
                    }
                    if (data.AerocraftNo && data.AerocraftNo != 0) {
                        var mountRes: string = Aerocraft_skinVo.get(data.AerocraftNo).body_anim;
                    } else {
                        var mountRes: string = "";
                    }
                    this.mountView.resPath = mountRes;
                    this.Value1st.x = 13;
                    this.Value1st.text = `l${value1}`;
                    this.Roleview1st.y = 330;
                    this.mountView.y = 330;
                    break;
                }
            case RankType.COMATE:
                {
                    var comateVo: Comate_cfgVo = Comate_cfgVo.get(data.PartnerNo);
                    if (comateVo) {
                        this.Roleview1st.resPath = comateVo.body_anim;
                    }
                    this.mountView.visible = false;
                    this.Roleview1st.y = 360;
                    this.mountView.y = 360;
                    this.Value1st.x = 13;
                    this.Value1st.text = `l${value1}`;
                    break;
                }
        }
        this.Value1st.visible = true;
        this.Roleview1st.visible = true;
        this.Roleview1st.updateSkin();
        this.mountView.updateSkin();
    }

    //其他名词
    private RefreshOtherIndex(item: Laya.Sprite, data: any, index: number) {

        var icon = item.getChildByName("icon") as Laya.Image;
        var nameText = item.getChildByName("name") as Laya.Text;
        var value1Text = item.getChildByName("value1") as Laya.Text;
        var value2Text = item.getChildByName("value2") as Laya.Text;
        var indexText = item.getChildByName("index") as Laya.Text;
        var star = item.getChildByName("star") as Laya.Image;
        value2Text.text = "";
        nameText.text = data.PlayerName;
        if (index > 3) {
            icon.visible = false;
            indexText.visible = true;
            indexText.text = index.toString();
        }
        else {
            icon.visible = true;
            indexText.visible = false;
            icon.skin = `rank/${index}st.png`;
        }
        star.visible = false;
        switch (this.CurrentRankType) {
            case RankType.BATTLE_POWER:
                {
                    var _data = data as S22001_1;
                    var valueStr = GMath.GetChineseNumber(_data.item_1[0].Value);
                    value1Text.text = `战力:${valueStr}`;
                    break;
                }
            case RankType.ROLE_LEVEL:
                {
                    var _data = data as S22001_1;
                    var valueStr = GMath.GetChineseNumber(_data.item_1[0].Value);
                    value1Text.text = `${valueStr}级`;
                    break;
                }
            case RankType.PET:
                {
                    var data1 = data as S22002_1;
                    var valueStr = GMath.GetChineseNumber(data1.item_1[0].Value);
                    value1Text.text = `战力:${valueStr}`;
                    if (data1.item_1[1]) {
                        var value2 = data1.item_1[1].Value;//宠物是修炼
                        var vo = Pet_cultivateVo.get(value2);
                        //各种服务端发的要判断
                        if (vo && vo.title && vo.title != 0) {
                            value2Text.text = vo.title;
                        }
                    }

                    break;
                }
            case RankType.RIDE:
                {
                    var data1 = data as S22002_1;
                    var valueStr = GMath.GetChineseNumber(data1.item_1[0].Value);
                    value1Text.text = `战力:${valueStr}`;
                    if (data1.item_1[1]) {
                        var value2 = data1.item_1[1].Value;//坐骑是飞升
                        value2Text.text = `飞升${value2}`;
                    }
                    break;
                }
            case RankType.DUNGEON_LEVEL:
                {
                    var _data = data as S22001_1;
                    var valueStr = GMath.GetChineseNumber(_data.item_1[0].Value);
                    value1Text.text = ` ${valueStr}`;
                    star.x = 135 - (valueStr.length - 1) * 5;
                    star.visible = true;
                    break;
                }
            case RankType.MAIN_LEVEL:
                {
                    var _data = data as S22001_1;
                    var valueStr = GMath.GetChineseNumber(_data.item_1[0].Value);
                    value1Text.text = `第${valueStr}关`;
                    break;
                }
            case RankType.JJC:
                {
                    var _data = data as S22001_1;
                    var valueStr = GMath.GetChineseNumber(_data.item_1[0].Value);
                    value1Text.text = `战力:${valueStr}`;
                    break;
                }
            case RankType.COMATE:
                {
                    var data1 = data as S22002_1;
                    var valueStr = GMath.GetChineseNumber(data1.item_1[0].Value);
                    value1Text.text = `战力:${valueStr}`;
                    break;
                }
            //case RankType.MAIN_LEVEL:
            //{
            //    var _data = data as S22001_1;
            //    var valueStr = GMath.GetChineseNumber(_data.item_1[0].Value);
            //    value1Text.text = `等级:${valueStr}`;
            //    break;
            //}
        }
    }

    private onClickLeftBtn(): void {
        if (this.CurrentPage == 1) {
            return;
        }
        this.CurrentPage--;
        this.Page.text = `${this.CurrentPage}-${this.TotalPage}`;
        this.event(SRankEvent.RANK_PAGE_LIST, [this.CurrentPage, this.CurrentRankType]);
    }

    private onClicRightBtn(): void {
        if (this.CurrentPage >= this.TotalPage) {
            return;
        }
        this.CurrentPage++;
        this.Page.text = `${this.CurrentPage}-${this.TotalPage}`;
        this.event(SRankEvent.RANK_PAGE_LIST, [this.CurrentPage, this.CurrentRankType]);
    }

    public close(): void {
        super.close();
    }

}