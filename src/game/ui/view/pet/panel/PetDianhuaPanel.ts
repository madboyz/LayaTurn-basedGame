import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { Pet_dianhua_cfgVo } from "../../../../../db/sheet/vo/Pet_dianhua_cfgVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { SPetData, SPetEvent } from "../../../../../net/data/SPetData";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { PetInfo } from "../../../compent/data/PetInfo";
import { ProgressBar } from "../../../compent/ProgressBar";
import { MsgManager } from "../../../manager/MsgManager";
import { PetSkillItem } from "../item/PetSkillItem";
import { S17009_4 } from "../../../../../net/pt/pt_17";
import { Pet_dianhua_skill_cfgVo } from "../../../../../db/sheet/vo/Pet_dianhua_skill_cfgVo";
import { Skill } from "../../../../skill/Skill";
import { ToolTipsDianhuaSkill } from "../../../compent/ToolTipsDianhuaSkill";

export class PetDianhuaPanel extends ui.main.PetDianhuaPanelUI {
    private selectVo: PetInfo;//当前宠物Vo
    private item: BaseItem;//宠物点化消耗
    private expBar: ProgressBar;//点化经验条
    private skillSprites: PetDianhuaSkillItem[];

    private loopTime: number; //自动点化的时间间隔；

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.sameLevelEliminate = false;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
        this.btn_look.on(Laya.Event.CLICK, this, this.onLook);
        this.dianhuaBtn.on(Laya.Event.CLICK, this, this.dianhuaBtnClick);

        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.update);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.update);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.update);

        SPetData.instance.on(SPetEvent.PET_DIANHUA_SKILL_UP, this, this.update);
    }

    public removeEvent(): void {
        this.btn_look.off(Laya.Event.CLICK, this, this.onLook);
        this.dianhuaBtn.off(Laya.Event.CLICK, this, this.dianhuaBtnClick);

        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE, this, this.update);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE, this, this.update);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD, this, this.update);

        SPetData.instance.off(SPetEvent.PET_DIANHUA_SKILL_UP, this, this.update);
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.initItem();
        this.initExpBar();
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
        this.skillSprites = [];
        for (let i = 1; i <= 3; i++) {
            var item: PetDianhuaSkillItem = new PetDianhuaSkillItem();
            this.addChild(item);
            var x = i * 130 - 10;
            var y = 290;
            item.x = x;
            item.y = y;
            this.skillSprites.push(item);
        }
    }

    private initExpBar(): void {
        if (!this.expBar) {
            this.expBar = new ProgressBar();
            this.expBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_greenBar"), 310, 24);
            this.expBar.setLabel(1, 20, "#ffffff");
            this.expBar.x = 180;
            this.expBar.y = 642;
            this.addChild(this.expBar);
        }
    }


    public open(...args): void {
        this.initWindow(true, true, "宠物点化", 486, 547, 170);
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
        this.dianhuaLvLb.text = "点化" + this.selectVo.DianhuaLv + "层";
        //点化进度条
        var maxExp = Pet_dianhua_cfgVo.get(this.selectVo.DianhuaLv).exp_lim;
        this.expBar.setValue(this.selectVo.DianhuaExp, maxExp);
        //属性列表
        this.attrList.array = Pet_dianhua_cfgVo.get(this.selectVo.DianhuaLv).attr;
        //刷新技能
        var cfgLv = ConstVo.get("PAR_DIANHUA_UPGRADE_NEED_LV").val;
        this.lvTipsLb.visible = this.selectVo.Lv < cfgLv;
        this.lvTipsLb.text = `宠物${cfgLv}级开启宠物技能进阶`;
        for (let i = 1; i <= 3; i++) {
            var item: PetDianhuaSkillItem = this.skillSprites[i - 1];
            item.setPetInfo(this.selectVo, i);
        }
        //特效
        if (this._lastLv && this.selectVo.DianhuaLv > this._lastLv) {
            this.showUIEffect();
        }
        this._lastLv = this.selectVo.DianhuaLv;
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
        var itemId = ConstVo.get("PARTNER_DIANHUA_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        this.item.itemCode = itemId;
        this.item.toolTipData = this.item.itemData;
        if (itemdata) {
            this.item.setAmountLabel("" + itemdata.Count, "#4e17cd");
        } else {
            this.item.setAmountLabel("0 ", "#ff0000");
        }
        //点化按钮红点
        var itemId = ConstVo.get("PARTNER_DIANHUA_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        this.dianhuaBtn.refreshRed(itemNum > 0);
    }
    //属性列表
    private updateItem(cell: Laya.Box, index: number): void {
        var attrLb = (cell.getChildByName("attrLb") as Laya.Label);
        var cfgAtt = Pet_dianhua_cfgVo.get(this.selectVo.DianhuaLv).attr[index];

        var preStr = PropertyVo.getByInfo(cfgAtt[0]).desc;
        var subStr = cfgAtt[2] > 0 ? (cfgAtt[2] * 100 + "%") : cfgAtt[1];
        attrLb.text = preStr + " + " + subStr;
    }


    private isDianhuaIng: boolean = false;
    //点击点化
    private dianhuaBtnClick(): void {
        var itemId = ConstVo.get("PARTNER_DIANHUA_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具不足，无法点化");
            return;
        }
        this.isDianhuaIng = !this.isDianhuaIng;
        if (this.isDianhuaIng) {
            this.dianhuaBtn.label = "停止点化";
            this.timer.loop(this.loopTime, this, this.dianhuaLoop);
            this.dianhuaLoop();
        } else {
            this.dianhuaBtn.label = "自动点化";
            this.timer.clear(this, this.dianhuaLoop);
        }
    }

    private dianhuaLoop(): void {
        var itemId = ConstVo.get("PARTNER_DIANHUA_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具已用完，停止自动点化");
            this.isDianhuaIng = false;
        }
        if (!this.isDianhuaIng) {
            this.dianhuaBtn.label = "自动点化";
            this.timer.clear(this, this.dianhuaLoop);
            return;
        }
        this.event(SPetEvent.PET_REQUEST_DIANHUA, this.selectVo.PartnerId);
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
        var eff = this._uiEffLayer.playEffect("ui_effect_20", 335, 655, false);
        eff.scaleX = 0.78;
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
        this.dianhuaBtn.label = "自动点化";
        this.timer.clear(this, this.dianhuaLoop);
        super.close();
    }

}



