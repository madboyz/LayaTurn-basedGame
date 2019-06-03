import { Aerocraft_skinVo } from "../../../../../db/sheet/vo/Aerocraft_skinVo";
import { Pet_tujian_cfgVo } from "../../../../../db/sheet/vo/Pet_tujian_cfgVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { RoleView } from "../../../../battle/role/RoleView";

export class MountTujianPanel extends ui.main.MountTujianPanelUI {
    private selectVo: Aerocraft_skinVo;//当前坐骑Vo
    private role: RoleView;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
    }

    public removeEvent(): void {
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.initRole();

        this.update();
    }

    private initList(): void {
        this.attrList.renderHandler = new Laya.Handler(this, this.updateItem)
        this.attrList.vScrollBarSkin = "";
    }

    private initRole(): void {
        this.role = new RoleView();
        this.role.info = "";
        this.role.angle = 0;
        this.addChild(this.role);
        this.role.x = 290;
        this.role.y = 400;
    }



    public open(...args): void {
        this.initWindow(true, true, "坐骑皮肤图鉴", 486, 577, 170);

        this.selectVo = args[0];
        if (!(this.selectVo instanceof Aerocraft_skinVo)) {
            //没有的话，设置第一个出站的宠物
            this.selectVo = Aerocraft_skinVo.getAll()[0];
        }
        super.open();
    }

    public update(): void {
        //属性列表
        this.attrList.array = this.selectVo.attr;
        this.noAttrTips.visible = !this.selectVo.attr || this.selectVo.attr.length <= 0;
        this.tipsLb.text = this.selectVo.male_desc;
        //模型
        if (!this.role) {
            this.initRole();
        }
        var scale = 1.3;
        var offsetX = 290;
        var offsetY = 400;
        if (this.selectVo.scale && this.selectVo.scale.length > 0) {
            scale = 1.3 * this.selectVo.scale[0];
            offsetX = 290 + this.selectVo.scale[1];
            offsetY = 400 + this.selectVo.scale[2];
        }
        this.role.resPath = this.selectVo.body_anim;
        this.role.updateSkin();
        this.role.scaleX = this.role.scaleY = scale;
        this.role.x = offsetX;
        this.role.y = offsetY;
    }

    //属性列表
    private updateItem(cell: Laya.Box, index: number): void {
        var attrLb = (cell.getChildByName("attrLb") as Laya.Label);
        var cfgAtt = this.selectVo.attr[index];

        var preStr = PropertyVo.getByInfo(cfgAtt[0]).desc;
        var subStr = cfgAtt[2] > 0 ? (cfgAtt[2] * 100 + "%") : cfgAtt[1];
        attrLb.text = preStr + " + " + subStr;
    }

    public close(): void {
        this.role && this.role.dispose();
        this.role = null;
        super.close();
        UIManager.instance.openUI(UIID.MOUNT_TUJIANENTER_PANEL);
    }

}