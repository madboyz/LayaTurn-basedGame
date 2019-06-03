import { ProgressBar } from "../../../compent/ProgressBar";
import { RewardList } from "../../../compent/RewardList";
import {S59201_1 } from "../../../../../net/pt/pt_59";
import { AccomplishVo } from "../../../../../db/sheet/vo/AccomplishVo";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { SChapterData } from "../../../../chapter/SChapterData";

export class AchievementsItem extends ui.main.AchievementsItemUI {
    private curPointBar:ProgressBar;
    private rewarldList:RewardList; 
    private info:any;
    constructor() {
        super();
        this.initList();
        this.initProgressBar()
    }

    private initProgressBar():void
    {
        this.curPointBar = new ProgressBar();
        this.curPointBar.setGrid("10,15,10,15","5,8,5,8");
        this.curPointBar.setBg(ResUtils.getCompUIUrl("barbg"),ResUtils.getCompUIUrl("bar"),448,25 ,6 ,4 ,5 ,6);
        this.curPointBar.x = 22;
        this.curPointBar.y = 75;
        this.curPointBar.setLabel(1,20,"#ffffff",0,100,0.5,"#309203");
        this.addChild(this.curPointBar);
    }

    private initList():void
    {
        this.rewarldList = Laya.Pool.getItemByClass("rewarldList",RewardList);
        this.rewarldList.showNameNum = false;
        this.rewarldList.rowCount = 6;
        this.rewarldList.maxNum = 6;
        this.rewarldList.itemStyle = 64;
        this.rewarldList.x = 53;
        this.rewarldList.y = 103;
        this.addChild(this.rewarldList);
    }

    public set dataSource(data:any)
    {
        this.info = data;
        this.RefreshDisplay();
    }

    public RefreshDisplay()
    {
        if(!this.info)return;
        var _info:S59201_1 = this.info.info;
        var sheet:AccomplishVo = this.info.sheet;
        this.curPointBar.setValue(_info.cur_num,sheet.num_limit); 
        var proText = (_info.cur_num/sheet.num_limit*100).toFixed(0);
        this.curPointBar.Text = `${proText}%`;
        if(_info.time == 0)
        this.getTimeTxt.text = "";
        else
        {
            var now = new Date(_info.time*1000); 
            this.getTimeTxt.text = TimerUtil.getStrDate(now);
        }
        
        this.getBtn.off(Laya.Event.CLICK , this, this.onClickGetBtn);
        switch(_info.state)
        {
            case 1:
            {
                //this.getBtn.disabled = true;
                //this.getBtn.label = "领取";
                this.finish.visible = false;
                this.getBtn.visible = false;
                break;
            }
            case 2:
            {
                this.getBtn.visible = true;
                this.getBtn.disabled = false;
                this.getBtn.label = "领取";
                this.getBtn.on(Laya.Event.CLICK , this, this.onClickGetBtn);
                this.finish.visible = false;
                break;
            }
            case 3:
            {
                this.getBtn.visible = true;
                this.getBtn.disabled = true;
                this.getBtn.label = "已领取";
                this.finish.visible = true;
                break;
            }
        }
        this.titleTxt.text = sheet.name;
        this.desTxt.text = sheet.desc;
        this.pointTxt.text = sheet.contri.toString();
        if(sheet.reward.length > 0)
        {
            this.rewarldList.visible = true;
            this.rewarldList.updateRewardsByNum(sheet.reward[0]);
        }
        else
        this.rewarldList.visible = false;
    }

    public set IsSelect(val:boolean)
    {
        this.SelectImg.skin = val == true?ResUtils.getCompUIUrl("img_skillItem"):ResUtils.getCompUIUrl("img_skillItem_select");
    }

    private onClickGetBtn()
    {
        if(!this.info||this.info.no == 0)return;
        var _info:S59201_1 = this.info.info;
        SChapterData.instance.Protocol.send59202(_info.no);
    }

    public get dataSource():any
    {
        return this.info;
    }
}