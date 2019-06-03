import { SGameData } from '../../../net/data/SGameData';
import { BaseItem } from './BaseItem';
import { ItemData } from './data/ItemData';
import { ToolTipsScaleBg } from './ToolTipsScaleBg';
import { SRoleData } from '../../../net/data/SRoleData';
import { ToolTipsManager } from '../manager/ToolTipsManager';
import { Attribute } from '../../property/RoleProperty';
import { DisplayUtils } from '../../utils/DisplayUtils';
import { SBagData } from '../../../net/data/SBagData';
import { DataManager } from '../../../message/manager/DataManager';
import { S15001, S15000_1 } from '../../../net/pt/pt_15';
import { StrengthInfo } from './data/StrengthInfo';
import { SForgingData } from '../../../net/data/SForgingData';
import { CommonControl } from '../../common/control/CommonControl';
import { KaiLingInfo } from './data/KaiLingInfo';
import { RefineInfo } from './data/RefineInfo';
import { GemInfo } from './data/GemInfo';
import { PropertyVo } from '../../../db/sheet/vo/PropertyVo';
import { FormulaVo } from '../../../db/sheet/vo/FormulaVo';
import { PET_QUALITY_BASE_BASE } from '../../../db/sheet/base/PET_QUALITY_BASE_BASE';
import { GemLevelVo } from '../../../db/sheet/vo/GemLevelVo';
import { HtmlUtils } from '../../utils/HtmlUtils';
import { Equip_base_quality_coefVo } from '../../../db/sheet/vo/Equip_base_quality_coefVo';
import { ItemHelper } from './data/ItemHelper';
import { MsgManager } from '../manager/MsgManager';
import { SOtherPlayerData } from '../view/otherPlayer/data/SOtherPlayerData';
import { SChatData } from '../../../net/data/SChatData';
import { Accessory_suitVo } from '../../../db/sheet/vo/Accessory_suitVo';
import { GoodsVo } from '../../../db/sheet/vo/GoodsVo';
import { SkillVo } from '../../../db/sheet/vo/SkillVo';
import { Skill } from '../../skill/Skill';
import { SkillUtil } from '../../skill/SkillUtil';

export class ToolTipsEquipment extends ToolTipsScaleBg {
    public _txtName: Laya.Text;
    public _icon: BaseItem;
    public _txtType: Laya.Text;
    public _txtLevel: Laya.Text;
    // public _share:component.ScaleButton;
    public _imgCombat: Laya.Image;
    public _combat: component.NumberImage;
    public _line: Laya.Image;
    public _baseTxt: Laya.Text;
    public _strTxt: Laya.Text;
    public _kaTxt: Laya.Text;
    // public _suitTxt: Laya.Text;//套装
    public _reTxt: Laya.Text;
    public _gemTxt: Laya.Text;
    public _txtList: Array<any> = [];
    public _btn: component.ScaleButton;
    public _strInfo: StrengthInfo;
    public _kaInfo: KaiLingInfo;
    public _reInfo: RefineInfo;
    public _gemInfo: GemInfo;
    public _isRoleEquip: boolean = false;
    public _isOtherEquip: boolean = false;

    public _isShowtype: boolean = false;//只是用来展示的类型

    /**数据*/
    protected _data: ItemData;

    constructor() {
        super();

        this.init();
    }

