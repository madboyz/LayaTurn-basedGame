import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { AwardUtil } from "../../../../award/AwardUtil";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { SActiveEvent } from "../../active/data/SActiveData";
import { Sys_openVo } from "../../../../../db/sheet/vo/Sys_openVo";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { SGameEvent } from "../../../../../net/data/SGameData";
import { FucManager } from "../../../manager/FucManager";

export class FuncOpenPanel extends ui.main.FuncOpenPanelUI {
    private param: any;//传进来的参数
    private showCfg: Sys_openVo;

    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isShowMask = true;
        this.isCloseByNull = false;
        this.mResouce = [
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        this.okBtn.on(Laya.Event.CLICK, this, this.okBtnClick);
    }

    public removeEvent(): void {
        this.okBtn.off(Laya.Event.CLICK, this, this.okBtnClick);
    }

    public initComp() {
        super.initComp();
        this.rewardList.itemRender = FuncOpenPanelItem;
    }

    public open(...args): void {
        this.param = this.arg;

        this.initWindow(true, false, "登录奖励", 486, 557, 160);
        super.open();
        this.showUIEffect();
        this.update();
    }

    public update(): void {
        var isGetReward: boolean = this.param && this.param[0];
        if (isGetReward) {
            this.showCfg = Sys_openVo.getFuncCfg(this.param[1]);
        } else {
            this.showCfg = Sys_openVo.nextFuncCfg(SRoleData.instance.info.Lv);
        }
        //奖励相关
        var hasReward: boolean = (this.showCfg.is_func_book && this.showCfg.is_func_book > 0);
        if (hasReward) {
            var awardId = this.showCfg.reward_no;
            var goodsList = AwardUtil.GetNormalGoodsList(awardId, true, true);
            goodsList = goodsList.slice(0, 3);
            this.rewardList.array = goodsList;
            this.rewardList.x = 168 + (3 - goodsList.length) * 41;
        } else {
            this.rewardList.array = [];
        }
        this.okBtn.y = hasReward ? 630 : 510;
        this.okBtn.label = (isGetReward && hasReward) ? "领取" : "确定";
        this.tipsLb2.text = hasReward ? "(额外获得)" : "";
        //tips文本
        this.tipsLb.style.align = "center";
        if (isGetReward) {
            this.tipsLb.innerHTML = HtmlUtils.addColor(this.showCfg.sys_name, "#d9e109", 20, "黑体") +
                HtmlUtils.addColor("已开启", "#ffffff", 20, "黑体")
        } else {
            this.tipsLb.innerHTML = HtmlUtils.addColor(this.showCfg.sys_name, "#d9e109", 20, "黑体") +
                HtmlUtils.addColor("还差", "#ffffff", 20, "黑体") +
                HtmlUtils.addColor((this.showCfg.lv_need - SRoleData.instance.info.Lv) + "级", "#d9e109", 20, "黑体") +
                HtmlUtils.addColor("开启", "#ffffff", 20, "黑体");
        }
        this.textLb1.text = this.showCfg.slogen.slice(0, 5);
        this.textLb2.text = this.showCfg.slogen.slice(5, 10);
        //模型
        this.updateIcon();
    }

    //ICON特效或图片显示
    private _funcOpenImg: Laya.Image;
    private _funcEff: UIeffectLayer;
    public updateIcon(): void {
        if (this._funcEff) {
            this._funcEff.destroy();
            this._funcEff = null;
        }
        if (this._funcOpenImg) {
            this._funcOpenImg.removeSelf();
            this._funcOpenImg = null;
        }
        var res = this.showCfg.res[(this.showCfg.res.length > 1 ? (SRoleData.instance.info.Faction - 1) : 0)];
        if (res[0] == 1) {
            if (!this._funcOpenImg) {
                this._funcOpenImg = new Laya.Image;
                this._funcOpenImg.anchorX = this._funcOpenImg.anchorY = 0.5;
                this._funcOpenImg.x = 100 + (res[2] || 0);
                this._funcOpenImg.y = 100 + (res[3] || 0);
                this._funcOpenImg.scaleX = this._funcOpenImg.scaleY = this.showCfg.scale[0][1];
                this.funcOpenBox.addChild(this._funcOpenImg);
            }
            this._funcOpenImg.skin = res[1];
        } else if (res[0] == 2) {
            if (!this._funcEff) {
                this._funcEff = new UIeffectLayer;
                this.funcOpenBox.addChild(this._funcEff);
            }
            var eff = this._funcEff.playEffect(res[1] + "@@full", (100 + (res[2] || 0)), (10 + (res[3] || 0)), true);
            eff.scaleX = eff.scaleY = this.showCfg.scale[0][1];
        }
    }



    //点击领取
    private okBtnClick(): void {
        var isGetReward: boolean = this.param && this.param[0];
        if (isGetReward) {
            this.event(SGameEvent.GAME_NEWSYSTE_GETREWARD, this.param[1])
        }
        this.close();
        var isGetReward: boolean = this.param && this.param[0];
        if (isGetReward) {
            FucManager.doCfgAction(this.showCfg.action);
        }
    }

    //特效
    private _uiEffLayer: UIeffectLayer;
    //进入战斗场景的时候播特效
    public showUIEffect(): void {
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.funcOpenBox.addChild(this._uiEffLayer);
        }
        this._uiEffLayer.playEffect("ui_effect_21", 100, 170, true);
    }


    public close(): void {
        if (this._funcEff) {
            this._funcEff.destroy();
            this._funcEff = null;
        }
        if (this._funcOpenImg) {
            this._funcOpenImg.removeSelf();
            this._funcOpenImg = null;
        }
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        super.close();
    }
}


//道具的奖励ITEM
export class FuncOpenPanelItem extends Laya.View {
    private item: BaseItem;
    constructor() {
        super();
        this.size(80, 80);
        this.item = new BaseItem();
        this.item.setItemStyle(80);
        this.item.isShowToolTip = true;
        this.addChild(this.item);
    }

    private _mdata: ItemData;
    public set dataSource(data: ItemData) {
        if (!data) {
            return;
        }
        this._mdata = data;
        this.item.itemData = this._mdata;
        this.item.toolTipData = this.item.itemData;
    }

}