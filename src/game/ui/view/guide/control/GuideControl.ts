import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { SGuideData, SGuideEvent } from "../data/SGuideData";
import { SkillPanel } from "../../skill/panel/SkillPanel";
import { GuidePop } from "../panel/GuidePop";
import { GameLayer } from "../../../../../GameLayer";
import { STaskData, STaskEvent } from "../../../../task/STaskData";
import { TaskType, Task, TaskState } from "../../../../task/Task";
import { Guide_cfgVo } from "../../../../../db/sheet/vo/Guide_cfgVo";
import { Delay } from "../../../../../framework/utils/Delay";
import { GuideInfo, GuideState } from "../data/GuideInfo";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { SNewBattleData } from "../../../../../net/data/SNewBattleData";

export class GuideControl extends BaseControl {
    constructor() {
        super();
        this.initEvent();
        this.onUpdateTask();
    }
    public guideSp:GuidePop = new GuidePop();
    public CurrentGuide:GuideInfo = new GuideInfo();
    public CurrentBtnName = "";
    private CurrentLayer = UILEVEL.POP_1;
    private CurrentTask:Task = null;
    private moveTween:Laya.Tween = new Laya.Tween();
    private isMoving = false;
    private readonly moveSpeed = 200;//2019/3/7孝鹏又要求改速度 其实没必要纠结这些
    public excuting(data: NotityData): void {
    }

    private initEvent(): void {
        STaskData.instance.on(STaskEvent.TASK_UPDATE,this,this.onUpdateTask);
        SGameData.instance.on(SGameEvent.GAME_RECONNECT,this,this.CloseGuide);
        UIManager.instance.on(UIManagerEvent.OPEN_UI,this,this.checkOpenUI);
        UIManager.instance.on(UIManagerEvent.CLOSE_UI,this,this.checkCloseUI);
        UIManager.instance.on(UIManagerEvent.TAB_BAR_CHANGE,this,this.TabBarChange);
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE,this,this.updateTime);
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    private onUpdateFightState()
    {
        if(SGameData.instance.PLAYFIGHTREPORT)
        {
            var mainBattleType = SNewBattleData.instance.CurrentBattleType;
            var subBattleType = SNewBattleData.instance.CurrentBattleSubType;
            if(!this.CurrentGuide.sheet||(this.CurrentGuide.sheet&&this.CurrentGuide.sheet.is_close == 0)||mainBattleType == BattleMainType.PVP
            ||(mainBattleType == BattleMainType.PVE&&subBattleType != PveBattleSubType.HangUp))
            this.guideSp.visible = false;
            
        }
    }

    /*
    *页签切换
     */
    private TabBarChange()
    {
        var THIS = this;
        Laya.timer.once(50,this,function():void{
            if(!THIS.CurrentGuide.sheet)
            {
                THIS.guideSp.visible = false;
                return;
            }
            var substr:string = THIS.CurrentGuide.sheet.sys_sub_ui;
            var ui_name:string = THIS.CurrentGuide.sheet.sys_ui; 
            if(substr != "")
            {
                var uiView = UIManager.instance.getHasOpenUI(UIID[ui_name]);
                if(uiView == null)
                {
                    THIS.onUpdateTask();
                    return;
                }
                var subPanel = null;
                if(THIS.CurrentGuide.sheet.sub_ui_sys == 1)
                {
                    subPanel = UIManager.instance.getHasOpenUI(UIID[substr]);
                }
                else
                subPanel = this.FindSubPanel(uiView,substr);
                if(subPanel == null)
                {
                    THIS.onUpdateTask();
                }
            }
            else
            {
                if(UIID[ui_name] == UIID.SYS_MOUNT)//因为坐骑从始至终是一个面板所以要特殊处理
                {
                    var uiView = UIManager.instance.getHasOpenUI(UIID[ui_name]);
                    if(uiView)
                    {
                        var taskView = UIManager.instance.getHasOpenUI(UIID.SYS_TASK);
                        if(taskView == null)
                        {
                            this.guideSp.visible = false; 
                        }
                        else
                        {
                            this.guideSp.visible = true; 
                            var taskBtn = taskView["taskBtn"];
                            this.CurrentLayer = UILEVEL.POP_1;
                            if(this.guideSp.parent)
                            {
                                this.guideSp.removeSelf();
                            }
                            var layer = UIManager.instance.getPopLayerByIndex(UILEVEL.POP_1_1);
                            if(layer.getChildIndex(this.guideSp) == -1)
                            {

                                layer.addChild(this.guideSp);
                            }
                            if(taskBtn)
                            this.setArrowPos(taskBtn);
                        }
                    }
                }
            }
        });
    }

