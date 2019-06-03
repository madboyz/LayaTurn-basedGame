import { AnswerQuestionPanel } from "../panel/AnswerQuestionPanel";

export class AnswerQuestionControl extends BaseControl {

    constructor() {
        super();
        this.panel = new AnswerQuestionPanel();
        this.initEvent();
    }

    public set panel(value: AnswerQuestionPanel) {
        this.mPanel = value;
    }

    public get panel(): AnswerQuestionPanel {
        return this.mPanel as AnswerQuestionPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
    }
    private removeEvent() {
    }

}