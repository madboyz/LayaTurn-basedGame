import { From_sourceVo } from "../../../../../db/sheet/vo/From_sourceVo";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { BaseItem } from "../../../compent/BaseItem";
import { Jingmai_configVo } from "../../../../../db/sheet/vo/Jingmai_configVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { PropertyUtil } from "../../../../property/PropertyUtil";
import { GoodsVo } from "../../../../../db/sheet/vo/GoodsVo";
import { MsgManager } from "../../../manager/MsgManager";
import { Delay } from "../../../../../framework/utils/Delay";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class AttrItemText1 extends Laya.Text {
    constructor() {
        super();
        this.width = 173;
        this.height = 23;
        this.align = "left";
        this.valign = "middle";
        this.fontSize = 18;
        this.color = "#bf5005";
    }
}

export class JingMaiClassBtn extends ui.main.RoleJIngMaiItemUI {
    public classNum = 0;
    constructor() {
        super();
    }

    public set dataSource(data: any) {
        if (!data) return;
        this.classNum = data;
        this.icon.skin = `heartFuc/jingmai_${this.classNum}.png`;
    }

    public get dataSource(): any {
        return this.classNum;
    }
}


export class RoleJingMaiPanel extends ui.main.RoleJingMaiPanelUI {
    private AutoState = false;
    private Item: BaseItem;
    private costSheet: Jingmai_configVo;//消耗的表，实际是现在等级+1
    private CurrentClass: number = 1;
    private BosPoints = [];
    private attrDataList = [];
    private lastBtn: JingMaiClassBtn = null;
    private MaxLv = 5;
    constructor() {
        super();
        this.initComp();
        this.initEvent();
        var currentNo = SRoleData.instance.info.JinmaiNo;

        var ismax = Jingmai_configVo.getIsMax(currentNo);
        var next: Jingmai_configVo = Jingmai_configVo.get(currentNo + 1);
        if (ismax && next != null && next.class != null) {
            this.Refresh(currentNo + 1);
        } else {
            this.Refresh(currentNo);
        }
        this.updateBattlePower();

    }
    private initComp(): void {
        HtmlUtils.setHtml(this.GoodsTxt.style, 6, 18, "center", "middle");
        this.BattleValue.url = "res/atlas/number/fight.atlas";
        if (!this.Item) {
            this.Item = new BaseItem();
            this.Item.setItemStyle(60);
            this.upgardeBox.addChild(this.Item);
            this.Item.x = 90;
            this.Item.y = 13;
        }
        this.attrList.itemRender = AttrItemText1;
        this.attrList.vScrollBarSkin = "";
        this.attrList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.attrList.scrollBar.elasticDistance = 100;

        this.JingMaiList.itemRender = JingMaiClassBtn;
        this.JingMaiList.vScrollBarSkin = "";
        this.JingMaiList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.JingMaiList.scrollBar.elasticDistance = 100;
        for (let i = 1; i <= 8; i++) {
            const box = this.getChildByName("ClassBox" + i);
            this.BosPoints.push(box);
        }
    }

    private updatePoint() {
        var item = null;
        for (let i = 0; i < this.BosPoints.length; i++) {
            const element = this.BosPoints[i];
            if (i + 1 == this.CurrentClass) {
                element.visible = true;
                item = element;
            }
            else
                element.visible = false;
        }
        if (item != null)
            this.displayPoint(item);
    }

    private displayPoint(item: Laya.Box) {
        var sheet = Jingmai_configVo.get(SRoleData.instance.info.JinmaiNo);
        if (this.CurrentClass > sheet.class) {
            for (let i = 1; i <= 5; i++) {
                const point: Laya.CheckBox = item.getChildByName("Lv" + i) as Laya.CheckBox;
                point.selected = false;
            }
        }
        else if (this.CurrentClass < sheet.class) {
            for (let i = 1; i <= 5; i++) {
                const point: Laya.CheckBox = item.getChildByName("Lv" + i) as Laya.CheckBox;
                point.selected = true;
            }
        }
        else {
            for (let i = 1; i <= 5; i++) {
                const point: Laya.CheckBox = item.getChildByName("Lv" + i) as Laya.CheckBox;
                if (i <= sheet.lv)
                    point.selected = true;
                else
                    point.selected = false;
            }

        }
    }