    private init(): void {
        this.content.visible = false;//防止没有获得属性的时候会闪一下
        this._icon = new BaseItem();
        this._icon.setItemStyle(80);
        this._icon.x = 27;
        this._icon.y = 32;
        this._icon.isShowToolTip = false;
        this.content.addChild(this._icon);

        // this._share = new component.ScaleButton();
        // this._share.skin = ResUtils.getCompUIUrl("btn_share");
        // this._share.label = "";
        // this._share.stateNum = 1;
        // this._share.width = this._share.height= 46;
        // this._share.pivot(23,23);
        // this.content.addChild(this._share);
        // this._share.x = 345;
        // this._share.y = 48;
        // this._share.on(Laya.Event.CLICK,this,this.onShare);

        this._imgCombat = new Laya.Image();
        this._imgCombat.skin = ResUtils.getCompUIUrl("img_combat");
        this._imgCombat.scaleX = this._imgCombat.scaleY = 0.7;
        this.content.addChild(this._imgCombat);
        this._imgCombat.x = 236;
        this._imgCombat.y = 70;

        this._combat = new component.NumberImage();
        this._combat.url = "res/atlas/number/fight.atlas";
        this._combat.x = 270;
        this._combat.y = 70;
        this._combat.scale(0.7, 0.7);
        this.content.addChild(this._combat);

        this._txtName = this.createTxt(111, 35, 250, 25, 24);
        this._txtType = this.createTxt(111, 66, 125, 23, 18);
        this._txtLevel = this.createTxt(111, 88, 125, 23, 18);

        this._line = new Laya.Image();
        this._line.skin = ResUtils.getCompUIUrl("img_di1");
        this._line.alpha = 0.15;
        this._line.x = 10;
        this._line.y = 120;
        this._line.width = 365;
        this._line.height = 4;
        this.content.addChild(this._line);

        // DataManager.listen(PROTOCOL.E15030, this, this.onS15030);
        // DataManager.listen(PROTOCOL.E15031, this, this.onS15031);
    }


    protected createTxt(x: number, y: number, w: number, h: number, size: number, align: string = "left", valign: string = "middle", color: string = "#ffffff"): Laya.Text {
        var txt: Laya.Text = new Laya.Text();
        txt.width = w;
        txt.height = h;
        txt.x = x;
        txt.y = y;
        txt.valign = valign;
        txt.align = align;
        txt.color = color;
        txt.fontSize = size;
        txt.wordWrap = true;
        this.content.addChild(txt);
        return txt;
    }

    private createHtmlTxt(x: number, y: number, w: number, h: number, size: number, align: string = "left", valign: string = "middle"): Laya.HTMLDivElement {
        var txt: Laya.HTMLDivElement = new Laya.HTMLDivElement();
        txt.mouseEnabled = false;
        HtmlUtils.setHtml(txt.style, 6, size, align, valign);
        txt.color = "#ffffff";
        txt.width = w;
        txt._height = h;
        txt.x = x;
        txt.y = y;
        this.content.addChild(txt);
        return txt;
    }

    public set toolTipData(value: any) {
        this._data = value as ItemData;

        if (this._data == null) {
            return;
        }
        this._icon.itemData = this._data;
        // 更新背景
        this.setBg();
        this.checkIsRoleEquip();
        this.updateBind();
        this.getGoodsInfo();
    }

    public getGoodsInfo(): void {
        if (this._data.serverInfo.GoodsId) {
            if (!ToolTipsManager.instance.goodsInfoDic[this._data.serverInfo.GoodsId]) {
                ToolTipsManager.instance.goodsInfoDic[this._data.serverInfo.GoodsId] = true;
                DataManager.listen(PROTOCOL.E15001, this, this.updateBaseProp);
                CommonControl.instance.send15001(this._data.serverInfo.GoodsId);
            }
            else {
                this.updateProp();
            }
        }
        else {
            this.simulationData();
        }
    }

