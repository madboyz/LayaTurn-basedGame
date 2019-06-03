import { MinggeInfo } from "../data/MinggeInfo";
import { MinggeItem } from "../data/MinggeItem";
import { SComateData } from "../data/SComateData";

export class MinggeChangePanel extends ui.main.MinggeChangePanelUI {
    public showListData: MinggeInfo[];
    public selectIndex: number = -1;

    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.mResouce = [
            { url: "res/atlas/comate.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.itemList.itemRender = MinggeChangeItem;
        this.itemList.vScrollBarSkin = "";
    }

    public open(...args): void {
        this.initWindow(true, true, "命格替换", 480, 500, 200);
        super.open();
        this.onOpen();
        this.updateData();
    }

    public onOpen(): void {
        var comateInfo = SComateData.instance.CurrentComate;
        var notEquipType = [];
        for (let i = 0; i < comateInfo.minggeTypeList.length; i++) {
            const element = comateInfo.minggeTypeList[i];
            if (element) {
                notEquipType.push(element.cfg.type);
            }
        }
        //整理可以装备的数据
        this.showListData = [];
        var needType = (this.arg[0] as MinggeInfo).cfg.type;
        var bagList = SComateData.instance.minggeBagList;
        for (let i = 0; i < bagList.length; i++) {
            const element = bagList[i];
            if (element.cfg.type == needType || notEquipType.indexOf(element.cfg.type) == -1) {
                this.showListData.push(element);
            }
        }
        this.showListData.sort((a: MinggeInfo, b: MinggeInfo): any => {
            if (a.cfg.qualiy != b.cfg.qualiy) {
                return b.cfg.qualiy - a.cfg.qualiy;
            }
            return a.cfg.no - b.cfg.no;
        });
        if (this.showListData.length > 0) {
            this.selectIndex = 0;
        }
    }

    public updateData() {
        this.itemList.array = this.showListData;
    }

    public clicktItem(data: MinggeInfo): void {
        this.selectIndex = this.showListData.indexOf(data);
        this.updateData();
    }


    public initEvent(): void {
        this.changeBtn.on(Laya.Event.CLICK, this, this.changeBtnClick);
    }

    public removeEvent(): void {
        this.changeBtn.off(Laya.Event.CLICK, this, this.changeBtnClick);
    }


    private changeBtnClick(): void {
        SComateData.instance.protocol.send37021(SComateData.instance.CurrentComate.Id, this.showListData[this.selectIndex].serverInfo.Id, (this.arg[0] as MinggeInfo).HoleNo);
        this.close();
    }

    public close(): void {
        super.close();
    }

}


export class MinggeChangeItem extends MinggeItem {
    public showBg: boolean = true;

    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.thisClick);
    }


    public set dataSource(data: MinggeInfo) {
        if (!data) {
            return;
        }
        this.lbBox.visible = true;
        this.Frame.visible = false;
        this.mData = data;
        this.lvLb.text = "Lv." + data.Lv;
        this.icon.skin = ResUtils.getItemIcon(data.cfg.icon);
        //选中相关
        var panel: MinggeChangePanel = (this.parent.parent.parent as MinggeChangePanel);
        var index = panel.showListData.indexOf(this.mData);
        this.isSelect = (this.parent.parent.parent as MinggeChangePanel).selectIndex == index;
    }


    public _selectBg: Laya.Image;
    public set isSelect(value: Boolean) {
        if (value) {
            if (this._selectBg == null) {
                this._selectBg = new Laya.Image();
                this._selectBg.sizeGrid = "35,35,35,35";
                this._selectBg.skin = ResUtils.getItemBase("img_select");//选中
                this._selectBg.width = 90;
                this._selectBg.height = 90;
                this.addChild(this._selectBg);
                this._selectBg.x = 0;
                this._selectBg.y = 8;
            }
        }
        else {
            if (this._selectBg) {
                this._selectBg.removeSelf();
                this._selectBg = null;
            }
        }
    }

    public thisClick(): void {
        var panel: MinggeChangePanel = (this.parent.parent.parent as MinggeChangePanel);
        panel.clicktItem(this.mData);
    }

}