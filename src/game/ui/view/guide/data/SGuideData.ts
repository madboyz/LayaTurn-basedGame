import { GuideControl } from "../control/GuideControl";

export class SGuideData extends Laya.EventDispatcher {
    private static _instance: SGuideData;
    public guideControl:GuideControl
    public static get instance(): SGuideData {
        return SGuideData._instance || (SGuideData._instance = new SGuideData());
    }

    constructor() {
        super();
    }

    public InitGuide()
    {
        if(!this.guideControl)
        this.guideControl = new GuideControl();
        else
        this.guideControl.onUpdateTask();//战斗结束再调用一次
    }
    /**
     * 检查当前是否还有没有完成的引导
     */
    public CheckHasGuide()
    {

    }
} 

export enum SGuideEvent {
    GUIDE_SHOW = "guide_show",//新手引导事件
    GUIDE_CLICK = "guide_click",//新手点击
}