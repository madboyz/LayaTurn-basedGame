import { BaseScene } from "./BaseScene";
import { LocalPlayerView } from "../role/LocalPlayerView";
import { RoleLayer } from "./layer/RoleLayer";
import { RoleOtherLayer } from "./layer/RoleOtherLayer";
import { NameLayer } from "./layer/NameLayer";
import { SRoleData } from "../../../net/data/SRoleData";
import { GridLayer } from "./layer/GridLayer";
import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { Delay } from "../../../framework/utils/Delay";
import { SceneManager } from "./SceneManager";
import { SGridSceneData, SGridSceneEvent } from "../../activity/data/SGridSceneData";
import { Dun_eventVo } from "../../../db/sheet/vo/Dun_eventVo";
import { Debug } from "../../../debug/Debug";
import { GameLayer } from "../../../GameLayer";
/**
 * 格子方向
 */
export enum RandGridDirection {
    Foward = 0,
    Left,
    Right,
}
export class GridScene extends BaseScene {
    public localPlayer: LocalPlayerView;
    private roleLayer: RoleLayer;
    private roleOtherLayer: RoleOtherLayer;
    private gridLayer:GridLayer;
    private nameLayer: NameLayer;
    public mapWidth:number = 0;
    public mapHeight:number = 0;
    public BgSprite:Laya.Sprite;//背景
    private readonly FowardPivotPoint = new Laya.Point(69,32);
    private readonly LeftPivotPoint = new Laya.Point(-71,36);
    private readonly RightPivotPoint = new Laya.Point(71,-36);
    private readonly GirdPivot = new Laya.Point(69,33);//寻路需要锚点 摆格子需要对应的方向
    private readonly GirdSize = new Laya.Point(139,116);//格子大小
    private RandGridCount:number = 1;
    private lastPos = new Laya.Point(0,187);
    public posDic = new Laya.Dictionary();
    public lastdDirection = RandGridDirection.Foward;
    public PIVOTY:number = 0;
    public PIVOTX:number = 0;
    private continuousForwardNum = 0;//连续往下的个数要超过3个才行 
    private continuousRightLeftNum = 0;//连续往下的个数要超过4个才行 
    private lastNowNo = 0;
    constructor() {
        super();
        this.posDic.clear();
        UIManager.instance.openUI(UIID.SYS_GRID_HUD_PANEL);
        this.lastNowNo = SGridSceneData.instance.StayNo;
    }

    public InitGrid() {
        var path = "bg/grid_bg.png";
        var t: Laya.Texture = Laya.Loader.getRes(path);
        var THIS = this;
        if(!t)
        {
            Laya.loader.load(path, Laya.Handler.create(this, function (): void {//加载获取资源 
                t = Laya.Loader.getRes(path);
                if(t)
                {
                    t.width = Laya.stage.width;
                    t.height = Laya.stage.height;
                    THIS.BgSprite.texture = t;
                }
                
            }));
        }
        else
        {
            t.width = Laya.stage.width;
            t.height = Laya.stage.height;
            this.BgSprite.texture = t;
        }
        this.RandGridCount = ConstVo.get("GRID_RAND_COUNT").val;
        var TotalNo = SGridSceneData.instance.getTotalGirdNum;
        var maxWidth = TotalNo*this.GirdSize.x;
        var maxHeight = TotalNo*this.GirdSize.y;
        this.PIVOTY = this.GirdSize.y - (maxHeight - (Math.floor(maxHeight / this.GirdSize.y) * this.GirdSize.y));
        this.PIVOTX = this.GirdSize.x - (maxWidth - (Math.floor(maxWidth / this.GirdSize.x ) * this.GirdSize.x));
        //var PIVOTY = 128;
        this.camera.Init(maxWidth+this.PIVOTX,maxHeight+this.PIVOTY, 0, 0,
            maxWidth,maxHeight,this.PIVOTX,this.PIVOTY);
        this.RandGrid(0 , true);
        this.mapReader();
        if(SGridSceneData.instance.StayNo != 0)
        this.RequsetStartAction();
    }

