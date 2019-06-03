import { Aerocraft_skinVo } from "../../../../../db/sheet/vo/Aerocraft_skinVo";
import { Aerocraft_starVo } from "../../../../../db/sheet/vo/Aerocraft_starVo";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { SMountData, SMountEvent } from "../../../../../net/data/SmountData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { S12002_1 } from "../../../../../net/pt/pt_12";
import { AoiInfo } from "../../../../aoi/AoiInfo";
import { PlayerView } from "../../../../battle/role/PlayerView";
import { RoleFactory } from "../../../../battle/role/RoleFactory";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { RedDotType } from "../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { ScrollList } from "../../../compent/ScrollList";
import { TabBar } from "../../../compent/TabBar";
import { MsgManager } from "../../../manager/MsgManager";
import { MountModelItem } from "../item/MountModelItem";

export class MountPanel extends ui.main.MountPanelUI {
    protected mItemList: ScrollList;
    private mTab: TabBar;
    private item: BaseItem;
    private role: PlayerView;
    private expBar: ProgressBar;
    public curIndex: number = -1;
    public _isAuto: boolean;
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [

            { url: "res/atlas/mount.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.combat.url = "res/atlas/number/fight.atlas";
        HtmlUtils.setHtml(this.txt_m.style, 6, 20, "center", "middle");
        HtmlUtils.setHtml(this.txt_desc.style, 6, 20, "center", "middle");
        HtmlUtils.setHtml(this.txt_attr_desc.style, 6, 20, "center", "middle");
        this.initList();
        this.initAttrList();
        this.initItem();
        this.initTab();
        this.initRole();
        this.initBar();
        this.updateData();
    }

    private initBar(): void {
        this.expBar = new ProgressBar();
        this.expBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_greenBar"), 402, 24);
        this.expBar.setLabel(1, 20, "#ffffff");
        this.expBar.x = 122;
        this.expBar.y = 547;
        this.addChild(this.expBar);
    }

    private initTab(): void {
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2], [UIID.SYS_MOUNT, UIID.SYS_MOUNT_STAR, UIID.SYS_MOUNT_FEISHENG]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
    }

    private initList(): void {
        if (this.mItemList == null) {
            this.mItemList = new ScrollList(468, 298, 374, 298, MountModelItem, 0, 1, this.onChange.bind(this));
            this.mItemList._preBtn.on(Laya.Event.MOUSE_DOWN, this, this.onPreBtnDownHandler);
            this.mItemList._nextBtn.on(Laya.Event.MOUSE_DOWN, this, this.onNextBtnDownHandler);
            this.addChildAt(this.mItemList, 5);
            this.mItemList.x = (this.width - this.mItemList.width) >> 1;
            this.mItemList.y = 210;
        }
        this.initBtnData();
    }


    private initAttrList(): void {
        this.attrList.renderHandler = new Laya.Handler(this, this.updateAttrItem)
        this.attrList.vScrollBarSkin = "";
    }

    private initItem(): void {
        if (!this.item) {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.cost.addChild(this.item);
            this.item.y = 38;
        }
    }

    private initRole(): void {
        this.role = RoleFactory.CreateAOiPlayer(SRoleData.instance.info.Faction, SRoleData.instance.info.Sex);
        this.role.info = Laya.Pool.getItemByClass("AoiInfo", AoiInfo);
        var data = new S12002_1();
        data.Sex = SRoleData.instance.info.Sex;
        data.Faction = SRoleData.instance.info.Faction;
        data.Weapon = FactionVo.get(data.Faction).weapon_anim;
        this.role.info.PlayerInfo = data;
        this.role.scaleX = this.role.scaleY = 1.1;
        this.addChild(this.role);
        this.role.x = 285;
        this.role.y = 400;
    }

    public initBtnData(): void {
        this.mItemList.dataProvider = this.initSkinList();
        // this.mItemList.dataProvider = SMountData.instance.curInfo.item_2;//Aerocraft_starVo.getAll;
        this.initSelect();
    }

