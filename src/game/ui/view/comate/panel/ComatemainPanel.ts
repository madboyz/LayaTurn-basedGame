import { TabBar } from "../../../compent/TabBar";
import { ScrollList } from "../../../compent/ScrollList";
import { ComateItem } from "./ComateItem";
import { SComateData, SComateEvent } from "../data/SComateData";
import { ComateInfo } from "../data/ComateInfo";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";

export class ComatemainPanel extends ui.main.ComatemainPanelUI {
    private mTab:TabBar;
    public curIndex:number = -1;
    public mComateList:ScrollList;
    private currentUILevel:UIID = 0;
    constructor() {
        super();
        //this.sameLevelEliminate = false;
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    public initComp() {
        super.initComp();
        if(this.mComateList == null)
        {
            this.mComateList = new ScrollList(510,100,80,100,ComateItem,1,1,this.onChange.bind(this));
            this.mComateList._preBtn.on(Laya.Event.MOUSE_DOWN, this,this.onPreBtnDownHandler);
            this.mComateList._nextBtn.on(Laya.Event.MOUSE_DOWN, this,this.onNextBtnDownHandler);
            this.addChild(this.mComateList);
            this.mComateList.x = (this.width - this.mComateList.width) >> 1;
            this.mComateList.y = 652;
            this.mComateList.moveBtnY(10);
        }
        if(!this.mTab)
        {
            this.mTab = new TabBar([this.btn_0,this.btn_1,this.btn_2,this.btn_3],[UIID.SYS_COMATE,UIID.SYS_COMATE_LVUP,UIID.SYS_COMATE_STAR,UIID.SYS_COMATE_TALENT]);
        }
        this.mTab.select = this.curIndex;
    }

    public onChange(index:number):void
    {
        if(index == null)
        {
            index = this.mComateList.selectedIndex;
        }
        if(SComateData.instance.CurrentComate)
        {
            SComateData.instance.CurrentComate = this.mComateList.dataProvider[index];
            //update
            SComateData.instance.event(SComateEvent.COMATE_SELECT_UPDATE );
            this.checkSelect();
        }
    }

    private onPreBtnDownHandler(e:Event=null):void
    {
        this.checkSelect();
    }

    private onNextBtnDownHandler(e:Event=null):void
    {
        this.checkSelect();
    }

    public checkSelect():void
    {
        var THIS = this;
        Laya.timer.once(100,this,function():void{
            var i:number = 0,cells:Array<any> = this.mComateList.list.cells,len:number = cells.length,cell:any;
            for (i ; i < len ; i ++){
                cell = cells[i];
                if(cell)
                {
                    cell.checkSelect(SComateData.instance.CurrentComate);
                    if(THIS&&THIS.currentUILevel == UIID.SYS_COMATE_INFO)
                    {
                        var bl = SComateData.instance.refreshComateActiveRed(cell.dataSource);                
                        cell.CheckInfoRed(bl);
                    }
                    else
                    cell.CheckInfoRed(false);

                }
                 
            }
        });
    }
    public Refresh(selectIndex = -1)
    {
        this.mComateList.dataProvider = SComateData.instance.allData;
        if(selectIndex >= 0){
            SComateData.instance.CurrentComate = this.mComateList.dataProvider[selectIndex];
            SComateData.instance.event(SComateEvent.COMATE_SELECT_UPDATE);
            this.mComateList.selectedIndex = selectIndex;
            this.mComateList.scrollToIndex(Math.floor(this.mComateList.selectedIndex/5));
        }else{
            this.mComateList.list.refresh();
            this.checkSelect();
        }

        
        // var index = 0; //不注释，升星的时候，会跳转到总览去
        // if(this.arg && this.arg.length > 0)
        // {
        //     index = this.arg[0];
        // }
        // if(this.mTab)
        // this.mTab.select = index;
        this.updateRed();
    }

    public open(...args): void {
        this.initWindow(true,true,"伙伴",550,750,45);
        super.open();
        this.Refresh(0);
        this.update();
    }

    public update():void
    {
        this.mTab.select = this.tabIndex;
    }

    public updateRed():void{
        this.zonglanRed(RedDotManager.instance.GetRD(RedDotType.RDComateZonglan)._isActiveSave);
        this.lvRed(RedDotManager.instance.GetRD(RedDotType.RDComateLv)._isActiveSave);
        this.starRed(RedDotManager.instance.GetRD(RedDotType.RDComateStar)._isActiveSave);
        this.talentRed(RedDotManager.instance.GetRD(RedDotType.RDComateTalent)._isActiveSave);
    }

    public zonglanRed(show:boolean):void{
        this.btn_0.refreshRed(show);
    }
    
    public lvRed(show:boolean):void{
        this.btn_1.refreshRed(show);
    }
    
    public starRed(show:boolean):void{
        this.btn_2.refreshRed(show);
    }
    
    public talentRed(show:boolean):void{
        this.btn_3.refreshRed(show);
    }

    public initEvent():void 
    {
        RedDotManager.instance.on(RedDotType.RDComateZonglan,this,this.zonglanRed);
        RedDotManager.instance.on(RedDotType.RDComateLv,this,this.lvRed);
        RedDotManager.instance.on(RedDotType.RDComateStar,this,this.starRed);
        RedDotManager.instance.on(RedDotType.RDComateTalent,this,this.talentRed);
        SComateData.instance.on(SComateEvent.COMATE_ATTR_UPDATE,this,this.checkSelect);
        
        this.mTab.on(Laya.Event.CHANGE,this,this.onTabChange);
    }
    
    public removeEvent():void
    {
        RedDotManager.instance.off(RedDotType.RDComateZonglan,this,this.zonglanRed);
        RedDotManager.instance.off(RedDotType.RDComateLv,this,this.lvRed);
        RedDotManager.instance.off(RedDotType.RDComateStar,this,this.starRed);
        RedDotManager.instance.off(RedDotType.RDComateTalent,this,this.talentRed);
        SComateData.instance.off(SComateEvent.COMATE_ATTR_UPDATE,this,this.checkSelect);
        
        this.mTab.off(Laya.Event.CHANGE,this,this.onTabChange);
    }

    private onTabChange(index:number,btn:Laya.Button) {
        if(this.curIndex != index)
        {
            this.curIndex = index;
            switch(this.curIndex)
            {
                case 0:
                {
                    this.Title = "伙伴总览";
                    if(this.currentUILevel != 0)
                    UIManager.instance.closeUI(this.currentUILevel);
                    UIManager.instance.openUI(UIID.SYS_COMATE_INFO);
                    this.currentUILevel = UIID.SYS_COMATE_INFO;
                    this.checkSelect();
                    break;
                }
                case 1:
                {
                    this.Title = "伙伴升级";
                    if(this.currentUILevel != 0)
                    UIManager.instance.closeUI(this.currentUILevel);
                    UIManager.instance.openUI(UIID.SYS_COMATE_LVUP);
                    this.currentUILevel = UIID.SYS_COMATE_LVUP;
                    this.checkSelect();
                    break;
                }
                case 2:
                {
                    this.Title = "伙伴升星";
                    if(this.currentUILevel != 0)
                    UIManager.instance.closeUI(this.currentUILevel);
                    UIManager.instance.openUI(UIID.SYS_COMATE_STAR);
                    this.currentUILevel = UIID.SYS_COMATE_STAR;
                    this.checkSelect();
                    break;
                }
                case 3:
                {if(this.currentUILevel != 0)
                    UIManager.instance.closeUI(this.currentUILevel);
                    UIManager.instance.openUI(UIID.SYS_COMATE_TALENT);
                    this.currentUILevel = UIID.SYS_COMATE_TALENT;
                    this.Title = "伙伴天赋";
                    this.checkSelect();
                    break;
                }
            }
        }
    }

    public close(): void {
        this.curIndex = -1;
        this.mTab.select = this.curIndex;
        UIManager.instance.closeUI(this.currentUILevel);
        this.currentUILevel = 0;
        super.close();
    }

}