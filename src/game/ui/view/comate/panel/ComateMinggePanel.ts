import { BaseItem } from "../../../compent/BaseItem";
import { Comate_yuanfen_cfgVo } from "../../../../../db/sheet/vo/Comate_yuanfen_cfgVo";
import { ComateItem } from "./ComateItem";
import { SComateData, SComateEvent } from "../data/SComateData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { PropertyUtil } from "../../../../property/PropertyUtil";
import { ComateInfo } from "../data/ComateInfo";
import { MsgManager } from "../../../manager/MsgManager";
import { FightComateView } from "../../../../battle/role/fight/FightComateView";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { MinggeItem } from "../data/MinggeItem";
import { Comate_mingge_hole_cfgVo } from "../../../../../db/sheet/vo/Comate_mingge_hole_cfgVo";
import { SBossEvent } from "../../copy/BossCopy/data/SBossData";
import { MinggeInfo } from "../data/MinggeInfo";

export class ComateMinggePanel extends ui.main.ComateMinggePanelUI {
    private itemListPos: number[][] = [[247, 225], [348, 267], [389, 368], [348, 468], [247, 510], [145, 468], [104, 368], [145, 266]];
    private itemList: MinggeItem[] = [];
    private FightComateObj: FightComateView;

    private selectComate: ComateInfo;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            { url: "res/atlas/comate.atlas", type: Laya.Loader.ATLAS },
        ];
    }


    public initEvent(): void {
        this.AttrBtn.on(Laya.Event.CLICK, this, this.OpenComateAttr);
        this.oneKeyEquipBtn.on(Laya.Event.CLICK, this, this.oneKeyEquipBtnClick);
        this.goLiemingBtn.on(Laya.Event.CLICK, this, this.goLiemingBtnClick);
        SComateData.instance.on(SComateEvent.COMATE_ATTR_UPDATE, this, this.updateData);
        SComateData.instance.on(SComateEvent.MINGGE_ITEM_CHANGE, this, this.updateData);
    }

    public removeEvent(): void {
        this.AttrBtn.off(Laya.Event.CLICK, this, this.OpenComateAttr);
        this.oneKeyEquipBtn.off(Laya.Event.CLICK, this, this.oneKeyEquipBtnClick);
        this.goLiemingBtn.off(Laya.Event.CLICK, this, this.goLiemingBtnClick);
        SComateData.instance.off(SComateEvent.COMATE_ATTR_UPDATE, this, this.updateData);
        SComateData.instance.off(SComateEvent.MINGGE_ITEM_CHANGE, this, this.updateData);
    }

    public initComp() {
        super.initComp();
        this.BattleText.url = "res/atlas/number/fight.atlas";
        this.initComateView();
        for (let i = 0; i < 8; i++) {
            var item = new MinggeItem;
            this.addChild(item);
            item.isShowToolTip = true;
            item.dataSource = null;
            item.x = this.itemListPos[i][0];
            item.y = this.itemListPos[i][1];
            this.itemList.push(item);
        }

    }

    private initComateView() {
        this.FightComateObj = Laya.Pool.getItemByClass("FightComateView", FightComateView);
        this.FightComateObj.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.roleBox.addChild(this.FightComateObj);
    }

    public open(...args): void {
        this.initWindow(true, true, "伙伴命格", 540, 600, 120);
        super.open();
        this.selectComate = this.arg[0];
        this.updateData();
    }

    public updateData(): void {
        this.updateFightComate();
        this.updateBattle();
        //处理列表------------------
        var equipList = SComateData.instance.getOneKeyList(this.selectComate);
        var addNum = 0;
        for (let i = 0; i < equipList.length; i++) {
            if (equipList[i]) {
                addNum++;
            }
        }
        var totalRed: boolean = false;
        //判断是否解锁
        for (let i = 0; i < 8; i++) {
            var info = this.selectComate.minggeHoleList[i + 1];
            var item = this.itemList[i];
            item.dataSource = info;
            var tipsStr = "";
            var showRed: boolean = false;
            if (info) {
                //有数据
                if (equipList[info.cfg.type]) {
                    //有可替换
                    showRed = true;
                    addNum--;
                }
            } else {
                var lvOk: boolean = this.selectComate.Lv >= Comate_mingge_hole_cfgVo.get(i + 1).lv;
                if (!lvOk) {
                    tipsStr = "伙伴\n" + Comate_mingge_hole_cfgVo.get(i + 1).lv + "级";
                } else {
                    showRed = addNum > 0;
                    addNum--;
                }
            }
            item.tipsLb.text = tipsStr;
            item.maskImg.visible = tipsStr != "";
            item.showRed(showRed);
            totalRed = totalRed || showRed;
        }
        this.oneKeyEquipBtn.refreshRed(totalRed);

    }


    public updateFightComate() {
        if (SComateData.instance.CurrentComate == null || this.FightComateObj == null)
            return;
        if (this.FightComateObj.info == null) {
            this.FightComateObj.info = {};
        }
        this.FightComateObj.info.ParentPartnerNo = SComateData.instance.CurrentComate.No;
        this.FightComateObj.updateSkin();
        this.FightComateObj.scaleX = this.FightComateObj.scaleY = 1;
    }

    public updateBattle() {
        if (SComateData.instance.CurrentComate == null || this.BattleText == null) {
            return;
        }
        this.sp_combat.visible = SComateData.instance.CurrentComate.IsHave;
        // this.addChild(this.pingfenLb);
        // this.pingfenLb.text = "评分:" + SComateData.instance.CurrentComate.Sheet.battle.toString();
        var bat = SComateData.instance.CurrentComate.BaseAttribute.get(PropertyEnumCode.OI_CODE_BATTLE_POWER);
        if (bat != null && bat != 0)
            this.BattleText.text = bat.toString();
        else
            this.BattleText.text = SComateData.instance.CurrentComate.Sheet.battle.toString();
    }

    public OpenComateAttr(): void {
        if (SComateData.instance.CurrentComate == null)
            return;
        if (!SComateData.instance.CurrentComate.IsHave) {
            MsgManager.instance.showRollTipsMsg("未激活！");
            return;
        }
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [SComateData.instance.CurrentComate]);
    }

    public oneKeyEquipBtnClick(): void {
        var equipList = SComateData.instance.getOneKeyList(this.selectComate);
        equipList.sort((a: MinggeInfo, b: MinggeInfo): any => {
            if (a.battlePower != b.battlePower) {
                return b.battlePower - a.battlePower;
            }
            return a.cfg.no - b.cfg.no;
        });
        var holeNum = 1;
        var maxHole = 0;
        for (let i = 1; i <= 8; i++) {
            if (this.selectComate.Lv >= Comate_mingge_hole_cfgVo.get(i).lv) {
                maxHole = i;
            } else {
                break;
            }
        }

        for (let i = 0; i < equipList.length; i++) {
            const element = equipList[i];
            if (!element) {
                continue;
            }
            var equipedData = this.selectComate.minggeTypeList[element.cfg.type];
            if (equipedData) {
                SComateData.instance.protocol.send37021(this.selectComate.Id, element.serverInfo.Id, equipedData.HoleNo);
            } else {
                while (this.selectComate.minggeHoleList[holeNum]) {
                    holeNum++;
                }
                if (holeNum > maxHole) {
                    continue;
                }
                SComateData.instance.protocol.send37021(this.selectComate.Id, element.serverInfo.Id, holeNum);
                holeNum++;
            }
        }

    }

    public goLiemingBtnClick(): void {
        this.close();
        UIManager.instance.closeUI(UIID.SYS_COMATE);
        UIManager.instance.closeUI(UIID.SYS_LOOKPROP);
        UIManager.instance.openUI(UIID.COMATE_LIEMING_PANEL);
    }

    public close(): void {
        super.close();
    }

}
