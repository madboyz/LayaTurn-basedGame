import { AnswerQuestionPanel } from "./AnswerQuestionPanel";

export class ActivityAQPanel extends AnswerQuestionPanel {
    constructor() {
        super();
    }

    public open(...args): void {
        super.open(...args);
        this.showCloseBtn(false);
    }

    protected clickAnswer(index: number): void {
        if (this._clickAnswerIdx > 0) {
            return;
        }
        super.clickAnswer(index);
        this.showCloseBtn(true);
    }

}
