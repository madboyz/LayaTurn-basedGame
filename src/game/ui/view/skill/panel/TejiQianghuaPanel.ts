import { BaseItem } from "../../../compent/BaseItem";
import { ProgressBar } from "../../../compent/ProgressBar";
import { ItemData } from "../../../compent/data/ItemData";
import { ToolTipSmellEquip } from "../../../compent/ToolTipSmellEquip";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { MsgManager } from "../../../manager/MsgManager";
import { Teji_qianghua_cfgVo } from "../../../../../db/sheet/vo/Teji_qianghua_cfgVo";
import { DataManager } from "../../../../../message/manager/DataManager";
import { CommonControl } from "../../../../common/control/CommonControl";
import { S15001, S15177 } from "../../../../../net/pt/pt_15";
import { SSkillData } from "../../../../skill/SSkillData";
import { PetSkillItem } from "../../pet/item/PetSkillItem";
import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";

export class TejiQianghuaPanel extends ui.main.TejiQianghuaPanelUI {
    private _item: BaseItem;
    private skillSprites: PetSkillItem[];
    private _costItem: BaseItem;
    private _progressBar: ProgressBar;
    private selectVo: ItemData;
    private detailInfo: S15001;
    private loopTime: number = 300;
    private goodsInfoDic: any = {};

    private _lastHoleNum: number;//记录之前的技能格子，停止自动强化;
    private costItemData: ItemData;
    private maxHole: number;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
        DataManager.listen(PROTOCOL.E15001, this, this.onS15001);
        DataManager.listen(PROTOCOL.E15177, this, this.onS15177);

