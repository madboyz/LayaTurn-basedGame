import { From_sourceVo } from "../../../db/sheet/vo/From_sourceVo";
import { ToolTipsManager } from "../manager/ToolTipsManager";
import { FucManager } from "../manager/FucManager";

export class GetWayItem extends Laya.View{
    private vo:From_sourceVo;
    private txt:Laya.Text;
    constructor() {
        super();
        this.initComp();
    }

    private initComp():void
    {
        this.txt = this.createTxt(0,0,100,24,20);
        this.txt.on(Laya.Event.CLICK,this,this.onClick);
    }

    public initData(value:number):void
    {
        this.vo = From_sourceVo.get(value);
        if(this.vo)
        {
            this.txt.text = this.vo.name;
        }
    }

    private createTxt(x:number, y:number, w:number, h:number, size:number, align:string = "left", valign:string = "middle", color:string = "#11ff00"):Laya.Text
    {
        var txt:Laya.Text = new Laya.Text();
        txt.width = w;
        txt.height = h;
        txt.x = x;
        txt.y = y;
        txt.valign = valign;
        txt.align = align;
        txt.color = color;
        txt.fontSize = size;
        txt.wordWrap = true;
        this.addChild(txt);
        txt.underline = true;
        return txt;
    }

    public get textWidth():number
    {
        return this.txt.textWidth;
    }

    private onClick():void
    {
        if(this.vo && this.vo.actionType == 2)
        {
            ToolTipsManager.instance.hide();
            UIManager.instance.closePanelByLayer(UILEVEL.POP_2);
            UIManager.instance.closePanelByLayer(UILEVEL.POP_3);

            FucManager.doCfgAction(this.vo.action);
            //老的没有用了
            // if(this.vo.action instanceof Array)
            // {
            //     if(this.vo.action[1])
            //     {
            //         UIManager.instance.openUI(this.vo.action[0],UILEVEL.POP_2,this.vo.action[1]);
            //     }
            //     else
            //     {
            //         UIManager.instance.openUI(this.vo.action[0],UILEVEL.POP_2);
            //     }
            // }
            // else
            // {
            //     UIManager.instance.openUI(this.vo.action,UILEVEL.POP_2);
            // }
        }
    }

    public removeSelf():any
    {
        this.offAll();
        super.removeSelf();
    }
}