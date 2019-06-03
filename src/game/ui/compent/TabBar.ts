/**
 * tab组建
 * @export
 * @class TabBar
 * @extends {Laya.EventDispatcher}
 */
export class TabBar extends Laya.EventDispatcher {
    public mBars: Array<Laya.Button>;
    /**整个BAR对应的功能ID ，传0或不传，就代表不控制*/
    private mFucDic: Array<number>;
    /**点击的时候的功能反馈，如果存在，判断返回，如果是false，就不动*/
    private mClickCheckFuc: Laya.Handler;

    private curBar: Laya.Button;
    private _select: number = -1;
    public isSelect: boolean = true;//是否选中

    constructor(bars: Array<Laya.Button>, fucDic: Array<number> = null, clickCheckFuc: Laya.Handler = null) {
        super();
        this.mBars = bars;
        this.mFucDic = fucDic;
        this.mClickCheckFuc = clickCheckFuc;
        this.init(bars);
    }
    private init(bars: Array<Laya.Button>): void {
        var i: number = 0;
        var len: number = bars.length;
        var btn: Laya.Button;
        for (i; i < len; i++) {
            btn = bars[i];
            btn.on(Laya.Event.CLICK, this, this.onClickBar);
            btn.on(Laya.Event.MOUSE_OVER, this, this.onOverBar);
            btn.on(Laya.Event.MOUSE_OUT, this, this.onOutBar);
        }
    }
    private onClickBar(e: Event): void {
        var bar: any = e.currentTarget;
        if (bar.selected) return;
        var selectIdx = this.mBars.indexOf(bar)
        //检查功能是否开启
        if (this.mFucDic && this.mFucDic[selectIdx] && this.mFucDic[selectIdx] > 0) {
            var openFuc = UIManager.instance.fuc;
            if (openFuc && !openFuc.isOpen(this.mFucDic[selectIdx])) {
                return;
            }
        }
        //是否有点击反馈功能
        if (this.mClickCheckFuc) {
            var clickBack = this.mClickCheckFuc.runWith(selectIdx);
            if (clickBack == false) {
                return;
            }
        }
        if (this.curBar) this.curBar.selected = false;
        this.isSelect && (bar.selected = true);
        this.curBar = bar;
        this.select = selectIdx;
    }

    private onOverBar(e: Event): void {
        var bar: any = e.currentTarget;
        if (bar.selected) return;
        this.setOver(bar);
    }

    private onOutBar(e: Event): void {
        var bar: any = e.currentTarget;
        if (bar.selected) return;
        this.setOut();
    }

    public dispose(): void {
        var i: number = 0, len: number = this.mBars.length;
        for (i; i < len; i++) {
            this.mBars[i].off(Laya.Event.CLICK, this, this.onClickBar);
            this.mBars[i].off(Laya.Event.MOUSE_OVER, this, this.onOverBar);
            this.mBars[i].off(Laya.Event.MOUSE_OUT, this, this.onOutBar);
        }
        this.mBars.length = 0;
        this._select = -1;
        this.isSelect = true;
        this.mClickCheckFuc && this.mClickCheckFuc.recover();
        this.mClickCheckFuc = null;
    }

    public set select(value: number) {
        if (this.mBars[value]) {
            //检查功能是否开启
            if (this.mFucDic && this.mFucDic[value] && this.mFucDic[value] > 0) {
            var openFuc = UIManager.instance.fuc;
                if (openFuc && !openFuc.isOpen(this.mFucDic[value])) {
                    value = 0;
                }
            }
            this.isSelect && (this.mBars[value].selected = true);
            this._select = value;
            var i: number = 0, len: number = this.mBars.length;
            for (i; i < len; i++) {
                if (i != value) {
                    this.mBars[i].selected = false;
                }
            }
            this.setOver(this.mBars[value]);
            this.event(Laya.Event.CHANGE, [value, this.mBars[value]]);
            UIManager.instance.event(UIManagerEvent.TAB_BAR_CHANGE);
        }
        else {
            this._select = value;
        }
    }
    public get select(): number {
        return this._select;
    }

    public get btnList(): Array<Laya.Button> {
        return this.mBars;
    }

    public setOver(btn: Laya.Button): void {
        var i: number = 0, len: number = this.mBars.length;
        for (i; i < len; i++) {
            if (this.mBars[i] == btn) {
                // this.mBars[i].selected = true;
            }
            else {
                if (this.mBars[i].selected == false) {
                    this.mBars[i].selected = false;
                }
            }
        }
    }

    public setOut(): void {
        var i: number = 0, len: number = this.mBars.length;
        for (i; i < len; i++) {
            if (this.mBars[i].selected) {
                // this.mBars[i].selected = true;
            }
            else {
                if (this.mBars[i].selected == false) {
                    this.mBars[i].selected = false;
                }
            }
        }
    }
    public set visible(value: boolean) {
        var i: number = 0, len: number = this.mBars.length;
        for (i; i < len; i++) {
            this.mBars[i].visible = value;
        }
    }
}