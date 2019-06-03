export class NumStep extends ui.main.NumStepUI {
    private _max: number;
    private _min: number;
    private _step: number;
    private _stepAdd:number;
    private _currentNum: number;
    private _mode: number = 1;// 1显示完整的 2直显示加减 3只显示递增递减
    constructor() {
        super();
        this.initComp();
    }

    private initComp(): void {
        this.txt_num.restrict = "0-9";
        this.addEvent();
    }

    private addEvent(): void {
        this.btn_stepAdd.on(Laya.Event.CLICK, this, this.onMax);
        this.btn_stepShut.on(Laya.Event.CLICK, this, this.onMin);
        this.btn_add.on(Laya.Event.CLICK, this, this.onAdd);
        this.btn_shut.on(Laya.Event.CLICK, this, this.onShut);
        this.btn_shut.on(Laya.Event.MOUSE_DOWN,this,this.onContinueShut);
        this.btn_shut.on(Laya.Event.MOUSE_UP,this,this.onclearShut);
        this.btn_add.on(Laya.Event.MOUSE_DOWN,this,this.onContinueAdd);
        this.btn_add.on(Laya.Event.MOUSE_UP,this,this.onclearAdd);
    }

    private removeEvent(): void {
        this.btn_stepAdd.off(Laya.Event.CLICK, this, this.onMax);
        this.btn_stepShut.off(Laya.Event.CLICK, this, this.onMin);
        this.btn_add.off(Laya.Event.CLICK, this, this.onAdd);
        this.btn_shut.off(Laya.Event.CLICK, this, this.onShut);
        this.btn_shut.off(Laya.Event.MOUSE_DOWN,this,this.onContinueShut);
        this.btn_shut.off(Laya.Event.MOUSE_UP,this,this.onclearShut);
        this.btn_add.off(Laya.Event.MOUSE_DOWN,this,this.onContinueAdd);
        this.btn_add.off(Laya.Event.MOUSE_UP,this,this.onclearAdd);
    }

    /**
     * 设置显示模式 1显示完整的 2直显示加减 3只显示最大和最小
     * @memberof NumStep
     */
    public set mode(value: number) {
        this._mode = value;
        this.updateMode();
    }

    /**
     * 设置最大数量
     * @memberof NumStep
     */
    public set max(value: number) {
        this._max = value;
    }

    public get max(): number {
        return this._max;
    }

    /**
     * 设置最小
     * @memberof NumStep
     */
    public set min(value: number) {
        this._min = value;
    }

    public get min(): number {
        return this._min;
    }

    /**
     * 设置没点击一次加多少数量
     * @memberof NumStep
     */
    public set step(value: number) {
        this._step = value;
    }

    public get step(): number {
        return this._step;
    }

    /**
     * 设置没点击一次多数量按钮加减数量
     * @memberof NumStep
     */
    public set stepAdd(value: number) {
        this._stepAdd = value;
        this.txt_shut.text = this.txt_add.text = this._stepAdd.toString();
    }

    public get stepAdd(): number {
        return this._stepAdd;
    }

    /**
     * 当前数量
     * @memberof NumStep
     */
    public set currentNum(value: number) {
        this._currentNum = value;
        this.updateTxt();
    }

    public get currentNum(): number {
        return this._currentNum;
    }

    private onContinueAdd():void
    {
        Laya.timer.loop(100,this,this.onAdd);
    }

    private onclearAdd():void
    {
        Laya.timer.clear(this,this.onAdd);
    }

    private onContinueShut():void
    {
        Laya.timer.loop(100,this,this.onShut);
    }

    private onclearShut():void
    {
        Laya.timer.clear(this,this.onShut);
    }

    private onAdd(): void {
        if (this._currentNum + this.step <= this.max) {
            this.currentNum += this.step;
        }
    }

    private onShut(): void {
        if (this._currentNum - this.step >= this.min) {
            this.currentNum -= this.step;
        }
    }

    private onMax(): void {
        if (this._currentNum + this.stepAdd <= this.max) {
            this.currentNum += this.stepAdd;
        }
        else
        this.currentNum = this.max;
    }

    private onMin(): void {
        if (this._currentNum - this.stepAdd >= this.min) {
            this.currentNum -= this.stepAdd;
        }
        else
        this.currentNum = this.min;
    }

    private updateTxt(): void {
        this.txt_num.text = this._currentNum.toString();
        this.event(Laya.Event.CHANGE);
    }

    private updateMode(): void {

        switch (this._mode) {
            case 1:
                this.btn_add.visible = this.btn_stepAdd.visible = this.btn_stepShut.visible = this.btn_shut.visible = true;
                break;
            case 2:
                this.btn_add.visible = this.btn_shut.visible = true;
                this.btn_stepAdd.visible = this.btn_stepShut.visible = false;
                break;
            case 3:
                this.btn_add.visible = this.btn_shut.visible = false;
                this.btn_stepAdd.visible = this.btn_stepShut.visible = true;
                this.btn_stepAdd.x = 298, this.btn_shut.x = 115;
                break;
        }
    }

    public clear():void{
        Laya.timer.clear(this,this.onAdd);
        Laya.timer.clear(this,this.onShut);
    }

    public removeSelf(): any {
        this._mode = 1;
        this._min = 1;
        this._max = 1;
        this._step = 1;
        this._currentNum = 1;
        this._stepAdd = 1;
        this.removeEvent();
        super.removeSelf();
    }
}