    private setArrowPos(comp:any,isleft = true,move = false)
    {
        if(!comp)
        {
            return;
        }
        var point = comp.localToGlobal(new Laya.Point(comp.width/2,comp.height/2) ,true);
        this.guideSp.Show(isleft);
        if(move)
        {
            var THIS = this;
            this.isMoving = true;
            this.moveTween.to(this.guideSp,{x:point.x,y:point.y},this.moveSpeed,Laya.Ease.linearInOut,
                Laya.Handler.create(this,function():void{
                    THIS.isMoving = false;
                }));
            
        }
        else
        {
            this.isMoving = false;
            this.moveTween.complete();
            this.guideSp.x = point.x;
            this.guideSp.y = point.y;
        }
    }


    public onUpdateTask()
    {
        if(!GameConfig.GAME_OPEN_GUIDE)
        {
            this.CloseGuide();
            return;
        }
        this.CurrentTask = STaskData.instance.CurrentTaskDic.get(TaskType.MAIN);
        if(this.CurrentTask == null)
        {
            
            this.guideSp.visible = false;
            return;
        }
        
        this.CurrentGuide.sheet = Guide_cfgVo.getGuideByTaskId(this.CurrentTask.TaskId);
        if(this.CurrentGuide.sheet == null||(this.CurrentGuide.sheet&&this.CurrentGuide.sheet.task_no == null))
        {
            this.guideSp.visible = false;
            return;
        }
        
        
        var ui_name:string = this.CurrentGuide.sheet.sys_ui; 
        var uiView = UIManager.instance.getHasOpenUI(UIID[ui_name]);
        var substr:string = this.CurrentGuide.sheet.sys_sub_ui;
        var layer_name:string = this.CurrentGuide.sheet.ui_layer;
        var subPanel = null;
        var taskView = UIManager.instance.getHasOpenUI(UIID.SYS_TASK);
        if(uiView&&substr != "")
        {
            if(this.CurrentGuide.sheet.sub_ui_sys == 1)
            {
                subPanel = UIManager.instance.getHasOpenUI(UIID[substr]);
            }
            else
            subPanel = this.FindSubPanel(uiView,substr);
        }
        
        if(!uiView||(uiView&&!subPanel&&substr != ""))
        {
            if(taskView == null)
            {
                this.guideSp.visible = false; 
            }
            else
            {
                this.guideSp.visible = true; 
                var taskBtn = taskView["taskBtn"];
                this.CurrentLayer = UILEVEL.POP_1_1;
                if(this.guideSp.parent)
                {
                    this.guideSp.removeSelf();
                }
                var layer = UIManager.instance.getPopLayerByIndex(UILEVEL.POP_1_1);
                if(layer.getChildIndex(this.guideSp) == -1)
                {
                    
                    layer.addChild(this.guideSp);
                }
                if(taskBtn)
                this.setArrowPos(taskBtn);
            }
        }
        else
        {
            if(this.CurrentTask.CurrentNum == this.CurrentTask.TotalNum)
            {
                if(UILEVEL[layer_name] == UILEVEL.POP_1||UILEVEL[layer_name] == UILEVEL.POP_1_1)
                {
                    var taskView = UIManager.instance.getHasOpenUI(UIID.SYS_TASK);
                    if(taskView == null)
                    {
                        this.guideSp.visible = false; 
                    }
                    else
                    {
                        this.guideSp.visible = true; 
                        var taskBtn = taskView["taskBtn"];
                        this.CurrentLayer = UILEVEL.POP_1_1;
                        if(this.guideSp.parent)
                        {
                            this.guideSp.removeSelf();
                        }
                        var layer = UIManager.instance.getPopLayerByIndex(UILEVEL.POP_1_1);
                        if(layer.getChildIndex(this.guideSp) == -1)
                        {
                            
                            layer.addChild(this.guideSp);
                        }
                        if(taskBtn)
                        this.setArrowPos(taskBtn);
                    }
                }
                else
                {
                    if(!uiView)
                    {
                        var taskBtn = taskView["taskBtn"];
                        this.CurrentLayer = UILEVEL.POP_1_1;
                        if(this.guideSp.parent)
                        {
                            this.guideSp.removeSelf();
                        }
                        var layer = UIManager.instance.getPopLayerByIndex(UILEVEL.POP_1_1);
                        if(layer.getChildIndex(this.guideSp) == -1)
                        {
                            
                            layer.addChild(this.guideSp);
                        }
                        if(taskBtn)
                        this.setArrowPos(taskBtn);
                        return;
                    }
                    var subPanel = this.FindSubPanel(uiView,"NewCommonBg");
                    if(subPanel == null)
                    {
                        subPanel = this.FindSubPanel(uiView,"CommonBg");
                    }
                    if(subPanel == null)
                    {
                        return;
                    }
                    if(this.CurrentGuide.sheet.is_close == 1)
                    {
                        this.guideSp.visible = true;
                        var closeBtn = subPanel["_backBtn"];
                        if(closeBtn)
                        {
                            this.setArrowPos(closeBtn,true,true);
                        }
                        else
                        {
                            closeBtn = subPanel["_closeBtn"];
                            if(!closeBtn)
                            return;
                            this.setArrowPos(closeBtn,false,true);
                        }
                    }
                }
            }
            else
            {

                if(UILEVEL[layer_name] == UILEVEL.POP_1||UILEVEL[layer_name] == UILEVEL.POP_1_1)//聊天特殊处理
                {
                    //var chatView = UIManager.instance.getHasOpenUI(UIID.CHAT);
                    //var txt_input = null;
                    //if(chatView)
                    //{
                    //    txt_input = chatView["txt_input"];
                    //    if(txt_input && txt_input.text != "")
                    //    {
                    //        return;
                    //    }
                    //}
                    var taskView = UIManager.instance.getHasOpenUI(UIID.SYS_TASK);
                    if(taskView == null)
                    {
                        this.guideSp.visible = false; 
                    }
                    else
                    {
                        this.guideSp.visible = true; 
                        var taskBtn = taskView["taskBtn"];
                        this.CurrentLayer = UILEVEL.POP_1_1;
                        if(this.guideSp.parent)
                        {
                            this.guideSp.removeSelf();
                        }
                        var layer = UIManager.instance.getPopLayerByIndex(UILEVEL.POP_1_1);
                        if(layer.getChildIndex(this.guideSp) == -1)
                        {
                            layer.addChild(this.guideSp);
                        }
                        if(taskBtn)
                        this.setArrowPos(taskBtn);
                    }
                }
            }
        }
    }