    protected simulationData(): void {
        this.content.visible = true;//防止没有获得属性的时候会闪一下
        var atrrList: Array<any> = [];
        var vo: FormulaVo = FormulaVo.get(2);
        var ratio = Equip_base_quality_coefVo.getRatioByLvAndQuality(this._data.clientInfo.lv, this._data.serverInfo.Quality);
        // var _fight: number = 0;
        this.updateAttrList(atrrList, this._data.clientInfo.equip_add_base_attr1, ratio);
        this.updateAttrList(atrrList, this._data.clientInfo.equip_add_base_attr2, ratio);
        this.updateAttrList(atrrList, this._data.clientInfo.equip_add_base_attr3, ratio);

        if (atrrList) {
            this._baseTxt = this.createTxt(30, 137, 90, 22, 20, "left", "middle", "#e8d8b8");
            this._baseTxt.text = "基础属性";
            for (let index = 0; index < atrrList.length; index++) {
                const element: Attribute = atrrList[index];
                var txt: Laya.Text = this.createTxt(29, 160 + 25 * index, 200, 22, 20);
                txt.text = element.name + ":" + element.FormatValue;
                // _fight += Math.ceil((parseInt(element.FormatValue) * vo[element.atrrName]));
                this._txtList.push(txt);
            }
        }

        this._txtName.text = this._data.clientInfo.name;
        this._txtName.color = HtmlUtils.getTipsColor(this._data.serverInfo ? (this._data.serverInfo.Quality ? this._data.serverInfo.Quality : this._data.clientInfo.quality) : this._data.clientInfo.quality);

        if (this._data.IsOtherEquip) {
            this._txtType.text = "部位:" + this._data.SubTypeDes;
            this._txtType.color = "#ffffff";

            this._txtLevel.text = "需求:" + (this._data.equipTypeName) + this._data.clientInfo.lv + "级";
            this._txtLevel.color = "#65c800";
        } else {

            this._txtType.text = "等级:" + this._data.clientInfo.lv + "级";
            this._txtType.color = "#65c800";
            if (SRoleData.instance.info.Lv >= this._data.clientInfo.lv) {
                this._txtType.color = "#65c800";
            }
            else {
                this._txtType.color = "#ff0000";
            }
            this._txtLevel.text = "职业:" + this._data.factionDesc;

        }
        var _fight: number = ItemHelper.getEquipPower(this._data, this._data.serverInfo.Quality);
        this._combat.text = _fight.toString();

        if (this._txtList.length > 0) {
            this.h = this._txtList[this._txtList.length - 1].y + this._txtList[this._txtList.length - 1].height + 15;
        }
        this.updateSize();
    }

    protected updateAttrList(arr: Array<any>, atrr: Array<any>, ratio: number): void {
        var obj: Attribute;
        var vo: PropertyVo;
        for (let index = 0; index < atrr.length; index++) {
            var element = atrr[index];
            vo = PropertyVo.getByInfo(element[0]);
            obj = new Attribute(vo.no, element[1]);
            obj.value = Math.ceil(obj.value * ratio);
            this.updateAtrrListValue(arr, obj);
        }
    }

    private updateAtrrListValue(arr: Array<any>, obj: Attribute): void {
        if (arr.length <= 0) {
            arr.push(obj);
            return;
        }
        else {
            for (let index = 0; index < arr.length; index++) {
                var element = arr[index];
                if (element.name == obj.name) {
                    element.value += obj.value;
                    return;
                }
            }
        }
        arr.push(obj);
    }

    protected checkIsRoleEquip(): void {
        if (this._data.IsRoleEquip) {
            this._strInfo = SForgingData.instance.getStrengthInfoByPos(this._data.slot);
            this._kaInfo = SForgingData.instance.getKailingInfoByPos(this._data.slot);
            this._reInfo = SForgingData.instance.getRefineInfoByPos(this._data.slot);
            this._gemInfo = SForgingData.instance.getGemInfoByPos(this._data.slot);
            if (SBagData.instance.role.getItemDataByGoodId(this._data.GoodsId)) {
                this._isRoleEquip = true;
            }
        } else if (this._data.IsOtherEquip) {
            if (SBagData.instance.petEquip.getItemDataByGoodId(this._data.GoodsId) || SBagData.instance.comateEquip.getItemDataByGoodId(this._data.GoodsId)
                || SBagData.instance.mountEquip.getItemDataByGoodId(this._data.GoodsId)) {
                this._isOtherEquip = true;
            }
        }
    }

