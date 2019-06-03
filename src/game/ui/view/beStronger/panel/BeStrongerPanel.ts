import { BeStrong_cfgVo } from "../../../../../db/sheet/vo/BeStrong_cfgVo";
import { FucManager } from "../../../manager/FucManager";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class BeStrongerPanel extends ui.main.BeStrongerPanelUI {
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
        ];
    }

    public initEvent(): void {
        this.btn_1.on(Laya.Event.CLICK, this, this.tabBtnClick, [1]);
        this.btn_2.on(Laya.Event.CLICK, this, this.tabBtnClick, [2]);
    }

    public removeEvent(): void {
        this.btn_1.off(Laya.Event.CLICK, this, this.tabBtnClick);
        this.btn_2.off(Laya.Event.CLICK, this, this.tabBtnClick);
    }

    public initComp() {
        super.initComp();
        this.itemList.itemRender = BeStrongerPanelItem;
        this.itemList.vScrollBarSkin = "";
    }

    public open(...args): void {
        this.initWindow(true, true, "西游攻略", 550, 750, 35);
        super.open();
        this._tabIndex = 1;
        this.update();
    }

    public update(): void {
        if (this._tabIndex == 1) {
            this.btn_1.selected = true;
            this.btn_2.selected = false;
        } else {
            this.btn_1.selected = false;
            this.btn_2.selected = true;
        }
        var cfgList = BeStrong_cfgVo.getListByType(this._tabIndex);
        var showList = [];
        for (let i = 0; i < cfgList.length; i++) {
            var ele:BeStrong_cfgVo = cfgList[i];
            if(SRoleData.instance.info.Lv >= ele.lv_need){
                showList.push(ele);
            }
        }
        this.itemList.array = showList;
    }

    private _tabIndex: number = -1;
    //点击
    private tabBtnClick(index: number): void {
        this._tabIndex = index;
        this.update();
    }


    public close(): void {
        super.close();
    }
}


//道具的奖励ITEM
export class BeStrongerPanelItem extends ui.main.BeStrongerItemUI {
    constructor() {
        super();
        this.gotoBtn.on(Laya.Event.CLICK, this, this.btnClick);
    }

    private _mdata: BeStrong_cfgVo;
    public set dataSource(data: BeStrong_cfgVo) {
        if (!data) {
            return;
        }
        this._mdata = data;
        //按钮
        this.gotoBtn.visible = this._mdata.action;
        //ICON
        this.icon.skin = this._mdata.res[1];
        //文本
        this.titleLb.text = this._mdata.sys_name;
        this.tipsLb.text = this._mdata.sys_dec;
        for (let i = 1; i <= 5; i++) {
            (this["star" + i] as Laya.Image).visible = this._mdata.star >= i
        }

    }

    private btnClick(): void {
        FucManager.doCfgAction(this._mdata.action);
    }

}