//import { SGameData } from "../../net/data/SGameData";

type Dictionary = Laya.Dictionary;
/**
 * UI管理器
 * @class UIManager
 */
class UIManager extends Laya.EventDispatcher {
    constructor() {
        super();
        this.layerDic = {};
        this.uiClsDic = new Laya.Dictionary();
        this.viewDic = [];
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
    }

    private static mInstance: UIManager;
    public static get instance(): UIManager {
        return UIManager.mInstance || (UIManager.mInstance = new UIManager);
    }

    private mUILayer: Laya.Sprite;
    /* 设置UI的层级 */
    public set uiLayer(value: Laya.Sprite) {
        this.mUILayer = value;
        for (let i = UILEVEL.POP_1; i <= UILEVEL.POP_5; i++) {
            this.getLayerSp(i);
        }
    }
    /**
     * 获得层级sprite
     * @param index 
     */
    public getPopLayerByIndex(index:number):Laya.Sprite
    {
        var layer:Laya.Sprite = null;
        layer = this.layerDic[index];
        return layer
    }

    public get uiLayer(): Laya.Sprite {
        return this.mUILayer;
    }
    private layerDic: Object = null;
    private viewDic: Array<any>;
    private uiClsDic: Dictionary = null;
    public fuc: any;
    /**
     * 打开UI面板
     * @param {number} index panel id UILEVEL注册的id
     * @param {number} [layer=UILEVEL.POP_1] 层级
     * @param {any} args 
     * @returns {void} 
     * @memberof UIManager
     */
    public openUI(index: number, args: Array<any> = null, tabIndex: number = 0, layer: number = null): void {

        //获取面板对象 
        var viewObj: UIBase = this.getViewObj(index);

        //面板已经显示
        if (this.hasOpenUI(index)) {
            viewObj.arg = args;
            viewObj.tabIndex = tabIndex;
            viewObj.update();
            (layer != null) && (viewObj.layer = layer);
            this.event(UIManagerEvent.OPEN_UI, [index, viewObj.layer , true]);
            return;
        }
        if (this.fuc && !this.fuc.isOpen(index)) //判断是否需要功能开启
        {
            return;
        }
        viewObj.needOpen = true;
        //设置不能点击,面板正在打开中，不给任何点击操作 如果资源没加载出来还让玩家去点
        Laya.MouseManager.enabled = false;
        Laya.timer.once(1000,this,()=>{
            Laya.MouseManager.enabled = true;
        });
        var This: UIManager = this;
        viewObj.closeTime = 0;//关闭时间设置0，表示不用清理资源
        UILoadManager.instance.load(index, viewObj.resouce, Laya.Handler.create(this, function () {

            //加载完成后，恢复点击，并添加到指定的层级
            Laya.MouseManager.enabled = true;
            if (!viewObj.needOpen) {
                return;
            }
            viewObj.index = index;
            (layer != null) && (viewObj.layer = layer);
            viewObj.arg = args;
            viewObj.tabIndex = tabIndex;
            This.viewDic.push(viewObj);
            //获取层级的对象 
            var layerSp: Laya.Sprite = This.getLayerSp(viewObj.layer);
            layerSp.addChild(viewObj as Laya.Node);
            if(viewObj.layer == UILEVEL.POP_3)
            {
                var pop2Layer = This.layerDic[UILEVEL.POP_2];
                pop2Layer.visible = false;
            }else if (viewObj.layer == UILEVEL.POP_2){
                var pop2Layer = This.layerDic[UILEVEL.POP_2];
                pop2Layer.visible = true;
            }
            // viewObj.centerX = (Laya.stage.width - viewObj.width) / 2 >> 0;//sLaya.stage.scaleMode == Laya.Stage.SCALE_FIXED_WIDTH ? (Laya.stage.width - viewObj.width) / 2 >> 0 : (Laya.Browser.width - viewObj.width) / 2 >> 0;
            viewObj.open.apply(viewObj, args);
            var control: BaseControl = This.getViewControl(index);
            control.index = index;
            control.openView.apply(control, args);
            This.sameLevelEliminate(index, viewObj, layerSp);//是否排斥同级的面板
            This.event(UIManagerEvent.OPEN_UI, [index, viewObj.layer , false]);
        }));
    }
    /* 关闭指定的面板 
       @index 面板索引
    */
    public closeUI(index: number): void {
        var viewObj: UIBase = this.getViewObj(index);
        viewObj.needOpen = false;
        this.closeUIByObj(index, viewObj);
        if (viewObj.resouce) {
            for (let i = 0; i < viewObj.resouce.length; i++) {
                const element = viewObj.resouce[i];
                UILoadManager.instance.removeReference(element.url);
            }
        }
        if(viewObj.layer == UILEVEL.POP_3)
        {
            var pop2Layer = this.layerDic[UILEVEL.POP_2];
            pop2Layer.visible = true;
        }
        this.event(UIManagerEvent.CLOSE_UI, [index, viewObj.layer]);
    }

    public CheckRemoveViewDic(index: number) {
        var viewObj: UIBase = this.getViewObj(index);
        var i: number = this.viewDic.indexOf(viewObj);
        if (i == -1) return;//没有显示，不能关闭这个面板
        if(viewObj.layer == UILEVEL.POP_3)
        {
            var pop2Layer = this.layerDic[UILEVEL.POP_2];
            pop2Layer.visible = true;
        }
        var control: BaseControl = this.getViewControl(viewObj.index);
        control.closeView();
        this.viewDic.splice(i, 1);
    }

