export class Debug {


    /**
     * 打印服务器消息
     * 
     * @static
     * @param {any} args 
     * 
     * @memberOf Debug
     */
    public static serverLog(...args): void {
        if(!GameConfig.GAME_DEBUG)return;
        if(laya.utils.Browser.onPC&&!laya.utils.Browser.onAndroid)
        console.log.apply(null,args);
        else
        console.log(args);
    }

    public static serverAlert(...args):void {
        if(!GameConfig.GAME_DEBUG)return;
        alert(args);
    }


}