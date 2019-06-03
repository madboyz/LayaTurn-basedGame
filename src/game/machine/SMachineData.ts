
/**
 * aoi数据层
 */
export class SMachineData extends Laya.EventDispatcher {
    private static _instance: SMachineData;
    public static get instance(): SMachineData {
        return SMachineData._instance || (SMachineData._instance = new SMachineData());
    }

    constructor(){
        super();
    }
    public unRegisterEvent() {
    }

    public registerEvent() {
    }
}

export enum SMachineEvent {
    Start_Action_Machine = "Start_Action_Machine",//机器人开始运行
    Finish_Action_Machine = "Finish_Action_Machine",//机器人行为完成
    Stop_Action_Machine = "Stop_Action_Machine",//机器人停止运行

    Map_Click = "Map_Click",//地图进行了点击
}