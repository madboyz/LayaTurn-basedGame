import { GameUtils } from "../../../../utils/GameUtils";
import { CommonControl } from "../../../../common/control/CommonControl";
import { AoiInfo } from "../../../../aoi/AoiInfo";

export class SelectObjItem extends ui.main.ShopSubItemUI {
    private Info:any = {};
    public set dataSource(data:any)
    {
        if(data == null) return;
        this.Info = data;
        this.UpdateState();
    }

    public get dataSource():any
    {
        return this.Info;
    }
    public UpdateState()
    {
        var sheet = this.Info.args[0];
        this.Btn.label = sheet.name;
    }
}

export class SeleclSceneObjPanel extends ui.main.SeleclSceneObjUI {
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [];
    }

    public initComp() {
        super.initComp();
        this.initList();
    }

    private initList(): void {
        this.List.itemRender = SelectObjItem;
        this.List.vScrollBarSkin = "";
        this.List.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.List.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.List.selectEnable = true;
        this.List.array = null;
    }

    public open(...args): void {
        super.open();
        if(!args) this.close();
        this.List.array = args[0];
    }

    public initEvent():void 
    {
        this.List.selectHandler = Laya.Handler.create(this, this.onListChangeHandler, null, false);
        this.List.mouseHandler = Laya.Handler.create(this, this.onClickItem, null, false);
    }

    public removeEvent():void
    {
        this.List.selectHandler = null;
        this.List.mouseHandler = null;
    }

    private selectInfo: SelectObjItem;
    private onListChangeHandler(): void {
        this.selectInfo = this.List.getCell(this.List.selectedIndex) as SelectObjItem;
    }

    private onClickItem(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }
        if (e.target instanceof component.ScaleButton&&this.selectInfo!= null) {
            var aoiInfo:AoiInfo = this.selectInfo.dataSource.args[1];
            var targetId = aoiInfo.getInfo(RoleType.OBJ_MONSTER).ObjId;
            CommonControl.instance.checkFightSceneObj(targetId);
            this.close();
        }
    }

    public close(): void {
        super.close();
    }
}