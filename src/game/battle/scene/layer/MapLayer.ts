import { BaseLayer } from "./BaseLayer";
import { Astar } from "../../../../framework/utils/Astar";
import { CustomizeTexture } from './../comp/CustomizeTexture';
import { Debug } from "../../../../debug/Debug";

export enum MapItemState
{
    NoLoad=0,
    Loading,
    Loaded,
}

/**
 * 
 * 
 * @export
 * @class MapLayer
 * @extends {BaseLayer}
 * 
 */
export class MapLayer extends BaseLayer {
    public isChangeMap:boolean = false;
    constructor() {
        super();
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        // Laya.timer.frameLoop(1, this, this.update);
    }

    public update(): void {
        // var x: number = this.x - 1;
        // var y: number = this.y - 1;
        // this.pos(this.x, y);
    }
    public clear(): void {
        if (this.resMapId == 0) return;
        //var index: number = 0;
        //var mapSize: number = Astar.instance.MapSplitSize;
        //const MAX: number = Math.ceil(Astar.instance.MapWidth / mapSize);
        //const MAX1: number = Math.ceil(Astar.instance.MapHeight / mapSize);
        //for (var i: number = MAX1; i > 0; --i) {
        //    for (var j: number = MAX; j > 0; --j) {
        //        index = (i * MAX - j);
        //        var url: string = ResUtils.getMapUrl(this.perMapId, index);
        //        Laya.Loader.clearRes(url);
        //    }
        //}
        for (let i = 0; i < this.textureDic.keys.length; i++) {
            const key = this.textureDic.keys[i];
            var element = this.textureDic.get(key)
            if(element.hasOwnProperty("texture"))
            {
                var texture: CustomizeTexture = element.texture;
                var args: any[] = texture.args;
                if (!this.graphics.cmds) {
                    this.graphics.clear();
                }
                else
                {
                    if (this.graphics.cmds.length <= 1) {//防止残留清不悼
                        this.graphics.clear();
                    }
                    else {
                        var _index = this.graphics.cmds.indexOf(args);
                        if (_index != -1)
                            this.graphics.cmds.splice(_index, 1);
                    }
                }
                
                texture.dispose();
                var url: string = ResUtils.getMapUrl(this.resMapId, key);
                Laya.loader.clearRes(url);
            }
        }
        this.textureDic.clear();
        this.graphics.clear();
        //Laya.Loader.clearRes(ResUtils.getMapSmall(this.resMapId));
    }
    private mapId: number;
    private resMapId:number = 0;
    public setMap(mapId: number) {
        var This: MapLayer = this;
        this.isChangeMap = true;
        return new Promise(async (resolve, reject) => {
            try {

                if (This.mapId == mapId) {
                    This.isChangeMap = false;
                    resolve(true);
                    return;
                }
                var url: string = ResUtils.getMapConfigUrl(mapId);
                var mapData: any = await This.asyncLoaderMap(url, Laya.Loader.JSON);
                var resmapId = ~~mapData.MapId;
                This.mapId = mapId;
                Astar.instance.data = mapData;
                Laya.loader.clearRes(url);//用完清除资源
                if (This.resMapId == resmapId) {
                    This.isChangeMap = false;
                    resolve(true);
                    return;
                }
                This.clear();//切换场景,清除资源
                This.resMapId = resmapId;
                //var imgurl = ResUtils.getMapSmall(resmapId);
                //await This.asyncLoaderMap(imgurl, Laya.Loader.IMAGE);
                //this.showSmall();
                This.size(Astar.instance.MapWidth, Astar.instance.MapHeight);
                this.textureDic.clear();
                This.isChangeMap = false;
                resolve(true);
                
            } catch (error) {
                Debug.serverLog(error);
                This.isChangeMap = false;
                resolve(true);
            }
            
        })
    }

    private showSmall(): void {
        var url = ResUtils.getMapSmall(this.resMapId);
        this.graphics.drawTexture(Laya.Loader.getRes(url), 0, 0, Astar.instance.MapWidth, Astar.instance.MapHeight);
    }

    private isBlend: boolean = false;
    /**
     * @private
     */
    public set2DRenderConfig(isBlend: boolean): void {
        if (isBlend == this.isBlend) return;
        this.isBlend = isBlend;
        var gl: any = Laya.WebGL.mainContext;
        Laya.WebGLContext.setBlend(gl, true);
        Laya.WebGLContext.setBlendFunc(gl, Laya.WebGLContext.SRC_ALPHA, Laya.WebGLContext.ONE_MINUS_SRC_ALPHA);
        // Laya.WebGLContext.setDepthTest(gl, false);
        // Laya.WebGLContext.setCullFace(gl, false);
        Laya.WebGLContext.setDepthMask(gl, false);
        // Laya.WebGLContext.setFrontFace(gl, Laya.WebGLContext.CCW);
    }


