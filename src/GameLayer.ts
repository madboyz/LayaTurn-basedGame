import { SmallIconLayer } from "./SmallIconLayer";

/**
 * 游戏基础层容器
 */
export class GameLayer extends Laya.Sprite {
    //场景层
    public sceneLayer: Laya.Sprite;
    //战斗层
    public fightLayer: Laya.Sprite;
    //小图标层
    public smallLayer:SmallIconLayer;
    // UI层
    public uiLayer: Laya.Sprite;

    private static _instacne: GameLayer;
    public static get instacne() {
        this._instacne = this._instacne || new GameLayer;
        return this._instacne;
    }

    constructor() {
        super();
        this.height = Laya.stage.height;
        this.width = Laya.stage.width;
        this.sceneLayer = new Laya.Sprite;
        this.fightLayer = new Laya.Sprite;
        this.smallLayer = new SmallIconLayer();
        this.uiLayer = new Laya.Sprite;
        this.addChild(this.sceneLayer);
        this.addChild(this.fightLayer);
        this.fightLayer.visible = false;
        this.addChild(this.smallLayer);
        this.addChild(this.uiLayer);
        this.uiLayer.width = Laya.stage.width;
        this.uiLayer.height = Laya.stage.height;
        this.fightLayer.width = Laya.stage.width;
        this.fightLayer.height = Laya.stage.height;
        this.sceneLayer.width = Laya.stage.width;
        this.sceneLayer.height = Laya.stage.height;
        this.uiLayer.mouseThrough = true;
        // this.sceneLayer.scaleX = this.sceneLayer.scaleY = this.fightLayer.scaleX = this.fightLayer.scaleY = 0.8;
      
    }

}