    protected updateTop(): void {
        this._txtName.text = this._data.clientInfo.name;
        this._txtName.color = HtmlUtils.getTipsColor(this._data.serverInfo ? (this._data.serverInfo.Quality ? this._data.serverInfo.Quality : this._data.clientInfo.quality) : this._data.clientInfo.quality);

        if (this._data.IsOtherEquip) {
            this._txtType.text = "部位:" + this._data.SubTypeDes;
            this._txtType.color = "#ffffff";

            this._txtLevel.text = "需求:" + (this._data.equipTypeName) + this._data.clientInfo.lv + "级";
            this._txtLevel.color = "#65c800";
        } else {
            this._txtType.text = "等级:" + this._data.clientInfo.lv + "级";
            this._txtType.color = "#65c800";
            if (SRoleData.instance.info.Lv >= this._data.clientInfo.lv) {
                this._txtType.color = "#65c800";
            }
            else {
                this._txtType.color = "#ff0000";
            }
            if (this._data.isJobEquip) {
                this._txtLevel.color = "#ffffff";
            }
            else {
                this._txtLevel.color = "#ff0000";
            }
            this._txtLevel.text = "职业:" + this._data.factionDesc;
        }

        if (this._data.serverInfo.BattlePower) {
            this._combat.text = this._data.serverInfo.BattlePower.toString();
        } else {
            var _fight: number = ItemHelper.getEquipPower(this._data, this._data.serverInfo.Quality);
            this._combat.text = _fight.toString();
        }

    }

    protected updateBind(): void {
        // if(this._data.serverInfo.BindState == 1 && this._data.serverInfo.Quality >= 1 && this._data.serverInfo.Quality <= 5)
        // {
        //     var box:Laya.Box = new Laya.Box;
        //     box.x = 25;
        //     box.y = 30;
        //     this.content.addChild(box);

        //     var img:Laya.Image = new Laya.Image();
        //     img.skin = ResUtils.getItemBase("img_corner_" + this._data.serverInfo.Quality);
        //     box.addChild(img);
        //     img.x = img.y = 3;

        //     var txt:Laya.Text = new Laya.Text();
        //     box.addChild(txt);
        //     txt.rotation = -45;
        //     txt.x = 0;
        //     txt.y = 26;
        //     txt.text = "绑定";
        //     txt.fontSize = 16;
        //     txt.color = "#ffffff";
        //     txt.width = 40;
        //     txt.height = 16;
        //     txt.valign = "middle";
        //     txt.align = "center";
        // }
    }

    protected updateBaseProp(data: S15001): void {
        if (data.GoodsId == this._data.serverInfo.GoodsId) {
            //邮件类型的装备，仅展示，不可穿戴
            this._isShowtype = data.Location == BagType.LOC_MAIL ? true : false;
            if (!this._data.AllAttr) {
                this._data.UpdateAttr(data.item_1);
            }
            this.content.visible = true;
            this.updateTop();
            this.updateProp();
        }
    }

    protected updateProp(): void {
        //基础属性
        if (this._data.AllAttr) {
            var arr: Array<Attribute> = this._data.getTypeAtrrList(GoodsAttrType.BASIC);
            if (arr) {
                this._baseTxt = this.createTxt(30, 137, 90, 22, 20, "left", "middle", "#e8d8b8");
                this._baseTxt.text = "基础属性";
                for (let index = 0; index < arr.length; index++) {
                    const element: Attribute = arr[index];
                    var txt: Laya.Text = this.createTxt(29, 160 + 25 * index, 200, 22, 20);
                    txt.text = element.name + ":" + element.FormatValue;
                    this._txtList.push(txt);
                }
            }
        }
        if (this._txtList.length > 0) {
            this.h = this._txtList[this._txtList.length - 1].y + this._txtList[this._txtList.length - 1].height + 15;
        }
        this.updateStrProp();
        this.updateReProp();
        this.updateKaProp();
        this.updateGemProp();
        this.updateTaozhuang();
        this.addBtn();
        this.updateSize();
    }

    private updateStrProp(): void {
        if (this._isRoleEquip && this._data.equipPos >= EquipSubType.EQ_POS1 && this._data.equipPos <= EquipSubType.EQ_POS6) {
            this._strTxt = this.createTxt(30, this.h, 90, 22, 20, "left", "middle", "#e8d8b8");
            this._strTxt.text = "强化属性";
            this.h = this._strTxt.y + this._strTxt.height + 5;
            //强化属性
            var arr: Array<Attribute> = this._data.getTypeAtrrList(GoodsAttrType.STR);
            if (arr) {
                for (let index = 0; index < arr.length; index++) {
                    var element: Attribute = arr[index];
                    var curNum: number = parseInt(element.FormatValue);
                    var txt: Laya.Text = this.createTxt(29, this.h + 25 * index, 200, 22, 20, "left", "middle", "#0e74ff");
                    txt.text = element.name + ":" + curNum;
                    this._txtList.push(txt);
                }
            }
            else {
                var txt: Laya.Text = this.createTxt(29, this.h, 200, 22, 20, "left", "middle", "#a8a8a8");
                txt.text = "无";
                this._txtList.push(txt);
            }

            this.h = this._txtList[this._txtList.length - 1].y + this._txtList[this._txtList.length - 1].height + 5;
        }
    }

