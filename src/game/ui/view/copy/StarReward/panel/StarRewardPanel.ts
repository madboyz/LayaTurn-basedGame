import { RewardList } from "../../../../compent/RewardList";
import { Chapter_dunVo } from "../../../../../../db/sheet/vo/Chapter_dunVo";

export class StarRewardPanel extends ui.main.PetCopyStarRewardPanelUI {
    private arr:Array<any>;
    private _rewarldList:RewardList;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.updateData();
    }

    private initList():void
    {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList",RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 4;
        this._rewarldList.vGap = 25;
        this._rewarldList.hGap = 20;
        this._rewarldList.itemStyle = 80;
        this._rewarldList.x = 100;
        this._rewarldList.y = 237;
        this.addChild(this._rewarldList);
    }

    public update():void
    {
        this.updateData();
    }

    public updateData():void
    {
        this._rewarldList.updateRewardsByNum(this.arr[1]);
        this.txt_tips.text = "本章节累计获得" + this.arr[0] + "星可领取以上奖励";
    }

    public open(...args): void {
        this.initWindow(true,true,"星级奖励",484,522,165);
        this.arr = args[0];
        super.open();
    }

    public initEvent():void 
    {
        this.btn_sure.on(Laya.Event.CLICK,this,this.close);
    }
    public removeEvent():void
    {
        this.btn_sure.off(Laya.Event.CLICK,this,this.close);
    }

    public close(): void {
        super.close();
    }
}