import { Recharge_reward_cfgVo } from "../../../../../db/sheet/vo/Recharge_reward_cfgVo";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { RewardList } from "../../../compent/RewardList";
import { SRechargeData, SRechargeEvent } from "../data/SRechargeData";

export class RechargeRewardPanel extends ui.main.RechargeRewardPanelUI {
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            { url: "res/atlas/recharge.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        this.LeftBtn.on(Laya.Event.CLICK, this, this.LeftBtnClick);
        this.RightBtn.on(Laya.Event.CLICK, this, this.RightBtnClick);

        this.sureBtn.on(Laya.Event.CLICK, this, this.sureBtnClick);

        SRechargeData.instance.on(SRechargeEvent.RECHARGE_REWARD_DATA, this, this.updateData);
    }

    public removeEvent(): void {
        this.LeftBtn.off(Laya.Event.CLICK, this, this.LeftBtnClick);
        this.RightBtn.off(Laya.Event.CLICK, this, this.RightBtnClick);

        this.sureBtn.off(Laya.Event.CLICK, this, this.sureBtnClick);

        SRechargeData.instance.on(SRechargeEvent.RECHARGE_REWARD_DATA, this, this.updateData);
    }

    private _rewarldList: RewardList;

    public cfgs: Array<Recharge_reward_cfgVo>;
    public selectIndex: number = 0;//选中的index；
    private startIndex: number = 0;

    public initComp() {
        super.initComp();
        this.pageList.itemRender = RechargeRewardItem;
        this.cfgs = Recharge_reward_cfgVo.getAll();
        this.combat.url = "res/atlas/number/fight.atlas";
        this.initList();
        //list列表
    }

    private initList(): void {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 6;
        this._rewarldList.maxNum = 6;
        this._rewarldList.itemStyle = 75;
        this._rewarldList.hGap = 5;
        this.rewardBox.addChild(this._rewarldList);
    }


    private initSelect(): void {
        //判断现在挑战到了多少
        var rechargeData = SRechargeData.instance.rechargeReward;
        for (let i = 0; i < this.cfgs.length; i++) {
            var ele = this.cfgs[i];
            var isEnough = rechargeData.RechargeAcc >= ele.need_pay;
            var hadGet = SRechargeData.instance.rechargeRewardGet(ele.no);
            if (isEnough && !hadGet) {
                this.selectIndex = i;
                break;
            } else if (!isEnough) {
                this.selectIndex = i;
                break;
            }
        }
        var delatCount = this.cfgs.length - this.selectIndex - 1;
        if (delatCount < 4) {
            this.startIndex = this.cfgs.length - 4;
        } else {
            this.startIndex = this.selectIndex;
        }
    }

    public open(...args): void {
        this.initWindow(true, true, "充值礼包", 550, 750, 50);
        super.open();
        this.initSelect();
        this.updateData();
    }

    public close(): void {
        super.close();
    }

    public updateData(): void {
        var data = SRechargeData.instance.rechargeReward;
        // if (!data) {
        //     return;
        // }
        //刷新列表
        this.LeftBtn.gray = this.startIndex <= 0;
        this.RightBtn.gray = this.startIndex >= (this.cfgs.length - 4);
        var useCfg = [];
        for (let i = 0; i < 4; i++) {
            var index = this.startIndex + i;
            var ele = this.cfgs[index];
            if (ele) {
                useCfg.push(ele);
            }
        }
        this.pageList.array = useCfg;
        //刷新下方内容
        var showCfg = this.cfgs[this.selectIndex];
        this.updateIcon(showCfg);
        this._rewarldList.updateRewardsByNum(showCfg.reward_no);
        if (!data) {
            return;
        }
        this.rechargeLb.text = "已累计充值" + data.RechargeAcc + "元";
        var isEnough = data.RechargeAcc >= showCfg.need_pay;
        var hadGet = SRechargeData.instance.rechargeRewardGet(showCfg.no);
        this.sureBtn.label = (isEnough ? (hadGet ? "已领取" : "领取") : "冲点小钱");
        this.sureBtn.gray = isEnough && hadGet;
    }

    public clickIndex(index: number): void {
        this.selectIndex = index;
        this.updateData();
    }

    private sureBtnClick(): void {
        var data = SRechargeData.instance.rechargeReward;
        if (!data) {
            return;
        }
        var showCfg = this.cfgs[this.selectIndex];
        var isEnough = data.RechargeAcc >= showCfg.need_pay;
        if (isEnough) {
            SRechargeData.instance.protocol.send13131(showCfg.no);
        } else {
            SRechargeData.instance.checkOpenRecharge();
        }
    }

    private LeftBtnClick(): void {
        this.startIndex -= 1;
        this.updateData();
    }