    public initSkinList(): number[] {
        var skinList = [];
        var serverSkins = SMountData.instance.curInfo.item_2;
        var cfgs = Aerocraft_starVo.getAll;
        for (let i = 0; i < serverSkins.length; i++) {
            var serverSkin = serverSkins[i];
            var isCfgSkin: boolean = false;
            for (let j = 0; j < cfgs.length; j++) {
                var cfg = cfgs[j];
                if (serverSkin.Skins == cfg.illusion_no) {
                    isCfgSkin = true;
                }
            }
            if (!isCfgSkin) {
                skinList.push(serverSkin.Skins);
            }
        }
        for (let i = 0; i < cfgs.length; i++) {
            var cfg = cfgs[i];
            skinList.push(cfg.illusion_no);
        }
        return skinList;
    }


    private initSelect(): void {
        if (this.mItemList.selectedIndex == -1) {
            this.mItemList.selectedIndex = SMountData.instance.curPage;
        }
    }

    public update(): void {
        this.initBtnData();
        this.updateData();
    }

    public updateExp(): void {
        if (SMountData.instance.curInfo && SMountData.instance.curInfo.needFeed) {
            this.expBar.visible = true;
            this.expBar && this.expBar.setValue(SMountData.instance.curInfo.AerocraftExp, SMountData.instance.curInfo.lvExpLimit);
        }
        else {
            this.expBar.visible = false;
        }
    }

    private updateList(): void {
        this.mItemList.list.refresh();
        var showSkin = -1;
        var skinList = this.initSkinList();
        for (let i = 0; i < skinList.length; i++) {
            var skin = skinList[i];
            if (skin == SMountData.instance.curShowNo) {
                showSkin = i;
            }
        }
        if (showSkin >= 0) {
            this.mItemList.selectedIndex = showSkin;
            this.mItemList.scrollToIndex(showSkin);
        }
    }

    public updateData(): void {
        this.updateList();
        this.updateInfo();
        this.updateExp();
        this.updateState();
        if (this.isStarAuto) {
            var delayTime: number;
            switch (this.curIndex) {
                case 0:
                    delayTime = ConstVo.get("AUTO_STR").val[6][1];
                    break;
                case 1:
                    delayTime = ConstVo.get("AUTO_STR").val[7][1];
                    break;
                case 2:
                    delayTime = 500;
                    break;
                default:
                    break;
            }
            Laya.timer.once(delayTime, this, this.checkRequest);
        }
    }

    private updateInfo(): void {
        this.txt_name.text = Aerocraft_skinVo.get(this.selectMount).name;//SMountData.instance.curInfo.name; 之前用的
        this.txt_lv.text = "Lv." + SMountData.instance.curInfo.AerocraftLv;
        this.combat.text = SMountData.instance.curInfo.BattlePower.toString();
        this.txt_fly.text = "飞升" + SMountData.instance.curInfo.AerocraftSoaring + "次";
        this.txt_star.text = SMountData.instance.curInfo.curStarNum.toString();
        if (this._lastMountLv && SMountData.instance.curInfo.AerocraftLv > this._lastMountLv) {
            this.showUIEffect();
        }
        this._lastMountLv = SMountData.instance.curInfo.AerocraftLv;
    }

    public set isStarAuto(value: boolean) {
        if (value) {
            if (this._isAuto) {
                this._isAuto = false;
                this.updateBtnLable();
                this.stopAuto();
            }
            else {
                this._isAuto = true;
                this.btn_lv.label = "停止";
                this.startAuto();
            }
        }
        else {
            this._isAuto = false;
            this.updateBtnLable();
            this.stopAuto();
        }
    }

    public get isStarAuto(): boolean {
        return this._isAuto;
    }

    public stopAuto(): void {
        Laya.timer.clear(this, this.checkRequest);
    }

    public startAuto(): void {
        this.checkRequest();
    }

    public updateBtnLable(): void {
        switch (this.curIndex) {
            case 0:
                this.btn_lv.label = "自动喂养";
                break;
            case 1:
                this.btn_lv.label = "自动升星";
                break;
            case 2:
                this.btn_lv.label = "飞升";
                break;
            default:
                break;
        }
    }

