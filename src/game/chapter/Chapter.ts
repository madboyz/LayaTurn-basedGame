import { Level_cfgVo } from "../../db/sheet/vo/Level_cfgVo";
import { Chapter_cfgVo } from "../../db/sheet/vo/Chapter_cfgVo";

export class Chapter{
    public lastPassLevelTime:number = 0;//上一个关卡通关时间戳
    public LevelPassCount:number = 0;//当前数量
    public AwardsState:Laya.Dictionary = new Laya.Dictionary();//章节领奖
    public sheetLevelData:Level_cfgVo;
    public sheetChapterData:Chapter_cfgVo;
    private _chapterId:number = 0;
    private _levelId:number = 0;
    public set chapterId(id:number)
    {
        if(this._chapterId != id)
        {
            this._chapterId = id;
            this.sheetChapterData = Chapter_cfgVo.get(id);
        }
    } 

    public get chapterId():number
    {
        return this._chapterId;
    }


    public set levelId(id:number)
    {
        if(this._levelId != id)
        {
            this._levelId = id;
            this.sheetLevelData = Level_cfgVo.get(id);
        }
    } 

    public get levelId():number
    {
        return this._levelId;
    }

    public get IsMaxLevel():boolean
    {
        this.sheetLevelData = Level_cfgVo.get(this._levelId+1);
        return this.sheetLevelData == null;
    }

    public get IsMaxChapter():boolean
    {
        this.sheetChapterData = Chapter_cfgVo.get(this._chapterId+1);
        return this.sheetChapterData == null;
    }

    public get LevelCoolDown():number
    {
        if(!this.sheetLevelData)
        return 0;
        return this.sheetLevelData.unlock[0][1];
    }

    public get CurrentChapterAwardId():number
    {
        var awardId = 0;

        for (let i = 0; i < this.sheetChapterData.chapter_rewards.length; i++) {
            const table = this.sheetChapterData.chapter_rewards[i];
            var state = this.AwardsState.get(table[0]);
            if(state == null||(state != null && state != 1))
            {
                awardId = table[1];
                break;
            }
            
        }
        return awardId;
    }

    public get IsCanGetAward():boolean
    {
        var isCan = false;
        if(!this.sheetChapterData)
        return isCan;
        for (let i = 0; i < this.sheetChapterData.chapter_rewards.length; i++) {
            const table = this.sheetChapterData.chapter_rewards[i];
            var state = this.AwardsState.get(table[0]);
            if(this.LevelPassCount == table[0]&&state == null)
            {
                isCan = true;
                break;
            }
        }
        return isCan;
    }

    public static GetconditionText(chapterId:number):string
    {
        var sheetChapterData = Chapter_cfgVo.get(chapterId -1);
        if(!sheetChapterData)
        return "";
        else
        return sheetChapterData.scene_name;

    }

}