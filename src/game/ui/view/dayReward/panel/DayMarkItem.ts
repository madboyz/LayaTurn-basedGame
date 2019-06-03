import { RewardList } from "../../../compent/RewardList";
import { BehaviorVo } from "../../../../../db/sheet/vo/BehaviorVo";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { SActiveRewardData } from "../data/SActiveRewardData";

export class DayMarkItem extends ui.main.DayMarkRewardItemUI {
    private _rewarldList:RewardList;
    private mData:any;//vo
    constructor() {
        super();
        this.initList();
    }

    private initList():void
    {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList",RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 5;
        this._rewarldList.maxNum = 5;
        this._rewarldList.itemStyle = 64;
        this._rewarldList.x = 18;
        this._rewarldList.y = 25;
        this.addChild(this._rewarldList);
    }

    public set dataSource(data:any)
    {
        if(!data) return;
        this.mData = data;
        this.updateData();
    }

    public get dataSource():any
    {
        return this.mData;
    }

    public get CanGet():boolean
    {
        if(SActiveRewardData.instance.CurrentDayRewardInfo.day >= this.mData.index)
        {
            return this.mData.state%2 == 1?false:true;
        }
        else
        return false;
    }

    private updateData():void
    {
        this.day_txt.text = `累计登录${this.mData.index}天`;
        this._rewarldList.updateRewardsByNum(this.mData.reward_no);
        if(SActiveRewardData.instance.CurrentDayRewardInfo.day >= this.mData.index)
        {
            this.GetBtn.disabled = false;
            if(this.mData.state%2 == 1)
            {
                this.IsGet.visible = true;
                this.GetBtn.visible = false;
            }
            else
            {
                this.IsGet.visible = false;
                this.GetBtn.visible = true;
            }
            //var state = SActiveRewardData.instance.CurrentDayRewardInfo.state >> this.mData.index-1;
            //this.IsGet.visible = state == 0?false:true;
            //this.GetBtn.disabled = false;
            //this.GetBtn.visible = !this.IsGet.visible;
        }
        else
        {
            this.IsGet.visible = false;
            this.GetBtn.visible = true;
            this.GetBtn.disabled = true;
        }
        
    }

}