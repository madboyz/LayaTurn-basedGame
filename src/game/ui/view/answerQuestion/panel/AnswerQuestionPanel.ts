import { AnswerVo } from "../../../../../db/sheet/vo/AnswerVo";
import { C34022 } from "../../../../../net/pt/pt_34";
import { SocketManager } from "../../../../../net/SocketManager";
import { SAnswerQuestionData } from "../data/SAnswerQuestionData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class AnswerQuestionPanel extends ui.main.AnswerQuestionPanelUI {
    private param:any;//参数，第一个为标题，第二个为题目标号，第三个为回调this，第四个为回调function；
    private leftTime: number = 60;

    //回答问题按得选项，没有按，就是为0;
    protected _clickAnswerIdx: number = 0;

    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isShowMask = true;
        this.isCloseByNull = false;
        this.sameLevelEliminate = false;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
        for (let i = 1; i <= 4; i++) {
            (this["answerBtn" + i] as Laya.Image).on(Laya.Event.CLICK, this, this.clickAnswer, [i]);
        }
    }

    public removeEvent(): void {
        for (let i = 1; i <= 4; i++) {
            (this["answerBtn" + i] as Laya.Image).off(Laya.Event.CLICK, this, this.clickAnswer);
        }
    }

    public initComp() {
        super.initComp();
    }

    public open(...args): void {
        this.param = this.arg;
        this.initWindow(true, true, "", 486, 510, 195);
        this.Title = this.param[0];
        super.open();
        this.leftTime = ConstVo.get("GRAB_ANSWER_TIMEOUT").val;
        this._clickAnswerIdx = 0;
        this.txtLoop();
        this.timer.loop(1000, this, this.txtLoop);

        this.update();
    }

    public update(): void {
        var showStr = ["A:", "B:", "C:", "D:"]
        var cfg = AnswerVo.get(this.param[1]);
        this.questionLb.text = "题目：" + cfg.question;
        for (let i = 1; i <= 4; i++) {
            var lb = (this["answerLb" + i] as Laya.Text);
            lb.text = showStr[i - 1] + cfg["option_" + i];

            var img = (this["answerImg" + i] as Laya.Image);
            img.visible = this._clickAnswerIdx > 0 && (this._clickAnswerIdx == i || cfg.correct == i);
            img.skin = cfg.correct == i ? "comp/img_word_right.png" : "comp/img_word_wrong.png";

            var btn = (this["answerBtn" + i] as Laya.Image);
            btn.skin = this._clickAnswerIdx == i ? "comp/img_skillItem_select.png" : "comp/img_skillItem.png";
        }

        if(this._clickAnswerIdx == 0){
            this.tipsLb.text = "注意，只可进行1次抢答，答错无奖励，请谨慎选择答案！";
        }else if (this._clickAnswerIdx == cfg.correct){
            this.tipsLb.text = "恭喜您回答正确，稍后将根据抢答成绩，通过邮件发送奖励！";
        }else {
            this.tipsLb.text = "很遗憾，回答错误~ 请下次继续努力^_^";
        }
    }

    private txtLoop(): void {
        this.leftTime--;
        if (this.leftTime <= 0) {
            this.timeLb.text = "剩余时间：0s";
        } else {
            this.timeLb.text = "剩余时间：" + this.leftTime + "s";
        }

        // for (let i = 1; i <= 4; i++) {
        //     var lb = (this["answerLb" + i] as Laya.Text);
        //     lb.mouseEnabled = false;
        // }

        if (this.leftTime <= 0 && this._clickAnswerIdx == 0) {
            var cfg = AnswerVo.get(this.param[1]);
            for (let i = 1; i <= 4; i++) {
                var img = (this["answerImg" + i] as Laya.Image);
                img.visible = (this._clickAnswerIdx == i || cfg.correct == i);
                img.skin = cfg.correct == i ? "comp/img_word_right.png" : "comp/img_word_wrong.png";

            }
        }

        if (this.leftTime <= -3) {
            this.timer.clear(this, this.txtLoop);
            this.close();
        }
    }

    protected clickAnswer(index: number): void {
        if (this._clickAnswerIdx > 0) {
            return;
        }
        this._clickAnswerIdx = index;
        //发送答题协议
        var callObj = this.param[2];
        var callFunc:Function = this.param[3];
        callFunc.call(callObj,this._clickAnswerIdx,this.param[1]);
        this.update();
    }

    public close(): void {
        super.close();
    }
}