        this.noDataBox.on(Laya.Event.CLICK, this, this.noDataBoxClick);
        this.dianhuaBtn.on(Laya.Event.CLICK, this, this.dianhuaBtnClick);
    }

    public removeEvent(): void {
        DataManager.cancel(PROTOCOL.E15001, this, this.onS15001);
        DataManager.cancel(PROTOCOL.E15177, this, this.onS15177);

        this.noDataBox.off(Laya.Event.CLICK, this, this.noDataBoxClick);
        this.dianhuaBtn.off(Laya.Event.CLICK, this, this.dianhuaBtnClick);
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.update();
    }

    private initList(): void {
        if (!this._item) {
            this._item = new BaseItem;
            this._item.setItemStyle(80);
            this.itemBox.addChild(this._item);
        }
        if (!this._costItem) {
            this._costItem = new BaseItem;
            this._costItem._hideBg = true;
            this._costItem.setItemStyle(60);
            this.costItemBox.addChild(this._costItem);
        }
        if (!this._progressBar) {
            this._progressBar = new ProgressBar();
            this._progressBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("bar_1"), 345, 26);
            this._progressBar.setLabel(1, 20, "#ffffff");
            this._progressBar.setValue(0, 100);
            this.progressBox.addChild(this._progressBar);
        }
        if (!this.skillSprites) {
            this.skillSprites = [];
            for (let i = 0; i < 3; i++) {
                var item: PetSkillItem = new PetSkillItem();
                item.setItemStyle(80);
                this.skillBox.addChild(item);
                var x = i * 100;
                item.x = x;
                this.skillSprites.push(item);
            }
        }

    }

    public open(...args): void {
        this.initWindow(true, true, "特技强化", 486, 485, 230);
        super.open();
        this.selectVo = this.arg && this.arg[0];
        if (this.selectVo != null) {
            CommonControl.instance.send15001(this.selectVo.serverInfo.GoodsId);
        }
        this.updateData();
    }

    public onS15001(data: S15001): void {
        if (this.selectVo && data.GoodsId == this.selectVo.serverInfo.GoodsId) {
            this.detailInfo = data;
            this.updateData();
        }
    }

    public onS15177(data: S15177): void {
        if (this.detailInfo && this.detailInfo.GoodsId == data.GoodsId) {
            this.detailInfo.Luck = data.Luck;
            this.detailInfo.item_3 = data.item_1;
            this.updateData();
        }
    }

    public updateData(): void {
        this._item.itemData = this.selectVo;
        this._item.toolTipData = this.selectVo;
        this._item.renderClass = ToolTipSmellEquip;
        this.noDataBox.visible = this.selectVo == null;


        var holeCfg = ConstVo.get("STUNT_INTENSIFY_MAX_NUM").val;
        var lucky = 0;
        var nowHole = 0;
        var skillList = [];
        //刷新技能
        for (let i = 0; i < 3; i++) {
            var skillItem = this.skillSprites[i];
            skillItem.x = 100 * i;
            skillItem.visible = true;
            skillItem.info = null;
        }
        //根据数据，刷新内容
        if (this.detailInfo != null) {
            this.maxHole = 0;
            for (let i = 0; i < holeCfg.length; i++) {
                const element = holeCfg[i];
                if (this.selectVo.clientInfo.lv >= element[0] && this.selectVo.clientInfo.lv <= element[1]) {
                    this.maxHole = element[2];
                    break;
                }
            }
            nowHole = this.detailInfo.item_3.length;
            skillList = this.detailInfo.item_3;
            var costCfg = Teji_qianghua_cfgVo.get(nowHole);

            lucky = this.detailInfo.Luck;

            //刷新技能
            for (let i = 0; i < 3; i++) {
                var skillItem = this.skillSprites[i];
                var skillInfo = this.detailInfo.item_3[i];
                skillItem.x = (this.maxHole == 1 ? 100 : this.maxHole == 2 ? 50 : 0) + 100 * i;
                skillItem.visible = (i + 1) <= this.maxHole;
                if (skillInfo) {
                    skillItem.info = SkillVo.get(skillInfo.SkillNo);
                    skillItem.toolTipData = SkillVo.get(skillInfo.SkillNo);
                } else {
                    skillItem.info = null;
                    skillItem.toolTipData = null;
                }
            }



        } else {
            var costCfg = Teji_qianghua_cfgVo.get(0);
        }
        var hadItemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(costCfg.cost[0][0]);
        var hadNum = hadItemdata.Count;

        this.costItemData = new ItemData(costCfg.cost[0][0]);
        this.costItemData.Count = costCfg.cost[0][1];
        this._costItem.itemData = this.costItemData;
        this._costItem.amount = 1;
        this._costItem.toolTipData = this.costItemData;
        this.costNumLb.text = hadNum + "/" + costCfg.cost[0][1];
        this.costNumLb.color = hadNum >= costCfg.cost[0][1] ? "#8e5213" : "#ff0000";

        this._progressBar.setValue(lucky, costCfg.luck_max);


    }

    public noDataBoxClick(): void {
        UIManager.instance.openUI(UIID.TEJI_QIANGHUA_SELECT_PANEL);
    }

    private isDianhuaIng: boolean = false;
    //点击点化
    private dianhuaBtnClick(): void {
        if (!this.detailInfo) {
            return;
        }
        var itemId = this.costItemData.GoodsNo;
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count >= this.costItemData.Count);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, this.costItemData.Count - itemdata.Count);
            MsgManager.instance.showRollTipsMsg("道具不足，无法强化");
            return;
        }
        this.isDianhuaIng = !this.isDianhuaIng;
        if (this.isDianhuaIng) {
            this.dianhuaBtn.label = "停止强化";
            this._lastHoleNum = this.detailInfo.item_3.length;
            this.timer.loop(this.loopTime, this, this.dianhuaLoop);
            this.dianhuaLoop();
        } else {
            this.dianhuaBtn.label = "自动强化";
            this.timer.clear(this, this.dianhuaLoop);
        }
    }

    private dianhuaLoop(): void {
        if (!this.detailInfo) {
            this.isDianhuaIng = false;
        }
        var itemId = this.costItemData.GoodsNo;
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count >= this.costItemData.Count);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, this.costItemData.Count - itemdata.Count);
            MsgManager.instance.showRollTipsMsg("道具已用完，停止自动强化");
            this.isDianhuaIng = false;
        }
        if (this.detailInfo.item_3.length != this._lastHoleNum) {
            this._lastHoleNum = this.detailInfo.item_3.length;
            this.isDianhuaIng = false;
        }
        if (this.detailInfo.item_3.length >= this.maxHole) {
            MsgManager.instance.showRollTipsMsg("已达到装备技能上限");
            this.isDianhuaIng = false;
        }
        if (!this.isDianhuaIng) {
            this.dianhuaBtn.label = "自动强化";
            this.timer.clear(this, this.dianhuaLoop);
            return;
        }
        SSkillData.instance.protocol.send15177(this.detailInfo.GoodsId);
    }


    public close(): void {
        this.selectVo = null;
        this.detailInfo = null;
        this.costItemData = null;
        this.isDianhuaIng = false;
        this.maxHole = 0;
        this.dianhuaBtn.label = "自动强化";
        this.timer.clear(this, this.dianhuaLoop);
        super.close();
    }

}