    private updateState(): void {
        switch (this.curIndex) {
            case 0:
                this.showAll();
                break;
            case 1:
                this.showStar();
                break;
            case 2:
                this.showFly();
                break;
            default:
                break;
        }
        this.showRole();
        this.showTrans();
        this.showBtnState();
        this.updateInfo();
        this.updateLayout();
    }


    //属性列表
    private updateAttrItem(cell: Laya.Box, index: number): void {
        var data = cell.dataSource;
        var attrLb = (cell.getChildByName("attrLb") as Laya.Label);
        var preStr = PropertyVo.getByInfo(data[0]).desc;
        var subStr = data[2] > 0 ? (data[2] * 100 + "%") : data[1];
        attrLb.text = preStr + " + " + subStr;
    }


    private updateLayout(): void {
        switch (this.curIndex) {
            case 0:
                this.bgImg.x = 77;
                this.bgImg.width = 180;
                this.item.x = 50;
                this.item.y = 20;
                this.btn_lv.y = 64;
                break;
            case 1:
                this.bgImg.x = 49;
                this.bgImg.width = 253;
                this.item.x = 310;
                this.item.y = -10;
                this.btn_lv.y = 120;
                break;
            case 2:
                this.bgImg.x = 49;
                this.bgImg.width = 253;
                this.item.x = 310;
                this.item.y = -10;
                this.btn_lv.y = 120;
                break;
            default:
                break;
        }
    }

    private showAll(): void {
        this.showAllLabel();
        this.showAllCost();
        this.showAllDesc();
    }

    private showAllLabel(): void {
        this.bgImg.visible = true;
        this.txt_costWord.text = ""//"喂养消耗";
        if (!this.isStarAuto) {
            this.btn_lv.label = "自动喂养";
        }
        else {
            this.btn_lv.label = "停止";
        }
        this.txt_tips.x = 343;
        this.txt_tips.y = 598;
        if (!SMountData.instance.curInfo.needFeed) {
            this.txt_tips.x = 215;
            this.txt_tips.y = 640;
            this.txt_tips.text = "坐骑等级已满";
            this.bgImg.visible = false;
        }
        else if (SMountData.instance.curInfo.isLimitExp) {
            this.txt_tips.text = "今日获取经验已满";
        }
        else if (SMountData.instance.curInfo.isLimtLV) {
            this.txt_tips.text = "需要飞升";
        }
        else {
            this.txt_tips.text = "";
        }
    }

    private data: ItemData;
    private showAllCost(): void {
        if (SMountData.instance.curInfo.needFeed) {
            this.cost.visible = true;
            var costVo: ConstVo = ConstVo.get("AEROCAFT_FEED_GOODS_NO");
            var count: number;
            count = SBagData.instance.prop.getItemCountByGoodsNo(costVo.val[0]);
            this.data = new ItemData(costVo.val[0]);
            this.item.itemData = this.data;
            this.item.setAmountLabel("" + count, count > 0 ? "#4e17cd" : "#ff0000");
            this.item.toolTipData = this.data;
            this.txt_costName.text = ""; //this.data.clientInfo.name;
            this.txt_leftFeed.text = "";//"剩余可喂养次数:" + SMountData.instance.curInfo.leftFeedNum;
            this.txt_m.innerHTML = "";
            this.txt_costName.y = 44;
        }
        else {
            this.cost.visible = false;
        }
    }

    private showAllDesc(): void {
        if (this.selectMount) {
            var cfg = Aerocraft_starVo.getCfgBySkinNo(this.selectMount);
            if (cfg && cfg.no > SMountData.instance.curInfo.AerocraftNo) {
                this.txt_desc.innerHTML = HtmlUtils.addColor("天资 " + cfg.quality_ratio + " ", "#fff700", 20) +
                    HtmlUtils.addImage("mount/star") +
                    HtmlUtils.addColor("可幻化", "#fff700", 20);
                this.txt_attr_desc.innerHTML = "";
                //属性列表
                this.attrList.array = [];
            }
            else {
                this.txt_desc.innerHTML = "";
                this.txt_attr_desc.innerHTML = "";
                //属性列表
                this.attrList.array = [];
            }
        }
    }

