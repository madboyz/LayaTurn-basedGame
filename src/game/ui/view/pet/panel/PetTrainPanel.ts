import { PetInfo } from "../../../compent/data/PetInfo";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { Pet_cultivateVo } from "../../../../../db/sheet/vo/Pet_cultivateVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SPetEvent } from "../../../../../net/data/SPetData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { MsgManager } from "../../../manager/MsgManager";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class PetTrainPanel extends ui.main.PetTrainPanelUI {
    private selectVo: PetInfo;
    private item: BaseItem;
    private vo: Pet_cultivateVo;
    private num: number = 0;
    public _isAuto: boolean;
    private addAttrProgress: Laya.Dictionary = new Laya.Dictionary();
    private progressLabels: Laya.Dictionary = new Laya.Dictionary();
    private addAttr: Laya.Dictionary = new Laya.Dictionary();
    constructor() {
        super();
    }

    public initComp(): void {
        HtmlUtils.setHtml(this.txt_m.style, 6, 20, "center", "middle");
        this.initItem();
        this.initProgress();
        this.initEvent();
    }

    private initItem(): void {
        if (!this.item) {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.addChild(this.item);
            this.item.x = 386;
            this.item.y = 460;
        }
    }

    private initProgress(): void {
        for (let i = 0; i < 6; i++) {
            var Progress: ProgressBar = new ProgressBar();
            Progress.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_yellowBar"), 344, 24);
            Progress.x = 164;
            Progress.y = 201 + i * 33;
            this.addChild(Progress);
            this.addAttrProgress.set(i + 1, Progress);

            var text: laya.html.dom.HTMLDivElement = new laya.html.dom.HTMLDivElement();
            HtmlUtils.setHtml(text.style, 3, 19, "center", "middle");
            text["_width"] = 344;
            text["_height"] = 24;
            text.x = 164;
            text.y = 201 + i * 33;
            this.progressLabels.set(i + 1, text);
            this.addChild(text);
            this.UpdateProgress(i + 1);
        }
    }

    private initEvent(): void {
        this.btn_lv.on(Laya.Event.CLICK, this, this.onOne);
    }

    private removeEvent(): void {
        this.btn_lv.off(Laya.Event.CLICK, this, this.onOne);
    }

    public updatePetInfo(vo: PetInfo): void {
        if (vo.active && (this.selectVo && this.selectVo.PartnerId != vo.PartnerId) || (!this.selectVo)) {
            this.selectVo = vo;
            this.isStarAuto = false;
            this.updateData();
        }
    }

    public updateData(): void {
        this.updateInfo();
        this.updateAttr();
        this.updateCost();
        this.updateState();
    }

    public onUpdateRefine(): void {
        this.updateData();
        if (this.isStarAuto) {
            var delayTime = ConstVo.get("AUTO_STR").val[2][1];
            Laya.timer.once(delayTime, this, this.onLv);
        }
    }

    private updateAttr() {
        this.addAttr.clear();
        if (this.selectVo) {
            this.addAttr.set(1, { origin: this.selectVo.curHpLim, value: this.selectVo.nextHpLim });
            this.addAttr.set(2, { origin: this.selectVo.curPhyAtt, value: this.selectVo.nextPhyAtt });
            this.addAttr.set(3, { origin: this.selectVo.curMagAtt, value: this.selectVo.nextMagAtt });
            this.addAttr.set(4, { origin: this.selectVo.curPhyDef, value: this.selectVo.nextPhyDef });
            this.addAttr.set(5, { origin: this.selectVo.curMagDef, value: this.selectVo.nextMagDef });
            this.addAttr.set(6, { origin: this.selectVo.curSpeed, value: this.selectVo.nextSpeed });
        }
        this.updateDisPlayerValue();
    }

    private updateDisPlayerValue() {
        for (let i = 0; i < this.addAttr.keys.length; i++) {
            const key = this.addAttr.keys[i];
            this.UpdateProgress(key);
        }
    }

    private UpdateProgress(key: number) {
        if (!this.selectVo)
            return;
        this.vo = this.selectVo.nextCultivateVo;
        var progress: ProgressBar = this.addAttrProgress.get(key);
        var table = this.addAttr.get(key);
        var label: laya.html.dom.HTMLDivElement = this.progressLabels.get(key);
        if (this.vo) {
            progress.setValue(table.origin, this.selectVo.getMaxValueByType(key));
            if (table.value == table.origin) {
                label.innerHTML = HtmlUtils.addColor(`${table.origin}`, "#ffffff", 19);
            }
            else {
                label.innerHTML = HtmlUtils.addColor(`${table.origin}`, "#ffffff", 19) + HtmlUtils.addColor(`+${table.value}`, "#33ff00", 19);
            }
        } else {
            progress.setValue(this.selectVo.getMaxValueByType(key), this.selectVo.getMaxValueByType(key));
            label.innerHTML = HtmlUtils.addColor(`${this.selectVo.getMaxValueByType(key)}`, "#ffffff", 19);
        }
    }

    public updateInfo(): void {
        if (this.selectVo.active) {
            this.parent && this.parent["updateCombat"](this.selectVo.BattlePower);
        }
        else {
            this.parent && this.parent["updateCombat"](this.selectVo.vo.battle);
        }
        this.parent && this.parent["updateCombatPos"](140, true);
        this.txt_lv.text = "Lv." + this.selectVo.Lv;
        this.txt_floor.text = this.selectVo.layerName;
    }

    private updateState(): void {
        if (this.vo) {
            this.maxLvLb.visible = false;
            this.costBox.visible = true;
            this.btn_lv.gray = false;

            if (this.vo.need_lv <= this.selectVo.Lv) {
                this.txt_tips.text = "";
            }
            else {
                this.txt_tips.text = "需要宠物lv" + this.vo.need_lv;
            }
        }
        else {
            this.maxLvLb.visible = true;
            this.costBox.visible = false;
            this.btn_lv.gray = true;
            this.txt_tips.text = "";
        }
    }

    public updateCost(): void {
        this.vo = this.selectVo.nextCultivateVo;
        if (this.vo) {
            this.num = SBagData.instance.prop.getItemCountByGoodsNo(this.vo.alchemy_no);
            this.item.itemCode = this.vo.alchemy_no;
            this.item.toolTipData = this.item.itemData;
            this.txt_name.text = this.selectVo.vo.name;
            if (this.num >= this.vo.alchemy_num) {
                this.txt_m.innerHTML = HtmlUtils.addColor(this.num.toString() + "/" + this.vo.alchemy_num, "#04a30a", 20);
            }
            else {
                this.txt_m.innerHTML = HtmlUtils.addColor(this.num.toString() + "/" + this.vo.alchemy_num, "#ff0000", 20);
            }
        }
        else {
            this.txt_name.visible = false;
            this.txt_m.visible = false;
            this.item.visible = false;
        }
    }


    private clearActiveItem(): void {
        if (this.item) {
            this.item.dispose();
            this.item.removeSelf();
            this.item = null;
        }
    }

    public startAuto(): void {
        this.onLv();
    }

    public stopAuto(): void {
        Laya.timer.clear(this, this.onLv);
    }

    public set isStarAuto(value: boolean) {
        if (value) {
            if (this._isAuto) {
                this._isAuto = false;
                this.btn_lv.label = "一键修炼";
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
            this.btn_lv.label = "一键修炼";
            this.stopAuto();
        }
    }

    public get isStarAuto(): boolean {
        return this._isAuto;
    }

    private onOne(): void {
        if (!this.isStarAuto) {
            this.isStarAuto = true;
            //this.onLv();点击这个会触发两个，有问题的话回退这边
        }
        else {
            this.isStarAuto = false;
        }

    }

    private onLv(): void {
        if (this.vo) {
            if (this.num >= this.vo.alchemy_num) {
                if (this.vo.need_lv <= this.selectVo.Lv) {
                    this.parent.event(SPetEvent.PET_REQUEST_TRAIN, [[this.selectVo.PartnerId, 1]]);
                }
                else {
                    this.isStarAuto = false;
                    MsgManager.instance.showRollTipsMsg("您得等级不足！");
                }
            }
            else {
                var needNum = this.vo.alchemy_num - this.num;
                GoodsUtils.CheckGotoShopByGoodsNo(this.vo.alchemy_no, needNum);
                this.isStarAuto = false;
                MsgManager.instance.showRollTipsMsg("您得材料不足！");
            }
        }
        else {
            this.isStarAuto = false;
            MsgManager.instance.showRollTipsMsg("已经达到修炼得最高境界了！");
        }
    }

    public removeSelf(): any {
        this._isAuto = false;
        this.vo = null;
        this.selectVo = null;
        this.num = 0;
        this.addAttrProgress.clear();
        this.progressLabels.clear();
        this.addAttr.clear();
        Laya.timer.clear(this, this.onLv);
        this.clearActiveItem();
        this.removeEvent();
        super.removeSelf();
    }
}