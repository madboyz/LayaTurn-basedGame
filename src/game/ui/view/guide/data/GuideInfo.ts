import { Guide_cfgVo } from "../../../../../db/sheet/vo/Guide_cfgVo";

export enum GuideState
{
    None = 0,//还没开始
    ClickTASK,//点击任务
    ClickUI,//执行ui点击
    CLOSEUI,//执行ui关闭
    GetReward,//最后领奖
    Complete,//完成
}
export class GuideInfo {
    public No:number = 0;
    public state:GuideState = GuideState.None;
    public sheet:Guide_cfgVo;
}