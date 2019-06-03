import { SRoleData } from "../../../../../net/data/SRoleData";
import { SdkManager } from "../../../../../net/SdkManager";
import { RewardList } from "../../../compent/RewardList";
import { SRechargeData, SRechargeEvent } from "../data/SRechargeData";
import { Rmb_shopVo } from "../../../../../db/sheet/vo/Rmb_shopVo";

export class TouzijihuaPanel extends ui.main.TouzijihuaPanelUI {
    constructor() {
        super();
        this.mResouce = [
        ];
    }

    public initEvent(): void {
        this.sureBtn.on(Laya.Event.CLICK, this, this.sureBtnClick);

        SRechargeData.instance.on(SRechargeEvent.REFRESH_YUEKA_DATA, this, this.updateData);
    }

    public removeEvent(): void {
        this.sureBtn.off(Laya.Event.CLICK, this, this.sureBtnClick);

        SRechargeData.instance.off(SRechargeEvent.REFRESH_YUEKA_DATA, this, this.updateData);
    }

    public initComp() {
        super.initComp();
        this.showList.itemRender = TouzijihuaItem;
        this.showList.vScrollBarSkin = "";
    }

    public open(...args): void {
        this.initWindow(true, true, "投资计划", 550, 750, 50);
        super.open();
        this.updateData();
    }

    public updateData(): void {
        var cfg = Rmb_shopVo.get(2);
        this.showList.array = cfg.extra;
        
        var data = SRechargeData.instance.touzijihuaDetail;
        if(!data){
            return;
        }
        var hadRecharge = data.Bought == 1;
        this.sureBtn.visible = !hadRecharge;
        this.sureBtn.label = "投资（" + cfg.money + "元)"
    }

    public sureBtnClick(): void {
        var data = SRechargeData.instance.touzijihuaDetail;
        if(!data){
            return;
        }
        var hadRecharge = data.Bought == 1;
        if (!hadRecharge) {
            var cfg = Rmb_shopVo.get(2);
            SdkManager.instance.Pay(2, cfg.money);
        }

    }

}


//道具的奖励ITEM
export class TouzijihuaItem extends ui.main.TouzijihuaItemUI {
    private _rewarldList: RewardList;

    constructor() {
        super();
        this.initList();
        this.initEvent();
    }

    public initEvent(): void {
        this.getBtn.on(Laya.Event.CLICK, this, this.getBtnClick);
    }

    public removeEvent(): void {
        this.getBtn.off(Laya.Event.CLICK, this, this.getBtnClick);
    }

    public initList() {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.rowCount = 2;
        this._rewarldList.maxNum = 2;
        this._rewarldList.hGap = 5;
        this._rewarldList.itemStyle = 80;
        this.rewardBox.addChild(this._rewarldList);
    }

    private _mdata: number[];
    public set dataSource(data: number[]) {
        if (!data) {
            return;
        }
        this._mdata = data;
        this.lvLb.text = data[0] + "级";
        this._rewarldList.updateRewardsByNum(data[1]);
        this.getBtn.visible = this.hasGetImg.visible = this.lvNoLb.visible = false;
        var jihuaData = SRechargeData.instance.touzijihuaDetail;
        if(!jihuaData || jihuaData.Bought == 0){
            this.lvNoLb.visible = true;
            return;
        }
        var lvOK = SRoleData.instance.info.Lv >= data[0];
        var hadGet = SRechargeData.instance.touzijihuaLvGet(data[0]);
        if (lvOK) {
            if(hadGet){
                this.hasGetImg.visible = true;
            }else{
                this.getBtn.visible = true;
            }
        } else {
            this.lvNoLb.visible = true;
        }
    }

    private getBtnClick(): void {
        SRechargeData.instance.protocol.send13129(this._mdata[0]);
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }

}