    public async onUpgardata() {
        var currentNo = SRoleData.instance.info.JinmaiNo;
        //var ismax = Jingmai_configVo.getIsMax(currentNo);
        //var next:Jingmai_configVo= Jingmai_configVo.get(currentNo+1);
        //if(ismax)
        //{
        //    if(next != null&&next.class != null)
        //    {
        //        currentNo = currentNo+1;
        //    }
        //}
        var ismax = Jingmai_configVo.getIsMax(currentNo);
        var next: Jingmai_configVo = Jingmai_configVo.get(currentNo + 1);
        if (ismax && next != null && next.class != null) {
            this.Refresh(currentNo + 1);
        } else {
            this.Refresh(currentNo);
        }
        var nextvo = Jingmai_configVo.get(currentNo + 1);
        var isMax = true;
        if (nextvo && nextvo.class != undefined) {
            isMax = false;
        }
        if (isMax) {
            MsgManager.instance.showRollTipsMsg("已满级！");
            this.AutoBtn.label = "自动升级";
            this.AutoState = false;
            return;
        }
        else {
            var item = this.costSheet.costs[0];
            var goodsId = item[0];
            var goodsNum = item[1];
            var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
            if (num < goodsNum) {
                MsgManager.instance.showRollTipsMsg("物品不足！");
                this.AutoState = false;
                this.AutoBtn.label = "自动升级";
                return;
            }
        }

        if (this.AutoState) {
            var delayTime = ConstVo.get("AUTO_STR").val[0][1];
            await Delay.delay(delayTime);
            var nextNo = SRoleData.instance.info.JinmaiNo + 1;
            if (this.parent)
                this.parent.event(SRoleEvent.ROLE_REQUEST_JING_MAI_UPGRADE, [nextNo]);
        }
    }

    private updateDisplayCost() {
        if (!this.costSheet || (this.costSheet && !this.costSheet.costs))
            return;
        var item = this.costSheet.costs[0];
        var goodsId = item[0];
        var goodsNum = item[1];
        this.Item.itemCode = goodsId;
        this.Item.toolTipData = this.Item.itemData;
        var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
        var htmlName = "";//HtmlUtils.addColor(this.Item.itemData.clientInfo.name.toString()+"(","#8e5213",18)
        var color = "#ff0000";
        if (num >= goodsNum) {
            color = "#04a30a";
        }
        this.GoodsTxt.innerHTML = htmlName + HtmlUtils.addColor(GMath.GetChineseNumber(num) + `/${goodsNum}`, color, 18);
    }

    public updateBattlePower() {
        this.BattleValue.text = `l${SRoleData.instance.info.BattlePower.toString()}`;
    }

    public Refresh(currentNo: number): void {
        this.costSheet = Jingmai_configVo.get(SRoleData.instance.info.JinmaiNo + 1);
        if (!this.costSheet) {
            this.costSheet = Jingmai_configVo.get(SRoleData.instance.info.JinmaiNo);//如果都满了，保证不报错；
        }

        var nextvo = Jingmai_configVo.get(SRoleData.instance.info.JinmaiNo + 1);
        var isMax = Jingmai_configVo.getIsMax(currentNo);
        if (isMax) {
            this.upgardeBox.visible = false;
            this.MaxTips.visible = true;
            if (nextvo && nextvo.class)
                this.MaxTips.text = "该经脉已打通";
            else
                this.MaxTips.text = "所有经脉已打通";
        }
        else {
            this.upgardeBox.visible = true;
            this.MaxTips.visible = false;
        }
        this.updateDisplayCost();
        this.CurrentClass = Jingmai_configVo.get(currentNo) ? Jingmai_configVo.get(currentNo).class : 1;
        this.refreshAttr(currentNo);
        this.updatePoint();
        //把重复的key先筛选一遍
        this.JingMaiList.array = [1, 2, 3, 4, 5, 6, 7, 8];
    }

    public initEvent(): void {
        this.AutoBtn.on(Laya.Event.CLICK, this, this.onClickAutoBtn);
        this.attrList.renderHandler = new Laya.Handler(this, this.onAttrListRender);
        this.JingMaiList.mouseHandler = new Laya.Handler(this, this.onClickClassItem);
        this.JingMaiList.renderHandler = new Laya.Handler(this, this.onRenderJingMai);
    }

    public removeEvent(): void {
        this.AutoBtn.off(Laya.Event.CLICK, this, this.onClickAutoBtn);
        this.attrList.renderHandler = null;
        this.JingMaiList.mouseHandler = null;
        this.JingMaiList.renderHandler = null;
    }