    private RightBtnClick(): void {
        this.startIndex += 1;
        this.updateData();
    }


    //ICON特效或图片显示
    private _funcOpenImg: Laya.Image;
    private _funcEff: UIeffectLayer;
    //ICON特效或图片显示
    private _funcOpenImg2: Laya.Image;
    private _funcEff2: UIeffectLayer;
    public updateIcon(cfg: Recharge_reward_cfgVo): void {
        //模型资源
        if (this._funcEff) {
            this._funcEff.destroy();
            this._funcEff = null;
        }
        if (this._funcOpenImg) {
            this._funcOpenImg.removeSelf();
            this._funcOpenImg = null;
        }
        var res = cfg.resource[(cfg.resource.length > 1 ? (SRoleData.instance.info.Faction - 1) : 0)];
        if (res[0] == 1) {
            if (!this._funcOpenImg) {
                this._funcOpenImg = new Laya.Image;
                this._funcOpenImg.anchorX = this._funcOpenImg.anchorY = 0.5;
                this._funcOpenImg.x = 100 + (res[2] || 0);
                this._funcOpenImg.y = 100 + (res[3] || 0);
                this._funcOpenImg.scaleX = this._funcOpenImg.scaleY = cfg.scale;
                this.roleBox.addChild(this._funcOpenImg);
            }
            this._funcOpenImg.skin = res[1];
        } else if (res[0] == 2) {
            if (!this._funcEff) {
                this._funcEff = new UIeffectLayer;
                this.roleBox.addChild(this._funcEff);
            }
            var eff = this._funcEff.playEffect(res[1] + "@@full", (100 + (res[2] || 0)), (10 + (res[3] || 0)), true);
            eff.scaleX = eff.scaleY = cfg.scale;
        }
        //模型资源2
        if (this._funcEff2) {
            this._funcEff2.destroy();
            this._funcEff2 = null;
        }
        if (this._funcOpenImg2) {
            this._funcOpenImg2.removeSelf();
            this._funcOpenImg2 = null;
        }
        var res = cfg.title_image[(cfg.title_image.length > 1 ? (SRoleData.instance.info.Faction - 1) : 0)];
        if (res[0] == 1) {
            if (!this._funcOpenImg2) {
                this._funcOpenImg2 = new Laya.Image;
                this._funcOpenImg2.anchorX = this._funcOpenImg2.anchorY = 0.5;
                this._funcOpenImg2.x = 100 + (res[2] || 0);
                this._funcOpenImg2.y = 50 + (res[3] || 0);
                // this._funcOpenImg2.scaleX = this._funcOpenImg2.scaleY = cfg.scale;
                this.tipsTopBox.addChild(this._funcOpenImg2);
            }
            this._funcOpenImg2.skin = res[1];
        } else if (res[0] == 2) {
            if (!this._funcEff2) {
                this._funcEff2 = new UIeffectLayer;
                this.tipsTopBox.addChild(this._funcEff2);
            }
            this._funcEff2.playEffect(res[1] + "@@full", (100 + (res[2] || 0)), (10 + (res[3] || 0)), true);
            // eff.scaleX = eff.scaleY = cfg.scale;
        }
        //显示图片资源
        this.moneyTipsLb.text = cfg.title;
        this.combat.text = "l+" + cfg.power_up;

    }


    public destroy(): void {
        this.timer.clearAll(this);
        this._rewarldList && this._rewarldList.dispose();
        this._rewarldList = null;
        this.pageList.array = [];

        if (this._funcEff) {
            this._funcEff.destroy();
            this._funcEff = null;
        }
        if (this._funcOpenImg) {
            this._funcOpenImg.removeSelf();
            this._funcOpenImg = null;
        }

        this.removeEvent();
        super.destroy();
    }
}


//道具的奖励ITEM
export class RechargeRewardItem extends ui.main.RechargeRewardItemUI {
    public no: number;
    private _mData: Recharge_reward_cfgVo;
    private _index: number;

    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.thisClick);
        HtmlUtils.setHtml(this.tipsLb.style, 6, 18, "center", "middle");
    }

    public set dataSource(data: Recharge_reward_cfgVo) {
        if (!data) return;
        this._mData = data;
        this._index = (this.parent.parent.parent as RechargeRewardPanel).cfgs.indexOf(this._mData);
        var isSelect = this._index == (this.parent.parent.parent as RechargeRewardPanel).selectIndex;
        this.bgImg.skin = "recharge/recharge_bg_" + (isSelect ? 2 : 1) + ".png";
        this.tipsLb.innerHTML = HtmlUtils.showColorStr(data.tab, 18);
    }

    private thisClick(): void {
        (this.parent.parent.parent as RechargeRewardPanel).clickIndex(this._index);
    }

}