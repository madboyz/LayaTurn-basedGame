import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { ChatUtil } from "../../chat/ChatUtil";
import { SLogin } from "../../../../../net/data/SLogin";

export class GonggaoPanel extends ui.main.GonggaoPanelUI {
    private showStr: string = "";

    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.mResouce = [
        ];
    }

    public initEvent(): void {
        this.quedingBtn.on(Laya.Event.CLICK, this, this.close);
    }

    public removeEvent(): void {
        this.quedingBtn.off(Laya.Event.CLICK, this, this.close);
    }

    public initComp() {
        super.initComp();
        this.contentPanel.vScrollBarSkin = "";
        HtmlUtils.setHtml(this.contentText.style, 6, 20, "left", "top");
        this.contentText.style.leading = 5;
        this.contentText.style.color = "#8e5213";
    }

    public open(...args): void {
        this.initWindow(true, true, "公 告", 550, 750, 100);
        super.open();
        var tempData = SLogin.instance.NoticeData;
        if(tempData != null && tempData.content != null && tempData.content != ""){
            this.showStr = tempData.content;
            this.Title = tempData.notice_dt;
        }else{
            this.showStr = "欢迎来到萌仙西游";
        }
        //     // this.showStr = "#000000亲爱的大侠：\t\t\t\r\n   #000000为了更好的游戏体验，我们计划在#fa21211月23日9：00-10:20#000000（71-102，259-266，267-275，276-281，292-294，295-297，298-299）服进行停机维护。请大家互相转达。\t\t\t\r\n\t\t\t\r\n#000000维护期间，我们将对（71-102，259-266，267-275，276-281，292-294，295-297，298-299）服进行数据互通。\t\t\t\r\n\t\t\t\r\n\t\t\t\r\n#000000（开机时间会因工作进度推迟或提前）\t\t\t\r\n\t\t\t\r\n\t\t\t\r\n#000000祝大侠游戏愉快！";
        //     this.showStr = "{#000000:亲爱的大侠：}\t\t\t\r\n   {#000000:为了更好的游戏体验，我们计划在}{#fa2121:1月23日9：00-10:20}\t\t\t\r\n\t\t\t\r\n{#000000:祝大侠游戏愉快！}"
        this.showStr = this.showStr.replace(/\t/g ,"");
        this.showStr = this.showStr.replace(/\r/g ,"");
        // var reg = new RegExp(" ","g");
        // this.showStr = this.showStr.replace(reg ,"&nbsp;");
        this.showStr = this.showStr.replace(/\n\n/g ,"<br/><br/><br/><br/>");
        this.showStr = this.showStr.replace(/\n/g ,"<br/>");
        this.update();
    }

    public update(): void {
        var aaaa = ChatUtil.getReplaceTips(this.showStr,[]);
        this.contentText.innerHTML = ChatUtil.getReplaceTips(this.showStr,[]);
        // this.contentText.innerHTML = WJLabelUtils.parseColorHTML(this.showStr);
        this.overImg.visible = this.contentText.contextHeight >= 580;
    }

    public close(): void {
        super.close();
    }
}