    /**
     * 精炼属性
     * @private
     * @memberof ToolTipsEquipment
     */
    private updateReProp(): void {
        if (this._isRoleEquip && this._data.equipPos >= EquipSubType.EQ_POS1 && this._data.equipPos <= EquipSubType.EQ_POS6) {
            this._reTxt = this.createTxt(30, this.h, 90, 22, 20, "left", "middle", "#e8d8b8");
            this._reTxt.text = "精炼属性";
            this.h = this._reTxt.y + this._reTxt.height + 5;
            //精炼属性
            var arr: Array<Attribute> = this._data.getTypeAtrrList(GoodsAttrType.RE);
            if (arr) {
                for (let index = 0; index < arr.length; index++) {
                    var element: Attribute = arr[index];
                    var curNum: number = parseInt(element.FormatValue);
                    var txt: Laya.Text = this.createTxt(29, this.h + 25 * index, 200, 22, 20, "left", "middle", "#ed0000");
                    txt.text = element.name + ":" + curNum;
                    this._txtList.push(txt);
                }
            }
            else {
                var txt: Laya.Text = this.createTxt(29, this.h, 200, 22, 20, "left", "middle", "#a8a8a8");
                txt.text = "无";
                this._txtList.push(txt);
            }
            this.h = this._txtList[this._txtList.length - 1].y + this._txtList[this._txtList.length - 1].height + 5;
        }
    }

    /**
     * 启灵属性
     * @private
     * @memberof ToolTipsEquipment
     */
    private updateKaProp(): void {
        if (this._isRoleEquip && this._data.equipPos >= EquipSubType.EQ_POS1 && this._data.equipPos <= EquipSubType.EQ_POS6) {
            this._kaTxt = this.createTxt(30, this.h, 90, 22, 20, "left", "middle", "#e8d8b8");
            this._kaTxt.text = "启灵属性";
            this.h = this._kaTxt.y + this._kaTxt.height + 5;
            //启灵属性
            var arr: Array<Attribute> = this._data.getTypeAtrrList(GoodsAttrType.KA);
            if (arr) {
                for (let index = 0; index < arr.length; index++) {
                    var element: Attribute = arr[index];
                    var curNum: number = parseInt(element.FormatValue);
                    var txt: Laya.Text = this.createTxt(29, this.h + 25 * index, 200, 22, 20, "left", "middle", "#ff00f0");
                    txt.text = element.name + ":" + curNum;
                    this._txtList.push(txt);
                }
            }
            else {
                var txt: Laya.Text = this.createTxt(29, this.h, 200, 22, 20, "left", "middle", "#a8a8a8");
                txt.text = "无";
                this._txtList.push(txt);
            }
            this.h = this._txtList[this._txtList.length - 1].y + this._txtList[this._txtList.length - 1].height + 5;
        }
    }

