import { ChapterProtocol } from "../../../../chapter/protocol/ChapterProtocol";
import { MapPanel } from "../panel/MapPanel";
import { SChapterData } from "../../../../chapter/SChapterData";

export class MapControl extends BaseControl{
    private protocol:ChapterProtocol;
    constructor(){
        super();
        this.panel = new MapPanel();
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