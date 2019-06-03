import { DataManager } from "../../../../../message/manager/DataManager";
import { S34021, C34022 } from "../../../../../net/pt/pt_34";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { SocketManager } from "../../../../../net/SocketManager";

export class SAnswerQuestionData extends Laya.EventDispatcher {
    private static _instance: SAnswerQuestionData;
    public static get instance(): SAnswerQuestionData {
        return SAnswerQuestionData._instance || (SAnswerQuestionData._instance = new SAnswerQuestionData());
    }
    constructor() {
        super();
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E34021, this, this.on34021);
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E34021, this, this.on34021);
    }

    public aqInfo: S34021;
    public on34021(data: S34021): void {
        this.aqInfo = data;
        var lvLimit: number = ConstVo.get("GRAB_ANSWER_LIMIT").val;
        if (SRoleData.instance.roleInfo.Lv >= lvLimit) {
            this.openAnswerQuastionPanel();
        }
    }

    public openAnswerQuastionPanel(): void {
        UIManager.instance.openUI(UIID.SYS_ANSWERQUESTION_PANEL,
            ["世界答题", this.aqInfo.No, this, this.answerQuastionMsg]
        );
    }

    public answerQuastionMsg(selectIndex: number, questionId: number): void {
        var msg: C34022 = new C34022();
        msg.No = questionId;
        msg.OptionNo = selectIndex;
        SocketManager.instance.send(msg);
    }

}


export enum SAnswerQuestionEvent {
    AQ_GET_INFO = "AQ_GET_INFO",
}