    /**
     * 宝石属性
     * @private
     * @memberof ToolTipsEquipment
     */
    private updateGemProp(): void {
        if (this._isRoleEquip && this._data.equipPos >= EquipSubType.EQ_POS1 && this._data.equipPos <= EquipSubType.EQ_POS6) {
            this._gemTxt = this.createTxt(30, this.h, 90, 22, 20, "left", "middle", "#e8d8b8");
            this._gemTxt.text = "[宝石]";
            this.h = this._gemTxt.y + this._gemTxt.height + 5;
            var baseArr: Array<Attribute>;
            if (this._gemInfo) {
                baseArr = this._gemInfo.getTypeAtrrList();
            }
            else {
                baseArr = null;
            }
            var base: Attribute;
            var icon: Laya.Image;
            //宝石属性
            if (baseArr) {
                for (let index = 0; index < 4; index++) {
                    base = baseArr[index];
                    icon = new Laya.Image();
                    icon.skin = ResUtils.getGemImage(base.atrrName);
                    icon.scale(0.8, 0.8);
                    this.content.addChild(icon);
                    icon.x = 35;
                    icon.y = this.h + 35 * index;
                    var txt: Laya.Text = this.createTxt(75, this.h + 35 * index, 350, 22, 20, "left", "middle", "#088d3d");
                    if (base && base.value > 0) {
                        txt.color = "#088d3d";
                        txt.text = this._gemInfo.nameList[index] + "  " + base.name + ":" + base.FormatValue;
                        // icon.gray = false;
                    }
                    else {
                        // icon.gray = true;
                        txt.color = "#a8a8a8";
                        txt.text = this._gemInfo.nameList[index] + "  " + "未镶嵌";
                    }
                    this._txtList.push(icon);
                    this._txtList.push(txt);
                }
            }
            else {
                for (let index = 0; index < 4; index++) {
                    icon = new Laya.Image();
                    icon.skin = ResUtils.getCompUIUrl("img_yinbi");
                    icon.scale(0.8, 0.8);
                    this.content.addChild(icon);
                    icon.x = 35;
                    icon.y = this.h + 35 * index;
                    var txt: Laya.Text = this.createTxt(75, this.h + 35 * index, 350, 22, 20, "left", "middle", "#088d3d");
                    // icon.gray = true;
                    txt.color = "#a8a8a8";
                    txt.text = GemLevelVo.getByLv(this._data.equipPos, 1).name + "  " + "未镶嵌";
                    this._txtList.push(icon);
                    this._txtList.push(txt);
                }
            }
            this.h = this._txtList[this._txtList.length - 1].y + this._txtList[this._txtList.length - 1].height + 5;
        }
    }


    /**
     * 套装属性
     * @private
     * @memberof ToolTipsEquipment
     */
    private updateTaozhuang(): void {
        if (this._data.IsRoleEquip && this._data.equipPos >= EquipSubType.EQ_JEWELRT_RING && this._data.equipPos <= EquipSubType.EQ_JEWELRT_PENDANT
            && this._data.clientInfo.suit_id > 0) {
            // this._suitTxt = this.createTxt(30, this.h, 90, 22, 20, "left", "middle", "#e8d8b8");
            // this._suitTxt.text = "套装属性";
            // this.h = this._suitTxt.y + this._suitTxt.height + 5;

            var equipList = SBagData.instance.role.allItems
            var hadNoList = [];
            var suitList: GoodsVo[] = GoodsVo.getSuitList(this._data.clientInfo.suit_id);
            for (let i = 0; i < equipList.length; i++) {
                const element: ItemData = equipList[i];
                if (element.equipPos >= EquipSubType.EQ_JEWELRT_RING && element.equipPos <= EquipSubType.EQ_JEWELRT_PENDANT
                    && element.serverInfo.Quality >= this._data.serverInfo.Quality) {
                    hadNoList.push(element.clientInfo.no);
                }
            }
            var suitCfg = Accessory_suitVo.get(this._data.clientInfo.suit_id);
            //标题
            var _suitTitleTxt = this.createTxt(30, this.h, 250, 22, 20, "left", "middle", "#e8d8b8");
            this.h = _suitTitleTxt.y + _suitTitleTxt.height + 5;
            this._txtList.push(_suitTitleTxt);
            //内容
            var hadNum = 0;
            for (let i = 0; i < suitList.length; i++) {
                const element = suitList[i];
                //内容
                var _suitcontTxt = this.createTxt(30, this.h, 250, 22, 20, "left", "middle");
                this.h = _suitcontTxt.y + _suitcontTxt.height + 5;
                this._txtList.push(_suitcontTxt);
                _suitcontTxt.text = element.name;
                if (hadNoList.indexOf(element.no) >= 0) {
                    _suitcontTxt.color = "#e8d8b8";
                    hadNum++;
                } else {
                    _suitcontTxt.color = "#64625f";
                }
            }
            //套装效果
            for (let i = 0; i < suitCfg.skills.length; i++) {
                const element = suitCfg.skills[i];

                var _suitHtmlTxt = this.createHtmlTxt(30, this.h, 337, 134, 20, "left", "top");
                var skillCfg = SkillVo.get(element[1][this._data.serverInfo.Quality - 1]);
                var nextSkill = new Skill(skillCfg.no);
                _suitHtmlTxt.innerHTML = `(&nbsp;${element[0]}&nbsp;)套装:` + SkillUtil.NewDesc(nextSkill, "#ffffff", 20, "#ffffff");
                if (hadNum >= element[0]) {
                    _suitHtmlTxt.color = "#00b007";
                } else {
                    _suitHtmlTxt.color = "#64625f";
                }
                this.h = _suitHtmlTxt.y + _suitHtmlTxt.contextHeight + 5;
                this._txtList.push(_suitHtmlTxt);
            }
            _suitTitleTxt.text = `[${suitCfg.name}](${hadNum}/${suitList.length})`;
        }
    }


