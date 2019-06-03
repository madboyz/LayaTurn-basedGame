import { ItemData } from "./data/ItemData";
import { ToolTipsManager } from "../manager/ToolTipsManager";
import { ToolTipsEquipment } from "./ToolTipsEquipment";
import { ToolTipsBaseItem } from "./ToolTipsBaseItem";
import { UIeffectLayer } from "../../battle/scene/layer/UIeffectLayer";
import { ToolTipsMountItem } from "./ToolTipsMountItem";

export class BaseItem extends Laya.View implements IToolTip {
    // 图标相关 //////////////////////////////////////////////////////////////////////////////
    public _bg: Laya.Image;
    public _bitmap: Laya.Image = null;
    public _job: Laya.Image;
    protected _bgName: String;
    public _selectBg: Laya.Image;
    public _selectBgStyle: number;
    public _hideBg: boolean = false;//强制隐藏背景
    // 层次相关
    public _bottomLayer: Laya.Sprite;
    public _middleLayer: Laya.Sprite;
    public _topLayer: Laya.Sprite;
    //数量
    protected _amountBg: Laya.Image;
    protected _amount: number = 0;
    public _amountLabel: Laya.Text;
    public _txt: Laya.Text;
    //物品数据
    public _itemData: ItemData;
    public _showName: Boolean = false;
    public _showJob: boolean = true;
    // 数据相关 ////////////////////////////////////////////////////////////////////////////////
    protected _paddingTop: any = 6;
    protected _paddingLeft: any = 6;
    //tips数据
    protected _isShowToolTip: Boolean = false;//是否显示tips
    protected _tooltipData: any;
    //特效相关
    protected _uiEffLayer: UIeffectLayer;
    public _forceShowEff: number = 0;// -1 强制不显示特效，0根据装备自行判断，1强制显示特效
    //宠物装备
    public _petEquipBg: Laya.Image;

    constructor() {
        super();
        this.initComp();
    }

    public initComp(): void {
        this._bottomLayer = new Laya.Sprite();
        this._middleLayer = new Laya.Sprite();
        this._topLayer = new Laya.Sprite();
        this.addChild(this._bottomLayer);
        this.addChild(this._middleLayer);
        this.addChild(this._topLayer);

        this._bottomLayer.mouseEnabled = true;

        this.width = 40;
        this.height = 40;

        this._bitmap = new Laya.Image();
        this._bottomLayer.addChild(this._bitmap);
        this._bitmap.mouseEnabled = true;
        this.isShowToolTip = true;
    }

    /**
     * 设置物品样式
     * @param itemStyleConst    新UI物品框大小是70*70
     * @param bgName  背景框的品质
     * @param paddingTop 顶部间距
     * @param paddingLeft  左边间距
     *
     */
    public setItemStyle(itemStyleConst: any = 70, bgName: String = ResUtils.getItemBg("default"), paddingTop: any = 5, paddingLeft: any = 5): void {
        this._paddingTop = paddingTop;
        this._paddingLeft = paddingLeft;

        this.width = itemStyleConst;
        this.height = itemStyleConst;

        this.bgName = bgName;

        if (this._bg) {
            this._bottomLayer.size(this.width, this.height)
            this._bg.width = this.width;
            this._bg.height = this.height;
        }

        this.resetBitmapSize();
    }

    protected resetBitmapSize(): void {
        if (this._bitmap) {
            this._bitmap.width = this.width - this._paddingLeft * 2;
            this._bitmap.height = this.height - this._paddingTop * 2;

            this._bitmap.x = this._paddingLeft;
            this._bitmap.y = this._paddingTop;
        }
    }

    public set isShowName(bl: Boolean) {
        this._showName = bl;
    }

    public set isShowJob(bl: boolean) {
        this._showJob = bl;
    }

    public get isShowJob(): boolean {
        return this._showJob;
    }

    public set bgName(value: any) {
        if (this._bgName == value) {
            return;
        }
        this._bgName = value;

        if (value && !this._hideBg) {
            if (this._bg) {
                this._bg.sizeGrid = "20,20,20,20";
                if (value instanceof Laya.Image) {
                    this._bg = value;
                }
                else {
                    this._bg.skin = value;
                }
            }
            else {
                this._bg = new Laya.Image();
                this._bg.skin = value;
                this._bg.sizeGrid = "20,20,20,20";
                this._bottomLayer.addChildAt(this._bg, 0);
            }

        }
        else {
            if (this._bg) {
                this._bottomLayer.removeChild(this._bg);
                this._bg = null;
            }
        }
        this.updateViewSize();
    }