    private onRenderJingMai(cell: JingMaiClassBtn, index: number): void {
        var classNum = index + 1;
        var sheet = Jingmai_configVo.get(SRoleData.instance.info.JinmaiNo);
        if (sheet != null) {
            if (sheet.class == null)
                sheet.class = 0;
            if (classNum > sheet.class) {
                var nextvo = Jingmai_configVo.get(SRoleData.instance.info.JinmaiNo + 1);
                if (nextvo && nextvo.class == classNum)
                    cell.filters = [];
                else {
                    var GrayFilter: Laya.ColorFilter = new Laya.ColorFilter(ResUtils.colorMatrix);
                    cell.filters = [GrayFilter];
                }

            }
            else {
                cell.filters = [];
            }
        }
        if (classNum == this.CurrentClass) {
            if (this.lastBtn != null) {
                this.lastBtn.btn.skin = "heartFuc/img_btn.png";
            }
            cell.btn.skin = "heartFuc/img_btn1.png";
            this.lastBtn = cell;
        }
        else
            cell.btn.skin = "heartFuc/img_btn.png";
    }


    private refreshAttr(currentNo: number) {
        var attrVo = Jingmai_configVo.get(currentNo);
        this.attrDataList = [];
        if (attrVo && attrVo.add_attr && SRoleData.instance.info.JinmaiNo >= currentNo) {
            var attrs = attrVo.add_attr;
            for (let j = 0; j < attrs.length; j++) {
                const element = attrs[j];
                var attrKey = element[0];
                this.attrDataList.push({ key: attrKey, value1: element[1], value2: element[2] });
            }
        }
        this.attrList.array = this.attrDataList;
    }

    private onClickClassItem(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }
        if (e.target instanceof component.ScaleButton) {
            var cell = e.target.parent as JingMaiClassBtn;
            if (cell.dataSource != null) {
                var classNum = cell.dataSource;
                var vo: Jingmai_configVo = Jingmai_configVo.get(SRoleData.instance.info.JinmaiNo);
                var ismax = Jingmai_configVo.getIsMax(SRoleData.instance.info.JinmaiNo)
                var nextvo = Jingmai_configVo.get(SRoleData.instance.info.JinmaiNo + 1);
                if (cell.dataSource <= vo.class || (ismax && nextvo != null)) {
                    this.AutoBtn.label = "自动升级";
                    this.AutoState = false;
                    this.CurrentClass = classNum;
                    var no = SRoleData.instance.info.JinmaiNo;
                    this.MaxLv = Jingmai_configVo.getClassMax(classNum);
                    if (SRoleData.instance.info.JinmaiNo >= classNum * this.MaxLv) {
                        no = classNum * this.MaxLv
                    }
                    else {
                        if (classNum * this.MaxLv - SRoleData.instance.info.JinmaiNo == this.MaxLv)
                            no += 1;
                    }
                    this.Refresh(no);
                }
                else {
                    MsgManager.instance.showRollTipsMsg("需要先打通前置经脉");
                }

            }
        }
    }

    private onAttrListRender(cell: Laya.Text, index: number): void {
        var attr = this.attrDataList[index];
        var vo = PropertyVo.getByInfo(attr.key);
        if (vo) {
            var str1 = "";
            var str2 = "";
            if (attr.value1 > 0) {
                var descValue = PropertyUtil.GetPropertyDec(vo.no, attr.value1);
                str1 = ` + ${descValue}`;
            }
            if (attr.value2 > 0) {
                str2 = ` + ${(attr.value2 * 100).toFixed(2)}%`;
            }
            var formate = ""
            if (index != this.attrList.array.length - 1) {
                formate = "\n";
            }
            cell.text = vo.name + str1 + str2 + formate;
        }
        else {
            cell.text = "未知属性";
        }
    }

    public onClickAutoBtn() {
        if (!this.AutoState) {
            var nextvo = Jingmai_configVo.get(SRoleData.instance.info.JinmaiNo + 1);
            var isMax = true;
            if (nextvo && nextvo.class != undefined) {
                isMax = false;
            }
            if (isMax) {
                MsgManager.instance.showRollTipsMsg("已满级！");
                this.AutoBtn.label = "自动升级";
                this.AutoState = false;
                return;
            }
            else {
                var item = this.costSheet.costs[0];
                var goodsId = item[0];
                var goodsNum = item[1];
                var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
                if (num < goodsNum) {
                    var needNum = goodsNum - num;
                    GoodsUtils.CheckGotoShopByGoodsNo(goodsId, needNum);
                    MsgManager.instance.showRollTipsMsg("物品不足！");
                    this.AutoState = false;
                    this.AutoBtn.label = "自动升级";
                    return;
                }
            }
            this.AutoState = true;
            this.AutoBtn.label = "停止升级";
            var next = SRoleData.instance.info.JinmaiNo + 1;
            if (this.parent)
                this.parent.event(SRoleEvent.ROLE_REQUEST_JING_MAI_UPGRADE, [next]);
        }
        else {
            this.AutoState = false;
            this.AutoBtn.label = "自动升级";
        }
    }

    public removeSelf(): any {
        this.AutoState = false;
        this.removeEvent();
        super.removeSelf();
    }
}