import { ToolTipsMinggeItem } from "../../../compent/ToolTipsMinggeItem";
import { ToolTipsManager } from "../../../manager/ToolTipsManager";
import { MinggeInfo } from "./MinggeInfo";

export class MinggeItem extends ui.main.MinggeItemUI implements IToolTip {
    //需不需要文本
    public hasLvLb: boolean = true;
    //强制显示bg
    public showBg: boolean = false;

    protected mData: MinggeInfo;


    constructor() {
        super();
    }

    public set dataSource(data: MinggeInfo) {
        this.mData = data;
        if (!data) {
            this.Frame.visible = true;
            this.lbBox.visible = false;
            this.icon.skin = "";
            return;
        }
        this.lbBox.visible = this.hasLvLb;
        this.Frame.visible = false || this.showBg;
        this.lvLb.text = "Lv." + data.Lv;
        this.icon.skin = ResUtils.getItemIcon(data.cfg.icon);
    }


    //点击相关tips
    private _isShowToolTip: boolean = false;
    public set isShowToolTip(value: boolean) {
        if (this._isShowToolTip != value) {
            this._isShowToolTip = value;
            if (!this._isShowToolTip) {
                ToolTipsManager.instance.unregister(this);
            } else {
                ToolTipsManager.instance.register(this);
            }
        }
    }
    public get toolTipData(): any {
        return this.mData;
    }

    protected _renderClass: any;
    public set renderClass(value: any) {
        this._renderClass = value;
    }
    public get renderClass(): any {
        if (this._renderClass) {
            return this._renderClass;
        } else if (this.mData) {
            return ToolTipsMinggeItem;
        }
        return null;
    }

    public dispose(): void {
    }
    //红点
    private _redImg: Laya.Image;
    public showRed(show: boolean = false): void {
        if (show) {
            if (!this._redImg) {
                this._redImg = new Laya.Image();
                this._redImg.skin = ResUtils.getItemBase("img_red");
                this._redImg.x = this.width - this._redImg.width - 4;
                this._redImg.y = 4;
                this.addChild(this._redImg);
            }
        } else {
            if (this._redImg) {
                this._redImg.removeSelf();
                this._redImg = null;
            }
        }
    }


}