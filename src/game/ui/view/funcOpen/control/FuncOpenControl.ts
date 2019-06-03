import { SActiveData, SActiveEvent } from "../../active/data/SActiveData";
import { FuncOpenProtocol } from "../protocol/FuncOpenProtocol";
import { FuncOpenPanel } from "../panel/FuncOpenPanel";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";

export class FuncOpenControl extends BaseControl {

    private protocol: FuncOpenProtocol;

    constructor() {
        super();
        this.panel = new FuncOpenPanel();
        this.protocol = new FuncOpenProtocol();
    }

    public set panel(value: FuncOpenPanel) {
        this.mPanel = value;
    }

    public get panel(): FuncOpenPanel {
        return this.mPanel as FuncOpenPanel;
    }

    openView(...args) {
        this.initEvent();
        this.panel.visible = !SGameData.instance.PLAYFIGHTREPORT;
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        this.panel.on(SGameEvent.GAME_NEWSYSTE_GETREWARD,this,this.onSend13072);
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.changeBattle)
    }
    private removeEvent() {
        this.panel.off(SGameEvent.GAME_NEWSYSTE_GETREWARD,this,this.onSend13072);
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.changeBattle)
    }

    private changeBattle():void{
        this.panel.visible = !SGameData.instance.PLAYFIGHTREPORT;
    }

    //isGet操作状态（1领取，0查询）
    private onSend13072(sysCode: number): void {
        this.protocol.send13072(sysCode);
    }

}