    private showStar(): void {
        this.showStarLable();
        this.showStarCost();
        this.showStarDesc();
    }

    private showStarLable(): void {
        this.txt_leftFeed.text = "";
        this.txt_costWord.text = "升星属性";//"升星消耗";
        if (!this.isStarAuto) {
            this.btn_lv.label = "自动升星";
        }
        else {
            this.btn_lv.label = "停止";
        }
        this.txt_tips.x = 343;
        this.txt_tips.y = 598;
        if (!SMountData.instance.curInfo.needLvStar) {
            this.txt_tips.x = 343;
            this.txt_tips.y = 640;
            this.txt_tips.text = "坐骑天资已满";
        }
        else {
            this.txt_tips.text = "";
        }
    }

    private showStarCost(): void {
        if (SMountData.instance.curInfo.needLvStar) {
            this.cost.visible = true;
            if (SMountData.instance.curInfo.lvStarCode > 0) {
                var count: number;
                count = SBagData.instance.prop.getItemCountByGoodsNo(SMountData.instance.curInfo.lvStarCode);
                this.data = new ItemData(SMountData.instance.curInfo.lvStarCode);
                this.item.itemData = this.data;
                this.item.toolTipData = this.data;
                this.item.setAmountLabel("", "#4e17cd");
                this.txt_costName.text = "";//this.data.clientInfo.name;
                this.txt_costName.y = 37;
                if (SMountData.instance.curInfo.lvStarNum >= SMountData.instance.curInfo.needLvStarNum) {
                    this.txt_m.innerHTML = HtmlUtils.addColor(SMountData.instance.curInfo.lvStarNum.toString() + "/" + SMountData.instance.curInfo.needLvStarNum, "#04a30a", 20);
                }
                else {
                    this.txt_m.innerHTML = HtmlUtils.addColor(SMountData.instance.curInfo.lvStarNum.toString() + "/" + SMountData.instance.curInfo.needLvStarNum, "#ff0000", 20);
                }
            }
        }
        else {
            this.cost.visible = false;
        }
    }

    private showStarDesc(): void {
        // if(SMountData.instance.curInfo.nextStarNum > 0)
        // {
        this.txt_desc.innerHTML = "";
        this.txt_attr_desc.innerHTML = "";
        //属性列表
        this.attrList.array = SMountData.instance.curInfo.curAttr;
        this.attrList.y = 625;
        this.attrList.height = 88;
        // }
        // else
        // {
        //     this.txt_desc.innerHTML = "";
        //     this.txt_attr_desc.innerHTML = "";
        //     //属性列表
        //     this.attrList.array = [];
        // }
    }

    private showFly(): void {
        this.showFlyLabel();
        this.showFlyCost();
        this.showFlyDesc();
    }

    private showFlyLabel(): void {
        this.txt_leftFeed.text = "";
        this.txt_costWord.text = "飞升效果";//"飞升消耗";
        this.btn_lv.label = "飞升";
        this.txt_tips.x = 343;
        this.txt_tips.y = 598;
        if (!SMountData.instance.curInfo.needFly) {
            this.txt_tips.x = 343;
            this.txt_tips.y = 640;
            this.txt_tips.text = "坐骑飞升次数已满";
        }
        else {
            this.txt_tips.text = "";
        }
    }

    private showFlyCost(): void {
        if (SMountData.instance.curInfo.needFly) {
            this.cost.visible = true;
            if (SMountData.instance.curInfo.flyCode > 0) {
                var count: number;
                count = SBagData.instance.prop.getItemCountByGoodsNo(SMountData.instance.curInfo.flyCode);
                this.data = new ItemData(SMountData.instance.curInfo.flyCode);
                this.item.itemData = this.data;
                this.item.toolTipData = this.data;
                this.item.setAmountLabel("", "#4e17cd");
                this.txt_costName.text = "";//this.data.clientInfo.name;
                this.txt_costName.y = 37;
                if (SMountData.instance.curInfo.flyNum >= SMountData.instance.curInfo.needFlyNum) {
                    this.txt_m.innerHTML = HtmlUtils.addColor(SMountData.instance.curInfo.flyNum.toString() + "/" + SMountData.instance.curInfo.needFlyNum, "#04a30a", 20);
                }
                else {
                    this.txt_m.innerHTML = HtmlUtils.addColor(SMountData.instance.curInfo.flyNum.toString() + "/" + SMountData.instance.curInfo.needFlyNum, "#ff0000", 20);
                }
            }
        }
        else {
            this.cost.visible = false;
        }
    }