    public AddGrid(point:Laya.Point , isRight , no)
    {
        var x = 0;
        var y = 0;
        if(this.posDic.keys.length == 0)
        {
            x = this.lastPos.x;
            y = this.lastPos.y;
        }
        else
        {
            x = this.lastPos.x + point.x;
            y = this.lastPos.y + point.y;
        }
        this.lastPos.x = x;
        this.lastPos.y = y;
        var TotalNo = SGridSceneData.instance.getTotalGirdNum;
        this.posDic.set(no , {Dicrection:new Laya.Point(point.x,point.y),Point:new Laya.Point(x,y)});
        var maxHeight = TotalNo*this.GirdSize.y;
        this.gridLayer.AddGrid(no,x,y,maxHeight,isRight);
        var infos = SGridSceneData.instance.Infos;
        if(no != 0&&this.roleOtherLayer)
        {
            var eventNo = infos.get(no);
            var vo:Dun_eventVo = Dun_eventVo.get(eventNo);
            if(vo&&vo.anim)
            {
                var info = this.posDic.get(no);
                if(info)
                {
                    var px = info.Point.x+this.GirdPivot.x;
                    var py = info.Point.y+this.GirdPivot.y;
                    var type = vo.anim[0];
                    var url: string = vo.anim[1];
                    switch(type)
                    {
                        case 1:
                        {
                            this.roleOtherLayer.ShowIcon(no + GameConfig.GRID_SCENE_EVENT_CONST, px, py+145, url);
                            break;
                        }
                        case 2:
                        {
                            this.roleOtherLayer.ShowAnimation(no + GameConfig.GRID_SCENE_EVENT_CONST, px, py, url, false ,false , 400,315);
                            break;
                        }
                    }
                }
            }
        }
        //await Delay.delay(300);
    }

    private randDirection(count , nowNo)
    {
        var dir = 0;
        var point = null;
        var needAddNo = nowNo +count;
        //if(this.lastdDirection == RandGridDirection.Left||this.lastdDirection == RandGridDirection.Right)
        //{
        //    if(this.continuousRightLeftNum >= 2)
        //    {
        //        dir = RandGridDirection.Foward;
        //        this.continuousRightLeftNum = 0;
        //    }
        //}
        for (let i = nowNo; i <= needAddNo; i++) {
            var data = this.posDic.get(i);
            if(data)continue;
            //var rand = (GMath.random(1, 10));
            //switch(rand)
            //{
            //    case 1:
            //    {
            //        dir = RandGridDirection.Left;
            //        break;
            //    }
            //    default:
            //    {
            //        dir = rand <= 6 ?RandGridDirection.Foward:RandGridDirection.Right;
            //        break;
            //    }
            //}
            if(this.lastdDirection == RandGridDirection.Foward)
            {
                if(this.continuousForwardNum >= 3)
                {
                    dir = (GMath.random(1, 5)) == 1?RandGridDirection.Left:RandGridDirection.Right;
                    this.continuousForwardNum --;
                }
                else
                {
                    dir = this.lastdDirection;
                    this.continuousForwardNum ++;
                }
            }
            else
            {
                if(this.continuousRightLeftNum >= 3)
                {
                    dir = RandGridDirection.Foward;
                    this.continuousRightLeftNum --;
                }
                else
                {
                    dir = this.lastdDirection;
                    this.continuousRightLeftNum ++;
                }
            }
            this.lastdDirection = dir;
            
            switch(this.lastdDirection)
            {
                case RandGridDirection.Foward:
                {
                    point = this.FowardPivotPoint;
                    break;
                }
                case RandGridDirection.Left:
                {
                    point = this.LeftPivotPoint;
                    break;
                }
                case RandGridDirection.Right:
                {
                    point = this.RightPivotPoint;
                break;
                }
            }
            this.AddGrid(point,point == this.RightPivotPoint , i);
        }
    }

