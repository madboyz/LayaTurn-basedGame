import { Chat_emotion_cfgVo } from '../../../../../db/sheet/vo/Chat_emotion_cfgVo';
import { ChatUtil } from '../ChatUtil';
import { SChatData, SChatEvent } from '../../../../../net/data/SChatData';

export class ChatEmotionPanel extends ui.main.ChatEmotionPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_1_1;
        this.sameLevelEliminate = false;
        this.mResouce = [
            { url: "res/atlas/chatEmotion.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.centerX = this.centerY = NaN;
        this.initPanel();
        this.width = Laya.stage.width;
        this.bgImage.on(Laya.Event.CLICK, this, this.close);
    }
    private initPanel(): void {
        this.emotionList.itemRender = ChatEmotionItem;
    }

    public open(...args): void {
        super.open();
        this.showRed();
        this.cfgs = Chat_emotion_cfgVo.getAll();
        this.emotionList.array = this.cfgs;
    }

    public initEvent(): void {
    }
    public removeEvent(): void {
    }

    public cfgs: Chat_emotion_cfgVo[];

    private showRed(): void {
    }

    public close(): void {
        super.close();
    }
}


//道具的奖励ITEM
export class ChatEmotionItem extends Laya.View {
    private _mData: Chat_emotion_cfgVo;
    private _emoImg: Laya.Image;
    private _timeLoop: number = 0;

    constructor() {
        super();
        this.width = this.height = 60;
        this.initComp();
        this.on(Laya.Event.CLICK, this, this.thisClick);
    }

    private initComp(): void {
        this._emoImg = new Laya.Image;
        this.addChild(this._emoImg);
    }

    public set dataSource(data: Chat_emotion_cfgVo) {
        if (!data) {
            Laya.timer.clear(this, this.loopFunc);
            return;
        }
        this._timeLoop = 0;
        this._mData = data;
        this.refresh();
        Laya.timer.loop(100, this, this.loopFunc);
    }

    public refresh(): void {
        this._emoImg.skin = "chatEmotion/" + this._mData.res + ChatUtil.getEmoSubStr((this._timeLoop % this._mData.total_num + 1)) + ".png";
    }

    public thisClick(): void {
        SChatData.instance.event(SChatEvent.ADD_AN_EMOTION, [this._mData.no]);
    }

    public loopFunc(): void {
        this._timeLoop++;
        this.refresh();
    }

    public destroy(): void {
        super.destroy()
    }

}