import { HtmlUtils } from "../../utils/HtmlUtils";
import { GameLayer } from "../../../GameLayer";
import { SGameData } from "../../../net/data/SGameData";

export class Alert extends ui.main.AlertPanelUI{
    private _caller: any;
    private _okFunc: Function;
    private _okFuncParams: Array<any>;
    private _cancelFunc: Function;
    private _cancelFuncParams: Array<any>;
    private _mask: Laya.Sprite;
    constructor() {
        super();
        this.addMask();
    }

    private addMask() {
        this._mask = new Laya.Sprite;
        this._mask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this._mask.name = "mask";
        this._mask.alpha = 0.5;
        this._mask.width = Laya.stage.width;
        this._mask.height = Laya.stage.height;
        this.addChildAt(this._mask, 0);

        HtmlUtils.setHtml(this.txt_content.style,6,20,"center","middle");
        this.txt_content.color = "#8a5428";
    }

    private show() {
        this.btn_ok.on(Laya.Event.CLICK, this, this.onOk);
        this.btn_cancel.on(Laya.Event.CLICK, this, this.onCancel);
       UIManager.instance.on(UIManagerEvent.OPEN_UI , this, this.CheckLayer);
    }

    private hide() {
        this.btn_ok.off(Laya.Event.CLICK, this, this.onOk);
        this.btn_cancel.off(Laya.Event.CLICK, this, this.onCancel);
        UIManager.instance.off(UIManagerEvent.OPEN_UI , this, this.CheckLayer);
        this.removeSelf();
    }

    private CheckLayer():void {
        if(this.parent != null)
        {
            GameLayer.instacne.uiLayer.setChildIndex(this,GameLayer.instacne.uiLayer.numChildren - 1);
        }

    }

    private onOk(e: Laya.Event): void {
        Alert.hide();

        if (this._okFunc != null) {
            this._okFunc.apply(this._caller, this._okFuncParams);
        }
    }

    private onCancel(e: Laya.Event): void {
        Alert.hide();

        if (this._cancelFunc != null) {
            this._cancelFunc.apply(this._caller, this._cancelFuncParams);
        }
    }

    public pop(content: string, caller: any, okFunc: Function = null, okFuncParams: Array<any> = null, cancelFunc: Function = null, cancelFuncParams: Array<any> = null, showCancelBtn: boolean = true, title: string = "", okBtnLabel: string = "确定", cancelBtnLabel: string = "取消", flag: number = -1): void {
        this.txt_content.innerHTML = content;
        this._caller = caller;
        this._okFunc = okFunc;
        this._okFuncParams = okFuncParams;
        this._cancelFunc = cancelFunc;
        this._cancelFuncParams = cancelFuncParams;
        this.txt_title.text = title;
        this.btn_ok.label = okBtnLabel;
        this.btn_cancel.label = cancelBtnLabel;
        this.btn_cancel.visible = showCancelBtn;
        if (showCancelBtn) {
            this.btn_ok.x = 388;
            this.btn_cancel.x = 190;
        }
        else {
            this.btn_ok.centerX = 1;
        }

        this.show();
    }

    private static _alert: Alert;
    /**
     * 显示提示框
     * @param content               提示内容
     * @param caller                作用域
     * @param okFunc                单击确定按钮触发的函数
     * @param okFuncParams          确定按钮函数的参数
     * @param cancelFunc            单击取消按钮触发的函数
     * @param cancelFuncParams      取消按钮函数的参数
     * @param showCancelBtn         是否显示取消按钮，如果不显示，则确定按钮会居中
     * @param title                 标题
     * @param okBtnLabel            确定按钮的标签
     * @param cancelBtnLabel        取消按钮的标签
     *
     */
    public static show(content: string, caller: any, okFunc: Function = null, okFuncParams: Array<any> = null, cancelFunc: Function = null, cancelFuncParams: Array<any> = null, showCancelBtn: boolean = true, title: string = "提示", okBtnLabel: string = "确定", cancelBtnLabel: string = "取消"): Alert {
        if (this._alert == null) {
            this._alert = new Alert();
        }

        this._alert.pop(content, caller, okFunc, okFuncParams, cancelFunc, cancelFuncParams, showCancelBtn, title, okBtnLabel, cancelBtnLabel);

        if (this._alert.parent == null) {
            GameLayer.instacne.uiLayer.addChild(this._alert);
        }
        else
        {
            GameLayer.instacne.uiLayer.setChildIndex(this._alert,GameLayer.instacne.uiLayer.numChildren - 1);
        }

        return this._alert;
    }

    /**
     * 隐藏提示框
     *
     */
    public static hide(): void {
        if (this._alert != null) {
            this._alert.hide();
        }
    }

}