    private CheckCompInit(comp:any):boolean
    {
        if(!this.CurrentGuide.sheet)return false;
        var IsInit = false;
        if(!comp)return false;
        if(comp instanceof Laya.List )
        {
            var list = comp as Laya.List;
            var index = this.CurrentGuide.sheet.ui_names[2];
            if(list.array&&list.array.length > 0)
            {
                var clickBtn = this.CurrentGuide.sheet.ui_names[1];
                var data = list.array[index];
                var item = null;
                for (let i = 0; i < list.cells.length; i++) {
                    const element = list.cells[i];
                    if(element.dataSource == data)
                    {
                        item = element;
                        break;
                    }
                }
                if(item)
                {
                    var _btn = item[clickBtn];
                    this.setArrowPos(_btn,true,true);
                }
                else
                {
                }
            }
        }
        else if(comp instanceof Laya.TextInput)
        {

        }
        else
        {
            this.setArrowPos(comp,true,true);
        }
        return IsInit;
    }

    private WaitUIInit()
    {
        if(!this.CurrentGuide.sheet)return;
        var ui_name:string = this.CurrentGuide.sheet.sys_ui;
        var compName = this.CurrentGuide.sheet.ui_names[0];
        var uiView = UIManager.instance.getHasOpenUI(UIID[ui_name]);
        var comp = null;
        var THIS = this;
        Laya.timer.once(300,this,function():void{
            if(!THIS.CurrentGuide.sheet)
            {
                THIS.guideSp.visible = false;
                return;
            }
            
            var layer_name:string = THIS.CurrentGuide.sheet.ui_layer;
            var layer = UIManager.instance.getPopLayerByIndex(UILEVEL[layer_name]);
            var substr:string = THIS.CurrentGuide.sheet.sys_sub_ui;
            if(substr != "")
            {
                var subPanel = null;
                if(THIS.CurrentGuide.sheet.sub_ui_sys == 1)
                {
                    subPanel = UIManager.instance.getHasOpenUI(UIID[substr]);
                }
                else
                subPanel = THIS.FindSubPanel(uiView,substr);
                if(subPanel != null)
                {
                    comp = subPanel[compName];
                    if(comp)
                    {
                        if(THIS.guideSp.parent)
                        {
                            THIS.guideSp.removeSelf();
                        }
                        if(layer.getChildIndex(THIS.guideSp) == -1)
                        {
                            layer.addChild(THIS.guideSp);
                        }
                        THIS.CheckCompInit(comp);
                    }
                }
            }
            else
            {
                if(uiView != null)
                {
                    comp = uiView[compName];
                    if(comp)
                    {
                        if(THIS.guideSp.parent)
                        {
                            THIS.guideSp.removeSelf();
                        }
                        if(layer.getChildIndex(THIS.guideSp) == -1)
                        {
                            layer.addChild(THIS.guideSp);
                        }
                        THIS.CheckCompInit(comp);
                    }
                }
            }
        });
    }

