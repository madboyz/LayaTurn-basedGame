import { ChapterProtocol } from "../../../../chapter/protocol/ChapterProtocol";
import { SChapterData } from "../../../../chapter/SChapterData";
import { MapSelectPanel } from "../panel/MapSelectPanel";

export class MapSelectControl extends BaseControl{
    private protocol:ChapterProtocol;
    constructor(){
        super();
        this.panel = new MapSelectPanel();
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