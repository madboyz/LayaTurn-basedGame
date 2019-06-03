import { ChatEmotionPanel } from '../panel/ChatEmotionPanel';

export class ChatEmotionControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ChatEmotionPanel();
    }

    public set panel(value: ChatEmotionPanel) {
        this.mPanel = value;
    }

    public get panel(): ChatEmotionPanel {
        return this.mPanel as ChatEmotionPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
    }
    private removeEvent() {
    }

}