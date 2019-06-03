class UILoadManager {

    private time: number = 1000 * 5;//定时查看ui关闭的时间
    constructor() {
        this.resouceDic = new Laya.Dictionary();
        this.AtlasReferNums = new Laya.Dictionary();
        Laya.timer.loop(this.time, this, this.checkMemory);
    }

    private checkMemory(): void {
        var keys: number[] = this.resouceDic.keys;
        var shield: string[] = this.shieldRes();
        for (var i: number = keys.length - 1; i >= 0; i--) {
            var closeTime: number = UIManager.instance.getUICloseTimer(keys[i]);//获取关闭时间
            if (closeTime < this.time) continue;
            var source: Array<any> = this.resouceDic.values[i];
            for (var j: number = 0; j < source.length; j++) {
                var url: string = source[j].url;
                var num  = this.AtlasReferNums.get(url);
                if(num <= 0 &&shield.indexOf(url) == -1)
                {
                    Laya.Loader.clearTextureRes(url);
                }
                
                this.resouceDic.remove(keys[i]);
            }
        }
    }

    //需要屏蔽的资源，比如公共资源等
    private shieldRes(): string[] {
        return [
            "res/atlas/comp.atlas",//公共资源不需要移除
            "res/atlas/itemBase.atlas", 
            "res/atlas/main.atlas",//主城资源不需要移除
            "res/atlas/battle/lv.atlas", //战斗数字
            "res/atlas/battle/hong.atlas", //战斗数字
            "res/atlas/battle/lan.atlas", //战斗数字
            "res/atlas/number/fight.atlas",//战斗数字
        ];
    }

    private static mInstance: UILoadManager;
    public static get instance(): UILoadManager {
        return UILoadManager.mInstance || (UILoadManager.mInstance = new UILoadManager());
    }

    private AtlasReferNums:Laya.Dictionary;

    private resouceDic: Laya.Dictionary;

    public preLoadAtlas(onComplete: Laya.Handler)
    {
        var resList = [
            "res/atlas/comp.atlas", 
            "res/atlas/itemBase.atlas", 
            "res/atlas/startgame.atlas",
            "res/atlas/guide.atlas",
            "res/atlas/loginReward.atlas", 
            "res/atlas/task.atlas",
            "res/atlas/createRole1.atlas", 
            "res/atlas/main.atlas", 
            "res/atlas/battle/lv.atlas", 
            "res/atlas/battle/hong.atlas", 
            "res/atlas/number/fight.atlas", 
            "res/atlas/battle.atlas"
        ];
        this.resouceDic.set(1, [{ url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS }]);
        this.resouceDic.set(2, [{ url: "res/atlas/itemBase.atlas", type: Laya.Loader.ATLAS }]);
        this.resouceDic.set(UIID.START_GAME, [{ url: "res/atlas/startgame.atlas", type: Laya.Loader.ATLAS }]);
        this.resouceDic.set(UIID.SYS_TASK, [{ url: "res/atlas/task.atlas", type: Laya.Loader.ATLAS }]);
        this.resouceDic.set(UIID.GUIDE_MASK, [{ url: "res/atlas/guide.atlas", type: Laya.Loader.ATLAS }]);
        this.resouceDic.set(UIID.SYS_LOGIN_REWARD, [{ url: "res/atlas/loginReward.atlas", type: Laya.Loader.ATLAS },]);
        this.resouceDic.set(UIID.BATTLE_POWER_PANEL, [{ url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/battle/lv.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/battle/hong.atlas", type: Laya.Loader.ATLAS },
        { url: "res/atlas/number/fight.atlas", type: Laya.Loader.ATLAS }]);
        this.resouceDic.set(UIID.CREATE_ROLE, [/*{ url: "res/atlas/createRole.atlas", type: Laya.Loader.ATLAS },*/{ url: "res/atlas/createRole1.atlas", type: Laya.Loader.ATLAS }]);
        this.resouceDic.set(UIID.HUD_MAIN, [{ url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS }]);
        this.resouceDic.set(UIID.FIGHT_MAIN, [{ url: "res/atlas/battle.atlas", type: Laya.Loader.ATLAS }]);
        for (let i = 0; i < resList.length; i++) {
            const element = resList[i];
            Laya.loader.load(element, onComplete,null,Laya.Loader.ATLAS);
        }
        
    }

    public load(index: number, sourece: Array<any>, onComplete: Laya.Handler): void {
        if (!sourece||(sourece&&sourece.length == 0)) {
            onComplete.run();
            return;
        }
        this.resouceDic.set(index, sourece);
        var THIS = this;
        Laya.loader.load(sourece, Laya.Handler.create(this, function () {
            // onComplete.run();
            this.upLoadToGpu(onComplete, sourece);
            for (let i = 0; i < sourece.length; i++) {
                const element = sourece[i];
                THIS.addReference(element.url);
            }
        })
        );
    }

    public addReference(url:string)
    {
        var num = this.AtlasReferNums.get(url);
        if(num == null)
        {
            num = 1;
        }
        else
        num ++;
        this.AtlasReferNums.set(url , num);
    } 

    public removeReference(url:string)
    {
        var num = this.AtlasReferNums.get(url);
        if(num != null)
        {
            num --;
            this.AtlasReferNums.set(url , num);
        }
    }
    
    private upLoadToGpu(onComplete: Laya.Handler, source: Array<any>): void {
        for (var i: number = 0; i < source.length; i++) {
            var obj: any = source[i];
            var arr: any = Laya.Loader.getAtlas(obj.url);
            var res: any = (arr && arr.length > 0) ? Laya.Loader.getRes(arr[0]) : Laya.Loader.getRes(obj.url);
            if (res && res.bitmap && !res.source) {
                res.bitmap.once(Laya.Event.RECOVERED, this, () => {
                    onComplete.run();
                })
                res.active();//激活资源
            } else {
                onComplete.run();
            }
        }
    }
}