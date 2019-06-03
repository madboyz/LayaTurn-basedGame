import { S15001 } from "../../../../../net/pt/pt_15";
import { ToolTipsEquipment } from "../../../compent/ToolTipsEquipment";

export class ToolTipsOtherEquipment extends ToolTipsEquipment {
    public _isShowtype: boolean = true;//只是用来展示的类型

    constructor() {
        super();
    }

    
    protected updateBaseProp(data: S15001): void {
        if (data.GoodsId == this._data.serverInfo.GoodsId) {
            //展示类型的tips，始终没有其他操作
            this._isShowtype = true;
            if (!this._data.AllAttr) {
                this._data.UpdateAttr(data.item_1);
            }
            this.content.visible = true;
            this.updateTop();
            this.updateProp();
        }
    }

}