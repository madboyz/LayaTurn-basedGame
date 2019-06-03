import { PropertyVo } from "../../db/sheet/vo/PropertyVo";

export class PropertyUtil {
    public static GetPropertyDec(attrid: number, value: number): string {
        var attributeVo = PropertyVo.get(attrid);
        if (!attributeVo)
            return "";
        var v: number = value / attributeVo.ratio;
        var str: string;
        if (attributeVo.is_percent == 1) {
            var showValue = v * 100;
            if (~~showValue !== showValue)
                str = (v * 100).toFixed(2) + "%";
            else
                str = (v * 100) + "%";
        }
        else {
            if (~~value !== value)
                str = value.toFixed(2);
            else
                str = value.toString();
        }

        return str;
    }

    public static GetPropertyAddDec(propertyArr: Array<any>, betweenStr = "+"): string {
        var key = propertyArr[0];
        var value1 = propertyArr[1];
        var value2 = propertyArr[2];
        var vo = PropertyVo.getByInfo(key);
        if (vo) {
            var str1 = "";
            var str2 = "";
            if (value1 > 0) {
                var descValue = PropertyUtil.GetPropertyDec(vo.no, value1);
                str1 = `${descValue}`;
            }
            if (value2 > 0) {
                str2 = `${(value2 * 100).toFixed(2)}%`;
            }
            return vo.name + betweenStr + str1 + str2;
        } else {
            return "未知属性";
        }
    }
}
