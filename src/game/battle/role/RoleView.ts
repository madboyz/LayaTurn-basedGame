import { Role } from "./Role";
import { VIP_JURISDICTION_BASE } from './../../../db/sheet/base/VIP_JURISDICTION_BASE';
import { Aerocraft_starVo } from "../../../db/sheet/vo/Aerocraft_starVo";
import { Aerocraft_skinVo } from "../../../db/sheet/vo/Aerocraft_skinVo";

export class  RoleView extends Role {
    protected mBody: Laya.Animation;//身体
    public PlayerName: string = "";
    public Lv: number = 1;
    public Faction: number = 0;//门派 怪物门派是0
    public Sex: number = 0;//性别 怪物性别是0
    protected mMount: Laya.Animation;//坐骑
    public set isFly(value:boolean)
    {
        if(this._isFly ==value)
        return;
        if(value)
        {
            this.mBody.y = this.mBody.y - this.offsetY;
            this.mMount.y = this.mMount.y - this.offsetY;
        }
        else
        {
            this.mBody.y = this.mBody.y + this.offsetY;
            this.mMount.y = this.mMount.y + this.offsetY;
        }
        this._isFly = value;
    }
    public get isFly():boolean
    {
        return this._isFly;
    }
    constructor() {
        super();
        this.mMount = new Laya.Animation();
        this.addChild(this.mMount);
        this.mMount.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.mMount.pivotX = 800 / 2;
        this.mMount.pivotY = 455;
        this.mBody = new Laya.Animation();
        this.addChild(this.mBody);
        this.mBody.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.mBody.pivotX = 800 / 2;
        this.mBody.pivotY = 455;
    }

    public set interval(value)
    {
        this.mMount.interval = value;
        this.mBody.interval = value;
    }


    private dir: number = 0;
    /**
     * 有时候需要循环播放一个
     * @param need_loop 
     */
    public updateSkin() {
        if (this.info == null||this.resPath == "") return;
        var path: number = GMath.getPath(this.angle);
        var url: string = ResUtils.getRoleUrl(this.resPath, this.action, path);
        this.asyncUpdateSKin(url);
        if(this.mountPath != "")
        {
            var url: string = ResUtils.getRoleUrl(this.mountPath, Action.stand, path);
            this.asyncUpdateSKin(url, this.mMount);
        }
    }

    protected async asyncUpdateSKin(url: string, target: Laya.Animation = this.mBody ,need_loop:boolean = false) {
        var frames: any = Laya.Animation.framesMap[url];
        if (!frames) {
            frames = await this.asyncLoaderSkin(url);
            var path: number = GMath.getPath(this.angle);
            var _url = "";
            if(target == this.mBody)
            _url = ResUtils.getRoleUrl(this.resPath, this.action, path);
            else if(target == this.mMount)
            _url = ResUtils.getRoleUrl(this.mountPath, this.action, path);
            else
            _url = ResUtils.getRoleUrl(this.weponPath, this.action, path);

            if(_url != url)
            return;
            if (!frames) {
                return;
            }
            target.frames = frames;
            if(target == this.mMount)
            {
                target.play(0, true);
            }
            else
            {
                target.play(0, this.mAction == Action.run||this.mAction == Action.stand);
            }
            
        } else if (target.frames != frames) {
            var path: number = GMath.getPath(this.angle);
            var _url = "";
            if(target == this.mBody)
            _url = ResUtils.getRoleUrl(this.resPath, this.action, path);
            else if(target == this.mMount)
            _url = ResUtils.getRoleUrl(this.mountPath, this.action, path);
            else
            _url = ResUtils.getRoleUrl(this.weponPath, this.action, path);
            if(_url != url)
            return;
            target.frames = frames;
            if(target == this.mMount)
            {
                target.play(0, true);
            }
            else
            {
                target.play(0, this.mAction == Action.run||this.mAction == Action.stand);
            }
        }
    }

    //身体的实际大小
    public getBodyRealSize(): Laya.Point {
        var index: number = this.mBody.index;
        var h,w = 0;
        if(this.mBody.frames)
        {   
            var oneTexture:Laya.GraphicsGL = this.mBody.frames[index];
            if(oneTexture)
            {
                var texture: Laya.Texture = oneTexture._one[0];
                if(texture)
                {
                    w = texture.width;
                    h = texture.height;
                }
            }
        }
        return new Laya.Point(w, h);
    }

    protected mAction: string = Action.stand;
    public set action(value: string) {
        if(this.isFly&&value == Action.run)
        {
            value = Action.stand;
        }
        if (this.mAction != value) {
            this.mAction = value;
            this.updateSkin();//切换动作,改变皮肤
        }
    }

    

    public updateMount(mountId:number):void {
        if( mountId == 0||mountId == undefined)
        {
            this.mMount.clear();
            return;//没有坐骑
        }
        var body_anim:string = Aerocraft_skinVo.get(mountId).body_anim;
        if(body_anim == "") return;
        this.mountPath = body_anim;
        var path: number = GMath.getPath(this.angle);
        //坐骑只有idle
        var url: string = ResUtils.getRoleUrl(body_anim, Action.stand, path);
        this.asyncUpdateSKin(url, this.mMount);
    }

    public get action(): string {
        return this.mAction;
    }

    protected asyncLoaderSkin(url: string) {
        var This: RoleView = this;
        return new Promise((resolve, reject) => {
            Laya.loader.load(url, Laya.Handler.create(this, function (): void {
                resolve(This.getFrames(url));
            }), null, Laya.Loader.ATLAS).once(Laya.Event.ERROR, this, () => {
                resolve(null);//加载失败
            });
        });
    }

    protected getFrames(url: string): Array<any> {
        var frames: Array<any> = Laya.Animation.framesMap[url];//先从缓存拿
        if (frames) return frames;
        return Laya.Animation.createFrames(url, url);//缓存拿不到，创建出来
    }
    //角度
    public set angle(value: number) {
        this.mAngle = value;
        if (Math.abs(value) < 90) {
            this.scaleX = Math.abs(this.scaleX);
        } else {
            this.scaleX = -Math.abs(this.scaleX);
        }
        this.updateSkin();
    }

    public get angle(): number {
        return this.mAngle;
    }

    public set isMoveing(value: boolean) {
        this.mMoveing = value;
        if (value&&!this.isFly) {
            this.action = Action.run;
        } else {
            this.action = Action.stand;
        }
        // !value && (this.action = Action.stand);
    }

    public get mouse(): Laya.Point {
        return new Laya.Point(this.mBody.mouseX, this.mBody.mouseY);
    }

    public get isMoveing(): boolean {
        return this.mMoveing;
    }

    public dispose(): void {
        this.mBody.stop();
        this.mMount.stop();
        this.mMount.clear();
        this.mBody.clear();
        this.mAction = Action.stand;
        super.dispose();
    }
}