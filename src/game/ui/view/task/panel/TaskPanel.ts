import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { TaskVo } from "../../../../../db/sheet/vo/TaskVo";
import { STaskData, STaskEvent } from "../../../../task/STaskData";
import { Task, TaskType } from "../../../../task/Task";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";

export class TaskPanel extends ui.main.TaskPanelUI{
    constructor() {
        super();
        this.layer = UILEVEL.POP_1;
        this.sameLevelEliminate = false;
        this.mResouce = [
            { url: "res/atlas/task.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.centerX = this.centerY = NaN;
        this.initHtml();
        this.onUpdateTask();
        this.y = Laya.stage.height - (GameConfig.SCREEN_HEIGHT -525) + 30;
    }

    private initHtml():void
    {
        HtmlUtils.setHtml(this.txt.style,6,16,"left","middle");
        this.txt.style.wordWrap = false;
    }

    public update():void
    {
        this.onUpdateTask();
    }

    public open(...args): void {
        super.open();
    }
    public initEvent():void 
    {
        this.taskBtn.on(Laya.Event.CLICK, this, this.OnClickTaskBtn);
    }
    public removeEvent():void
    {
        this.taskBtn.off(Laya.Event.CLICK, this, this.OnClickTaskBtn);
    }

    private OnClickTaskBtn():void
    {
        var task = STaskData.instance.CurrentTaskDic.get(TaskType.MAIN);
        if(task)
        {
            if(task.IsComplete)
            {
                this.event(STaskEvent.TASK_COMMIT,task.TaskId);
            }
            else
            {
                task.doAction();
            }
        }
    }

    public onUpdateTask():void
    {
        var task = STaskData.instance.CurrentTaskDic.get(TaskType.MAIN);
        if(task)
        {
            var color = "Red";
            var iconname = "img_taskIcon.png";
            var progressStr = `(${task.CurrentNum}/${task.TotalNum})`;
            if(task.CurrentNum == task.TotalNum)
            {
                color = "Green";
                iconname = "img_finish.png";
                progressStr = "(完成)";
                this.showUIEffect(1);
            }else{
                this.showUIEffect(2);
            }

            this.Icon.skin = "task/"+iconname;
            var awardStr =  task.GetAwardDesc(16,"#fff578");
            var str = "";
            if(awardStr == "")
            str = HtmlUtils.addColor(task.SheetData.name,"#f8a91d",16)
            + HtmlUtils.addColor(progressStr,color,16);
            else
            str = HtmlUtils.addColor(task.SheetData.name,"#f8a91d",16)
            + HtmlUtils.addColor(progressStr,color,16)
            +"<br>"+awardStr;
            this.txt.innerHTML = str;
            this.txt.layout();
        }
    }
    
    //特效
    private _uiEffLayer: UIeffectLayer;
    //之前的BOSS类型
    private _lastType:number;
    //任务过程，播放特效 , type,1为完成,2为进行中
    public showUIEffect(type: number): void {
        if(!this._uiEffLayer){
            this._uiEffLayer = new UIeffectLayer;
            this.taskBtn.addChild(this._uiEffLayer);
        }
        if(this._lastType == type){
            return;
        }
        this._lastType = type;
        this._uiEffLayer.clearEffect();
        var effName:string = (type == 1 ? "ui_effect_8" : "ui_effect_7");
        var eff:Laya.Animation = this._uiEffLayer.playEffect(effName, 144,  39, true,120);
        eff.scaleX = 1;
        eff.scaleY = 1.2;
    }

    //任务完成的特效
    private _taskCompleteEff: UIeffectLayer;
    //任务过程，播放特效 , type,1为完成,2为进行中
    public showTaskCompEff(): void {
        if(!this._taskCompleteEff){
            this._taskCompleteEff = new UIeffectLayer;
            this.addChild(this._taskCompleteEff);
        }
        this._taskCompleteEff.playEffect("ui_effect_14", 290,  -125, false, 130);
    }

    public close(): void {
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
            this._lastType = null;
        }
        if (this._taskCompleteEff) {
            this._taskCompleteEff.destroy();
            this._taskCompleteEff = null;
        }
        super.close();
    }
}