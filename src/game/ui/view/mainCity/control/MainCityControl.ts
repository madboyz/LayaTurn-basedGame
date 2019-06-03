import { PropertyEnumCode } from './../../../../property/RoleProperty';
import { S13002 } from './../../../../../net/pt/pt_13';
import { SRoleData, SRoleEvent } from './../../../../../net/data/SRoleData';
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { MainCityPanel } from '../panel/MainCityPanel';
import { SceneManager } from '../../../../battle/scene/SceneManager';

export class MainCityControl extends BaseControl{
    private protocol:MainCityPanel;
    constructor(){
        super();
        this.panel = new MainCityPanel();
    }

    public get getEvent(): Array<any> {
        return [];
    }

    public set panel(value: MainCityPanel) {
        this.mPanel = value;
    }
    public get panel(): MainCityPanel {
        return this.mPanel as MainCityPanel;
    }

    openView(...args) {
        this.initEvent();
        if(!SGameData.instance.PLAYFIGHTREPORT)
        {
            SceneManager.instance.visibleAll(false);
        }
    }

    closeView() {
        this.removeEvent();
        super.closeView();
        
        if(!SGameData.instance.PLAYFIGHTREPORT)
        {
            SceneManager.instance.visibleAll(true);
        }
    }

    private initEvent() {
    }

    
    private removeEvent() {
    }

    public excuting(notity: NotityData): void {
        var event: any = notity.event;
        var data: any = notity.data;
        var funList: Function[] = [];
        var fun: Function = funList[event];
        fun.call(this, notity.data);
    }

}