    private checkOpenUI(index,layer,isopen)
    {
        if(!GameConfig.GAME_OPEN_GUIDE)
        {
            this.CloseGuide();
            return;
        }
        if(!this.CurrentTask)
        {
            this.CloseGuide();
            return;
        }
        if(this.CurrentGuide.sheet == null||(this.CurrentGuide.sheet&&this.CurrentGuide.sheet.task_no == null))
        {
            
            this.CloseGuide();
            return;
        }
        var ui_name:string = this.CurrentGuide.sheet.sys_ui;
        if(index == UIID[ui_name])
        {
            if(this.CurrentTask.CurrentNum == this.CurrentTask.TotalNum)
            {
                if(this.CurrentGuide.sheet.is_close == 1)
                {
                    var ui_name:string = this.CurrentGuide.sheet.sys_ui; 
                    var uiView = UIManager.instance.getHasOpenUI(UIID[ui_name]);
                    var subPanel = this.FindSubPanel(uiView,"NewCommonBg");
                    if(subPanel == null)
                    {
                        subPanel = this.FindSubPanel(uiView,"CommonBg");
                    }
                    if(subPanel == null)
                    {
                        return;
                    }
                    this.guideSp.visible = true;
                    var closeBtn = subPanel["_backBtn"];
                    if(closeBtn)
                    {
                        this.setArrowPos(closeBtn,true,true);
                    }
                    else
                    {
                        closeBtn = subPanel["_closeBtn"];
                        if(!closeBtn)
                        return;
                        this.setArrowPos(closeBtn,false,true);
                    }
                }
            }
            else
            {
                //if(index == UIID.CHAT)
                //{
                //    var chatView = UIManager.instance.getHasOpenUI(UIID.CHAT);
                //    if(chatView)
                //    {
                //        this.WaitUIInit();
                //    }
                //    
                //}
                //else
                //{
                    this.WaitUIInit();
                //}
            }
        }
    }

    private updateTime()
    {
        if(!GameConfig.GAME_OPEN_GUIDE)
        {
            this.CloseGuide();
            return;
        }
        if(!this.CurrentTask)
        {
            this.CloseGuide();
            return;
        }

    }

    private CloseGuide()
    {
        this.guideSp.visible = false;
    }

    private checkCloseUI(index,layer)
    {
        if(!GameConfig.GAME_OPEN_GUIDE)
        {
            this.CloseGuide();
            return;
        }
        
        if(this.CurrentGuide.sheet == null||(this.CurrentGuide.sheet&&this.CurrentGuide.sheet.task_no == null))
        {
            this.CloseGuide();
            return;
        }
        var ui_name:string = this.CurrentGuide.sheet.sys_ui;
        if(index == UIID[ui_name])
        {
            this.onUpdateTask();
        }
    }

    private FindSubPanel(panel:any,subPanelName:string):any
    {
        var subPanel = null;
        try{
            for (let i = 0; i < panel.numChildren; i++) {
                const element = panel._childs[i];
                if(element["__proto__"]["constructor"]["name"] == subPanelName)
                {
                    subPanel = element;
                    break;
                }
            }
        }
        catch(e){
            this.guideSp.visible = false;
            //this.guideSp.mouseEnabled = false;
        }
        return subPanel;
    }

    //private GetPanelBtnClickFunc(btn:any,panel:any):any
    //{
    //    /*通过底层接口获取对应组件的click事件*/
    //    var func = null;
    //    try{
    //        var funcList = btn["_$0__events"][Laya.Event.CLICK];
    //        for (let i = 0; i < funcList.length; i++) {
    //            const handler:Laya.Handler = funcList[i];
    //            if(handler == null)
    //            continue;
    //            if(handler.caller["$_GID"] == panel["$_GID"])
    //            {
    //                func = handler;
    //                break;
    //            }
    //        }
    //    }
    //    catch(e){
    //        this.guideSp.ShowArrow(false);
    //        //this.guideSp.mouseEnabled = false;
    //    }
    //    return func;
    //}
}