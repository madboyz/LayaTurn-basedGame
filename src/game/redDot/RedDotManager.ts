import { RedDotBase } from "./RedDotBase";
import { RedDotList, RedDotType } from "./RedDotList";

//-----------------------------------------------------------------------------------------------  
//-- @description  红点系统
//-- @author  wangji
//-- @release  2018/05/19
//--------------------------------------------------------------------------------------------
export class RedDotManager extends Laya.EventDispatcher {

    private static _instance: RedDotManager
    static get instance(): RedDotManager {
        if (!RedDotManager._instance) {
            RedDotManager._instance = new RedDotManager();
        }
        return RedDotManager._instance
    }

    constructor() {
        super();
    }

    //-----------------------------------------初始化--------------------------------------------------------------
    //进入游戏
    private rdList: RedDotList;
    //红点列表
    private get redDotList():Laya.Dictionary{
        return this.rdList && this.rdList.redDotList;
    }
    //是否进入了游戏
    private _isEnterGame:boolean = false;

    registerEvent() {
        this.rdList = new RedDotList;
        Laya.timer.loop(500, this, this.timeUpdate);

        let redDotListValues = this.redDotList.values;
        for (let i = 0; i < redDotListValues.length; i++) {
            const element = redDotListValues[i];
            element.OnEnterGame();
        }
        this._isEnterGame = true;
    }

    //退出游戏
    unRegisterEvent() {
        if (!this.redDotList) {
            return;
        }
        this._isEnterGame = false;
        Laya.timer.clear(this, this.timeUpdate);

        let redDotListValues = this.redDotList.values;
        for (let i = 0; i < redDotListValues.length; i++) {
            const element = redDotListValues[i];
            element.OnExitGame();
        }
    }

    //0.5s检测一次, 是否有红点发生变化
    timeUpdate() {
        if (!this._isEnterGame) {
            return;
        }
        let tmChanged = [];
        let redDotListKeys = this.redDotList.keys;
        for (let i = 0; i < redDotListKeys.length; i++) {
            let key = redDotListKeys[i];
            let element = this.redDotList.get(key);
            let changed = element.PopChanged();
            if (changed) {
                tmChanged.push(key);
            }
        }
        if (tmChanged.length <= 0) {
            return;
        }
        for (let i = 0; i < tmChanged.length; i++) {
            let element = tmChanged[i];
            this.event(element, this.GetRD(element)._isActiveSave);
        }
    }

    //---------------------接口--------------------------------------------------------
    //获取红点实例
    GetRD(name: RedDotType): RedDotBase {
        return this.redDotList.get(name);
    }

    //获取一系列rd对象的是否激活(只要其中一个激活则返回true, 否则返回false)
    GetIsActive(tlName: RedDotType[]): boolean {
        let isActive: boolean = this.GetIsActiveAndNumber(tlName)[0];
        return isActive;
    }

    //获取一系列rd对象的总数量
    GetNumber(tlName: RedDotType[]) {
        let number: boolean = this.GetIsActiveAndNumber(tlName)[1];
        return number
    }

    //获取一些列rd对象的激活状态和数量
    GetIsActiveAndNumber(tlName: RedDotType[]): Array<any> {
        let isActive = false
        let number = 0
        for (let i = 0; i < tlName.length; i++) {
            let element = tlName[i];
            let rd: RedDotBase = this.GetRD(element);
            if (rd.GetIsActive()) {
                isActive = true
            }
            number = number + rd.GetNumber()
        }
        return [isActive, number];
    }

}