    private showFlyDesc(): void {
        // if(SMountData.instance.curInfo.needFly)
        // {
        this.txt_desc.innerHTML = "";//HtmlUtils.addColor("飞升效果: 等级上限提升至","#fff700",20) +
        this.txt_attr_desc.innerHTML = HtmlUtils.addColor("(坐骑等级上限提升至", "#8e5213", 18) +
            HtmlUtils.addColor(SMountData.instance.curInfo.curFlyLimtLv + "", "#00fa01", 18) +
            HtmlUtils.addColor("级)", "#8e5213", 18);
        //属性列表
        this.attrList.array = SMountData.instance.curInfo.curFlyAttr;
        this.attrList.y = 640;
        this.attrList.height = 73;
        // }
        // else
        // {
        //     this.txt_desc.innerHTML = "";
        //     this.txt_attr_desc.innerHTML = "";
        //     //属性列表
        //     this.attrList.array = [];
        // }
    }

    public updateCombat(value: number): void {
        this.combat.text = value.toString();
    }

    public updateCombatPos(y: number = 124, bl: boolean = true): void {
        var w: number = 406;
        var txtW: number = this.combat.w + this.world.width + 8;
        this.combatSp.x = (w - txtW) * 0.5;
        this.sp_combat.y = y;
        this.sp_combat.visible = bl;
    }

    private showRole(): void {
        if (this.selectMount) {
            if (SMountData.instance.checkIsSameModel(this.selectMount, SMountData.instance.curInfo.ShowNo)) {
                this.role && (this.role.visible = true);
            }
            else {
                this.role && (this.role.visible = false);
            }
        }
    }

    private showTrans(): void {
        if (this.selectMount) {
            if (SMountData.instance.checkIsSameModel(this.selectMount, SMountData.instance.curInfo.ShowNo)) {
                this.btn_translate.label = "取消";
                this.btn_translate.visible = true;
                this.img_state.visible = false;
            }
            else if (SMountData.instance.haveMount(this.selectMount)) {
                this.btn_translate.label = "幻化";
                this.img_state.visible = false;
                this.btn_translate.visible = true;
            }
            else {
                this.btn_translate.visible = false;
                this.img_state.visible = true;
            }
        }
    }

    private showBtnState(): void {
        this.zonglanBox.visible = this.curIndex == 0;//按钮

        if (this.selectMount) {
            var vo: Aerocraft_starVo = Aerocraft_starVo.getCfgBySkinNo(this.selectMount);
            var max: Aerocraft_starVo = Aerocraft_starVo.maxVo;
            if (vo) {
                if (vo.no >= max.no) {
                    this.mItemList._nextBtn.gray = true;
                    this.mItemList._nextBtn.mouseEnabled = false;
                }
                else if (vo.no > SMountData.instance.curInfo.AerocraftNo) {
                    this.mItemList._nextBtn.gray = true;
                    this.mItemList._nextBtn.mouseEnabled = false;
                }
                else {
                    this.mItemList._nextBtn.gray = false;
                    this.mItemList._nextBtn.mouseEnabled = true;
                }
            }
        }
    }

    private checkRequest(): void {
        switch (this.curIndex) {
            case 0:
                this.requestFeed();
                break;
            case 1:
                this.requestStar();
                break;
            case 2:
                this.requestFly();
                break;
            default:
                break;
        }
    }

    private selectMount: number;
    public onChange(): void {
        this.selectMount = this.mItemList.selectedItem as number;
    }

