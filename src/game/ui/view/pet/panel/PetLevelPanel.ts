import { PetInfo } from "../../../compent/data/PetInfo";
import { BaseItem } from "../../../compent/BaseItem";
import { PetSkillItem } from "../item/PetSkillItem";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { RoleView } from "../../../../battle/role/RoleView";
import { DisplayUtils } from "../../../../utils/DisplayUtils";
import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { ItemData } from "../../../compent/data/ItemData";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { MsgManager } from "../../../manager/MsgManager";
import { SPetEvent, SPetData } from "../../../../../net/data/SPetData";
import { PetSkillIcon } from "../item/PetSkillIcon";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { RedDotType } from "../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../redDot/RedDotManager";

export class PetLevelPanel extends ui.main.PetLevelPanelUI {
    private role: RoleView;
    private selectVo: PetInfo;
    private item: BaseItem;
    private expBar: ProgressBar;
    private vo: ConstVo;
    private itemdata: ItemData;
    private _curIndex: number = 0;
    private _changePet: boolean = false;
    constructor() {
        super();
    }

    public initComp(): void {
        this.vo = ConstVo.get("PARTNER_ADD_EXP_GOODS_LIST");
        this.loopTime = ConstVo.get("AUTO_STR").val[9][1];
        this.initItem();
        this.initRole();
        this.initBar();
        this.initList();
        this.initEvent();
    }

    public updatePetInfo(vo: PetInfo): void {
        if (vo.active) {
            if (this.selectVo && this.selectVo.PartnerId != vo.PartnerId) {
                this._changePet = true;
            }
            else {
                this._changePet = false;
            }
            this.selectVo = vo;
            if (this._changePet) {
                //自动升级---
                this.isDianhuaIng = false;
                this.btn_one.label = "自动点化";
                this.timer.clear(this, this.dianhuaLoop);
            }
            this.updateData();
            this._changePet && this.skillList.tweenTo(0);
        }
    }

    private initRole(): void {
        this.role = new RoleView();
        this.role.info = "";
        this.role.angle = 0;
        this.addChild(this.role);
        this.role.x = 285;
        this.role.y = 420;
    }

    private initItem(): void {
        if (!this.item) {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.addChild(this.item);
            this.item.x = 75;
            this.item.y = 336;
        }
    }

    private initList(): void {
        this.skillList.itemRender = PetSkillIcon;
        this.skillList.array = null;
        this.skillList.hScrollBarSkin = "";
        this.skillList.selectEnable = true;
        this.skillList.selectHandler = Laya.Handler.create(this, this.onSlotChange, null, false);
        this.skillList.mouseHandler = Laya.Handler.create(this, this.onClickSkill, null, false);
    }

    private initBar(): void {
        this.expBar = new ProgressBar();
        this.expBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_greenBar"), 356, 24);
        this.expBar.setLabel(1, 20, "#ffffff");
        this.expBar.x = 162;
        this.expBar.y = 466;
        this.addChild(this.expBar);
    }

    private initEvent(): void {
        RedDotManager.instance.on(RedDotType.RDPetLevel, this, this.showLvUpRed);
        this.btn_one.on(Laya.Event.CLICK, this, this.dianhuaBtnClick);
    }
    
    private removeEvent(): void {
        RedDotManager.instance.off(RedDotType.RDPetLevel, this, this.showLvUpRed);
        this.btn_one.off(Laya.Event.CLICK, this, this.dianhuaBtnClick);
    }

    public showLvUpRed(show:boolean = false):void{
        this.btn_one.refreshRed(this.selectVo && this.selectVo.canLevel);
    }

    public updateData(): void {
        this.updateInfo();
        this.updateState();
        this.updateExp();
        this.updateCost();
        this.updateListData();
        this.checkLvUp();
        this.showLvUpRed();
    }

    private updateListData(): void {
        this.skillList.array = this.selectVo.skillSlots;
    }

    public updateInfo(): void {
        if (this.role) {
            this.role.resPath = this.selectVo.vo.body;
            this.role.updateSkin();
            this.role.scaleX = this.role.scaleY = this.selectVo.vo.res_scale_ui;
        }
        if (this.selectVo.active) {
            this.parent && this.parent["updateCombat"](this.selectVo.BattlePower);
        }
        else {
            this.parent && this.parent["updateCombat"](this.selectVo.vo.battle);
        }
        this.parent && this.parent["updateCombatPos"](124, true);
        this.txt_name.text = this.selectVo.vo.name + (this.selectVo.layerName != "" ? " " + this.selectVo.layerName + "" : "");
        this.txt_lv.text = "Lv." + this.selectVo.Lv;
    }

    private updateState(): void {
        if (this.selectVo.vo.grade == PetGradeType.TYPE_4) {
            this.god.visible = true;
        }
        else {
            this.god.visible = false;
        }
    }

    public updateExp(): void {
        if (this.expBar) {
            this.expBar.setValue(this.selectVo.Exp, this.selectVo.ExpLim);
        }
    }

    public updateCost(): void {
        var num: number = 0;
        this.itemdata = null;
        var tempUseData;
        if (this.vo) {
            var arr: Array<number> = this.vo.val;
            this.itemdata = SBagData.instance.prop.getItemDataByGoodsNo(arr[0]);
            if (this.itemdata) {
                tempUseData = this.itemdata;
            } else {
                tempUseData = new ItemData(arr[0]);
                tempUseData.Count = 0;
            }
            this.item.itemData = tempUseData;
            var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(this.item.itemData.GoodsNo);
            if (itemdata) {
                this.item.setAmountLabel("" + itemdata.Count, "#4e17cd");
            } else {
                this.item.setAmountLabel("0 ", "#ff0000");
            }
            this.item.toolTipData = this.item.itemData;
        }
    }