    /**
     * 显示名字
     * @param str 名字
     * @param size 大小
     * @param color 颜色
     * @param strokeColor 描边颜色
     *
     */
    public showName(str: string, size: number, color: string, strokeColor: string = "#000000"): void {
        if (this._txt == null) {
            this._txt = new Laya.Text();
            this._txt.font = "黑体";
            this._txt.align = "right";
            this._txt.valign = "middle";
            this._middleLayer.addChild(this._txt);
        }
        if (strokeColor != "#000000") {
            this._txt.stroke = 2;
            this._txt.strokeColor = strokeColor;
        }
        this._txt.fontSize = size;
        this._txt.color = color;
        this._txt.height = size;
        this._txt.text = str;
        this.updateViewSize();
    }

    private _lastData: ItemData;
    //播放高品质的装备特效
    public showUIEffect(): void {
        if (this._forceShowEff == -1) {
            return;
        }
        var showQuality = this._itemData.IsEquip ? this._itemData.serverInfo.Quality : this._itemData.clientInfo.quality;
        var needEff: boolean = (this._itemData.IsEquip || (this._forceShowEff == 1)) && showQuality > 3;
        if (!needEff) {
            this._uiEffLayer && this._uiEffLayer.clearEffect();
        }
        if (this._lastData && this._lastData == this._itemData) {
            return;
        }
        this._lastData = this._itemData;
        this._uiEffLayer && this._uiEffLayer.clearEffect();
        if (needEff) {
            if (!this._uiEffLayer) {
                this._uiEffLayer = new UIeffectLayer;
                this.addChild(this._uiEffLayer);
            }
            var effObj = this._uiEffLayer.playEffect("ui_effect_" + (showQuality - 3), 38 - (80 - this.width) / 2, 40 - (80 - this.height) / 2, true);
            effObj.scaleX = effObj.scaleY = this.width / 80;
        }
    }

    /**
     * 显示职业
     */
    public showJob(): void {
        //TODO:职业相关
    }

    /**
     * 显示宠物装备
     */
    public showOtherEquip(): void {
        if (this._itemData.IsOtherEquip) {
            if (this._petEquipBg == null) {
                this._petEquipBg = new Laya.Image();
                this._middleLayer.addChild(this._petEquipBg);
            }
            this._petEquipBg.skin = ResUtils.getItemBase(this._itemData.equipImageUrl);
        } else if (!this._itemData.IsOtherEquip && this._petEquipBg) {
            this._petEquipBg.destroy();
            this._petEquipBg = null;
        }
    }

    /**
     * 更新job位置
     */
    public updateJobPos(): void {
        if (this._job && this._bg) {
            this._job.x = this.width - this._job.width;
            this._job.y = this._bg.y;
        }
    }

    /**
     * 设置资源
     * @param value 资源icon或者image
     *
     */
    public setSource(value: any): void {
        //移除之前加载的
        if (value instanceof Laya.Image) {
            this._bitmap = value;
            this.updateViewSize();
            return;
        }
        else {
            this._bitmap && (this._bitmap.skin = ResUtils.getItemIcon(value));
            this.updateViewSize();
            return;
        }
    }

    /**
     * 设置物品code
     * @param value
     *
     */
    public set itemCode(value: number) {
        this.itemData = new ItemData(value);
    }

    /**
     * 直接设置数据
     * @param value
     *
     */
    public set itemData(value: ItemData) {
        if (value && value.clientInfo.no) {
            this._itemData = value;
            if (value.clientInfo) {
                this.setSource(value.clientInfo.icon);
                if (value.serverInfo && value.serverInfo.Quality && value.IsEquip) {
                    this.bgName = ResUtils.getItemBg(value.serverInfo.Quality);
                }
                else {
                    this.bgName = ResUtils.getItemBg(value.clientInfo.quality);
                }
            }
            //this.amount = -1;
            this.showJob();
            this.showOtherEquip();
            this.updateViewSize();
            this.resetBitmapSize();
            if (value.Count) {
                this.amount = value.Count;
            }
            this.showUIEffect();
        }
        else {
            this._itemData = null;
            this.clearData();
            this._itemData = null;
            this._uiEffLayer && this._uiEffLayer.clearEffect();
        }
    }

