import { SActiveData, SActiveEvent } from "../../active/data/SActiveData";
import { JJCPanel } from "../panel/JJCPanel";
import { JJCProtocol } from "../protocol/JJCProtocol";
import { SJJCData, SJJCEvent } from "../data/SJJCData";
import { S23001, S23005_1 } from "../../../../../net/pt/pt_23";

export class JJCControl extends BaseControl {
    private protocol: JJCProtocol;
    constructor() {
        super();
        this.panel = new JJCPanel();
        this.protocol = new JJCProtocol();
        this.initEvent();
    }

    public set panel(value: JJCPanel) {
        this.mPanel = value;
    }

    public get panel(): JJCPanel {
        return this.mPanel as JJCPanel;
    }

    openView(...args) {
        this.initEvent();
        this.requestBase();
        this.requesyEnemy();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SJJCData.instance.on(SJJCEvent.JJC_ANS_INFO, this, this.getJJCbaseInfo);
        SJJCData.instance.on(SJJCEvent.JJC_ANS_ENEMY_INFO, this, this.getJJCEnemyInfo);
        SJJCData.instance.on(SJJCEvent.JJC_ENTER_FIGHT, this, this.enterJJCFight);

        this.panel.on(SJJCEvent.JJC_ASK_INFO, this, this.on23001);
        this.panel.on(SJJCEvent.JJC_ASK_ENEMY_INFO, this, this.on23005);
        this.panel.on(SJJCEvent.JJC_ASK_FIGHT, this, this.on23010);
        this.panel.on(SJJCEvent.JJC_ASK_GETREWARD, this, this.on23018);
        this.panel.on(SJJCEvent.JJC_ASK_BUYTIME, this, this.on23013);
    }
    private removeEvent() {
        SJJCData.instance.off(SJJCEvent.JJC_ANS_INFO, this, this.getJJCbaseInfo);
        SJJCData.instance.off(SJJCEvent.JJC_ANS_ENEMY_INFO, this, this.getJJCEnemyInfo);
        SJJCData.instance.off(SJJCEvent.JJC_ENTER_FIGHT, this, this.enterJJCFight);

        this.panel.off(SJJCEvent.JJC_ASK_INFO, this, this.on23001);
        this.panel.off(SJJCEvent.JJC_ASK_ENEMY_INFO, this, this.on23005);
        this.panel.off(SJJCEvent.JJC_ASK_FIGHT, this, this.on23010);
        this.panel.off(SJJCEvent.JJC_ASK_GETREWARD, this, this.on23018);
        this.panel.off(SJJCEvent.JJC_ASK_BUYTIME, this, this.on23013);
    }

    private requestBase(): void {
        this.on23001()
    }

    private requesyEnemy(): void {
        this.on23005();
    }

    /**
     * 请求竞技场的基本信息
     */
    public on23001(): void {
        this.protocol.send23001();
    }

    /**
     * 请求竞技场的对手信息
     */
    public on23005(): void {
        this.protocol.send23005();
    }

    /**
     * 请求竞技场的进行对战
     */
    public on23010(data: S23005_1): void {
        this.protocol.send23010(data);
    }

    /**
     * 请求竞技场的排名奖励
     */
    public on23018(): void {
        this.protocol.send23018();
    }

    /**
     * 购买竞技场购买次数
     */
    public on23013(): void {
        this.protocol.send23013();
    }

    private getJJCbaseInfo(): void {
        this.panel.update();
    }

    private getJJCEnemyInfo(): void {
        this.panel.update();
    }

    private enterJJCFight(): void {
        UIManager.instance.closeUI(UIID.SYS_OFFLINE_ARENA);
        UIManager.instance.closeUI(UIID.SYS_MAIN);
    }

}