    private oldItem: any;
    private selectItem: PetSkillIcon;
    private onSlotChange(): void {
        this.selectItem = this.skillList.getCell(this.skillList.selectedIndex) as PetSkillIcon;
        this.oldItem = this.skillList.selectedItem;
        this._curIndex = this.skillList.selectedIndex;
    }

    private onClickSkill(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }

        if (this.selectItem) {
            if (SPetData.instance.curInfo && SPetData.instance.curInfo.active) {
                if (this.selectItem.active && this.selectItem.needLearn) {
                    UIManager.instance.openUI(UIID.SYS_PAR_CHANGE_SKILL);
                }
            }
            else {
                if (this.selectItem.active && this.selectItem.needLearn) {
                    MsgManager.instance.showRollTipsMsg("该宠物暂未激活");
                }
            }
        }
    }

    // private onLevelOne():void
    // {
    //     if(this.itemdata)
    //     {
    //         this.parent.event(SPetEvent.PET_REQUEST_USEGODDS,[[this.selectVo.PartnerId,this.itemdata.GoodsId,1]]);
    //     }   
    //     else
    //     {
    //         GoodsUtils.CheckGotoShopByGoodsNo(this.item.itemData.GoodsNo,1);
    //         MsgManager.instance.showRollTipsMsg("您的材料不足！");
    //     }
    // }

    // private onLevelAll():void
    // {
    //     if(this.itemdata)
    //     {
    //         var needNum = this.selectVo.maxNeedNum;
    //         if(needNum <= 0){
    //             MsgManager.instance.showRollTipsMsg("该宠物已达到满级");
    //         }else{
    //             this.parent.event(SPetEvent.PET_REQUEST_USEGODDS,[[this.selectVo.PartnerId,this.itemdata.GoodsId,needNum]]);
    //         }
    //     }
    //     else
    //     {
    //         GoodsUtils.CheckGotoShopByGoodsNo(this.item.itemData.GoodsNo,1);
    //         MsgManager.instance.showRollTipsMsg("您的材料不足！");
    //     }
    // }

    private clearActiveItem(): void {
        if (this.item) {
            this.item.dispose();
            this.item.removeSelf();
            this.item = null;
        }
    }

    //之前一步的宠物VO
    private _lastPetId: number;
    private _lastPetLv: number;
    //判断宠物是不是
    public checkLvUp(): void {
        var vo = this.selectVo;
        if (this._lastPetId && vo.PartnerId == this._lastPetId && vo.Lv > this._lastPetLv) {
            this._lastPetLv = vo.Lv;
            this.showUIEffect();
        } else if (!this._lastPetId || !this._lastPetLv || vo.PartnerId != this._lastPetId) {
            this._lastPetId = vo.PartnerId;
            this._lastPetLv = vo.Lv;
        }
    }
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
        var eff = this._uiEffLayer.playEffect("ui_effect_10", 285, 320, false);
        var eff2 = this._uiEffLayer.playEffect("ui_effect_20", 340, 478, false);
        eff2.scaleX = 0.88;
        eff.once(Laya.Event.COMPLETE, this, () => {
            this._isPlaying = false;
        });
        this.role && this.addChild(this.role);//有宠物的情况，把宠物挪到上面一层
    }


    public removeSelf(): any {
        this._changePet = false;
        this.role && this.role.dispose();
        this.role = null;
        this.selectVo = null;
        this.itemdata = null;
        this.clearActiveItem();
        this.removeEvent();
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        this._lastPetId = null;
        this._lastPetLv = null;
        this._isPlaying = false;
        //自动升级---
        this.isDianhuaIng = false;
        this.btn_one.label = "自动点化";
        this.timer.clear(this, this.dianhuaLoop);

        super.removeSelf();
    }


    //======自动使用经验丹升级============================================================================================
    private isDianhuaIng: boolean = false;
    private loopTime: number = 300;
    //点击点化
    private dianhuaBtnClick(): void {
        if (!this.vo) {
            return;
        }
        var arr: Array<number> = this.vo.val;
        var itemId = arr[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具不足，无法使用");
            return;
        }
        this.isDianhuaIng = !this.isDianhuaIng;
        if (this.isDianhuaIng) {
            this.btn_one.label = "停止使用";
            this.timer.loop(this.loopTime, this, this.dianhuaLoop);
            this.dianhuaLoop();
        } else {
            this.btn_one.label = "自动使用";
            this.timer.clear(this, this.dianhuaLoop);
        }
    }

    private dianhuaLoop(): void {
        if (!this.vo) {
            return;
        }
        var arr: Array<number> = this.vo.val;
        var itemId = arr[0];

        var needNum = this.selectVo.maxNeedNum;
        if (needNum <= 0) {
            var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
            var itemEnough: boolean = (itemdata && itemdata.Count > 0);
            if (!itemEnough) {
                GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
                MsgManager.instance.showRollTipsMsg("道具已用完，停止自动升级");
            }else{
                MsgManager.instance.showRollTipsMsg("道具不足，或该宠物已达到等级上限");
            }
            this.isDianhuaIng = false;
        }
        if (!this.isDianhuaIng) {
            this.btn_one.label = "自动使用";
            this.timer.clear(this, this.dianhuaLoop);
            return;
        }
        this.parent.event(SPetEvent.PET_REQUEST_USEGODDS, [[this.selectVo.PartnerId, this.itemdata.GoodsId, 1]]);
    }

}