export class DataManager extends Laya.EventDispatcher {

    /**单帧消息派发超时时间*/
    public timeout: number = 40;
    /* 消息锁 */
    protected _isBlock: Boolean;
    /* 消息队列 */
    protected _msgs: Array<any> = [];

    constructor() {
        super();
    }

    private static mInstance: DataManager;


    public static get instance(): DataManager {
        return DataManager.mInstance || (DataManager.mInstance = new DataManager());
    }

    private dataDic: Object = {};
    public add(key: string, data: any, save: boolean = true): void {
        this._msgs.push(String(key), data);
        save && (this.dataDic[key] = data);
        !this._isBlock && this._dispatch();
    }

    public set(key: number, data: any, save: boolean): void {
        this._msgs.push(String(key), data);
        save && (this.dataDic[key] = data);
    }

    /**
     * 直接派发数据更新事件，功能同event
     * @param	type 事件类型
     * @param	data 数据
     */
    public notify(type: number, data: any = null): void {
        this.event(String(type), data);
    }

    /**
     * 监听消息
     * @param clz 消息类
     * @param caller 执行域
     * @param fun 回调函数
     * @param params 参数
     */
    public static listen(id: number, caller: Object, fun: Function, params: Array<any> = null): void {
        DataManager.instance.on(String(id), caller, fun, params);
    }

    /**
     * 取消监听
     * @param clz 消息类
     * @param caller 执行域
     * @param fun 回调函数
     */
    public static cancel(id: number, caller: Object, fun: Function): void {
        DataManager.instance.off(String(id), caller, fun);
    }

    public static asyncListen(id: number): any {
        return new Promise((resolve, reject) => {
            DataManager.listen(id, DataManager, (data) => {
                resolve(data);
            });
        })
    }

    /**
     * 获取数据
     * @param clz 消息类
     * @return
     */
    public static getData(id: number): any {
        return DataManager.instance.dataDic[id];
    }

    private _dispatch(): any {
        this._isBlock = true;
        while (this._msgs.length) {
            var key: string = this._msgs.shift();
            var msg: any = this._msgs.shift();
            this.event(key, msg);
            if (Laya.stage.getTimeFromFrameStart() > this.timeout) {
                Laya.timer.frameOnce(1, this, this._dispatch);
                return;
            }
        }
        this._isBlock = false;
    }


    /**
     * 移除数据缓存
     * @param	id 索引
     */
    public remove(id: number): void {
        delete this.dataDic[id];
    }

    /**
     * 从缓存中获得数据
     * @param	key 索引
     */
    public get(id: number): any {
        return this.dataDic[id];
    }

    /**
     * 缓存中是否有索引为key的数据
     * @param	key 索引
     */
    public has(id: number): Boolean {
        return this.dataDic[id] != null;
    }
}