    /**
     * 前翻 
     * @param e
     * 
     */
    private onPreBtnDownHandler(e: Event = null): void {
        this.mItemList.selectedIndex = this.mItemList.currentPage;
        this.updateState();
    }

    /**
     * 后翻 
     * @param e
     * 
     */
    private onNextBtnDownHandler(e: Event = null): void {
        this.mItemList.selectedIndex = this.mItemList.currentPage;
        this.updateState();
    }

    private requestFeed(): void {
        if (SMountData.instance.curInfo.canFeed) {
            this.event(SMountEvent.MOUNT_REQUEST_FEED, [[1]]);
        }
        else {
            if (!SMountData.instance.curInfo.needFeed) {
                MsgManager.instance.showRollTipsMsg("坐骑等级已满");
                this.isStarAuto = false;
            }
            else if (SMountData.instance.curInfo.isLimitExp) {
                MsgManager.instance.showRollTipsMsg("今日获取经验已满");
                this.isStarAuto = false;
            }
            else if (SMountData.instance.curInfo.isLimtLV) {
                MsgManager.instance.showRollTipsMsg("需要飞升");
                this.isStarAuto = false;
            }
            else {
                GoodsUtils.CheckGotoShopByGoodsNo(this.item.itemData.GoodsNo, 1);
                MsgManager.instance.showRollTipsMsg("材料不足!");
                this.isStarAuto = false;
            }
        }
    }

    private requestStar(): void {
        if (SMountData.instance.curInfo.canLvStar) {
            this.event(SMountEvent.MOUNT_REQUEST_ADVANCE);
        }
        else {
            if (!SMountData.instance.curInfo.needLvStar) {
                MsgManager.instance.showRollTipsMsg("坐骑天资已满");
                this.isStarAuto = false;
            }
            else {
                var needNum = SMountData.instance.curInfo.needLvStarNum - SMountData.instance.curInfo.lvStarNum;
                GoodsUtils.CheckGotoShopByGoodsNo(this.item.itemData.GoodsNo, needNum);
                MsgManager.instance.showRollTipsMsg("材料不足!");
                this.isStarAuto = false;
            }
        }
    }

    private requestFly(): void {
        if (SMountData.instance.curInfo.canFly) {
            this.event(SMountEvent.MOUNT_REQUEST_SOARING);
        }
        else {
            if (!SMountData.instance.curInfo.needFly) {
                MsgManager.instance.showRollTipsMsg("坐骑飞升次数已满");
            }
            else {
                var needNum = SMountData.instance.curInfo.needFlyNum - SMountData.instance.curInfo.flyNum;
                GoodsUtils.CheckGotoShopByGoodsNo(this.item.itemData.GoodsNo, needNum);
                MsgManager.instance.showRollTipsMsg("材料不足!");
            }
        }
    }

