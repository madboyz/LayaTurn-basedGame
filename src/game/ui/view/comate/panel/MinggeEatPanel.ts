import { MinggeInfo } from "../data/MinggeInfo";
import { MinggeItem } from "../data/MinggeItem";
import { SComateData, SComateEvent } from "../data/SComateData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { Alert } from "../../../compent/Alert";
import { C37024_1 } from "../../../../../net/pt/pt_37";

export class MinggeEatPanel extends ui.main.MinggeEatPanelUI {
    public showListData: MinggeInfo[];
    public selectData: MinggeInfo[];

    private _progressBar: ProgressBar;

    private quilitySelectOpen: boolean = false;//选择品质面板是否打开
    private selectQuility: number = 3;//选择品质

    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.mResouce = [
            { url: "res/atlas/comate.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.itemList.itemRender = MinggeEatItem;
        this.itemList.vScrollBarSkin = "";

        this._progressBar = new ProgressBar();
        this._progressBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("bar_1"), 275, 26);
        this._progressBar.setLabel(0);
        this._progressBar.x = 0;
        this._progressBar.y = 0;
        this.progressBox.addChild(this._progressBar);

        HtmlUtils.setHtml(this.expLb.style, 6, 20, "center", "top");
        this.expLb.color = "#ffffff";
    }

    public open(...args): void {
        this.initWindow(true, true, "命格吞噬", 480, 590, 140);
        super.open();
        this.quilitySelectOpen = false;
        this.selectQuility = 3;
        this.bigUpdateData();
    }

    public bigUpdateData(): void {
        //整理可以装备的数据
        this.selectData = [];
        this.showListData = SComateData.instance.minggeBagList.concat();
        this.showListData.sort((a: MinggeInfo, b: MinggeInfo): any => {
            if (a.cfg.qualiy != b.cfg.qualiy) {
                return b.cfg.qualiy - a.cfg.qualiy;
            }
            return a.cfg.no - b.cfg.no;
        });
        this.updateData();
    }

    public updateData() {
        this.itemList.array = this.showListData;
        //选择品质
        this.selectQualityLb.text = `吞噬${(this.selectQuility == 4 ? "紫色" : (this.selectQuility == 3 ? "蓝色" : "绿色"))}及以下`;
        this.selectOpenBox.visible = this.quilitySelectOpen;
        this.arrowImg.rotation = this.quilitySelectOpen ? 180 : 0;
        //TIPS
        var addExp = 0;
        for (let i = 0; i < this.selectData.length; i++) {
            const element = this.selectData[i];
            addExp += element.serverInfo.TotalExp;
        }
        var addStr = addExp > 0 ? ("&nbsp;" + HtmlUtils.addColor("+" + addExp, "#00b007", 20)) : "";
        var thisData = (this.arg[0] as MinggeInfo);
        this.nameLb.text = thisData.cfg.name + "(Lv." + thisData.Lv + ")";
        var isMax = thisData.cfg.lv_exp[thisData.Lv] == null;
        if(isMax){
            this.expLb.innerHTML = thisData.serverInfo.TotalExp + "(已满级)";
            this._progressBar.setValue(thisData.serverInfo.TotalExp, thisData.serverInfo.TotalExp);
        }else{
            this.expLb.innerHTML = thisData.serverInfo.TotalExp + addStr + "/" + thisData.cfg.lv_exp[thisData.Lv];
            this._progressBar.setValue(thisData.serverInfo.TotalExp, thisData.cfg.lv_exp[thisData.Lv]);
        }

    }

    public clicktItem(data: MinggeInfo): void {
        var index = this.selectData.indexOf(data);
        if (index == -1) {
            this.selectData.push(data);
        } else {
            this.selectData.splice(index, 1);
        }
        this.updateData();
    }


