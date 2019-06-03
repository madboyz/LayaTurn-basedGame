import { RewardList } from "../../../compent/RewardList";
import { Upgrade_awardVo } from "../../../../../db/sheet/vo/Upgrade_awardVo";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class LevelRewardItem extends ui.main.LevelRewardItemUI {
    private _rewarldList:RewardList;
    private mData:any;
    private vo:Upgrade_awardVo;
    constructor() {
        super();
        this.initList();
    }

    private initList():void
    {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList",RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 2;
        this._rewarldList.maxNum = 6;
        this._rewarldList.vGap = 15;
        this._rewarldList.hGap = 8;
        this._rewarldList.itemStyle = 80;
        this._rewarldList.x = 20;
        this._rewarldList.y = 60;
        this.addChild(this._rewarldList);
    }

    public set dataSource(data:any)
    {
        if(!data) return;
        this.mData = data;
        this.vo = Upgrade_awardVo.get(this.mData.No);
        this.updateData();
    }

    public get dataSource():any
    {
        return this.mData;
    }

    public get CanGet():boolean
    {
        if(!this.vo) return false;
        if(!this.mData) return false;
        if(SRoleData.instance.info.Lv < this.vo.lv)
        {
            return false;
        }
        else if(this.mData.IsReward == 1)
        {
            return false;
        }
        return true;
    }

    private updateData():void
    {
        this.levelTxt.text = `${this.vo.lv}级奖励`;
        this._rewarldList.updateRewardsByNum(this.vo.reward_no,true);
        if(SRoleData.instance.info.Lv < this.vo.lv)
        {
            this.GetBtn.label = "等级不足";
            this.GetBtn.disabled = true;
        }
        else
        {
            if(this.mData.IsReward == 1)
            {
                this.GetBtn.disabled = true;
                this.GetBtn.label = "已领取";
            }
            else
            {
                this.GetBtn.disabled = false;
                this.GetBtn.label = "领取";
            }
        }
    }
}