    private _btn2: component.ScaleButton;
    public addBtn(): void {
        this._btn = new component.ScaleButton();
        this._btn.skin = ResUtils.getCompUIUrl("btn_common");
        this._btn.stateNum = 3;
        this._btn.labelSize = 25;
        this._btn.labelColors = "#8e5213,#04681c,#8d8071";
        this._btn.sizeGrid = "14,38,24,36";
        this._btn.labelPadding = "-3,0,0,0";
        this.content.addChild(this._btn);
        this._btn.on(Laya.Event.CLICK, this, this.onClick);
        this._btn.width = 172;
        this._btn.height = 57
        this._btn.pivotX = 86;
        this._btn.pivotY = 28.5;
        this._btn.x = 193;
        this._btn.y = this.h + 40;

        this._btn2 = new component.ScaleButton();
        this._btn2.skin = ResUtils.getCompUIUrl("btn_common");
        this._btn2.stateNum = 3;
        this._btn2.labelSize = 25;
        this._btn2.labelColors = "#8e5213,#04681c,#8d8071";
        this._btn2.sizeGrid = "14,38,24,36";
        this._btn2.labelPadding = "-3,0,0,0";
        this.content.addChild(this._btn2);
        this._btn2.on(Laya.Event.CLICK, this, this.onBtn2Click);
        this._btn2.width = 172;
        this._btn2.height = 57
        this._btn2.pivotX = 86;
        this._btn2.pivotY = 28.5;
        this._btn2.x = 193;
        this._btn2.y = this.h + 40;
        this._btn2.visible = false;

        this.h = this._btn.y + this._btn.height - 25;
        this.updateBtnLable();
    }

    public updateBtnLable(): void {
        if (this._data.IsOtherEquip) {
            if (this._isShowtype) {
                this._btn.label = "确定";
            } else if (this._isOtherEquip) {
                this._btn.label = "卸下";
            } else {
                this._btn.label = "佩戴";
            }
        } else {
            if (this._isShowtype) {
                this._btn.label = "确定";
            } else if (this._isRoleEquip) {
                this._btn.x = 290;
                this._btn.width = 150;
                this._btn2.x = 120;
                this._btn2.width = 150;
                this._btn2.visible = true;
                this._btn.label = "更换";
                this._btn2.label = "展示";
            } else {
                this._btn.label = "佩戴";
            }
        }
    }

    // private onShare(): void {

    // }

