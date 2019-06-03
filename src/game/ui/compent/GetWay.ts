import { GetWayItem } from "./GetWayItem";

export class GetWay extends Laya.View{
    private txt:Laya.Text;
    private txtList:Array<GetWayItem> = [];
    constructor(showTitel:boolean = true) {
        super();
        this.initComp(showTitel);
    }

    private initComp(showTitel:boolean = true):void
    {
        this.txt = this.createTxt(0,0,100,24,20,"#ffffff");
        if(showTitel)
        this.txt.text = "获取途径：";
        else
        this.txt.text = "";
    }

    public initData(arr:Array<any>):void
    {
        var txt:GetWayItem;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            txt = new GetWayItem();
            txt.initData(element);
            this.addChild(txt);
            if(index < 3)
            {
                if(this.txtList.length == 0)
                {
                    txt.x = 0;
                    // txt.x = this.txt.x + this.txt.textWidth;
                    txt.y = 30;
                }
                else
                {
                    txt.x = (index %3) * 130;
                    // txt.x = this.txtList[this.txtList.length - 1].x + this.txtList[this.txtList.length - 1].textWidth + 5;
                    txt.y = 30;
                }
                this.txtList.push(txt);
            }
            else if(index >=3 && index < 7)
            {
                if(index == 3)
                {
                    txt.x = 0;
                    txt.y = this.txtList[this.txtList.length - 1].y + this.txtList[this.txtList.length - 1].height + 5;
                }
                else
                {
                    txt.x = (index %3) * 130;
                    txt.y = this.txtList[this.txtList.length - 1].y;
                    // txt.x = this.txtList[this.txtList.length - 1].x + this.txtList[this.txtList.length - 1].textWidth + 5;
                }
                this.txtList.push(txt);
            }
            else if(index >=7 && index < 11)
            {
                if(index == 7)
                {
                    txt.x = 0;
                    txt.y = this.txtList[this.txtList.length - 1].y + this.txtList[this.txtList.length - 1].height + 5;
                }
                else
                {
                    txt.x = (index %3) * 130;
                    txt.y = this.txtList[this.txtList.length - 1].y;
                    // txt.x = this.txtList[this.txtList.length - 1].x + this.txtList[this.txtList.length - 1].textWidth + 5;
                }
                this.txtList.push(txt);
            }
        }
    }

    private createTxt(x:number, y:number, w:number, h:number, size:number, color:string = "#04a30a",align:string = "left", valign:string = "middle"):Laya.Text
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
        return txt;
    }

    private clearTxt():void
    {
        for (let index = 0; index < this.txtList.length; index++) {
            var element = this.txtList[index];
            element.removeSelf();
            element = null;
        }
    }

    public get height():number
    {
        return this.txtList[this.txtList.length - 1].y + this.txtList[this.txtList.length - 1].height;
    }

    public removeSelf():any
    {
        this.txt.removeSelf();
        this.txt = null;
        this.clearTxt();
        super.removeSelf();
    }
}