import { HtmlUtils } from "../../utils/HtmlUtils";
import { Alert } from "../../ui/compent/Alert";
import { CommonControl } from "../../common/control/CommonControl";
import { SceneManager } from "../../battle/scene/SceneManager";
import { SGridSceneEvent, SGridSceneData } from "../data/SGridSceneData";
import { MsgManager } from "../../ui/manager/MsgManager";
import { ProgressBar } from "../../ui/compent/ProgressBar";
import { SGameData } from "../../../net/data/SGameData";
import { UIeffectLayer } from "../../battle/scene/layer/UIeffectLayer";
import { GridScene } from "../../battle/scene/GridScene";

export class GridHudMainPage extends ui.main.GridHudMainPageUI {
    private bar:ProgressBar;
    private _uiEffLayer: UIeffectLayer;
    constructor() {
        super();
        this.layer = UILEVEL.POP_1;
        this.sameLevelEliminate = false;
        this.isFullScreen = true;
        this.mResouce = [
            { url: "res/atlas/grid.atlas", type: Laya.Loader.ATLAS},
        ];
    }

    public initComp() {
        super.initComp();
        this.initBar();
        this.showUIEffect();
    }

    public showUIEffect(): void {
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.RandBtn.addChild(this._uiEffLayer);
        }
        this._uiEffLayer.clearEffect();
        this._uiEffLayer.playEffect("ui_migong06", 42, 37, true);
    }

    private initBar():void
    {
        this.bar = new ProgressBar();
        this.bar.setGrid("8,16,12,14","7,10,4,9");
        this.bar.setBg(ResUtils.getCompUIUrl("barbg"),ResUtils.getCompUIUrl("bar"),218,20,5,4,5,5);
        this.bar.setLabel(0,20,"#ffffff");
        this.bar.x = 10;
        this.bar.y = 36;
        this.GridNoImg.removeSelf();
        this.bar.AddNode(this.GridNoImg);
        this.TopRight.addChildAt(this.bar,0);
        this.bar.setValue(1 , 10);
        this.GridNoText.text = "1";
    }

    public update() {
        //TODO:第二次打开面板
        super.update();
    }

    public open(...args): void {
        super.open();
        this.updateScore();
        this.updateGridNo();
        this.updateBattleState();
        this._uiEffLayer.visible = true;
        this.rollPoint.visible = false;
    }

    public initEvent(): void {
        this.ExitBtn.on(Laya.Event.CLICK,this,this.onExitBtn);
        this.RandBtn.on(Laya.Event.CLICK,this,this.OnRandBtn);
    }

    public removeEvent(): void {
        this.ExitBtn.off(Laya.Event.CLICK,this,this.onExitBtn);
        this.RandBtn.off(Laya.Event.CLICK,this,this.OnRandBtn);

    }

    public updateBattleState()
    {
        var IsBattle = SGameData.instance.PLAYFIGHTREPORT;
        this.ExitBtn.visible = !IsBattle;
        this.RandBtn.visible = !IsBattle;
    }

    public updateScore()
    {
        this.NowPointText.text = `当前分数:${SGridSceneData.instance.getTotalScore}`;
    }
    
    public updateRollNum(num:number)
    {
        if(num != 0)
        {
            var url = `grid/roll${num}.png`;
            this.rollPoint.skin = url;
        }
        if(SceneManager.instance.CurrentScene && SceneManager.instance.CurrentScene instanceof GridScene)
        {
            var grid = SceneManager.instance.CurrentScene as GridScene;
            grid.RandGrid(num);
        }
        
    }
    public updateGridState()
    {
        this._uiEffLayer.visible = SGridSceneData.instance.RollState == 1?true:false;
        this.rollPoint.visible = !this._uiEffLayer.visible;
    }

    public updateGridNo()
    {
        var now = SGridSceneData.instance.StayNo;
        this.GridNoText.text = now.toString();
        this.bar.setValue(now , SGridSceneData.instance.getTotalGirdNum-1);
    }

    private OnRandBtn()                               
    {
        if(SceneManager.instance.CurrentScene && SceneManager.instance.CurrentScene instanceof GridScene)
        {
            var grid = SceneManager.instance.CurrentScene as GridScene;
            if(!grid.localPlayer)return;
            if(grid.localPlayer.isMoveing)
            {
                MsgManager.instance.showRollTipsMsg("大侠，现在还不能摇骰子！");
                return;
            }
            //if(SGridSceneData.instance.RollState == 0)
            //{
            //    MsgManager.instance.showRollTipsMsg("大侠，现在还不能摇骰子！");
            //    return;
            //}
            SGridSceneData.instance.protocol.send57201();
        }
        
    }

    private onExitBtn()
    {
        Alert.show("提前退出将无法获得结算奖励，确定要现在退出副本？",this,()=>{
            CommonControl.instance.ExitCopy();
            //SceneManager.instance.ExitSpecialScene();
        },null,null,null,true)
    }

    public close(): void {
        super.close();
    }

}