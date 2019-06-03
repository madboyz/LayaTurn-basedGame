/**
 * 屏蔽字符管理器
 * @export
 * @class FliterManager
 * @extends {Laya.EventDispatcher}
 */
export class FliterManager extends Laya.EventDispatcher {
    private static _instance: FliterManager;
    private _filterStr:string;
    
    private _wordMap:object = {};
    constructor() {
        super();
    }

    public static get instance(): FliterManager {
        return FliterManager._instance || (FliterManager._instance = new FliterManager());
    }

    public dbUrl: string = "data/filterWord.json";

    private data: any;

    public load(onComplete: Function): void {
        Laya.loader.load(this.dbUrl, Laya.Handler.create(this, function (): void {
            var time: number = new Date().getTime();
            var json = Laya.loader.getRes(this.dbUrl);
            this.data = json["test"][0].split(/\s/g);
            Laya.loader.clearRes(this.dbUrl);
            this.createRegExpStr();
            onComplete && onComplete();
        }), null, Laya.Loader.JSON);
    }
       	
    private createRegExpStr():void
    {
        var len:number = this.data.length;
        for( var i:number=0;i<len;i++ )
        {
            this.addWord(this.data[i]);
        }
    }
    public addWord( value:string ):void
    {
        value = value.replace("\n","");
        if(value != null && value.length > 0)
        {
            var dic:string;
            var s:string = value.charAt(0);
            dic = this._wordMap[s] as string;
            if( dic )
            {
                this._wordMap[s] += "|"+value;
            }
            else
            {
                this._wordMap[s] = value;
            }				
        }
    }

    /**
     * 是否含有过滤关键字 
     * @param str
     * @return 
     * 
     */		
    public isHaveFilterTxt(str:string):Boolean
    {
        var str2:string = this.getFilterStr(str);
        return !(str2 == str);
    }

    /**
     * 获取过滤后的字符串 
     * @param str
     * @return 
     * 
     */       	
    public getFilterStr(str:string):string
    {
        if(GameConfig.GAME_SHOWFLITER)
        {
            if(null==str||str=="") return "";
            //根据正则替换字符串
            var len:number = str.length;
            var s:string;
            var ws:any;
            for( var i:number=0;i<len;i++  )
            {
                s = str.charAt(i);
                if(s != "*")
                {
                    ws = this._wordMap[ s ];
                    if(typeof(ws) == "string")
                    {
                        ws = this._wordMap[ s ] = new RegExp( "("+ws+")","img" );
                    }
                    str = str.replace(ws,this.regHandler);
                }
            }
        }
        return str;
    }

    /**
     * 处理过滤的函数 
     * @return 
     * 
     */       	
    private regHandler():string
    {
        //获取正则获取的字符串
        var s:string = arguments[1].toString();
        //替换成*
        return s.replace(/.{1}/g,"*");
    }
}