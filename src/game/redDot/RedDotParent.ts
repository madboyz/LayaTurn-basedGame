import { RedDotBase } from "./RedDotBase";
import { RedDotType } from "./RedDotList";
import { RedDotManager } from "./RedDotManager";

//-----------------------------------------------------------------------------------------------  
//-- @description  红点基类
//-- @author  wangji
//-- @release  2018/05/19
//--------------------------------------------------------------------------------------------

export class RedDotParent extends RedDotBase{
    private _childList:Array<RedDotType>;

    constructor(childList:Array<RedDotType>) {
        super();
        this._childList = childList;
    }

    //开启
    OnEnterGame(): void {

    }

    //停止
    OnExitGame(): void {

    }

    //获取红点是否激活
    GetIsActive(): boolean {
        for (let i = 0; i < this._childList.length; i++) {
            var ele:RedDotType = this._childList[i];
            var redDot = RedDotManager.instance.GetRD(ele);
            if(redDot._isActiveSave){
                return true;
            }
        }
        return false
    }

    //获取数量
    GetNumber(): number {
        var numberSave:number = 0;
        for (let i = 0; i < this._childList.length; i++) {
            var ele:RedDotType = this._childList[i];
            var redDot = RedDotManager.instance.GetRD(ele);
            numberSave += redDot._numberSave;
        }
        return numberSave;
    }

}
