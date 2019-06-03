import { GameSceneControl } from "../control/GameSceneControl";
import { NewBattleControl } from "../control/NewBattleControl";
import { GridScene } from "./GridScene";
import { SNewBattleData, SNewBattleEvent } from "../../../net/data/SNewBattleData";
import { SAoiData, SAoiEvent } from "../../aoi/SAoiData";
import { SRoleData } from "../../../net/data/SRoleData";
import { BaseScene } from "./BaseScene";
import { AoiControl } from "../../aoi/control/AoiControl";
import { GameScene } from "./GameScene";
import { GameLayer } from "../../../GameLayer";
import { PortalVo } from "../../../db/sheet/vo/PortalVo";
import { AutoChessScene } from "../../autochess/AutoChessScene";
export enum SceneType
{
    Normal = 0,//普通场景
    GridScene,//格子副本场景
    AutoChess,//测试自走棋场景
}

/**
 * 1.走maplayer的场景都是普通场景来实现
 * 2.当前场景只有一种，normal场景不会销毁只会从父节点移除 其他场景直接销毁
 */
export class SceneManager extends Laya.EventDispatcher {
    private static _instance: SceneManager;
    public gameSceneControl: GameSceneControl;
    public battleCtrl: NewBattleControl;
    public CurrentScene:BaseScene;
    public CurrentType:SceneType = SceneType.Normal;
    public AoiCtrl: AoiControl = new AoiControl();
    public static get instance(): SceneManager {
        return SceneManager._instance || (SceneManager._instance = new SceneManager());
    }

    constructor() {
        super();

        SNewBattleData.instance.on(SNewBattleEvent.CREATE_FIGHT_SCENE, this, this.visibleCurrentScene)
    }

    public Init() {
        if (!this.gameSceneControl)
        {
            this.gameSceneControl = new GameSceneControl();
            this.CurrentScene = this.gameSceneControl.scene;
            GameLayer.instacne.sceneLayer.addChild(this.CurrentScene);
        }
            
        if (!this.battleCtrl)
        {
            this.battleCtrl = new NewBattleControl();
        }
            

    }
    /**
     * 跟visibleCurrentScene区别在于All是把所有隐藏了
     * @param isShow 
     */
    public visibleAll(isShow:boolean)
    {
        if (this.CurrentScene)
        this.CurrentScene.hide(isShow);
        this.CurrentScene.visible = isShow;
    }

    public visibleCurrentScene(result: boolean): void {
        if (this.CurrentScene)
        this.CurrentScene.hide(result);
    }

    /**
     * 进入一个特殊场景
     * @param sceneType 
     */
    public EnterSpecialScene(sceneType:SceneType)
    {
        if(!this.CurrentScene)return;
        if(this.CurrentScene instanceof GameScene)
        {
            this.CurrentScene.removeSelf();
            var scene = null;
            switch(sceneType)
            {
                case SceneType.GridScene:
                {
                    scene = new GridScene();
                    this.CurrentScene = scene;
                    GameLayer.instacne.sceneLayer.addChild(this.CurrentScene);
                    scene.InitGrid();
                    break;
                }
                case SceneType.AutoChess:
                {
                    scene = new AutoChessScene();
                    this.CurrentScene = scene;
                    GameLayer.instacne.sceneLayer.addChild(this.CurrentScene);
                    scene.InitAuto();
                    break;
                }
            }
            
            this.CurrentType = SceneType.GridScene;
        }
        
        UIManager.instance.openUI(UIID.HUD_MAIN);
    } 

    /**
     * 退出特殊场景
     */
    public ExitSpecialScene()
    {
        if(!this.CurrentScene)return;
        if(this.CurrentScene instanceof GameScene)
        {

        }
        else
        {
            this.CurrentScene.dispose();
            this.CurrentScene = this.gameSceneControl.scene;
            this.gameSceneControl.hide(true);
            GameLayer.instacne.sceneLayer.addChild(this.CurrentScene);
            this.CurrentType = SceneType.Normal;
        }
        UIManager.instance.openUI(UIID.HUD_MAIN);
    } 

    //新场景坐标
    private TransferPoint:any;
    public enterScene(sceneNo: number) {
        if(SRoleData.instance.info.SceneNo == sceneNo){
            return;
        }
        var vo:PortalVo = PortalVo.getBySceneNo(sceneNo);
        if(vo&&vo.target_xy)
        {
            this.TransferPoint = {x:vo.target_xy[0],y:vo.target_xy[1]};
        }
        if (this.TransferPoint != null ) {
            SAoiData.instance.event(SAoiEvent.AOI_GO_TO_SCENE, [sceneNo, this.TransferPoint.x, this.TransferPoint.y]);
        }
    }
}