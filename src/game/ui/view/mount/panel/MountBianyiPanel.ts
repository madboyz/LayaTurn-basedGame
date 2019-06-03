import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { Mount_bianyi_cfgVo } from "../../../../../db/sheet/vo/Mount_bianyi_cfgVo";
import { Mount_bianyi_skill_cfgVo } from "../../../../../db/sheet/vo/Mount_bianyi_skill_cfgVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { SMountData, SMountEvent } from "../../../../../net/data/SmountData";
import { S17009_4 } from "../../../../../net/pt/pt_17";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { Skill } from "../../../../skill/Skill";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { MountInfo } from "../../../compent/data/MountInfo";
import { ProgressBar } from "../../../compent/ProgressBar";
import { ToolTipsDianhuaSkill } from "../../../compent/ToolTipsDianhuaSkill";
import { MsgManager } from "../../../manager/MsgManager";
import { PetSkillItem } from "../../pet/item/PetSkillItem";
import { S60001_3 } from "../../../../../net/pt/pt_60";

export class MountBianyiPanel extends ui.main.PetDianhuaPanelUI {
    private mountInfo: MountInfo;
    private item: BaseItem;//宠物点化消耗
    private expBar: ProgressBar;//点化经验条
    private skillSprites: MountBianyiSkillItem[];

    private loopTime: number; //自动点化的时间间隔；

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.sameLevelEliminate = false;
        this.mResouce = [
            { url: "res/atlas/pet.atlas", type: Laya.Loader.ATLAS },
        ];

    }

    public initEvent(): void {
        this.btn_look.on(Laya.Event.CLICK, this, this.onLook);
        this.dianhuaBtn.on(Laya.Event.CLICK, this, this.dianhuaBtnClick);

        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.update);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.update);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.update);

        SMountData.instance.on(SMountEvent.MOUNT_BIANYI_SKILL_UP, this, this.update);
    }

    public removeEvent(): void {
        this.btn_look.off(Laya.Event.CLICK, this, this.onLook);
        this.dianhuaBtn.off(Laya.Event.CLICK, this, this.dianhuaBtnClick);

        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE, this, this.update);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE, this, this.update);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD, this, this.update);

        SMountData.instance.off(SMountEvent.MOUNT_BIANYI_SKILL_UP, this, this.update);
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
            var item: MountBianyiSkillItem = new MountBianyiSkillItem();
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
        this.initWindow(true, true, "坐骑变异", 486, 547, 170);
        this.mountInfo = SMountData.instance.curInfo;
        super.open();
    }

    public update(): void {
        //战力
        this.combat.text = this.mountInfo.BattlePower.toString();
        this.updateExp();
        this.updateCost();
        //点化文本
        this.attrTitleLb.text = "变异属性";
        this.dianhuaLvLb.text = "变异" + this.mountInfo.VariationLv + "层";
        //点化进度条
        var maxExp = Mount_bianyi_cfgVo.get(this.mountInfo.VariationLv).exp_lim;
        this.expBar.setValue(this.mountInfo.VariationExp, maxExp);
        //属性列表
        this.attrList.array = Mount_bianyi_cfgVo.get(this.mountInfo.VariationLv).attr;
        //刷新技能
        var cfgLv = ConstVo.get("AEROCRAFT_VARIATION_UPGRADE_NEED_LV").val;
        this.lvTipsLb.visible = this.mountInfo.AerocraftLv < cfgLv;
        this.lvTipsLb.text = `坐骑${cfgLv}级开启坐骑技能进阶`;
        for (let i = 1; i <= 3; i++) {
            var item: MountBianyiSkillItem = this.skillSprites[i - 1];
            item.setMountInfo(i);
        }
        //特效
        if (this._lastLv && this.mountInfo.VariationLv > this._lastLv) {
            this.showUIEffect();
        }
        this._lastLv = this.mountInfo.VariationLv;
    }

    //刷新经验
    public updateExp(): void {
        var veExpLim = Mount_bianyi_cfgVo.get(this.mountInfo.VariationLv).exp_lim;
        this.expBar.setValue(this.mountInfo.VariationExp, veExpLim);
    }
    //刷新消耗
    public updateCost(): void {
        var itemId = ConstVo.get("AEROCRAFT_VARIATION_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        this.item.itemCode = itemId;
        this.item.toolTipData = this.item.itemData;
        if (itemdata) {
            this.item.setAmountLabel("" + itemdata.Count, "#4e17cd");
        } else {
            this.item.setAmountLabel("0 ", "#ff0000");
        }
        //点化按钮红点
        var itemId = ConstVo.get("AEROCRAFT_VARIATION_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        this.dianhuaBtn.refreshRed(itemNum > 0);
    }
    //属性列表
    private updateItem(cell: Laya.Box, index: number): void {
        var attrLb = (cell.getChildByName("attrLb") as Laya.Label);
        var cfgAtt = Mount_bianyi_cfgVo.get(this.mountInfo.VariationLv).attr[index];

        var preStr = PropertyVo.getByInfo(cfgAtt[0]).desc;
        var subStr = cfgAtt[2] > 0 ? (cfgAtt[2] * 100 + "%") : cfgAtt[1];
        attrLb.text = preStr + " + " + subStr;
    }


    private isDianhuaIng: boolean = false;
    //点击点化
    private dianhuaBtnClick(): void {
        var itemId = ConstVo.get("AEROCRAFT_VARIATION_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具不足，无法升级");
            return;
        }
        this.isDianhuaIng = !this.isDianhuaIng;
        if (this.isDianhuaIng) {
            this.dianhuaBtn.label = "停止使用";
            this.timer.loop(this.loopTime, this, this.dianhuaLoop);
            this.dianhuaLoop();
        } else {
            this.dianhuaBtn.label = "自动使用";
            this.timer.clear(this, this.dianhuaLoop);
        }
    }

    private dianhuaLoop(): void {
        var itemId = ConstVo.get("AEROCRAFT_VARIATION_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具已用完，停止自动使用");
            this.isDianhuaIng = false;
        }
        if (!this.isDianhuaIng) {
            this.dianhuaBtn.label = "自动使用";
            this.timer.clear(this, this.dianhuaLoop);
            return;
        }
        SMountData.instance.protocol.send60007();
    }


    //打开查看宠物属性
    private onLook(): void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [this.mountInfo]);
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
        this.dianhuaBtn.label = "自动使用";
        this.timer.clear(this, this.dianhuaLoop);
        super.close();
    }

}



