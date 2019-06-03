import { Aerocraft_skinVo } from '../../../db/sheet/vo/Aerocraft_skinVo';
import { PropertyVo } from '../../../db/sheet/vo/PropertyVo';
import { Attribute } from '../../property/RoleProperty';
import { ToolTipsBaseItem } from './ToolTipsBaseItem';

export class ToolTipsMountItem extends ToolTipsBaseItem {
    public _line3: Laya.Image;
    public _mountAttr: Laya.Text;
    constructor() {
        super();
    }

    protected init(): void {
        super.init();
        this._line3 = new Laya.Image();
        this._line3.skin = ResUtils.getCompUIUrl("img_di1");
        this._line3.alpha = 0.15;
        this._line3.x = 10;
        this._line3.y = 200;
        this._line3.width = 365;
        this._line3.height = 4;
        this.content.addChild(this._line3);
    }

    protected updateTop(): void {
        super.updateTop();

        this._mountAttr = this.createTxt(27, 0, 100, 24, 20, "left", "middle", "#e8d8b8");
        this.content.addChild(this._mountAttr);
        this._mountAttr.text = "属性加成：";
        this._mountAttr.y = this.h + 5;
        this.h = this._mountAttr.y + this._mountAttr.height + 5;
        //属性
        var cfgAttr = Aerocraft_skinVo.getCfgByItemId(this._data.clientInfo.no).attr;
        var attr: Array<Attribute> = [];
        this.updateAttrList(attr, cfgAttr);

        for (let index = 0; index < attr.length; index++) {
            const element: Attribute = attr[index];
            var txt: Laya.Text = this.createTxt(29, this.h + 25 * index, 200, 22, 20);
            txt.text = element.name + ":" + element.FormatValue;
            this._txtList.push(txt);
        }

        this.h = this._txtList[this._txtList.length - 1].y + this._txtList[this._txtList.length - 1].height + 5;
        this._line3.y = this.h + 5;
        this.h = this._line3.y + this._line3.height + 5;
    }



    private updateAttrList(arr: Array<Attribute>, atrr: Array<any>): void {
        var obj: Attribute;
        var vo: PropertyVo;
        for (let index = 0; index < atrr.length; index++) {
            var element = atrr[index];
            vo = PropertyVo.getByInfo(element[0]);
            obj = new Attribute(vo.no, element[1]);
            this.updateAtrrListValue(arr, obj);
        }
    }

    private updateAtrrListValue(arr: Array<Attribute>, obj: Attribute): void {
        if (arr.length <= 0) {
            arr.push(obj);
            return;
        }
        else {
            for (let index = 0; index < arr.length; index++) {
                var element = arr[index];
                if (element.name == obj.name) {
                    element.value += obj.value;
                    return;
                }
            }
        }
        arr.push(obj);
    }



    public dispose(): void {
        this._mountAttr && this._mountAttr.removeSelf();
        this._mountAttr = null;
        super.dispose()
    }

}