    public initEvent(): void {
        this.eatBtn.on(Laya.Event.CLICK, this, this.eatBtnClick);
        this.oneKeyEatBtn.on(Laya.Event.CLICK, this, this.oneKeyEatBtnClick);
        this.selectBox.on(Laya.Event.CLICK, this, this.selectBoxClick);

        this.qualityBtn2.on(Laya.Event.CLICK, this, this.qualityBtnClick, [2]);
        this.qualityBtn3.on(Laya.Event.CLICK, this, this.qualityBtnClick, [3]);
        this.qualityBtn4.on(Laya.Event.CLICK, this, this.qualityBtnClick, [4]);

        SComateData.instance.on(SComateEvent.MINGGE_ITEM_CHANGE,this,this.bigUpdateData);
    }
    
    public removeEvent(): void {
        this.eatBtn.off(Laya.Event.CLICK, this, this.eatBtnClick);
        this.oneKeyEatBtn.off(Laya.Event.CLICK, this, this.oneKeyEatBtnClick);
        this.selectBox.off(Laya.Event.CLICK, this, this.selectBoxClick);
        
        this.qualityBtn2.off(Laya.Event.CLICK, this, this.qualityBtnClick);
        this.qualityBtn3.off(Laya.Event.CLICK, this, this.qualityBtnClick);
        this.qualityBtn4.off(Laya.Event.CLICK, this, this.qualityBtnClick);

        SComateData.instance.off(SComateEvent.MINGGE_ITEM_CHANGE,this,this.bigUpdateData);
    }
    

    private eatBtnClick(): void {
        if (this.selectData.length <= 0) {
            return;
        }
        var item1: C37024_1[] = [];
        for (let i = 0; i < this.selectData.length; i++) {
            const element = this.selectData[i];
            var data = new C37024_1;
            data.Id = element.serverInfo.Id;
            item1.push(data);
        }
        SComateData.instance.protocol.send37024(0, (this.arg[0] as MinggeInfo).serverInfo.Id, SComateData.instance.CurrentComate.Id, item1);
    }

    private oneKeyEatBtnClick(): void {
        if (this.quilitySelectOpen) {
            this.quilitySelectOpen = false;
            this.updateData()
            return;
        }
        var str: string = HtmlUtils.addColor(`确定要吞噬所有${(this.selectQuility == 4 ? "紫色" : (this.selectQuility == 3 ? "蓝色" : "绿色"))}及以下品质命格吗？`, "#8a5428", 20);
        Alert.show(str, this, () => {
            this.doEat();
        }, null, null, null, true, "一键吞噬");
    }

    private doEat(): void {
        SComateData.instance.protocol.send37024(this.selectQuility, (this.arg[0] as MinggeInfo).serverInfo.Id, SComateData.instance.CurrentComate.Id, []);
    }

    private selectBoxClick(): void {
        this.quilitySelectOpen = !this.quilitySelectOpen;
        this.updateData();
    }

    private qualityBtnClick(quality: number): void {
        this.quilitySelectOpen = false;
        this.selectQuility = quality;
        this.updateData();
    }

    public close(): void {
        super.close();
    }

}


export class MinggeEatItem extends MinggeItem {
    private box: Laya.CheckBox;

    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.thisClick);

        this.box = new Laya.CheckBox();
        this.box.skin = ResUtils.getCompUIUrl("btn_select");
        this.box.stateNum = 2;
        this.addChild(this.box);
        this.box.x = this.width - this.box.width - 12;
        this.box.y = 12;
        this.box.selected = false;
        this.box.label = "";
        this.box.width = 30;
        this.box.height = 60;
        this.box.mouseThrough = false;
        this.box.selected = false;

        this.size(90, 101);

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
        var panel: MinggeEatPanel = (this.parent.parent.parent as MinggeEatPanel);
        var index = panel.selectData.indexOf(this.mData);
        this.box.selected = index != -1;
    }

    public thisClick(): void {
        var panel: MinggeEatPanel = (this.parent.parent.parent as MinggeEatPanel);
        panel.clicktItem(this.mData);
    }

}