    public set isShowToolTip(value: Boolean) {
        if (this._isShowToolTip != value) {
            this._isShowToolTip = value;
            if (!this._isShowToolTip) {
                ToolTipsManager.instance.unregister(this);
            }
            else {
                ToolTipsManager.instance.register(this);
            }
        }
    }

    public set toolTipData(value: any) {
        this._tooltipData = value;
        this.judgeToolTip();
    }

    public get toolTipData(): any {
        return this._tooltipData;
    }

    protected judgeToolTip(): void {

        if (this.toolTipData) {
            if (this._isShowToolTip) {
                ToolTipsManager.instance.register(this);
            }
        }
        else {
            ToolTipsManager.instance.unregister(this);
        }
    }

    protected _renderClass: any;

    public set renderClass(value: any) {
        this._renderClass = value;
    }

    public getItemRenderClass(value: ItemData): any {
        if (this.itemData.IsEquip) {
            return ToolTipsEquipment;
        }
        if (this.itemData.IsMount) {
            return ToolTipsMountItem;
        }
        return ToolTipsBaseItem;
    }

    public get renderClass(): any {
        if (this._renderClass) {
            return this._renderClass;
        }
        else if (this.toolTipData instanceof ItemData) {
            return this.getItemRenderClass(this.toolTipData);
        }
        return null;
    }