    public asyncLoaderMap(url: string, type: string) {
        return new Promise((resolve, reject) => {
            Laya.loader.load(url, Laya.Handler.create(this, function (): void {
                resolve(Laya.loader.getRes(url));
            }), null, type);
        });
    }


    public showMap() {
        if(this.isChangeMap) 
        return;
        var mapSize: number = Astar.instance.MapSplitSize;
        const MAX: number = Math.ceil(Astar.instance.MapWidth / mapSize);
        const MAX1: number = Math.ceil(Astar.instance.MapHeight / mapSize);
        var index: number = 0;
        for (var i: number = MAX1; i > 0; --i) {
            for (var j: number = MAX; j > 0; --j) {
                index = (i * MAX - j);
                this.loadTitleMap((MAX - j) * mapSize, (MAX1 - i) * mapSize, mapSize, index);
            }
        }
    }
    private textureDic:Laya.Dictionary = new Laya.Dictionary();
    //private textures: CustomizeTexture[] = [];
    private loadTitleMap(x: number, y: number, size: number, index: number) {

        var stageW: number = this.stage.width;
        var stageH: number = this.stage.height;
        var x1: number = this.x;
        var y1: number = this.y;

        var rect: Laya.Rectangle = new Laya.Rectangle(Math.abs(x1), Math.abs(y1), stageW + 200, stageH + 200);
        var rect1: Laya.Rectangle = new Laya.Rectangle(x, y, size, size + 200);
        var url: string = ResUtils.getMapUrl(this.resMapId, index);
        if (rect.intersects(rect1)) {
            var textureInfo = this.textureDic.get(index);
            if(!textureInfo)
            {
                textureInfo = {state:MapItemState.NoLoad,texture:null};
                this.textureDic.set(index,textureInfo);
            }
            if (textureInfo.state == MapItemState.NoLoad){
                textureInfo.state = MapItemState.Loading;
                CustomizeTexture.GetTextureByUrlCallBack(url, index, 0, 0 ,Laya.Handler.create(this,
                    function(dropTexture:CustomizeTexture){
                        if(dropTexture.texture)
                        {
                            textureInfo.texture = dropTexture;
                            textureInfo.state = MapItemState.Loaded;
                            var p: number = (size - dropTexture.texture.height);
                            var args: Array<any> = [];
                            args[0] = dropTexture.texture;
                            args[1] = x;
                            args[2] = y + p;
                            args[3] = dropTexture.texture.width;
                            args[4] = dropTexture.texture.height;
                            args[5] = null;
                            args[6] = 1;
                            dropTexture.saveArgs(args);
                            this.graphics._saveToCmd(Laya.Render._context._drawTexture, args);
                        }
                        else
                        {
                            dropTexture.dispose();
                            Laya.loader.clearRes(url);
                            textureInfo.state = MapItemState.NoLoad;
                        }
                        
                    }
                ));
            }
        } 
    }

    public pos(x: number, y: number): Laya.Sprite {
        this.x = x;
        this.y = y;
        this.showMap();
        return this;
    }

    //特效组
    public clickEffectArr: Laya.Animation[] = [];
    //点击地图的特效效果
    public showClickEffect(clickPoint: any): void {
        var eff: Laya.Animation = Laya.Pool.getItem("UIeffect") || new Laya.Animation;
        this.clickEffectArr.push(eff);
        eff.scaleX = eff.scaleY = 1;
        eff.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        eff.pivotX = 800 / 2;
        eff.pivotY = 300;
        eff.x = clickPoint.x;
        eff.y = clickPoint.y;
        UIManager.instance.loadUIEffect("ui_effect_11").then((effArr: Array<any>) => {
            eff.frames = effArr;
            this.addChild(eff)
            eff.play(0, false);
            //直播一次的情况
            eff.once(Laya.Event.COMPLETE, this, () => {
                eff.removeSelf();
                eff.clear();
                Laya.Pool.recover("UIeffect", eff);
                var index = this.clickEffectArr.indexOf(eff);
                if (index > -1) {
                    this.clickEffectArr.splice(index, 1);
                };
            });
        });
    }
}