import { ChapterProtocol } from "../../../../chapter/protocol/ChapterProtocol";
import { SChapterData } from "../../../../chapter/SChapterData";
import { ChallengeResultPanel } from "../panel/ChallengeResultPanel";

export class ChallengeResultControl extends BaseControl{
    private protocol:ChapterProtocol;
    constructor(){
        super();
        this.panel = new ChallengeResultPanel();
        this.protocol = SChapterData.instance.Protocol;
    }
    openView(...args) {
        this.initRequest();
        this.initEvent();
    }

    private initEvent() {
    }

    private initRequest():void{

    }
    private removeEvent() {
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }
    

}