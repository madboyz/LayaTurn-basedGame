import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { Pet_dianhua_cfgVo } from "../../../../../db/sheet/vo/Pet_dianhua_cfgVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { SPetData, SPetEvent } from "../../../../../net/data/SPetData";
import { RoleView } from "../../../../battle/role/RoleView";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { PetInfo } from "../../../compent/data/PetInfo";
import { ProgressBar } from "../../../compent/ProgressBar";
import { MsgManager } from "../../../manager/MsgManager";
import { Pet_tujian_cfgVo } from "../../../../../db/sheet/vo/Pet_tujian_cfgVo";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";

export class PetTujianPanel extends ui.main.PetTujianPanelUI {
    private selectVo: PetInfo;//当前宠物Vo
    private item: BaseItem;//宠物点化消耗
    private expBar: ProgressBar;//点化经验条
    private role: RoleView;

    private loopTime: number; //自动点化的时间间隔；

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
        this.btn_look.on(Laya.Event.CLICK, this, this.onLook);
        this.useBtn.on(Laya.Event.CLICK, this, this.useBtnClick);
    }

    public removeEvent(): void {
        this.btn_look.off(Laya.Event.CLICK, this, this.onLook);
        this.useBtn.off(Laya.Event.CLICK, this, this.useBtnClick);
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.initItem();
        this.initExpBar();
        this.initRole();
        this.combat.url = "res/atlas/number/fight.atlas";
        this.loopTime = ConstVo.get("AUTO_STR").val[4][1];

        this.update();
    }

    private initList(): void {
        this.attrList.renderHandler = new Laya.Handler(this, this.updateItem)
        this.attrList.vScrollBarSkin = "";
    }

    private initItem(): void {
        if (!this.item) {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.dianhuaCostBox.addChild(this.item);
            this.item.x = 45;
            this.item.y = 20;
        }
    }

    private initExpBar(): void {
        if (!this.expBar) {
            this.expBar = new ProgressBar();
            this.expBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_greenBar"), 270, 24);
            this.expBar.setLabel(1, 20, "#ffffff");
            this.expBar.x = 220;
            this.expBar.y = 667;
            this.addChild(this.expBar);
        }
    }


    private initRole(): void {
        this.role = new RoleView();
        this.role.info = "";
        this.role.angle = 0;
        this.addChild(this.role);
        this.role.x = 290;
        this.role.y = 460;
    }



    public open(...args): void {
        this.initWindow(true, true, "宠物图鉴", 486, 577, 170);

        this.selectVo = args[0];
        if (!(this.selectVo instanceof PetInfo)) {
            //没有的话，设置第一个出站的宠物
            var petData = SPetData.instance.allData;
            for (let i = 0; i < petData.length; i++) {
                var ele = petData[i] as PetInfo;
                if (ele.active == true) {
                    this.selectVo = ele;
                    break;
                }
            }
        }
        super.open();
    }

    public update(): void {
        if (this.selectVo.active) {
            this.updateCombat(this.selectVo.BattlePower);
        } else {
            this.updateCombat(this.selectVo.vo.battle);
        }
        this.updateExp();
        this.updateCost();
        //点化文本
        this.tujianLvLb.text = "图鉴进度Lv." + this.selectVo.IllustrateLv;
        //点化进度条
        var cfg = Pet_tujian_cfgVo.getByLv(this.selectVo.PartnerNo, this.selectVo.IllustrateLv);
        this.expBar.setValue(this.selectVo.IllustrateExp, cfg.exp_lim);
        //属性列表
        this.attrList.array = cfg.attr;
        //模型
        if (!this.role) {
            this.initRole();
        }
        this.role.resPath = this.selectVo.vo.body;
        this.role.updateSkin();
        this.role.scaleX = this.role.scaleY = this.selectVo.vo.res_scale_ui;
        //特效
        if (this._lastLv && this.selectVo.IllustrateLv > this._lastLv) {
            this.showUIEffect();
        }
        this._lastLv = this.selectVo.IllustrateLv;
    }

    //刷新战力
    public updateCombat(value: number): void {
        this.combat.text = value.toString();
    }
    //刷新经验
    public updateExp(): void {
        this.expBar.setValue(this.selectVo.Exp, this.selectVo.ExpLim);
    }
    //刷新消耗
    public updateCost(): void {
        var cfg = Pet_tujian_cfgVo.getByLv(this.selectVo.PartnerNo, this.selectVo.IllustrateLv);
        var itemId = cfg.cost[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        this.item.itemCode = itemId;
        this.item.toolTipData = this.item.itemData;
        var isEnough = (itemNum > 0);
        this.item.setAmountLabel("" + itemNum, isEnough ? "#4e17cd" : "#ff0000");
    }
    //属性列表
    private updateItem(cell: Laya.Box, index: number): void {
        var attrLb = (cell.getChildByName("attrLb") as Laya.Label);
        var cfgAtt = Pet_tujian_cfgVo.getByLv(this.selectVo.PartnerNo, this.selectVo.IllustrateLv).attr[index];

        var preStr = PropertyVo.getByInfo(cfgAtt[0]).desc;
        var subStr = cfgAtt[2] > 0 ? (cfgAtt[2] * 100 + "%") : cfgAtt[1];
        attrLb.text = preStr + " + " + subStr;
    }


    private isDianhuaIng: boolean = false;
    //点击点化
    private useBtnClick(): void {
        var cfg = Pet_tujian_cfgVo.getByLv(this.selectVo.PartnerNo, this.selectVo.IllustrateLv);
        var itemId = cfg.cost[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough = itemdata && (itemdata.Count > 0);
        if (!itemEnough) {
            // GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具不足，无法使用");
            return;
        }
        this.isDianhuaIng = !this.isDianhuaIng;
        if (this.isDianhuaIng) {
            this.useBtn.label = "停止使用";
            this.timer.loop(this.loopTime, this, this.dianhuaLoop);
            this.dianhuaLoop();
        } else {
            this.useBtn.label = "自动使用";
            this.timer.clear(this, this.dianhuaLoop);
        }
    }

    private dianhuaLoop(): void {
        var cfg = Pet_tujian_cfgVo.getByLv(this.selectVo.PartnerNo, this.selectVo.IllustrateLv);
        var itemId = cfg.cost[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough = itemdata && (itemdata.Count > 0);
        if (!itemEnough) {
            // GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具已用完，停止自动使用");
            this.isDianhuaIng = false;
        }
        if (!this.isDianhuaIng) {
            this.useBtn.label = "自动使用";
            this.timer.clear(this, this.dianhuaLoop);
            return;
        }
        this.event(SPetEvent.ASK_PET_TUJIAN_UP, this.selectVo.PartnerId);
    }


    //打开查看宠物属性
    private onLook(): void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [this.selectVo]);
    }

    private _lastLv: number;
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
        var eff = this._uiEffLayer.playEffect("ui_effect_20", 355, 680, false);
        eff.scaleX = 0.68;
        eff.once(Laya.Event.COMPLETE, this, () => {
            this._isPlaying = false;
        });
    }


    public close(): void {
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        this._lastLv = null;
        this._isPlaying = false;
        this.isDianhuaIng = false;
        this.useBtn.label = "自动使用";
        this.timer.clear(this, this.dianhuaLoop);
        this.role && this.role.dispose();
        this.role = null;
        super.close();
        UIManager.instance.openUI(UIID.SYS_PETTUJIANENTER_PANEL);
    }

}