    public open(...args): void {
        this.initWindow(true, true, "坐骑", 550, 750, 35);
        super.open();
        this.mTab.select = this.tabIndex;
        var info = this.role.info.getInfo(RoleType.OBJ_PLAYER);
        info.Clothes = SRoleData.instance.info.Clothes;
        this.role.updateSkin();
        this.updateRed();
    }
    public initEvent(): void {
        this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        this.combat.on(Laya.Event.CHANGE, this, this.updateCombatPos);
        this.btn_lv.on(Laya.Event.CLICK, this, this.onClick);
        this.btn_translate.on(Laya.Event.CLICK, this, this.onTran);
        this.btn_look.on(Laya.Event.CLICK, this, this.onLook);
        this.tujianBtn.on(Laya.Event.CLICK, this, this.tujianBtnClick);
        this.lingjingBtn.on(Laya.Event.CLICK, this, this.lingjingBtnClick);
        this.bianyiBtn.on(Laya.Event.CLICK, this, this.bianyiBtnClick);

        RedDotManager.instance.on(RedDotType.RDMountBianyi, this, this.updateRed);
        RedDotManager.instance.on(RedDotType.RDMountLingjing, this, this.updateRed);
        RedDotManager.instance.on(RedDotType.RDMountZonglan, this, this.updateRed);
        RedDotManager.instance.on(RedDotType.RDMountStar, this, this.updateRed);
        RedDotManager.instance.on(RedDotType.RDMountFly, this, this.updateRed);
    }
    public removeEvent(): void {
        this.mTab.off(Laya.Event.CHANGE, this, this.onTabChange);
        this.combat.off(Laya.Event.CHANGE, this, this.updateCombatPos);
        this.btn_lv.off(Laya.Event.CLICK, this, this.onClick);
        this.btn_translate.off(Laya.Event.CLICK, this, this.onTran);
        this.btn_look.off(Laya.Event.CLICK, this, this.onLook);
        this.tujianBtn.off(Laya.Event.CLICK, this, this.tujianBtnClick);
        this.lingjingBtn.off(Laya.Event.CLICK, this, this.lingjingBtnClick);
        this.bianyiBtn.off(Laya.Event.CLICK, this, this.bianyiBtnClick);

        RedDotManager.instance.off(RedDotType.RDMountBianyi, this, this.updateRed);
        RedDotManager.instance.off(RedDotType.RDMountLingjing, this, this.updateRed);
        RedDotManager.instance.off(RedDotType.RDMountZonglan, this, this.updateRed);
        RedDotManager.instance.off(RedDotType.RDMountStar, this, this.updateRed);
        RedDotManager.instance.off(RedDotType.RDMountFly, this, this.updateRed);
    }

    public updateRed(): void {
        this.btn_0.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDMountZonglan)._isActiveSave);
        this.btn_1.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDMountStar)._isActiveSave);
        this.btn_2.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDMountFly)._isActiveSave);
        this.bianyiBtn.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDMountBianyi)._isActiveSave)
        this.lingjingBtn.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDMountLingjing)._isActiveSave)
    }

    private onTabChange(index: number, btn: Laya.Button) {
        if (this.curIndex != index) {
            this.curIndex = index;
            this.isStarAuto = false;
            this.updateState();
        }
    }

    private onClick(): void {
        switch (this.curIndex) {
            case 0:
            case 1:
                if (!this.isStarAuto) {
                    this.isStarAuto = true;
                }
                else {
                    this.isStarAuto = false;
                }
                break;
            case 2:
                this.requestFly();
                break;
            default:
                break;
        }
    }

    private onLook(): void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [SMountData.instance.curInfo]);
    }

    private tujianBtnClick(): void {
        UIManager.instance.openUI(UIID.MOUNT_TUJIANENTER_PANEL);
    }

    private lingjingBtnClick(): void {
        UIManager.instance.openUI(UIID.MOUNT_LINGJING_PANEL);
    }

    private bianyiBtnClick(): void {
        UIManager.instance.openUI(UIID.MOUNT_BIANYI_PANEL);
    }

    private onTran(): void {
        if (SMountData.instance.haveMount(this.selectMount)) {
            if (this.selectMount != SMountData.instance.curShowNo) {
                this.event(SMountEvent.MOUNT_REQUEST_TRANSMOGRIFICATION, [[this.selectMount]]);
            }
            else {
                this.event(SMountEvent.MOUNT_REQUEST_TRANSMOGRIFICATION, [[0]]);
            }
        }
        else {
            MsgManager.instance.showRollTipsMsg("当前形象暂未激活");
        }
    }

    private _lastMountLv: number;
    //特效
    private _uiEffLayer: UIeffectLayer;
    //是否正在播放特效
    private _isPlaying: boolean = false;
    //进入战斗场景的时候播特效
    public showUIEffect(): void {
        if (this._isPlaying) {
            return;
        }
        this._isPlaying = true;
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.addChild(this._uiEffLayer);
        }
        var eff = this._uiEffLayer.playEffect("ui_effect_20", 325, 560, false);
        eff.once(Laya.Event.COMPLETE, this, () => {
            this._isPlaying = false;
        });
    }



    public close(): void {
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        this._lastMountLv = null;
        this._isPlaying = false;
        this._isAuto = false;
        this.curIndex = -1;
        this.mItemList.selectedIndex = -1;
        this.mTab.select = this.curIndex;
        super.close();
    }
}