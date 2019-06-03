import { S11204 } from './../../../net/pt/pt_11';
import { SChatData, SChatEvent } from './../../../net/data/SChatData';
import { MarqueeRollTips } from './../compent/MarqueeRollTips';
/**
 * 跑马灯管理器
 * @export
 * @class MarqueeManager
 */
export class MarqueeManager {
    private _marQueenTipsImpl: MarqueeRollTips;
    private static _instance: MarqueeManager;
    constructor() {
        this.registerEvent();
    }
    public static get instance(): MarqueeManager {
        return MarqueeManager._instance || (MarqueeManager._instance = new MarqueeManager());
    }

    private get marQueenTipsImpl(): MarqueeRollTips {
        return this._marQueenTipsImpl || (this._marQueenTipsImpl = new MarqueeRollTips());
    }
    public registerEvent() {
        SChatData.instance.on(SChatEvent.CHAT_GET_ADDBROADCAST,this,this.onAddBroadCast);//新增一条运营广播
    }

    private onAddBroadCast(data:S11204):void {
        this.marQueenTipsImpl.addMsg(data);
    }
    public registerMarquees():void
    {
        if(GameConfig.SHOWMARQUEE)
        {
            var arr:Array<any> = SChatData.instance.marqueeList;
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                this.marQueenTipsImpl.addMsg(element);
            }
        }
    }
}