//道具的奖励ITEM
export class PetDianhuaSkillItem extends ui.main.PetDianhuaSkillItemUI {
    private _skillItem: PetSkillItem;
    private _costItem: BaseItem;

    private _petinfo: PetInfo;
    private _index: number;

    constructor() {
        super();
        this._skillItem = new PetSkillItem;
        this._skillItem.setItemStyle(80);
        this.itemBox.addChild(this._skillItem);

        this._costItem = new BaseItem();
        this._costItem._hideBg = true;
        this._costItem.setItemStyle(40);
        this.costBox.addChild(this._costItem);

        this.upBtn.on(Laya.Event.CLICK, this, this.upBtnClick);
    }

    public setPetInfo(petinfo: PetInfo, index: number) {
        this._petinfo = petinfo;
        this._index = index;
        //刷新技能
        this.banLb.text = "";
        this.banImg.visible = false;
        this.fullLb.visible = false;
        this.costBox.visible = false;
        this.upBtn.visible = false;
        var btnRed = false;

        var skillCfg = Pet_dianhua_cfgVo.getSkillCfg();
        var thisId = skillCfg[index - 1].passive_skill[0];
        var vo = SkillVo.get(thisId);
        var skillData = new Skill(thisId);
        var skillInfo: S17009_4;
        var isFull = false;
        var isActive = false;
        if (petinfo.DianhuaLv < skillCfg[index - 1].no) {
            this.banImg.visible = true;
            this.banLb.text = "点化" + skillCfg[index - 1].no + "\n级开放";
            // this.banLb.color = "#ff0000";
            // this.banLb.fontSize = 16;
            this._skillItem.gray = true;
        } else {
            this._skillItem.gray = false;
            for (let i = 0; i < petinfo.item_4.length; i++) {
                var ele = petinfo.item_4[i];
                if (ele.SkillNo == thisId) {
                    skillInfo = ele;
                    break;
                }
            }
            //升级，后面没有推新技能过来，应该有的话，自己创界一个
            if (!skillInfo) {
                skillInfo = new S17009_4;
                skillInfo.SkillNo = thisId;
                skillInfo.SkillLv = 1;
                skillInfo.SkillType = 2;
                petinfo.item_4.push(skillInfo);
            }
            skillData.Lv = skillInfo.SkillLv;
            var cfg = Pet_dianhua_skill_cfgVo.getByLv(skillInfo.SkillNo, skillInfo.SkillLv + 1);
            isFull = cfg == null;
            isActive = true;
        }
        //设置TIPS
        this._skillItem.info = vo;
        this._skillItem.renderClass = ToolTipsDianhuaSkill;
        this._skillItem.toolTipData = skillData;
        //等级是否够
        var cfgLv = ConstVo.get("PAR_DIANHUA_UPGRADE_NEED_LV").val;
        var lvOk = petinfo.Lv >= cfgLv;

        if (isActive && isFull && lvOk) {
            this.fullLb.visible = true;
            // this.tipsLb.text = "已满级";
            // this.tipsLb.color = "#00b007";
            // this.tipsLb.fontSize = 20;
        } else if (isActive && !isFull && lvOk) {
            this.costBox.visible = true;
            this.upBtn.visible = true;
            var costItem = cfg.cost[0];
            var costItemData = new ItemData(costItem[0]);
            this._costItem.itemData = costItemData;
            this._costItem.toolTipData = costItemData;
            // this.costIcon.skin = ResUtils.getItemIcon((new ItemData(costItem[0])).clientInfo.icon);
            var iHave = SBagData.instance.prop.getItemCountByGoodsNo(costItem[0]);
            var enough = iHave >= costItem[1];
            this.costNumLb.text = SBagData.instance.prop.getItemCountByGoodsNo(costItem[0]) + "/" + costItem[1];
            this.costNumLb.color = enough ? "#00b007" : "#ff0000";
            this.costBox.width = 40 + this.costNumLb.width;
            btnRed = enough;
        }

        this.upBtn.refreshRed(btnRed);
    }

    public upBtnClick(): void {
        var skillCfg = Pet_dianhua_cfgVo.getSkillCfg();
        SPetData.instance.protocol.send17051(this._petinfo.PartnerId, skillCfg[this._index - 1].passive_skill[0]);
    }

    public destroy(): void {
        super.destroy()
    }

}