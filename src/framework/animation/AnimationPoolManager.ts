import { LocalPlayerView } from "../../game/battle/role/LocalPlayerView";
import { Debug } from "../../debug/Debug";

export class AnimationPoolManager extends Laya.EventDispatcher {
    private static _instance: AnimationPoolManager;
    public static get instance(): AnimationPoolManager {
        return AnimationPoolManager._instance || (AnimationPoolManager._instance = new AnimationPoolManager());
    }
    constructor(){
        super();
    }
    public CheckDeepPoolRes(localPlayer:LocalPlayerView)
    {
        //回收怪物宠物相关的动画资源
        var aniMap = Laya.Animation.framesMap;
        for (const key in aniMap) {
            var petUrlHead = `${ResUtils.role}pet_`;
            var roleUrlHead = `${ResUtils.role}role`;
            if(key.indexOf(petUrlHead) != -1 )
            {
                Laya.Animation.clearCache(key);
                Laya.loader.clearTextureRes(key);
            }
            else if(localPlayer)//找出非本职业的玩家动画模型 释放掉非run跟stand的动画资源
            {
                if(localPlayer.resPath != ""&&key.indexOf(roleUrlHead) != -1
                &&key.indexOf(localPlayer.resPath) == -1)
                {
                    if(key.indexOf(Action.run) == -1&&key.indexOf(Action.stand) == -1)
                    {
                        Laya.Animation.clearCache(key);
                        Laya.loader.clearTextureRes(key);
                    }
                }
            }
        }
    }
}