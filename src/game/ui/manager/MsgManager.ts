import { HtmlUtils } from '../../utils/HtmlUtils';
import { MsgRollTipsType } from '../compent/MsgRollTipsType';
import { FlowTipsView } from '../view/flowTips/TipsView';
import { Error_codeVo } from './../../../db/sheet/vo/Error_codeVo';
import { MsgRollTips } from '../compent/MsgRollTips';
export class MsgManager {
    private _msgRollTipsImpl: MsgRollTips;//从屏幕右下方向上方滚动，提示。这种是最常用的飘字方式
    private _itemRollTipsImpl: FlowTipsView;//道具提示
    private static _instance: MsgManager;
    constructor() {

    }

    private get msgRollTipsImpl(): MsgRollTips {
        return this._msgRollTipsImpl || (this._msgRollTipsImpl = new MsgRollTips());
    }

    private get itemRollTipsImpl(): FlowTipsView {
        return this._itemRollTipsImpl || (this._itemRollTipsImpl = new FlowTipsView());
    }

    public static get instance(): MsgManager {
        return MsgManager._instance || (MsgManager._instance = new MsgManager());
    }

    /**
     * 显示竖向滚动飘字 
     * @param info
     */
    public showRollTipsMsg(info: string, tipsType: MsgRollTipsType = MsgRollTipsType.msgRollTips1, color = "#fffc00"): void {
        if (info == null || info == "") {
            return;
        }
        this.msgRollTipsImpl.showMsg(info, color);
    }

    /**
     * 道具提示 
     * @param info
     */
    public showItemRollTipsMsg(info: string, tipsType: MsgRollTipsType = MsgRollTipsType.msgRollTips1, color = "#fffc00"): void {
        if (info == null || info == "") {
            return;
        }
        this.itemRollTipsImpl.showMsg(info, color);
    }

    public showCommonTips(code: number): void {
        var vo: Error_codeVo = Error_codeVo.get(code);
        if (vo && vo.desc) {
            this.showRollTipsMsg(vo.desc);
        }
    }

    public showReplaceTips(str: string, arr: Array<any>): void {
        var rex: RegExp;
        var newStr: string = "";
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            rex = /\[(.+?)\]/;//替换【】内的内容
            str = str.replace(rex, element.Value);
        }
        if (str.indexOf("#") != -1) {
            var list: Array<any> = str.split("#");
            for (let idx = 0; idx < list.length; idx++) {
                var element = list[idx];
                if (element.length > 5) {
                    var color: string = "#" + element.substr(0, 6);
                    var content: string = element.substr(6, element.length + 1);
                    var a: string = HtmlUtils.addColor(content, color, 20);
                    newStr += a;
                }
            }
        }
        this.showRollTipsMsg(newStr ? newStr : str, MsgRollTipsType.msgRollTips2);
    }
}
