import { SKILL_BASE } from "../../db/sheet/base/SKILL_BASE";
import { SkillVo } from "../../db/sheet/vo/SkillVo";
import { Skill_costVo } from "../../db/sheet/vo/Skill_costVo";
import { SRoleData } from "../../net/data/SRoleData";
import { HtmlUtils } from "../utils/HtmlUtils";
import { ConstVo } from "../../db/sheet/vo/ConstVo";

export class Skill{
    public skillType:number = 1;//1是普通的技能类型，2位帮派技能
    public Id = 0;
    public LearnLv = 0;//学习等级
    public CanUse = false;//可以使用
    public sheetData: SKILL_BASE = null;
    public cost_type = 0;
    public cost_value = 0;
    protected _lv = 0;
    protected _canUpgardeLvG = 1;
    public isMaxLv = false;
    public Install = false;//是否已装配
    public IsUsable:number = 1;//1：可使用，0：不可使用
    public LeftCDRounds =0;//剩余的冷却回合数，如果不在冷却中，则返回0
    public Boid:number ;//战斗中对应的boid,战斗中点击操作需要用到
    constructor(id: number , skillType:number = 1)
    {
        this.Id = id;
        if(id == 0)
        return;
        this.skillType = skillType;
        if(skillType == 1){
            this.sheetData  = SkillVo.get(id);
            this._canUpgardeLvG = ConstVo.get("SKILL_UPGRADE_LV_G").val;
        }

    }

    /**
     * 获得技能的目标数量
     */
    public get SkillCount():number
    {
        if(this._lv == 0)
        return 0;
        if(this.sheetData == null)
        return 0;
        var count = 0;
        for (let i = 0; i < this.sheetData.target_count.length; i++) {
            const item = this.sheetData.target_count[i];
            if(item[0] >= this._lv)
            {
                count = item[1];
            }
        }

        return count;
    }

    public set Lv(lv:number)
    {
        this._lv = lv;
        this.CanUse = lv == 0?false:true;
        var next_lv = lv + 1;
        var data = Skill_costVo.get(next_lv);
        if(data != null && data.price_type != null)
        {
            this.isMaxLv = false;
            this.cost_type = data.price_type;
            this.cost_value = data.price;
        }
        else
        {
            this.isMaxLv = true;
        }
    }
    
    public get Lv():number
    {
        return this._lv;
    }

    public get canUpgardeLvG():number{
        return this._canUpgardeLvG;
    }

    /**
     * 根据穿过来得skill两者比较返回显示html文本
     * @param skill 
     */
    public GetNeedLastSkillHtmlDes(LastSkill:Skill , fontsize: number):string
    {
        var des = "";
        if(SRoleData.instance.info == null)
        return des;
        if(this.isMaxLv)
        return HtmlUtils.addColor("(已满级)","#8e5213",fontsize);
        if(this.Lv == 0)
        {
            if(this.LearnLv > SRoleData.instance.info.Lv)
            {
                des = HtmlUtils.addColor(`(需要玩家等级${this.LearnLv})`,"Red",fontsize);
                //des = HtmlUtils.addColor("(需要玩家等级","#8e5213",fontsize)+
                //    HtmlUtils.addColor(`${this.LearnLv}`,"Red",fontsize)+
                //    HtmlUtils.addColor(")","#8e5213",fontsize);
            }
            else
            {
                des = "" /*HtmlUtils.addColor("(需要玩家等级","#8e5213",22)+
                    HtmlUtils.addColor(`${this.LearnLv}`,"Green",22)+
                    HtmlUtils.addColor(")","#8e5213",22)*/;
            }
            
        }
        else
        {
            if(this.sheetData.pre_skill_id == 0)
            {
                
                if(this.Lv < SRoleData.instance.info.Lv)
                {
                    des = "" /*HtmlUtils.addColor("(需要玩家等级","#8e5213",22)+
                        HtmlUtils.addColor(`${this.Lv+1}`,"Green",22)+
                        HtmlUtils.addColor(")","#8e5213",22)*/;
                }
                else
                {
                    //des = HtmlUtils.addColor("(需要玩家等级","#8e5213",fontsize)+
                    //    HtmlUtils.addColor(`${this.Lv+1}`,"Red",fontsize)+
                    //    HtmlUtils.addColor(")","#8e5213",fontsize);

                    des = HtmlUtils.addColor(`(需要玩家等级${this.Lv+1})`,"Red",fontsize);
                }
            }
            else
            {
                if(LastSkill != null)
                {
                    var data = SkillVo.get(this.sheetData.pre_skill_id);
                    if(LastSkill.Lv > this.Lv)
                    {
                        des = "" /*HtmlUtils.addColor("(需要技能","#8e5213",22)+
                            HtmlUtils.addColor(`${data.name}`,"#fae512",22)+
                            HtmlUtils.addColor(`${this.Lv+1}`,"Green",22)+
                            HtmlUtils.addColor("级)","#8e5213",22)*/;
                    }
                    else
                    {
                        des = HtmlUtils.addColor("(需要技能","Red",fontsize)+
                            HtmlUtils.addColor(`${data.name}`,"#fae512",fontsize)+
                            HtmlUtils.addColor(`${this.Lv+1}`,"Red",fontsize)+
                            HtmlUtils.addColor("级)","Red",fontsize);
                    }
                }
            }
        }
        return des;
    }
    
}