    /**
     * 清除数据
     */
    public clearData() {
        this.bgName = ResUtils.getItemBg("default");
        if (this._job) {
            this._job.removeSelf();
            this._job = null;
        }

        if (this._bitmap) {
            this._bitmap.skin = "";
        }

        if (this._amountLabel) {
            this._amountLabel.removeSelf();
            this._amountLabel = null;
        }
        if (this._amountBg) {
            this._amountBg.removeSelf();
            this._amountBg = null;
        }
        if (this._txt) {
            this._txt.removeSelf();
            this._txt = null;
        }
        if (this._redImg) {
            this._redImg.removeSelf();
            this._redImg = null;
        }
        if (this._petEquipBg) {
            this._petEquipBg.destroy();
            this._petEquipBg = null;
        }
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
            this._lastData = null;
        }
        ToolTipsManager.instance.unregister(this);
    }

    public get itemData(): ItemData {
        return this._itemData;
    }

    public get amount(): number {
        return this._amount;
    }

    public set amount(value: number) {
        if (this._amount != value) {
            this._amount = value;
            var str: string;
            if (this._amount <= 1) {
                str = "";
            }
            else {
                if (value > 1) {
                    str = GMath.GetChineseNumber(value);
                }
                //TODO 大的数字
            }
            this.setAmountLabel(str, "#4e17cd", 18);
        }
    }

    public set isSelect(value: Boolean) {
        if (value) {
            if (this._selectBg == null) {
                this._selectBg = new Laya.Image();
                this._selectBg.sizeGrid = "35,35,35,35";
                this._selectBg.skin = ResUtils.getItemBase("img_select");//选中
                this._selectBg.width = this._selectBgStyle > 0 ? this._selectBgStyle : (this.width + 8);
                this._selectBg.height = this._selectBgStyle > 0 ? this._selectBgStyle : (this.height + 10);
                this._middleLayer.addChild(this._selectBg);
                this._selectBg.x = (this.width - this._selectBg.width) / 2;
                this._selectBg.y = (this.height - this._selectBg.height) / 2;
            }
        }
        else {
            if (this._selectBg) {
                this._selectBg.removeSelf();
                this._selectBg = null;
            }
        }
    }

    /**
     * 设置数量标签显示内容
     * @param str 内容
     * @param size 文字大小
     * @param strokeColor 描边颜色
     * @param isHtml 是否html文字
     *
     */
    public setAmountLabel(str: string, color: string, size: any = 18, strokeColor: any = "#000000"): void {
        if (str) {
            if (this._amountLabel == null) {
                this._amountBg = new Laya.Image();
                this._amountBg.skin = ResUtils.getItemBase("img_di2");
                this._middleLayer.addChild(this._amountBg);

                this._amountLabel = new Laya.Text();
                this._amountLabel.align = "center";
                this._amountLabel.valign = "center";
                this._amountLabel.height = size;
                this._middleLayer.addChild(this._amountLabel);
            }
            this._amountLabel.text = str;
            this._amountLabel.fontSize = size;
            if (strokeColor != "#000000") {
                this._amountLabel.stroke = 2;
                this._amountLabel.strokeColor = strokeColor;
            }
            else {
                this._amountLabel.stroke = 0;
            }
            this._amountLabel.color = color;
            this._amountBg.width = this._amountLabel.textWidth + 2;
            this._amountBg.x = this.width - this._amountBg.width - 2;
            this._amountBg.y = this.height - this._amountBg.height - 2;
            this._amountLabel.width = this._amountBg.width;
            this._amountLabel.x = this._amountBg.x;
            this._amountLabel.y = this._amountBg.y;
        }
        else {
            if (this._amountLabel) {
                this._amountLabel.destroy();
                this._amountLabel = null;
            }

            if (this._amountBg) {
                this._amountBg.destroy();
                this._amountBg = null;
            }
        }
    }

    public setAmountLabelPos(x: number, y: number): void {
        if (this._amountLabel) {
            this._amountLabel.x = x;
            this._amountLabel.y = y;
        }

    }

    public get bitmap(): Laya.Image {
        return this._bitmap;
    }

    public updateViewSize(): void {
        if (this._bg) {
            this._bottomLayer.size(this.width, this.height)
            this._bg.width = this.width;
            this._bg.height = this.height;
        }
        if (this._txt) {
            this._txt.y = this._bg.height + 5;
            this._txt.x = (this._bg.width - this._txt.textWidth) >> 1;
        }
        this.resetBitmapSize();
        this.updateJobPos();
    }

    private _redImg: Laya.Image;
    public showRed(show: boolean = false): void {
        if (show) {
            if (!this._redImg) {
                this._redImg = new Laya.Image();
                this._redImg.skin = ResUtils.getItemBase("img_red");
                this._redImg.x = this.width - this._redImg.width + 8;
                this._redImg.y = -8;
                this._middleLayer.addChild(this._redImg);
            }
        } else {
            if (this._redImg) {
                this._redImg.removeSelf();
                this._redImg = null;
            }
        }
    }


    public dispose(): void {
        this._bitmap.offAll();
        this._bottomLayer.offAll();
        this._middleLayer.offAll();
        this._topLayer.offAll();
        if (this._bitmap) {
            this._bitmap.destroy();
            this._bitmap = null;
        }
        if (this._bg) {
            this._bg.destroy();
            this._bg = null;
        }

        if (this._amountLabel) {
            this._amountLabel.destroy();
            this._amountLabel = null;
        }

        if (this._amountBg) {
            this._amountBg.destroy();
            this._amountBg = null;
        }

        if (this._bottomLayer) {
            this._bottomLayer.destroy();
            this._bottomLayer = null;
        }

        if (this._topLayer) {
            this._topLayer.destroy();
            this._topLayer = null;
        }

        if (this._middleLayer) {
            this._middleLayer.destroy();
            this._middleLayer = null;
        }
        if (this._job) {
            this._job.destroy();
            this._job = null;
        }
        if (this._txt) {
            this._txt.destroy();
            this._txt = null;
        }
        if (this._redImg) {
            this._redImg.destroy();
            this._redImg = null;
        }
        if (this._petEquipBg) {
            this._petEquipBg.destroy();
            this._petEquipBg = null;
        }
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
            this._lastData = null;
        }
        if (this._itemData && this._itemData.serverInfo) {
            if (ToolTipsManager.instance.goodsInfoDic[this._itemData.serverInfo.GoodsId]) {
                ToolTipsManager.instance.goodsInfoDic[this._itemData.serverInfo.GoodsId] = false;//销毁后物品详情也销毁
            }
        }

        this.setSource(null);
        this._bgName = null;
        this._itemData = null;
        this._paddingTop = 6;
        this._paddingLeft = 6;
        this._amount = 0;
        this._isShowToolTip = false;
        this._tooltipData = null;
        this._renderClass = null;
        this.offAll();
        ToolTipsManager.instance.unregister(this);
        this.removeSelf();
    }
}