    /* 关闭指定的面板 不推荐使用
      * @viewObj 面板实列
    */
    public closeUIByObj(index: number, viewObj: UIBase): void {
        var i: number = this.viewDic.indexOf(viewObj);
        if (i == -1) return;//没有显示，不能关闭这个面板
        // if (viewObj.isOpen && viewObj.parent) {
        var control: BaseControl = this.getViewControl(viewObj.index);
        control.closeView();
        this.viewDic.splice(i, 1);
        // this.closeOpen(viewObj);
        viewObj.close();//关闭面板
        // }
    }
    /**
     * 获取面板关闭后的时间差
     * @param index 面板索引 
     * return  -1该面板没有打开过
     */
    public getUICloseTimer(index: number): number {
        //尝试拿一个面板的时间
        try {
            var viewObj: UIBase = this.getViewObj(index);
        } catch (e) {
            return -1;//没有打开过
        }
        if (viewObj.closeTime == 0) {
            return -1;
        }
        return Laya.Browser.now() - viewObj.closeTime;
    }
    /* 是否指定的面板已经打开
       @index  面板索引
    */
    public hasOpenUI(index: number): boolean {
        var viewObj: UIBase = this.getViewObj(index);
        var i: number = this.viewDic.indexOf(viewObj);
        if (i == -1) return false;//没有显示 ，返回false
        if (viewObj.isOpen && viewObj.parent) {
            return true;
        }
        return false;
    }
    /**
     * 获得一个已经打开的面板
     * @param index 
     */
    public getHasOpenUI(index: number): UIBase {
        if (!index) return null;
        var viewObj: UIBase = this.getViewObj(index);
        var i: number = this.viewDic.indexOf(viewObj);
        if (i == -1) return null;//没有显示 ，返回false
        if (viewObj.isOpen && viewObj.parent) {
            return viewObj;
        }
        return null;
    }

    /* 互斥面板 */
    private sameLevelEliminate(index: number, viewObj: UIBase, layerSp: Laya.Sprite): void {
        if (viewObj.sameLevelEliminate && layerSp.numChildren > 0) {//排斥同级的面板，既关悼同级的所有面板
            var arr: Array<any> = layerSp._childs;
            var child: UIBase;
            for (var i: number = 0; i < arr.length; i++) {
                child = arr[i];
                if (child != viewObj && child.sameLevelEliminate)
                    this.closeUIByObj(index, child);//关悼互斥的面板
            }
        }
    }
    /**
     * 根据层级查找是否有正在显示的ui
     * @param layer 
     */
    public getLayerPanelHasOpen(layer: number) {
        var layerSp: Laya.Sprite = this.layerDic[layer];
        if (!layerSp)
            return false;
        else
            return layerSp.numChildren > 0 ? true : false;
    }


    public closePanelByLayer(layer: number) {
        if (!this.viewDic) return;
        for (let i = 0; i < this.viewDic.length; i++) {
            const element: UIBase = this.viewDic[i];
            if (element.layer == layer) {
                this.closeUI(element.index);
            }
        }
    }

    /* 获取指定的层级 */
    private getLayerSp(layer: number): Laya.Sprite {
        var layerSp: Laya.Sprite = this.layerDic[layer];
        if (!layerSp) {
            layerSp = new Laya.Sprite();
            layerSp.width = Laya.stage.width;
            layerSp.height = Laya.stage.height;
            layerSp.mouseThrough = true;
            this.layerDic[layer] = layerSp;
            //根据layer重新排列层次
            for (var key in this.layerDic) {
                this.mUILayer.addChild(this.layerDic[key]);
            }
        }
        return layerSp;
    }

    public resize(): void {
        for (const layer in this.layerDic) {
            var layerSp: Laya.Sprite = this.layerDic[layer];
            layerSp.width = Laya.stage.width;
            layerSp.height = Laya.stage.height;
        }
    }

    private getViewControl(index: number): BaseControl {
        var control: any = this.uiClsDic.get(index);
        if (!(control instanceof BaseControl)) {
            control = new control();
            this.uiClsDic.set(index, control);
        }
        return control;
    }

    /* 获取面板实列对象 */
    public getViewObj(index: number): UIBase {
        //从字典拿，如果拿到的是字符串，就反射出该面板类，并new出来，创建实例保存
        var viewObj: UIBase;
        var control: BaseControl = this.getViewControl(index);
        viewObj = control.panel;
        return viewObj;
    }

    /* 注册面板
    @index 索引
    @cls 面板控制类
    */
    public registUIClass(index: number, cls: any): void {
        this.uiClsDic.set(index, cls);
    }


    public addFromLayer(sp: Laya.Sprite, layer: number): void {
        var layerSp: Laya.Sprite = this.getLayerSp(layer);
        layerSp.addChild(sp);
    }

    public removeFromeLayer(sp: Laya.Sprite): void {
        sp && sp.removeSelf();
    }

    public loadUIEffect(name: string) {
        var THIS = this;
        var tempName = name.split("@@");
        var url = (tempName[1] == "full") ? tempName[0] : ResUtils.getUIEffect(name);
        return new Promise((resolve, reject) => {
            Laya.loader.load(url, Laya.Handler.create(this, function (): void {
                resolve(THIS.getFrames(url));
            }), null, Laya.Loader.ATLAS);
        });
    }

    private getFrames(url: string): Array<any> {
        var frames: Array<any> = Laya.Animation.framesMap[url];//先从缓存拿
        if (frames) return frames;
        return Laya.Animation.createFrames(url, url);//缓存拿不到，创建出来
    }
}
enum UIManagerEvent {
    UI_CHECK_RED = "ui_check_red",//检查红点
    OPEN_UI = "open_ui",//打开界面
    CLOSE_UI = "close_ui",//关闭界面
    TAB_BAR_CHANGE = "tab_bar_change",//页签切换
}