    protected onClick(): void {
        if (this._data.IsOtherEquip) {
            if (this._isShowtype) {
                //展示类型什么也不干
            } else if (this._isOtherEquip) {
                if (this._data.IsPetEquip) {
                    var partnerId: number = SBagData.instance.petEquip.getPartnerIdByGoodId(this._data.GoodsId);
                    CommonControl.instance.onEquipUnInstall(this._data.serverInfo.Slot, partnerId);
                } else if (this._data.IsComateEquip) {
                    var partnerId: number = SBagData.instance.comateEquip.getPartnerIdByGoodId(this._data.GoodsId);
                    CommonControl.instance.onEquipUnInstall(this._data.serverInfo.Slot, partnerId, 2/**2为伙伴 */);
                } else if (this._data.IsMountEquip) {
                    CommonControl.instance.onEquipUnInstall(this._data.serverInfo.Slot, 0, 3/**3为坐骑 */);
                }
            } else {
                if (this._data.IsPetEquip) {
                    UIManager.instance.openUI(UIID.PET);
                } else if (this._data.IsComateEquip) {
                    UIManager.instance.openUI(UIID.SYS_COMATE);
                } else if (this._data.IsMountEquip) {
                    UIManager.instance.openUI(UIID.SYS_MOUNT);
                    UIManager.instance.openUI(UIID.MOUNT_LINGJING_PANEL);
                }
            }
        } else {
            if (this._isShowtype) {
                //展示类型什么也不干
            } else if (SBagData.instance.role.getItemDataByGoodId(this._data.GoodsId)) {
                if (SBagData.instance.equip.haveSameTypeEquip(this._data.clientInfo.subtype)) {
                    UIManager.instance.openUI(UIID.CHANGE_EQUIP_PANEL, [this._data]);
                } else if (SBagData.instance.fabao.haveSameTypeEquip(this._data.clientInfo.subtype)) {
                    UIManager.instance.openUI(UIID.CHANGE_FABAO_PANEL, [this._data]);
                } else {
                    MsgManager.instance.showRollTipsMsg("没有合适的装备可更换");
                }
                // CommonControl.instance.onEquipUnInstall(this._data.equipPos);
            }
            else {
                CommonControl.instance.onEquipInstall(this._data.GoodsId);
            }
        }
        ToolTipsManager.instance.hide();
    }

    private noti: Notice = new Notice();
    private onShare() {
        if (!SChatData.instance.canChat) {
            MsgManager.instance.showRollTipsMsg("世界发言CD中，请稍后再进行该操作");
            return;
        }
        MsgManager.instance.showRollTipsMsg("发送成功");
        var msg: string = "#00fff0" + SRoleData.instance.roleInfo.Name + "#ffffff展示了装备"
            + "<MsgObj>event," + "showequip:" + this._data.serverInfo.GoodsId + "," + this._data.clientInfo.name + ","
            + HtmlUtils.getColor(this._data.serverInfo.Quality) + "</MsgObj>";
        var type: number = ChatChannel.WORLD;
        this.noti.send(NotityData.create(NotityEvents.CHAT_SENDMSG, [msg, type]));
    }

    public onBtn2Click(): void {
        this.onShare();
        ToolTipsManager.instance.hide();
    }


    protected updateSize(): void {
        this.h += 25;
        super.updateSize();
    }

    public dispose(): void {
        this._btn && this._btn.offAll();
        this._txtName && this._txtName.removeSelf();
        this._txtName = null;
        this._line.removeSelf();
        this._line = null;
        this._baseTxt && this._baseTxt.removeSelf();
        this._baseTxt = null;
        this._strTxt && this._strTxt.removeSelf();
        this._strTxt = null;
        this._kaTxt && this._kaTxt.removeSelf();
        this._kaTxt = null;
        this._reTxt && this._reTxt.removeSelf();
        this._reTxt = null;
        this._gemTxt && this._gemTxt.removeSelf();
        this._gemTxt = null;
        this._btn && this._btn.removeSelf();
        this._btn = null;
        this._icon.dispose();
        this._icon = null;
        this._txtLevel.removeSelf();
        this._txtLevel = null;
        this._txtType.removeSelf();
        this._txtType = null;
        // this._share.offAll();
        // this._share.removeSelf();
        // this._share = null;
        this._imgCombat && this._imgCombat.removeSelf();
        this._imgCombat = null;
        this._combat.dispose();
        this._combat = null;
        this._strInfo = null;
        this._kaInfo = null;
        this._reInfo = null;
        this._gemInfo = null;
        this._isRoleEquip = false;
        this._isOtherEquip = false;
        this._data = null;
        DisplayUtils.clearArrayItems(this._txtList);
        DataManager.cancel(PROTOCOL.E15001, this, this.updateBaseProp);
        this.removeSelf();
    }
}