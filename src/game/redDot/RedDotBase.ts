//-----------------------------------------------------------------------------------------------  
//-- @description  红点基类
//-- @author  wangji
//-- @release  2018/05/19
//--------------------------------------------------------------------------------------------

export class RedDotBase {

    constructor() {
    }

    public _isActiveSave: boolean = false;
    public _numberSave: number = 0;

    //获取上一次的改变
    PopChanged(): boolean {
        let isActive = this.GetIsActive()
        let number = this.GetNumber()
        let changed = false;
        if (this._isActiveSave != isActive) {
            changed = true
            this._isActiveSave = isActive
        }
        if (this._numberSave != number) {
            changed = true
            this._numberSave = number
        }
        return changed;
    }
    
    //-------------------------以下函数可重写--------------------------------------------------------------------------

    //开启
    OnEnterGame(): void {

    }

    //停止
    OnExitGame(): void {

    }

    //获取红点是否激活
    GetIsActive(): boolean {
        return false
    }

    //获取数量
    GetNumber(): number {
        return 0;
    }

}