//道具的奖励ITEM
export class MountBianyiSkillItem extends ui.main.PetDianhuaSkillItemUI {
    private _skillItem: PetSkillItem;
    private _costItem: BaseItem;

    private _mountinfo: MountInfo;
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

    public setMountInfo(index: number) {
        this._mountinfo = SMountData.instance.curInfo;
        this._index = index;
        //刷新技能
        this.banLb.text = "";
        this.banImg.visible = false;
        this.fullLb.visible = false;
        this.costBox.visible = false;
        this.upBtn.visible = false;
        var btnRed = false;

        var skillCfg = Mount_bianyi_cfgVo.getSkillCfg();
        var thisId = skillCfg[index - 1].passive_skill[0];
        var vo = SkillVo.get(thisId);
        var skillData = new Skill(thisId);
        var skillInfo: S17009_4;
        var isFull = false;
        var isActive = false;
        if (this._mountinfo.VariationLv < skillCfg[index - 1].no) {
            this.banImg.visible = true;
            this.banLb.text = "变异" + skillCfg[index - 1].no + "\n级开放";
            // this.banLb.color = "#ff0000";
            // this.banLb.fontSize = 16;
            this._skillItem.gray = true;
        } else {
            this._skillItem.gray = false;
            for (let i = 0; i < this._mountinfo.item_3.length; i++) {
                var ele = this._mountinfo.item_3[i];
                if (ele.SkillNo == thisId) {
                    skillInfo = ele;
                    break;
                }
            }
            //升级，后面没有推新技能过来，应该有的话，自己创界一个
            if (!skillInfo) {
                skillInfo = new S60001_3;
                skillInfo.SkillNo = thisId;
                skillInfo.SkillLv = 1;
                skillInfo.SkillType = 2;
                this._mountinfo.item_3.push(skillInfo);
            }
            skillData.Lv = skillInfo.SkillLv;
            var cfg = Mount_bianyi_skill_cfgVo.getByLv(skillInfo.SkillNo, skillInfo.SkillLv + 1);
            isFull = cfg == null;
            isActive = true;
        }
        //设置TIPS
        this._skillItem.info = vo;
        this._skillItem.renderClass = ToolTipsDianhuaSkill;
        this._skillItem.toolTipData = skillData;
        //等级是否够
        var cfgLv = ConstVo.get("AEROCRAFT_VARIATION_UPGRADE_NEED_LV").val;
        var lvOk = this._mountinfo.AerocraftLv >= cfgLv;

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
        var skillCfg = Mount_bianyi_cfgVo.getSkillCfg();
        SMountData.instance.protocol.send60008(skillCfg[this._index - 1].passive_skill[0]);
        // SPetData.instance.protocol.send17051(this._mountinfo.PartnerId, skillCfg[this._index - 1].passive_skill[0]);
    }

    public destroy(): void {
        super.destroy()
    }

}