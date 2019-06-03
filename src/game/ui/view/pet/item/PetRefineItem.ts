import { ProgressBar } from "../../../compent/ProgressBar";
import { Pet_refineVo } from "../../../../../db/sheet/vo/Pet_refineVo";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SPetData } from "../../../../../net/data/SPetData";
import { SBagData } from "../../../../../net/data/SBagData";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";

export class PetRefineItem extends ui.main.PetRefineItemUI {
    private _bar:ProgressBar;
    private _max:number;
    private _curValue:number;
    private _atrrName:string;
    private _goodsNo:number;
    private _range:string;
    constructor() {
        super();
        this.init();
    }

    init():void
    {
        this._bar = new ProgressBar();
        this._bar.setBg(ResUtils.getCompUIUrl("progressBg"),ResUtils.getCompUIUrl("img_yellowBar"),345,24);
        this._bar.x = 104;
        this._bar.y = 12;
        this.addChildAt(this._bar,3);

        this.img_select.visible = false;

        HtmlUtils.setHtml(this.txt_value.style,6,20,"center","middle");
        this.txt_value.innerHTML = "";
    }

    private mData:number;
    private vo:PropertyVo;

    public set dataSource(data:number)
    {
        if(!data) return;
        this.mData = data;
        this.vo = PropertyVo.get(this.mData);
        this._atrrName = this.vo.sys_name;
        this.txt_name.text = this.vo.name;

        this.checkShow();
    }

    public checkSelect(data:number):void
    {
        if(this.mData && data)
        {
            if(this.mData == data)
            {
                this.img_select.visible = true;
            }
            else
            {
                this.img_select.visible = false;
            }
        }
    }

    private checkShow():void
    {
        var num:number = 0;
        this._curValue = SPetData.instance.curInfo.getRefineValueByName(this._atrrName);
        this._max = 0;
        this._goodsNo = 0;
        var arr:Array<any> = Pet_refineVo.getMListByName(this._atrrName);
        var len:number = arr.length;
        for (let index = 0; index < len; index++) {
            const element = arr[index];
            if(element.num > 0)
            {
                if(element.ele.add_top > this._curValue)
                {
                    this._goodsNo = element.ele.no;
                    this._max = element.ele.add_top;
                    this._range = element.ele.add_range[0] + "-" + element.ele.add_range[1];
                    if(element.ele.add_range[0] != element.ele.add_range[1])
                    {
                        this.txt_value.innerHTML = HtmlUtils.addColor(this._curValue.toString(),"#ffffff",20) + HtmlUtils.addColor("+(" + this._range + ")","#31f736",20);// + HtmlUtils.addColor("/" + this._max.toString(),"#ffffff",20);
                    }
                    else
                    {
                        this.txt_value.innerHTML = HtmlUtils.addColor(this._curValue.toString(),"#ffffff",20) + HtmlUtils.addColor("+" + element.ele.add_range[0],"#31f736",20);// + HtmlUtils.addColor("/" + this._max.toString(),"#ffffff",20);
                    }
                    this._bar.setValue(this._curValue,this._max);
                    return;
                }
            }
        }
        for (let index = 0; index < len; index++) {
            var element = arr[index];
            if(element.ele.add_top > this._curValue)
            {
                this._goodsNo = element.ele.no;
                this._max = element.ele.add_top;
                this._range = element.ele.add_range[0] + "-" + element.ele.add_range[1];
                if(element.ele.add_range[0] != element.ele.add_range[1])
                {
                    this.txt_value.innerHTML = HtmlUtils.addColor(this._curValue.toString(),"#ffffff",20) + HtmlUtils.addColor("+(" + this._range + ")","#31f736",20);// + HtmlUtils.addColor("/" + this._max.toString(),"#ffffff",20);
                }
                else
                {
                    this.txt_value.innerHTML = HtmlUtils.addColor(this._curValue.toString(),"#ffffff",20) + HtmlUtils.addColor("+" + element.ele.add_range[0],"#31f736",20);// + HtmlUtils.addColor("/" + this._max.toString(),"#ffffff",20);
                }
                this._bar.setValue(this._curValue,this._max);
                return;
            }
        }

        this._goodsNo = -1;
        this._max = arr[len - 1].ele.add_top;
        this.txt_value.innerHTML = HtmlUtils.addColor(this._max.toString(),"#ffffff",20);// + HtmlUtils.addColor("/" + this._max.toString(),"#ffffff",20);
        this._bar.setValue(this._curValue,this._max);
    }

    public get goodsNo():number
    {
        return this._goodsNo;
    }

    public get atrrName():string
    {
        return this._atrrName;
    }

    public get dataSource():number
    {
        return this.mData;
    }
}