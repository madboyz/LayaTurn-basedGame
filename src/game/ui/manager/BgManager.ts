class BgManager {
    // private static _bgDic:Laya.Dictionary = new Laya.Dictionary();
    constructor() {
        
    }

    public static getBg(layer:number):any
    {
        var bg:any;
        switch (layer) {
            case UILEVEL.POP_2:
                // bg = this._bgDic.get(UILEVEL.POP_2);
                // if(!bg)
                // {
                    bg = Laya.Pool.getItemByClass("bg",NewCommonBg);
                //     this._bgDic.set(UILEVEL.POP_2,bg);
                // }
                break;
            case UILEVEL.POP_3:
                // bg = this._bgDic.get(UILEVEL.POP_3);
                // if(!bg)
                // {
                    bg = Laya.Pool.getItemByClass("bg",CommonBg);
                //     this._bgDic.set(UILEVEL.POP_3,bg);
                // }
                break;
            default:
                bg = Laya.Pool.getItemByClass("bg",CommonBg);
                break;
        }
        return bg;
    }
}