    public RandGrid(index:number = 0 , init = false)
    {
        var point = null;
        var nowNo = SGridSceneData.instance.StayNo;
        if(init)
        {
            this.lastNowNo = SGridSceneData.instance.StayNo;
            var detlaNum = SGridSceneData.instance.getTotalGirdNum - nowNo;
            if(detlaNum > this.RandGridCount)
            {
                detlaNum = this.RandGridCount;
            }
            point = this.FowardPivotPoint;
            for (let i = nowNo; i < nowNo +detlaNum; i++) {
                this.AddGrid(point,false , i);
            }
            this.continuousForwardNum = 3;
        }
        else
        {
            if(index == 0)
            {
                this.RequsetStartAction();
                return;
            }
            var nextNo = nowNo + index;
            SGridSceneData.instance.StayNo = nextNo;
            if(this.lastNowNo == SGridSceneData.instance.StayNo)return;
            this.lastNowNo = SGridSceneData.instance.StayNo;
            var count = index ;
            
            var TotalNo = SGridSceneData.instance.getTotalGirdNum - 1;
            if(count == 1&&nowNo+index<TotalNo)
            {
                count = 2;
            }
            
            var needAddNo = nowNo +count;
            var path = [];
            this.randDirection(count,nowNo);
            if(TotalNo > nowNo+index + 3)
            {
                this.randDirection(2,needAddNo);
            }
            for (let i = nowNo+1; i <= nextNo; i++) {
                var data = this.posDic.get(i);
                if(!data )continue;
                var px = data.Point.x+this.GirdPivot.x;
                var py = data.Point.y+this.GirdPivot.y;
                path.push({x:px,y:py});
            }
            
            this.lastNowNo = nextNo;
            SGridSceneData.instance.event(SGridSceneEvent.GRIRD_NO_UPDATE);
            this.localPlayer.ptachTo(path);
        }
    }

    private RequsetStartAction()
    {
        SGridSceneData.instance.protocol.send57210();
        //如果有事件要移除事件动画
        var nowGridNo = SGridSceneData.instance.StayNo;
        Debug.serverLog(`玩家当前格子编号：${nowGridNo}`);
        if(this.roleOtherLayer)
        this.roleOtherLayer.removeAnimation(nowGridNo + GameConfig.GRID_SCENE_EVENT_CONST);
    }

    protected initLayer(): void {
        super.initLayer();
        this.BgSprite = new Laya.Sprite();
        this.addChild(this.BgSprite);
        this.gridLayer = new GridLayer();
        this.addChild(this.gridLayer);

        this.roleOtherLayer = new RoleOtherLayer();
        this.addChild(this.roleOtherLayer);

        this.roleLayer = new RoleLayer();
        this.addChild(this.roleLayer);
        this.nameLayer = new NameLayer();
        this.addChild(this.nameLayer);
    }

    protected initEvent(): void {
        super.initEvent();
        this.localPlayer&&this.localPlayer.on(CMD.MOVE_END,this,this.RequsetStartAction);
    }

    protected removeEvent(): void {
        super.removeEvent();
        this.localPlayer&&this.localPlayer.off(CMD.MOVE_END,this,this.RequsetStartAction);
    }

    protected mapReader() {
        super.mapReader();
        if(this.localPlayer == null)
        {
            this.localPlayer = new LocalPlayerView();
            this.localPlayer.IsAstar = false;
            this.roleLayer.add(this.localPlayer); 
            this.initEvent();
        };
        this.localPlayer.info = SRoleData.instance.roleInfo;
        var data = this.posDic.get(SGridSceneData.instance.StayNo);
        if(!data)return;
        this.localPlayer.px = data.Point.x+data.Dicrection.x;
        this.localPlayer.py = data.Point.y+data.Dicrection.y;
        this.localPlayer.angle = 45;
    }

    protected loop(): void {
        super.loop();
        if(!this.localPlayer)return;
        var x: number = this.localPlayer.px;
        var y: number = this.localPlayer.py;
        this.camera.lookAt(x, y , 0 , -this.PIVOTY);//因为格子副本顶上的位置有点多
        this.localPlayer.x = x - this.camera.originX;
        this.localPlayer.y = y - this.camera.originY;        
        this.nameLayer.showName(SRoleData.instance.roleId, SRoleData.instance.roleInfo.Name, this.localPlayer.x, this.localPlayer.y + 165);
        this.roleLayer.update();
        this.gridLayer.pos(- this.camera.originX, - (this.camera.originY));
        this.roleOtherLayer.pos(- this.camera.originX, - (this.camera.originY));
    }

    public hide(visible: boolean): void {
        super.hide(visible);
        this.localPlayer&&this.localPlayer.stopMove();
        this.roleLayer.visible = visible;
        this.nameLayer.visible = visible;
    }

    public dispose(): void {
        super.dispose();
        this.localPlayer&&this.localPlayer.removeSelf();
        this.localPlayer = null;
        this.roleOtherLayer.clear();
        this.roleOtherLayer = null;
        this.nameLayer.clear();
        this.roleLayer.clear();
        UIManager.instance.closeUI(UIID.SYS_GRID_HUD_PANEL);
        GameLayer.instacne.sceneLayer.removeChild(this);
    }
}