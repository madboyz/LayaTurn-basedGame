import { SRoleData, SRoleEvent } from './../../../net/data/SRoleData';
import { SAoiData, SAoiEvent } from "../../aoi/SAoiData";
import { Astar } from "../../../framework/utils/Astar";
import { Debug } from '../../../debug/Debug';
import { SGameData } from '../../../net/data/SGameData';
import { GameUtils } from '../../utils/GameUtils';

export class Role extends Laya.Sprite {
    constructor() {
        super();
        this.scaleX = 0.8;
        this.scaleY = 0.8;
    }
    private mInfo: any;
    public SheetData: any;//表数据
    public Type: RoleType;//类型
    public IsAstar = true;
    public IsNeedPos = true;
    public set px(value:number)
    {
        this._px = value;
        this.lastPx = this._px;
    }

    public get px():number
    {
        return this._px;
    }


    public set py(value:number)
    {
        this._py = value;
        this.lastPy = this._py;
    }

    public get py():number
    {
        return this._py;
    }
    
    private _px:number = 0;
    private _py:number = 0;
    public Speed = GameConfig.ROLE_SPEED;//速度
    protected _isFly:boolean = false;
    public set isFly(value:boolean)
    {
        this._isFly = value;
    }

    public get isFly():boolean
    {
        return this._isFly;
    }

    public resPath: string = "";
    public weponPath: string = "";
    public mountPath: string = "";
    public isLocalPlayer: boolean = false;
    public readonly offsetY:number = 30;
    private lastPx:number = 0;//上一次移动x
    private lastPy:number = 0;//上一次移动y
    public set info(value: any) {
        this.mInfo = value;
        this.customRenderEnable = true;
    }

    public get info(): any {
        return this.mInfo;
    }

    public loop(): void {
        if (this.mPath)
        {
            if(this.isLocalPlayer&&SGameData.instance.PLAYFIGHTREPORT)
            {
                this.stopMove();
            }
            else
            {
                this.moveNext();
            }
            
        }
        else
        {
            if(this.isMoveing)
            {
                this.isMoveing = false;
            }
        }
            
        
    }

    protected mMoveing: boolean = false;
    //是否移动
    public set isMoveing(value: boolean) {
        this.mMoveing = value;
    }

    public get isMoveing(): boolean {
        return this.mMoveing;
    }

    private nextPath: any;//下一次移动的节点
    private mPath: Array<any>

    public ptachTo(path: Array<any>): any {
        if(!path||(path&&path.length == 0))
        {
            this.isMoveing = false;
            return;
        }
        this.isMoveing = true;
        this.nextPath = null;
        this.mPath = path;
    }

    public stopMove()
    {
        if(this.isMoveing)
        {
            this.lastPx = this._px
            this.lastPy = this._py;
            this.RequsetGridPos();
            this.mPath = null;
            this.nextPath = null;
            this.isMoveing = false;
            GameUtils.CheckLocalPlayerGotoSceneObj(this);
            if(this.isLocalPlayer)
            SRoleData.instance.event(SRoleEvent.ROLE_AUTO_MOVE_UPDATE , false);
        }
    }
    
    private lastGridX = 0;
    private lastGridY = 0;

    public RequsetGridPos() {
        if(!this.IsNeedPos)return;
        if (this.isLocalPlayer&&this.IsAstar) {
            var GirdX = Math.floor(this._px / Astar.instance.GridSize);
            var GirdY = Math.floor((Astar.instance.MapHeight - this._py) / Astar.instance.GridSize);
            if(Math.abs(this.lastGridX -GirdX)>=2||Math.abs(this.lastGridY -GirdY)>=2)
            {
                this.lastGridX = GirdX;
                this.lastGridY = GirdY;
                SAoiData.instance.event(SAoiEvent.LOCAL_PLAYER_REQUEST_MOVE, [SRoleData.instance.info.SceneId, GirdX, GirdY]);
            }
        }
    }

    protected moveNext(): void {//移动

        if (!this.nextPath) {
            this.nextPath = this.mPath.shift();
            //this.RequsetGridPos();
        }
        if (!this.nextPath) {
            this.isMoveing = false;
            this.Speed = GameConfig.ROLE_SPEED;
            this.mPath = null;
            if(this.isLocalPlayer&&this.IsAstar)
            {
                GameUtils.CheckLocalPlayerGotoSceneObj(this);
                this.RequsetGridPos();
            }
            this.event(CMD.MOVE_END);
            return;
        }
        let radian: number = GMath.getPointRadian(Math.ceil(this.nextPath.x - this._px), Math.ceil(this.nextPath.y - this._py));
        this.isMoveing = true;

        if (Math.round(Math.abs(this._px - this.nextPath.x)) <= this.Speed && Math.round(Math.abs(this._py - this.nextPath.y)) <= this.Speed) {
            this._px = this.nextPath.x;
            this._py = this.nextPath.y;  
            this.lastPx = this._px
            this.lastPy = this._py;
            this.nextPath = null;
            if(this.isLocalPlayer)
            {
                GameUtils.CheckLocalPlayerGotoSceneObj(this);
                this.RequsetGridPos();
            }
            //if(this.IsAstar)
            //this.angle = GMath.R2A(radian);
        } 
        else {
            var xspeed: number = (this.Speed * Math.cos((radian)));
            var yspeed: number = (this.Speed * Math.sin((radian)));
            this._px += xspeed;
            this._py += yspeed;
            if(this.isLocalPlayer)
            {
                var distance = GameUtils.distance( this._px ,  this._py ,  this.lastPx ,  this.lastPy);
                if(this.IsAstar)
                {
                    if(distance >= Astar.instance.GridSize)
                    {
                        this.lastPx = this._px
                        this.lastPy = this._py;
                        this.RequsetGridPos();
                    }
                }
            }
            
           
            this.angle = GMath.R2A(radian);
        }
        if(this.IsAstar)
        Astar.instance.isAlpha(this._px, this._py) ? this.alpha = 0.5 : this.alpha = 1;
    }

    protected mAngle: number = 180;

    //角度
    public set angle(value: number) {
        this.mAngle = value;
    }

    public get angle(): number {
        return this.mAngle;
    }

    public dispose(): void {
        this.mPath = null;
        this.info = null;
        this.scaleX = this.scaleY =0.8;
        this.angle = 0;
        this.x = 0;
        this.y = 0;
        this.SheetData = null;
        this.resPath = "";
        this.weponPath = "";
        this.mountPath = "";
        this.isLocalPlayer = false;
        this.isFly = false;
        this.px = 0;
        this.py = 0;
        this.alpha = 1;
        this.removeSelf();
    }
}

